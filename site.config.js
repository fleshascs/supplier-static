const PREFIX = process.env.GH_PAGES ? '/supplier-static' : '';
const domain = process.env.GH_PAGES
  ? 'https://fleshascs.github.io/supplier-static'
  : 'http://localhost:3000';

module.exports = {
  siteName: 'Supplier',
  apiUrl: 'https://cdn.cs-boost.lt',
  domain,
  defaultTitle: 'Supplier',
  defaultDescription: 'supplier',
  basePath: PREFIX
};
