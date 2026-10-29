import { Loader2Icon } from "lucide-react"

const Loader = () => {
  return (
    <div className="h-dvh flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Loader2Icon className="h-8 w-8 animate-spin text-green-500"/>
    </div>
  )
}

export default Loader
