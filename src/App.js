import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/Layout/NavBar';
import User from './components/Users/User';
import Alert from './components/Layout/Alert';
import Home from './components/Pages/Home';
import About from './components/Pages/About';
import NotFound from './components/Pages/NotFound';

import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import './App.css';
const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className='App'>
            <NavBar />
            <div className='container'>
              <Alert />
              <Switch>
                <Route
                  exact
                  path='/'
                  component={Home}

                  //Before Cleaning
                  // render={(props) => (
                  //   <>
                  //     <Search />
                  //     <Users />
                  //   </>
                  // )}
                />
                <Route exact path='/about' component={About} />
                <Route exact path='/user/:login' component={User} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
