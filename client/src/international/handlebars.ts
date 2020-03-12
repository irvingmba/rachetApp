import Handlebars from "handlebars";
import { polyglot } from "./main";

Handlebars.registerPartial("poly",
function(part:string){
  const translate = polyglot.t(
    `${polyglot.locale()}.${part}`
  );
  return translate;
}
);


const template = Handlebars.compile(`{{> poly }}`);

export {template};