
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Plus, Ship, Plane } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Itinerary = Database["public"]["Tables"]["itineraries"]["Row"];
type ItineraryData = {
  image?: string;
  summary?: string;
  [key: string]: any;
};

const TripsPage = () => {
  const { user, loading } = useAuth();
  const [trips, setTrips] = useState<Itinerary[]>([]);
  const [loadingTrips, setLoadingTrips] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    async function fetchTrips() {
      if (!user) return setTrips([]);
      setLoadingTrips(true);
      const { data, error } = await supabase
        .from("itineraries")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (!error && data) setTrips(data);
      setLoadingTrips(false);
    }
    fetchTrips();
  }, [user]);

  // Grouping and tab logic
  const now = new Date();
  const isUpcoming = (itinerary: Itinerary) =>
    itinerary.date_start && new Date(itinerary.date_start) > now;

  const isPast = (itinerary: Itinerary) =>
    itinerary.date_end && new Date(itinerary.date_end) < now;

  const upcomingTrips = trips.filter((t) => t.date_start && isUpcoming(t));
  const pastTrips = trips.filter((t) => t.date_end && isPast(t));
  const planningTrips = trips.filter(
    (t) => (!t.date_start || now <= new Date(t.date_start)) && !isPast(t)
  );

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
          {/* All */}
          <TabsContent value="all" className="mt-6">
            <TripGrid loading={loadingTrips} trips={trips} />
          </TabsContent>
          {/* Upcoming */}
          <TabsContent value="upcoming" className="mt-6">
            <TripGrid loading={loadingTrips} trips={upcomingTrips} emptyText="No upcoming trips. Plan your next adventure!" />
          </TabsContent>
          {/* Planning */}
          <TabsContent value="planning" className="mt-6">
            <TripGrid loading={loadingTrips} trips={planningTrips} emptyText="No trips in planning. Start a new trip!" />
          </TabsContent>
          {/* Past */}
          <TabsContent value="past" className="mt-6">
            <TripGrid loading={loadingTrips} trips={pastTrips} emptyText="No past trips saved." />
          </TabsContent>
        </Tabs>
      </main>
      <footer className="bg-muted/30 border-t py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">&copy; 2025 Voyage Whisperer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

function TripGrid({
  loading,
  trips,
  emptyText = "No trips yet.",
}: {
  loading: boolean;
  trips: Itinerary[];
  emptyText?: string;
}) {
  if (loading) {
    return <div className="col-span-full text-center py-12">Loading...</div>;
  }
  if (!trips || trips.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-muted-foreground">{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
}

type TripProps = {
  trip: Itinerary;
};

const TripCard = ({ trip }: TripProps) => {
  // Safely cast the JSON data field to our ItineraryData type with expected properties
  const tripData = trip.data as ItineraryData | null;
  
  // Provide placeholder image if not present
  const img =
    tripData?.image ||
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
  return (
    <Card className="overflow-hidden card-hover">
      <div
        className="h-40 bg-center bg-cover"
        style={{ backgroundImage: `url(${img})` }}
      />

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{trip.title}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin size={14} className="mr-1" /> {trip.destination}
            </CardDescription>
          </div>
          <div className="px-2 py-1 rounded-full text-xs font-medium bg-ocean-100 text-ocean-700">
            {trip.type ? trip.type : "itinerary"}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center">
          <Calendar size={14} className="text-muted-foreground mr-1" />
          <span className="text-sm text-muted-foreground">
            {(trip.date_start ? trip.date_start : "TBD") +
              (trip.date_end ? ` - ${trip.date_end}` : "")}
          </span>
        </div>

        {tripData?.summary && (
          <div className="mt-1 text-xs text-muted-foreground">{tripData.summary}</div>
        )}

        <div className="flex items-center mt-1">
          {trip.type === 'cruise' ? (
            <Ship size={14} className="text-muted-foreground mr-1" />
          ) : (
            <Plane size={14} className="text-muted-foreground mr-1" />
          )}
          <span className="text-sm text-muted-foreground capitalize">{trip.type || "itinerary"}</span>
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
