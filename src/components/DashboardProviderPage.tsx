import { useState } from 'react';
import { Header } from './Header';
import { Briefcase, Users, Eye, TrendingUp, PlusCircle, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { toast } from 'sonner';

export function DashboardProviderPage() {
  const { jobs, deleteJob, applications } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'candidates' | 'company'>('overview');

  const handleDeleteJob = (jobId: string) => {
    if (confirm('Are you sure you want to delete this job?')) {
      deleteJob(jobId);
      toast.success('Job deleted successfully');
    }
  };

  const totalApplicants = applications.length;
  const totalViews = jobs.reduce((acc, job) => acc + (Math.floor(Math.random() * 200) + 50), 0);

  const recentCandidates = [
    { id: '1', name: 'Sarah Johnson', position: 'Senior Frontend Developer', appliedDate: 'Jan 12, 2026', status: 'Under Review' },
    { id: '2', name: 'Michael Chen', position: 'Product Manager', appliedDate: 'Jan 11, 2026', status: 'Interview' },
    { id: '3', name: 'Emily Davis', position: 'Senior Frontend Developer', appliedDate: 'Jan 10, 2026', status: 'Shortlisted' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl text-black mb-2">Employer Dashboard</h1>
            <p className="text-gray-600">Manage your job postings and candidates</p>
          </div>
          <Link
            to="/post-job"
            className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors w-full sm:w-auto justify-center"
          >
            <PlusCircle className="w-5 h-5" />
            Post New Job
          </Link>
        </div>

        {/* Stats Cards */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
                <span className="text-xl sm:text-2xl text-black">8</span>
              </div>
              <p className="text-sm sm:text-base text-gray-600">Active Jobs</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                <span className="text-xl sm:text-2xl text-black">{totalApplicants}</span>
              </div>
              <p className="text-sm sm:text-base text-gray-600">Total Applicants</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                <span className="text-xl sm:text-2xl text-black">{totalViews}</span>
              </div>
              <p className="text-sm sm:text-base text-gray-600">Total Views</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
                <span className="text-xl sm:text-2xl text-black">+24%</span>
              </div>
              <p className="text-sm sm:text-base text-gray-600">This Month</p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200 overflow-x-auto">
            <nav className="flex -mb-px whitespace-nowrap">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 sm:px-6 py-4 border-b-2 transition-colors text-sm sm:text-base ${
                  activeTab === 'overview'
                    ? 'border-orange-500 text-orange-500'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('jobs')}
                className={`px-4 sm:px-6 py-4 border-b-2 transition-colors text-sm sm:text-base ${
                  activeTab === 'jobs'
                    ? 'border-orange-500 text-orange-500'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                My Jobs
              </button>
              <button
                onClick={() => setActiveTab('candidates')}
                className={`px-4 sm:px-6 py-4 border-b-2 transition-colors text-sm sm:text-base ${
                  activeTab === 'candidates'
                    ? 'border-orange-500 text-orange-500'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                Candidates
              </button>
              <button
                onClick={() => setActiveTab('company')}
                className={`px-4 sm:px-6 py-4 border-b-2 transition-colors text-sm sm:text-base ${
                  activeTab === 'company'
                    ? 'border-orange-500 text-orange-500'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                Company Profile
              </button>
            </nav>
          </div>

          <div className="p-4 sm:p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl text-black mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg text-black mb-2">New Applications Today</h3>
                    <p className="text-3xl text-orange-500 mb-2">12</p>
                    <p className="text-sm text-gray-600">+3 from yesterday</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg text-black mb-3">Top Performing Jobs</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Senior Frontend Developer</span>
                        <span className="text-orange-500">24 applicants</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">UX Designer</span>
                        <span className="text-orange-500">31 applicants</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Jobs Tab */}
            {activeTab === 'jobs' && (
              <div>
                <h2 className="text-2xl text-black mb-4">My Job Postings</h2>
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div key={job.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl text-black mb-1">{job.title}</h3>
                          <p className="text-sm text-gray-500">Posted on {job.postedDate}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          job.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {job.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-5 h-5" />
                          <span>{job.applicants} applicants</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Eye className="w-5 h-5" />
                          <span>{job.views} views</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors">
                          View Applicants
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                          Edit
                        </button>
                        <button
                          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                          onClick={() => handleDeleteJob(job.id)}
                        >
                          {job.status === 'Active' ? 'Close' : 'Reopen'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Candidates Tab */}
            {activeTab === 'candidates' && (
              <div>
                <h2 className="text-2xl text-black mb-4">Recent Candidates</h2>
                <div className="space-y-4">
                  {recentCandidates.map((candidate) => (
                    <div key={candidate.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl text-black mb-1">{candidate.name}</h3>
                          <p className="text-gray-600 mb-2">Applied for: {candidate.position}</p>
                          <p className="text-sm text-gray-500">Applied on {candidate.appliedDate}</p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                          {candidate.status}
                        </span>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors">
                          View Profile
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                          Schedule Interview
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Company Profile Tab */}
            {activeTab === 'company' && (
              <div>
                <h2 className="text-2xl text-black mb-4">Company Profile</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Company Name</label>
                    <input
                      type="text"
                      placeholder="Tech Innovations Inc."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Industry</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                      <option>Technology</option>
                      <option>Finance</option>
                      <option>Healthcare</option>
                      <option>Education</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Company Size</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                      <option>1-10 employees</option>
                      <option>11-50 employees</option>
                      <option>51-200 employees</option>
                      <option>201-500 employees</option>
                      <option>500+ employees</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Website</label>
                    <input
                      type="url"
                      placeholder="https://www.example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Company Description</label>
                    <textarea
                      rows={5}
                      placeholder="Tell candidates about your company..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <button className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}