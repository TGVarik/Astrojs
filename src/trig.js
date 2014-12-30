/**
 * Created by tom on 12/29/14.
 */
var math = require('mathjs');
module.exports = {
  sign: function (val) {
    return typeof val === 'number' ? val ? val < 0 ? -1 : 1 : val === val ? 0 : NaN : NaN;
  },
  normalizeDegrees: function (val) {
    while (val < 0) { val += 360; }
    while (val >= 360) { val -= 360; }
    return val;
  },
  normalizeDegrees180: function (val) {
    while (val <= -180) { val += 360; }
    while (val > 180) { val -= 360; }
    return val;
  },
  degToRad: function (val) {
    return val * math.PI / 180;
  },
  radToDeg: function (val) {
    return val * 180 / math.PI;
  },
  dsin: function (val) {
    return math.sin(this.degToRad(val));
  },
  dcos: function (val) {
    return math.cos(this.degToRad(val));
  },
  dtan: function (val) {
    return math.tan(this.degToRad(val));
  },
  dasin: function (val) {
    return this.radToDeg(math.asin(val));
  },
  dacos: function (val) {
    return this.radToDeg(math.acos(val));
  },
  datan: function (val) {
    return this.radToDeg(math.atan(val));
  },
  datan2: function (a, b) {
    return this.radToDeg(math.atan2(a, b));
  },
  degMinSecToDeg: function (deg, min, sec) {
    return ((this.sign(deg) * sec / 60) + this.sign(deg) * min) / 60 + deg;
  },
  hrsMinSecToDeg: function (hrs, min, sec) {
    return (((this.sign(hrs) * sec / 60) + this.sign(hrs) * min) / 60 + hrs) * 15;
  }
};