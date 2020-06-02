import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";

import React, { Component } from "react";
import Container from "./Components/Container";
import Search from "./Components/Search";
import Form from "./Components/Form";
import Cards from "./Components/Cards";

import getUsers from "./services/random-user-api";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      ages: [],
      filtredUsers: [],
      genderSelect: "all",
    };
  }

  componentDidMount() {
    const localStorageUsers = localStorage.getItem("reactAppUsers");

    if (localStorageUsers != null) {
      const localUsers = JSON.parse(localStorageUsers);
      this.setState({ users: localUsers, filtredUsers: localUsers });
    } else {
      getUsers().then((res) =>
        this.setState({ users: res, filtredUsers: res }, () =>
          localStorage.setItem(
            "reactAppUsers",
            JSON.stringify(this.state.users)
          )
        )
      );
    }
  }

  filterHandler = (gender, ages) => {
    this.setState({ genderSelect: gender, ages: ages }, () =>
      this.searchByNameAndCity(this.state.search)
    );
  };

  searchByNameAndCity = (value) => {
    const { users, genderSelect, ages } = this.state;

    let usersByGender = this.filterByGender(genderSelect, [...users]);
    let usersByAge = this.filterByAge(ages, [...usersByGender]);

    if (value) {
      usersByAge = usersByAge.filter((user) => {
        const search = `${user.name.first} ${user.name.last} ${user.location.country}`;

        return search.toLowerCase().includes(value);
      });
    }

    this.setState({ filtredUsers: usersByAge });
  };

  filterByGender = (gender, users) => {
    let newUsers = users;

    if (gender !== "all") {
      newUsers = users.filter((user) => user.gender === gender);
    }
    return newUsers;
  };

  filterByAge = (ages, users) => {
    let newUsers = [];

    if (ages[0].value) {
      const filtred = users.filter((user) => user.dob.age <= 15);
      newUsers = [...newUsers, ...filtred];
    }

    if (ages[1].value) {
      const filtred = users.filter(
        (user) => user.dob.age >= 18 && user.dob.age < 35
      );
      newUsers = [...newUsers, ...filtred];
    }
    if (ages[2].value) {
      const filtred = users.filter(
        (user) => user.dob.age >= 36 && user.dob.age < 65
      );
      newUsers = [...newUsers, ...filtred];
    }
    if (ages[3].value) {
       const filtred = users.filter(
        (user) => user.dob.age >= 65
      );
      newUsers = [...newUsers, ...filtred];
    }
    if (!ages[0].value && !ages[1].value && !ages[2].value && !ages[3].value) {
      newUsers = [...users];
    }

    return new Set(newUsers);
  };

  render() {
    const { filtredUsers } = this.state;

    return (
      <div className='App'>
        <Container>
          <Search
            placeholder={"Начните вводить..."}
            onSearch={this.searchByNameAndCity}
          />
          <Form onFilter={this.filterHandler} />
          <Cards users={filtredUsers} />
        </Container>
      </div>
    );
  }
}
