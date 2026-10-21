import styles from "./loading.module.css"

export default function LoadingAnimation() {
  return (
    <div className={styles.overlay} role="status" aria-live="polite" aria-busy="true">
      <div className={styles.content}>
        <div className={styles.wordmark} aria-hidden="true">VersaNex</div>
        <div className={styles.track} aria-hidden="true"><span className={styles.sweep} /></div>
        <p className={styles.message}>Loading</p>
        <span className={styles.srOnly}>VersaNex is loading. Please wait.</span>
      </div>
    </div>
  )
}
