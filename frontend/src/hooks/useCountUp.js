import { useEffect, useState } from 'react';

export default function useCountUp(end, { duration = 900, start = 0, enabled = true } = {}) {
  const [value, setValue] = useState(start);

  useEffect(() => {
    if (!enabled) {
      setValue(end);
      return;
    }

    let startTime = null;
    let rafId;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(start + (end - start) * eased));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    }

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [end, duration, start, enabled]);

  return value;
}
