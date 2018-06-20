'use strict';

(function () {

  window.ADVERTS_NUMBER = 8;
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

  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var TIMES_LIST = ['12:00', '13:00', '14:00'];
  var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS_LIST = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var generateAdvert = function () {
    var locationX = window.utils.getRandomValue(300, 900);
    var locationY = window.utils.getRandomValue(130, 630);
    var advert = {
      author: {
        avatar: 'img/avatars/user' + window.utils.getUniqueValueFromArray(IMAGES) + '.png'
      },
      offer: {
        title: window.utils.getUniqueValueFromArray(TITLES_LIST),
        address: locationX + ', ' + locationY,
        price: window.utils.getRandomValue(1000, 1000000),
        type: window.utils.getRandomValueFromArray(TYPES),
        rooms: window.utils.getRandomValue(1, 5),
        guests: window.utils.getRandomValue(1, 10),
        checkin: window.utils.getRandomValueFromArray(TIMES_LIST),
        checkout: window.utils.getRandomValueFromArray(TIMES_LIST),
        features: window.utils.getRandomArray(FEATURES_LIST),
        description: '',
        photos: window.utils.getShuffledArray(PHOTOS_LIST)
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

  window.adverts = generateAdvertsArray(window.ADVERTS_NUMBER);
})();
