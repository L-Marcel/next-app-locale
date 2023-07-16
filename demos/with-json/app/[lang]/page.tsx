import styles from './page.module.scss'
import { translator } from '@/services/Translator';

export default function Home() {
  const content = translator.getContent("home");

  return (
    <main className={styles.main}>
      <section>
        <q>{content.section.content}</q>
        <p>{content.section.paragraph}</p>
        <a href="">{content.section.link}</a>
      </section>
    </main>
  )
}
