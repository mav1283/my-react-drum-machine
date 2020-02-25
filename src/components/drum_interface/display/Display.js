import React, { useContext, useRef } from 'react';
import AppContext from '../../../context/AppContext';
import { FaVolumeUp } from 'react-icons/fa';

function Display() {
  const { appState, dispatch } = useContext(AppContext);
  const { power, display, volume_lvl, sound_mode } = appState;

  const handleVolume = e => {
    dispatch({
      type: 'ADJUST_VOLUME',
      volume: power === true ? e.target.value : volume_lvl
    });
  };

  const switchAudioRef = useRef();

  const handleSynthMode = () => {
    dispatch({
      type: 'SWITCH_TO_SYNTH_MODE',
      display: 'horn',
      sound_mode: 'Synth'
    });
    switchSound();
  };

  const handleDrumMode = () => {
    dispatch({
      type: 'SWITCH_TO_DRUM_MODE',
      display: 'kick',
      sound_mode: 'Drums'
    });
    switchSound();
  };

  const switchSound = () => {
    document.getElementById('btn-audio').play();
    document.getElementById('btn-audio').currentTime = 0;
  };

  const activeSwitch = (
    <>
      <button
        id='bank_btn_drums'
        className={
          sound_mode === 'Drums' ? 'bank-btn drums on' : 'bank-btn drums'
        }
        onClick={handleDrumMode}
      >
        <span className='text'>Drums</span>
      </button>
      <button
        id='bank_btn_synth'
        className={
          sound_mode === 'Synth' ? 'bank-btn synth on' : 'bank-btn synth'
        }
        onClick={handleSynthMode}
      >
        <span className='text'>Synth</span>
      </button>
    </>
  );
  const inactiveSwitch = (
    <>
      <button id='bank_btn_drums' className='bank-btn drums'>
        <span className='text'>Drums</span>
      </button>
      <button id='bank_btn_synth' className='bank-btn synth'>
        <span className='text'>Synth</span>
      </button>
    </>
  );

  return (
    <section id='display-section'>
      <div id='screen' className={power === true ? 'on' : null}>
        <div className='code-area'>
          <div className='code-area-section'>
            <h2 id='preset-status' className='text-code'>
              {display}
            </h2>
          </div>
          <div className='code-area-section'>
            <p className='text-code-small vol left'>
              Volume: {Math.round(volume_lvl * 100)}%
            </p>
            <p className='text-code-small mode right'>Mode: {sound_mode}</p>
          </div>
        </div>
      </div>
      <div id='volume'>
        <div className='volume-container'>
          <label className='volume-label'>
            <FaVolumeUp />
          </label>
          <input
            type='range'
            min='0'
            max='1'
            step='0.01'
            value={volume_lvl}
            className='volume-slider'
            onChange={handleVolume}
          />
        </div>
      </div>
      <div id='bank-controls'>
        {power === true ? activeSwitch : inactiveSwitch}
        <audio
          ref={switchAudioRef}
          id='btn-audio'
          src='https://res.cloudinary.com/dzsmdyknz/video/upload/v1532597915/sample-swap/switches/switch-it-on2.mp3'
          className='btn-audio-efx'
        ></audio>
      </div>
    </section>
  );
}

export default Display;
