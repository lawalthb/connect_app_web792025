import { useEffect, useRef } from 'react';

export function useScrollToBottom(dependencies = []) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, dependencies);

  return containerRef;
}
