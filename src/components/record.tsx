import record from '../../assets/record.png';

interface RecordProps {
  playing: boolean;
  togglePlaying: () => void;
}

const Record = ({ playing, togglePlaying }: RecordProps) => {
  return (
    <div onClick={togglePlaying} className="m-5 w-32 cursor-pointer">
      <img
        src={record}
        alt="record"
        className={`
          ${playing ? 'animate-[spin_10s_linear_infinite]' : ''}
        `}
      />
    </div>
  );
};

export default Record;
