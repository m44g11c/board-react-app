import React, { Component } from 'react';
import firebase from '../Firebase';

 class Edit extends Component {

   constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      user: '',
      price: ''
    }

     this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

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
          price: item.price
        });        
      }
    });
  }

   handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

   handleSubmit(e) {
    e.preventDefault();
    firebase.database().ref(`/items/${this.props.match.params.id}`).set({
      title: this.state.title,
      description: this.state.description,
      price: this.state.price,
      user: this.state.user
    });

     this.setState({
      title: '',
      description: '',
      price: '',
      user: ''
    });
    this.props.history.push('/');
  }

   render() {
    return (
      <div className="container">

         <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Edit</li>
          </ol>
        </nav>

         <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              EDIT BOARD
            </h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input type="text" className="form-control" name="title" onChange={this.handleChange} value={this.state.title} placeholder="Title" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea className="form-control" name="description" required placeholder="Description" cols="80" rows="3" onChange={this.handleChange} value={this.state.description}></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="price">Price:</label>
                <input type="text" className="form-control" name="price" value={this.state.price} onChange={this.handleChange} placeholder="price" />
              </div>
              <div className="form-group">
                <label htmlFor="author">Author:</label>
                <input type="text" className="form-control" name="user" value={this.state.user} onChange={this.handleChange} placeholder="Author" />
              </div>
              <button type="submit" className="btn btn-lg btn-success">Submit <i className="fa fa-check"></i></button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
