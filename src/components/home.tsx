import Player from './player.tsx';
import { MainProvider } from '../context/mainContext';

const Home = () => (
  <MainProvider>
    <main
      className="
        flex
        flex-col
        w-screen
        h-screen
        items-center
        justify-center"
    >
      <Player />
    </main>
  </MainProvider>
);

export default Home;

