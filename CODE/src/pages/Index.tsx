
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Shield, ArrowRight } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import PatientDashboard from "@/components/dashboards/PatientDashboard";
import DoctorDashboard from "@/components/dashboards/DoctorDashboard";
import AdminDashboard from "@/components/dashboards/AdminDashboard";

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'login' | 'register'>('home');
  const [user, setUser] = useState<{name: string, role: 'patient' | 'doctor' | 'admin'} | null>(null);

  const handleLogin = (userData: {name: string, role: 'patient' | 'doctor' | 'admin'}) => {
    setUser(userData);
    setCurrentView('home');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('home');
  };

  if (user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-blue-600">DocSpot</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full capitalize">
                  {user.role}
                </span>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {user.role === 'patient' && <PatientDashboard />}
          {user.role === 'doctor' && <DoctorDashboard />}
          {user.role === 'admin' && <AdminDashboard />}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-blue-600">DocSpot</h1>
              <p className="ml-4 text-gray-600">Your Healthcare Connection Hub</p>
            </div>
            <div className="space-x-4">
              <Button 
                onClick={() => setCurrentView('login')} 
                variant="outline"
                className="bg-white"
              >
                Login
              </Button>
              <Button onClick={() => setCurrentView('register')}>
                Register
              </Button>
            </div>
          </div>
        </header>

        {currentView === 'home' && (
          <main className="py-12">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-900 mb-4">
                Connect with Healthcare Professionals
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                DocSpot bridges the gap between patients and doctors with a streamlined appointment booking system, 
                comprehensive admin oversight, and seamless healthcare management.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle>For Patients</CardTitle>
                  <CardDescription>
                    Browse and book appointments with qualified doctors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Browse verified doctors</li>
                    <li>• Filter by specialization</li>
                    <li>• Book appointments easily</li>
                    <li>• Track appointment status</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Calendar className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <CardTitle>For Doctors</CardTitle>
                  <CardDescription>
                    Manage appointments and showcase your expertise
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• View appointment requests</li>
                    <li>• Accept or decline bookings</li>
                    <li>• Share specializations</li>
                    <li>• Manage your profile</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <CardTitle>For Admins</CardTitle>
                  <CardDescription>
                    Oversee and approve all appointment requests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Review appointment requests</li>
                    <li>• Approve or reject bookings</li>
                    <li>• Manage user accounts</li>
                    <li>• System oversight</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button 
                onClick={() => setCurrentView('register')} 
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
              >
                Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </main>
        )}

        {currentView === 'login' && (
          <div className="flex justify-center py-12">
            <LoginForm onLogin={handleLogin} onSwitchToRegister={() => setCurrentView('register')} />
          </div>
        )}

        {currentView === 'register' && (
          <div className="flex justify-center py-12">
            <RegisterForm onRegister={handleLogin} onSwitchToLogin={() => setCurrentView('login')} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
