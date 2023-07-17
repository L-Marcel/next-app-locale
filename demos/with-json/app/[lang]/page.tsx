import Link from 'next/link';
import styles from './page.module.scss'
import { translator } from '@/services/Translator';

export default function Home() {
  const content = translator.getContent("home");

  return (
    <main className={styles.main}>
      <section>
        <Link href={translator.getNewLocaleURL("/another-route")}>
          {content.route.link}
        </Link>
        <q>{content.section.content}</q>
        <p>{content.section.paragraph}</p>
        <a href="https://github.com/L-Marcel/next-app-locale/tree/main/demos">{content.section.link}</a>
      </section>
    </main>
  )
}
