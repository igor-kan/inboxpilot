
import { Card } from "@/components/ui/card";
import { CheckCircle, Clock, Zap, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TasksPanelProps {
  completedTasks: number;
  setCompletedTasks: (count: number) => void;
}

export const TasksPanel = ({ completedTasks, setCompletedTasks }: TasksPanelProps) => {
  const pendingTasks = [
    {
      id: 1,
      title: "Book flight to NYC",
      priority: "high",
      aiAction: "Found 3 options, need approval",
      category: "travel"
    },
    {
      id: 2,
      title: "Send quarterly report",
      priority: "medium",
      aiAction: "Draft ready, auto-send at 5pm?",
      category: "work"
    },
    {
      id: 3,
      title: "Schedule dentist appointment",
      priority: "low",
      aiAction: "Found availability next week",
      category: "personal"
    },
    {
      id: 4,
      title: "Follow up with vendor proposal",
      priority: "high",
      aiAction: "Reminder drafted based on your style",
      category: "work"
    }
  ];

  const completedTasksList = [
    "Rescheduled team meeting for Thursday",
    "Auto-replied to newsletter signup",
    "Ordered office supplies from usual vendor",
    "Sent birthday reminder to Sarah"
  ];

  const handleCompleteTask = (taskId: number) => {
    setCompletedTasks(completedTasks + 1);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-400 border-red-400/30 bg-red-500/10";
      case "medium": return "text-yellow-400 border-yellow-400/30 bg-yellow-500/10";
      case "low": return "text-green-400 border-green-400/30 bg-green-500/10";
      default: return "text-gray-400 border-gray-400/30 bg-gray-500/10";
    }
  };

  return (
    <Card className="p-6 bg-black/20 backdrop-blur-xl border border-white/20">
      <h3 className="text-lg font-semibold text-white mb-4">AI Task Manager</h3>
      
      <div className="space-y-4">
        {/* Pending Tasks */}
        <div>
          <h4 className="text-sm font-medium text-purple-200 mb-3">Pending Actions</h4>
          <div className="space-y-3">
            {pendingTasks.slice(0, 4 - completedTasks).map((task) => (
              <div key={task.id} className="p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-start justify-between mb-2">
                  <h5 className="text-white text-sm font-medium">{task.title}</h5>
                  <span className={`text-xs px-2 py-1 rounded border ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
                <p className="text-gray-300 text-xs mb-3">{task.aiAction}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-3 h-3 text-purple-400" />
                    <span className="text-purple-200 text-xs">AI Ready</span>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => handleCompleteTask(task.id)}
                    className="h-6 px-3 text-xs bg-purple-500 hover:bg-purple-600"
                  >
                    Approve
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Tasks */}
        {completedTasks > 0 && (
          <div>
            <h4 className="text-sm font-medium text-green-200 mb-3">Recently Completed</h4>
            <div className="space-y-2">
              {completedTasksList.slice(0, completedTasks).map((task, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 bg-green-500/10 rounded border border-green-400/20">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-green-100 text-sm">{task}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="pt-4 border-t border-white/10">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="ghost" size="sm" className="text-purple-200 hover:bg-purple-500/20">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </Button>
            <Button variant="ghost" size="sm" className="text-purple-200 hover:bg-purple-500/20">
              <ArrowRight className="w-4 h-4 mr-2" />
              Delegate
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
