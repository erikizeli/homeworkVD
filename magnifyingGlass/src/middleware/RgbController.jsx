import React, { useEffect, useRef } from 'react'

export default function RgbController({ rgbValue }) {

  const redRef = useRef(null)
  const greenRef = useRef(null)
  const blueRef = useRef(null)

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === 'r' || event.key === 'R') {
      event.preventDefault(); 
      redRef.current.focus();
    }
    if (event.key === 'g' || event.key === 'G') {
      event.preventDefault(); 
      greenRef.current.focus();
    }
    if (event.key === 'b' || event.key === 'B') {
      event.preventDefault(); 
      blueRef.current.focus();
    }
    
  };

  return (
    <>
    <label htmlFor="red-slider">Red:</label>
    <input type="range" id="red" min="50" max="200" value={rgbValue.r} step="2" ref={redRef}/>
    
    <label htmlFor="green-slider">Green:</label>
    <input type="range" id="green" min="50" max="200" value={rgbValue.g} step="2" ref={greenRef}/>
    
    <label htmlFor="blue-slider">Blue:</label>
    <input type="range" id="blue" min="50" max="200" value={rgbValue.b} step="2" ref={blueRef}/>
    </>
  )
}
