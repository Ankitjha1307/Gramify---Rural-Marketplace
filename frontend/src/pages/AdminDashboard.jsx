import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Shield, Users, Briefcase, Activity, CheckCircle } from 'lucide-react';
import api from '../lib/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [pendingArtisans, setPendingArtisans] = useState([]);
  const [blockchainStats, setBlockchainStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, pendingRes, blockchainRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/pending-artisans'),
        api.get('/blockchain/stats'),
      ]);
      
      setStats(statsRes.data.stats);
      setPendingArtisans(pendingRes.data.artisans);
      setBlockchainStats(blockchainRes.data.stats);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyArtisan = async (artisanId) => {
    try {
      const response = await api.post(`/admin/verify-artisan/${artisanId}`);
      
      if (response.data.success) {
        alert('Artisan verified successfully on blockchain!');
        fetchData(); // Refresh data
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to verify artisan');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Platform Management & Analytics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold mt-1">{stats?.totalUsers || 0}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Users size={24} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Artisans</p>
                  <p className="text-2xl font-bold mt-1">{stats?.totalArtisans || 0}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Shield size={24} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Verified</p>
                  <p className="text-2xl font-bold mt-1">{stats?.verifiedArtisans || 0}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <CheckCircle size={24} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold mt-1">{stats?.totalBookings || 0}</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Briefcase size={24} className="text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold mt-1">{stats?.completedBookings || 0}</p>
                </div>
                <div className="p-3 bg-teal-100 rounded-full">
                  <Activity size={24} className="text-teal-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Blockchain Stats */}
        {blockchainStats && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="text-primary" />
                Blockchain Network Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Total Blocks</p>
                  <p className="text-3xl font-bold text-green-900">{blockchainStats.totalBlocks}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Total Transactions</p>
                  <p className="text-3xl font-bold text-blue-900">{blockchainStats.totalTransactions}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Latest Block Hash</p>
                  <p className="text-xs font-mono text-purple-900 break-all">
                    {blockchainStats.latestBlock?.hash.substring(0, 32)}...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pending Artisan Verifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pending Artisan Verifications</CardTitle>
              {pendingArtisans.length > 0 && (
                <Badge variant="warning">{pendingArtisans.length} pending</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {pendingArtisans.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
                <p className="text-gray-600">All artisans are verified!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingArtisans.map((artisan) => (
                  <div key={artisan._id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{artisan.name}</h3>
                          <Badge variant="warning">Unverified</Badge>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>📧 {artisan.email}</p>
                          <p>📞 {artisan.phone}</p>
                          <p>📍 {artisan.village}, {artisan.state}</p>
                          <p>👤 Role: {artisan.role}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button 
                          onClick={() => handleVerifyArtisan(artisan._id)}
                          className="w-full md:w-auto"
                        >
                          <Shield size={16} className="mr-2" />
                          Verify on Blockchain
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Platform Health */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Verification Rate</span>
                  <span className="font-semibold">
                    {stats?.totalArtisans > 0 
                      ? Math.round((stats.verifiedArtisans / stats.totalArtisans) * 100) 
                      : 0}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ 
                      width: `${stats?.totalArtisans > 0 
                        ? (stats.verifiedArtisans / stats.totalArtisans) * 100 
                        : 0}%` 
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-600">Booking Completion Rate</span>
                  <span className="font-semibold">
                    {stats?.totalBookings > 0 
                      ? Math.round((stats.completedBookings / stats.totalBookings) * 100) 
                      : 0}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ 
                      width: `${stats?.totalBookings > 0 
                        ? (stats.completedBookings / stats.totalBookings) * 100 
                        : 0}%` 
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">System Running</p>
                    <p className="text-xs text-gray-500">All services operational</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Blockchain Active</p>
                    <p className="text-xs text-gray-500">{blockchainStats?.totalBlocks} blocks created</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Verifications Active</p>
                    <p className="text-xs text-gray-500">{stats?.verifiedArtisans} artisans verified</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
