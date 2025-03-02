"use client"

import { useState } from "react"
import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { Dialog, DialogContent } from "@/app/components/ui/dialog"
import { Button } from "@/app/components/ui/button"
import { ProgressCircle } from "./progress-circle"
import BusinessProfileModal from "./business-profile-modal"
import { StatusIndicator } from "./status-indicator"

const businessAccounts = [
  { id: 1, name: "Business Profile Account", status: "noncompliant" },
  { id: 2, name: "Business Profile Account", status: "noncompliant" },
  { id: 3, name: "Business Profile Account", status: "noncompliant" },
  { id: 4, name: "Business Profile Account", status: "noncompliant" },
  { id: 5, name: "Business Profile Account", status: "noncompliant" },
  { id: 6, name: "Business Profile Account", status: "active" },
  { id: 7, name: "Business Profile Account", status: "compliant" },
]

export function BusinessProfileDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const handleRowClick = (_accountId: number) => {
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center px-8 py-4 bg-black">
        <h1 className="text-xl text-white">Dashboard</h1>
        <Button variant="ghost" size="icon" className="rounded-full p-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mask%20group%20(2)%201-5RMiT8g4J4BzlQiRnu7aemEcs324uL.png"
            alt="User"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        </Button>
      </div>

      <div className="max-w-[1200px] mx-auto bg-white my-8 rounded-2xl shadow-sm">
        <div className="p-8">
          {/* Stats Section */}
          <div className="flex items-center justify-between mb-10 min-w-[600px]">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20dark-N5hNGX8uspWM4QBB8z1fDk6zcUTXpN.png"
                alt="Chara AI Logo"
                className="h-16 w-auto"
              />
            </div>

            {/* Stats */}
            <div className="text-center">
              <div className="text-7xl font-bold text-black mb-[14px]">5</div>
              <div className="flex justify-center">
                <StatusIndicator status="noncompliant" />
              </div>
              <div className="text-sm text-gray-600 mt-[26px]">Noncompliant</div>
            </div>

            <div className="text-center">
              <div className="text-7xl font-bold text-black mb-[14px]">2</div>
              <div className="flex justify-center">
                <StatusIndicator status="compliant" />
              </div>
              <div className="text-sm text-gray-600 mt-[26px]">Compliant</div>
            </div>

            <div className="text-center">
              <div className="text-7xl font-bold text-black mb-[14px]">1</div>
              <div className="flex justify-center">
                <StatusIndicator status="active" />
              </div>
              <div className="text-sm text-gray-600 mt-[26px]">Active</div>
            </div>

            {/* Progress Circle */}
            <div className="flex-shrink-0">
              <div className="flex flex-col items-center">
                <ProgressCircle value={88} />
                <span className="text-sm mt-[-8] text-gray-600">Completion Rate</span>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-lg overflow-hidden border border-gray-100">
            <Table>
              <TableHeader>
                <TableRow className="bg-black hover:bg-black">
                  <TableHead className="text-white font-normal text-base py-4">Account Name</TableHead>
                  <TableHead className="text-white font-normal text-base text-right py-4">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {businessAccounts.map((account) => (
                  <TableRow
                    key={account.id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleRowClick(account.id)}
                  >
                    <TableCell className="text-black py-4">{account.name}</TableCell>
                    <TableCell className="text-right py-4 pr-8">
                      <div className="flex justify-end">
                        <StatusIndicator status={account.status} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="p-0">
          <BusinessProfileModal onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default BusinessProfileDashboard

