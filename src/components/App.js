import React, { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { useState } from "react";
import api from "../utils/api";

/////
import { CurrentUserContext, currentUser } from '../contexts/CurrentUserContext';
// import { CurrentCardContext, currentCard } from '../contexts/CurrentCardContext';
/////



function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  // const [userName, setUserName] = useState("");
  // const [userDescription, setUserDescription] = useState("");
  // const [userAvatar, setUserAvatar] = useState("");

  const [cards, setCards] = useState([]);

  const [selectedCard, setSelectedCard] = useState(null);

  // const [currentCard, setCurrentCard] = useState(null);
  // const [likedCard, setLikedCard] = useState(null);

  useEffect(() => {
    api.getInitialCards().then((res) => {
      setCards(res);
    });
  }, []);

  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    api.getProfileInfo().then((res) => {
      setCurrentUser(res);
    });
  }, []);


  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((cards) => cards.map((c) => (c._id === card._id ? newCard : c)));
    });
  }




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
    // setCurrentCard(null);
  }

  return (
    <div className="App">

      <CurrentUserContext.Provider value={currentUser}>

      <div className="page">
        <Header />


        
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          // userName={userName}
          // userDescription={userDescription}
          // userAvatar={userAvatar}
          cards={cards}
          onCardClick={setSelectedCard}
          // onCardClick={setCurrentCard}
          onCardLike={handleCardLike}

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

      </CurrentUserContext.Provider>

    </div>
  );
}

export default App;
