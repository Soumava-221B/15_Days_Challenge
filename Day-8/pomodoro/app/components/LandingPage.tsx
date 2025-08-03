import Navigations from "./Navigations"
import Timer from "./Timer"

const LandingPage = () => {
  return (
    <div className="bg-gray-900 min-h-screen font-inter">
        <div className="max-w-2xl min-h-screen mx-auto">
            <Navigations />
            <Timer />
        </div>
    </div>
  )
}

export default LandingPage