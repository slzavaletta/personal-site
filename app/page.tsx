import {
  EnvelopeSimple,
  LinkedinLogo,
  GithubLogo,
  FilePdf,
  ArrowUpRight,
} from "@phosphor-icons/react/dist/ssr";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { LabCard } from "./components/LabCard";
import { WhatIDo } from "./components/WhatIDo";
import { TechStack } from "./components/TechStack";
import { Thesis } from "./components/Thesis";
import { ScopeSentinelDemo } from "./components/ScopeSentinelDemo";
import { Reveal, Stagger, StaggerItem } from "./components/motion/Reveal";
import { CountUp } from "./components/motion/CountUp";
import { DrawRule } from "./components/motion/DrawRule";
import { MarginChart } from "./components/motion/MarginChart";
import { POCStats } from "./components/motion/POCStats";
import { DealBars } from "./components/motion/DealBars";
import { DeliveryMetrics } from "./components/motion/DeliveryMetrics";
import { PROOF, LAB, EXPERIENCE, CASES, INDUSTRIES, CERTS } from "./lib/content";

const SECTION = "mx-auto w-full max-w-[1180px] px-5 sm:px-8";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />

        {/* ---- Proof bar: editorial stat band, count-up, gradient headline metric ---- */}
        <section
          aria-label="Career at a glance"
          className="border-y border-line bg-surface/30"
        >
          <div className={`${SECTION} py-12 sm:py-16`}>
            <Stagger className="grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:gap-y-0">
              {PROOF.map((stat, i) => {
                const isHeadline = stat.kind === "count" && stat.prefix === "+";
                return (
                  <StaggerItem
                    key={stat.label}
                    className="flex flex-col items-center px-4 py-2 text-center lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-l-accent/25"
                  >
                    <span className="font-mono text-xs text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div
                      className={`mt-3 font-mono text-3xl font-semibold tracking-tight xl:text-4xl ${
                        isHeadline ? "text-accent" : "text-text"
                      }`}
                    >
                      {stat.kind === "count" ? (
                        <CountUp
                          value={stat.value}
                          prefix={stat.prefix ?? ""}
                          suffix={stat.suffix ?? ""}
                        />
                      ) : (
                        stat.display
                      )}
                    </div>
                    <span className="mt-2 text-sm text-muted">{stat.label}</span>
                  </StaggerItem>
                );
              })}
            </Stagger>
            <DrawRule className="mt-10" />
          </div>
        </section>

        {/* ---- Thesis line: weighty secondary statement, subordinate to the hero ---- */}
        <section className={`${SECTION} py-20 sm:py-28`}>
          <Thesis />
        </section>

        {/* ---- What I do: dual structure, lead | build (the positioning) ---- */}
        <section className={`${SECTION} pt-8 pb-20 sm:pt-10 sm:pb-28`}>
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              What I do
            </h2>
          </Reveal>
          <WhatIDo />
        </section>

        {/* ---- Where I'm heading: designed two-column composition, before the Lab ---- */}
        <section className={`${SECTION} py-16 sm:py-24`}>
          <Reveal>
            <p className="font-mono text-sm uppercase tracking-[0.14em] text-muted">
              Where I&apos;m heading
            </p>
          </Reveal>
          <div className="mt-8 grid gap-10 md:grid-cols-12 md:gap-12">
            <Reveal className="md:col-span-5">
              <p className="font-mono text-sm text-muted">
                The goal isn&apos;t to stop being a PM.
              </p>
              <p className="mt-4 text-3xl font-semibold leading-[1.12] tracking-tight text-text sm:text-4xl">
                It&apos;s to be the AI PM who can{" "}
                <span className="text-gradient-builds">prototype the thing</span>
                , not just scope it.
              </p>
            </Reveal>
            <Reveal
              delay={0.08}
              className="md:col-span-6 md:col-start-7 md:border-l md:border-line md:pl-12"
            >
              <p className="max-w-[60ch] text-[17px] leading-relaxed text-muted">
                The lines between product, engineering, and delivery are
                dissolving, and I&apos;m leaning into that on purpose. I&apos;m
                moving from coordinating builders to building alongside them:
                earning the Claude Certified Architect credential, shipping
                agentic skills, and running the Python, Docker, and automation
                behind my own delivery work.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ---- Lab: built things, bento, featured get priority ---- */}
        <section id="lab" className={`${SECTION} scroll-mt-20 py-20 sm:py-28`}>
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Built things
            </h2>
            <p className="mt-3 text-muted lg:whitespace-nowrap">
              Proof of the wedge: the agentic skills, infrastructure, and
              automation I ship, not just scope.
            </p>
          </Reveal>
          <Stagger
            className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-12"
            amount={0.1}
          >
            {/* Featured pair on top, standard trio below; no orphaned cell */}
            <StaggerItem className="md:col-span-7">
              <LabCard card={LAB[0]} />
            </StaggerItem>
            <StaggerItem className="md:col-span-5">
              <LabCard card={LAB[1]} />
            </StaggerItem>
            <StaggerItem className="md:col-span-4">
              <LabCard card={LAB[2]} />
            </StaggerItem>
            <StaggerItem className="md:col-span-4">
              <LabCard card={LAB[3]} />
            </StaggerItem>
            <StaggerItem className="md:col-span-4">
              <LabCard card={LAB[4]} />
            </StaggerItem>
          </Stagger>
        </section>

        {/* ---- Scope Sentinel, interactive: live proof of the Lab card ---- */}
        <section
          id="scope-sentinel"
          className={`${SECTION} scroll-mt-20 py-20 sm:py-28`}
        >
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Scope Sentinel, interactive
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              A walkthrough with sample data - pick a client request and see how
              the skill classifies it against a fixed-price SOW. The skill itself
              runs inside Claude on real documents.
            </p>
          </Reveal>
          <ScopeSentinelDemo />
        </section>

        {/* ---- Selected work: depth, 3 case studies, P/A/R ---- */}
        <section id="work" className={`${SECTION} scroll-mt-20 py-20 sm:py-28`}>
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Selected work
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              Three deep dives. Problem, action, result, with the numbers that
              moved.
            </p>
          </Reveal>

          <div className="mt-14 flex flex-col gap-16">
            {CASES.map((c) => (
              <Reveal key={c.title} as="article">
                <div className="grid gap-8 border-t border-line pt-10 md:grid-cols-12 md:gap-10">
                  <div className="md:col-span-7">
                    <h3 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
                      {c.title}
                    </h3>
                    <p className="mt-2 font-mono text-sm text-muted">
                      {c.meta}
                    </p>

                    <dl className="mt-8 space-y-6">
                      <div>
                        <dt className="font-mono text-xs text-faint">
                          Problem
                        </dt>
                        <dd className="mt-2 text-[15px] leading-relaxed text-muted">
                          {c.problem}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-mono text-xs text-faint">
                          Action
                        </dt>
                        <dd className="mt-2 text-[15px] leading-relaxed text-muted">
                          {c.action}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="md:col-span-5">
                    <div className="hover-glow rounded-[var(--radius)] border border-line bg-surface/40 p-6 sm:p-7">
                      <p className="font-mono text-xs text-accent">Result</p>
                      <p className="mt-3 text-[15px] leading-relaxed text-text">
                        {c.result}
                      </p>
                    </div>
                    <div className="mt-5">
                      {c.viz === "margin" && <MarginChart />}
                      {c.viz === "poc" && <POCStats />}
                      {c.viz === "deals" && <DealBars />}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---- Experience: breadth, scannable timeline ---- */}
        <section
          id="experience"
          className={`${SECTION} scroll-mt-20 py-16 sm:py-24`}
        >
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Experience
            </h2>
          </Reveal>
          <Stagger className="mt-10 border-t border-line">
            {EXPERIENCE.map((role) => (
              <StaggerItem key={role.company + role.period}>
                <div className="grid gap-2 border-b border-line py-6 md:grid-cols-12 md:gap-6">
                  <div className="font-mono text-sm text-muted md:col-span-3">
                    {role.period}
                  </div>
                  <div className="md:col-span-4">
                    <div className="font-semibold tracking-tight text-text">
                      {role.company}
                    </div>
                    <div className="text-sm text-muted">{role.title}</div>
                  </div>
                  <p className="text-[15px] leading-relaxed text-muted md:col-span-5">
                    {role.impact}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* ---- Delivery metrics: draw-on-scroll rings + tolerance band ---- */}
        <section className={`${SECTION} py-16 sm:py-24`}>
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Delivery metrics
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              Owner-approved and rounded. Representative of how programs run, not
              a single quarter.
            </p>
          </Reveal>
          <DeliveryMetrics />
        </section>

        {/* ---- Tech stack: grouped, logo chips, consistent treatment ---- */}
        <section className={`${SECTION} py-20 sm:py-28`}>
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Tech stack
            </h2>
          </Reveal>
          <TechStack />
        </section>

        {/* ---- Industries: cohesive tag cluster ---- */}
        <section className={`${SECTION} py-16 sm:py-20`}>
          <div className="flex flex-col gap-6 md:flex-row md:items-baseline md:gap-12">
            <Reveal>
              <h2 className="shrink-0 text-2xl font-semibold tracking-tight sm:text-3xl">
                Industries
              </h2>
            </Reveal>
            <Stagger as="ul" className="flex flex-wrap gap-2.5" amount={0.1}>
              {INDUSTRIES.map((ind) => (
                <StaggerItem
                  as="li"
                  key={ind}
                  className="rounded-full border border-line bg-surface/50 px-4 py-2 font-mono text-sm text-muted transition-colors duration-150 hover:border-accent/40 hover:text-text"
                >
                  {ind}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ---- Certifications ---- */}
        <section className={`${SECTION} py-16 sm:py-20`}>
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Certifications
            </h2>
          </Reveal>
          <Stagger className="mt-8 grid gap-4 sm:grid-cols-3">
            {CERTS.map((cert) => {
              const inProgress = cert.body === "in progress";
              return (
                <StaggerItem
                  key={cert.name}
                  className="rounded-[var(--radius)] border border-line bg-surface/30 p-5"
                >
                  <div className="font-medium tracking-tight text-text">
                    {cert.name}
                  </div>
                  <div
                    className={`mt-1 font-mono text-sm ${
                      inProgress ? "text-accent" : "text-muted"
                    }`}
                  >
                    {cert.body}
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </section>

        {/* ---- Closing: About + Get in touch, fused as the finale ---- */}
        <section
          id="contact"
          className="scroll-mt-20 border-t border-line bg-surface/30"
        >
          <div className={`${SECTION} py-20 sm:py-28`}>
            <div className="grid items-start gap-12 md:grid-cols-12 md:gap-16">
              {/* About: weighted closing statement */}
              <div className="md:col-span-7">
                <Reveal>
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    About me
                  </h2>
                </Reveal>
                <Reveal delay={0.06}>
                  <p className="mt-5 text-lg font-medium leading-snug text-text sm:text-xl">
                    Half manager, half builder. The half that builds is the part
                    most PMs outsource.
                  </p>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="mt-7 max-w-[60ch] space-y-5 text-[17px] leading-relaxed text-muted">
                    <p>
                      I started in IT infrastructure as a System Administrator
                      and Technical Project Lead, running enterprise middleware
                      and UNIX-to-Windows migrations before I ever ran a sprint.
                      That foundation is why I don&apos;t just coordinate
                      engineers; I build alongside them.
                    </p>
                    <p>
                      Over 10+ years I&apos;ve led delivery across Life Sciences,
                      Oil &amp; Gas, Gaming, Hospitality, M&amp;A, and AI, on
                      programs from $700k to $5M. Today I lead AI delivery at
                      Globant and build the agentic tooling and infrastructure
                      that makes delivery faster.
                    </p>
                  </div>
                </Reveal>
              </div>

              {/* Get in touch: the action, top-aligned with About me */}
              <div className="md:col-span-5 md:border-l md:border-line md:pl-12">
                <Reveal>
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Get in touch
                  </h2>
                  <p className="mt-3 text-muted">
                    The fastest way to reach me is email or LinkedIn. I read
                    everything.
                  </p>
                </Reveal>

                <Reveal delay={0.08} className="mt-8 flex flex-col gap-4">
                  <a
                    href="https://www.linkedin.com/in/slzavaletta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex w-fit items-center gap-3 rounded-md bg-accent px-6 py-3 text-base font-medium text-bg transition-colors duration-150 hover:bg-accent-soft"
                  >
                    <LinkedinLogo
                      weight="fill"
                      className="size-5"
                      aria-hidden="true"
                    />
                    Connect on LinkedIn
                    <ArrowUpRight
                      weight="bold"
                      className="size-4"
                      aria-hidden="true"
                    />
                  </a>

                  <div className="flex flex-col gap-3 pt-2">
                    <a
                      href="mailto:santiago@slzavaletta.com"
                      className="group inline-flex w-fit items-center gap-2.5 text-text transition-colors duration-150 hover:text-accent"
                    >
                      <EnvelopeSimple
                        weight="regular"
                        className="size-5 text-muted transition-colors duration-150 group-hover:text-accent"
                        aria-hidden="true"
                      />
                      santiago@slzavaletta.com
                    </a>
                    <a
                      href="https://github.com/slzavaletta"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex w-fit items-center gap-2.5 text-text transition-colors duration-150 hover:text-accent"
                    >
                      <GithubLogo
                        weight="regular"
                        className="size-5 text-muted transition-colors duration-150 group-hover:text-accent"
                        aria-hidden="true"
                      />
                      github.com/slzavaletta
                    </a>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>

          <footer className="border-t border-line">
            <div
              className={`${SECTION} flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between`}
            >
              <p className="font-mono text-sm text-faint">
                Santiago López Zavaletta · Senior AI Project Manager
              </p>
              <a
                href="/SantiagoLopezZavaletta_CV.pdf"
                download
                className="inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors duration-150 hover:text-text"
              >
                <FilePdf weight="regular" className="size-4" aria-hidden="true" />
                CV (PDF)
              </a>
            </div>
          </footer>
        </section>
      </main>
    </>
  );
}
