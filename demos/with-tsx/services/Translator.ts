import { enUs } from "../languages/en-us";
import { ptBr } from "../languages/pt-br";
import { Translator } from "next-app-locale";

//important!
export const translator = new Translator<typeof ptBr>({
  "pt-br": ptBr,
  "en-us": enUs
});