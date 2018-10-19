import spinner from './Spinner.gif';
import React from 'react'

export default function Spinner() {
  return (
    <div>
      <img src={spinner} style={{width: '200px',margin:'auto',display:''}} alt="Loading"/>
    </div>
  )
}
