import React, {useEffect, useState } from 'react'
import './listItem.scss'
import { Add, PlayArrow, ThumbDownAltOutlined, ThumbUpAltOutlined } from '@material-ui/icons'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ListItem = ({index , item}) => {
  
  const [isHover, setIsHover]=useState(false);
  // const trailer = "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";
  const [movie, setMovie]=useState("");
  console.log("🚀 ~ file: ListItem.jsx:10 ~ ListItem ~ movie:", movie)


  useEffect(()=>{
    const getMovie = async()=>{
      try{
        const response = await axios.get(`movies/get/${item}`)
        setMovie(response.data);
      }catch(err){
        console.log(err)
      }
    }
    getMovie();
  },[item])


  return (

  <Link to= '/watch' state={movie}  >
    <div className="listItem" 

    style={{left: isHover && index * 225 - 50 + index * 2.5 }}
    onMouseEnter={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)}>
       <img src={movie.img} alt='' /> 
       {isHover && (
        <>
        <video src={movie.trailer} autoPlay={true} loop/>
       <div className="itemInfo">
          <div className="icons">
            <PlayArrow className='icon' />
            <Add className='icon'/>
            <ThumbUpAltOutlined className='icon'/>
            <ThumbDownAltOutlined className='icon'/>
          </div>
          <div className="itemInfoTop">
            <span>{movie.duration}</span>
            <span className='limit'>+{movie.limit}</span>
            <span>{movie.year}</span>
          </div>
          <div className="desc">
           {movie.desc}
          </div>
          <div className="genre">
           <span>{movie.genre}</span> 
          </div>
      </div>
        </>
       )}
       
    </div>
    </Link>
  )
}

export default ListItem