import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../data/translations/en.json";
import vi from "../data/translations/vi.json";
import { getItemLS, setItemLS } from "../utils/localStore";
import { KEYS } from "../constants/constants";

const resources = {
  en,
  vi,
};

let language = getItemLS(KEYS.LANGUAGE);

if (!language) {
  language = "en";

  setItemLS(KEYS.LANGUAGE, language);
}

i18n.use(initReactI18next).init({
  resources,
  lng: language,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
