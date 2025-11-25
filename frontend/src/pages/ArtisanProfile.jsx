import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Shield, MapPin, Star, Phone, Mail, Calendar } from 'lucide-react';
import api from '../lib/api';

const ArtisanProfile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingForm, setBookingForm] = useState({
    serviceId: '',
    address: '',
    scheduledDate: '',
  });
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    fetchArtisan();
  }, [id]);

  const fetchArtisan = async () => {
    try {
      const response = await api.get(`/artisans/${id}`);
      setArtisan(response.data.artisan);
    } catch (error) {
      console.error('Error fetching artisan:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookService = async (service) => {
    if (!user) {
      alert('Please login to book services');
      return;
    }

    if (user.role !== 'customer') {
      alert('Only customers can book services');
      return;
    }

    try {
      const response = await api.post('/bookings', {
        artisanId: artisan.userId._id,
        serviceTitle: service.title,
        serviceDescription: service.description,
        amount: service.price,
        address: bookingForm.address,
        scheduledDate: bookingForm.scheduledDate,
      });

      alert('Booking created successfully! Check your dashboard.');
      setShowBookingForm(false);
      setBookingForm({ serviceId: '', address: '', scheduledDate: '' });
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create booking');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading artisan profile...</p>
      </div>
    );
  }

  if (!artisan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Artisan not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
              <div className="flex-1 mb-4 md:mb-0">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{artisan.userId?.name}</h1>
                  {artisan.userId?.isVerified && (
                    <Badge variant="success">
                      <Shield size={14} className="mr-1" />
                      Blockchain Verified
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin size={16} className="mr-2" />
                  <span>{artisan.userId?.village}, {artisan.userId?.state}</span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <Star size={18} className="text-yellow-500 mr-1" />
                    <span className="font-semibold">{artisan.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-gray-600">{artisan.totalJobs} jobs completed</span>
                </div>

                {artisan.bio && (
                  <p className="text-gray-700 mb-4">{artisan.bio}</p>
                )}

                <div className="flex flex-wrap gap-2">
                  {artisan.skills?.map((skill, idx) => (
                    <Badge key={idx} variant="outline">{skill}</Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2 md:ml-6">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone size={16} className="mr-2" />
                  {artisan.userId?.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail size={16} className="mr-2" />
                  {artisan.userId?.email}
                </div>
              </div>
            </div>

            {artisan.isBlockchainVerified && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="bg-green-50 p-3 rounded-md">
                  <p className="text-sm text-green-800 flex items-center">
                    <Shield size={16} className="mr-2" />
                    This artisan is verified on blockchain
                  </p>
                  {artisan.verificationHash && (
                    <p className="text-xs text-gray-600 mt-1 font-mono break-all">
                      Hash: {artisan.verificationHash}
                    </p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Services */}
        <Card>
          <CardHeader>
            <CardTitle>Services Offered</CardTitle>
          </CardHeader>
          <CardContent>
            {artisan.services && artisan.services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {artisan.services.map((service, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{service.title}</h3>
                      <Badge variant="secondary">{service.category}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">₹{service.price}</span>
                      {user && user.role === 'customer' && (
                        <Button 
                          size="sm"
                          onClick={() => {
                            setBookingForm({ ...bookingForm, serviceId: idx });
                            setShowBookingForm(true);
                          }}
                        >
                          Book Now
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">No services listed yet</p>
            )}
          </CardContent>
        </Card>

        {/* Booking Form Modal */}
        {showBookingForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Book Service</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Address
                    </label>
                    <Input
                      placeholder="Enter your address"
                      value={bookingForm.address}
                      onChange={(e) => setBookingForm({ ...bookingForm, address: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Date
                    </label>
                    <Input
                      type="date"
                      value={bookingForm.scheduledDate}
                      onChange={(e) => setBookingForm({ ...bookingForm, scheduledDate: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1"
                      onClick={() => handleBookService(artisan.services[bookingForm.serviceId])}
                      disabled={!bookingForm.address || !bookingForm.scheduledDate}
                    >
                      Confirm Booking
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setShowBookingForm(false);
                        setBookingForm({ serviceId: '', address: '', scheduledDate: '' });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtisanProfile;
