import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { FirebaseContext, AuthContext } from '../../store/Context'
import Heart from '../../assets/Heart';
import './Post.css';
import { getFirestore, getDocs, collection } from 'firebase/firestore'
import { PostContext } from '../../store/postContext';


function Posts() {

  const { firebaseApp } = useContext(FirebaseContext)
  const { User } = useContext(AuthContext)
  const { setPostDetails } = useContext(PostContext)
  const [Products, setProducts] = useState([])
  const fireStore = getFirestore(firebaseApp)
  const navigate = useNavigate()


  useEffect(() => {
    const fetchData = async () => {

      const querySnapshot = await getDocs(collection(fireStore, 'products'));
      const productData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data()
      }));
      console.log(productData);
      setProducts(productData);
    };

    fetchData();
  }, [fireStore]);

  const handleViewPost = (data) => {
    navigate('/view')
  }

  return (

    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">

          {Products.map((product) =>

            <div className="card" onClick={
              User ? handleViewPost : null}>
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.data.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.data.Price}</p>
                <span className="kilometer">{product.data.Category}</span>
                <p className="name">{product.data.Name}</p>
              </div>
              <div className="date">
                {setPostDetails(product.data)}
                { console.log(product.data)}
                <span>{product.data.createdAt} </span>
              </div>
            </div>

          )}

        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cardsRecomend">

          <div className="cardRecomend">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>Tue oct 20 2023</span>
            </div>
          </div>

          <div className="cardRecomend">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/6c27cb67c759270fc2189b12cb13285b.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 4200000</p>
              <span className="kilometer">Car</span>
              <p className="name"> Mini Cooper</p>
            </div>
            <div className="date">
              <span>Wed oct 25 2023</span>
            </div>
          </div>

          <div className="cardRecomend">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/bmw-g310r-left-side-view0.webp" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 200000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> 2023 BMW G 310</p>
            </div>
            <div className="date">
              <span>Fri Nov 10 2023</span>
            </div>
          </div>

          <div className="cardRecomend">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/Thar_1601615282959_1601615288316.webp" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 900000</p>
              <span className="kilometer">Car</span>
              <p className="name"> Mahindra Thar 2020 </p>
            </div>
            <div className="date">
              <span>Tue Nov 09 2023</span>
            </div>
          </div>

          <div className="cardRecomend">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/4b2860d4827723f18c4c6e23f5856778.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 120000</p>
              <span className="kilometer">Car</span>
              <p className="name"> 2021 KTM Duke 200 </p>
            </div>
            <div className="date">
              <span>Mon Nov 05 2023</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Posts;
