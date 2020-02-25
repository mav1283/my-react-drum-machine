import React, { useContext, useEffect, useState, useRef } from 'react';
import AppContext from '../../../context/AppContext';

function PadItem(props) {
  const [isActive, setIsActive] = useState('');
  const { appState, dispatch } = useContext(AppContext);
  const { volume_lvl } = appState;
  const audioRef = useRef();

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    //document.addEventListener('load', adjustVolume);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      //document.removeEventListener('load', adjustVolume);
    };
  });

  useEffect(() => {
    adjustVolume();
  });

  const handleKeyPress = e => {
    if (
      e.keyCode === props.keyCode ||
      e.keyCode === props.keyTrigger.charCodeAt()
    ) {
      handleClick();
      window.focus();
    }
  };

  const handleClick = () => {
    const padsound = document.getElementById(props.keyTrigger);
    padsound.play();
    padsound.currentTime = 0;
    activatePad();
    handleDisplay(props.id.replace(/-/g, ' '));
    setTimeout(deactivatedPad, 200);
  };

  const activatePad = () => {
    setIsActive('light-on');
  };

  const deactivatedPad = () => {
    setIsActive('');
  };

  const adjustVolume = () => {
    audioRef.current.volume = volume_lvl;
  };

  const handleDisplay = param => {
    dispatch({ type: 'CHANGE_DISPLAY', display: param });
  };

  return (
    <div id={props.id} className={`pad ${isActive}`} onClick={handleClick}>
      <p>{props.keyTrigger}</p>
      <audio
        ref={audioRef}
        className='clip'
        id={props.keyTrigger}
        src={props.src}
      ></audio>
    </div>
  );
}

export default PadItem;
