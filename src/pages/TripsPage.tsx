
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Plus, Ship, Plane } from "lucide-react";
import { Link } from "react-router-dom";

// Sample trip data
const sampleTrips = [
  {
    id: '1',
    title: 'Alaska Princess Cruise',
    destination: 'Alaska',
    dateRange: 'June 14-21, 2025',
    status: 'upcoming',
    type: 'cruise',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: '2',
    title: 'Europe Vacation',
    destination: 'Paris, Rome, Barcelona',
    dateRange: 'August 10-24, 2025',
    status: 'planning',
    type: 'flight',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80'
  },
  {
    id: '3',
    title: 'Weekend in San Francisco',
    destination: 'San Francisco, CA',
    dateRange: 'May 5-7, 2025',
    status: 'planning',
    type: 'flight',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80'
  },
  {
    id: '4',
    title: 'Caribbean Getaway',
    destination: 'Bahamas',
    dateRange: 'December 20-27, 2024',
    status: 'past',
    type: 'cruise',
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2039&q=80'
  }
];

const TripsPage = () => {
  // Filter trips by status
  const upcomingTrips = sampleTrips.filter(trip => trip.status === 'upcoming');
  const planningTrips = sampleTrips.filter(trip => trip.status === 'planning');
  const pastTrips = sampleTrips.filter(trip => trip.status === 'past');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">My Trips</h1>
            <p className="text-muted-foreground">Manage and view all your travel plans</p>
          </div>
          
          <Link to="/">
            <Button className="bg-gradient-to-r from-ocean-500 to-forest-500 hover:opacity-90">
              <Plus size={16} className="mr-2" /> Plan New Trip
            </Button>
          </Link>
        </div>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All Trips</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="planning">Planning</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingTrips.length > 0 ? (
                upcomingTrips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No upcoming trips. Time to plan your next adventure!</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="planning" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {planningTrips.length > 0 ? (
                planningTrips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No trips in planning. Start a new trip on the home page!</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="past" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastTrips.length > 0 ? (
                pastTrips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No past trips saved in your account.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-muted/30 border-t py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2025 Voyage Whisperer. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

type TripProps = {
  trip: {
    id: string;
    title: string;
    destination: string;
    dateRange: string;
    status: string;
    type: string;
    image: string;
  };
};

const TripCard = ({ trip }: TripProps) => {
  return (
    <Card className="overflow-hidden card-hover">
      <div
        className="h-40 bg-center bg-cover"
        style={{ backgroundImage: `url(${trip.image})` }}
      />
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{trip.title}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin size={14} className="mr-1" /> {trip.destination}
            </CardDescription>
          </div>
          
          <div className={`
            px-2 py-1 rounded-full text-xs font-medium
            ${trip.status === 'upcoming' ? 'bg-ocean-100 text-ocean-700' : ''}
            ${trip.status === 'planning' ? 'bg-forest-100 text-forest-700' : ''}
            ${trip.status === 'past' ? 'bg-muted text-muted-foreground' : ''}
          `}>
            {trip.status}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex items-center">
          <Calendar size={14} className="text-muted-foreground mr-1" />
          <span className="text-sm text-muted-foreground">{trip.dateRange}</span>
        </div>
        
        <div className="flex items-center mt-1">
          {trip.type === 'cruise' ? (
            <Ship size={14} className="text-muted-foreground mr-1" />
          ) : (
            <Plane size={14} className="text-muted-foreground mr-1" />
          )}
          <span className="text-sm text-muted-foreground capitalize">{trip.type}</span>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button variant="outline" className="w-full">
          View Itinerary
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TripsPage;
