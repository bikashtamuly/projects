import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from '../common/header/Header';
import News from './news/News';
import { appConfig } from '../config';
//import NewsDetail from './news/NewsDetail';
//import logo from './logo.svg';
import './App.css';

const config = appConfig;
let store;
const onChanges = (fn) => {
  if (fn) {
    store = fn;
  }

  store();
};
let titleStore = '';
const setTitle = (title) => {
  if (title) {
    titleStore = title;
  }
  return titleStore;
};

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header config={config} onChanges={onChanges} setTitle={setTitle}/>
          <Switch>
            <Route exact path="/" render={() => (<Redirect to="/topHeadlines"/>)}/>
            <Route exact path="/topHeadlines" render={()=><News
              config={config} onChanges={onChanges} setTitle={setTitle}/>}/>
            
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
