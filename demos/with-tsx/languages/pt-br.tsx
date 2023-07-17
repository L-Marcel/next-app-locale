import dayjs from "dayjs";

require("dayjs/locale/pt-br");
dayjs.locale("pt-br");

export const ptBr = {
  home: {
    language: "Português",
    section: {
      content: "Uma forma simples de criar páginas feitas para localidades diferentes no Next (com o diretório App)!",
      paragraph: <p>
        Você pode recuperar traduções de arquivos <span>.json</span>, <span>.ts</span>, ou até <span>.tsx</span>! Veja mais exemplos em:
      </p>,
      link: "Demonstrações!",
      time: `Isso foi atualizado em: ${dayjs().format("D [de] MMMM [de] YYYY - H [horas]")} (horário do servidor)!`
    },
    route: {
      link: "Ir para outra rota"
    }
  },
  "another-route": {
    title: "Outra rota",
    link: "Voltar para a página inicial"
  }
};