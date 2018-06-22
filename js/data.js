'use strict';

(function () {
  window.adverts = [];

  var onSuccessGetAdvertsArray = function (serverData) {
    window.adverts = serverData;
  };

  window.backend.download(onSuccessGetAdvertsArray, window.utils.onErrorRenderMessage);

})();
