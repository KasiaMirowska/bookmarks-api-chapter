import React, { Component } from 'react';
import './App.css';

import AddBookmark from './addBookmark/AddBookmark';
import BookmarkApp from './bookmarkApp/BookmarkApp';


const bookmarks = [
  {
  title:"Google",
  url:"http://www.google.com", 
  rating:"3", 
  description:"No evil"
  },
  {
    title:"Google",
    url:"http://www.google.com", 
    rating:"3", 
    description:"No evil"
  }
];
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      bookmarks: [],
      showAddForm: false,
    }
  }

  componentDidMount() {
    const url = 'http://tf-ed-bookmarks-api.herokuapp.com/v3/bookmarks';
    const options = {
      method: 'GET',
      headers: {
        'Authorization': '$2a$10$sUkrgbYkR5rpV1.IB/Jvt.uF346EJf4TGWFlSa8.nKKM4y6vdqJAi',
        'Content-Type': 'application/json'
      }
    };
  
    fetch(url, options)
      .then(response => {
        if(!response.ok) {
          throw new Error('something went wrong');
        }
        return response;
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          bookmarks: data,
          error: null,
        });
      })
      .catch(err => {
        this.setState({
          error: err.message
        })
      })
      }


  setShowAddForm(show) {
    this.setState({
      showAddForm: show,
    })
  }

  addBookmark(bookmark) {
    console.log(bookmark)
    this.setState({
      bookmark: [...this.state.bookmarks, bookmark],
      showAddForm: false
    })
  }
  render() {
    const page = this.state.showAddForm?
                <AddBookmark 
                showForm={show => this.setShowAddForm(show)}
                handleAdd={bookmark => this.addBookmark(bookmark)}
                />
              : <BookmarkApp bookmarks={this.state.bookmarks} showForm={show => this.setShowAddForm(show)}/>
    const error = this.state.error
              ? <div className='error'>{this.state.error}</div>
              : '';
    return (
      <div className="App">
        {error}
        {page}
      </div>
    );
  }
}

export default App;
