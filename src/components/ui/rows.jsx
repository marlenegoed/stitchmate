import {useStore} from '@/app/store';

export default function Rows () {

  const {numOfRows} = useStore();

  return (
    <p className="text-3xl text-neutral-400 whitespace-nowrap">{numOfRows ? numOfRows : '--'}</p>
  );

}