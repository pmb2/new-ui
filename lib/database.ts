export async function saveCompetitorReport(businessId: string, competitor: string, report: unknown) {
  // Dummy implementation: return the report with a fake ID.
  return { id: "dummy-report-id", businessId, competitor, report };
}
