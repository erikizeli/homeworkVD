export default function RgbController({ rgbValue }) {
  return (
    <>
    <label htmlFor="red-slider">Red:</label>
    <input type="range" id="red" min="0" max="200" value={rgbValue.r} step="2" />
    
    <label htmlFor="green-slider">Green:</label>
    <input type="range" id="green" min="0" max="200" value={rgbValue.g} step="2" />
    
    <label htmlFor="blue-slider">Blue:</label>
    <input type="range" id="blue" min="0" max="200" value={rgbValue.b} step="2" />
    </>
  )
}
