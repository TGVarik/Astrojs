/**
 * Created by tom on 12/29/14.
 */
module.exports = {

  /**
   * Converts year, month, date (which may be integer or float), and optionally
   * hour, minute, second, and millisecond into a JavaScript Date object using
   * UTC setters.
   *
   * @param {number} year
   * @param {number} month
   * @param {number} date
   * @param {number} [hour=0]
   * @param {number} [minute=0]
   * @param {number} [second=0]
   * @param {number} [millisecond=0]
   * @returns {Date}
   */
  ymdToDate: function(year,month,date,hour,minute,second,millisecond){
    hour = hour || 0;
    minute = minute || 0;
    second = second || 0;
    millisecond = millisecond || 0;
    if (Math.floor(date) !== date){ hour = (date % 1) * 24; date = Math.floor(date); }
    if (Math.floor(hour) !== hour){ minute = (hour % 1) * 60; hour = Math.floor(hour); }
    if (Math.floor(minute) !== minute){ second = (minute % 1) * 60; minute = Math.floor(minute); }
    if (Math.floor(second) !== second){ millisecond = (second % 1) * 1000; second = Math.floor(second); }
    millisecond = Math.floor(millisecond);
    var d = new Date();
    d.setUTCFullYear(year);
    d.setUTCMonth(month - 1);
    d.setUTCDate(date);
    d.setUTCHours(hour);
    d.setUTCMinutes(minute);
    d.setUTCSeconds(second);
    d.setUTCMilliseconds(millisecond);
    return d;
  },

  /**
   * Converts a JavaScript Date object to JD using the Date object's UTC values.
   * This function has a resolution of 0.000001 days, or 86.4 milliseconds.
   *
   * @param {Date} date
   * @param {boolean} [useJulianCalendar=false]
   * @returns {number}
   */
  dateToJD: function(date, useJulianCalendar){
    var Y = date.getUTCFullYear();
    var M = date.getUTCMonth() + 1;
    var D = date.getUTCDate()
          + date.getUTCHours() / 24
          + date.getUTCMinutes() / 1440
          + date.getUTCSeconds() / 86400
          + date.getUTCMilliseconds() / 86400000;
    D = Math.round(D * 1e6) / 1e6;
    return this.ymdToJD(Y,M,D,useJulianCalendar);
  },

  /**
   * Converts year, month, and date (which may be either integer or float) to JD.
   * This function has a resolution of 0.000001 days, or 86.4 milliseconds.
   *
   * @param {number} year
   * @param {number} month
   * @param {number} date
   * @param {boolean} [useJulianCalendar=false]
   * @returns {number}
   */
  ymdToJD: function(year, month, date, useJulianCalendar){
    useJulianCalendar = (useJulianCalendar === undefined ? false : useJulianCalendar);
    if (month < 3) { month += 12; year--; }
    var A = Math.floor(year/100);
    var B = useJulianCalendar ? 0 : 2 - A + Math.floor(A/4);
    return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + date + B - 1524.5;
  },

  /**
   * Converts JD to a JavaScript Date object, setting the Date object using the
   * UTC setters.
   *
   * @param {number} jd
   * @returns {Date}
   */
  jdToDate: function(jd){
    var Z = Math.floor(jd + 0.5);
    var F = Math.round(((jd + 0.5) % 1) * 1e6) / 1e6;
    var A;
    if (Z < 2299161) {
      A = Z;
    } else {
      var alpha = Math.floor((Z - 1867216.25)/36524.25);
      A = Z + 1 + alpha - Math.floor(alpha/4);
    }
    var B = A + 1524;
    var C = Math.floor((B - 122.1) / 365.25);
    var D = Math.floor(365.25 * C);
    var E = Math.floor((B - D) / 30.6001);
    var date = B - D - Math.floor(30.6001 * E) + F;
    date = Math.round(date * 1e6) / 1e6;
    var month = E - (E < 14 ? 1 : 13);
    var year = C - (month > 2 ? 4716 : 4715);
    return this.ymdToDate(year,month,date);
  }
};