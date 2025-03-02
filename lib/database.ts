import prisma from "./prisma";

export async function saveCompetitorReport(businessId: string, competitor: string, report: unknown) {
  const savedReport = await prisma.competitorReport.create({
    data: {
      businessId,
      competitorName: competitor,
      report: report,
    },
  });
  return savedReport;
}
