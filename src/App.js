import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import SignUp from './Pages/Signup'
import Login from './Components/Login/Login';
import Home from './Pages/Home';
import View from './Pages/ViewPost'
import Create from './Components/Create/Create'
import { AuthContext, FirebaseContext } from './store/Context';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Firestore } from 'firebase/firestore';
// import Post from './store/postContext';

function App() {
  const { setUser } = useContext(AuthContext)
  const { firebaseApp } = useContext(FirebaseContext)
  const auth = getAuth(firebaseApp);

  useEffect(() => {
  onAuthStateChanged(auth, (userData) => {
      setUser(userData)
    })
  },[auth,Firestore]) 
  
  return (

    <div>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/olx_clone' element={<Home />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/create' element={<Create />} />
            <Route path='/view' element={<View />} />
          </Routes>
        </Router>
    </div>

 );
}

export default App;