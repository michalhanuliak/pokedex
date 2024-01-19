'use client'
import styles from './styles.module.scss'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <section className={styles.notFound}>
      <h1>Something went wrong</h1>
      <div>
        <p className={styles.notFoundButton} onClick={() => reset()}>
          Try again
        </p>
      </div>
    </section>
  )
}
