import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import CreateContact from './CreateContact';

class ListContacts extends Component {

    state = {
        query: ''
    }

    upadteQuery = (query) => this.setState(() => ({ query: query.trim() }));

    render() {
        const { query } = this.state;
        const { contacts, onRemoveContact } = this.props;
        const showingContacts = query === '' ? contacts :
            contacts.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
        return (
            <div className='list-contacts'>
                <div className='list-contacts-top'>
                    <input
                        className='search-contacts'
                        type='text'
                        placeholder='Search here'
                        value={query}
                        onChange={(event) => this.upadteQuery(event.target.value)}
                    />
                    <Link to='/create' className='add-contact'></Link>
                </div>
                <ol className='contact-list'>
                    {showingContacts.map((contact) => (
                        <li className='contact-list-item' key={contact.id}>
                            <div
                                className='contact-avatar'
                                style={{ backgroundImage: `url(${contact.avatarURL})` }} />

                            <div className='contact-details'>
                                <p>{contact.name}</p>
                                <p>{contact.handle}</p>
                            </div>

                            <button
                                onClick={() => this.onRemoveContact}
                                className='contact-remove'
                            >remove</button>

                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}

ListContacts.propTypes = {
    contacts: PropTypes.array.isRequired,
    onRemoveContact: PropTypes.func.isRequired
}

export default ListContacts;
