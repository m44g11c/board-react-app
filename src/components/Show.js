import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

 class Show extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      user: '',
      price: '',
      cr_date: '',
      counter: ''
    }

   }

   removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${this.props.match.params.id}`);
    itemRef.remove();
    this.props.history.push("/")
  }

   componentDidMount() {
    const itemRef = firebase.database().ref(`/items/${this.props.match.params.id}`);

     itemRef.on('value', (snapshot) => {

       let item = snapshot.val();

       if (item) {
        this.setState({
          title: item.title,
          description: item.description,
          user: item.user,
          price: item.price,
          cr_date: item.cr_date,
          counter: item.counter
        });
      }
    });
  }

   render() {
    return (
      <div className="container">

         <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">View</li>
          </ol>
        </nav>

         <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              {this.state.title}
            </h3>
          </div>
          <div className="panel-body">
            <dl>
              <dt>Description:</dt>
              <dd>{this.state.description}</dd>
              <dt>Price:</dt>
              <dd>{this.state.price}$</dd>
              <dt>Creation date:</dt>
              <dd>{this.state.cr_date}</dd>
              <dt>Views:</dt>
              <dd>{this.state.counter}</dd>
              <dt>Author:</dt>
              <dd>{this.state.user}</dd>
            </dl>
            <Link to={`/edit/${this.props.match.params.id}`} className="btn btn-lg btn-success">Edit <i className="fa fa-pencil"></i></Link>&nbsp;
            <button className="btn btn-lg btn-danger" onClick={() => this.removeItem(this.props.match.params.id)}>Remove <i className="fa fa-trash-o"></i></button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
