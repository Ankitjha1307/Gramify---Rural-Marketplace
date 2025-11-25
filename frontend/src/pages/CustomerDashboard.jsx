import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ShoppingBag, Calendar, DollarSign, Package } from 'lucide-react';
import api from '../lib/api';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/bookings');
      setBookings(response.data.bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      confirmed: 'secondary',
      'in-progress': 'default',
      completed: 'success',
      cancelled: 'danger',
    };
    return colors[status] || 'secondary';
  };

  const totalSpent = bookings
    .filter(b => b.paymentStatus === 'paid' || b.paymentStatus === 'released')
    .reduce((sum, b) => sum + b.amount, 0);

  const activeBookings = bookings.filter(
    b => b.status === 'confirmed' || b.status === 'in-progress'
  ).length;

  const completedBookings = bookings.filter(b => b.status === 'completed').length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Customer Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {user.name}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold mt-1">{bookings.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <ShoppingBag size={24} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Bookings</p>
                  <p className="text-2xl font-bold mt-1">{activeBookings}</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Calendar size={24} className="text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold mt-1">{completedBookings}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Package size={24} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold mt-1">₹{totalSpent}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <DollarSign size={24} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/browse" className="flex-1">
                <Button className="w-full">Browse Services</Button>
              </Link>
              <Button variant="outline" className="flex-1">View All Artisans</Button>
            </div>
          </CardContent>
        </Card>

        {/* Bookings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Your Bookings</CardTitle>
              {bookings.length > 0 && (
                <Badge variant="secondary">{bookings.length} total</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {bookings.length === 0 ? (
              <div className="text-center py-12">
                <Package size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-4">No bookings yet</p>
                <Link to="/browse">
                  <Button>Browse Services</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{booking.serviceTitle}</h3>
                          <Badge variant={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-1 mb-3">
                          <p className="text-sm text-gray-600">
                            👤 Artisan: {booking.artisanId?.name}
                          </p>
                          {booking.artisanId?.phone && (
                            <p className="text-sm text-gray-600">
                              📞 {booking.artisanId.phone}
                            </p>
                          )}
                          {booking.address && (
                            <p className="text-sm text-gray-600">
                              📍 {booking.address}
                            </p>
                          )}
                          {booking.scheduledDate && (
                            <p className="text-sm text-gray-600">
                              📅 Scheduled: {new Date(booking.scheduledDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>

                        {booking.serviceDescription && (
                          <p className="text-sm text-gray-500 italic">{booking.serviceDescription}</p>
                        )}
                      </div>
                      
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary mb-1">₹{booking.amount}</p>
                        <Badge variant={booking.paymentStatus === 'paid' ? 'success' : 'warning'}>
                          {booking.paymentStatus}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-2">
                          Booked: {new Date(booking.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {booking.blockchainProof && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="bg-green-50 p-3 rounded-md">
                          <p className="text-xs text-green-800 font-medium mb-1">
                            🔒 Blockchain Verified Transaction
                          </p>
                          <p className="text-xs text-gray-600 font-mono break-all">
                            Proof: {booking.blockchainProof}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerDashboard;
