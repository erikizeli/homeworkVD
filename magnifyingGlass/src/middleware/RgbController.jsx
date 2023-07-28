export default function RgbController({ rgbValue, currentColor }) {
  return (
    <>
    <label htmlFor="red-slider" style={{ color: (currentColor == 'r' ? 'red' : null) }}>Red:</label>
    <input type="range" id="red" min="0" max="200" value={rgbValue.r} step="2"/>
    
    <label htmlFor="green-slider" style={{ color: (currentColor == 'g' ? 'green' : null) }}>Green:</label>
    <input type="range" id="green" min="0" max="200" value={rgbValue.g} step="2" />
    
    <label htmlFor="blue-slider" style={{ color: (currentColor == 'b' ? 'blue' : null) }}>Blue:</label>
    <input type="range" id="blue" min="0" max="200" value={rgbValue.b} step="2" />
    </>
  )
}