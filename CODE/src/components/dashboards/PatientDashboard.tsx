
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, User, MapPin, Search } from "lucide-react";
import BookingModal from "@/components/modals/BookingModal";

const PatientDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      location: "Downtown Medical Center",
      experience: "15 years",
      rating: 4.8,
      bio: "Specialized in heart disease prevention and treatment with extensive experience in cardiac surgery."
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Dermatology",
      location: "Westside Clinic",
      experience: "10 years",
      rating: 4.9,
      bio: "Expert in skin conditions, cosmetic dermatology, and dermatological surgery."
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      location: "Children's Hospital",
      experience: "12 years",
      rating: 4.7,
      bio: "Dedicated to providing comprehensive healthcare for children and adolescents."
    },
  ];

  const appointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      date: "2024-01-15",
      time: "10:00 AM",
      status: "Pending Admin Approval",
      statusColor: "bg-yellow-100 text-yellow-800"
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      date: "2024-01-20",
      time: "2:30 PM",
      status: "Confirmed",
      statusColor: "bg-green-100 text-green-800"
    },
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const handleBookAppointment = (doctor: any) => {
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              My Appointments
            </CardTitle>
            <CardDescription>
              Track your upcoming and past appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{appointment.doctor}</p>
                    <p className="text-sm text-gray-600">
                      {appointment.date} at {appointment.time}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${appointment.statusColor}`}>
                    {appointment.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">2</div>
                <div className="text-sm text-gray-600">Total Appointments</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">1</div>
                <div className="text-sm text-gray-600">Confirmed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="h-5 w-5 mr-2" />
            Find a Doctor
          </CardTitle>
          <CardDescription>
            Browse and book appointments with qualified doctors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Input
              placeholder="Search doctors or specialties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Specialties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                <SelectItem value="Cardiology">Cardiology</SelectItem>
                <SelectItem value="Dermatology">Dermatology</SelectItem>
                <SelectItem value="Pediatrics">Pediatrics</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDoctors.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2 text-blue-600" />
                    {doctor.name}
                  </CardTitle>
                  <CardDescription>{doctor.specialty}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {doctor.location}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      {doctor.experience}
                    </div>
                    <div className="text-yellow-600 font-medium">
                      ⭐ {doctor.rating}/5.0
                    </div>
                    <p className="text-gray-600 text-xs mt-2">{doctor.bio}</p>
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    onClick={() => handleBookAppointment(doctor)}
                  >
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {showBookingModal && selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
};

export default PatientDashboard;
