import React, { Component } from  'react';
// import './addBookmark.css';

class AddBookmark extends Component {
  constructor(props){
    super(props)
    this.state = {
      title: '',
      url: '',
      description: '',
      rating: 1
    }
  }

  titleChange = (title)=> {
    this.setState({
        title
      })
  }

  urlChange =(url) => {
    this.setState({
      url
    })
  }

  ratingChange=(rating)=>
  this.setState({
    rating
  })
  
  descrChange=(description)=>{
    this.setState({
      description
    })
  }
  
  //could I write it like?
  // onChange=(title,url,description,rating)=>{
  // this.setState({
  //   title,
  //   url,
  //   description,
  //   rating
  // })
  // }

  handleSubmit(e) {
    console.log('hi fjhgkl')
    e.preventDefault();
    const bookmark = {
      title: this.state.title,
      url: this.state.url,
      description: this.state.description,
      rating: this.state.description
    }
    console.log(bookmark)
    const url ='https://thinkful-list-api.herokuapp.com/auth/bookmarks';
    const options = {
      method: 'POST',
      body: JSON.stringify(bookmark),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '$2a$10$sUkrgbYkR5rpV1.IB/Jvt.uF346EJf4TGWFlSa8.nKKM4y6vdqJAi'
      }
    };
    fetch(url, options)
      .then(res => {
        if(!res.ok) {
          throw new Error('Something went wrong, please try again later');
        }
        return res.json();
      })
      .then(data => {
        console.log(data)
        this.setState({
          title: "",
          url: "",
          description: "",
          rating: 1
        });
        this.props.handleAdd(bookmark);
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  }
 
  render() {
    const error = this.state.error
                ? <div className='error'>{this.state.error}</div>
                : '';
    return (
      <div className="addbookmark">
        <h2>Add Bookmark</h2>
        <form className="addbookmark__form">
          <label htmlFor="title">Title:</label>
          <input 
            type="text" 
            name="title" 
            id="title" 
            placeholder="Title"
            value={this.state.title}
            onChange={e => this.titleChange(e.target.value)}/>
          <label htmlFor="url">Url:</label>
          <input 
            type="text" 
            name="url" 
            id="url" 
            placeholder="url"
            value={this.state.url}
            onChange={e => this.urlChange(e.target.value)}/>
          <label htmlFor="description">Description:</label>
          <textarea 
            name="description" 
            id="description" 
            placeholder="description"
            value={this.state.description}
            onChange={e => this.descrChange(e.target.value)}/>
          <label htmlFor="rating">Rating: </label>
          <input 
            type="number" 
            name="rating" 
            id="rating" 
            min="1"
            max="5"
            value={this.state.rating}
            onChange={e => this.ratingChange(e.target.value)}/>

          <div className="addbookmark__buttons">
            <button onClick={e => this.props.showForm(false)}>Cancel</button>
           <button type="submit" onClick={(e) => this.handleSubmit(e)} >Save</button> 
            {/* <button type="submit" >Save</button> */}
          </div>  
        </form>
      </div>
    );
  }
}

export default AddBookmark;
