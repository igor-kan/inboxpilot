
import { useState, useEffect } from "react";
import { Mic, MicOff, Play, Pause, SkipForward, CheckCircle, Mail, CheckSquare, Calendar, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface VoiceInterfaceProps {
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
  currentEmail: any;
  setCurrentEmail: (email: any) => void;
  processedEmails: number;
  setProcessedEmails: (count: number) => void;
  completedTasks: number;
  setCompletedTasks: (count: number) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const VoiceInterface = ({
  isListening,
  setIsListening,
  currentEmail,
  setCurrentEmail,
  processedEmails,
  setProcessedEmails,
  completedTasks,
  setCompletedTasks,
  activeTab,
  setActiveTab,
}: VoiceInterfaceProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentCommand, setCurrentCommand] = useState("");
  const [recentActions, setRecentActions] = useState<string[]>([]);

  const mockEmails = [
    {
      id: 1,
      from: "sarah@company.com",
      subject: "Q4 Budget Review Meeting",
      preview: "Hi, I'd like to schedule our Q4 budget review for next week...",
      priority: "high",
      category: "meeting"
    },
    {
      id: 2,
      from: "newsletter@techcrunch.com",
      subject: "Daily Tech News Digest",
      preview: "Today's top stories: AI breakthrough, startup funding...",
      priority: "low",
      category: "newsletter"
    },
    {
      id: 3,
      from: "john.smith@client.com",
      subject: "Project Update Required",
      preview: "Can you send me the latest project status by EOD?",
      priority: "high",
      category: "work"
    }
  ];

  const aiCommands = {
    email: [
      "Read next email",
      "Reply: Sounds good, let's schedule for Tuesday at 2 PM",
      "Archive this email",
      "Auto-reply to newsletters",
      "Forward to my assistant"
    ],
    tasks: [
      "Book my flight to NYC",
      "Schedule dentist appointment",
      "Send quarterly report automatically",
      "Order office supplies",
      "Follow up with vendor proposal"
    ],
    calendar: [
      "Schedule 1:1 with Sarah next week",
      "Block focus time tomorrow morning",
      "Reschedule conflicting meetings",
      "Add travel buffer before client meeting",
      "Decline low-priority invites"
    ]
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate processing voice command
      setTimeout(() => {
        const commands = aiCommands[activeTab as keyof typeof aiCommands];
        const randomCommand = commands[Math.floor(Math.random() * commands.length)];
        setCurrentCommand(randomCommand);
        
        setTimeout(() => {
          setRecentActions(prev => [randomCommand, ...prev.slice(0, 4)]);
          setCurrentCommand("");
          setIsListening(false);
          
          if (randomCommand.includes("Read next") && activeTab === "email") {
            const nextEmail = mockEmails[processedEmails % mockEmails.length];
            setCurrentEmail(nextEmail);
            setIsPlaying(true);
            setTimeout(() => setIsPlaying(false), 3000);
          } else if (activeTab === "email") {
            setProcessedEmails(processedEmails + 1);
          } else if (activeTab === "tasks") {
            setCompletedTasks(completedTasks + 1);
          }
        }, 2000);
      }, 1000);
    }
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case "email": return Mail;
      case "tasks": return CheckSquare;
      case "calendar": return Calendar;
      default: return Mail;
    }
  };

  return (
    <div className="space-y-6">
      {/* Mode Selection Tabs */}
      <Card className="p-4 bg-black/20 backdrop-blur-xl border border-white/20">
        <div className="flex space-x-4">
          {["email", "tasks", "calendar"].map((tab) => {
            const Icon = getTabIcon(tab);
            return (
              <Button
                key={tab}
                onClick={() => setActiveTab(tab)}
                variant={activeTab === tab ? "default" : "ghost"}
                className={`flex items-center space-x-2 ${
                  activeTab === tab 
                    ? "bg-purple-500 hover:bg-purple-600" 
                    : "text-purple-200 hover:bg-purple-500/20"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="capitalize">{tab}</span>
              </Button>
            );
          })}
        </div>
      </Card>

      {/* Main Voice Control */}
      <Card className="p-8 bg-black/20 backdrop-blur-xl border border-white/20 shadow-2xl">
        <div className="text-center space-y-6">
          <div className="relative">
            <Button
              onClick={handleVoiceToggle}
              size="lg"
              className={`w-32 h-32 rounded-full text-white font-semibold transition-all duration-300 shadow-2xl ${
                isListening
                  ? "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 animate-pulse"
                  : "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              }`}
            >
              {isListening ? (
                <MicOff className="w-12 h-12" />
              ) : (
                <Mic className="w-12 h-12" />
              )}
            </Button>
            
            {isListening && (
              <div className="absolute -inset-4 rounded-full border-4 border-red-400/50 animate-ping" />
            )}
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">
              {isListening ? "Listening..." : "AI Assistant Ready"}
            </h2>
            <p className="text-purple-200">
              {isListening 
                ? `Processing ${activeTab} command...` 
                : `Manage your ${activeTab} hands-free`}
            </p>
          </div>
          
          {currentCommand && (
            <div className="p-4 bg-purple-500/20 rounded-lg border border-purple-400/30">
              <div className="flex items-center space-x-2 justify-center mb-2">
                <Brain className="w-4 h-4 text-purple-400" />
                <span className="text-purple-200 text-sm">AI Processing</span>
              </div>
              <p className="text-purple-100 font-medium">"{currentCommand}"</p>
            </div>
          )}
        </div>
      </Card>

      {/* Current Email Display (only in email mode) */}
      {currentEmail && activeTab === "email" && (
        <Card className="p-6 bg-black/20 backdrop-blur-xl border border-white/20">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Current Email</h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-purple-200 hover:text-white"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-purple-200 hover:text-white"
                >
                  <SkipForward className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-purple-200 text-sm">From: {currentEmail.from}</p>
              <h4 className="text-white font-medium">{currentEmail.subject}</h4>
              <p className="text-gray-300 text-sm">{currentEmail.preview}</p>
            </div>
            
            {isPlaying && (
              <div className="flex items-center space-x-2 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm">AI reading aloud...</span>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Recent AI Actions */}
      {recentActions.length > 0 && (
        <Card className="p-6 bg-black/20 backdrop-blur-xl border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">Recent AI Actions</h3>
          <div className="space-y-2">
            {recentActions.map((action, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-green-500/10 rounded-lg border border-green-400/20">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-green-100 text-sm">{action}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
