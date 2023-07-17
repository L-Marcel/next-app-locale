export class Translator<Schema> {
  private _locale: string;
  private _locales: string[];
  private _defaultLocale: string;

  constructor(
    private _sources: {
      [key: string]: Schema
    }
  ){
    let sources = Object.keys(this._sources);
    this._locales = sources;
    this._defaultLocale = sources[0];
    this._locale = this._defaultLocale;
  };

  setLocale(newLocale: string) {
    this._locale = newLocale;
  };

  getContent<T extends keyof Schema>(
    section: T
  ): Schema[T] {

    const source = Object.entries(this._sources).find(
      ([source]) => source.toLocaleLowerCase() === this._locale.toLowerCase()
    );

    if(!source) {
      return this._sources[this._defaultLocale][section];
    };

    return source[1][section];
  };

  getLocales() {
    return this._locales;
  };

  getLocale() {
    return this._locale;
  };

  isLocale(_locale: string) {
    return this._locale === _locale;
  };

  getSources() {
    return this._sources;
  };

  middleware(request: {
    url: string,
    nextUrl: {
      pathname: string
    }
  }) {
    const pathname = request.nextUrl.pathname.toLowerCase();
    const isMissingLocale = this._locales.every(
      (locale) => 
        !pathname.startsWith(`/${locale.toLowerCase()}/`) 
        && pathname !== `/${locale.toLowerCase()}`
    );

    if(isMissingLocale) {
      return new URL(`/${this._defaultLocale}/${pathname}`, request.url);
    }

    return false;
  };

  getNewLocaleURL(pathname: string, locale: string = this._locale) {
    if(!pathname) {
      return "/";
    }

    const segments = pathname.split("/");

    if(this._locales.includes(segments[1])){
      return [
        segments[0],
        locale,
        ...segments.slice(2)
      ].join("/");
    };

    return [
      segments[0],
      locale,
      ...segments.slice(1)
    ].join("/");
  };
};