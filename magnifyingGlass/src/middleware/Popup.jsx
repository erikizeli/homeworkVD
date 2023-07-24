import React, { useState } from 'react';

const Popup = ({ text }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleTogglePopup = () => {
    setPopupVisible((prevValue) => !prevValue);
  };

  return (
    <div className="popup-container">
      <button onClick={handleTogglePopup}>?</button>
      {isPopupVisible && (
        <div className="popup">
          <p>{text}</p>
          <button onClick={handleTogglePopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Popup;