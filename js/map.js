'use strict';

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomValueFromArray = function (array) {
  return array[getRandomValue(0, array.length - 1)];
};

var getUniqueValueFromArray = function (array) {
  return array.splice(Math.floor(Math.random() * array.length), 1).toString();
};

var getRandomArray = function (array) {
  var sourceArray = array.slice().sort();
  var randomArray = [];
  var randomLength = getRandomValue(1, (array.length - 1));
  for (var i = 0; i <= randomLength; i++) {
    randomArray[i] = getUniqueValueFromArray(sourceArray);
  }
  return randomArray;
};

var getShuffledArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  return array;
};

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var MAP_PIN_WIDTH = '40';
var MAP_PIN_HEIGHT = '40';
var MAP_PIN_OFFSET_X = '30';
var MAP_PIN_OFFSET_Y = '87';

var PHOTO_IMAGE_WIDTH = '40';
var PHOTO_IMAGE_HEIGHT = '40';

var ADVERTS_NUMBER = 8;
var IMAGES = ['01', '02', '03', '04', '05', '06', '07', '08'];
var TITLES_LIST = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var TYPES_MAP = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};
var TYPES = ['palace', 'flat', 'house', 'bungalo'];

var TIMES_LIST = ['12:00', '13:00', '14:00'];
var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_LIST = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var mainPin = map.querySelector('.map__pin--main');
var addressField = adForm.querySelector('#address');

var generateAdvert = function () {
  var locationX = getRandomValue(300, 900);
  var locationY = getRandomValue(130, 630);
  var advert = {
    author: {
      avatar: 'img/avatars/user' + getUniqueValueFromArray(IMAGES) + '.png'
    },
    offer: {
      title: getUniqueValueFromArray(TITLES_LIST),
      address: locationX + ', ' + locationY,
      price: getRandomValue(1000, 1000000),
      type: getRandomValueFromArray(TYPES),
      rooms: getRandomValue(1, 5),
      guests: getRandomValue(1, 10),
      checkin: getRandomValueFromArray(TIMES_LIST),
      checkout: getRandomValueFromArray(TIMES_LIST),
      features: getRandomArray(FEATURES_LIST),
      description: '',
      photos: getShuffledArray(PHOTOS_LIST)
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
  return advert;
};

var generateAdvertsArray = function (advertsNumber) {
  var adverts = [];
  for (var i = 0; i < advertsNumber; i++) {
    adverts.push(generateAdvert());
  }
  return adverts;
};

var adverts = generateAdvertsArray(ADVERTS_NUMBER);

var renderMapNode = function (offerData, index) {
  var mapPin = document.createElement('button');
  mapPin.className = 'map__pin';
  mapPin.setAttribute('data-number', index);
  mapPin.style.left = offerData.location.x - MAP_PIN_OFFSET_X + 'px';
  mapPin.style.top = offerData.location.y - MAP_PIN_OFFSET_Y + 'px';
  mapPin.addEventListener('click', openPopup);
  var mapPinImg = document.createElement('img');
  mapPinImg.src = offerData.author.avatar;
  mapPinImg.alt = offerData.offer.title;
  mapPinImg.width = MAP_PIN_WIDTH;
  mapPinImg.height = MAP_PIN_HEIGHT;
  mapPinImg.dragable = 'false';
  mapPin.appendChild(mapPinImg);
  return mapPin;
};

var drawMapPins = function (pinsNumber) {
  var mapPins = document.querySelector('.map__pins');
  for (var i = 0; i < pinsNumber; i++) {
    mapPins.appendChild(renderMapNode(adverts[i], i));
  }
};

var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

var renderAdvertCard = function (offerData) {
  var renderedCard = mapCardTemplate.cloneNode(true);
  renderedCard.querySelector('.popup__avatar').src = offerData.author.avatar;
  renderedCard.querySelector('.popup__title').textContent = offerData.offer.title;
  renderedCard.querySelector('.popup__text--address').textContent = offerData.offer.address;
  renderedCard.querySelector('.popup__text--price').textContent = offerData.offer.price + '₽/ночь';
  renderedCard.querySelector('.popup__type').textContent = TYPES_MAP[offerData.offer.type];
  renderedCard.querySelector('.popup__text--capacity').textContent = offerData.offer.rooms + ' комнаты для ' + offerData.offer.guests + ' гостей';
  renderedCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerData.offer.checkin + ', выезд до' + offerData.offer.checkout;
  renderedCard.querySelector('.popup__description').textContent = offerData.offer.description;

  var popupFeatures = renderedCard.querySelector('.popup__features');
  popupFeatures.innerHTML = '';

  for (var t = 0; t < offerData.offer.features.length; t++) {
    var featureItem = document.createElement('li');
    featureItem.className = 'popup__feature popup__feature--' + offerData.offer.features[t];
    popupFeatures.appendChild(featureItem);
  }

  var popupPhotos = renderedCard.querySelector('.popup__photos');
  popupPhotos.innerHTML = '';

  for (var j = 0; j < offerData.offer.photos.length; j++) {
    var photoImage = document.createElement('img');
    photoImage.className = 'popup__photo';
    photoImage.width = PHOTO_IMAGE_WIDTH;
    photoImage.height = PHOTO_IMAGE_HEIGHT;
    photoImage.dragable = 'false';
    photoImage.src = offerData.offer.photos[j];
    popupPhotos.appendChild(photoImage);
  }
  return renderedCard;
};

var setAddress = function () {
  addressField.value = (mainPin.offsetLeft
      + Math.round(mainPin.offsetWidth / 2)) + ', '
      + (mainPin.offsetTop + Math.round(mainPin.offsetHeight));
};

var fieldsetModeSwitcher = function (flag) {
  var fieldset = document.querySelectorAll('fieldset');
  for (var i = 0; i < fieldset.length; i++) {
    fieldset[i].disabled = flag;
  }
};

var showForm = function () {
  adForm.classList.remove('ad-form--disabled');
};

var fadeMap = function () {
  map.classList.add('map--faded');
};

var unfadeMap = function () {
  map.classList.remove('map--faded');
};

var fadeInterface = function () {
  fadeMap();
  fieldsetModeSwitcher(true);
};

var makeInterfaceVisible = function () {
  unfadeMap();
  showForm();
  fieldsetModeSwitcher(false);
  drawMapPins(ADVERTS_NUMBER);
};

var onMouseUpShow = function () {
  makeInterfaceVisible();
};

var onPressEnterShow = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    makeInterfaceVisible();
  }
};

var closePopup = function () {
  if (map.contains(map.querySelector('.popup'))) {
    map.querySelector('.popup').remove();
    map.querySelector('.map__pin--active').classList.remove('map__pin--active');
    document.removeEventListener('keydown', onPressEscClose);
  }
};

var onPressEscClose = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function (evt) {
  if (map.contains(map.querySelector('.map__pin--active'))) {
    map.querySelector('.map__pin--active').classList.remove('map__pin--active');
  }
  if (map.contains(map.querySelector('.popup'))) {
    map.querySelector('.popup').remove();
  }
  evt.currentTarget.classList.add('map__pin--active');
  map.insertBefore(renderAdvertCard(adverts[evt.currentTarget.dataset.number]), document.querySelector('.map__filters-container'));
  var popupClose = document.querySelector('.popup__close');
  popupClose.addEventListener('click', closePopup);
  document.addEventListener('keydown', onPressEscClose);
};

mainPin.addEventListener('mouseup', onMouseUpShow);
mainPin.addEventListener('keydown', onPressEnterShow);
map.addEventListener('keydown', onPressEscClose);

fadeInterface();
setAddress();

// Блок валидации формы

var adFormTitleField = adForm.querySelector('#title');
var adFormPriceField = adForm.querySelector('#price');
var adFormTypeField = adForm.querySelector('#type');
var adFormRoomsSelect = adForm.querySelector('#room_number');
var adFormCapacitySelect = adForm.querySelector('#capacity');
var adFormCheckInSelect = adForm.querySelector('#timein');
var adFormCheckOutSelect = adForm.querySelector('#timeout');

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
      adFormPriceField.min = '1000';
      adFormPriceField.placeholder = '1000';
      return;
    case 'house':
      adFormPriceField.min = '5000';
      adFormPriceField.placeholder = '5000';
      return;
    case 'palace':
      adFormPriceField.min = '10000';
      adFormPriceField.placeholder = '10000';
      return;
    default:
      adFormPriceField.min = '0';
      adFormPriceField.placeholder = '0';
      return;
  }
});

//  Блок проверки количества комнат и гостей

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

// Блок проверки времеми въезда/выезда

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
