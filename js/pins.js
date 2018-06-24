'use strict';

(function () {
  var MAP_PIN_WIDTH = '40';
  var MAP_PIN_HEIGHT = '40';
  var MAP_PIN_OFFSET_X = '30';
  var MAP_PIN_OFFSET_Y = '87';

  window.mainPin = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');

  var renderMapPin = function (offerData, index) {
    var mapPin = document.createElement('button');
    mapPin.className = 'map__pin';
    mapPin.setAttribute('data-number', index);
    mapPin.style.left = offerData.location.x - MAP_PIN_OFFSET_X + 'px';
    mapPin.style.top = offerData.location.y - MAP_PIN_OFFSET_Y + 'px';
    mapPin.addEventListener('click', window.openPopup);
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
    drawMapPins: function (pinsNumber, offerData) {
      for (var i = 0; i < pinsNumber; i++) {
        mapPins.appendChild(renderMapPin(offerData[i], i));
      }
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
    }
  };
})();
