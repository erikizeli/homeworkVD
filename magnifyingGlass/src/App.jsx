import { useState } from 'react'
import './App.css'
import MainContainer from './components/MainHomework/MainContainer'
import ExtraContainer from './components/ExtraHomework/ExtraContainer'
import Popup from './middleware/Popup'


function App() {

  const [options, setOptions] = useState('opt1')

  const changeOpt = (event) => {
    setOptions(event.target.value)
  }

  const mainText = `
  - component based magnifying glass
  - hover over the image
  - click to fix the glass to a point on the image
  - zoom by scrolling
  - press r, g, or b and adjust the values with the arrows
  `

  const extraText = `
  - component based magnifying glass
  - hover over the image
  - click to fix the glass to a point on the image
  - zoom by scrolling
  - press r, g, or b and adjust the values with the arrows
  - change the glass size
  - form the shape of the glass
  - adjust the maximum zoom level
  `

  return (
    <div className='options-container'>
      <div className='options'>
          <label htmlFor="">Main homework</label> 
          <input type="radio" name='radio' value="opt1" checked={options === 'opt1'} onChange={changeOpt}/> 
          <Popup text={mainText}/>
          <label htmlFor="">Extra homework</label>
          <input type="radio" name='radio' value="opt2" checked={options === 'opt2'} onChange={changeOpt}/> 
          <Popup text={extraText}/>
      </div>
      <div className='selector-container'>
        {options == 'opt1' ? <MainContainer /> : <ExtraContainer />}
      </div>
    </div>
  )
}

export default App
