/*
* Used to provide internationalization
*/

import * as Localization from 'expo-localization';
import { I18n } from "i18n-js";

//Files which contain the translations
import en from '../weather_languages/en.json';
import pt from '../weather_languages/pt.json';


//Set the key-value pairs for the different languages you want to support.
const i18n = new I18n ({
  en,
  pt,
});

// Set the default locale;
i18n.defaultLocale = 'pt'

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;

export default i18n;