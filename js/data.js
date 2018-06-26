'use strict';

(function () {
  window.adverts = [];

  var onSuccessGetAdvertsArray = function (serverData) {
    window.adverts = serverData;
    for (var i = 0; i < window.adverts.length; i++) {
      window.adverts[i].offer.number = i;
    }
  };

  window.backend.download(onSuccessGetAdvertsArray, window.utils.onErrorRenderMessage);

})();
