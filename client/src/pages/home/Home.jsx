import React, { useEffect, useState } from 'react'
import './home.scss'
import Navbar from '../../components/navbar/Navbar'
import Featured from '../../components/featured/Featured'
import List from '../../components/list/List'
import axios from 'axios'
const Home = ({type}) => {
  const[lists,setLists]=useState([])
  console.log("🚀 ~ file: Home.jsx:9 ~ Home ~ lists:", lists)
  const[genre,setGenre]=useState(null)


  useEffect(()=>{
    const getRandomLists=async()=>{
      try{
        const response = await axios.get(
          `lists/get ${type ? "?type="+ type :""}${genre ? "&genre="+ genre :""}` );
        setLists(response.data)
      }catch(err){
        console.log(err)
      }
    };
    getRandomLists();
  },[type,genre]);
  return (
    <div className='home'>
        <Navbar />
        <Featured type={type} />

        { lists.map((l)=>
          <List key={l._id} list={l} />
        )}
        

    </div>
  );
};

export default Home