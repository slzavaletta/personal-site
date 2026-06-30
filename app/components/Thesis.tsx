import { CyclingVerb } from "./motion/CyclingVerb";

/**
 * Two locked lines, both always rendered as plain visible text (no clip or
 * opacity animation that could hide them). Line 1 never changes, so it never
 * reflows. The verb cycles on line 2 only; the text after it reflows tight.
 */
export function Thesis() {
  return (
    <p className="mx-auto w-fit max-w-5xl text-left text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.15] tracking-tight">
      <span className="block">
        <span className="text-text">The roles are converging.</span>{" "}
        <span className="text-muted">I lead the program</span>
      </span>
      <span className="block text-muted">
        and{" "}
        <CyclingVerb
          words={["build", "prototype", "ship", "design", "maintain"]}
          className="text-accent"
        />{" "}
        the systems that run it.
      </span>
    </p>
  );
}
