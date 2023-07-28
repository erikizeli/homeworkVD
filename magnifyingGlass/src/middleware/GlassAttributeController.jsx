export default function GlassAttributeController({ glassRadius, glassSize, zoomLevel }) {

  return (
    <>
    <label htmlFor="size-slider">Glass Size</label>
    <input type="range" id="size" min="50" max="200" value={glassSize} step="5"/>
    
    <label htmlFor="radius-slider">Glass Radius</label>
    <input type="range" id="radius" min="0" max="50" value={glassRadius} step="2"/>
    
    <label htmlFor="zoom-slider">Zoom level</label>
    <input type="range" id="zoomLevel" min="10" max="40" value={zoomLevel} step="1"/>
    </>
  )
}
