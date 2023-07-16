import { translator } from "@/services/Translator";
import style from "./header.module.scss";

export function Header() {
  const content = translator.getContent("home");

  return (
    <header className={style.container}>
      <div>
        <h2>Next App Locale</h2>
        <h1>
          {content.language}
        </h1>
      </div>
    </header>
  );
}