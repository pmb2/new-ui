export const brandRAG = {
  search: async (_query: string, _businessId: string) => {
    // Dummy implementation: return an empty array of documents.
    return [];
  },
  generateAnswer: async (_query: string, _docs: unknown[]) => {
    // Dummy implementation: return a fixed answer string.
    return "This is a dummy answer from brandRAG.";
  },
};
