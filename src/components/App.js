import React, { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { useState } from "react";
import api from "../utils/api";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  const [cards, setCards] = useState([]);

  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    api.getProfileInfo().then((res) => {
      setUserName(res.name);
      setUserDescription(res.about);
      setUserAvatar(res.avatar);
    });
  }, []);

  useEffect(() => {
    api.getInitialCards().then((res) => {
      setCards(res);
    });
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <div className="App">
      <div className="page">
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          userName={userName}
          userDescription={userDescription}
          userAvatar={userAvatar}
          cards={cards}
          onCardClick={setSelectedCard}
        />

        <PopupWithForm
          name="profile"
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            id="name-input"
            type="text"
            // value=""
            placeholder="Имя"
            name="name"
            required
            className="popup__input popup__input_type_name"
            // minLength="2"
            // maxLength="40"
          />
          <span className="popup__input-error name-input-error"></span>
          <input
            id="profession-input"
            type="text"
            // value=""
            placeholder="Профессия"
            name="profession"
            required
            className="popup__input popup__input_type_profession"
            // minLength="2"
            // maxLength="200"
          />
          <span className="popup__input-error profession-input-error"></span>
        </PopupWithForm>

        <PopupWithForm
          name="card"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
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
          />
          <span className="popup__input-error place-input-error"></span>
          <input
            id="reference-input"
            type="url"
            placeholder="Ссылка на картинку"
            name="reference"
            required
            className="popup__input popup__input_type_reference"
          />
          <span className="popup__input-error reference-input-error"></span>
        </PopupWithForm>

        <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <input
            id="avatar-input"
            type="url"
            placeholder="Ссылка на новый аватар"
            name="avatar"
            required
            className="popup__input popup__input_type_reference"
          />
          <span className="popup__input-error avatar-input-error"></span>
        </PopupWithForm>

        <PopupWithForm name="confirmation" title="Вы уверены?">
          <button
            type="submit"
            className="popup__submit-button"
            aria-label="согласен"
          >
            Да
          </button>
        </PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <Footer />
      </div>
    </div>
  );
}

export default App;
