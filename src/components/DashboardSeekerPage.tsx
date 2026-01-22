import { useState } from 'react';
import { Header } from './Header';
import { Briefcase, BookmarkCheck, FileText, User, Bell, TrendingUp, Calendar, Trash2, MapPin, DollarSign } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { toast } from 'sonner';
import { Seo } from './Seo';

export function DashboardSeekerPage() {
  const { applications, savedJobs, jobs, deleteApplication, toggleSaveJob } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'applications' | 'saved' | 'profile'>('overview');

  const savedJobDetails = jobs.filter(job => savedJobs.includes(job.id));
  
  const handleDeleteApplication = (appId: string) => {
    deleteApplication(appId);
    toast.success('Application deleted');
  };

  const handleUnsaveJob = (jobId: string) => {
    toggleSaveJob(jobId);
    toast.success('Job removed from saved jobs');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo title="Job Seeker Dashboard" noindex description="Private job seeker dashboard — not indexable." />
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl text-black mb-2">Job Seeker Dashboard</h1>
          <p className="text-gray-600">Track your job search progress</p>
        </div>

        {/* Stats Cards */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
                <span className="text-xl sm:text-2xl text-black">12</span>
              </div>
              <p className="text-sm sm:text-base text-gray-600">Applications</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                <span className="text-xl sm:text-2xl text-black">3</span>
              </div>
              <p className="text-sm sm:text-base text-gray-600">Interviews</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <BookmarkCheck className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                <span className="text-xl sm:text-2xl text-black">8</span>
              </div>
              <p className="text-sm sm:text-base text-gray-600">Saved Jobs</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
                <span className="text-xl sm:text-2xl text-black">85%</span>
              </div>
              <p className="text-sm sm:text-base text-gray-600">Profile Strength</p>
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
                onClick={() => setActiveTab('applications')}
                className={`px-4 sm:px-6 py-4 border-b-2 transition-colors text-sm sm:text-base ${
                  activeTab === 'applications'
                    ? 'border-orange-500 text-orange-500'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                My Applications
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`px-4 sm:px-6 py-4 border-b-2 transition-colors text-sm sm:text-base ${
                  activeTab === 'saved'
                    ? 'border-orange-500 text-orange-500'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                Saved Jobs
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 sm:px-6 py-4 border-b-2 transition-colors text-sm sm:text-base ${
                  activeTab === 'profile'
                    ? 'border-orange-500 text-orange-500'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                Profile
              </button>
            </nav>
          </div>

          <div className="p-4 sm:p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl text-black mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg">
                    <Bell className="w-6 h-6 text-orange-500 mt-1" />
                    <div>
                      <p className="text-black">Interview scheduled for Product Manager at Digital Solutions Corp</p>
                      <p className="text-sm text-gray-600 mt-1">Tomorrow at 2:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                    <Bell className="w-6 h-6 text-blue-500 mt-1" />
                    <div>
                      <p className="text-black">Your application for Senior Frontend Developer is under review</p>
                      <p className="text-sm text-gray-600 mt-1">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                    <Bell className="w-6 h-6 text-green-500 mt-1" />
                    <div>
                      <p className="text-black">5 new jobs match your preferences</p>
                      <p className="text-sm text-gray-600 mt-1">3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <div>
                <h2 className="text-2xl text-black mb-4">My Applications</h2>
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div key={app.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl text-black mb-1">{app.job}</h3>
                          <p className="text-gray-600 mb-2">{app.company}</p>
                          <p className="text-sm text-gray-500">Applied on {app.appliedDate}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${app.color} bg-opacity-10`}>
                          {app.status}
                        </span>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors">
                          View Details
                        </button>
                        <button
                          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                          onClick={() => handleDeleteApplication(app.id)}
                        >
                          Withdraw
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Saved Jobs Tab */}
            {activeTab === 'saved' && (
              <div>
                <h2 className="text-2xl text-black mb-4">Saved Jobs</h2>
                <div className="space-y-4">
                  {savedJobDetails.map((job) => (
                    <div key={job.id} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-xl text-black mb-1">{job.job}</h3>
                      <p className="text-gray-600 mb-2">{job.company}</p>
                      <p className="text-gray-600 mb-3">{job.location} • {job.salary}</p>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors">
                          Apply Now
                        </button>
                        <button
                          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                          onClick={() => handleUnsaveJob(job.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl text-black mb-4">My Profile</h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-10 h-10 text-gray-500" />
                    </div>
                    <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                      Upload Photo
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="john.doe@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      placeholder="San Francisco, CA"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Resume</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 mb-2">Drag and drop your resume or</p>
                      <button className="text-orange-500 hover:text-orange-600">
                        Browse files
                      </button>
                    </div>
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