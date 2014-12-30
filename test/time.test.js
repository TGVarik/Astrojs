/**
 * Created by tom on 12/29/14.
 */
var chai = require('chai');
chai.use(require('chai-datetime'));
var expect = chai.expect;
var Astro = require('../src/Astro.js');

var numToMonth = function(m){
  switch(m){
    case 1: return 'Jan';
    case 2: return 'Feb';
    case 3: return 'Mar';
    case 4: return 'Apr';
    case 5: return 'May';
    case 6: return 'Jun';
    case 7: return 'Jul';
    case 8: return 'Aug';
    case 9: return 'Sep';
    case 10: return 'Oct';
    case 11: return 'Nov';
    case 12: return 'Dec';
  }
};

describe('time', function(){
  var data = [
    [ 2000,  1,  1.5, 2451545.0],
    [ 1999,  1,  1.0, 2451179.5],
    [ 1987,  1, 27.0, 2446822.5],
    [ 1987,  6, 19.5, 2446966.0],
    [ 1988,  1, 27.0, 2447187.5],
    [ 1988,  6, 19.5, 2447332.0],
    [ 1900,  1,  1.0, 2415020.5],
    [ 1600,  1,  1.0, 2305447.5],
    [ 1600, 12, 31.0, 2305812.5],
    [  837,  4, 10.3, 2026871.8],
    [ -123, 12, 31.0, 1676496.5],
    [ -122,  1,  1.0, 1676497.5],
    [-1000,  7, 12.5, 1356001.0],
    [-1000,  2, 29.0, 1355866.5],
    [-1001,  8, 17.9, 1355671.4],
    [-4712,  1,  1.5,       0.0]
  ];
  describe('#utcToDate', function(){
    it('should correctly form date from integer components', function(){
      var d = Astro.time.ymdToDate(1957, 10, 4, 19, 28, 34, 0);
      expect(d).to.be.a('date');
      expect(d.getUTCFullYear()).to.equal(1957);
      expect(d.getUTCMonth() + 1).to.equal(10);
      expect(d.getUTCDate()).to.equal(4);
      expect(d.getUTCHours()).to.equal(19);
      expect(d.getUTCMinutes()).to.equal(28);
      expect(d.getUTCSeconds()).to.equal(34);
      expect(d.getUTCMilliseconds()).to.equal(0);
    });
    it('should correctly form date from decimal date', function(){
      var d = Astro.time.ymdToDate(1957,10,4.81150463);
      expect(d).to.be.a('date');
      expect(d.getUTCFullYear()).to.equal(1957);
      expect(d.getUTCMonth() + 1).to.equal(10);
      expect(d.getUTCDate()).to.equal(4);
      expect(d.getUTCHours()).to.equal(19);
      expect(d.getUTCMinutes()).to.equal(28);
      expect(d.getUTCSeconds()).to.equal(34);
      expect(d.getUTCMilliseconds()).to.equal(0);
    })
  });
  describe('#dateToJD', function(){
    it('should return 2436116.3115 for 1957 Oct 4.8115', function(){
      var d = Astro.time.ymdToDate(1957,10,4.8115);
      var jd = Astro.time.dateToJD(d);
      expect(jd).to.equal(2436116.3115);
    });
    it('should return 1842713.0 for 333 Jan 27 12:00:00.000', function(){
      var d = Astro.time.ymdToDate(333,1,27,12,0,0,0);
      var jd = Astro.time.dateToJD(d, true);
      expect(jd).to.equal(1842713.0);
    });
    for (var i = 0; i < data.length; i++){
      (function(row){
        it('should return ' + row[3] + ' for ' + row[0] + ' ' + numToMonth(row[1]) + ' ' + row[2], function(){
          expect(Astro.time.ymdToJD(row[0], row[1], row[2]));
        });
      })(data[i]);
    }
  });
  describe('#jdToDate', function(){
    it('should return 1957 Oct 4.81 for JD 2436116.31', function(){
      var d1 = Astro.time.jdToDate(2436116.31);
      var d2 = Astro.time.ymdToDate(1957,10,4.81);
      expect(d1).to.equalDate(d2);
    });
    it('should return 333 Jan 27.5 for JD 1842713.0', function(){
      var d1 = Astro.time.jdToDate(1842713.0);
      var d2 = Astro.time.ymdToDate(333,1,27.5);
      expect(d1).to.equalDate(d2);
    });
    it('should return -584 May 28.63 for JD 1507900.13', function(){
      var d1 = Astro.time.jdToDate(1507900.13);
      var d2 = Astro.time.ymdToDate(-584, 5, 28.63);
      expect(d1).to.equalDate(d2);
    });
    for (var i = 0; i < data.length; i++){
      (function(row){
        it('should return ' + row[0] + ' ' + numToMonth(row[1]) + ' ' + row[2] + ' for JD ' + row[3], function(){
          var d1 = Astro.time.jdToDate(row[3]);
          var d2 = Astro.time.ymdToDate(row[0], row[1], row[2]);
          expect(d1).to.equalDate(d2);
        });
      })(data[i]);
    }
  });
});