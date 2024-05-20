"use client"

import {useUserSettingsStore} from '@/providers/user-settings-store-provider';
import {UserSettingsState} from '@/stores/user-settings-store';
import {useEffect} from 'react';

export default function HydrateUserSettingsStore(params: UserSettingsState) {
  const initialize = useUserSettingsStore(state => state.initialize)
  useEffect(() => {
    initialize(params)
  }, [initialize, params])
  return null;
}