'use strict';

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var MAP_PIN_WIDTH = '40';
var MAP_PIN_HEIGHT = '40';
var MAP_PIN_OFFSET_X = '30';
var MAP_PIN_OFFSET_Y = '87';

var PHOTO_IMAGE_WIDTH = '40';
var PHOTO_IMAGE_HEIGHT = '40';

var map = document.querySelector('.map');
var mainPin = map.querySelector('.map__pin--main');

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
    mapPins.appendChild(renderMapNode(window.adverts[i], i));
  }
};

var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

var TYPES_MAP = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

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

var fieldsetModeSwitcher = function (flag) {
  var fieldset = document.querySelectorAll('fieldset');
  for (var i = 0; i < fieldset.length; i++) {
    fieldset[i].disabled = flag;
  }
};

var adForm = document.querySelector('.ad-form');

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

var ADVERTS_NUMBER = 8;

var makeInterfaceVisible = function () {
  unfadeMap();
  showForm();
  fieldsetModeSwitcher(false);
  drawMapPins(ADVERTS_NUMBER);
};

var onMouseUpShow = function () {
  makeInterfaceVisible();
  window.utils.setAddress();
};

var onPressEnterShow = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    makeInterfaceVisible();
    window.utils.setAddress();
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
  map.insertBefore(renderAdvertCard(window.adverts[evt.currentTarget.dataset.number]), document.querySelector('.map__filters-container'));
  var popupClose = document.querySelector('.popup__close');
  popupClose.addEventListener('click', closePopup);
  document.addEventListener('keydown', onPressEscClose);
};

mainPin.addEventListener('mouseup', onMouseUpShow);
mainPin.addEventListener('keydown', onPressEnterShow);
map.addEventListener('keydown', onPressEscClose);

fadeInterface();
