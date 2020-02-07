import React, { Component } from "react";

//import all components with the corresponding functions
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import SearchJumbo from "../components/SearchJumbo";

//class component to manipulate state 
class Contacts extends Component {

  //initialize state 
  state = {
    contacts: [],
    lastName: "",
    firstName: "",
    email: "",
    phoneNumber: "",
    birthDate: "",
    address: "",
    notes: ""
  };

  //load right after render
  componentDidMount() {
    this.loadContacts()
  }

  //make API call for all contacts
  loadContacts = () => {
    API.getAllContacts()
      //wait for results then..
      .then(res =>
        //set new state with results
        this.setState({
          contacts: res.data
        })
      )

      //if err, log
      .catch(err => console.log(err));
  };

  //make API call to delete a contact. passing in id via req.params
  deleteContact = id => {

    API.deleteContact(id)
      .then(res => this.loadContacts())
      .catch(err => console.log(err))
  };

  //page view via react class required render method
  render() {
    return (
      <Container fluid>
        <row id="rowGen">
          <Col size="md-12" >
            <Jumbotron>
              <h1 id="header">Michael Scott Paper Company</h1>
              <h1 className="display-4">Directory</h1>
              <Link to={"/add"} id="addLink">Add Contact</Link>
            </Jumbotron>
            <SearchJumbo />
            {this.state.contacts.length ? (
              <List>
                {this.state.contacts.map(contact => (
                  <ListItem key={contact._id}>
                    <Link to={"/contacts/" + contact._id}>
                      <strong>
                        <h2>{contact.lastName}, {contact.firstName}</h2>
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteContact(contact._id)} />
                    <Link id="editBtn" to={"/edit/" + contact._id}>Edit</Link>
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Contacts</h3>
              )}
          </Col>
        </row>
      </Container>
    );
  }

}

export default Contacts