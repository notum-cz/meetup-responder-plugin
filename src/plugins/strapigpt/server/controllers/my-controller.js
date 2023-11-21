'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('strapigpt')
      .service('myService')
      .getWelcomeMessage();
  },
});
