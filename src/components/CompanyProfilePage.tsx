import { Header } from './Header';
import { MapPin, Users, Calendar, Globe, Briefcase, Star, Building2 } from 'lucide-react';

export function CompanyProfilePage() {
  const companyData = {
    name: 'Tech Innovations Inc.',
    logo: null,
    industry: 'Technology',
    size: '201-500 employees',
    founded: '2015',
    location: 'San Francisco, CA',
    website: 'www.techinnovations.com',
    description: 'Tech Innovations Inc. is a leading technology company specializing in cutting-edge software solutions for businesses worldwide. We are committed to innovation, excellence, and creating products that make a real difference in people\'s lives.',
    mission: 'To empower businesses through innovative technology solutions that drive growth and efficiency.',
    rating: 4.5,
    reviews: 127,
  };

  const benefits = [
    'Competitive salary and equity',
    'Health, dental, and vision insurance',
    'Flexible work arrangements',
    'Unlimited PTO',
    'Professional development budget',
    '401(k) with company match',
    'Gym membership',
    'Free meals and snacks',
  ];

  const culture = [
    {
      title: 'Innovation First',
      description: 'We encourage creative thinking and provide resources for employees to explore new ideas.',
    },
    {
      title: 'Work-Life Balance',
      description: 'Flexible hours and remote work options help our team maintain a healthy work-life balance.',
    },
    {
      title: 'Diversity & Inclusion',
      description: 'We believe diverse teams create better products and foster an inclusive environment.',
    },
    {
      title: 'Continuous Learning',
      description: 'Professional development is a priority with access to courses, conferences, and mentorship.',
    },
  ];

  const openJobs = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      posted: '2 days ago',
    },
    {
      id: '2',
      title: 'Product Manager',
      department: 'Product',
      location: 'San Francisco, CA',
      type: 'Full-time',
      posted: '1 week ago',
    },
    {
      id: '3',
      title: 'UX Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      posted: '3 days ago',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Company Header */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
              <Building2 className="w-12 h-12 sm:w-16 sm:h-16 text-orange-500" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-3">{companyData.name}</h1>
              <div className="flex flex-wrap gap-4 text-sm sm:text-base text-gray-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{companyData.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{companyData.size}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Founded {companyData.founded}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <a href={`https://${companyData.website}`} className="hover:text-orange-500 transition-colors">
                    {companyData.website}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(companyData.rating)
                          ? 'fill-orange-500 text-orange-500'
                          : 'text-gray-400'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-300">
                  {companyData.rating} ({companyData.reviews} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
              <h2 className="text-2xl text-black mb-4">About {companyData.name}</h2>
              <p className="text-gray-700 mb-6">{companyData.description}</p>
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg text-black mb-3">Our Mission</h3>
                <p className="text-gray-700">{companyData.mission}</p>
              </div>
            </div>

            {/* Company Culture */}
            <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
              <h2 className="text-2xl text-black mb-6">Company Culture</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {culture.map((item, index) => (
                  <div key={index} className="border-l-4 border-orange-500 pl-4">
                    <h3 className="text-lg text-black mb-2">{item.title}</h3>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits & Perks */}
            <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
              <h2 className="text-2xl text-black mb-6">Benefits & Perks</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Open Positions */}
            <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
              <h2 className="text-2xl text-black mb-6">Open Positions</h2>
              <div className="space-y-4">
                {openJobs.map((job) => (
                  <div
                    key={job.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-lg text-black mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                      <span>{job.department}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <span className="text-sm text-gray-500">Posted {job.posted}</span>
                      <button className="w-full sm:w-auto px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <a href="/browse-jobs" className="text-orange-500 hover:text-orange-600">
                  View All Open Positions →
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg text-black mb-4">Company Info</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Industry</div>
                  <div className="text-black">{companyData.industry}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Company Size</div>
                  <div className="text-black">{companyData.size}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Founded</div>
                  <div className="text-black">{companyData.founded}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Headquarters</div>
                  <div className="text-black">{companyData.location}</div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg text-black mb-4">Connect With Us</h3>
              <div className="space-y-3">
                <a
                  href="#"
                  className="flex items-center gap-3 text-gray-700 hover:text-orange-500 transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  <span>Website</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 text-gray-700 hover:text-orange-500 transition-colors"
                >
                  <Users className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-md p-6 text-white">
              <h3 className="text-lg mb-3">Join Our Team</h3>
              <p className="mb-4 text-sm opacity-90">
                Discover exciting opportunities and be part of our innovative team.
              </p>
              <a
                href="/browse-jobs"
                className="block w-full text-center px-4 py-2 bg-white text-orange-500 rounded-lg hover:bg-gray-100 transition-colors"
              >
                View Open Positions
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
