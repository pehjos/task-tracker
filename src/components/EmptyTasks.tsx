import { FC } from "react";
import { FaClipboardList } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { Button } from "./Button";

interface EmptyTasksProps {
  toggleForm: () => void; 
}

export const EmptyTasks: FC<EmptyTasksProps> = ({ toggleForm }) => {
  return (
    <div className="relative overflow-hidden">
      <div className="relative flex flex-col items-center justify-center p-12 rounded-2xl border border-gray-100 bg-white/70 backdrop-blur-lg min-h-[400px] space-y-8">
        <div className="flex flex-col items-center space-y-6 max-w-md">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-200 rounded-full blur-md animate-pulse" />
            <div className="relative bg-gradient-to-tr from-blue-500 to-purple-500 p-5 rounded-full">
            <FaClipboardList className="w-14 h-14 text-white" data-testid="task-icon" />

            </div>
            <div className="absolute -top-2 -right-2">
            <HiSparkles className="w-6 h-6 text-yellow-400 animate-bounce" data-testid="sparkles-icon" />
            </div>
          </div>

          <div className="text-center space-y-3">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Your Task List Awaits
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Turn your ideas into tasks and get things done.
            </p>
          </div>

          <Button
            type="button"
            onClick={toggleForm}
            label="Create First Task"
            styles="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 transform hover:-translate-y-0.5"
          />
        </div>

        {/* Dots (Decorative Elements) */}
        <div className="absolute top-8 right-8 grid grid-cols-2 gap-1">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-gray-200" />
          ))}
        </div>
        <div className="absolute bottom-8 left-8 grid grid-cols-2 gap-1">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-gray-200" />
          ))}
        </div>
      </div>
    </div>
  );
};
