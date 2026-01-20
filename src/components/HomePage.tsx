import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Briefcase, MapPin, DollarSign, Building2, Clock, Bookmark } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { toast } from 'sonner';

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const { jobs, savedJobs, toggleSaveJob } = useApp();

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = searchQuery === '' || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = location === '' || 
      job.location.toLowerCase().includes(location.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  const handleSaveJob = (jobId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaveJob(jobId);
    if (savedJobs.includes(jobId)) {
      toast.success('Job removed from saved jobs');
    } else {
      toast.success('Job saved successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
              <span className="text-xl sm:text-2xl font-bold italic">CareerSpark</span>
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm sm:text-base">
              <Link to="/" className="hover:text-orange-500 transition-colors">
                Home
              </Link>
              <Link to="/browse-jobs" className="hover:text-orange-500 transition-colors">
                Browse Jobs
              </Link>
              <Link to="/dashboard-provider" className="hover:text-orange-500 transition-colors">
                For Employers
              </Link>
              <Link
                to="/login"
                className="px-3 sm:px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-500 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3 sm:px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
              >
                Sign Up
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-black to-gray-900 text-white py-12 sm:py-16 lg:py-20 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1758520145175-aa3b593b81af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBlb3BsZSUyMG9mZmljZXxlbnwxfHx8fDE3NjgzMDQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)',
          }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70" />
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-4">
              Find Your Dream Job Today
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 px-4">
              Connect with top employers and discover opportunities that match your skills
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              <div className="md:col-span-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                />
              </div>
              <div className="md:col-span-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                />
              </div>
              <button className="bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors">
                Search Jobs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl text-orange-500 mb-2">10,000+</div>
              <div className="text-gray-600">Active Jobs</div>
            </div>
            <div>
              <div className="text-4xl text-orange-500 mb-2">5,000+</div>
              <div className="text-gray-600">Companies</div>
            </div>
            <div>
              <div className="text-4xl text-orange-500 mb-2">50,000+</div>
              <div className="text-gray-600">Job Seekers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-black mb-8">
            Featured Jobs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <h3 className="text-xl text-black mb-2">
                  {job.title}
                </h3>
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <Building2 className="w-4 h-4" />
                  <span>{job.company}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <DollarSign className="w-4 h-4" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <Clock className="w-4 h-4" />
                  <span>{job.type} • {job.postedAt}</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
                <button className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors">
                  Apply Now
                </button>
                <button
                  className="w-full bg-gray-200 text-gray-600 py-2 rounded hover:bg-gray-300 transition-colors mt-2"
                  onClick={(e) => handleSaveJob(job.id, e)}
                >
                  {savedJobs.includes(job.id) ? (
                    <span className="flex items-center gap-2">
                      <Bookmark className="w-4 h-4 text-gray-600" />
                      Saved
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Bookmark className="w-4 h-4 text-gray-600" />
                      Save Job
                    </span>
                  )}
                </button>
              </div>
            ))}
          </div>
          {filteredJobs.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No jobs found. Try adjusting your search criteria.
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-6 h-6 text-orange-500" />
                <span className="text-xl">Career Spark</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner in finding the perfect career opportunity.
              </p>
            </div>
            <div>
              <h4 className="mb-4">For Job Seekers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-500">Browse Jobs</a></li>
                <li><a href="#" className="hover:text-orange-500">Career Advice</a></li>
                <li><a href="#" className="hover:text-orange-500">Resume Builder</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">For Employers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-500">Post a Job</a></li>
                <li><a href="#" className="hover:text-orange-500">Search Candidates</a></li>
                <li><a href="#" className="hover:text-orange-500">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-500">About Us</a></li>
                <li><a href="#" className="hover:text-orange-500">Contact</a></li>
                <li><a href="#" className="hover:text-orange-500">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            © 2026 Career Spark. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}