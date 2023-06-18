import React from 'react'
import './watch.scss'
import { ArrowBackIosOutlined } from '@material-ui/icons'
import { Link, useLocation } from 'react-router-dom'

const Watch = () => {
  const location = useLocation();
  console.log("🚀 ~ file: Watch.jsx:8 ~ Watch ~ location:", location)
  const movie = location.state;

  console.log(movie); 
  return (
    <div className="watch">
      <Link to='/'>
      <div className="back">
            <ArrowBackIosOutlined/>
            Home
        </div>
      </Link>
        
        <video className="video" autoPlay progress controls 
        src={movie?.video} />
    </div>
  )
}

export default Watch