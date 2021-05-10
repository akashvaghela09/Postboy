import React from 'react';
import styles from  './App.module.css';
import { Allroutes } from './Routes/AllRoutes';

function App() {
  return (
    <div className={styles.App}>
        <img onClick={event =>  window.location.href='https://github.com/akashvaghela09/Postboy'} className={styles.gitHub} src="https://cdn.iconscout.com/icon/free/png-256/github-153-675523.png" alt="github"/>
        <h1 className={styles.siteName} onClick={event =>  window.location.href='/'}>PostBoy</h1>
        <Allroutes />
    </div>
  );
}

export default App;