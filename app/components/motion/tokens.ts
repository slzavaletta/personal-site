export const MOTION_DURATION = {
  quick: 0.15,
  standard: 0.25,
  /** Section entrance. */
  editorial: 0.4,
} as const;

/**
 * cubic-bezier(0.16, 1, 0.3, 1) — an ease-out expo. Entrance motion only; CSS
 * hover and focus transitions keep `--ease-editorial-curve`.
 */
export const MOTION_EASE = [0.16, 1, 0.3, 1] as const;

export const MOTION_DISTANCE = {
  subtle: 12,
  editorial: 24,
} as const;

export const MOTION_STAGGER = 0.06;
