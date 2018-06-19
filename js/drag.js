'use strict';

(function () {
  var MAIN_PIN_SIZES = {
    width: 50,
    height: 82
  };

  var MAIN_PIN_SIZES_HALFED = {
    width: MAIN_PIN_SIZES.width / 2,
    height: MAIN_PIN_SIZES.height / 2
  };

  var PIN_RESTRICTIONS = {
    minY: 130,
    maxY: 630,
    minX: 0,
    maxX: 1100
  };

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if ((mainPin.offsetTop - shift.y) < PIN_RESTRICTIONS.maxY - MAIN_PIN_SIZES_HALFED.height && mainPin.offsetTop - shift.y > PIN_RESTRICTIONS.minY - MAIN_PIN_SIZES_HALFED.height) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }
      if (mainPin.offsetLeft - shift.x > PIN_RESTRICTIONS.minX + MAIN_PIN_SIZES_HALFED.width && mainPin.offsetLeft - shift.x < PIN_RESTRICTIONS.maxX) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    window.form.setAddress();
  });
})();
