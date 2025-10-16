'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Coins } from 'lucide-react';

export interface FancyCalloutLineProps {
  label?: React.ReactNode;
  coins?: number;
  timeLeftText?: string;
  rightContent?: React.ReactNode;
  width?: number; // horizontal segment length in px
  align?: 'right' | 'left';
  show?: boolean; // control visibility
  animateGrow?: boolean; // animate line drawing
  durationMs?: number; // animation duration
  className?: string;
  topRightContent?: React.ReactNode; // content to show in the top right corner
  interactive?: boolean; // when true, allow pointer interactions inside
}

// A small SVG elbow line with a horizontal run and a short diagonal from the node.
export default function FancyCalloutLine({
  label = 'Guiding Star',
  coins,
  timeLeftText,
  rightContent,
  topRightContent,
  align = 'right',
  show = false,
  animateGrow = true,
  durationMs = 260,
  className,
  interactive = false,
}: FancyCalloutLineProps) {
  const h = 18; // svg height
  const elbow = 8; // diagonal segment length
  const y = 8; // line y

  const pathRef = useRef<SVGPathElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pathD, setPathD] = useState('');

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.getBoundingClientRect().width ?? 0;
      const newPath =
        align === 'right'
          ? `M 0 ${h} L ${elbow} ${y} L ${width} ${y}`
          : `M ${width} ${h} L ${width - elbow} ${y} L 0 ${y}`;
      setPathD(newPath);
    }
  }, [show]);
  const [length, setLength] = useState<number>(0);

  useEffect(() => {
    if (!pathRef.current) return;
    try {
      const len = pathRef.current.getTotalLength();
      setLength(len);
    } catch {}
  }, [pathD]);

  const dashArray = length || 1;
  const dashOffsetHidden = length || 1;
  const dashOffsetShown = 0;

  // Translucent frosted background when visible
  const blurCls = show
    ? 'backdrop-blur-sm bg-white/30 dark:bg-slate-900/30 ring-1 ring-slate-200/50 dark:ring-white/10 shadow-sm'
    : 'bg-transparent';

  // Toggle pointer events for interactive content
  const peCls = interactive ? 'pointer-events-auto' : 'pointer-events-none';

  return (
    <div
      ref={containerRef}
      className={`transition-[backdrop-filter] ${blurCls} ${peCls} absolute ${className ?? ''}`}
      style={{
        transition: 'all 200ms ease-out',
        left: align === 'right' ? 18 : undefined,
        right: align === 'left' ? 18 : undefined,
      }}
      onMouseDown={e => interactive && e.stopPropagation()}
      onClick={e => interactive && e.stopPropagation()}
    >
      <div
        className={`absolute flex select-none justify-between gap-5 rounded-md px-2 py-0.5 text-foreground transition-colors duration-200 bg-background/60 dark:bg-slate-900/60`}
        style={{
          fontSize: show ? '12px' : '10px',
          paddingLeft: align === 'right' ? 20 : 0,
          paddingRight: align === 'left' ? 20 : 0,
          transition: `all ${Math.max(120, durationMs - 140)}ms ease`,
          top: show ? -20 : -16,
          boxShadow: show ? '0 0 8px 2px rgba(148, 163, 184, 0.15)' : undefined,
        }}
      >
        {label}
        <div
          className={`transition-all ease-out ${show ? 'opacity-100' : 'opacity-0'}`}
        >
          {topRightContent}
        </div>
      </div>
      <svg
        height={h}
        className="-mt-1 text-slate-600 dark:text-slate-200/80"
        style={{
          filter: show
            ? 'drop-shadow(0px 0px 2px rgba(100, 116, 139, 0.3))'
            : undefined,
        }}
      >
        <path
          ref={pathRef}
          d={pathD}
          stroke="currentColor"
          strokeWidth={1.2}
          strokeLinecap="round"
          fill="none"
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset:
              show && animateGrow ? dashOffsetShown : dashOffsetHidden,
            transition: animateGrow
              ? `stroke-dashoffset ${durationMs}ms ease-out`
              : undefined,
          }}
        />
      </svg>
      {(coins !== undefined || timeLeftText || rightContent) && (
        <div
          className="absolute top-8 select-none"
          style={{
            opacity: show ? 1 : 0,
            transition: `opacity ${Math.max(120, durationMs - 80)}ms ease-out ${Math.max(60, Math.round(durationMs * 0.5))}ms`,
            ...(align === 'right' ? { right: 0 } : { left: 0 }),
          }}
        >
          <div
            className={`inline-flex items-center gap-2 rounded-md px-2 py-1 text-[11px] text-foreground transition-colors duration-200`}
          >
            {rightContent ?? (
              <>
                {typeof coins === 'number' && (
                  <span className="inline-flex items-center gap-1">
                    <Coins className="size-3.5" /> {coins}
                  </span>
                )}
                {timeLeftText && (
                  <span className="text-rose-500">{timeLeftText}</span>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
