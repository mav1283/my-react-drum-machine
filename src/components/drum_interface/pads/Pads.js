import React, { useContext } from 'react';
import AppContext from '../../../context/AppContext';
import PadItem from './PadItem';
import PadItemOff from './PadItemOff';
import { drums, synths } from '../../../audio_api/audio_api';

const offKeys = ['q', 'w', 'e', 'a', 's', 'd', 'z', 'x', 'c'];

function Pads() {
  const { appState } = useContext(AppContext);
  const { power, sound_mode } = appState;

  return (
    <section id='pads'>
      {power === true
        ? sound_mode === 'Drums'
          ? drums.map(drum => <PadItem key={drum.id} {...drum} />)
          : synths.map(synth => <PadItem key={synth.id} {...synth} />)
        : offKeys.map(item => <PadItemOff key={item} keyCode={item} />)}
    </section>
  );
}

export default Pads;
