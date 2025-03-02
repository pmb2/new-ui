import type { NextApiRequest, NextApiResponse } from 'next';
import { brandRAG } from '../../../../lib/brandRAG';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { businessId, query } = req.body;
  if (!businessId || !query) {
    return res.status(400).json({ error: 'Missing businessId or query text' });
  }

  try {
    // 1. Perform hybrid search for relevant brand documents filtered by businessId
    const docs = await brandRAG.search(query, businessId);
    
    // 2. Generate an answer using the retrieved documents
    const answer = await brandRAG.generateAnswer(query, docs);
    
    return res.status(200).json({ answer, supportingDocs: docs });
  } catch (err) {
    console.error('Brand alignment query failed:', err);
    return res.status(500).json({ error: 'Failed to retrieve brand insights' });
  }
}
