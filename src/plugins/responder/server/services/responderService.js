"use strict";

const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

module.exports = ({ strapi }) => ({
  ask: async (body) => {
    const parsed = JSON.parse(body);
    const { data } = parsed;
    if (!data.query || data.query.length < 5) {
      return;
    }
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: data.query }],
      model: "gpt-3.5-turbo",
    });
    if (chatCompletion.choices.length > 0) {
      await strapi.entityService.create("plugin::responder.response", {
        data: {
          query: data.query,
          response: chatCompletion.choices[0].message.content,
        },
      });
    }
    return chatCompletion;
  },

  getAll: async (query) => {
    return await strapi.entityService.findMany(
      "plugin::responder.response",
      query
    );
  },

  deleteById: async (id) => {
    return await strapi.entityService.delete("plugin::responder.response", id);
  },
});
