import Link from 'next/link'
import styles from './styles.module.scss'

export default function NotFound() {
  return (
    <section className={styles.notFound}>
      <h1>Not found – 404!</h1>
      <div>
        <Link href="/" className={styles.notFoundButton}>
          Go back to Home
        </Link>
      </div>
    </section>
  )
}
