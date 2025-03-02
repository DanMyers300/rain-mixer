import record from '../../assets/record.png';
import rain from '../../assets/rain.mp3';
import Audio from './audio.tsx';

interface RecordProps {
  volume: number;
  playing: boolean;
  togglePlaying: () => void;
}

const Record = ({ volume, playing, togglePlaying }: RecordProps) => {
  return (
    <div onClick={togglePlaying} className="m-5 w-32 cursor-pointer">
      <img
        src={record}
        alt="record"
        className={`
          ${playing ? 'animate-[spin_10s_linear_infinite]' : ''}
        `}
      />
      <Audio playing={playing} track={rain} volume={volume} />
    </div>
  );
};

export default Record;
