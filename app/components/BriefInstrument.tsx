"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import { BRIEF } from "@/app/lib/content";

import { DeliveryAssembly } from "@/app/components/DeliveryAssembly";

const FIELDS = BRIEF.fields;

/**
 * The pilot decision brief as a document. The five fields are a radio group
 * — one is always selected, arrow keys move the selection, Home and End
 * jump — and the selected field expands in place: what tends to go wrong
 * when it is left blank, and where the habit came from.
 *
 * Server HTML carries every field and panel. Hydration enhances selection;
 * a reader without JavaScript can read all five without operating a control.
 */
export function BriefInstrument() {
  const [activeIndex, setActiveIndex] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => {
    setEnhanced(true);
  }, []);

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
    <div className="instrument" data-enhanced={enhanced}>
      <div className="instrument__visual">
        <DeliveryAssembly field={activeIndex} compact />
      </div>
      <div
        role="radiogroup"
        aria-label="Fields of the brief"
        className="instrument__fields"
      >
        {FIELDS.map((item, index) => {
          const checked = index === activeIndex;
          return (
            <div key={item.id}>
              <button
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
                <span className="instrument__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="instrument__title">{item.title}</span>
                <span className="instrument__prompt">{item.prompt}</span>
              </button>

              {
                <div
                  role="region"
                  aria-labelledby={`brief-field-${item.id}`}
                  className="instrument__panel"
                  hidden={enhanced && !checked}
                >
                  <div className="instrument__block">
                    <p className="utility-label">
                      {BRIEF.panelLabels.whenMissing}
                    </p>
                    <p className="instrument__copy">{item.whenMissing}</p>
                  </div>
                  <div className="instrument__block">
                    <p className="utility-label">
                      {BRIEF.panelLabels.fromTheWork}
                    </p>
                    <p className="instrument__copy">{item.fromTheWork}</p>
                  </div>
                </div>
              }
            </div>
          );
        })}
      </div>
    </div>
  );
}
