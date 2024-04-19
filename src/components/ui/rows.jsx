import {useStore} from '@/app/store';

export default function Rows () {

  const {numOfRows} = useStore();

  return (
    <p className="text-4xl text-neutral-400 text-right">{numOfRows ? numOfRows : '--'}</p>
  );

}