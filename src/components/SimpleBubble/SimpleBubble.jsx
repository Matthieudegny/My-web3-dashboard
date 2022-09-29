import React from 'react'

import './SimpleBubble.scss'

function SimpleBubble({props}) {

  return (
    <div className='container-simpleBubble'>
      <h2>{props.title}</h2>
        <p>{props.firstRow} <span>{props.firstRowNumber}</span></p>
        <p>{props.secondRow} <span>{props.secondRowNumber}</span></p>
        <p>{props.thirdRow} <span>{props.thirdRowNumber}</span></p>
    </div>
  )
}

export default SimpleBubble