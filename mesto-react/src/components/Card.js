function Card(props) {
    
  const handleCardClick = () => {
    props.onCardClick(props.card);
  };

  return (
    <div className="elements__element">
      <div className="elements__trash-icon"></div>
      <img
        src={props.link}
        alt={props.name}
        className="elements__mask-group"
        onClick={handleCardClick}
      />
      <div className="elements__container">
        <h2 className="elements__title">{props.name}</h2>
        <div className="elements__like-container">
          <button
            type="button"
            className="elements__group"
            aria-label="поставить нравиться"
          ></button>
          <span className="elements__likes-number">{props.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
