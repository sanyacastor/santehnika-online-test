import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

import React, { Component } from 'react';
import Container from './Components/Container';
import Search from './Components/Search';
import Form from './Components/Form';
import Cards from './Components/Cards';
import getUsers from './services/random-user-api'



export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      filtredUsers:[],
      search: '',
      genderSelect: 'all'
    };
  }

  componentDidMount() {

    const localStorageUsers = localStorage.getItem('reactAppUsers')

    if(localStorageUsers != null) {
      const localUsers = JSON.parse(localStorageUsers)
      this.setState({users: localUsers, filtredUsers: localUsers})
    } else {
      getUsers()
      .then(res => this.setState({users: res, filtredUsers: res}, 
        ()=>localStorage.setItem('reactAppUsers', JSON.stringify(this.state.users))))
    }
  }

  searchHandler = (e) => {
    const value = e.target.value.toLowerCase()
    this.setState({search: value}, () => this.searchByNameAndCity(this.state.search))
  }

  filterHandler = (gender) => {
    this.setState({genderSelect: gender}, () => this.searchByNameAndCity(this.state.search))
  }

  searchByNameAndCity = (value) => {
    const {users, genderSelect} = this.state
    let newUsers = this.filterByGender(genderSelect, users.slice(0))

    if (value) {
        newUsers = newUsers.filter(user => {
          const search = `${user.name.first} ${user.name.second} ${user.location.country}`
        return search.toLowerCase().includes(value);
      });
    }

    this.setState({filtredUsers: newUsers})
  }

  filterByGender = (gender, users) => {
    let newUsers = users
      if (gender !== 'all') {
        newUsers = users.filter(user => user.gender === gender)
      }
      return newUsers
  }


  render() {

    const {filtredUsers} = this.state

    return (
      <div className="App">
        <Container>
          <Search placeholder={'Начните вводить...'} onSearch={this.searchHandler}/>
          <Form onFilter = {this.filterHandler}/>
          <Cards users = {filtredUsers}/>
        </Container>
    </div>
    )
  }
}