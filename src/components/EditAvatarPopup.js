import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const [value, setValue] = React.useState("");

  // Реализация данного комментария не понятна:
  // "Используйте один подход для поля ввода - или управляемые компоненты
  // с хранением значения в стейте или неуправляемые компоненты с использованием ref,
  // применять оба подхода на одном компоненте нет смысла.""


  // При реализации использовал пример из темы Рефы:
  // function MessageComposer() {
  //   const [value, setValue] = React.useState('');
  //   const counterRef = React.useRef(0);
  
  //   function handleChange(e) {
  //     setValue(e.target.value);
  //   }
  
  //   return (
  //     <>
  //       <input type="text" value={value} onChange={handleChange} />
  //       <h4>Рендеров: {++counterRef.current}</h4>
  //     </>
  //   );
  // }

  // Если пример из теории не корректный, прошу посоветовать ссылку на решение, т.к. в мануале Реакта по данному хуку минимум инфы

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
