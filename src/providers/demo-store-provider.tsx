'use client'

import {type ReactNode, createContext, useRef, useContext} from 'react'
import {type StoreApi, useStore} from 'zustand'

import {createDemoStore, type DemoStore, initDemoStore} from '@/stores/demo-store'

export const DemoStoreContext = createContext<StoreApi<DemoStore> | null>(
  null,
)

export interface DemoStoreProviderProps {
  children: ReactNode
}

export const DemoStoreProvider = ({
  children,
}: DemoStoreProviderProps) => {
  const storeRef = useRef<StoreApi<DemoStore>>()
  if (!storeRef.current) {
    storeRef.current = createDemoStore(initDemoStore())
  }

  return (
    <DemoStoreContext.Provider value={storeRef.current}>
      {children}
    </DemoStoreContext.Provider>
  )
}

export const useDemoStore = <T,>(
  selector: (store: DemoStore) => T,
): T => {
  const demoStoreContext = useContext(DemoStoreContext)

  if (!demoStoreContext) {
    throw new Error(`useDemoStore must be use within DemoStoreProvider`)
  }

  return useStore(demoStoreContext, selector)
}
