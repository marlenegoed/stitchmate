"use client"

import {PropsWithChildren, ReactNode, useEffect, useState} from 'react'

export default function ZustandHydration({children, fallback = null}: PropsWithChildren<{fallback?: ReactNode}>) {
  const [hydrate, setHydrate] = useState(false)

  useEffect(() => {
    setHydrate(true)
  }, [hydrate])

  return hydrate ? children : fallback
}