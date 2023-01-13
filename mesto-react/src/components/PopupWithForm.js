function PopupWithForm(props) {
  return (
    <div className={`popup ${props.isOpen} popup_${props.name}`}>
      <div className="popup__container">
        <form className="popup__form" name={`${props.name}Form`}>
          <h3 className="popup__title">{`${props.title}`}</h3>
          {props.children}
          <button
            type="submit"
            className="popup__submit-button"
            aria-label="Да"
            disabled
          >
            Отправить
          </button>
        </form>
        <button
          type="button"
          className="popup__close-icon"
          aria-label="закрыть форму"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
