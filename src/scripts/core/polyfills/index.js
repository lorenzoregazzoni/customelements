import "./_customElementsPolyfill.js";

Date.prototype.addDays = function (days) {
  return new Date(this.setDate(this.getDate() + days));
};
