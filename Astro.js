if (typeof Astro == 'undefined') { Astro = {}; }
(function(){

  var overloadedDate = function(){
    if (typeof arguments[0] == 'string'){

    } else if (arguments[0] instanceof Date){

    } else if (typeof arguments[0] == 'number'){

    }
  };

  this.dateToJD = function(){

  }

}).call(Astro);