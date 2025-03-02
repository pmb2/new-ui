import prisma from "./prisma";

export async function getBusinessById(businessId: string) {
  const business = await prisma.business.findUnique({
    where: { id: businessId },
  });
  if (!business) {
    throw new Error(`Business with id ${businessId} not found`);
  }
  return business;
}
