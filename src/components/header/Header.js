import React, { useContext, useEffect, useRef } from 'react';
import AppContext from '../../context/AppContext';
import { FaPowerOff, FaReact } from 'react-icons/fa';

function Header() {
  const { appState, dispatch } = useContext(AppContext);
  const { power } = appState;
  const powerAudioRef = useRef();

  useEffect(() => {
    /* Display the loading preset and add a classname to make it blink */
    function promptLoadingStart() {
      return new Promise((resolve, reject) => {
        let wait = setTimeout(() => {
          dispatch({ type: 'CHANGE_DISPLAY', display: '--loading preset--' });

          document.getElementById('preset-status').classList.add('loading');
          clearTimeout(wait);
          resolve('prompt loading started');
        }, 0);
      });
    }

    /* Remove the classname for blinking text */
    function prompLoadingEnd() {
      return new Promise((resolve, reject) => {
        let wait = setTimeout(() => {
          document.getElementById('preset-status').classList.remove('loading');

          clearTimeout(wait);
          handleLoadSettingsSound();
          resolve('prompt loading ended');
        }, 1500);
      });
    }

    /* Display the initial settings */
    function loadSettings() {
      return new Promise((resolve, reject) => {
        let wait = setTimeout(() => {
          dispatch({ type: 'LOAD_SETTINGS' });
          clearTimeout(wait);

          resolve('load settings done');
        }, 0);
      });
    }

    async function loadPreset() {
      const step_one = await promptLoadingStart();
      console.log(step_one);
      const step_two = await prompLoadingEnd();
      console.log(step_two);
      const step_three = await loadSettings();
      console.log(step_three);
    }
    if (power === true) {
      loadPreset();
    }
  }, [power, dispatch]);

  /* Reset Defaults on power off */
  useEffect(() => {
    if (power === false) {
      dispatch({ type: 'RESET_DEFAULTS' });
    }
  }, [power, dispatch]);

  const handlePower = () => {
    dispatch({ type: 'TOGGLE_POWER' });
    handlePowerSound();
  };

  const handlePowerSound = () => {
    document.getElementById('power-btn-audio').play();
    document.getElementById('power-btn-audio').currentTime = 0;
  };

  const handleLoadSettingsSound = () => {
    document.getElementById('power-btn-audio-2').play();
    document.getElementById('power-btn-audio-2').currentTime = 0;
  };

  return (
    <header id='App-header'>
      <div id='logo'>
        <h1>
          <span className='orange'>Drum</span>Machine
        </h1>{' '}
        <p className='small'>
          Powered by:{' '}
          <FaReact
            className={power === true ? 'react-icon spin' : 'react-icon'}
          />{' '}
          React
        </p>
      </div>
      <div id='power'>
        <button
          id='power-btn'
          className={power === true ? 'on' : null}
          onClick={handlePower}
        >
          <FaPowerOff />
        </button>
        <audio
          ref={powerAudioRef}
          id='power-btn-audio'
          src='https://res.cloudinary.com/dzsmdyknz/video/upload/v1533087306/sample-swap/sfx-and-unusual-sounds/bleeps-blips-blonks-blarts-and-zaps/simpletone.mp3'
          className='btn-audio-efx'
        >
          Your browser does not support the audio element.
        </audio>
        <audio
          id='power-btn-audio-2'
          src='https://res.cloudinary.com/dzsmdyknz/video/upload/v1582515899/fcc-drum-machine/Balabolka-text-to-speech/Presets_Loaded.mp3'
          className='btn-audio-efx'
        >
          Your browser does not support the audio element.
        </audio>
      </div>
    </header>
  );
}

export default Header;
