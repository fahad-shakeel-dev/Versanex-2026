"use client"

import styles from "./projects-hero.module.css"

export default function ProjectsHero() {
  function scrollToProjects(event) {
    event.preventDefault()
    document.getElementById("projects").scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    })
  }

  return (
    <section className={styles.hero} aria-labelledby="projects-hero-heading">
      <h1 id="projects-hero-heading" className={styles.heading}>
        <span>20+ projects by VersaNex. AI,</span>{" "}
        <span>enterprise tech, and corporate</span>{" "}
        <span>brands at turning points.</span>
      </h1>
      <p className={styles.description}>
        Every project had a business reason behind it. Here’s what we built.
      </p>
      <a
        href="#projects"
        onClick={scrollToProjects}
        className={styles.arrow}
        aria-label="Explore our projects"
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M16 5v22M6 17l10 10 10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  )
}
