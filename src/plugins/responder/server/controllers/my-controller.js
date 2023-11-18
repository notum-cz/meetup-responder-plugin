'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('responder')
      .service('myService')
      .getWelcomeMessage();
  },
});
