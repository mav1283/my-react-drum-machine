import React from 'react';
import Display from './display/Display';
import Pads from './pads/Pads';

function DrumInterface() {
  return (
    <div id='drum-interface'>
      <Pads />
      <Display />
    </div>
  );
}

export default DrumInterface;
