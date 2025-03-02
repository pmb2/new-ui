export const brandRAG = {
  search: async (query: string, businessId: string) => {
    // Dummy implementation: return an empty array of documents.
    return [];
  },
  generateAnswer: async (query: string, docs: any[]) => {
    // Dummy implementation: return a fixed answer string.
    return "This is a dummy answer from brandRAG.";
  },
};
