import {Component} from 'react'

import {v4 as v4uuid} from 'uuid'

import ContactItem from './components/ContactItem'

import './App.css'

const initialContactsList = [
  {
    id: v4uuid(),
    name: 'Ram',
    mobileNo: 9999988888,
    isFavorite: false,
  },
  {
    id: v4uuid(),
    name: 'Pavan',
    mobileNo: 8888866666,
    isFavorite: true,
  },
  {
    id: v4uuid(),
    name: 'Nikhil',
    mobileNo: 9999955555,
    isFavorite: false,
  },
]

class App extends Component {
  state = {
    contactsList: initialContactsList,
    name: '',
    mobileNo: '',
    nameErrorMsg: '',
    mobileNoErrorMsg: '',
  }

  onAddContact = event => {
    event.preventDefault()
    const {name, mobileNo} = this.state
    if (name === '' && mobileNo === '') {
      this.setState({
        nameErrorMsg: 'Please Enter Name*',
        mobileNoErrorMsg: 'Please Enter Mobile No*',
      })
    } else if (name === '') {
      this.setState({nameErrorMsg: 'Please Enter Name*', mobileNoErrorMsg: ''})
    } else if (mobileNo === '') {
      this.setState({mobileNoErrorMsg: 'Please Mobile No*', nameErrorMsg: ''})
    } else {
      const newContact = {
        id: v4uuid(),
        name,
        mobileNo,
        isFavorite: false,
      }
      this.setState(prevState => ({
        contactsList: [...prevState.contactsList, newContact],
        name: '',
        mobileNo: '',
        nameErrorMsg: '',
        mobileNoErrorMsg: '',
      }))
    }
  }

  onClickFavoriteIcon = id => {
    this.setState(prevState => ({
      contactsList: prevState.contactsList.map(eachObj => {
        if (id === eachObj.id) {
          return {...eachObj, isFavorite: !eachObj.isFavorite}
        }
        return eachObj
      }),
    }))
  }

  onChangeMobileNo = event => {
    this.setState({mobileNo: event.target.value})
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  render() {
    const {
      name,
      mobileNo,
      contactsList,
      nameErrorMsg,
      mobileNoErrorMsg,
    } = this.state
    return (
      <div className="app-container">
        <div className="responsive-container">
          <h1 className="heading">Contacts</h1>
          <form className="contact-form-container" onSubmit={this.onAddContact}>
            <input
              value={name}
              onChange={this.onChangeName}
              className="input"
              placeholder="Name"
            />
            <input
              className="input"
              value={mobileNo}
              onChange={this.onChangeMobileNo}
              placeholder="Mobile Number"
            />
            <button type="submit" className="button">
              Add Contact
            </button>
          </form>
          <div>
            <p className="errorMsg">{nameErrorMsg}</p>
            <p className="errorMsg">{mobileNoErrorMsg}</p>
          </div>
          <ul className="contacts-table">
            <li className="table-header">
              <p className="table-header-cell name-column">Name</p>
              <hr className="separator" />
              <p className="table-header-cell">Mobile Number</p>
            </li>
            {contactsList.map(eachContact => (
              <ContactItem
                key={eachContact.id}
                contactDetails={eachContact}
                onClickFavoriteIcon={this.onClickFavoriteIcon}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
