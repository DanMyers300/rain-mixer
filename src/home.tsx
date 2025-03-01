import { useState } from 'react';

import Record from './components/player.tsx';
import Volume from './components/volume.tsx';

const Home = () => {
  const [volume, setVolume] = useState(0.5);
  const [playing, setPlaying] = useState(false);

  const togglePlaying = () => {
    setPlaying(!playing);
  };

  return (
    <main className="flex items-center justify-center h-screen w-screen" >
      <Record volume={volume} playing={playing} togglePlaying={togglePlaying} />
      <Volume volume={volume} setVolume={setVolume} />
    </main>
  );
};

export default Home;
