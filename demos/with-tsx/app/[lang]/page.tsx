import styles from './page.module.scss'
import { translator } from '../../services/Translator';
import Link from 'next/link';

export default function Home() {
  const content = translator.getContent("home");

  return (
    <main className={styles.main}>
      <section>
        <q>{content.section.content}</q>
        {content.section.paragraph}
        <a href="https://github.com/L-Marcel/next-app-locale/tree/main/demos">{content.section.link}</a>
        <p>{content.section.time}</p>
        <Link href={translator.getNewLocaleURL("/another-route", translator.getLocale())}>
          {content.route.link}
        </Link>
      </section>
    </main>
  )
}
