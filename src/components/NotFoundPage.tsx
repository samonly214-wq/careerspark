import { Header } from './Header';
import { Search, Home, ArrowLeft, FileText, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Graphic */}
          <div className="mb-8">
            <h1 className="text-8xl sm:text-9xl font-bold text-orange-500 mb-4">404</h1>
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Search className="w-24 h-24 sm:w-32 sm:h-32 text-gray-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-orange-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-black mb-4">
            Page Not Found
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-8 px-4">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Home className="w-5 h-5" />
              Go to Homepage
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>

          {/* Helpful Links */}
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl text-black mb-4">
              Maybe you're looking for one of these?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              <Link
                to="/browse-jobs"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Search className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-black">Browse Jobs</h4>
                  <p className="text-xs text-gray-600">Find your next opportunity</p>
                </div>
              </Link>
              <Link
                to="/dashboard-seeker"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Home className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-black">My Dashboard</h4>
                  <p className="text-xs text-gray-600">View your applications</p>
                </div>
              </Link>
              <Link
                to="/post-job"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-black">Post a Job</h4>
                  <p className="text-xs text-gray-600">For employers</p>
                </div>
              </Link>
              <Link
                to="/contact"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-black">Contact Us</h4>
                  <p className="text-xs text-gray-600">Get help and support</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}