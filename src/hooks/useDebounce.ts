import { useCallback, useRef } from 'react';
import { throthleDelaySeconds } from 'src/constantFile/CommonConstant';

interface UseDebouncedFunctionProps<T> {
  callback: (arg: T) => void;
}

const useDebounced = <T>({ callback }: UseDebouncedFunctionProps<T>) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { deBounce } = throthleDelaySeconds;
  const debouncedCallback = useCallback(
    (arg: T) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(arg);
      }, deBounce);
    },
    [callback, deBounce]
  );

  return debouncedCallback;
};

export default useDebounced;
