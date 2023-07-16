import { Translator } from "next-app-locale";
import ptBr from "@/languages/pt-br.json";
import enUs from "@/languages/en-us.json";

//important!
export const translator = new Translator<typeof ptBr>({
  "pt-br": ptBr,
  "en-us": enUs
});