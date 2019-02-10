import React, { Component } from 'react';
import { ExchangeForm, UpdateStatus } from '..';
import styles from './App.module.css';

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        Welcome to the currency exchange office
        <hr />
        <ExchangeForm />
        <hr />
        <UpdateStatus />
      </div>
    );
  }
}

export default App;
