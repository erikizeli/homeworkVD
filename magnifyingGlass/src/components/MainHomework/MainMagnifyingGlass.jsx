import React, { useEffect, useState } from 'react'

export default function MainMagnifyingGlass({ cursorPosition, glassPosition, zoomValue, lock, saturation, mouseOver }) {

  const [lockedCursorPosition, setLockedCursorPosition] = useState(null);
  const [lockedGlassPosition, setLockedGlassPosition] = useState(null);
  const [display, setDisplay] = useState();

  
  useEffect(() => {
    if (!lock) {
      setLockedCursorPosition({ x: cursorPosition.x, y: cursorPosition.y });
      setLockedGlassPosition({ x: glassPosition.x, y: glassPosition.y });
    }
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
    'filter':`saturate(${saturation}%)`,
    'display':display,
    '--m': zoomValue,
  }
  return <div className='magnifying-glass'style={styles}></div>
}
