import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/Layout/NavBar';
import Users from './components/Users/Users';
import User from './components/Users/User';
import Search from './components/Users/Search';
import Alert from './components/Layout/Alert';
import About from './components/Pages/About';
import './App.css';
import axios from 'axios';
const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, showAlert] = useState(null);

  //BEFORE CONVERTING THE CLASS TO FUNCTIONAL
  // state = {
  //   users: [],
  //   user: {},
  //   repos: [],
  //   loading: false,
  //   alert: null,
  // };

  const searchUsers = async (text) => {
    setLoading(true);
    // this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setUsers(res.data.items);
    setLoading(false);
    // this.setState({ users: res.data.items, loading: false });
  };

  // Get single user
  const getUser = async (username) => {
    setLoading(true);
    // this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users/${username}?&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setUser(res.data);
    setLoading(false);
    // this.setState({ user: res.data, loading: false });
  };

  //Get users repos
  const getUserRepos = async (username) => {
    setLoading(true);
    // this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    // this.setState({ repos: res.data, loading: false });
    setRepos(res.data);
    setLoading(false);
  };

  //Clear users from state
  const clearUsers = () => {
    setUsers([]);
    loading(false);
    // this.setState({ users: [], loading: false });
  };

  //Set Alert
  const setAlert = (msg, type) => {
    showAlert({ msg, type });
    // this.setState({ alert: { msg, type } });

    setTimeout(() => showAlert(null), 5000);
    // this.setState({ alert: null }), 2000);
  };

  return (
    <Router>
      <div className='App'>
        <NavBar />
        <div className='container'>
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path='/'
              render={(props) => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={setAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}
            />
            <Route exact path='/about' component={About} />
            <Route
              exact
              path='/user/:login'
              render={(props) => (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
