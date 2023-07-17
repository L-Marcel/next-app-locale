import styles from './page.module.scss'
import { translator } from '../../../services/Translator';
import Link from 'next/link';

export default function Home() {
  const content = translator.getContent("another-route");

  return (
    <main className={styles.main}>
      <section>
        <h1>{content.title}</h1>
        <Link
          href={translator.getNewLocaleURL("/", translator.getLocale())}
        >{content.link}</Link>
      </section>
    </main>
  )
}
