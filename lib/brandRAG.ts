export const brandRAG = {
  search: async (query: string, businessId: string) => {
    console.log('brandRAG search for business', businessId)
    // Use groq via Ollama for search with model "llama-3.1-8b-instant"
    const endpoint = process.env.OLLAMA_URL;
    if (!endpoint) {
      throw new Error("Missing OLLAMA_URL environment variable");
    }
    if (!endpoint) {
      throw new Error("Missing OLLAMA_URL environment variable");
    }
    const payload = {
      groq: "search",
      query,
      model: "llama-3.1-8b-instant"
    };
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      throw new Error("Ollama search request failed");
    }
    const data = await res.json();
    return data.results || [];
  },
  generateAnswer: async (query: string, docs: unknown[]) => {
    // Use groq via Ollama for answer generation with model "llama-3.1-8b-instant"
    const endpoint = process.env.OLLAMA_URL;
    if (!endpoint) {
      throw new Error("Missing OLLAMA_URL environment variable");
    }
    const payload = {
      groq: "generate",
      query,
      docs,
      model: "llama-3.1-8b-instant"
    };
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      throw new Error("Ollama generate request failed");
    }
    const data = await res.json();
    return data.answer || "No answer returned.";
  },
};
