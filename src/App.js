import './App.css';
import ContactTable from "./components/ContactTable";
import ContactForm from "./components/ContactForm";
import ContactController from './controllers/ContactController';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

class App extends React.Component {

  state = {
    mssg: ""
  };

  constructor (props) {
    super(props)
    this.contactController = new ContactController();
    this.contacts = this.contactController.getAll();
  };

  render() {
    return (
      <div className="App">
        <ContactTable contacts={this.contacts}/>
        <ContactForm openText='Add' edit={false}/>
        <ContactForm openText='Sort' edit={false}/>
      </div>
    );
  }
}

export default App;
