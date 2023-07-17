"use client";
import Link from "next/link";
import style from "./switcher.module.scss";
import { usePathname } from "next/navigation";
import { translator } from "@/services/Translator";

export function LocaleSwitcher({
  lang
}: {
  lang: string
}) {
  const pathname = usePathname();

  //is not a hook!
  //const isPtBr = translator.isLocale("pt-br");

  //can refresh!
  const isPtBr = lang === "pt-br";

  return (
    <ul 
      className={style.button_group}
    >
      <li>
        <Link
          id="pt-br"
          tabIndex={isPtBr? -1:0}
          href={translator.getNewLocaleURL(pathname, "pt-br")}
        >
          <button 
            tabIndex={-1} 
            className={style.button}
            disabled={isPtBr}
          >
            Português
          </button>
        </Link>
      </li>
      <li>
        <Link 
          id="en-us"
          href={translator.getNewLocaleURL(pathname, "en-us")}
          tabIndex={isPtBr? 0:-1}
        >
          <button 
            tabIndex={-1} 
            disabled={!isPtBr}  
            className={style.button}
          >
            English
          </button>
        </Link>
      </li>
    </ul>
  );
};