import dayjs from "dayjs";

require("dayjs/locale/en");
dayjs.locale("en");

export const enUs = {
  home: {
    language: "English",
    section: {
      content: "A simple way to create pages made for different locales in Next (with App Directory)!",
      paragraph: <p>
        You can retrieve translations from <span>.json</span>, <span>.ts</span>, or even <span>.tsx</span> files! See more examples at:
      </p>,
      link: "Demonstrations!",
      time: `This was updated in: ${dayjs().format("MMMM D, YYYY - h A")} (server time)!`
    },
    route: {
      link: "Go to another route"
    }
  },
  "another-route": {
    title: "Another route",
    link: "Go back to home"
  }
};