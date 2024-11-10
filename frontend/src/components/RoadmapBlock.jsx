import React from 'react';
import { Target, Book, Dumbbell, CheckCircle } from 'lucide-react';

const RoadmapBlock = ({ week, topic, learningObjectives, resources, practiceExercises, onAddToChecklist }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6 transition-all duration-300 hover:shadow-xl">
      <h3 className="font-bold text-2xl mb-4 text-gray-800 dark:text-white">Week {week}: {topic}</h3>
      {learningObjectives.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold text-lg mb-2 flex items-center text-gray-700 dark:text-gray-300">
            <Target className="w-5 h-5 mr-2 text-blue-500" />
            Learning Objectives:
          </h4>
          <ul className="space-y-2">
            {learningObjectives.map((objective, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-gray-600 dark:text-gray-400">{objective}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {resources.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold text-lg mb-2 flex items-center text-gray-700 dark:text-gray-300">
            <Book className="w-5 h-5 mr-2 text-purple-500" />
            Resources:
          </h4>
          <ul className="space-y-2">
            {resources.map((resource, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-purple-500 mr-2 mt-2 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">{resource}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {practiceExercises.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold text-lg mb-2 flex items-center text-gray-700 dark:text-gray-300">
            <Dumbbell className="w-5 h-5 mr-2 text-orange-500" />
            Practice Exercises:
          </h4>
          <ul className="space-y-2">
            {practiceExercises.map((exercise, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-orange-500 mr-2 mt-2 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">{exercise}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button 
        onClick={onAddToChecklist} 
        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-full mt-4 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        Add to Checklist
      </button>
    </div>
  );
};

export default RoadmapBlock;