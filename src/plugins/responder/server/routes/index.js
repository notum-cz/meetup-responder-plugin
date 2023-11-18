module.exports = [
  {
    method: "GET",
    path: "/",
    handler: "myController.index",
    config: {
      policies: [],
    },
  },
  {
    method: "POST",
    path: "/ask-responder",
    handler: "responderController.ask",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/get-responses",
    handler: "responderController.getAll",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "DELETE",
    path: "/delete-response/:id",
    handler: "responderController.deleteById",
    config: {
      policies: [],
      auth: false,
    },
  },
];
