import React from 'react'

import './Home.scss'

import SimpleBubble from '../../components/SimpleBubble/SimpleBubble'

import { homeFirstBubbleProps } from '../../data/data.js'

const Home = () => {

  return (
    <div className='Home_container'>
      <SimpleBubble props={homeFirstBubbleProps}/>
    </div>
  )
}

export default Home