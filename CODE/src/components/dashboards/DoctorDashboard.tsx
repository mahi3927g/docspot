
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DoctorDashboard = () => {
  const { toast } = useToast();
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: "John Smith",
      date: "2024-01-15",
      time: "10:00 AM",
      reason: "Chest pain and shortness of breath",
      status: "Pending",
      adminApproved: true
    },
    {
      id: 2,
      patient: "Maria Garcia",
      date: "2024-01-15",
      time: "2:30 PM",
      reason: "Skin rash on arms",
      status: "Pending",
      adminApproved: true
    },
    {
      id: 3,
      patient: "David Wilson",
      date: "2024-01-16",
      time: "9:00 AM",
      reason: "Routine check-up",
      status: "Confirmed",
      adminApproved: true
    },
  ]);

  const handleAppointmentAction = (appointmentId: number, action: 'accept' | 'decline') => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: action === 'accept' ? 'Confirmed' : 'Declined' }
          : apt
      )
    );

    toast({
      title: action === 'accept' ? "Appointment Accepted" : "Appointment Declined",
      description: `You have ${action}ed the appointment request.`,
    });
  };

  const pendingAppointments = appointments.filter(apt => apt.status === 'Pending' && apt.adminApproved);
  const confirmedAppointments = appointments.filter(apt => apt.status === 'Confirmed');
  const todaysAppointments = appointments.filter(apt => apt.date === new Date().toISOString().split('T')[0]);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{todaysAppointments.length}</div>
              <div className="text-sm text-gray-600">Scheduled Today</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">{pendingAppointments.length}</div>
              <div className="text-sm text-gray-600">Awaiting Response</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Confirmed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{confirmedAppointments.length}</div>
              <div className="text-sm text-gray-600">Confirmed Appointments</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Appointment Requests
          </CardTitle>
          <CardDescription>
            Review and respond to patient appointment requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingAppointments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No pending appointment requests
              </div>
            ) : (
              pendingAppointments.map((appointment) => (
                <div key={appointment.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{appointment.patient}</h3>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        {appointment.date}
                        <Clock className="h-4 w-4 ml-3 mr-1" />
                        {appointment.time}
                      </div>
                    </div>
                    <Badge variant="secondary">Admin Approved</Badge>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-700">
                      <strong>Reason:</strong> {appointment.reason}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleAppointmentAction(appointment.id, 'accept')}
                      className="flex items-center"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Accept
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleAppointmentAction(appointment.id, 'decline')}
                      className="flex items-center"
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Decline
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Schedule</CardTitle>
          <CardDescription>
            Overview of your confirmed appointments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {confirmedAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium">{appointment.patient}</p>
                  <p className="text-sm text-gray-600">
                    {appointment.date} at {appointment.time}
                  </p>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Confirmed
                </Badge>
              </div>
            ))}
            {confirmedAppointments.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No confirmed appointments yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorDashboard;
