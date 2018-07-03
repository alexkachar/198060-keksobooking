'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var map = document.querySelector('.map');

  var unfadeMap = function () {
    map.classList.remove('map--faded');
  };

  var fadeInterface = function () {
    window.map.fadeMap();
    window.form.switchFieldsetMode(true);
    window.form.setAddress();
  };

  var removeMainPinListerners = function () {
    if (!map.classList.contains('map--faded')) {
      window.mainPin.removeEventListener('mouseup', onMouseUpShow);
      window.mainPin.removeEventListener('keydown', onPressEnterShow);
    }
  };

  var makeInterfaceVisible = function () {
    unfadeMap();
    window.form.showForm();
    window.form.switchFieldsetMode(false);
    window.pins.drawMapPins(window.adverts);
    removeMainPinListerners();
    window.form.setAddress();
  };

  var onPressEnterShow = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      makeInterfaceVisible();
    }
  };

  var onMouseUpShow = function () {
    makeInterfaceVisible();
  };

  window.map = {
    fadeMap: function () {
      map.classList.add('map--faded');
    },

    closePopup: function () {
      if (map.contains(map.querySelector('.popup'))) {
        map.querySelector('.popup').remove();
        map.querySelector('.map__pin--active').classList.remove('map__pin--active');
        document.removeEventListener('keydown', onPressEscClose);
      }
    },

    openPopup: function (evt) {
      if (map.contains(map.querySelector('.map__pin--active'))) {
        map.querySelector('.map__pin--active').classList.remove('map__pin--active');
      }
      if (map.contains(map.querySelector('.popup'))) {
        map.querySelector('.popup').remove();
      }
      evt.currentTarget.classList.add('map__pin--active');
      map.insertBefore(window.card.renderAdvertCard(window.adverts[evt.currentTarget.dataset.number]), document.querySelector('.map__filters-container'));
      var popupClose = document.querySelector('.popup__close');
      popupClose.addEventListener('click', window.map.closePopup);
      document.addEventListener('keydown', onPressEscClose);
    },

    addMainPinListeners: function () {
      window.mainPin.addEventListener('mouseup', onMouseUpShow);
      window.mainPin.addEventListener('keydown', onPressEnterShow);
    }
  };

  var onPressEscClose = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.map.closePopup();
    }
  };

  window.map.addMainPinListeners();
  map.addEventListener('keydown', onPressEscClose);

  fadeInterface();
})();
