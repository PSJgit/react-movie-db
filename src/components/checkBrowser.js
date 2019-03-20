
import React, { useState } from 'react'

const CheckBrowser = (props) => {
  
  const [ warningPopup, setWarningPopup ] = useState(props.isSupported)

  if (warningPopup) {
    return null
  } else {

    return (
      <div id='browser-warning'>
        <div id='close-warning' onClick={() => setWarningPopup(true)}><p>X</p></div>
        <p>Unfortunately, the browser you're using doesn't support the latest features available.</p>
        <p>Please try switching to a modern browser, like Chrome or Firefox.</p>
        <p>You can close this message and continue, however it won't look as good as it could.</p>
      </div>
    )
  }
}

export default CheckBrowser