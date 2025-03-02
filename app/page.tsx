import {BusinessProfileDashboard} from "@/app/components/business-profile-dashboard"
import {FeedbackButton} from "@/app/components/feedback-button"

export default function Page() {
    return (
        <div className="min-w-[800px]">
            <BusinessProfileDashboard/>
            <FeedbackButton/>
        </div>
    )
}