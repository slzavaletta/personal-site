export const MOTION_DURATION = {
  quick: 0.15,
  standard: 0.25,
  /** Section and element entrance. */
  editorial: 0.5,
} as const;

/**
 * cubic-bezier(0.16, 1, 0.3, 1) — an ease-out expo. Entrance motion only; CSS
 * hover and focus transitions keep `--ease-editorial-curve`.
 */
export const MOTION_EASE = [0.16, 1, 0.3, 1] as const;

export const MOTION_DISTANCE = {
  subtle: 12,
  editorial: 20,
} as const;

export const MOTION_STAGGER = 0.06;

/** Past this many siblings the delay stops growing. */
export const MOTION_STAGGER_CAP = 6;
