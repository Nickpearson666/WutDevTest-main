import Contact from '../models/Contact';
import axios from 'axios';

/** 
 * This class controls the list of contacts for the app.
 * This would be a good place to implement the data
 * connections to your API. Whenever a change is made the 
 * 'contactChange' event is dispatched to trigger the 
 * Contact list to refresh.
 */

class ContactController {

  constructor() {
    if(ContactController._instance){
      return ContactController._instance;
    }
    ContactController._instance = this;
    this.event = new Event('contactChange');
    this.event2 = new Event('sortedcontact');
    this.contacts = [];
    this.count = 0;
  }
  
  getAll( options = null ) {
    return this.contacts;
  }

  //compre by lastname
  compare(a, b ) {
    if ( a.lName < b.lName ){
      return -1;
    }
    if ( a.lName > b.lName ){
      return 1;
    }
    return 0;
  }

  getAllSortedByName(options = null){
     return this.contacts.sort(this.compare());
  }

  soted(){
    window.dispatchEvent(this.event2);
  }
  add(fName, lName, email, phone, imageUrl ){
    let contact = new Contact( this.count, fName, lName, email, phone, imageUrl );
    //application/x-www-form-urlencoded   application/json
    const param = {
      id: this.count,
      fName: contact.fName,
      email: contact.email,
      lName: contact.lName,
      imageUrl: contact.imageUrl,
      phone: contact.phone,
    }
    if(this.valid(contact) === true){
        axios({
        method: 'post',
        url: 'http://localhost:8080/emp',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(param)
      }).then((res) => {
        console.log("resp:", res.data);
      })
    }else{
      alert("Invalid Info")
    }
    if(contact instanceof Contact ){
      this.contacts.push(contact);
      this.count++;
      window.dispatchEvent(this.event);
      return true;
    }
    return false;
  }

  remove( contact_id ){
    for (let i = 0; i < this.contacts.length; i++) {
      if(this.contacts[i].id === contact_id){
        this.contacts.splice(i, 1);
        i--;
        window.dispatchEvent(this.event);
      }
    }
  }

  update(contact_id, options ){
    for (let i = 0; i < this.contacts.length; i++) {
      if(this.contacts[i].id === contact_id){
        this.contacts[i].fName = options.fName;
        this.contacts[i].lName = options.lName;
        this.contacts[i].email = options.email;
        this.contacts[i].phone = options.phone;
        this.contacts[i].imageUrl = options.imageUrl;
      }
    }
    let contact = this.contacts[contact_id];
    const param = {
        id: this.count,
        fName: contact.fName,
        email: contact.email,
        lName: contact.lName,
        imageUrl: contact.imageUrl,
        phone: contact.phone,
    }
    if(this.valid(contact) === true){
        axios({
          method: 'post',
          url: 'http://localhost:8080/update',
          headers: {
            'Content-Type': 'application/json'
          },
          data: JSON.stringify(param)
        }).then((res) => {
          console.log("resp:", res.data);
        })
      }else{
        alert("Invalid Info")
      }

    window.dispatchEvent(this.event);
  }

  valid(contact){
    if(contact.fName.length === 0 || contact.lName.length === 0 ||
        contact.email.length === 0 || contact.phone.length === 0 || contact.imageUrl.length === 0){
      return false;
    }
    console.log("hhhhhh")
    return true;
  }
}

export default ContactController;