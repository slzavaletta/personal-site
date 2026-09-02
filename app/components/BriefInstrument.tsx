"use client";

import { useRef, useState, type KeyboardEvent } from "react";

import { BRIEF } from "@/app/lib/content";

const FIELDS = BRIEF.fields;

/**
 * The pilot decision brief as an instrument. The five fields are a radio
 * group — one is always selected, arrow keys move the selection, Home and
 * End jump — and the panel beside it argues the selected field: what tends
 * to go wrong when it is left blank, and where the habit came from.
 *
 * Server HTML carries the first field selected, so the argument is on the
 * page without JavaScript.
 */
export function BriefInstrument() {
  const [activeIndex, setActiveIndex] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const field = FIELDS[activeIndex] ?? FIELDS[0];

  const select = (index: number, focus = false) => {
    const next = (index + FIELDS.length) % FIELDS.length;
    setActiveIndex(next);
    if (focus) buttons.current[next]?.focus();
  };

  const onKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        select(index + 1, true);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        select(index - 1, true);
        break;
      case "Home":
        event.preventDefault();
        select(0, true);
        break;
      case "End":
        event.preventDefault();
        select(FIELDS.length - 1, true);
        break;
      default:
    }
  };

  return (
    <div className="instrument">
      <div
        role="radiogroup"
        aria-label="Fields of the brief"
        className="instrument__fields"
      >
        {FIELDS.map((item, index) => {
          const checked = index === activeIndex;
          return (
            <button
              key={item.id}
              ref={(node) => {
                buttons.current[index] = node;
              }}
              type="button"
              role="radio"
              id={`brief-field-${item.id}`}
              aria-checked={checked}
              tabIndex={checked ? 0 : -1}
              className="instrument__field"
              onClick={() => select(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              <span aria-hidden="true" className="instrument__number figure">
                {item.number}
              </span>
              <span className="instrument__title">{item.title}</span>
              <span className="instrument__prompt">{item.prompt}</span>
            </button>
          );
        })}
      </div>

      <div
        role="region"
        aria-labelledby={`brief-field-${field.id}`}
        className="instrument__panel"
      >
        <div key={field.id} className="instrument__panel-in grid gap-8">
          <div className="instrument__block">
            <p className="utility-label text-signal-on-dark">
              {BRIEF.panelLabels.whenMissing}
            </p>
            <p className="instrument__panel-title text-inverse-fg">
              {field.whenMissing}
            </p>
          </div>

          <div className="instrument__block instrument__block--quiet">
            <p className="utility-label text-signal-on-dark">
              {BRIEF.panelLabels.fromTheWork}
            </p>
            <p className="instrument__copy">{field.fromTheWork}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
