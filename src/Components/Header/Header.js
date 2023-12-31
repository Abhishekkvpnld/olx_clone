import React,{useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { getAuth,signOut } from "firebase/auth";


function Header() {
  const {User}=useContext(AuthContext)
  const {firebasApp}= useContext(FirebaseContext)
  const navigate =useNavigate()
  const auth = getAuth(firebasApp)

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName"  onClick={User ? () => navigate('/') : null}>
          <OlxLogo ></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
        <span onClick={User ? null : () =>navigate('/login')} className='login'> {User ? `Welcome ${User.displayName}` : "Login"}</span>
          <hr />
        </div>
        {User && <span className='logout' onClick={()=>{
         signOut(auth)
         window.confirm('Are you want to logout')
              navigate('/login')
          }}>Logout</span>}
        <div className="sellMenu" onClick={User ? ()=>{navigate('/create')} :()=>{ navigate('/login')}}>
      
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
           <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;