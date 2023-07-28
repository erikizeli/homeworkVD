export default function ImageQualityController({ handleImageQuality, imageQuality }) {

    const changeQuality = (event) => {
        handleImageQuality(event)
    }

    return (
        <div className='quality-options'>
            <label htmlFor="">High Image Quality</label>
            <input type="radio" name='radio' value="highQuality" checked={imageQuality === 'highQuality'} onChange={(e) => changeQuality(e.target.value)} />
            <label htmlFor="">Low Image Quality</label>
            <input type="radio" name='radio' value="lowQuality" checked={imageQuality === 'lowQuality'} onChange={(e) => changeQuality(e.target.value)} />
        </div>
    )
}