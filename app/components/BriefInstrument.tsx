"use client";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { BRIEF } from "@/app/lib/content";

export function BriefInstrument() {
  const [active, setActive] = useState(0),
    [enhanced, setEnhanced] = useState(false);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => setEnhanced(true), []);
  const keyboard = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (["ArrowDown", "ArrowRight"].includes(event.key)) next = (index + 1) % 5;
    else if (["ArrowUp", "ArrowLeft"].includes(event.key))
      next = (index + 4) % 5;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 4;
    else return;
    event.preventDefault();
    setActive(next);
    buttons.current[next]?.focus();
  };
  return (
    <div className="brief" data-enhanced={enhanced}>
      <div
        className="brief-index"
        role="radiogroup"
        aria-label="Fields of the brief"
      >
        {BRIEF.fields.map((item, i) => (
          <button
            ref={(el) => {
              buttons.current[i] = el;
            }}
            key={item.id}
            type="button"
            role="radio"
            aria-checked={active === i}
            tabIndex={!enhanced || active === i ? 0 : -1}
            aria-controls={"brief-panel-" + item.id}
            id={"brief-field-" + item.id}
            onClick={() => setActive(i)}
            onKeyDown={(event) => keyboard(event, i)}
          >
            <span aria-hidden="true">{item.number}</span>
            {item.title}
          </button>
        ))}
      </div>
      <div className="brief-panels">
        {BRIEF.fields.map((item, i) => (
          <section
            className="brief-panel"
            id={"brief-panel-" + item.id}
            aria-labelledby={"brief-field-" + item.id}
            key={item.id}
            hidden={enhanced && active !== i}
            aria-live={enhanced ? "polite" : "off"}
          >
            <p className="eyebrow">{item.number} / Delivery brief</p>
            <h2>{item.title}</h2>
            <dl>
              <div>
                <dt>{BRIEF.panelLabels.prompt}</dt>
                <dd>{item.prompt}</dd>
              </div>
              <div>
                <dt>{BRIEF.panelLabels.whenMissing}</dt>
                <dd>{item.whenMissing}</dd>
              </div>
              <div>
                <dt>{BRIEF.panelLabels.fromTheWork}</dt>
                <dd>{item.fromTheWork}</dd>
              </div>
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
