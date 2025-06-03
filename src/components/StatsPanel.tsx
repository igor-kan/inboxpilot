
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Zap, Target, Brain, Calendar } from "lucide-react";

interface StatsPanelProps {
  processedEmails: number;
  completedTasks: number;
}

export const StatsPanel = ({ processedEmails, completedTasks }: StatsPanelProps) => {
  const totalEmails = 15;
  const totalTasks = 8;
  const emailProgress = (processedEmails / totalEmails) * 100;
  const taskProgress = (completedTasks / totalTasks) * 100;
  const overallProgress = ((processedEmails + completedTasks) / (totalEmails + totalTasks)) * 100;

  return (
    <Card className="p-6 bg-black/20 backdrop-blur-xl border border-white/20">
      <h3 className="text-lg font-semibold text-white mb-4">AI Productivity Dashboard</h3>
      
      <div className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-purple-200">Overall Completion</span>
            <span className="text-white font-medium">{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-3 bg-gray-700" />
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-green-200 text-sm">Emails</span>
            </div>
            <p className="text-xl font-bold text-white">{processedEmails}/{totalEmails}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-blue-400" />
              <span className="text-blue-200 text-sm">Tasks</span>
            </div>
            <p className="text-xl font-bold text-white">{completedTasks}/{totalTasks}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Brain className="w-4 h-4 text-purple-400" />
              <span className="text-purple-200 text-sm">AI Actions</span>
            </div>
            <p className="text-xl font-bold text-white">{processedEmails + completedTasks}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-pink-400" />
              <span className="text-pink-200 text-sm">Meetings</span>
            </div>
            <p className="text-xl font-bold text-white">3</p>
          </div>
        </div>
        
        {/* AI Status Message */}
        <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-400/30">
          <p className="text-purple-100 text-sm text-center">
            {overallProgress === 0 
              ? "🤖 Ready to automate your life!" 
              : overallProgress >= 80 
              ? "🎉 Crushing your goals today!" 
              : `🚀 ${Math.round(100 - overallProgress)}% left to conquer!`}
          </p>
        </div>
      </div>
    </Card>
  );
};
