'use strict';

(function () {
  var MAIN_PIN_SIZES = {
    width: window.mainPin.offsetWidth,
    height: window.mainPin.offsetHeight
  };

  var MAIN_PIN_WIDTH_HALFED = MAIN_PIN_SIZES.width / 2;

  var MAIN_PIN_LIMITS = {
    minY: 129,
    maxY: 631,
    minX: -1,
    maxX: 1168
  };


  window.mainPin.addEventListener('mousedown', function (evt) {
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

      var shiftOffsetY = window.mainPin.offsetTop - shift.y;
      var shiftOffsetX = window.mainPin.offsetLeft - shift.x;

      if (shiftOffsetY < MAIN_PIN_LIMITS.maxY - MAIN_PIN_SIZES.height
          && shiftOffsetY > MAIN_PIN_LIMITS.minY - MAIN_PIN_SIZES.height) {
        window.mainPin.style.top = shiftOffsetY + 'px';
      }
      if (shiftOffsetX > MAIN_PIN_LIMITS.minX - MAIN_PIN_WIDTH_HALFED
          && shiftOffsetX < MAIN_PIN_LIMITS.maxX) {
        window.mainPin.style.left = shiftOffsetX + 'px';
      }

      window.form.setAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
