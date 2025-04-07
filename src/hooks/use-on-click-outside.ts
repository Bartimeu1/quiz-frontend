import { RefObject, useEffect } from 'react';

export const useOnClickOutside = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: TouchEvent | MouseEvent) => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: TouchEvent | MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler]);

  return ref;
};
