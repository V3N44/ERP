import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8 text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page not found</p>
      <Button 
        onClick={() => navigate('/')}
        variant="outline"
      >
        <Home className="mr-2 h-4 w-4" />
        Return Home
      </Button>
    </div>
  );
};

export default NotFoundPage;