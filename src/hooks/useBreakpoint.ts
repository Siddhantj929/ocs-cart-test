import { useState, useEffect } from 'react';

export type Breakpoint = 'xs' | 'xsPlus' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const useBreakpoint = () => {
    const [breakpoint, setBreakpoint] = useState<Breakpoint>('xs');

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const updateBreakpoint = () => {
            const width = window.innerWidth;

            if (width >= 1536) {
                setBreakpoint('2xl');
            } else if (width >= 1280) {
                setBreakpoint('xl');
            } else if (width >= 1024) {
                setBreakpoint('lg');
            } else if (width >= 768) {
                setBreakpoint('md');
            } else if (width >= 640) {
                setBreakpoint('sm');
            } else if (width >= 400) {
                setBreakpoint('xsPlus');
            } else {
                setBreakpoint('xs');
            }
        };

        // Set initial breakpoint
        updateBreakpoint();

        // Listen for resize events
        window.addEventListener('resize', updateBreakpoint);

        // Cleanup
        return () => window.removeEventListener('resize', updateBreakpoint);
    }, []);

    return breakpoint;
};

export default useBreakpoint;