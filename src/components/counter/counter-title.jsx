import {useStore} from '@/app/store';

export function EditableTitle () {

  const {title} = useStore();
  return <Title>{title}</Title>;
  
}

export function Title ({children}) {
  return <h2 className="text-center text-2xl font-medium">{children}</h2>;
}