'use strict';

(function () {

  var PRICE_RANGES = {
    low: {
      min: 0,
      max: 10000
    },
    middle: {
      min: 10000,
      max: 50000
    },
    hight: {
      min: 50000,
      max: Infinity
    }
  };

  var mapFilters = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelectorAll('.map__checkbox');

  var onHousingTypeChange = function (advert) {
    if (housingType[housingType.selectedIndex].value === 'any') {
      return advert;
    }
    return advert.offer.type === housingType[housingType.selectedIndex].value;
  };

  var onHousingPriceChange = function (advert) {
    switch (housingPrice[housingPrice.selectedIndex].value) {
      case 'low':
        return advert.offer.price <= PRICE_RANGES.low.max;
      case 'middle':
        return advert.offer.price >= PRICE_RANGES.middle.min && advert.offer.price <= PRICE_RANGES.middle.max;
      case 'high':
        return advert.offer.price >= PRICE_RANGES.hight.min;
      default:
        return advert;
    }
  };

  var onHousingRoomsChange = function (advert) {
    if (housingRooms[housingRooms.selectedIndex].value === 'any') {
      return advert;
    }
    return advert.offer.rooms === parseInt(housingRooms[housingRooms.selectedIndex].value, 10);
  };

  var onHousingGuestChange = function (advert) {
    if (housingGuests[housingGuests.selectedIndex].value === 'any') {
      return advert;
    }
    return advert.offer.guests === parseInt(housingGuests[housingGuests.selectedIndex].value, 10);
  };

  var onHousingFeaturesChange = function (advert) {
    for (var i = 0; i < housingFeatures.length; i++) {
      if (housingFeatures[i].checked && advert.offer.features.indexOf(housingFeatures[i].value) < 0) {
        return false;
      }
    }
    return true;
  };

  var customizeAdvert = function () {
    var advertsCopy = window.adverts.slice();
    var filteredAdvert = advertsCopy.filter(onHousingTypeChange)
        .filter(onHousingPriceChange)
        .filter(onHousingRoomsChange)
        .filter(onHousingGuestChange)
        .filter(onHousingFeaturesChange);
    window.map.closePopup();
    window.pins.removeMapPins();
    window.pins.drawMapPins(filteredAdvert);
  };

  mapFilters.addEventListener('change', window.utils.debounce(customizeAdvert));
})();
