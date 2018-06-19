'use strict';

(function () {
  var MAP_PIN_WIDTH = '40';
  var MAP_PIN_HEIGHT = '40';
  var MAP_PIN_OFFSET_X = '30';
  var MAP_PIN_OFFSET_Y = '87';

  var renderMapPin = function (offerData, index) {
    var mapPin = document.createElement('button');
    mapPin.className = 'map__pin';
    mapPin.setAttribute('data-number', index);
    mapPin.style.left = offerData.location.x - MAP_PIN_OFFSET_X + 'px';
    mapPin.style.top = offerData.location.y - MAP_PIN_OFFSET_Y + 'px';
    mapPin.addEventListener('click', window.utils.openPopup);
    var mapPinImg = document.createElement('img');
    mapPinImg.src = offerData.author.avatar;
    mapPinImg.alt = offerData.offer.title;
    mapPinImg.width = MAP_PIN_WIDTH;
    mapPinImg.height = MAP_PIN_HEIGHT;
    mapPinImg.dragable = 'false';
    mapPin.appendChild(mapPinImg);
    return mapPin;
  };

  window.pins = {
    drawMapPins: function (pinsNumber) {
      var mapPins = document.querySelector('.map__pins');
      for (var i = 0; i < pinsNumber; i++) {
        mapPins.appendChild(renderMapPin(window.adverts[i], i));
      }
    }
  };
})();
