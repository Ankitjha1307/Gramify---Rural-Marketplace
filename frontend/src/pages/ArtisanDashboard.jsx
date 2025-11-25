import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Shield, Briefcase, Star, TrendingUp } from 'lucide-react';
import api from '../lib/api';

const ArtisanDashboard = () => {
  const { user } = useAuth();
  const [artisan, setArtisan] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [artisansRes, bookingsRes] = await Promise.all([
        api.get('/artisans'),
        api.get('/bookings'),
      ]);

      // Find current artisan
      const currentArtisan = artisansRes.data.artisans.find(
        a => a.userId?._id === user.id
      );
      setArtisan(currentArtisan);
      setBookings(bookingsRes.data.bookings);
    } catch (error) {
      console.error('Error fetching data:', error);
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
          <h1 className="text-3xl font-bold text-gray-900">Artisan Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {user.name}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Verification Status</p>
                  <p className="text-2xl font-bold mt-1">
                    {artisan?.userId?.isVerified ? 'Verified' : 'Pending'}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${artisan?.userId?.isVerified ? 'bg-green-100' : 'bg-yellow-100'}`}>
                  <Shield size={24} className={artisan?.userId?.isVerified ? 'text-green-600' : 'text-yellow-600'} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Jobs</p>
                  <p className="text-2xl font-bold mt-1">{artisan?.totalJobs || 0}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Briefcase size={24} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Rating</p>
                  <p className="text-2xl font-bold mt-1">{artisan?.rating?.toFixed(1) || 'N/A'}</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Star size={24} className="text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Bookings</p>
                  <p className="text-2xl font-bold mt-1">
                    {bookings.filter(b => b.status === 'confirmed' || b.status === 'in-progress').length}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <TrendingUp size={24} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Verification Status */}
        {artisan && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Profile Status</CardTitle>
            </CardHeader>
            <CardContent>
              {artisan.userId?.isVerified ? (
                <div className="bg-green-50 p-4 rounded-md">
                  <div className="flex items-center mb-2">
                    <Shield size={20} className="text-green-600 mr-2" />
                    <h3 className="font-semibold text-green-900">Blockchain Verified</h3>
                  </div>
                  <p className="text-sm text-green-800 mb-2">
                    Your profile is verified on the blockchain. Customers can trust your services!
                  </p>
                  {artisan.verificationHash && (
                    <p className="text-xs text-gray-600 font-mono break-all">
                      Verification Hash: {artisan.verificationHash}
                    </p>
                  )}
                </div>
              ) : (
                <div className="bg-yellow-50 p-4 rounded-md">
                  <div className="flex items-center mb-2">
                    <Shield size={20} className="text-yellow-600 mr-2" />
                    <h3 className="font-semibold text-yellow-900">Verification Pending</h3>
                  </div>
                  <p className="text-sm text-yellow-800">
                    Your profile is under review. Admin will verify you soon to enable blockchain verification.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Services */}
        {artisan && artisan.services && artisan.services.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Your Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {artisan.services.map((service, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{service.title}</h3>
                          <Badge variant="secondary">{service.category}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-2xl font-bold text-primary">₹{service.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {bookings.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No bookings yet</p>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking._id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{booking.serviceTitle}</h3>
                          <Badge variant={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          Customer: {booking.customerId?.name}
                        </p>
                        {booking.address && (
                          <p className="text-sm text-gray-600">📍 {booking.address}</p>
                        )}
                        {booking.scheduledDate && (
                          <p className="text-sm text-gray-600">
                            📅 {new Date(booking.scheduledDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">₹{booking.amount}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Payment: {booking.paymentStatus}
                        </p>
                      </div>
                    </div>
                    {booking.blockchainProof && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-600 flex items-center">
                          <Shield size={12} className="mr-1" />
                          Blockchain Proof: {booking.blockchainProof.substring(0, 32)}...
                        </p>
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

export default ArtisanDashboard;
