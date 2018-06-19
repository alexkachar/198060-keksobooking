'use strict';

(function () {
  window.randomize = {
    getRandomValue: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    getRandomValueFromArray: function (array) {
      return array[this.getRandomValue(0, array.length - 1)];
    },

    getUniqueValueFromArray: function (array) {
      return array.splice(Math.floor(Math.random() * array.length), 1).toString();
    },

    getRandomArray: function (array) {
      var sourceArray = array.slice().sort();
      var randomArray = [];
      var randomLength = this.getRandomValue(1, (array.length - 1));
      for (var i = 0; i <= randomLength; i++) {
        randomArray[i] = this.getUniqueValueFromArray(sourceArray);
      }
      return randomArray;
    },

    getShuffledArray: function (array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var x = array[i];
        array[i] = array[j];
        array[j] = x;
      }
      return array;
    }
  };
})();
