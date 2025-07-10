
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [appointmentRequests, setAppointmentRequests] = useState([
    {
      id: 1,
      patient: "John Smith",
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "2024-01-15",
      time: "10:00 AM",
      reason: "Chest pain and shortness of breath",
      status: "Pending Admin Review",
      requestDate: "2024-01-10"
    },
    {
      id: 2,
      patient: "Maria Garcia",
      doctor: "Dr. Michael Chen",
      specialty: "Dermatology",
      date: "2024-01-15",
      time: "2:30 PM",
      reason: "Skin rash on arms",
      status: "Pending Admin Review",
      requestDate: "2024-01-10"
    },
    {
      id: 3,
      patient: "David Wilson",
      doctor: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      date: "2024-01-16",
      time: "9:00 AM",
      reason: "Routine check-up for child",
      status: "Approved",
      requestDate: "2024-01-09"
    },
  ]);

  const handleApprovalAction = (requestId: number, action: 'approve' | 'reject') => {
    setAppointmentRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: action === 'approve' ? 'Approved' : 'Rejected' }
          : req
      )
    );

    const actionText = action === 'approve' ? 'approved' : 'rejected';
    toast({
      title: `Appointment ${actionText.charAt(0).toUpperCase() + actionText.slice(1)}`,
      description: `The appointment request has been ${actionText} and the doctor has been notified.`,
    });
  };

  const pendingRequests = appointmentRequests.filter(req => req.status === 'Pending Admin Review');
  const approvedRequests = appointmentRequests.filter(req => req.status === 'Approved');
  const rejectedRequests = appointmentRequests.filter(req => req.status === 'Rejected');

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointmentRequests.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingRequests.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting action</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{approvedRequests.length}</div>
            <p className="text-xs text-muted-foreground">Sent to doctors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{rejectedRequests.length}</div>
            <p className="text-xs text-muted-foreground">Not approved</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-yellow-600" />
            Pending Appointment Requests
          </CardTitle>
          <CardDescription>
            Review and approve appointment requests before they're sent to doctors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingRequests.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No pending requests to review
              </div>
            ) : (
              pendingRequests.map((request) => (
                <div key={request.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">{request.patient}</span>
                        <span className="text-gray-400">→</span>
                        <span className="font-medium">{request.doctor}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {request.specialty}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        {request.date}
                        <Clock className="h-4 w-4 ml-3 mr-1" />
                        {request.time}
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      Pending Review
                    </Badge>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm">
                      <strong>Reason for visit:</strong> {request.reason}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Requested on: {request.requestDate}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleApprovalAction(request.id, 'approve')}
                      className="flex items-center bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve & Send to Doctor
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleApprovalAction(request.id, 'reject')}
                      className="flex items-center text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject Request
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">Recent Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {approvedRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{request.patient} → {request.doctor}</p>
                    <p className="text-xs text-gray-600">{request.date} at {request.time}</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Approved
                  </Badge>
                </div>
              ))}
              {approvedRequests.length === 0 && (
                <div className="text-center py-4 text-gray-500 text-sm">
                  No approved requests yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Recent Rejections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {rejectedRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{request.patient} → {request.doctor}</p>
                    <p className="text-xs text-gray-600">{request.date} at {request.time}</p>
                  </div>
                  <Badge variant="secondary" className="bg-red-100 text-red-800">
                    Rejected
                  </Badge>
                </div>
              ))}
              {rejectedRequests.length === 0 && (
                <div className="text-center py-4 text-gray-500 text-sm">
                  No rejected requests yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
