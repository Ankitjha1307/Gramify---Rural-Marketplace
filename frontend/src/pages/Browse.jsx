import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Shield, Search } from 'lucide-react';
import api from '../lib/api';

const Browse = () => {
  const [artisans, setArtisans] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtisans();
  }, []);

  const fetchArtisans = async () => {
    try {
      const response = await api.get('/artisans');
      setArtisans(response.data.artisans);
    } catch (error) {
      console.error('Error fetching artisans:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArtisans = artisans.filter((artisan) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      artisan.userId?.name.toLowerCase().includes(searchLower) ||
      artisan.skills?.some(skill => skill.toLowerCase().includes(searchLower)) ||
      artisan.userId?.village?.toLowerCase().includes(searchLower) ||
      artisan.services?.some(service => 
        service.title.toLowerCase().includes(searchLower) ||
        service.category.toLowerCase().includes(searchLower)
      )
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Artisans</h1>
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search by name, skill, location, or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading artisans...</p>
          </div>
        ) : filteredArtisans.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No artisans found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtisans.map((artisan) => (
              <Card key={artisan._id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-1">{artisan.userId?.name}</CardTitle>
                      <p className="text-sm text-gray-600">
                        {artisan.userId?.village}, {artisan.userId?.state}
                      </p>
                    </div>
                    {artisan.userId?.isVerified && (
                      <Badge variant="success" className="shrink-0">
                        <Shield size={12} className="mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">⭐</span>
                      <span className="font-semibold">{artisan.rating.toFixed(1)}</span>
                      <span className="text-sm text-gray-600">
                        ({artisan.totalJobs} {artisan.totalJobs === 1 ? 'job' : 'jobs'})
                      </span>
                    </div>
                  </div>

                  {artisan.bio && (
                    <p className="text-sm text-gray-700 mb-4 line-clamp-2">{artisan.bio}</p>
                  )}

                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-500 mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {artisan.skills?.slice(0, 4).map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {artisan.services && artisan.services.length > 0 && (
                    <div className="mb-4 pb-4 border-b border-gray-200">
                      <p className="text-xs font-medium text-gray-500 mb-2">Services Offered</p>
                      <div className="space-y-2">
                        {artisan.services.slice(0, 2).map((service, idx) => (
                          <div key={idx} className="flex justify-between items-start text-sm">
                            <span className="text-gray-700 flex-1">{service.title}</span>
                            <span className="font-semibold text-primary ml-2">₹{service.price}</span>
                          </div>
                        ))}
                      </div>
                      {artisan.services.length > 2 && (
                        <p className="text-xs text-gray-500 mt-2">
                          +{artisan.services.length - 2} more service{artisan.services.length - 2 > 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                  )}

                  {artisan.isBlockchainVerified && (
                    <div className="mb-4 p-2 bg-green-50 rounded-md">
                      <p className="text-xs text-green-800 flex items-center">
                        <Shield size={14} className="mr-1" />
                        Blockchain Verified Profile
                      </p>
                    </div>
                  )}

                  <Link to={`/artisan/${artisan._id}`}>
                    <Button className="w-full">View Full Profile</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
