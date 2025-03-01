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
    <div
      onClick={togglePlaying}
      className="
        m-3
        flex
        h-80
        w-80
        items-center
        justify-center
        rounded-full
        cursor-pointer
        overflow-hidden
        relative
      "
    >
      <img
        src={record}
        alt="record"
        className={`
          absolute
          inset-0
          h-full
          w-full
          object-cover
          ${playing ? 'animate-[spin_10s_linear_infinite]' : ''}
        `}
      />
      <Audio playing={playing} track={rain} volume={volume} />
    </div>
  );
};

export default Record;
