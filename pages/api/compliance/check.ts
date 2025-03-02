import type { NextApiRequest, NextApiResponse } from 'next';
import { getBusinessById } from '../../../lib/business';
import { createComplianceSupervisorAgent } from '../../../lib/complianceAgent';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { businessId, mode } = req.body;
  if (!businessId) {
    return res.status(400).json({ error: 'Missing businessId' });
  }

  try {
    // 1. Fetch business context from the database
    const business = await getBusinessById(businessId);

    // 2. Initialize the supervisor agent with business context and tools:
    //    - LLM via Ollama and any additional tools (e.g. Playwright)
    const supervisor = createComplianceSupervisorAgent({
      business,
      mode,
      llm: { model: 'R1LlamaDistill', endpoint: process.env.OLLAMA_URL },
      tools: [] // Add tools like the Playwright agent as needed
    });

    // 3. Run the compliance check workflow
    const results = await supervisor.runAllChecks();

    // 4. If any step needs review, simulate sending an email notification
    const needsReview = results.find(r => r.status === 'needs-review');
    if (needsReview) {
      console.log(`Placeholder: Sending email notification for business ${businessId} - issue: ${needsReview.issue}`);
    }

    // 5. Return the step-by-step results to the frontend
    return res.status(200).json({ steps: results });
  } catch (err) {
    console.error('Compliance check failed:', err);
    return res.status(500).json({ error: 'Compliance check failed', details: String(err) });
  }
}
