
import { Brain, Settings, CheckCircle } from "lucide-react";

export const Header = () => {
  return (
    <header className="relative z-20 px-4 py-4 bg-black/10 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl shadow-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">DoneFor.Me</h1>
            <p className="text-purple-200 text-sm">From to-do → done. Autonomously.</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-2 bg-green-500/20 rounded-lg border border-green-400/30">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-green-200 text-sm">AI Active</span>
          </div>
          <button className="p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200">
            <Settings className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
};
