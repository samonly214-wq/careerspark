import { Link, useParams } from 'react-router-dom';
import { Briefcase, MapPin, DollarSign, Clock, Building2, Users, Award, ArrowLeft, Bookmark, Share2 } from 'lucide-react';
import { Header } from './Header';
import { useApp } from '../contexts/AppContext';
import { toast } from 'sonner';
import { useState } from 'react';

export function JobDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { jobs, savedJobs, toggleSaveJob, applyToJob, user } = useApp();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');

  const job = jobs.find(j => j.id === id);

  // SEO: set page title/description dynamically once job is loaded
  const jobDescription = job ? job.description.substring(0, 160) : undefined;

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Seo title="Job Not Found" description="Job not found - browse other available jobs on CareerSpark." />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl text-black mb-4">Job Not Found</h1>
            <Link to="/browse-jobs" className="text-orange-500 hover:text-orange-600">
              Browse all jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isSaved = savedJobs.includes(job.id);

  const handleSaveJob = () => {
    toggleSaveJob(job.id);
    toast.success(isSaved ? 'Job removed from saved jobs' : 'Job saved successfully!');
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login to apply for jobs');
      return;
    }

    if (!coverLetter.trim()) {
      toast.error('Please write a cover letter');
      return;
    }

    applyToJob(job, coverLetter);
    toast.success('Application submitted successfully!');
    setShowApplyModal(false);
    setCoverLetter('');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Job link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo title={job.title} description={jobDescription} og={{ title: job.title, description: jobDescription }} />
      <Header />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Jobs
        </Link>

        {/* Job Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl text-black mb-3">{job.title}</h1>
              <div className="flex items-center gap-2 text-gray-700 mb-2">
                <Building2 className="w-5 h-5" />
                <span className="text-lg">{job.company}</span>
              </div>
              <div className="flex flex-wrap gap-4 text-gray-600">
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
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>{job.experience}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="flex-1 md:flex-none bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors" onClick={() => setShowApplyModal(true)}>
              Apply Now
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2" onClick={handleSaveJob}>
              <Bookmark className="w-5 h-5" />
              {isSaved ? 'Saved' : 'Save Job'}
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2" onClick={handleShare}>
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>

          <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{job.applicants} applicants</span>
            </div>
            <span>•</span>
            <span>Posted {job.postedAt}</span>
          </div>
        </div>

        {/* Job Details */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <section className="mb-8">
            <h2 className="text-2xl text-black mb-4">Job Description</h2>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl text-black mb-4">Responsibilities</h2>
            <ul className="space-y-3">
              {job.responsibilities.map((item, index) => (
                <li key={index} className="flex gap-3 text-gray-700">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl text-black mb-4">Requirements</h2>
            <ul className="space-y-3">
              {job.requirements.map((item, index) => (
                <li key={index} className="flex gap-3 text-gray-700">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl text-black mb-4">Benefits</h2>
            <ul className="space-y-3">
              {job.benefits.map((item, index) => (
                <li key={index} className="flex gap-3 text-gray-700">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="border-t pt-6">
            <button className="w-full md:w-auto bg-orange-500 text-white px-12 py-3 rounded-lg hover:bg-orange-600 transition-colors" onClick={() => setShowApplyModal(true)}>
              Apply for this Position
            </button>
          </div>
        </div>

        {/* Similar Jobs */}
        <div className="mt-8">
          <h2 className="text-2xl text-black mb-4">Similar Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="text-xl text-black mb-2">Frontend Developer</h3>
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <Building2 className="w-4 h-4" />
                  <span>Digital Solutions Corp</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>Remote</span>
                </div>
                <button className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
            <h2 className="text-2xl text-black mb-4">Apply for {job.title}</h2>
            <form onSubmit={handleApply}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coverLetter">
                  Cover Letter
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="coverLetter"
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={5}
                ></textarea>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}