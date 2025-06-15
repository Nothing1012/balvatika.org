
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, BookOpen, MessageSquare, Settings, LogOut, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AdminDashboard = ({ username, onLogout }) => {
  const [requests, setRequests] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load requests from localStorage
    const savedRequests = localStorage.getItem('balvatika_requests');
    if (savedRequests) {
      setRequests(JSON.parse(savedRequests));
    } else {
      // Demo data
      const demoRequests = [
        {
          id: 1,
          studentName: 'Arjun Sharma',
          grade: '3rd Grade',
          subject: 'Mathematics',
          message: 'Need extra help with multiplication tables',
          status: 'pending',
          submittedBy: 'manager1',
          timestamp: new Date().toISOString()
        },
        {
          id: 2,
          studentName: 'Priya Patel',
          grade: '5th Grade',
          subject: 'English',
          message: 'Struggling with essay writing',
          status: 'approved',
          submittedBy: 'manager2',
          timestamp: new Date(Date.now() - 86400000).toISOString()
        }
      ];
      setRequests(demoRequests);
      localStorage.setItem('balvatika_requests', JSON.stringify(demoRequests));
    }
  }, []);

  const handleRequestAction = (requestId, action) => {
    const updatedRequests = requests.map(request => 
      request.id === requestId 
        ? { ...request, status: action }
        : request
    );
    
    setRequests(updatedRequests);
    localStorage.setItem('balvatika_requests', JSON.stringify(updatedRequests));
    
    toast({
      title: `Request ${action}! ✅`,
      description: `Student request has been ${action} successfully.`,
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const stats = [
    { title: 'Total Students', value: '156', icon: Users, color: 'from-blue-500 to-blue-600' },
    { title: 'Active Classes', value: '12', icon: BookOpen, color: 'from-green-500 to-green-600' },
    { title: 'Pending Requests', value: requests.filter(r => r.status === 'pending').length.toString(), icon: MessageSquare, color: 'from-yellow-500 to-yellow-600' },
    { title: 'Approved Today', value: requests.filter(r => r.status === 'approved' && new Date(r.timestamp).toDateString() === new Date().toDateString()).length.toString(), icon: CheckCircle, color: 'from-purple-500 to-purple-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Balvatika Admin</h1>
                <p className="text-sm text-gray-500">Welcome back, {username}!</p>
              </div>
            </div>
            <Button
              onClick={onLogout}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Requests Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Student Requests</span>
              </CardTitle>
              <CardDescription>
                Manage and respond to student assistance requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {requests.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No requests found
                  </div>
                ) : (
                  requests.map((request) => (
                    <motion.div
                      key={request.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{request.studentName}</h3>
                            <Badge variant="outline">{request.grade}</Badge>
                            <Badge variant="secondary">{request.subject}</Badge>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(request.status)}
                              <Badge className={`${getStatusColor(request.status)} text-white`}>
                                {request.status}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-2">{request.message}</p>
                          <div className="text-sm text-gray-500">
                            Submitted by: {request.submittedBy} • {new Date(request.timestamp).toLocaleDateString()}
                          </div>
                        </div>
                        {request.status === 'pending' && (
                          <div className="flex space-x-2 ml-4">
                            <Button
                              size="sm"
                              onClick={() => handleRequestAction(request.id, 'approved')}
                              className="bg-green-500 hover:bg-green-600"
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleRequestAction(request.id, 'rejected')}
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                  onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
                >
                  <Users className="w-6 h-6" />
                  <span>Manage Students</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                  onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
                >
                  <BookOpen className="w-6 h-6" />
                  <span>Class Schedule</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                  onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
                >
                  <Settings className="w-6 h-6" />
                  <span>System Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
