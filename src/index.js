import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Context, { FirebaseContext } from './store/Context';
import firebaseApp from './Firebase/Config';
import Post from './store/postContext';

ReactDOM.render(
    <FirebaseContext.Provider value={{ firebaseApp }}>
        <Context>
            <Post>
                <App />
            </Post>
        </Context>
    </FirebaseContext.Provider>
    , document.getElementById('root'));
