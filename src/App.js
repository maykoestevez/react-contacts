import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactAPI from './utils/ContactsAPI';
import { Route } from 'react-router-dom';
import CreateContact from './CreateContact';

class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    ContactAPI.getAll().then((contacts) => {
      this.setState(() => ({
        contacts
      }))
    })
  }

  createContact = (contact) => {
    ContactAPI.create(contact).then((contact) => {
      this.setState((currentState) => ({
        contacts: currentState.contacts.concat([contact])
      }))
    })
  }

  removeContact = (contact) => {
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter(c => c.id !== contact.id)

    }));

    ContactAPI.remove(contact);
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListContacts
            onRemoveContact={this.removeContact}
            contacts={this.state.contacts}>
          </ListContacts>)}>
        </Route>
        <Route path='/create' render={({ history }) => (
          <CreateContact
            onCreateContact={(contact) => {
              this.createContact(contact);
              history.push('/')

            }}></CreateContact>
        )}></Route>
      </div>
    );
  }
}

export default App;
