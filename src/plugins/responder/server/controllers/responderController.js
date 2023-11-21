"use strict";

module.exports = ({ strapi }) => ({
  async ask(ctx) {
    try {
      ctx.body = await strapi
        .plugin("responder")
        .service("responderService")
        .ask(ctx.request.body);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async getAll(ctx) {
    try {
      ctx.body = await strapi
        .plugin("responder")
        .service("responderService")
        .getAll(ctx.query);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async deleteById(ctx) {
    try {
      ctx.body = await strapi
        .plugin("responder")
        .service("responderService")
        .deleteById(ctx.params.id);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
});
