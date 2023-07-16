import './globals.css';
import { Header } from '@/components/Header';
import { Roboto } from "next/font/google";
import { translator } from '@/services/Translator';
import { LocaleSwitcher } from '../../components/LocaleSwitcher/index';

const roboto = Roboto({ 
  subsets: ['latin'],
  style: ['italic', 'normal'],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
  variable: "--font-roboto"
});

//important!
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
  //important!
  translator.setLocale(lang);

  return (
    <html 
      className={roboto.className} 
      lang={lang}
    >
      <body>
        <Header/>
        <LocaleSwitcher lang={lang}/>
        {children}
      </body>
    </html>
  )
};

export const metadata = {
  title: 'Next App Locale',
  description: 'Simple locale library to use in Next with the app directory.',
};