import React, { useContext, useState, useEffect } from 'react';
import './View.css';
import { FirebaseContext} from '../../store/Context';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'
import { PostContext } from '../../store/postContext';


function View() {


  const [UserDetails, setUserDetails] = useState()
  const { firebaseApp } = useContext(FirebaseContext);
  const { PostDetails } = useContext(PostContext)
  const firestore = getFirestore(firebaseApp);


  useEffect(async () => {
    
  console.log(PostDetails);
    //  const {userId} = useContext(PostDetails)
    const q = query(collection(firestore, "user"), where("id", "==", PostDetails.userId));
    const querySnapshot = await getDocs(q);
    const userDetailsData = [];
    querySnapshot.forEach((doc) => {
      userDetailsData.push(doc.data());
      setUserDetails(userDetailsData);
      
    });
  }, [firestore])

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={PostDetails.url} alt="" />
      </div>
      <div className="rightSection" >
        <div className="productDetails">
          <p>Product Details</p>
          <span>{PostDetails.Name}</span>
          <p>{PostDetails.Category}</p>
          <p>&#x20B9; {PostDetails.Price} </p>
          <span>{PostDetails.createdAt}</span>
        </div>

        {UserDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p className='details'>{UserDetails[0].username}</p>
          <p className='details'>{UserDetails[0].phone}</p>
        </div>}

      </div>
    </div>
  );
}
export default View;
