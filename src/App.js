import React, { useContext, useEffect} from 'react';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import './App.css';
import SignUp from './Pages/Signup'
import Login from './Components/Login/Login';
import Home from './Pages/Home';
import { AuthContext, FirebaseContext } from './store/Context';
import { getAuth, onAuthStateChanged } from "firebase/auth";


function App() {
  const {setUser} =useContext(AuthContext)
  const {firebaseApp} =useContext(FirebaseContext)
  const auth = getAuth(firebaseApp);

  useEffect(()=>{
   onAuthStateChanged(auth,(user)=>{
      setUser(user)
    })
  })
  return (
        <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;