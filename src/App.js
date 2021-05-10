import React from 'react';
import styles from  './App.module.css';
import { Allroutes } from './Routes/AllRoutes';

function App() {
  return (
    <div className={styles.App}>
      <h1 className={styles.siteName} onClick={event =>  window.location.href='/'}>PostBoy</h1>
      <Allroutes />
    </div>
  );
}

export default App;