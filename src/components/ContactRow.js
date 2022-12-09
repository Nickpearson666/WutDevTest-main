import React from 'react';
import ContactOptions from "./ContactOptions";

class ContactRow extends React.Component {

  componentDidMount() {
    this.setState({});
  }

  render() {
    return (
      <tr data-key={this.props.contact.id} className="contact-row">
        <td><img alt='User Profile' className='thumbnail' src={this.props.contact.imageUrl}/></td>
        <td>{this.props.contact.fName}</td>
        <td>{this.props.contact.lName}</td>
        <td>{this.props.contact.email}</td>
        <td>{this.props.contact.phone}</td>
        <td>
          <ContactOptions contact={this.props.contact}/>
        </td>
      </tr>
    );
  }
}

export default ContactRow;