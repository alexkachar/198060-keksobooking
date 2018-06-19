'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var map = document.querySelector('.map');

  window.utils = {
    onPressEnterShow: function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        window.mapObj.makeInterfaceVisible();
        window.form.setAddress();
      }
    },

    onMouseUpShow: function () {
      window.mapObj.makeInterfaceVisible();
      window.form.setAddress();
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
        window.utils.closePopup();
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
      popupClose.addEventListener('click', window.utils.closePopup);
      document.addEventListener('keydown', this.onPressEscClose);
    }
  };
})();
