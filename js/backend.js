'use strict';

(function () {
  var URL_DOWNLOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 10000;

  var SERVER_CODES = {
    success: 200,
    badRequest: 400,
    forbidden: 403,
    notFound: 404,
    internalServerError: 500
  };

  var xhrRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case SERVER_CODES.success:
          onSuccess(xhr.response);
          break;
        case SERVER_CODES.badRequest:
          onError('Ошибка ' + xhr.status + '. Некорректный запрос.');
          break;
        case SERVER_CODES.forbidden:
          onError('Ошибка ' + xhr.status + '. Отказано в доступе.');
          break;
        case SERVER_CODES.notFound:
          onError('Ошибка ' + xhr.status + '. Страница не найдена.');
          break;
        case SERVER_CODES.internalServerError:
          onError('Ошибка ' + xhr.status + '. Неполадки на сервере. Попробуйте позже.');
          break;
        default:
          onError('Ошибка ' + xhr.status + xhr.statusText);
      }
    });

    xhr.timeout = TIMEOUT;

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  window.backend = {
    download: function (onSuccess, onError) {
      var xhr = xhrRequest(onSuccess, onError);
      xhr.open('GET', URL_DOWNLOAD);
      xhr.send();
    },

    upload: function (onSuccess, onError, data) {
      var xhr = xhrRequest(onSuccess, onError);
      xhr.open('POST', URL_UPLOAD);
      xhr.send(data);
    }
  };
})();
