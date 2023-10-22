import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Context, { FirebaseContext } from './store/Context';
import firebaseApp from './Firebase/Config';

ReactDOM.render(
    <FirebaseContext.Provider value={{firebaseApp}}>
        <Context>
       <App />
        </Context>
    </FirebaseContext.Provider>
, document.getElementById('root'));