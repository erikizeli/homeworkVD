import React, { useEffect, useRef, useState } from 'react'
import cityImage from "../../assets/city.jpg"

export default function ExtraMagnifyingGlass({ 
  cursorPosition, glassPosition, 
  zoomValue, lock, 
  rgbValue, mouseOver,
  glassSize, glassRadius,
  imageQuality
}) {

  const [lockedCursorPosition, setLockedCursorPosition] = useState(null);
  const [lockedGlassPosition, setLockedGlassPosition] = useState(null);
  const [display, setDisplay] = useState();

  const [imageSrc, setImageSrc] = useState('');
  const [refresh, setRefresh] = useState(false)
  const canvasRef = useRef(null);
  const [originalImageData, setOriginalImageData] = useState(null);
  
  // create the canvas, set its image and its paramaters
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const canvasWidth = (imageQuality == 'highQuality' ? img.width : 700)
      const canvasHeight = (imageQuality == 'highQuality' ? img.height : 400)
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
      setOriginalImageData(ctx.getImageData(0, 0, canvasWidth, canvasHeight));

      setImageSrc(canvas.toDataURL());
      setRefresh(!refresh)
    };
    img.src = cityImage;
  }, [imageQuality]);

  // once we have the image and the rgb value gets updated we change the canvas rgb value
  useEffect(() => {
    if (imageSrc) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.putImageData(originalImageData, 0, 0);
      applyColorToImage(ctx, rgbValue.r, rgbValue.g, rgbValue.b);
      setImageSrc(canvas.toDataURL());
    }
  }, [rgbValue, refresh]);

  // updates the rgb values of the image
  const applyColorToImage = (ctx, r, g, b) => {

    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const data = imageData.data;
    const len = data.length;
    const rFactor = r / 100;
    const gFactor = g / 100;
    const bFactor = b / 100;

    // iterate through and change the RGB value of all the pixels
    for (let i = 0; i < len; i += 4) {
      data[i] = Math.min(255, data[i] * rFactor);
      data[i + 1] = Math.min(255, data[i + 1] * gFactor);
      data[i + 2] = Math.min(255, data[i + 2] * bFactor);
    }

    ctx.putImageData(imageData, 0, 0);
  };

  useEffect(() => {
    // Lock the glass onto the image
    if (!lock) {
      setLockedCursorPosition({ x: cursorPosition.x, y: cursorPosition.y });
      setLockedGlassPosition({ x: glassPosition.x, y: glassPosition.y });
    }
    // glass disappears when leaving image
    if(mouseOver){
      setDisplay('flex')
    }
    if (!mouseOver && !lock) {
      setDisplay('none')
    }
  }, [cursorPosition, glassPosition, lock]);
  
  const styles = {
    '--x': lock ? (lockedGlassPosition ? `${lockedGlassPosition.x}px` : null) : `${glassPosition.x}px`,
    '--y': lock ? (lockedGlassPosition ? `${lockedGlassPosition.y}px` : null) : `${glassPosition.y}px`,
    'left': lock ? (lockedCursorPosition ? `${lockedCursorPosition.x}px` : null) : `${cursorPosition.x}px`,
    'top': lock ? (lockedCursorPosition ? `${lockedCursorPosition.y}px` : null) : `${cursorPosition.y}px`,
    'backgroundImage': `url(${imageSrc})`,
    'display':display,
    '--m': zoomValue,
    '--borderRadius': `${glassRadius}%`,
    '--glassRadius': `${glassSize}px`,
  }
  return (
    <div className='magnifying-glass' style={styles}>
      <canvas ref={canvasRef} style={{ display: 'none' }} width="768" height="432" />
    </div>
  )
}
