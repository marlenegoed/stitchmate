import {ReactNode, createContext} from 'react';


// tbd
export const SwapperContent = createContext(null)

export default function Swapper({children}: {children: ReactNode}) {


  return (
    <SwapperContent.Provider value={null} >
      <div>
        {children}
      </div>
    </SwapperContent.Provider>
  )

}


export function SwapperTrigger({children}: {children: ReactNode}) {

  return (
    <div role="button" >

    </div>
  )

}
