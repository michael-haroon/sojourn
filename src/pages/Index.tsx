
import Navbar from "@/components/Navbar";
import ChatInterface from "@/components/ChatInterface";
import { Button } from "@/components/ui/button";
import { Calendar, Search, MapPin, Settings } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-2 md:px-4 py-6 md:py-8">
        <div className="max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-center gradient-text mb-4">
            Sojourn
          </h1>
          <p className="text-center text-lg text-muted-foreground mb-8">
            Your AI-powered travel companion that finds and plans entire trips for you
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-background rounded-lg p-5 shadow-md border card-hover">
              <div className="flex items-center mb-3">
                <div className="bg-ocean-100 p-2 rounded-full text-ocean-700 mr-3">
                  <Search size={20} />
                </div>
                <h3 className="font-medium">Smart Planning</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Just describe your goals or give your dates—Sojourn handles the rest and checks the internet for fresh recommendations.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-5 shadow-md border card-hover">
              <div className="flex items-center mb-3">
                <div className="bg-forest-100 p-2 rounded-full text-forest-700 mr-3">
                  <Calendar size={20} />
                </div>
                <h3 className="font-medium">Complete Itineraries</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Find actual vacations and book flights, hotels, and everything else with a few messages.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-5 shadow-md border card-hover">
              <div className="flex items-center mb-3">
                <div className="bg-sunset-100 p-2 rounded-full text-sunset-700 mr-3">
                  <MapPin size={20} />
                </div>
                <h3 className="font-medium">Stress-Free Travel</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Sojourn accounts for travel time, delays, language help, and your unique needs.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-muted/30 rounded-xl p-3 md:p-8 border">
          <ChatInterface />
        </div>
      </main>
      
      <footer className="bg-muted/30 border-t py-6">
        <div className="container mx-auto px-2 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2025 Sojourn. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
