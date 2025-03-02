"use client"

import { useState, useEffect } from "react"
import { X, Clock, CheckCircle2, XCircle, HelpCircle } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { StatusIndicator } from "./status-indicator"
import { Textarea } from "@/app/components/ui/textarea"
import BusinessProfileEdit from "./business-profile-edit"
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/app/components/ui/dialog"

// Update the Step interface to include more detailed information
interface Step {
  title: string
  subtitle: string
  status: "completed" | "in-progress" | "failed" | "pending"
  description?: string
  actions?: string[]
  screenshot?: string
  screenshotCaption?: string
}

// Replace the steps array with a more comprehensive version
const steps: Step[] = [
  {
    title: "Step 1: Verify business details",
    subtitle: "Checking business details: website, address, hours...",
    status: "completed",
    description:
      "Our AI-powered compliance engine verifies essential profile information to ensure your Google Business Profile is complete and optimized.",
    actions: [
      "→ Verifying business name...",
      "✓ Business name verified",
      "→ Validating address...",
      "✓ Address validated with postal service",
      "→ Checking phone number...",
      "✓ Phone number verified active",
      "→ Confirming business hours...",
      "✓ Business hours confirmed",
      "→ Checking website SSL...",
      "✓ Website SSL certificate valid",
      "→ Analyzing website performance...",
      "→ Checking business citations...",
      "→ Validating business category...",
    ],
    screenshot: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder.svg?height=150&width=400",
    screenshotCaption: "Business details verification complete",
  },
  {
    title: "Step 2: Checking for new content",
    subtitle: "Checking for new reviews, Q&A, posts..",
    status: "in-progress",
    description:
      "Our system analyzes customer engagement elements to ensure timely responses and active profile management.",
    actions: [
      "→ Scanning for new reviews...",
      "✓ Found 3 new customer reviews",
      "→ Checking Q&A section...",
      "✓ Detected 2 unanswered Q&As",
      "→ Validating social links...",
      "✓ Social media links validated",
      "→ Checking recent posts...",
      "✗ No posts in last 7 days",
      "→ Analyzing review sentiment...",
      "→ Checking response times...",
      "→ Scanning competitor activity...",
      "→ Evaluating engagement metrics...",
    ],
    screenshot: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder.svg?height=150&width=400",
    screenshotCaption: "New review detected on Google Business Profile",
  },
  {
    title: "Step 3: Validating media",
    subtitle: "uploads and brand images...",
    status: "failed",
    description:
      "Our compliance engine checks all media for quality, relevance, and proper metadata to maximize visual impact.",
    actions: [
      "✓ Image format validation complete",
      "✓ Video content analyzed",
      "✗ Logo resolution below 250x250px",
      "✗ Missing alt text on 3 images",
      "✗ Cover photo aspect ratio incorrect",
      "→ Checking image optimization...",
      "→ Analyzing visual consistency...",
      "→ Validating brand guidelines...",
    ],
    screenshot: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder.svg?height=150&width=400",
    screenshotCaption: "Media validation failed - action required",
  },
  {
    title: "Step 4: Finalizing",
    subtitle: "(compliance data aggregation...)",
    status: "pending",
    description:
      "Our system compiles all findings and generates a comprehensive compliance report with actionable recommendations.",
    actions: [
      "✓ Core data validated",
      "✓ Performance metrics collected",
      "→ Generating compliance score...",
      "→ Calculating risk factors...",
      "→ Prioritizing recommendations...",
      "→ Creating action items...",
      "→ Preparing final report...",
      "→ Scheduling follow-up tasks...",
    ],
    screenshot: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder.svg?height=150&width=400",
    screenshotCaption: "Compliance data aggregation in progress",
  },
]

// Add a function to simulate API calls for compliance checks
const triggerComplianceCheck = async (businessId: number) => {
  console.log(`Triggering compliance check for business ID: ${businessId}`)
  // In a real implementation, this would call the API endpoint:
  // POST /api/compliance-check with the businessId
  return { success: true, jobId: "compliance-job-123" }
}

// Add a function to get compliance report
const getComplianceReport = async (businessId: number) => {
  console.log(`Getting compliance report for business ID: ${businessId}`)
  // In a real implementation, this would call:
  // GET /api/compliance-report/${businessId}
  return {
    status: "FAIL",
    completionRate: 44,
    issues: [
      { type: "missing_website", severity: "high", description: "Website URL is missing" },
      { type: "outdated_post", severity: "medium", description: "Last post was 10 days ago" },
      { type: "media_issue", severity: "high", description: "Logo image resolution too low" },
    ],
  }
}

// Add a function to resolve compliance issues

const StepIcon = ({ status }: { status: Step["status"] }) => {
  switch (status) {
    case "completed":
      return (
        <div className="w-6 h-6 rounded-full bg-[#0080FF] flex items-center justify-center">
          <CheckCircle2 className="w-4 h-4 text-white" />
        </div>
      )
    case "in-progress":
      return (
        <div className="w-6 h-6 rounded-full bg-[#FF1681] flex items-center justify-center">
          <Clock className="w-4 h-4 text-white" />
        </div>
      )
    case "failed":
      return (
        <div className="w-6 h-6 rounded-full bg-[#C939D6] flex items-center justify-center">
          <XCircle className="w-4 h-4 text-white" />
        </div>
      )
    default:
      return (
        <div className="w-6 h-6 rounded-full border-2 border-gray-200 flex items-center justify-center">
          <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>
      )
  }
}

// Update the BusinessProfileModal component to include the new functionality
export default function BusinessProfileModal({ onClose }: { onClose: () => void }) {
  // Use client-side only rendering to avoid hydration issues
  const [isMounted, setIsMounted] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isRunningCheck, setIsRunningCheck] = useState(false)
  const [complianceReport, setComplianceReport] = useState<{ status: string; completionRate: number; issues: { type: string; severity: string; description: string }[] } | null>(null)
  const businessId = 1; // Mock business ID
  const [currentActionIndex, setCurrentActionIndex] = useState(0)
  const [isMemoriesOpen, setIsMemoriesOpen] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prevIndex) => (prevIndex + 1) % steps.length)
    }, 5000) // Change step every 5 seconds

    return () => clearInterval(interval)
  }, [])

  // Add this useEffect for action cycling
  useEffect(() => {
    const actionInterval = setInterval(() => {
      const currentActions = steps[currentStepIndex].actions || []
      const nextActionIndex = (currentActionIndex + 1) % currentActions.length

      // If the next action is a completion (✓) of the current action (→),
      // show it briefly before moving to the next action
      if (
        currentActions[currentActionIndex]?.startsWith("→") &&
        currentActions[nextActionIndex]?.startsWith("✓") &&
        currentActions[currentActionIndex].slice(2) === currentActions[nextActionIndex].slice(2)
      ) {
        setCurrentActionIndex(nextActionIndex)
        setTimeout(() => {
          setCurrentActionIndex((nextActionIndex + 1) % currentActions.length)
        }, 1000)
      } else {
        setCurrentActionIndex(nextActionIndex)
      }
    }, 3000) // Change action every 3 seconds

    return () => clearInterval(actionInterval)
  }, [currentStepIndex, currentActionIndex])

  // Function to start a compliance check
  const startComplianceCheck = async () => {
    setIsRunningCheck(true)
    try {
      await triggerComplianceCheck(businessId)
      // In a real implementation, we would poll for results or use WebSockets
      // For demo purposes, we'll just wait a bit and then get the report
      setTimeout(async () => {
        const report = await getComplianceReport(businessId)
        setComplianceReport(report)
        setIsRunningCheck(false)
      }, 3000)
    } catch (error) {
      console.error("Error running compliance check:", error)
      setIsRunningCheck(false)
    }
  }

  // Don't render anything during SSR to avoid hydration mismatch
  if (!isMounted) {
    return (
      <div className="flex flex-col h-full bg-white rounded-xl">
        <div className="px-6 py-4 flex justify-between items-center border-b relative">
          <h2 className="text-lg font-medium">Business Profile Account</h2>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pencil-dU5dMJDm9paKGUCdBJX5awBEHoRhXl.png"
              alt="Edit"
              className="w-4 h-4 opacity-80"
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full absolute -right-3 -top-3 bg-white border shadow-md hover:bg-gray-50 z-50 translate-x-1/2 -translate-y-1/2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1"></div>
      </div>
    )
  }

  if (isEditing) {
    return <BusinessProfileEdit onClose={() => setIsEditing(false)} />
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-xl">
      <div className="px-6 py-4 flex justify-between items-center border-b relative">
        <h2 className="text-lg font-medium">Business Profile Account</h2>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsEditing(true)}>
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pencil-dU5dMJDm9paKGUCdBJX5awBEHoRhXl.png"
            alt="Edit"
            className="w-4 h-4 opacity-80"
          />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full absolute -right-3 -top-3 bg-white border shadow-md hover:bg-gray-50 z-50 translate-x-1/2 -translate-y-1/2"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="compliance" className="flex flex-col flex-1">
        <div className="flex-1 overflow-auto">
          <TabsContent value="compliance" className="m-0 p-6">
            <div className="flex justify-between items-start mb-8">
              <div className="space-y-8 flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-4xl font-bold">Compliance Checklist</h3>
                  <Button
                    onClick={startComplianceCheck}
                    disabled={isRunningCheck}
                    className="bg-gradient-to-r from-[#FFAB1A] via-[#FF1681] to-[#0080FF] text-white"
                  >
                    {isRunningCheck ? "Running Check..." : "Run Compliance Check"}
                  </Button>
                </div>

                <div className="space-y-6 pl-[220px] pt-[50px]">
                  {/* Current step content */}
                  <div className="flex flex-col gap-6 bg-white p-6 rounded-xl shadow-sm min-h-[300px] border">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        <StepIcon status={steps[currentStepIndex].status} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-black text-2xl font-medium transition-all duration-700 ease-in-out">
                          {steps[currentStepIndex].title}
                        </span>
                        <span className="text-sm text-gray-500 transition-all duration-700 ease-in-out">
                          {steps[currentStepIndex].subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-gray-700 transition-all duration-700 ease-in-out">
                        {steps[currentStepIndex].description}
                      </p>

                      <div className="grid grid-cols-2 gap-6">
                        {/* Active Actions Column */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-medium">Current Actions:</h4>
                          <div className="relative h-[100px] overflow-hidden">
                            {steps[currentStepIndex].actions?.map((action, index) => (
                              <div
                                key={index}
                                className={`absolute w-full transition-all duration-700 ${
                                  index === currentActionIndex
                                    ? "top-0 opacity-100 transform-none"
                                    : "top-full opacity-0 translate-y-full"
                                }`}
                              >
                                <div
                                  className={`text-sm p-4 rounded-lg transition-all duration-700 ${
                                    action.startsWith("→")
                                      ? "bg-blue-50 text-blue-700 animate-[pulse_2s_ease-in-out_infinite]"
                                      : action.startsWith("✗")
                                        ? "bg-red-50 text-red-700"
                                        : "hidden"
                                  }`}
                                >
                                  {action}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Completed Actions Column */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-medium">Completed Actions:</h4>
                          <div className="space-y-2 max-h-[300px] overflow-y-auto">
                            {steps[currentStepIndex].actions
                              ?.slice(0, currentActionIndex + 1)
                              .filter((action) => action.startsWith("✓"))
                              .map((action, index) => (
                                <div
                                  key={index}
                                  className="text-sm p-4 rounded-lg bg-green-50 text-green-700 transition-all duration-700"
                                >
                                  {action}
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>

                      {steps[currentStepIndex].status === "failed" && (
                        <div className="mt-4 transition-all duration-700 ease-in-out">
                          <Button className="bg-[#FF1681] text-white hover:bg-[#FF1681]/90">Fix Issues</Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 pr-[25px]">
                <span className="text-4xl font-bold">44%</span>
                <div className="flex flex-col items-end gap-1">
                  <StatusIndicator status="noncompliant" />
                  <span className="text-sm text-gray-500">Noncompliant</span>
                </div>
              </div>
            </div>

            {/* Compliance Report Section */}
            {complianceReport && (
              <div className="mt-8 border-t pt-6">
                <h3 className="text-2xl font-bold mb-4">Compliance Report</h3>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-medium mb-3">Issues Found</h4>
                      <ul className="space-y-3">
                        {complianceReport.issues.map((issue, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <span
                              className={`w-2 h-2 rounded-full mt-2 ${
                                issue.severity === "high"
                                  ? "bg-[#FF1681]"
                                  : issue.severity === "medium"
                                    ? "bg-[#FFAB1A]"
                                    : "bg-[#0080FF]"
                              }`}
                            />
                            <div>
                              <p className="font-medium">{issue.description}</p>
                              <p className="text-sm text-gray-500">
                                {issue.severity === "high"
                                  ? "Critical issue - needs immediate attention"
                                  : issue.severity === "medium"
                                    ? "Important - should be addressed soon"
                                    : "Minor issue - fix when convenient"}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-3">Recommendations</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <span className="text-[#0080FF] font-bold">1.</span>
                          <p>Add your website URL to improve search visibility and drive traffic</p>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#0080FF] font-bold">2.</span>
                          <p>Create a new post to keep your profile active (last post was 10 days ago)</p>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#0080FF] font-bold">3.</span>
                          <p>Upload a higher resolution logo image (minimum 250x250px recommended)</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="brand" className="h-full m-0 p-6">
            <div className="grid grid-cols-[250px_1fr] gap-6 h-full">
              <div className="bg-[#F3F4F6] rounded-xl p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Brand Alignment</h3>
                  <p className="text-gray-600">Professional Brand</p>
                </div>

                <Dialog open={isMemoriesOpen} onOpenChange={setIsMemoriesOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full bg-gradient-to-r from-[#FFAB1A] via-[#FF1681] to-[#0080FF] text-white hover:opacity-90"
                      onClick={() => setIsMemoriesOpen(true)}
                    >
                      View Memories
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md p-0" onInteractOutside={() => setIsMemoriesOpen(false)}>
                    <div className="flex flex-col h-full bg-white rounded-xl">
                      <div className="px-6 py-4 flex justify-between items-center border-b relative">
                        <h2 className="text-lg font-medium">Brand Memories</h2>
                        <DialogClose asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full absolute -right-3 -top-3 bg-white border shadow-md hover:bg-gray-50 z-50 translate-x-1/2 -translate-y-1/2"
                            onClick={() => setIsMemoriesOpen(false)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </DialogClose>
                      </div>

                      <div className="p-6 space-y-4">
                        {[
                          "First customer interaction",
                          "Brand voice established",
                          "Logo redesign",
                          "Website launch",
                          "Social media milestone",
                        ].map((memory, index) => (
                          <div
                            key={index}
                            className="group flex items-center gap-3 p-3 rounded-lg border bg-white hover:bg-gray-50 transition-colors"
                          >
                            <input
                              type="checkbox"
                              className="h-5 w-5 rounded-md border-gray-300 text-[#FF1681] focus:ring-[#FF1681]"
                              defaultChecked={index < 3}
                            />
                            <input
                              type="text"
                              defaultValue={memory}
                              className="flex-1 bg-transparent border-0 p-0 text-sm focus:ring-0 focus:outline-none group-hover:bg-transparent"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.stopPropagation()
                                // Handle memory deletion
                              }}
                            >
                              <X className="h-4 w-4 text-gray-500" />
                            </Button>
                          </div>
                        ))}
                      </div>

                      <div className="p-6 border-t bg-gray-50">
                        <Button
                          className="w-full bg-gradient-to-r from-[#FFAB1A] via-[#FF1681] to-[#0080FF] text-white hover:opacity-90"
                          onClick={() => {
                            // Handle adding new memory
                          }}
                        >
                          Add Memory
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="border rounded-xl flex flex-col">
                <div className="flex-1 p-6 space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-[#FFAB1A] via-[#FF1681] to-[#0080FF] flex items-center justify-center">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mask%20group%20(8)-DcPWOQsZME6DH3YHaew1g9ss4Fz1pV.png"
                        alt="AI Assistant"
                        className="w-6 h-6"
                      />
                    </div>
                    <div className="flex flex-col gap-4 max-w-[80%]">
                      <div className="bg-[#F3F4F6] rounded-xl p-4">
                        <p className="text-black mb-3">
                          👋 Welcome! I&apos;m here to help you develop a strong, consistent brand voice. Let&apos;s work together
                          to define your brand&apos;s personality and tone.
                        </p>
                        <p className="text-gray-600 mb-3">
                          You can start by describing your ideal brand voice, or upload examples of content that
                          represents your desired tone. Simply drag and drop files here or use the input below.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-[#FF1681]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF1681]" />
                          <p>Supported files: Images, PDFs, Word docs, or text files</p>
                        </div>
                      </div>
                      <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center transition-colors hover:border-[#FF1681]/50 hover:bg-[#FF1681]/5">
                        <p className="text-gray-500 text-sm">
                          Drag and drop files here, or click the input below to start typing
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 border-t">
                  <div className="flex gap-4 items-center">
                    <Textarea
                      placeholder="Describe your Brand tone..."
                      className="flex-1 resize-none text-base rounded-xl border-gray-200 h-[56px] py-4"
                    />
                    <Button className="px-8 h-[56px] bg-gradient-to-b from-[#C939D6] via-[#FF1681] to-[#0080FF] hover:opacity-90 text-white rounded-full text-base font-medium shrink-0">
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="competitor" className="m-0 p-6">
            <h3 className="text-2xl font-semibold mb-6">Competitor Research</h3>
            {/* Competitor Research content */}
          </TabsContent>
        </div>

        <div className="mt-auto">
          <TabsList className="w-full h-12 p-0.5 rounded-5 bg-gradient-to-r from-[#FFAB1A] via-[#FF1681] via-[#C939D6] to-[#0080FF]">
            <TabsTrigger
              value="compliance"
              className="flex-1 h-full rounded-5 text-black data-[state=active]:bg-white data-[state=active]:text-black data-[state=inactive]:text-black/77"
            >
              Compliance
            </TabsTrigger>
            <TabsTrigger
              value="brand"
              className="flex-1 h-full rounded-5 text-black data-[state=active]:bg-white data-[state=active]:text-black data-[state=inactive]:text-black/77"
            >
              Brand Alignment
            </TabsTrigger>
            <TabsTrigger
              value="competitor"
              className="flex-1 h-full rounded-5 text-black data-[state=active]:bg-white data-[state=active]:text-black data-[state=inactive]:text-black/77"
            >
              Competitor Research
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
    </div>
  )
}

