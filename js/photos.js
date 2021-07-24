const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const chooseAvatar = document.querySelector('.ad-form-header__input');
const previewBlock = document.querySelector('.ad-form-header__preview');
const previewAvatar = previewBlock.querySelector('img');

const choosePhotoHousing = document.querySelector('.ad-form__input');
const previewPhotoHousing = document.querySelector('.ad-form__photo');

chooseAvatar.addEventListener('change', () => {
  previewAvatar.classList.add('hidden');
  previewBlock.style.padding = 0;
  const file = chooseAvatar.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const newAvatart = document.createElement('img');
      newAvatart.width = 70;
      newAvatart.height = 70;
      newAvatart.alt = 'Аватар пользователя';
      newAvatart.src = reader.result;
      previewBlock.appendChild(newAvatart);

      chooseAvatar.addEventListener('change', ()=> {
        newAvatart.remove();
      });
    });

    reader.readAsDataURL(file);
  }
});

choosePhotoHousing.addEventListener('change', () => {
  const file = choosePhotoHousing.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const previewPhoto =  document.createElement('img');
      previewPhoto.width = 70;
      previewPhoto.height = 70;
      previewPhoto.alt = 'Фотография жилья';
      previewPhoto.src = reader.result;
      previewPhotoHousing.appendChild(previewPhoto);

      choosePhotoHousing.addEventListener('change', () => {
        previewPhoto.remove();
      });
    });

    reader.readAsDataURL(file);
  }
});

const removePhoto = () => {
  previewBlock.innerHTML = '';
  previewPhotoHousing.innerHTML = '';
  previewAvatar.classList.remove('hidden');
};

export {removePhoto};
