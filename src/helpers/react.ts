import { useRef, useLayoutEffect, useCallback } from 'react';

export function useEventCallback<T extends (...args: any[]) => any>(fn: T, dependencies: any[]): T {
  const ref = useRef<T>((() => {
    throw new Error('Cannot call an event handler while rendering.');
  }) as any);

  useLayoutEffect(() => {
    ref.current = fn;
  }, [fn, ...dependencies]);

  return useCallback(((...args) => {
    const fn = ref.current;
    return fn(...args);
  }) as T, [ref]);
}
