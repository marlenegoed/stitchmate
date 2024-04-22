import {useStore} from '@/app/store';

import BackgroundBlob from '../ui/background-blobs';
import {useMemo} from 'react';

export default function Rows () {

  const {numOfRows} = useStore();

  return (
    <div>
      <p className="text-4xl text-neutral-400 whitespace-nowrap text-center">{numOfRows ? numOfRows : '--'}</p>
    </div>
  );

}