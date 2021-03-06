'use strict';

(function () {
  var MAP_PIN_WIDTH = '40';
  var MAP_PIN_HEIGHT = '40';
  var MAP_PIN_OFFSET_X = '25';
  var MAP_PIN_OFFSET_Y = '70';
  var MAX_PINS_QUANTITY = 5;

  window.mainPin = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');

  var renderMapPin = function (offerData) {
    var mapPin = document.createElement('button');
    mapPin.className = 'map__pin';
    mapPin.setAttribute('data-number', offerData.dataNumber);
    mapPin.style.left = offerData.location.x - MAP_PIN_OFFSET_X + 'px';
    mapPin.style.top = offerData.location.y - MAP_PIN_OFFSET_Y + 'px';
    mapPin.addEventListener('click', window.map.openPopup);
    var mapPinImg = document.createElement('img');
    mapPinImg.src = offerData.author.avatar;
    mapPinImg.alt = offerData.offer.title;
    mapPinImg.width = MAP_PIN_WIDTH;
    mapPinImg.height = MAP_PIN_HEIGHT;
    mapPinImg.dragable = 'false';
    mapPin.appendChild(mapPinImg);
    return mapPin;
  };

  var mainPinStart = {
    left: window.mainPin.offsetLeft,
    top: window.mainPin.offsetTop
  };

  window.pins = {
    drawMapPins: function (offersData) {
      var offersCopy = offersData.slice(0, MAX_PINS_QUANTITY);
      var pinsFragment = document.createDocumentFragment();
      for (var i = 0; i < offersCopy.length; i++) {
        pinsFragment.appendChild(renderMapPin(offersData[i]));
      }
      mapPins.appendChild(pinsFragment);
    },
    removeMapPins: function () {
      var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < pins.length; i++) {
        mapPins.removeChild(pins[i]);
      }
    },
    resetMainPin: function () {
      window.mainPin.style.left = mainPinStart.left + 'px';
      window.mainPin.style.top = mainPinStart.top + 'px';
      window.form.setAddress();
    }
  };
})();
