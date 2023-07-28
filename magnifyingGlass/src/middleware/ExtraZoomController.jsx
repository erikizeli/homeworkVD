export default function ExtraZoomController({ zoomValue, zoomLevel }) {
  return (
    <>
      <label className='scale-label' htmlFor="size">Zoom</label>
      <input type="range" id="zoomValue" min="1" max={zoomLevel} step="1" value={zoomValue}/>
    </>
  )
}
