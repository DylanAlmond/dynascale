import { useCallback, useEffect, useRef, useState } from 'react';
import './ScalingComponent.css';

interface ScalingComponentProps {
  /**
   * The default scale
   */
  defaultScale?: number;

  /**
   * The minimum scale to apply
   */
  minScale?: number;

  /**
   * Margin percentage to leave around the scaled element (0-1)
   */
  margin?: number;

  /**
   * Additional class name for the container
   */
  className?: string;

  /**
   * Whether to show debug information
   */
  debug?: boolean;

  /**
   * Children to render inside the scaling element
   */
  children: React.ReactNode;
}

/**
 * A component that scales its children to always fit
 * within its container while maintaining aspect ratio.
 * @returns
 */
const ScalingComponent = ({
  defaultScale = 0,
  minScale = 0.1,
  margin = 0,
  className = '',
  debug = false,
  children
}: ScalingComponentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(defaultScale);
  const [containerSize, setContainerSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0
  });
  const [contentSize, setContentSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0
  });

  /**
   * Update scale when container or content size changes
   */
  const updateScale = useCallback(() => {
    if (!containerRef.current || !contentRef.current) return;

    // Get container dimensions
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    // Get content dimensions
    const contentWidth = contentRef.current.clientWidth;
    const contentHeight = contentRef.current.clientHeight;

    // Calculate scale factors
    const scaleX = containerWidth / contentWidth;
    const scaleY = containerHeight / contentHeight;

    // Use the smaller scale to ensure it fits
    const newScale = Math.max(Math.min(scaleX, scaleY) * (1 - margin), minScale);

    setScale(newScale);
    setContainerSize({ width: containerWidth, height: containerHeight });
    setContentSize({ width: contentWidth, height: contentHeight });
  }, [margin, minScale]);

  // Setup resize observer
  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    // Initial scale update
    updateScale();

    const resizeObserver = new ResizeObserver(updateScale);
    resizeObserver.observe(containerRef.current);
    resizeObserver.observe(contentRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [margin, updateScale]);

  return (
    <div ref={containerRef} className={`dynascale ${className}`}>
      <div
        ref={contentRef}
        className='dynascale__content'
        style={{
          transform: `scale(${scale})`
        }}
      >
        {children}
      </div>

      {debug && (
        <div className='dynascale__debug'>
          Scale: {scale.toFixed(2)}
          <br />
          Container: {containerSize.width.toFixed()}×{containerSize.height.toFixed()}px
          <br />
          Content: {contentSize.width.toFixed()}×{contentSize.height.toFixed()}px
          <br />
          Actual: {(contentSize.width * scale).toFixed()}×{(contentSize.height * scale).toFixed()}
          px
        </div>
      )}
    </div>
  );
};

export default ScalingComponent;
