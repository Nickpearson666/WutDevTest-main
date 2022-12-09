import React from 'react';
import ContactForm from "./ContactForm";
import ContactController from '../controllers/ContactController';

class ContactOptions extends React.Component {

  componentDidMount() {
    this.setState({});
  }

  deleteContact = () => {
    this.contactController = new ContactController();
    this.contactController.remove(this.props.contact.id);
  }

  render() {
    return (
        <div>
          <ContactForm openText='update' contact={this.props.contact} edit={true}/>
          <button className='btn btn-danger' onClick={this.deleteContact}>Delete</button>
        </div>
    );
  }
}

export default ContactOptions;