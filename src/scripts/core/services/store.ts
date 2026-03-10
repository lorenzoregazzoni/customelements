/*!
 * More accurately check the type of a JavaScript object
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Object} obj The object
 * @return {String}     The object type
 */

import { emit } from "./emit";
import { isNumber } from "./types";
import { isArray } from "./types";
import { isObject } from "./types";

function getHandler(obj, prop, data, storeName, path) {
  if (prop === "__proto__") return;
  if (prop === "_isProxy") return true;

  const value = obj[prop];

  if (!!value && isArray(value) && !value._isProxy) {
    obj[prop] = new Proxy(
      [...value],
      storeHandler(data, storeName, `${path ? `${path}.` : ""}${prop}`),
    );
  } else if (!!value && isObject(value) && !value._isProxy) {
    const pathNew =
      isArray(obj) && isObject(value) && isNumber(prop)
        ? `${path}[${prop}]`
        : `${path ? `${path}.` : ""}${prop}`;

    obj[prop] = new Proxy({ ...value }, storeHandler(data, storeName, pathNew));
  }

  return obj[prop];
}

function setHandler(obj, prop, value, data, storeName, path) {
  if (prop === "__proto__") return true;
  if (obj[prop] === value) return true;

  const oldObj = isArray(obj) ? [...obj] : obj;
  const oldValue = obj[prop];

  const pathNew =
    isArray(obj) && isNumber(+prop) ? `${path}[${prop}]` : `${path ? `${path}.` : ""}${prop}`;

  if (isObject(value) && !value._isProxy) {
    obj[prop] = new Proxy({ ...value }, storeHandler(data, storeName, pathNew));
  } else if (isArray(value) && !value._isProxy) {
    for (let i = 0; i < value.length; i++) {
      if (isObject(value[i]) && !value[i]._isProxy) {
        value[i] = new Proxy(value[i], storeHandler(data, storeName, `${pathNew}[${i}]`));
      } else if (isObject(value[i]) && !!value[i]._isProxy) {
        value[i] = new Proxy(
          Object.assign({}, value[i]),
          storeHandler(data, storeName, `${pathNew}[${i}]`),
        );
      }
    }

    obj[prop] = new Proxy([...value], storeHandler(data, storeName, pathNew));
  } else {
    obj[prop] = value;
  }

  if (isObject(obj)) {
    emit(storeName, {
      dataSource: data,
      obj,
      path: pathNew,
      type: "setProperty",
      prop,
      oldValue,
      newValue: obj[prop],
    });

    // !!data && checkFunctionsProps(obj, pathNew, path, storeName);
  } else if (isArray(obj)) {
    !isNaN(parseInt(prop)) &&
      emit(storeName, {
        dataSource: data,
        obj,
        path: pathNew,
        type: "setProperty",
        prop,
        oldValue,
        newValue: obj[prop],
      });

    // emit(storeName, {
    //   // dataSource: data,
    //   obj,
    //   path: `${path}`,
    //   type: "updateArray",
    //   prop,
    //   oldValue: oldObj,
    //   newValue: obj,
    // });
  }

  return true;
}

// * Store delete property handler
function deletePropertyHandler(obj, prop, path, storeName) {
  // early returns when the prop requested is the prototype itself
  if (prop === "__proto__") return true;

  // prepares oldValue and lastValue
  const oldValue = obj;
  const lastValue = obj[prop];

  // removed lastValue from the obj
  delete obj[prop];

  emit(storeName, {
    dataSource: data,
    obj,
    path,
    type: "deleteProperty",
    prop,
    oldValue,
    newValue: obj,
    lastValue,
  });

  return true;
}

function storeHandler(data, storeName, path = "") {
  return {
    // TODO: re-proxy sub functions
    apply: function (target, thisArg, args) {
      debugger;
      const result = target.apply(thisArg, ...args);
      const resultProxy = new Proxy(result, storeHandler(result, storeName));

      emit(name, {
        dataSource: resultProxy,
        target,
        path: ``,
        type: "applyMethod",
        prop: target,
        result: resultProxy,
      });

      return resultProxy;
    },
    get: function (obj, prop) {
      return getHandler(obj, prop, data, storeName, path);
    },
    set: function (obj, prop, value) {
      return setHandler(obj, prop, value, data, storeName, path);
    },
    deleteProperty: function (obj, prop) {
      return deletePropertyHandler(obj, prop, storeName, path);
    },
  };
}

export const Store = (initialObject, storeName) => {
  return new Proxy(initialObject, storeHandler(initialObject, storeName));
};
