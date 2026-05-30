import { useState, useEffect } from 'react'
import { WxtStorageItem } from '@wxt-dev/storage'

type MyWxtStore<T> = WxtStorageItem<T, Record<string, unknown>>

export function useStorage<T>(storageItem: MyWxtStore<T>) {
   // Initialize state as undefined while fetching data asynchronously
   const [value, setValue] = useState<T | undefined>(undefined)

   useEffect(() => {
      // 1. Fetch initial value from storage
      storageItem.getValue().then((initialValue) => {
         setValue(initialValue)
      })

      // 2. Watch for updates from background/other pages and update React state
      const unwatch = storageItem.watch((newValue) => {
         setValue(newValue)
      })

      return () => unwatch() // Cleanup listener on unmount
   }, [storageItem])

   // const setStorageValue = async (newValue: T | ((prev: T) => T)) => {
   //    if (typeof newValue === 'function') {
   //       const current = await storageItem.getValue()
   //       const updated = (newValue as (prev: T) => T)(current)
   //       await storageItem.setValue(updated)
   //    } else {
   //       await storageItem.setValue(newValue)
   //    }
   // }

   return value
}
