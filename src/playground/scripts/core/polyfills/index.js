import "./_customElementsPolyfill.js";

Date.prototype.addDays = function (days) {
  const tempDate = new Date(this.valueOf());
  return new Date(tempDate.setDate(tempDate.getDate() + days));
};
