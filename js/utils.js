'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var map = document.querySelector('.map');
  var ADVERTS_NUMBER = 8;

  window.utils = {
    makeInterfaceVisible: function () {
      window.map.unfadeMap();
      window.form.showForm();
      window.form.fieldsetModeSwitcher(false);
      window.pins.drawMapPins(ADVERTS_NUMBER);
    },
    onPressEnterShow: function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        this.makeInterfaceVisible();
        window.utils.setAddress();
      }
    },
    onMouseUpShow: function () {
      this.makeInterfaceVisible();
      window.utils.setAddress();
    },
    closePopup: function () {
      if (map.contains(map.querySelector('.popup'))) {
        map.querySelector('.popup').remove();
        map.querySelector('.map__pin--active').classList.remove('map__pin--active');
        document.removeEventListener('keydown', this.onPressEscClose);
      }
    },
    onPressEscClose: function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        this.closePopup();
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
      popupClose.addEventListener('click', this.closePopup);
      document.addEventListener('keydown', this.onPressEscClose);
    }
  };
})();
