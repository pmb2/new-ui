import type { NextApiRequest, NextApiResponse } from 'next';
import { runCompetitorResearch } from '../../../lib/competitorResearch';
import { saveCompetitorReport } from '../../../lib/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { businessId, competitor } = req.body;
  if (!businessId || !competitor) {
    return res.status(400).json({ error: 'Missing businessId or competitor name' });
  }
  
  try {
    // Kick off competitor research for the given competitor name
    const report = await runCompetitorResearch(competitor);
    // Save the report to the database associated with this business and competitor
    const savedReport = await saveCompetitorReport(businessId, competitor, report);
    
    return res.status(200).json({ report: savedReport });
  } catch (err) {
    console.error('Competitor research failed:', err);
    return res.status(500).json({ error: 'Failed to complete competitor research' });
  }
}
