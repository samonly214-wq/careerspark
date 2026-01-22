import { useState } from 'react';
import { Search, MapPin, DollarSign, Clock, Building2, SlidersHorizontal, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from './Header';
import { useApp } from '../contexts/AppContext';
import { toast } from 'sonner';
import { Seo } from './Seo';

export function BrowseJobsPage() {
  const { jobs, savedJobs, toggleSaveJob } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = searchQuery === '' || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = location === '' || 
      job.location.toLowerCase().includes(location.toLowerCase());
    const matchesType = jobType === 'all' || job.type.toLowerCase() === jobType.toLowerCase();
    return matchesSearch && matchesLocation && matchesType;
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
    <div className="min-h-screen bg-gray-50">
      <Seo title="Browse Jobs" description="Browse and filter thousands of job listings to find the right role for you." />
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl text-black mb-6">Browse Jobs</h1>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              Search
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors text-black"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Job Type</label>
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                >
                  <option value="all">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Experience Level</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black">
                  <option value="all">All Levels</option>
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                  <option value="lead">Lead/Principal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Salary Range</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black">
                  <option>Any</option>
                  <option>$0 - $50k</option>
                  <option>$50k - $100k</option>
                  <option>$100k - $150k</option>
                  <option>$150k+</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 text-gray-600">
          Showing {filteredJobs.length} jobs
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 gap-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <h3 className="text-xl text-black mb-2">{job.title}</h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Building2 className="w-4 h-4" />
                    <span>{job.company}</span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{job.description}</p>
                  <span className="text-sm text-gray-500">Posted {job.postedAt}</span>
                </div>
                <div className="mt-4 md:mt-0 md:ml-6 flex flex-col gap-2">
                  <button className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors whitespace-nowrap">
                    Apply Now
                  </button>
                  <button
                    onClick={(e) => handleSaveJob(job.id, e)}
                    className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-50 transition-colors whitespace-nowrap"
                  >
                    {savedJobs.includes(job.id) ? (
                      <Bookmark className="w-4 h-4 text-orange-500" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500 mb-4">No jobs found matching your criteria</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setLocation('');
                setJobType('all');
              }}
              className="text-orange-500 hover:text-orange-600"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}