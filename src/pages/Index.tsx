
import { useState, useEffect } from "react";
import { VoiceInterface } from "@/components/VoiceInterface";
import { EmailList } from "@/components/EmailList";
import { StatsPanel } from "@/components/StatsPanel";
import { TasksPanel } from "@/components/TasksPanel";
import { CalendarPanel } from "@/components/CalendarPanel";
import { Header } from "@/components/Header";

const Index = () => {
  const [isListening, setIsListening] = useState(false);
  const [currentEmail, setCurrentEmail] = useState(null);
  const [processedEmails, setProcessedEmails] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [activeTab, setActiveTab] = useState("email");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      <div className="relative min-h-screen">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        
        <Header />
        
        <main className="relative z-10 px-4 py-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Voice Interface - Main Column */}
            <div className="lg:col-span-2">
              <VoiceInterface 
                isListening={isListening}
                setIsListening={setIsListening}
                currentEmail={currentEmail}
                setCurrentEmail={setCurrentEmail}
                processedEmails={processedEmails}
                setProcessedEmails={setProcessedEmails}
                completedTasks={completedTasks}
                setCompletedTasks={setCompletedTasks}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>
            
            {/* Dashboard Sidebar */}
            <div className="space-y-6">
              <StatsPanel 
                processedEmails={processedEmails} 
                completedTasks={completedTasks}
              />
              
              {activeTab === "email" && (
                <EmailList 
                  setCurrentEmail={setCurrentEmail}
                  processedEmails={processedEmails}
                />
              )}
              
              {activeTab === "tasks" && (
                <TasksPanel 
                  completedTasks={completedTasks}
                  setCompletedTasks={setCompletedTasks}
                />
              )}
              
              {activeTab === "calendar" && (
                <CalendarPanel />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
