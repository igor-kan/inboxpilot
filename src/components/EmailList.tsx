
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Clock, Star, Archive } from "lucide-react";

interface EmailListProps {
  setCurrentEmail: (email: any) => void;
  processedEmails: number;
}

export const EmailList = ({ setCurrentEmail, processedEmails }: EmailListProps) => {
  const mockEmails = [
    {
      id: 1,
      from: "sarah@company.com",
      subject: "Q4 Budget Review Meeting",
      preview: "Hi, I'd like to schedule our Q4 budget review for next week...",
      priority: "high",
      category: "meeting",
      time: "2 min ago",
      unread: true
    },
    {
      id: 2,
      from: "newsletter@techcrunch.com",
      subject: "Daily Tech News Digest",
      preview: "Today's top stories: AI breakthrough, startup funding...",
      priority: "low",
      category: "newsletter",
      time: "1 hour ago",
      unread: true
    },
    {
      id: 3,
      from: "john.smith@client.com",
      subject: "Project Update Required",
      preview: "Can you send me the latest project status by EOD?",
      priority: "high",
      category: "work",
      time: "3 hours ago",
      unread: false
    },
    {
      id: 4,
      from: "team@slack.com",
      subject: "Weekly Digest",
      preview: "Here's what happened in your workspace this week...",
      priority: "low",
      category: "notification",
      time: "1 day ago",
      unread: false
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500/20 text-red-300 border-red-400/30";
      case "medium": return "bg-yellow-500/20 text-yellow-300 border-yellow-400/30";
      case "low": return "bg-gray-500/20 text-gray-300 border-gray-400/30";
      default: return "bg-gray-500/20 text-gray-300 border-gray-400/30";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "meeting": return <Clock className="w-3 h-3" />;
      case "work": return <Mail className="w-3 h-3" />;
      case "newsletter": return <Archive className="w-3 h-3" />;
      default: return <Mail className="w-3 h-3" />;
    }
  };

  return (
    <Card className="p-6 bg-black/20 backdrop-blur-xl border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Inbox</h3>
        <Badge variant="outline" className="text-blue-200 border-blue-400/30">
          {mockEmails.filter(email => email.unread).length} unread
        </Badge>
      </div>
      
      <div className="space-y-3">
        {mockEmails.map((email, index) => (
          <div
            key={email.id}
            onClick={() => setCurrentEmail(email)}
            className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:bg-white/10 ${
              email.unread 
                ? "bg-blue-500/10 border-blue-400/30" 
                : "bg-black/10 border-white/10"
            } ${
              index < processedEmails ? "opacity-50" : ""
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getCategoryIcon(email.category)}
                <span className="text-white font-medium text-sm truncate">{email.from}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getPriorityColor(email.priority)} variant="outline">
                  {email.priority}
                </Badge>
                <span className="text-gray-400 text-xs">{email.time}</span>
              </div>
            </div>
            
            <h4 className="text-white text-sm font-medium mb-1 truncate">{email.subject}</h4>
            <p className="text-gray-400 text-xs line-clamp-2">{email.preview}</p>
            
            {index < processedEmails && (
              <div className="mt-2 flex items-center space-x-1 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-xs">Processed</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};
