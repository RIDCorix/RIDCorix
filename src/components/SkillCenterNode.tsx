'use client';

import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import {
  Coins,
  Star as StarIcon,
  ShieldAlert,
  Lock,
  LockOpen,
  Gift,
  icons,
} from 'lucide-react';
import LineIndicator from './LineIndicator';
import FancyCalloutLine from './FancyCalloutLine';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NodeContextMenu } from './NodeContextMenu';
import { GitBranch, Download } from 'lucide-react';
import starscriberService from '@/services/starscriberService';
import { useTheme } from '@/contexts/ThemeContext';

export interface SkillCenterNodeData {
  icon?: string; // name of icon from lucide-react
  label: string;
  slug?: string; // node slug for API calls
  chapterSlug?: string; // chapter slug for API calls
  size?: number; // radius base (we double it for diameter)
  status: NodeStatus;
  isSelected?: boolean;
  labelPosition?: 'top' | 'bottom';
  tags?: string[];
  guiding?: boolean;
  guidingLineage?: boolean;
  courseCount?: number;
  // Course completion type information
  courseType?: string; // 'online, 'in_person', 'tutor', etc.
  completionType?: CourseCompletionType;
  // Optional live values (fallback to heuristics when missing)
  unlockProgressPercent?: number; // for unlocked in-progress
  stardustNeeded?: number; // amount needed to unlock
  starsMissingToUnlock?: number; // for locked nodes
  // Group aggregate hints
  isGroup?: boolean;
  descendantStarsCount?: number; // always show when group
  containsGuidingStar?: boolean;
  // Allow enabling connectors when editing in starscriber
  connectable?: boolean;
  readonly?: boolean; // when true, hide handles
  // Fade-in animation for newly visible nodes
  shouldFadeIn?: boolean;
  // Context menu handlers for starscriber editor mode
  onEdit?: () => void;
  onDelete?: () => void;
  // Preview flag for AI proposal visualization
  isPreview?: boolean;
}

export function SkillCenterNode({ data }: { data: SkillCenterNodeData }) {
  const { theme: currentTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const size = (data.size ?? 14) * 2;
  const status: NodeStatus = data.status || StarStatus.Locked;
  const isSelected = !!data.isSelected;
  const labelPosition: 'top' | 'bottom' = data.labelPosition ?? 'top';
  const [hovered, setHovered] = useState(false);
  const guiding: boolean = !!data.guiding;
  const guidingLineage: boolean = !!data.guidingLineage;

  // Context menu state
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle preview nodes with special styling
  const isPreview = data.isPreview;
  const actualTheme = mounted && currentTheme === 'dark' ? 'dark' : 'light';
  const previewStyles = {
    fill: 'rgba(251, 191, 36, 0.2)',
    border: 'rgba(251, 191, 36, 0.8)',
    glow: '0 0 20px rgba(251, 191, 36, 0.6)',
    iconColor: '#fbbf24',
  };

  const { fill, border, glow, iconColor } = isPreview
    ? previewStyles
    : STATUS_STYLES[status][actualTheme];
  const Icon = icons[data.icon as keyof typeof icons] || icons.Code;
  const iconSize = Math.max(12, Math.floor(size * 0.3));
  const accent = isPreview ? '#fbbf24' : STATUS_ACCENT[status];

  // Keyboard state for showing editing handles
  const [isModifierPressed, setIsModifierPressed] = useState(false);

  // Listen for Cmd/Ctrl key presses to show editing handles
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey) {
        setIsModifierPressed(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!event.metaKey && !event.ctrlKey) {
        setIsModifierPressed(false);
      }
    };

    // Also handle window blur to reset state
    const handleWindowBlur = () => {
      setIsModifierPressed(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, []);

  // Add subtle border accent for course completion types
  let completionTypeAccent = border;
  if (
    data.completionType === CourseCompletionType.OnlineCourse ||
    data.courseType === 'online'
  ) {
    completionTypeAccent = 'rgba(59,130,246,0.7)'; // Blue for online
  } else if (
    data.completionType === CourseCompletionType.InPersonCourse ||
    data.courseType === 'in_person'
  ) {
    completionTypeAccent = 'rgba(16,185,129,0.7)'; // Green for in-person
  } else if (
    data.completionType === CourseCompletionType.TutorCourse ||
    data.courseType === 'tutor'
  ) {
    completionTypeAccent = 'rgba(168,85,247,0.7)'; // Purple for tutor
  }

  const shouldFadeIn = !!data.shouldFadeIn;

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    // Only show context menu if edit/delete handlers are provided (starscriber editor mode)
    if (data.onEdit && data.onDelete) {
      setContextMenu({
        x: event.clientX,
        y: event.clientY,
      });
    }
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  return (
    <>
      <div
        className="relative hover:cursor-pointer"
        style={{ width: size, height: size }}
        data-preview={data.isPreview ? 'true' : undefined}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onContextMenu={handleContextMenu}
      >
        <NodeHoverPanel
          data={data}
          status={status}
          hovered={hovered}
          accent={accent}
        />
        {/* Guiding star ping */}
        {guiding && (
          <div className="absolute -right-1 -top-1 z-[1]">
            <div className="relative">
              <div
                className="absolute inset-0 animate-ping rounded-full"
                style={{ background: 'rgba(250,204,21,0.25)' }}
              />
              <div
                className="relative grid place-items-center rounded-full border border-yellow-500 bg-yellow-400 text-yellow-900 shadow ring-1 ring-yellow-300/40"
                style={{ width: 16, height: 16 }}
              >
                <StarIcon className="size-3" />
              </div>
            </div>
          </div>
        )}
        {/* Status ambient effects */}
        {status === StarStatus.Unlockable && (
          <div
            className="pointer-events-none absolute -inset-2 animate-pulse rounded-full"
            style={{ boxShadow: '0 0 0 3px rgba(59,130,246,0.25)' }}
          />
        )}
        {status === StarStatus.Claimable && (
          <div
            className="pointer-events-none absolute -inset-2 animate-ping rounded-full"
            style={{ boxShadow: '0 0 0 3px rgba(245,158,11,0.35)' }}
          />
        )}
        {isSelected && (
          <div
            className="pointer-events-none absolute -inset-1 animate-[pulse_2s_ease-in-out_infinite] rounded-full ring-2"
            style={{ boxShadow: `0 0 0 4px ${accent}40` }}
          />
        )}
        {!guiding && guidingLineage && (
          <div
            className="pointer-events-none absolute -inset-1.5 rounded-full"
            style={{ boxShadow: '0 0 18px 4px rgba(250,204,21,0.25)' }}
          />
        )}

        <div
          className={`grid place-items-center rounded-full transition-all duration-1000 ease-out ${shouldFadeIn ? 'animate-fade-in' : ''}`}
          style={{
            width: size,
            height: size,
            background: fill,
            border: `2px solid ${completionTypeAccent}`,
            boxShadow: glow,
            opacity: status === StarStatus.Locked ? 0.45 : 1,
          }}
        >
          <Icon
            style={{ width: iconSize, height: iconSize, color: iconColor }}
          />
        </div>
        {/* Handles */}
        <Handle
          position={Position.Top}
          id="source"
          isConnectable={!data.readonly}
          type="source"
          style={{
            alignSelf: 'center',
            transition: 'opacity 0.2s ease',
            width: '100%',
            height: '100%',
            opacity: 0,
            top: 'calc(50%)',
            pointerEvents: isModifierPressed ? 'auto' : 'none',
          }}
        ></Handle>
        <Handle
          id="target"
          isConnectable={!data.readonly}
          type="target"
          position={Position.Top}
          style={{
            alignSelf: 'center',
            transition: 'opacity 0.2s ease',
            width: '100%',
            height: '100%',
            opacity: 0,
          }}
        />
      </div>

      {/* Context Menu */}
      {contextMenu && data.onEdit && data.onDelete && (
        <NodeContextMenu
          x={24}
          y={24}
          onEdit={data.onEdit}
          onDelete={data.onDelete}
          onClose={handleCloseContextMenu}
        />
      )}
    </>
  );
}

function Pill({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className="inline-flex h-5 items-center gap-1 rounded-md border bg-background/70 px-2 text-[10px] font-medium backdrop-blur"
      style={{ borderColor: color, color }}
    >
      {children}
    </span>
  );
}

function NodeHoverPanel({
  data,
  status,
  hovered,
  accent,
}: {
  data: SkillCenterNodeData;
  status: NodeStatus;
  hovered: boolean;
  accent: string;
}) {
  const labelPosition: 'top' | 'bottom' = data.labelPosition ?? 'top';
  const isSelected = !!data.isSelected;
  const show = hovered || isSelected;

  const stardust =
    data.stardustNeeded ?? stardustCostFromCourseCount(data.courseCount);
  const progressPct =
    typeof data.unlockProgressPercent === 'number'
      ? data.unlockProgressPercent
      : percentFromId(data.label);
  const starsMissing = data.starsMissingToUnlock;

  // Status section per mock
  let statusBadge: React.ReactNode = null;
  if (status === StarStatus.Locked)
    statusBadge = (
      <Pill color="#94a3b8">
        <Lock className="size-3" /> Locked
      </Pill>
    );
  else if (status === StarStatus.Unlockable)
    statusBadge = (
      <Pill color="#3b82f6">
        <LockOpen className="size-3" /> Unlockable
      </Pill>
    );
  else if (status === StarStatus.Claimable)
    statusBadge = (
      <Pill color="#f59e0b">
        <Gift className="size-3" /> Claimable
      </Pill>
    );
  else if (status === StarStatus.Healthy)
    statusBadge = <Pill color="#10b981">Healthy</Pill>;
  else statusBadge = <Pill color="#111827">In&nbsp;Progress</Pill>;

  // Right content block according to state
  let rightBlock: React.ReactNode = null;
  if (status === StarStatus.Locked) {
    rightBlock = (
      <span className="text-[10px] opacity-80">
        {starsMissing} more stars to unlock
      </span>
    );
  } else if (status === StarStatus.Unlockable) {
    rightBlock = (
      <div className="flex items-center gap-2">
        <Coins width={12} className="opacity-80" />
        <span className="text-[10px] opacity-80">{stardust}</span>
      </div>
    );
  } else if (status === StarStatus.Claimable) {
    rightBlock = (
      <span className="text-[10px] text-amber-500 font-medium">
        Rewards available
      </span>
    );
  } else {
    // in progress
    rightBlock = (
      <div className="flex items-center gap-2">
        <LineIndicator
          value={progressPct}
          variant="primary"
          width={96}
          height={3}
          showDot
          animate
          ariaLabel="Progress"
        />
        <span className="text-[10px] tabular-nums opacity-80">
          {progressPct}%
        </span>
      </div>
    );
  }

  // Top right chips: descendant count if group, and optional guiding indicators contained
  const topRight = (
    <div className="flex items-center gap-2">
      {data.isGroup && (
        <span className="inline-flex items-center gap-1 rounded-md border bg-background/60 px-1.5 py-0.5 text-[10px]">
          <StarIcon className="size-3" /> {data.descendantStarsCount ?? 0}
        </span>
      )}
      {/* Course completion type indicator */}
      {(data.completionType || data.courseType) && (
        <span className="inline-flex items-center gap-1 rounded-md border bg-background/60 px-1.5 py-0.5 text-[10px]">
          {React.createElement(
            getCourseCompletionTypeIcon(data.completionType, data.courseType),
            { className: 'w-3 h-3' }
          )}
          <span>
            {getCourseCompletionTypeLabel(
              data.completionType,
              data.courseType
            ).replace(' Course', '')}
          </span>
        </span>
      )}
    </div>
  );

  const title = (
    <span className="inline-flex items-center gap-2">
      <span className="max-w-[180px] truncate md:max-w-[220px]">
        {data.label}
      </span>
      {statusBadge}
    </span>
  );

  // Action block below the line (interactive)
  let actionBlock: React.ReactNode = null;
  if (status === StarStatus.Unlockable) {
    actionBlock = (
      <Button
        size="sm"
        variant="default"
        className="size-8 rounded-full text-[10px]"
        onMouseDown={e => e.stopPropagation()}
        onClick={e => e.stopPropagation()}
      >
        <LockOpen className="size-3" />
      </Button>
    );
  } else if (status === StarStatus.Healthy) {
    actionBlock = (
      <Button
        size="sm"
        variant="secondary"
        className="size-8 rounded-full text-[10px]"
        onMouseDown={e => e.stopPropagation()}
        onClick={e => e.stopPropagation()}
      >
        <ShieldAlert className="size-3" />
      </Button>
    );
  }

  // Compose main and optional sub row for right content to match stacked rows in the mock
  const mainRow = rightBlock;
  let subRow: React.ReactNode = null;
  if (data.guiding || data.containsGuidingStar) {
    subRow = (
      <div className="mt-1 flex items-center gap-2">
        <StarIcon className="size-3.5 text-yellow-400" />
        <span className="text-[10px]">Guiding Star</span>
        <span className="text-[10px] text-rose-500">2 days left!</span>
      </div>
    );
  }

  const callout = (
    <FancyCalloutLine
      label={title}
      rightContent={
        <div className="flex flex-col items-start">
          {mainRow}
          {subRow}
        </div>
      }
      topRightContent={topRight}
      coins={undefined}
      timeLeftText={undefined}
      align="right"
      show={show}
      animateGrow
      interactive={false}
      className="z-[-1]"
    />
  );

  return <>{callout}</>;
}

export default SkillCenterNode;
