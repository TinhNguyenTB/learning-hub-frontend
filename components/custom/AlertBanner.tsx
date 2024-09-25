import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Rocket, TriangleAlert } from "lucide-react"
interface AlertBannerProps {
    isCompleted: boolean
    missingFieldCount: number
    requiredFieldsCount: number
}
const AlertBanner = ({ isCompleted, missingFieldCount, requiredFieldsCount }: AlertBannerProps) => {
    return (
        <div className="mt-8">
            <Alert className="my-4" variant={`${isCompleted ? 'complete' : 'destructive'}`}>
                {isCompleted ?
                    <Rocket className="h-4 w-4" />
                    :
                    <TriangleAlert className="h-4 w-4" />
                }
                <AlertTitle className="text-sm font-medium">
                    {missingFieldCount} missing fields / {requiredFieldsCount} required fields
                </AlertTitle>
                <AlertDescription className="text-base font-semibold">
                    {isCompleted ?
                        "Great job! Ready to publish"
                        :
                        "You can only publish when all the required fields are completed"
                    }
                </AlertDescription>
            </Alert>
        </div>
    )
}
export default AlertBanner