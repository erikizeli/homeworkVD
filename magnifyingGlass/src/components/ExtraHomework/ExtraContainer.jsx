import React, { useEffect, useRef, useState } from 'react'
import ImageHolder from '../../middleware/ImageHolder';
import RgbController from '../../middleware/RgbController';
import GlassAttributeController from '../../middleware/GlassAttributeController';
import ExtraGlass from './ExtraMagnifyingGlass';
import ExtraZoomController from '../../middleware/ExtraZoomController';
import ImageQualityController from '../../middleware/ImageQualityController';

export default function ExtraContainer() {

  const [zoomValue, setZoomValues] = useState(2)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [glassPosition, setGlassPosition] = useState({ x: 0, y: 0 });
  const [rgbValue, setRgbValue] = useState({ r: 100, g: 100, b: 100 });
  const [currentColor, setCurrentColor] = useState()
  const [imageQuality, setImageQuality] = useState('lowQuality')
  const [lock, setLock] = useState(false);
  const [glassSize, setGlassSize] = useState(50);
  const [glassRadius, setGlassRadius] = useState(50);
  const [zoomLevel, setZoomLevel] = useState(10);
  const [mouseOver, setMouseOver] = useState(false)
  const BORDER_WIDTH = 4
  const MILLISECOND_DELAY = 30;
  const containerRef = useRef(null);

  useEffect(()=>{
    document.addEventListener('keydown', handleArrowKey);

    return () => {
      document.removeEventListener('keydown', handleArrowKey);
    };
  },[currentColor])


  const handleMouseMove = (event) => {
    const container = containerRef.current;
    const containerLeft = container.getBoundingClientRect().left;
    const containerTop = container.getBoundingClientRect().top;
    const containerWidth = container.getBoundingClientRect().width;
    const containerHeight = container.getBoundingClientRect().height;


    const cursorDiamater = glassSize * 2 + BORDER_WIDTH
    const verticalLockPoint = containerWidth - cursorDiamater
    const horizontalLockPoint = containerHeight - cursorDiamater

    const offsetX = event.clientX - containerLeft;
    const offsetY = event.clientY - containerTop;

    let lockedX = Math.max(0, Math.min(containerWidth, offsetX));
    let lockedY = Math.max(0, Math.min(containerHeight, offsetY));

    if (lockedX > verticalLockPoint) {
      lockedX = verticalLockPoint;
    }

    if (lockedY > horizontalLockPoint) {
      lockedY = horizontalLockPoint;
    }


    setTimeout(() => {
      setGlassPosition({x: offsetX, y: offsetY})
      setCursorPosition({x: lockedX, y: lockedY})
    }, MILLISECOND_DELAY);
  };
  

  const handleGlassValueChange = (event) => {
    const value = event.target.value;
    const id = event.target.id
    if (id === "zoomValue") setZoomValues(value)
    if (id === "red") setRgbValue(prevState => ({...prevState, r: value}))
    if (id === "green") setRgbValue(prevState => ({...prevState, g: value}))
    if (id === "blue") setRgbValue(prevState => ({...prevState, b: value}))
    if (id === "size") setGlassSize(value)
    if (id === "radius") setGlassRadius(value)
    if (id === "zoomLevel") setZoomLevel(value)
  }

  const handleScroll = (event) => {
    const scrollSensitivity = 1;
    const delta = event.deltaY < 0 ? -scrollSensitivity : scrollSensitivity;
    const val = Number(zoomValue) + delta
    const newValue = Math.max(1, Math.min(zoomLevel, val));

    setZoomValues(newValue);
  };

  const handleArrowKey = (event) => {
    if(event.key == 'r' || event.key == 'R'){
      if(currentColor == 'r'){
        setCurrentColor(null)
      } else {
        setCurrentColor('r')
      }
    }
    if(event.key == 'g' || event.key == 'G'){
      if(currentColor == 'g'){
        setCurrentColor(null)
      } else {
        setCurrentColor('g')
      }
    }
    if(event.key == 'b' || event.key == 'B'){
      if(currentColor == 'b'){
        setCurrentColor(null)
      } else {
        setCurrentColor('b')
      }
    }
    if (currentColor == 'r'){
      if (event.key == 'ArrowLeft' && rgbValue.r > 0) {
        const val = rgbValue.r -= 2
        setRgbValue(prevValue => ({...prevValue, r: val}))
      } else if (event.key == 'ArrowRight' && rgbValue.r < 200) {
        const val = rgbValue.r += 2
        setRgbValue(preValue => ({...preValue, r: val }))
      }
    }
    if (currentColor == 'g'){
      if (event.key == 'ArrowLeft' && rgbValue.g > 0) {
        const val = rgbValue.g -= 2
        setRgbValue(prevValue => ({...prevValue, g: val}))
      } else if (event.key == 'ArrowRight' && rgbValue.g < 200) {
        const val = rgbValue.g += 2
        setRgbValue(preValue => ({...preValue, g: val }))
      }
    }
    if (currentColor == 'b'){
      if (event.key == 'ArrowLeft' && rgbValue.b > 0) {
        const val = rgbValue.b -= 2
        setRgbValue(prevValue => ({...prevValue, b: val}))
      } else if (event.key == 'ArrowRight' && rgbValue.b < 200) {
        const val = rgbValue.b += 2
        setRgbValue(preValue => ({...preValue, b: val }))
      }
    }
  }

  function lockGlass(){
    setLock(!lock)
  }

  const handleMouseOver = () => {
    setMouseOver(true)
  }

  const handleMouseOut = () => {
    setMouseOver(false)
  }

  const handleImageQuality = (input) => {
    setImageQuality(input)
  }


  return (
    <div className='main-container' ref={containerRef} onMouseMove={handleMouseMove} >
      <div className='image-container' onClick={lockGlass} onWheel={handleScroll} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <ImageHolder/>
        <ExtraGlass 
        cursorPosition={cursorPosition} 
        glassPosition={glassPosition}
        zoomValue={zoomValue} 
        lock={lock}
        rgbValue={rgbValue}
        mouseOver={mouseOver}
        glassSize={glassSize}
        glassRadius={glassRadius}
        imageQuality={imageQuality}/>
      </div>
      <div className='zoom-container' onChange={handleGlassValueChange} >
        <ExtraZoomController zoomValue={zoomValue} zoomLevel={zoomLevel}/>
      </div>
      <div className='extra-container' onChange={handleGlassValueChange}>
        <GlassAttributeController glassRadius={glassRadius} glassSize={glassSize} zoomLevel={zoomLevel}/>
      </div>
      <div className='rgb-container' onChange={handleGlassValueChange} tabIndex={0} onKeyDown={handleArrowKey}>
        <RgbController rgbValue={rgbValue} currentColor={currentColor}/>
      </div>
      <div className='quality-container'>
        <ImageQualityController imageQuality={imageQuality} handleImageQuality={handleImageQuality}/>
      </div>
      <div className='eventLayer'></div>
    </div>
  )
}
