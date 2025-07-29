import { BookOpen, Clock, Trophy } from "lucide-react"

const QuizStart = () => {
  return (
    <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-8">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-6">
                    <BookOpen className="w-12 h-12"/>
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-4">React Knowledge Quiz</h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Test your knowledge of React, JavaScript, and web development. Answer Multiple choice questions and see how well you know the fundamentals! 
                </p>
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                    <div className="flex items-center justify-center mb-4">
                        <BookOpen className="w-8 h-8 text-blue-600"/>
                    </div>
                    <div className="text-2xl font-bold text-blue-800 mb-2">8</div>
                    <div className="text-2xl font-medium">Questions</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                    <div className="flex items-center justify-center mb-4">
                        <Clock className="w-8 h-8 text-purple-600"/>
                    </div>
                    <div className="text-2xl font-bold text-purple-800 mb-2">5:00</div>
                    <div className="text-2xl font-medium">Minutes</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                    <div className="flex items-center justify-center mb-4">
                        <Trophy className="w-8 h-8 text-green-600"/>
                    </div>
                    <div className="text-2xl font-bold text-green-800 mb-2">100%</div>
                    <div className="text-2xl font-medium">Max Score</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default QuizStart