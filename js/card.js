'use strict';

(function () {

  var PIN_IMAGE_SIZES = {
    width: '40',
    height: '40'
  };

  var TYPES_MAP = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

  window.card = {
    renderAdvertCard: function (offerData) {
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
        photoImage.width = PIN_IMAGE_SIZES.width;
        photoImage.height = PIN_IMAGE_SIZES.height;
        photoImage.dragable = 'false';
        photoImage.src = offerData.offer.photos[j];
        popupPhotos.appendChild(photoImage);
      }
      return renderedCard;
    }
  };
})();
