import React, { Component } from 'react';
import firebase from '../Firebase';

 class Create extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      price: '',
      username: '',
      items: []
    }

     this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

   handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

   handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');

     const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

     const item = {
      title: this.state.title,
      description: this.state.description,
      price: this.state.price,
      user: this.state.username,
      cr_date: date,
      counter: 0
    }
    itemsRef.push(item);
    this.setState({
      title: '',
      description: '',
      price: '',
      username: ''
    });
    this.props.history.push('/');
  }

   render() {

     return (
      <div className="container">

         <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Create</li>
          </ol>
        </nav>

         <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              ADD BOARD
            </h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input type="text" className="form-control" name="title" required placeholder="Title"  onChange={this.handleChange} value={this.state.title}/>
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea className="form-control" name="description" required placeholder="Description" cols="80" rows="3" onChange={this.handleChange} value={this.state.description}></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="author">Price:</label>
                <input type="text" className="form-control" name="price" required placeholder="Price" onChange={this.handleChange} value={this.state.price}/>
              </div>
              <div className="form-group">
                <label htmlFor="author">Author:</label>
                <input type="text" className="form-control" name="username" required placeholder="Author" onChange={this.handleChange} value={this.state.username}/>
              </div>
              <button type="submit" className="btn btn-lg btn-success">Submit <i className="fa fa-check"></i></button>
            </form>
          </div>
        </div>

       </div>
    );
  }
}

 export default Create;
 