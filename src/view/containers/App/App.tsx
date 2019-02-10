import React, { Component } from 'react';
import { ExchangeForm } from '..';
import styles from './App.module.css';

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        Welcome to the currency exchange office
        <ExchangeForm />
      </div>
    );
  }
}

export default App;
