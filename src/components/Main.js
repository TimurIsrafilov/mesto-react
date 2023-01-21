import React from 'react';
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__profile-container">
          <img
            // src={props.userAvatar}
            src={currentUser.avatar}
            alt="Аватарка"
            className="profile__avatar"
          />
          <img
            className="profile__avatar-button"
            onClick={props.onEditAvatar}
          />
          <div className="profile__profile-info">
            <div className="profile__profile-info-container">
              {/* <h1 className="profile__title">{props.userName}</h1> */}
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__edit-button"
                aria-label="редактировать профиль"
                onClick={props.onEditProfile}
              ></button>
            </div>
            {/* <p className="profile__subtitle">{props.userDescription}</p> */}
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          aria-label="добавить элемент"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {props.cards.map((card) => (
          <Card
            card={card}
            name={card.name}
            link={card.link}
            likes={card.likes}
            key={card._id}
            onCardClick={props.onCardClick}

            onCardLike={props.onCardLike}

  
          />
        ))}
      </section>
    </main>
  );
}

export default Main;