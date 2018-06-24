'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelectorAll('.map__checkbox');

  var onPriceTypeChange = function (advert) {
    switch (housingPrice[housingPrice.selectedIndex].value) {
      case 'low':
        return advert.offer.price <= 10000;
      case 'middle':
        return advert.offer.price >= 10000 && advert.offer.price <= 50000;
      case 'high':
        return advert.offer.price >= 50000;
      default:
        return advert;
    }
  };

  var customizeAdvert = function () {
    var slicedAdvert = window.adverts.slice();
    var filterdAdvert = slicedAdvert.filter(onPriceTypeChange);
    window.pins.removeMapPins();
    window.pins.drawMapPins(filterdAdvert.length, filterdAdvert);
  };

  mapFilters.addEventListener('change', customizeAdvert);
})();
