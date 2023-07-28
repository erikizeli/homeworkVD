export default function ZoomController({ zoomValue }) {
  return (
    <>
      <label className='scale-label' htmlFor="size">Zoom</label>
      <input type="range" id="zoomValue" min="1" max="10" step="1" value={zoomValue}/>
    </>
  )
}
