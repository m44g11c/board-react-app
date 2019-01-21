import React, { Component } from 'react';
import './App.css';
import firebase from './Firebase';
import { Link } from 'react-router-dom';

 class App extends Component {
  constructor() {
      super();
      this.state = {
        title: '',
        description: '',
        username: '',
        price: '',
        items: []
      }

     }

     componentDidMount() {
      const itemsRef = firebase.database().ref('items');
      itemsRef.on('value', (snapshot) => {
        let items = snapshot.val();
        let newState = [];
        for (let item in items) {
          newState.push({
            id: item,
            title: items[item].title,
            description: items[item].description,
            user: items[item].user,
            price: items[item].price
          });
        }
        this.setState({
          items: newState
        });
      });
    }

  render() {
    return (

      <div className="container">

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active" aria-current="page">Home</li>
          </ol>
        </nav> 
        
        <section> 

          {this.state.items.map((item) => {
             return (
              <div className="jumbotron" key={item.id}>
                <h3>{item.title}</h3>
                  <p className="lead">{item.description}</p>
                  <p>price: {item.price}</p>
                  <p>posted by: {item.user}</p>
                  <Link to={`/show/${item.id}`} className="btn btn-lg btn-primary">More <i className="fa fa-arrow-circle-o-down"></i></Link>
                </div>
              )
            })
          }

        </section>

      </div>

    );      
  }
}

 export default App;