import { Briefcase } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-6 h-6 text-orange-500" />
              <span className="text-xl italic">CareerSpark</span>
            </div>
            <p className="text-gray-400">
              Your trusted partner in finding the perfect career opportunity.
            </p>
          </div>
          <div>
            <h4 className="mb-4">For Job Seekers</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/browse-jobs" className="hover:text-orange-500">Browse Jobs</a></li>
              <li><a href="/resources" className="hover:text-orange-500">Career Advice</a></li>
              <li><a href="/dashboard-seeker" className="hover:text-orange-500">My Dashboard</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4">For Employers</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/post-job" className="hover:text-orange-500">Post a Job</a></li>
              <li><a href="/pricing" className="hover:text-orange-500">Pricing</a></li>
              <li><a href="/dashboard-provider" className="hover:text-orange-500">Employer Dashboard</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/about" className="hover:text-orange-500">About Us</a></li>
              <li><a href="/contact" className="hover:text-orange-500">Contact</a></li>
              <li><a href="/privacy" className="hover:text-orange-500">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-orange-500">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          © 2026 CareerSpark. All rights reserved.
        </div>
      </div>
    </footer>
  );
}