import React, { useState , useEffect } from 'react'
import './featured.scss'
import {InfoOutlined, PlayArrow} from '@material-ui/icons'
import axios from 'axios'
const Featured = ({type}) => {
    const [content,setContent]=useState({})
    console.log("🚀 ~ file: Featured.jsx:7 ~ Featured ~ content:", content)

    useEffect(()=>{
        const getRandomContent= async()=>{
            try{
                const res = await axios.get(`/movies/random?type=${type}`)
                console.log("🚀 ~ file: Featured.jsx:14 ~ getRandomContent ~ res:", res)

                setContent(res.data[0])
            }catch(err){
                console.log( err)
                
            }
        }
        getRandomContent();
    },[type])
  return (
    <div className="featured">
        {type && (
            <div className="category">
                <span>{type == 'movie' ? "Movies" : "Series"}</span>
            <select name='genre' id='genre'>
                <option>Genre</option>
                <option value="adventure">Adventure</option>
                <option value="romance" > Romance</option>
                <option value="comedy">Comdey</option>
                <option value="horror">Horror</option>
                <option value="drama">Drama</option>
                <option value="animation">Animation</option>
                <option value="documentary">Documentary</option>

            </select>
            </div>
        )}
        <img 
            src={content.img} 
            alt=''
         />  
         <div className="info">
            <img 
                src={content.imgTitle}
                  alt=''/>
            
            <span className='desc'>
             {content.desc}
            </span>
            <div className="buttons">
                <button className="play">
                    <PlayArrow />
                    <span>Play</span>
                </button>
                <button className="more">
                    <InfoOutlined />
                    <span>Info</span>
                </button>

            </div>
         </div>
         
      </div>
  )
}

export default Featured