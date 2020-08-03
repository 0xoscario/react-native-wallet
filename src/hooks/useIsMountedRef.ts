/**
 * @format
 */
import React from 'react';

export default function useIsMountedRef() {
  const isMounted = React.useRef(true);

  React.useEffect(() => () => {
    isMounted.current = false;
  }, []);

  return isMounted;
}
