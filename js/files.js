'use strict';

(function () {

  var PREVIEW_PARAMETERS = {
    width: '70',
    height: '70',
    style: 'border-radius: 5px;'
  };

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PREVIEW_PADDING = 'padding: 0;';

  var adForm = document.querySelector('.ad-form');
  var adFormAvatarField = adForm.querySelector('#avatar');
  var adFormAvatarPreviewCover = adForm.querySelector('.ad-form-header__preview');
  var adFormAvatarPreview = adForm.querySelector('.ad-form-header__preview img');
  var adFormImagesField = adForm.querySelector('#images');
  var adFormPhoto = adForm.querySelector('.ad-form__photo');
  var adFormPhotoContainer = adForm.querySelector('.ad-form__photo-container');

  var onSuccessLoadAvatar = function () {
    var file = adFormAvatarField.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        adFormAvatarPreview.src = reader.result;
        adFormAvatarPreview.width = PREVIEW_PARAMETERS.width;
        adFormAvatarPreview.height = PREVIEW_PARAMETERS.height;
        adFormAvatarPreview.style = PREVIEW_PARAMETERS.style;
        adFormAvatarPreviewCover.style = PREVIEW_PADDING;
      });

      reader.readAsDataURL(file);
    }
  };

  var onSuccessLoadImages = function () {
    var file = adFormImagesField.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var photoCover = document.createElement('div');
        photoCover.className = 'ad-form__photo';
        var photo = document.createElement('img');
        photo.src = reader.result;
        photo.width = PREVIEW_PARAMETERS.width;
        photo.height = PREVIEW_PARAMETERS.height;
        photo.style = PREVIEW_PARAMETERS.style;
        photoCover.appendChild(photo);
        adFormPhotoContainer.insertBefore(photoCover, adFormPhoto);
      });

      reader.readAsDataURL(file);
    }
  };

  adFormAvatarField.addEventListener('change', onSuccessLoadAvatar);
  adFormImagesField.addEventListener('change', onSuccessLoadImages);
})();
