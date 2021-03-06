'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.utils = {
    keyCodes: {
      ESC_KEYCODE: ESC_KEYCODE,
      ENTER_KEYCODE: ENTER_KEYCODE
    },
    onErrorRenderMessage: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    },
    debounce: function (action) {
      var lastTimeout;
      return function () {
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(action, DEBOUNCE_INTERVAL);
      };
    }
  };
})();
