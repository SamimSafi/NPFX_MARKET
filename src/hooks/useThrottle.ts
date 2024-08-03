import { useRef, useCallback } from 'react';
import { throthleDelaySeconds } from 'src/constantFile/CommonConstant';

type ThrottledFunction<T extends any[]> = (...args: T) => void; // Rest parameter for variable arguments

function useThrottle<T extends any[]>(callback: ThrottledFunction<T>): ThrottledFunction<T> {
  const lastCall = useRef(0);
  const isThrottled = useRef(false); // Flag to track if a function call is pending
  const { delay } = throthleDelaySeconds;
  const throttledFunction = useCallback(
    (...args: T) => {
      if (isThrottled.current) {
        // If a call is already pending, block the second request
        return;
      }

      const now = Date.now();
      const remainingTime = delay - (now - lastCall.current);

      if (remainingTime <= 0) {
        // If the delay period has passed, call the function
        callback(...args);
        lastCall.current = now;
      } else {
        // Set the flag to true to indicate a pending call
        isThrottled.current = true;
        setTimeout(() => {
          isThrottled.current = false; // Reset the flag after the delay period
        }, delay);
      }
    },
    [callback, delay] // Dependencies for useCallback
  );

  return throttledFunction;
}

export default useThrottle;
