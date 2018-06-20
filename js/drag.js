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

      if ((window.mainPin.offsetTop - shift.y) < PIN_RESTRICTIONS.maxY - MAIN_PIN_SIZES_HALFED.height && window.mainPin.offsetTop - shift.y > PIN_RESTRICTIONS.minY - MAIN_PIN_SIZES_HALFED.height) {
        window.mainPin.style.top = (window.mainPin.offsetTop - shift.y) + 'px';
      }
      if (window.mainPin.offsetLeft - shift.x > PIN_RESTRICTIONS.minX + MAIN_PIN_SIZES_HALFED.width && window.mainPin.offsetLeft - shift.x < PIN_RESTRICTIONS.maxX) {
        window.mainPin.style.left = (window.mainPin.offsetLeft - shift.x) + 'px';
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
