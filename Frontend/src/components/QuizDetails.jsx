import React from 'react'




const QuizDetails = ({points, timeLimit, description}) => {
  return (
     <form>
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-2" htmlFor="timeLimit">
                  Time Limit (in minutes):
                </label>
                <input
                  type="number"
                  name="timeLimit"
                  id="timeLimit"
                  value={timeLimit}
                  className="border border-gray-500 rounded-md px-3 py-2"
                  disabled
                />
              </div>

              <div className="flex flex-col mt-3">
                <label className="text-gray-700 font-semibold mb-2" htmlFor="description">
                  Description:
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={description}
                  className="border border-gray-500 rounded-md px-3 py-2"
                  disabled
                ></textarea>
              </div>

              <div className="flex flex-col mt-3">
                <label className="text-gray-700 font-semibold mb-2" htmlFor="points">
                  Point Grading System:
                </label>
                <input
                  type="number"
                  name="points"
                  id="points"
                  value={points}
                  className="border border-gray-500 rounded-md px-3 py-2"
                  disabled
                />
              </div>
            </form>
    
  )
}

export default QuizDetails