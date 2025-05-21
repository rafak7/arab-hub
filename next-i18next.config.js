module.exports = {
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en', 'ar'],
    localeDetection: false,
  },
  localePath: './public/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};