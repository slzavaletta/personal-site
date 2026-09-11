"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CASE_STUDIES, WORK_INTRO } from "@/app/lib/content";
import { mapGeometry, type MapGeometry } from "@/app/lib/map-geometry";
import type { MapController } from "./scene/map";

const staticRoutes = [
  "M 202 219 C 202 360 274 433 344 433",
  "M 610 162 C 610 200 430 200 430 249 L 430 355 C 430 380 433 383 433 402",
  "M 645 362 C 829 374 829 433 539 433",
];

export function DeploymentMap() {
  const [selected, setSelected] = useState(0);
  const [layout, setLayout] = useState<"map" | "list">("map");
  const [enhanced, setEnhanced] = useState(false);
  const [ready, setReady] = useState(false);
  const [geometry, setGeometry] = useState<MapGeometry | null>(null);
  const graph = useRef<HTMLDivElement>(null),
    canvas = useRef<HTMLDivElement>(null);
  const controller = useRef<MapController | null>(null);
  const state = useRef({ geometry, selected });

  useEffect(() => {
    setEnhanced(true);
  }, []);
  useEffect(() => {
    state.current = { geometry, selected };
    if (geometry) controller.current?.update(geometry, selected);
  }, [geometry, selected]);

  useEffect(() => {
    const el = graph.current;
    if (!el || layout === "list") return;
    let live = true;
    const measure = () => {
      if (!live) return;
      const g = el.getBoundingClientRect();
      const rect = (e: Element) => {
        const r = e.getBoundingClientRect();
        return {
          x: r.left - g.left,
          y: r.top - g.top,
          width: r.width,
          height: r.height,
        };
      };
      const nodes = [...el.querySelectorAll(".map-node")].map(rect);
      const hub = el.querySelector(".map-hub");
      if (hub && g.width && nodes.length === 3)
        setGeometry(mapGeometry(g.width, g.height, nodes, rect(hub)));
    };
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    el.querySelectorAll(".map-node,.map-hub").forEach((node) =>
      observer.observe(node),
    );
    void document.fonts.ready.then(measure);
    measure();
    return () => {
      live = false;
      observer.disconnect();
    };
  }, [layout]);

  useEffect(() => {
    const el = canvas.current;
    if (!el || layout !== "map" || !window.IntersectionObserver) return;
    const motion = matchMedia("(prefers-reduced-motion: no-preference)");
    const desktop = matchMedia("(min-width: 768px) and (pointer: fine)");
    const connection = (
      navigator as Navigator & {
        connection?: EventTarget & { saveData?: boolean };
      }
    ).connection;
    let visible = false,
      disposed = false,
      failed = false,
      ticket = 0;
    const stop = () => {
      ticket++;
      controller.current?.dispose();
      controller.current = null;
      if (!disposed) setReady(false);
    };
    const sync = async () => {
      stop();
      if (
        disposed ||
        failed ||
        !visible ||
        document.hidden ||
        !motion.matches ||
        !desktop.matches ||
        connection?.saveData
      )
        return;
      const generation = ticket;
      try {
        const { createMapScene } = await import("./scene/map");
        if (disposed || generation !== ticket || !state.current.geometry)
          return;
        controller.current = createMapScene(
          el,
          state.current.geometry,
          state.current.selected,
          () => {
            failed = true;
            stop();
          },
        );
        setReady(true);
      } catch {
        failed = true;
        stop();
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        void sync();
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    motion.addEventListener("change", sync);
    desktop.addEventListener("change", sync);
    connection?.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      disposed = true;
      stop();
      observer.disconnect();
      motion.removeEventListener("change", sync);
      desktop.removeEventListener("change", sync);
      connection?.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [layout]);

  return (
    <div
      className="deployment-map"
      data-layout={layout}
      data-enhanced={enhanced}
    >
      <div className="map-toolbar">
        <h2 id="work-heading" className="eyebrow">
          {WORK_INTRO.heading}
        </h2>
        <div
          role="group"
          aria-label="Project layout"
          hidden={!enhanced}
          className="map-layout"
        >
          <button
            type="button"
            onClick={() => setLayout("map")}
            aria-pressed={layout === "map"}
          >
            Map view
          </button>
          <button
            type="button"
            onClick={() => setLayout("list")}
            aria-pressed={layout === "list"}
          >
            List view
          </button>
        </div>
      </div>
      <div className="map-explorer">
        <div
          ref={graph}
          className="map-graph"
          data-ready={ready}
          role="group"
          aria-label="Projects connected by delivery governance"
        >
          <svg
            className="map-edges"
            viewBox={
              geometry
                ? `0 0 ${geometry.width} ${geometry.height}`
                : "0 0 860 510"
            }
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            {(geometry
              ? geometry.routes.map((route) => route.d)
              : staticRoutes
            ).map((d, i) => (
              <path key={i} d={d} data-active={i === selected} />
            ))}
          </svg>
          <div ref={canvas} className="map-canvas" aria-hidden="true" />
          {CASE_STUDIES.map((item, i) => (
            <div className={"map-node map-node--" + i} key={item.id}>
              {enhanced ? (
                <button
                  type="button"
                  aria-pressed={selected === i}
                  aria-controls={"selected-" + item.id}
                  onClick={() => setSelected(i)}
                >
                  <span>{item.mapLabel}</span>
                  <span aria-hidden="true">↗</span>
                </button>
              ) : (
                <Link href={"/work/" + item.id}>
                  <span>{item.mapLabel}</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              )}
              <p>{item.mapCaption}</p>
            </div>
          ))}
          <p className="map-hub">Delivery governance</p>
        </div>
        <div className="map-details" aria-live={enhanced ? "polite" : "off"}>
          {CASE_STUDIES.map((item, i) => (
            <article
              className="map-detail"
              key={item.id}
              id={"selected-" + item.id}
              hidden={enhanced && selected !== i}
            >
              <p className="eyebrow">{item.label}</p>
              <h3>{item.title}</h3>
              <p>{item.constraint}</p>
              <p className="map-period">{item.period}</p>
              <Link href={"/work/" + item.id} className="action">
                Open case ↗<span className="sr-only">: {item.label}</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
