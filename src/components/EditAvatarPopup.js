import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const [value, setValue] = React.useState("");

  const inputRef = React.useRef(0);

  function handleAvatarChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: value,
    });
    inputRef.current.value = "";
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="avatar-input"
        type="url"
        placeholder="Ссылка на новый аватар"
        name="avatar"
        required
        className="popup__input popup__input_type_reference"
        ref={inputRef}
        onChange={handleAvatarChange}
      />
      <span className="popup__input-error avatar-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
