
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send, User, Calendar, MapPin } from "lucide-react";

type Message = {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
};

type ItineraryStep = {
  type: 'flight' | 'hotel' | 'transportation' | 'activity';
  title: string;
  date: string;
  time: string;
  description: string;
  location?: string;
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'assistant',
      text: "Hello! I'm your Voyage Whisperer assistant. Tell me about your travel plans, and I'll help you schedule everything - from flights and transportation to hotels and activities. What are you planning?",
      timestamp: new Date(),
    },
  ]);
  
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showItinerary, setShowItinerary] = useState(false);
  const [currentItinerary, setCurrentItinerary] = useState<ItineraryStep[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // In a real app, this would be an API call to your AI service
      processUserInput(userMessage.text);
    }, 1500);
  };

  const processUserInput = (userText: string) => {
    let responseText = '';
    
    // Simple demonstration of how the AI might respond based on keywords
    const lowerCaseText = userText.toLowerCase();
    
    if (lowerCaseText.includes('cruise') || lowerCaseText.includes('seattle')) {
      responseText = "I see you're planning a cruise from Seattle! Let me help you with that. I'll need some details to create your perfect itinerary:";
      
      // Simulate creating an itinerary after receiving cruise information
      if (lowerCaseText.includes('june 14') && lowerCaseText.includes('princess cruise')) {
        // Generate a demo itinerary
        const newItinerary: ItineraryStep[] = [
          {
            type: 'flight',
            title: 'Flight to Seattle',
            date: 'June 13, 2025',
            time: '10:30 AM - 1:15 PM',
            description: 'Alaska Airlines Flight AS123 from LAX to SEA',
            location: 'Los Angeles International Airport (LAX)'
          },
          {
            type: 'transportation',
            title: 'Airport Transfer',
            date: 'June 13, 2025',
            time: '1:45 PM - 2:30 PM',
            description: 'Pre-booked shuttle from Seattle Airport to Hotel',
            location: 'Seattle-Tacoma International Airport'
          },
          {
            type: 'hotel',
            title: 'Hotel Stay',
            date: 'June 13, 2025',
            time: 'Check-in: 3:00 PM',
            description: 'Reservation at Seattle Waterfront Hotel',
            location: 'Downtown Seattle'
          },
          {
            type: 'transportation',
            title: 'Hotel to Cruise Port',
            date: 'June 14, 2025',
            time: '12:30 PM - 1:00 PM',
            description: 'Pre-arranged taxi to cruise terminal',
            location: 'Seattle Cruise Terminal'
          },
          {
            type: 'activity',
            title: 'Princess Cruise Boarding',
            date: 'June 14, 2025',
            time: '1:00 PM - 3:00 PM',
            description: 'Check-in and boarding process',
            location: 'Seattle Cruise Terminal'
          },
          {
            type: 'activity',
            title: 'Princess Cruise',
            date: 'June 14-21, 2025',
            time: 'Departure: 3:00 PM (June 14)',
            description: '7-day Alaska Cruise',
            location: 'Alaska Route'
          },
          {
            type: 'transportation',
            title: 'Cruise Terminal to Airport',
            date: 'June 21, 2025',
            time: '8:00 AM - 9:00 AM',
            description: 'Pre-arranged shuttle service',
            location: 'Seattle Cruise Terminal'
          },
          {
            type: 'flight',
            title: 'Flight to Los Angeles',
            date: 'June 21, 2025',
            time: '11:45 AM - 2:30 PM',
            description: 'Alaska Airlines Flight AS456 from SEA to LAX',
            location: 'Seattle-Tacoma International Airport (SEA)'
          }
        ];
        
        setCurrentItinerary(newItinerary);
        setShowItinerary(true);
        
        responseText = "Based on your Princess Cruise departing Seattle on June 14th at 3PM and returning June 21st at 7AM, I've created a complete itinerary for you. I've scheduled flights from LA, pre-cruise accommodation, and all necessary transfers. Would you like to review and confirm this itinerary?";
      } else {
        responseText = "I see you're planning a cruise! To create your personalized itinerary, I need a few more details: \n\n1. What are the exact dates and times of your cruise? \n2. Which city are you departing from? \n3. Do you prefer morning or evening flights? \n4. Would you like to stay at a hotel before your cruise?";
      }
    } else if (lowerCaseText.includes('flight') || lowerCaseText.includes('hotel')) {
      responseText = "I'd be happy to help you book flights and hotels. Could you please provide more details about your destination, travel dates, and any preferences you have?";
    } else {
      responseText = "Thanks for sharing your travel plans. I'd be happy to help organize your itinerary. Could you provide more details about your destination, travel dates, and any specific requirements you have?";
    }
    
    // Add AI response
    const aiMessage: Message = {
      id: Date.now().toString(),
      sender: 'assistant',
      text: responseText,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, aiMessage]);
    setIsProcessing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row h-[calc(100vh-6rem)] gap-4">
      <div className="flex-1 flex flex-col">
        <Card className="flex-1 flex flex-col p-4 overflow-hidden">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="whitespace-pre-line">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your travel plans... (e.g., 'I have a Princess cruise in Seattle on June 14th...')"
              className="resize-none min-h-[60px] input-focus"
              disabled={isProcessing}
            />
            <Button
              onClick={handleSendMessage}
              className="bg-primary h-[60px] px-4"
              disabled={isProcessing || !input.trim()}
            >
              <Send size={18} />
            </Button>
          </div>
        </Card>
      </div>

      {/* Itinerary Panel */}
      <div className={`lg:w-[450px] transition-all duration-300 overflow-hidden ${showItinerary ? 'flex-shrink-0' : 'lg:w-0'}`}>
        {showItinerary && (
          <Card className="p-4 h-full overflow-y-auto">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-center gradient-text">Your Itinerary</h2>
              <p className="text-center text-muted-foreground">Princess Cruise - June 2025</p>
            </div>
            
            <div className="space-y-4">
              {currentItinerary.map((item, index) => (
                <Card key={index} className="p-3 card-hover border-l-4 border-l-primary">
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 p-2 rounded-full 
                      ${item.type === 'flight' ? 'bg-ocean-100 text-ocean-700' : ''}
                      ${item.type === 'hotel' ? 'bg-forest-100 text-forest-700' : ''}
                      ${item.type === 'transportation' ? 'bg-sunset-100 text-sunset-700' : ''}
                      ${item.type === 'activity' ? 'bg-primary/10 text-primary' : ''}
                    `}>
                      {item.type === 'flight' && <Calendar size={18} />}
                      {item.type === 'hotel' && <User size={18} />}
                      {item.type === 'transportation' || item.type === 'activity' && <MapPin size={18} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{item.title}</h3>
                        <span className="text-xs bg-muted px-2 py-1 rounded-full">
                          {item.type}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                      <p className="text-sm font-medium">{item.time}</p>
                      <p className="text-sm mt-1">{item.description}</p>
                      {item.location && (
                        <p className="text-xs flex items-center mt-1 text-muted-foreground">
                          <MapPin size={12} className="mr-1" /> {item.location}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
              
              <div className="mt-6 space-y-3">
                <Button className="w-full bg-gradient-to-r from-ocean-500 to-forest-500 hover:opacity-90">
                  Confirm & Book Itinerary
                </Button>
                <Button variant="outline" className="w-full">
                  Request Changes
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
