"use client"

import type React from "react"
import Image from "next/image"

import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Dialog, DialogContent } from "@/app/components/ui/dialog"
import { DialogClose } from "@/app/components/ui/dialog"
import { Label } from "@/app/components/ui/label"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group"
import { AlertCircle, Lightbulb, Upload, X } from "lucide-react"

export function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentFeedbackType, setCurrentFeedbackType] = useState<"bug" | "feature" | "feedback">("bug")
  const [files, setFiles] = useState<File[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    setIsOpen(false)
  }

  const feedbackTypes = [
    {
      id: "bug",
      icon: AlertCircle,
      title: "Report a Bug",
      description: "Let us know about any issues you've encountered",
    },
    {
      id: "feature",
      icon: Lightbulb,
      title: "Request a Feature",
      description: "Suggest new features or improvements",
    },
    {
      id: "feedback",
      icon: MessageCircle,
      title: "General Feedback",
      description: "Share your thoughts and suggestions",
    },
  ]

  return (
    <>
      <Button
        size="icon"
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full bg-gradient-to-b from-[#FF1681] to-[#FFAB1A] shadow-lg hover:opacity-90"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mask%20group%20(8)-DcPWOQsZME6DH3YHaew1g9ss4Fz1pV.png"
          alt="Feedback"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl p-0">
          <div className="flex flex-col h-full bg-white rounded-xl overflow-hidden">
            <div className="px-6 py-4 flex justify-between items-center border-b relative">
              <h2 className="text-lg font-medium">Submit Feedback</h2>
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full absolute -right-3 -top-3 bg-white border shadow-md hover:bg-gray-50 z-50 translate-x-1/2 -translate-y-1/2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-auto">
              <div className="p-6 space-y-6">
                {/* Feedback Type Selection */}
                <div className="space-y-3">
                  <Label>What type of feedback do you have?</Label>
                  <RadioGroup
                    defaultValue="bug"
                    onValueChange={(value) => setCurrentFeedbackType(value as "bug" | "feature" | "feedback")}
                    className="grid grid-cols-3 gap-4"
                  >
                    {feedbackTypes.map((option) => (
                      <Label
                        key={option.id}
                        htmlFor={option.id}
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-colors hover:bg-gray-50
                          ${currentFeedbackType === option.id ? "border-[#FF1681]" : "border-gray-200"}`}
                      >
                        <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                        <option.icon
                          className={`h-6 w-6 ${currentFeedbackType === option.id ? "text-[#FF1681]" : "text-gray-500"}`}
                        />
                        <div className="text-center">
                          <div className="font-medium text-sm">{option.title}</div>
                          <div className="text-xs text-gray-500">{option.description}</div>
                        </div>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>

                {/* Title Field */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder={
                      currentFeedbackType === "bug"
                        ? "Describe the issue in a few words"
                        : currentFeedbackType === "feature"
                          ? "Name your feature request"
                          : "Subject of your feedback"
                    }
                    className="w-full"
                  />
                </div>

                {/* Description Field */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder={
                      currentFeedbackType === "bug"
                        ? "What happened? What did you expect to happen? Steps to reproduce?"
                        : currentFeedbackType === "feature"
                          ? "Describe the feature you'd like to see. What problem would it solve?"
                          : "Tell us what's on your mind"
                    }
                    className="min-h-[150px]"
                  />
                </div>

                {/* File Upload - Only for bug reports */}
                {currentFeedbackType === "bug" && (
                  <div className="space-y-2">
                    <Label>Attachments</Label>
                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="gap-2"
                        onClick={() => document.getElementById("file-upload")?.click()}
                      >
                        <Upload className="h-4 w-4" />
                        Upload Files
                      </Button>
                      <input
                        id="file-upload"
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                        accept="image/*,.pdf,.txt"
                      />
                      {files.length > 0 && (
                        <span className="text-sm text-gray-500">
                          {files.length} file{files.length !== 1 ? "s" : ""} selected
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">Upload screenshots or relevant files (max 5MB each)</p>
                  </div>
                )}

                {/* Priority Selection - For bugs and features */}
                {(currentFeedbackType === "bug" || currentFeedbackType === "feature") && (
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <RadioGroup defaultValue="medium" className="flex gap-4">
                      <Label
                        htmlFor="priority-high"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer hover:bg-gray-50"
                      >
                        <RadioGroupItem value="high" id="priority-high" />
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#FF1681]" />
                          High
                        </span>
                      </Label>
                      <Label
                        htmlFor="priority-medium"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer hover:bg-gray-50"
                      >
                        <RadioGroupItem value="medium" id="priority-medium" />
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#C939D6]" />
                          Medium
                        </span>
                      </Label>
                      <Label
                        htmlFor="priority-low"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer hover:bg-gray-50"
                      >
                        <RadioGroupItem value="low" id="priority-low" />
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#0080FF]" />
                          Low
                        </span>
                      </Label>
                    </RadioGroup>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="border-t p-6 bg-gray-50">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#FF1681] to-[#FFAB1A] text-black hover:opacity-90"
                >
                  Submit Feedback
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

