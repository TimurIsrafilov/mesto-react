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

  const [userName, setUserName] = useState([]);
  const [userDescription, setUserDescription] = useState([]);
  const [userAvatar, setUserAvatar] = useState([]);

  const [cards, setCards] = useState([]);

  const [selectedCard, setSelectedCard] = useState(false);

  useEffect(() => {
    api.getProfileInfo(userName, userDescription, userAvatar).then((res) => {
      setUserName(res.name);
      setUserDescription(res.about);
      setUserAvatar(res.avatar);
    });
  }, []);

  useEffect(() => {
    api.getInitialCards(cards).then((res) => {
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
    setSelectedCard(false);
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

        {isEditProfilePopupOpen && (
          <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            isOpen="popup_opened"
            onClose={closeAllPopups}
          >
            <input
              id="name-input"
              type="text"
              value=""
              placeholder="Имя"
              name="name"
              required
              className="popup__input popup__input_type_name"
              minlength="2"
              maxlength="40"
            />
            <span className="popup__input-error name-input-error"></span>
            <input
              id="profession-input"
              type="text"
              value=""
              placeholder="Профессия"
              name="profession"
              required
              className="popup__input popup__input_type_profession"
              minlength="2"
              maxlength="200"
            />
            <span className="popup__input-error profession-input-error"></span>
          </PopupWithForm>
        )}

        {isAddPlacePopupOpen && (
          <PopupWithForm
            name="card"
            title="Новое место"
            isOpen="popup_opened"
            onClose={closeAllPopups}
          >
            <input
              id="place-input"
              type="text"
              placeholder="Название"
              name="place"
              required
              className="popup__input popup__input_type_place"
              minlength="2"
              maxlength="30"
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
        )}

        {isEditAvatarPopupOpen && (
          <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            isOpen="popup_opened"
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
        )}

        <PopupWithForm name="confirmation" title="Вы уверены?">
          <button
            type="submit"
            className="popup__submit-button"
            aria-label="согласен"
          >
            Да
          </button>
        </PopupWithForm>

        {selectedCard && (
          <ImagePopup
            card={selectedCard}
            isOpen="popup_opened"
            onClose={closeAllPopups}
          />
        )}

        <Footer />
      </div>
    </div>
  );
}

export default App;
