'use strict';

(function () {

  var RENT_VALUES = {
    'flat': {
      min: '1000',
      placeholder: '1000'
    },
    'house': {
      min: '5000',
      placeholder: '5000'
    },
    'palace': {
      min: '10000',
      placeholder: '10000'
    },
    'bungalo': {
      min: '0',
      placeholder: '0'
    }
  };

  var adForm = document.querySelector('.ad-form');
  var adFormTitleField = adForm.querySelector('#title');
  var adFormPriceField = adForm.querySelector('#price');
  var adFormTypeField = adForm.querySelector('#type');
  var adFormRoomsSelect = adForm.querySelector('#room_number');
  var adFormCapacitySelect = adForm.querySelector('#capacity');
  var adFormCheckInSelect = adForm.querySelector('#timein');
  var adFormCheckOutSelect = adForm.querySelector('#timeout');
  var adFormAddressField = adForm.querySelector('#address');
  var adFormReset = adForm.querySelector('.ad-form__reset');
  var successPopUp = document.querySelector('.success');

  window.form = {
    switchFieldsetMode: function (flag) {
      var fieldset = document.querySelectorAll('fieldset');
      for (var i = 0; i < fieldset.length; i++) {
        fieldset[i].disabled = flag;
      }
    },

    setAddress: function () {
      var pinCoordinates = (window.mainPin.offsetLeft + Math.round(window.drag.mainPinWidthHalfed)) + ', ' + (window.mainPin.offsetTop + Math.round(window.drag.mainPinHeight));
      adFormAddressField.setAttribute('placeholder', pinCoordinates);
      adFormAddressField.value = pinCoordinates;
    },

    showForm: function () {
      adForm.classList.remove('ad-form--disabled');
    },

    hideForm: function () {
      adForm.classList.add('ad-form--disabled');
    }
  };

  adForm.addEventListener('invalid', function (evt) {
    evt.target.classList.add('ad-form__input--invalid');
  }, true);

  adForm.addEventListener('change', function (evt) {
    var element = evt.target;
    if (element.validity.valid && element.classList.contains('invalid-input')) {
      element.classList.remove('invalid-input');
    }
  });

  adFormTitleField.addEventListener('input', function () {
    if (adFormTitleField.validity.tooShort) {
      adFormTitleField.setCustomValidity('Минимальная длина — 30 символов');
    } else if (adFormTitleField.validity.tooLong) {
      adFormTitleField.setCustomValidity('Максимальная длина — 100 символов');
    } else if (adFormTitleField.validity.valueMissing) {
      adFormTitleField.setCustomValidity('Обязательное поле');
    } else {
      adFormTitleField.setCustomValidity('');
    }
  });

  adFormTypeField.addEventListener('change', function () {
    switch (adFormTypeField.value) {
      case 'flat':
        adFormPriceField.min = RENT_VALUES.flat.min;
        adFormPriceField.placeholder = RENT_VALUES.flat.placeholder;
        return;
      case 'house':
        adFormPriceField.min = RENT_VALUES.house.min;
        adFormPriceField.placeholder = RENT_VALUES.house.placeholder;
        return;
      case 'palace':
        adFormPriceField.min = RENT_VALUES.palace.min;
        adFormPriceField.placeholder = RENT_VALUES.palace.placeholder;
        return;
      default:
        adFormPriceField.min = RENT_VALUES.bungalo.min;
        adFormPriceField.placeholder = RENT_VALUES.bungalo.placeholder;
        return;
    }
  });

  var disableCapacityOptions = function (num) {
    for (var i = 0; i < adFormCapacitySelect.children.length; i++) {
      adFormCapacitySelect.children[i].setAttribute('disabled', '');
    }

    adFormCapacitySelect.selectedIndex = num;
  };

  var addCapacityOption = function (from, to) {
    for (var i = from; i <= to; i++) {
      adFormCapacitySelect.children[i].removeAttribute('disabled', '');
    }
  };

  disableCapacityOptions(2);
  addCapacityOption(2, 2);

  adFormRoomsSelect.addEventListener('change', function (evt) {
    var target = evt.target;

    if (!target.selectedIndex) {
      disableCapacityOptions(2);
      addCapacityOption(2, 2);
    }

    if (target.selectedIndex === 1) {
      disableCapacityOptions(1);
      addCapacityOption(1, 2);
    }

    if (target.selectedIndex === 2) {
      disableCapacityOptions(0);
      addCapacityOption(0, 2);
    }

    if (target.selectedIndex === 3) {
      disableCapacityOptions(3);
      addCapacityOption(3, 3);
    }
  });

  var changeTime = function (target, value) {
    target.value = value;
  };

  adFormCheckInSelect.addEventListener('change', function () {
    changeTime(adFormCheckOutSelect, adFormCheckInSelect.value);
  });

  adFormCheckOutSelect.addEventListener('change', function () {
    changeTime(adFormCheckInSelect, adFormCheckOutSelect.value);
  });

  addEventListener('load', function () {
    adForm.reset();
  });

  var showSuccessPopUp = function () {
    successPopUp.classList.remove('hidden');
  };

  var hideSuccessPopup = function () {
    successPopUp.classList.add('hidden');
  };

  var onPressEscHideSuccessPopup = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      hideSuccessPopup();
    }
  };

  var hideSuccessPopupWithTimeout = function () {
    setTimeout(function () {
      successPopUp.classList.add('hidden');
    }, 5000);
  };

  if (successPopUp.classList.contains('hidden')) {
    document.addEventListener('click', hideSuccessPopup);
    document.addEventListener('keydown', onPressEscHideSuccessPopup);
  }

  var resetInterface = function () {
    window.form.switchFieldsetMode(true);
    window.form.hideForm();
    window.map.fadeMap();
    window.pins.removeMapPins();
    window.resetFilesLoaders();
    adForm.reset();
    window.pins.resetMainPin();
    window.map.addMainPinListeners();
  };

  var onFormUploadSuccess = function () {
    showSuccessPopUp();
    hideSuccessPopupWithTimeout();
    resetInterface();
  };

  var onAdFormResetClick = function (evt) {
    evt.preventDefault();
    resetInterface();
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(onFormUploadSuccess, window.utils.onErrorRenderMessage, new FormData(adForm));
  });

  adFormReset.addEventListener('click', onAdFormResetClick);
})();
