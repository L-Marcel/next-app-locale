A simple way to create pages made for different locales in Next (with App Directory)!

# Summary
- [Installation](#installation)
- [Configuration](#configuration)
  - [Language schema](#language-schema)
  - [Final settings](#final-settings)
- [Changing the locale](#changing-the-locale)
- [Demonstrations](#demonstrations)

# Installation
```bash
pnpm add next-app-locale
```
or
```bash
npm install next-app-locale
```
or
```bash
yarn add next-app-locale
```

# Configuration
Create an instance of the Translator class in, for example `services/Translator.ts`:
```tsx
import { Translator } from "next-app-locale";
import { ptBr } from "../languages/pt-br"; //It can be .json, .tsx, .ts, etc.
import { enUs } from "../languages/en-us";

//The first location is the default locale!
export const translator = new Translator<typeof ptBr>({
  "pt-br": ptBr, //But ptBr and enUs, for example, must be an object!
  "en-us": enUs //Keep the locale object's keys in lower case! (ex: pt-br, fr, en)
});
```

## Language schema
See an example file `languages/en-us.json`:
```json
{
  "home": {
    "main": {
      "title": "Hello world!",
      "paragraph": "EXAMPLE 01",
      "date": "2023/07/16"
    }
  },
}
```
And `languages/en-us.tsx` using `dayjs` library:
```tsx
import dayjs from "dayjs";

require("dayjs/locale/en");
dayjs.locale("en");

export const enUs = {
  home: {
    main: {
      title: "Hello world!",
      paragraph: <>
        EXAMPLE <strong>01</strong>
      </>,
      date: `Today is: ${dayjs().format("MMMM D, YYYY - h A")}!`
    }
  }
};
```

## Final settings
Out of any other folder like `src` or `app` create a `middleware.ts`:
```tsx
import { NextRequest, NextResponse } from 'next/server';
import { translator } from './services/Translator';

export async function middleware(request: NextRequest) {
  const redirectURL = translator.middleware(request);

  if(redirectURL) {
    //Will redirect if needed to default locale
    return NextResponse.redirect(redirectURL);
  };

  return NextResponse.next();
};

//Important!
export const config = {
  matcher: [
    '/((?!_next).*)'
  ]
};
```
Now, in `app/[lang]/layout.tsx`:
```tsx
import { translator } from '../../services/Translator';

//Important!
export async function generateStaticParams() {
  return translator.getLocales().map((lng) => ({ lng }));
};

export default function RootLayout({
  children,
  params: {
    lang
  }
}: {
  children: React.ReactNode;
  params: { 
    lang: string;
  };
}) {
  //Will set the locale!
  translator.setLocale(lang);

  return (
    <html lang={lang}>
      <body>
        {children}
      </body>
    </html>
  )
};
```
This way, you can use it on your other pages inside `app\[lang]` without passing any parameters. For example, in `app\[lang]\page.tsx`:
```tsx
import { translator } from '../../services/Translator';

export default function Home() {
  const content = translator.getContent("home");

  //The variable content is strongly typed!
  return (
    <main>
      <h1>
        {content.main.title}
      </h1>
      <p>{content.main.paragraph}</p>
      <p>{content.main.date}</p>
    </main>
  )
}
```

# Changing the locale
To change the locale, first create a component that takes lang as a parameter that is received in the layout (which is also passed to the page as a parameter, although it is not used in these examples) in the following template:
```tsx
"use client"; //Important!
import Link from "next/link";
import { usePathname } from "next/navigation";
import { translator } from "@/services/Translator";

export function LocaleSwitcher({
  lang
}: {
  lang: string
}) {
  const content = translator.getContent("header");
  const pathname = usePathname();

  //is not a hook!
  //const isPtBr = translator.isLocale("pt-br");

  //can refresh!
  const isPtBr = lang === "pt-br";

  //So actually you will only need to pass the lang parameter if you want to update the component state after the route change!

  return (
    <ul>
      <li>
        <Link
          id="pt-br"
          tabIndex={isPtBr? -1:0}
          href={translator.getNewLocaleURL(pathname, "pt-br")}
        >
          <button 
            tabIndex={-1} 
            disabled={isPtBr}
          >
            {content.pt}
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
          >
            {content.en}
          </button>
        </Link>
      </li>
    </ul>
  );
};
```
You can place this component in the `app/[lang]/layout.tsx` itself:
```tsx
import { LocaleSwitcher } from "../../components/LocaleSwitcher";
import { translator } from '../../services/Translator';

//Important!
export async function generateStaticParams() {
  return translator.getLocales().map((lng) => ({ lng }));
};

export default function RootLayout({
  children,
  params: {
    lang
  }
}: {
  children: React.ReactNode;
  params: { 
    lang: string;
  };
}) {
  //Will set the locale!
  translator.setLocale(lang);

  return (
    <html lang={lang}>
      <header>
        <LocaleSwitcher lang={lang}/>
      </header>
      <body>
        {children}
      </body>
    </html>
  )
};
```

# Demonstrations
See some demos:
- [with-json](#) / [code](#https://github.com/L-Marcel/next-app-locale/tree/main/demos/with-json)
- [with-tsx](#) / [code](#https://github.com/L-Marcel/next-app-locale/tree/main/demos/with-tsx)