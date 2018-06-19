'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormAddressField = adForm.querySelector('#address');

  window.utils = {
    setAddress: function () {
      adFormAddressField.value = (mainPin.offsetLeft
          + Math.round(mainPin.offsetWidth / 2)) + ', '
          + (mainPin.offsetTop + Math.round(mainPin.offsetHeight));
    }
  };
})();
