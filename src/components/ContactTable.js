import React from 'react';
import ContactRow from "./ContactRow";
import ContactController from '../controllers/ContactController';

/** 
 * This renders a list of contacts. Upon the event
 * 'contactChange' it will refresh the list.
 */

class ContactTable extends React.Component {
  constructor(props) {
    super(props);
    this.contacts = this.props.contacts;
  }

  componentDidMount() {
    this.setState( {
      contacts: this.contacts,
    } );
    window.addEventListener('contactChange', this.updateContacts);
  }

  updateContacts = () => {
    this.contactController = new ContactController();
    this.setState(
      {
        contacts: this.contactController.getAll()
      }
    );
    this.contacts = this.contactController.getAll();
  }

  updateContactsById = () => {
    this.contactController = new ContactController();
    this.setState(
        {
          contacts: this.contactController.getAllSortedByName()
        }
    );
    this.contacts = this.contactController.getAllSortedByName();
  }
  
  render() {
    return (
      <table className='table'>
        <thead>
          <tr className="contact-row">
            <th>image</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone #</th>
            <th>options</th>
          </tr>
        </thead>
        <tbody>
          {this.contacts.map((answer, i) => {     
            console.log("Contact", answer);            
            // Return the element. Also pass key     
            return (<ContactRow key={answer.id} contact={answer}/>) 
          })}
        </tbody>
      </table>
    );
  }
}

export default ContactTable;