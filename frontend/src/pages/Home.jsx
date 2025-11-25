import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Shield, Sparkles, Users, TrendingUp } from 'lucide-react';
import api from '../lib/api';

const Home = () => {
  const [artisans, setArtisans] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [artisansRes, statsRes] = await Promise.all([
        api.get('/artisans'),
        api.get('/blockchain/stats'),
      ]);
      
      // Filter only verified artisans
      const verified = artisansRes.data.artisans.filter(a => a.userId?.isVerified);
      setArtisans(verified.slice(0, 3));
      setStats(statsRes.data.stats);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Connecting Rural Artisans
            <br />
            <span className="text-primary">with Blockchain Trust</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Gramify empowers rural service providers through blockchain-verified profiles,
            bringing transparency and trust to every transaction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/browse">
              <Button size="lg" className="w-full sm:w-auto">
                Browse Services
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Join as Artisan
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-primary" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Blockchain Verified</h3>
            <p className="text-gray-600">Every artisan verified on blockchain for complete transparency</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-primary" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Direct Connection</h3>
            <p className="text-gray-600">Connect directly with skilled rural artisans</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="text-primary" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fair Pricing</h3>
            <p className="text-gray-600">Transparent pricing with escrow payment protection</p>
          </div>
        </div>
      </section>

      {/* Blockchain Stats */}
      {stats && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="bg-gradient-to-r from-primary/10 to-green-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="text-primary" size={24} />
                <h3 className="text-lg font-semibold">Blockchain Network Stats</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{stats.totalBlocks}</div>
                  <div className="text-sm text-gray-600">Blocks Created</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{stats.totalTransactions}</div>
                  <div className="text-sm text-gray-600">Verifications</div>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <div className="text-xs text-gray-500 font-mono break-all">
                    Latest: {stats.latestBlock?.hash.substring(0, 16)}...
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Featured Artisans */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Featured Verified Artisans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {artisans.map((artisan) => (
            <Card key={artisan._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl">{artisan.userId?.name}</CardTitle>
                  {artisan.isBlockchainVerified && (
                    <Badge variant="success">
                      <Shield size={12} className="mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  {artisan.userId?.village}, {artisan.userId?.state}
                </p>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">⭐</span>
                    <span className="font-semibold">{artisan.rating}</span>
                    <span className="text-sm text-gray-600">({artisan.totalJobs} jobs)</span>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-700 line-clamp-2">{artisan.bio}</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {artisan.skills?.slice(0, 3).map((skill, idx) => (
                    <Badge key={idx} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <Link to={`/artisan/${artisan._id}`}>
                  <Button variant="outline" className="w-full">
                    View Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {artisans.length > 0 && (
          <div className="text-center mt-8">
            <Link to="/browse">
              <Button size="lg">View All Artisans</Button>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
