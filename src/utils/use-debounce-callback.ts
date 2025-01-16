import { useCallback } from 'react'
import { debounce } from 'lodash'

export function useDebouncedCallback(
  callback: (...args: any) => any,
  time: number,
) {
  return useCallback(debounce(callback, time), [callback, time])
}
