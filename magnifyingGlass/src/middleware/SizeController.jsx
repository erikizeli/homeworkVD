import React from 'react'

export default function SizeController({ zoomValue }) {
  return (
    <>
      <label className='scale-label' htmlFor="size">Zoom</label>
      <input type="range" id="zoomValue" min="1" max="10" step="1" value={zoomValue}/>
    </>
  )
}
