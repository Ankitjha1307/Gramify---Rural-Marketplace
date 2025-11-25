import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  const quickLogin = (userEmail, userPass) => {
    setEmail(userEmail);
    setPassword(userPass);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="text-white" size={32} />
            </div>
            <CardTitle className="text-2xl">Welcome to Gramify</CardTitle>
            <CardDescription>Login to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-3 text-center">
                Quick Login (Demo)
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => quickLogin('rajesh@gramify.com', 'rajesh123')}
                  className="w-full text-left px-3 py-2 text-sm bg-green-50 hover:bg-green-100 rounded-md transition-colors"
                >
                  <span className="font-medium">Artisan:</span> rajesh@gramify.com
                </button>
                <button
                  onClick={() => quickLogin('ankit@gramify.com', 'ankit123')}
                  className="w-full text-left px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                >
                  <span className="font-medium">Customer:</span> ankit@gramify.com
                </button>
                <button
                  onClick={() => quickLogin('admin@gramify.com', 'admin123')}
                  className="w-full text-left px-3 py-2 text-sm bg-purple-50 hover:bg-purple-100 rounded-md transition-colors"
                >
                  <span className="font-medium">Admin:</span> admin@gramify.com
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center">
                All demo passwords are the same format: name123
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-600 mt-4">
          New to Gramify?{' '}
          <Link to="/browse" className="text-primary hover:underline">
            Browse services
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
