import {useStore} from '@/app/store';

export default function Rows () {

  const {numOfRows} = useStore();

  return (
    <div>
      <p className=" -pb-20 text-4xl text-neutral-400 whitespace-nowrap relative -bottom-0.5">{numOfRows ? numOfRows : '--'}</p>
    </div>
  );

}