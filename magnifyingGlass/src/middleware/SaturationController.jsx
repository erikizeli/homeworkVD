export default function SaturationController({ saturation }) {
    return (
      <>
      <label htmlFor="red-slider">Saturation:</label>
      <input type="range" id="saturation" min="0" max="200" value={saturation} step="2"/>
      </>
    )
  }