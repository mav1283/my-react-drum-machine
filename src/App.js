import React, { useReducer } from 'react';
// import logo from './logo.svg';
// import './App.css';
import './stylesheet/style.scss';
import AppContext from './context/AppContext';
import Header from './components/header/Header';
import DrumInterface from './components/drum_interface/DrumInterface';
import Footer from './components/footer/Footer';

const initialState = {
  power: true,
  display: '...',
  sound_mode: '...',
  volume_lvl: 0.4
};

const stateReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_POWER':
      return { ...state, power: !state.power };
    case 'ADJUST_VOLUME':
      return { ...state, volume_lvl: action.volume };
    case 'SWITCH_TO_SYNTH_MODE':
      return {
        ...state,
        display: action.display,
        sound_mode: action.sound_mode
      };
    case 'SWITCH_TO_DRUM_MODE':
      return {
        ...state,
        display: action.display,
        sound_mode: action.sound_mode
      };
    case 'CHANGE_DISPLAY':
      return { ...state, display: action.display };
    case 'LOAD_SETTINGS':
      return {
        ...state,
        display: 'Kick',
        sound_mode: 'Drums',
        volume_lvl: 0.4
      };
    case 'RESET_DEFAULTS':
      return {
        ...state,
        power: false,
        display: '...',
        sound_mode: '...',
        volume_lvl: 0.4
      };
    default:
      return state;
  }
};

function App() {
  const [appState, dispatch] = useReducer(stateReducer, initialState);

  return (
    <AppContext.Provider value={{ appState, dispatch }}>
      <div className='App'>
        <p>Click the power button to turn on / off the app</p>
        <div className='DrumMachine'>
          <Header />
          <DrumInterface />
          <Footer />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
