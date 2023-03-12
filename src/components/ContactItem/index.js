import './index.css'

const ContactItem = props => {
  const {contactDetails, onClickFavoriteIcon} = props
  const {id, name, mobileNo, isFavorite} = contactDetails

  const starImgUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/star-filled-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/star-outline-img.png'

  const onClickIcon = () => {
    onClickFavoriteIcon(id)
  }
  return (
    <li className="table-row">
      <div className="table-cell name-column">
        <p className="name">{name}</p>
      </div>
      <hr className="separator separator2" />
      <div className="table-cell mobile-no-column">
        <p className="mobile-no-value">{mobileNo}</p>
        <button
          type="button"
          className="favorite-icon-container"
          onClick={onClickIcon}
        >
          <img src={starImgUrl} className="favorite-icon" alt="star" />
        </button>
      </div>
    </li>
  )
}

export default ContactItem
