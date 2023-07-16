import dayjs from "dayjs";

require("dayjs/locale/en");
dayjs.locale("en");

export const enUs = {
  home: {
    language: "English",
    section: {
      content: "A simple way to create pages made for different locales in Next (with App Directory)!",
      paragraph: <p>
        You can retrieve translations from <span>.json</span>, <span>.ts</span>, or even <span>.tsx</span> files! See more examples at:,
      </p>,
      link: "Demonstrations!",
      time: `Today is: ${dayjs().format("MMMM D, YYYY - h A")}!`
    }
  },
  header: {
    pt: "Português",
    en: "English"
  }
};