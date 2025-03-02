/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export function createComplianceSupervisorAgent(_options: unknown) {
  // Dummy implementation: return an agent with a runAllChecks method.
  return {
    runAllChecks: async () => {
      return [
        { step: "Check 1", status: "pass" },
        { step: "Check 2", status: "pass" },
        { step: "Check 3", status: "needs-review", issue: "Dummy issue detected" },
      ];
    },
  };
}
