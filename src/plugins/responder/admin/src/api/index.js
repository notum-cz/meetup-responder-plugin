const requestList = {
  getAllResponses: async () => {
    const data = await fetch("/responder/get-responses", { method: "GET" });
    if (data.ok) {
      return data.json();
    }
    throw new Error("Error fetching responses");
  },

  askResponder: async (query) => {
    const data = await fetch("/responder/ask-responder", {
      method: "POST",
      body: JSON.stringify({ data: { query } }),
    });
    if (data.ok) {
      return data.json();
    }
    throw new Error("Error fetching responses");
  },

  deleteResponse: async (id) => {
    const data = await fetch(`/responder/delete-response/${id}`, {
      method: "DELETE",
    });
    if (data.ok) {
      return data.json();
    }
    throw new Error("Error fetching responses");
  },
};

export default requestList;
