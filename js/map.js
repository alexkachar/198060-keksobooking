'use strict';

(function () {
  var map = document.querySelector('.map');
  window.mainPin = map.querySelector('.map__pin--main');

  window.mapObj = {
    fadeMap: function () {
      map.classList.add('map--faded');
    },

    unfadeMap: function () {
      map.classList.remove('map--faded');
    },

    fadeInterface: function () {
      this.fadeMap();
      window.form.fieldsetModeSwitcher(true);
    },

    makeInterfaceVisible: function () {
      this.unfadeMap();
      window.form.showForm();
      window.form.fieldsetModeSwitcher(false);
      window.pins.drawMapPins(window.ADVERTS_NUMBER);
    }
  };

  window.mainPin.addEventListener('mouseup', window.utils.onMouseUpShow);
  window.mainPin.addEventListener('keydown', window.utils.onPressEnterShow);
  map.addEventListener('keydown', window.utils.onPressEscClose);

  window.mapObj.fadeInterface();
})();
