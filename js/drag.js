'use strict';

(function () {
  var MAIN_PIN_TAIL = 18;

  var MAIN_PIN_SIZES = {
    width: window.mainPin.offsetWidth,
    height: window.mainPin.offsetHeight + MAIN_PIN_TAIL
  };

  var MAIN_PIN_WIDTH_HALFED = MAIN_PIN_SIZES.width / 2;

  var MAIN_PIN_LIMITS = {
    minY: 130,
    maxY: 630,
    minX: 0,
    maxX: 1200
  };

  var LIMITS_INCLUDING_PIN_SIZE = {
    minY: MAIN_PIN_LIMITS.minY - MAIN_PIN_SIZES.height,
    maxY: MAIN_PIN_LIMITS.maxY - MAIN_PIN_SIZES.height,
    minX: MAIN_PIN_LIMITS.minX - MAIN_PIN_WIDTH_HALFED,
    maxX: MAIN_PIN_LIMITS.maxX - MAIN_PIN_WIDTH_HALFED
  };

  window.drag = {
    mainPinWidthHalfed: MAIN_PIN_WIDTH_HALFED,
    mainPinHeight: MAIN_PIN_SIZES.height
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

      if (shiftOffsetY <= LIMITS_INCLUDING_PIN_SIZE.maxY && shiftOffsetY >= LIMITS_INCLUDING_PIN_SIZE.minY) {
        window.mainPin.style.top = shiftOffsetY + 'px';
      }
      if (shiftOffsetX >= LIMITS_INCLUDING_PIN_SIZE.minX && shiftOffsetX <= LIMITS_INCLUDING_PIN_SIZE.maxX) {
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
