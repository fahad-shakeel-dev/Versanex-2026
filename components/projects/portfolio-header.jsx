"use client"
import { LayoutGrid, List } from "lucide-react"
import styles from "./projects-gallery.module.css"

export const projectCategories = [
  { key: "All", label: "All" },
  { key: "website-developing", label: "Web Design" },
  { key: "mobile-app-development", label: "Mobile Apps" },
  // { key: "ui-ux", label: "UX/UI" },
]

export default function PortfolioHeader({ activeFilter, onFilterChange, view, onViewChange }) {
  return (
    <header>
      <div className={styles.toolbar}>
        <h2 id="projects-heading" className={styles.label}>Our projects</h2>
        <div className={styles.views} role="group" aria-label="Project layout">
          {[{ key: "grid", Icon: LayoutGrid }, { key: "list", Icon: List }].map(({ key, Icon }) => (
            <button key={key} type="button" onClick={() => onViewChange(key)}
              className={styles.viewButton} aria-label={`${key === "grid" ? "Grid" : "List"} view`}
              aria-pressed={view === key}>
              <Icon size={23} strokeWidth={1.7} aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
      <nav className={styles.filters} aria-label="Filter projects by category">
        {projectCategories.map(({ key, label }) => (
          <button key={key} type="button" aria-pressed={activeFilter === key}
            onClick={() => onFilterChange(key)} className={styles.filter}>{label}</button>
        ))}
      </nav>
    </header>
  )
}
