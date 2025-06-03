
import { Card } from "@/components/ui/card";
import { Calendar, Clock, Users, MapPin, Video } from "lucide-react";

export const CalendarPanel = () => {
  const upcomingMeetings = [
    {
      id: 1,
      title: "Team Standup",
      time: "9:00 AM",
      duration: "30m",
      attendees: 5,
      type: "video",
      status: "confirmed"
    },
    {
      id: 2,
      title: "Client Presentation",
      time: "2:00 PM",
      duration: "1h",
      attendees: 3,
      type: "in-person",
      location: "Conference Room B",
      status: "auto-scheduled"
    },
    {
      id: 3,
      title: "1:1 with Sarah",
      time: "4:30 PM",
      duration: "45m",
      attendees: 2,
      type: "video",
      status: "ai-suggested"
    }
  ];

  const aiInsights = [
    "Optimal focus time: 10:00 AM - 12:00 PM",
    "Travel buffer added before client meeting",
    "Declined 2 conflicting invites automatically"
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "text-green-400 bg-green-500/10 border-green-400/30";
      case "auto-scheduled": return "text-blue-400 bg-blue-500/10 border-blue-400/30";
      case "ai-suggested": return "text-purple-400 bg-purple-500/10 border-purple-400/30";
      default: return "text-gray-400 bg-gray-500/10 border-gray-400/30";
    }
  };

  return (
    <Card className="p-6 bg-black/20 backdrop-blur-xl border border-white/20">
      <h3 className="text-lg font-semibold text-white mb-4">Smart Calendar</h3>
      
      <div className="space-y-4">
        {/* Today's Schedule */}
        <div>
          <h4 className="text-sm font-medium text-blue-200 mb-3">Today's Schedule</h4>
          <div className="space-y-3">
            {upcomingMeetings.map((meeting) => (
              <div key={meeting.id} className="p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-start justify-between mb-2">
                  <h5 className="text-white text-sm font-medium">{meeting.title}</h5>
                  <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(meeting.status)}`}>
                    {meeting.status}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-gray-300 text-xs">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{meeting.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{meeting.attendees}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {meeting.type === "video" ? (
                      <Video className="w-3 h-3" />
                    ) : (
                      <MapPin className="w-3 h-3" />
                    )}
                    <span>{meeting.location || "Video call"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Calendar Insights */}
        <div>
          <h4 className="text-sm font-medium text-purple-200 mb-3">AI Insights</h4>
          <div className="space-y-2">
            {aiInsights.map((insight, index) => (
              <div key={index} className="flex items-start space-x-2 p-2 bg-purple-500/10 rounded border border-purple-400/20">
                <Calendar className="w-3 h-3 text-purple-400 mt-0.5 flex-shrink-0" />
                <span className="text-purple-100 text-xs">{insight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="pt-4 border-t border-white/10">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-white">3</p>
              <p className="text-xs text-gray-400">Meetings</p>
            </div>
            <div>
              <p className="text-lg font-bold text-white">4h</p>
              <p className="text-xs text-gray-400">Focus Time</p>
            </div>
            <div>
              <p className="text-lg font-bold text-white">2</p>
              <p className="text-xs text-gray-400">Auto-handled</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
