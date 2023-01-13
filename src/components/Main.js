import Card from "./Card";

function Main(props) {
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__profile-container">
          <img
            src={props.userAvatar}
            alt="Аватарка"
            className="profile__avatar"
          />
          <img
            className="profile__avatar-button"
            onClick={props.onEditAvatar}
          />
          <div className="profile__profile-info">
            <div className="profile__profile-info-container">
              <h1 className="profile__title">{props.userName}</h1>
              <button
                type="button"
                className="profile__edit-button"
                aria-label="редактировать профиль"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__subtitle">{props.userDescription}</p>
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
          />
        ))}
      </section>
    </main>
  );
}

export default Main;