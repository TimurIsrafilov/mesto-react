import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [place, setPlace] = React.useState("");
  const [reference, setReference] = React.useState("");

  const inputNameRef = React.useRef(0);
  const inputLinkRef = React.useRef(0);

  function handlePlaceChange(e) {
    setPlace(e.target.value);
  }

  function handleReferenceChange(e) {
    setReference(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: place,
      link: reference,
    });
    inputNameRef.current.value = "";
    inputLinkRef.current.value = "";
  }

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="place-input"
        type="text"
        placeholder="Название"
        name="place"
        required
        className="popup__input popup__input_type_place"
        // minLength="2"
        // maxLength="30"
        ref={inputNameRef}
        onChange={handlePlaceChange}
      />
      <span className="popup__input-error place-input-error"></span>
      <input
        id="reference-input"
        type="url"
        placeholder="Ссылка на картинку"
        name="reference"
        required
        className="popup__input popup__input_type_reference"
        ref={inputLinkRef}
        onChange={handleReferenceChange}
      />
      <span className="popup__input-error reference-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
