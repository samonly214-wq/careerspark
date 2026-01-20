import { Header } from './Header';
import { BookOpen, Video, FileText, TrendingUp, Users, Briefcase } from 'lucide-react';

export function ResourcesPage() {
  const categories = [
    {
      icon: BookOpen,
      title: 'Career Guides',
      description: 'Comprehensive guides to help you navigate your career journey',
      articles: [
        'How to Write a Winning Resume in 2026',
        'Interview Preparation: Ultimate Checklist',
        'Negotiating Your Salary: Expert Tips',
        'Building Your Personal Brand',
      ],
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Learn from industry experts through video content',
      articles: [
        'Ace Your Virtual Interview',
        'LinkedIn Profile Optimization',
        'Creating a Portfolio Website',
        'Networking Strategies for Introverts',
      ],
    },
    {
      icon: FileText,
      title: 'Templates & Tools',
      description: 'Ready-to-use templates and tools for job seekers',
      articles: [
        'Resume Templates (Multiple Formats)',
        'Cover Letter Templates',
        'Interview Follow-up Email Samples',
        'Salary Comparison Tool',
      ],
    },
    {
      icon: TrendingUp,
      title: 'Industry Insights',
      description: 'Stay updated with the latest industry trends',
      articles: [
        '2026 Job Market Trends',
        'Remote Work: Best Practices',
        'In-Demand Skills for Tech Professionals',
        'Career Transitions: Making the Switch',
      ],
    },
  ];

  const featuredArticles = [
    {
      title: 'The Complete Guide to Remote Job Hunting',
      category: 'Career Guides',
      readTime: '15 min read',
      image: null,
      excerpt: 'Learn strategies for finding and landing remote positions in today\'s competitive market.',
    },
    {
      title: 'Top 10 Interview Questions and How to Answer Them',
      category: 'Interview Tips',
      readTime: '10 min read',
      image: null,
      excerpt: 'Master the most common interview questions with proven response frameworks.',
    },
    {
      title: 'Building a Tech Career Without a Degree',
      category: 'Career Development',
      readTime: '12 min read',
      image: null,
      excerpt: 'Discover alternative paths to a successful tech career through bootcamps and self-learning.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <BookOpen className="w-16 h-16 text-orange-500 mx-auto mb-6" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-4">Career Resources</h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Expert advice, guides, and tools to accelerate your career growth
            </p>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl text-black mb-8">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600"></div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-orange-500 bg-orange-50 px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500">{article.readTime}</span>
                  </div>
                  <h3 className="text-xl text-black mb-3">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <button className="text-orange-500 hover:text-orange-600 font-medium">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl text-black mb-8">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <category.icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-xl text-black mb-2">{category.title}</h3>
                    <p className="text-gray-600 text-sm">{category.description}</p>
                  </div>
                </div>
                <ul className="space-y-2 ml-16">
                  {category.articles.map((article, articleIndex) => (
                    <li key={articleIndex}>
                      <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors">
                        {article}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Webinars Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl text-black mb-8">Upcoming Webinars</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-50 rounded-lg">
                  <Users className="w-8 h-8 text-orange-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl text-black mb-2">Mastering Remote Interviews</h3>
                  <p className="text-gray-600 mb-3">
                    Learn how to excel in virtual interviews and stand out from other candidates.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="text-sm text-gray-500">
                      <p>January 20, 2026 • 2:00 PM EST</p>
                    </div>
                    <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors">
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-50 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-orange-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl text-black mb-2">Career Transition Strategies</h3>
                  <p className="text-gray-600 mb-3">
                    Expert tips for successfully transitioning to a new career or industry.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="text-sm text-gray-500">
                      <p>January 25, 2026 • 3:00 PM EST</p>
                    </div>
                    <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors">
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl text-white mb-4">Stay Updated</h2>
          <p className="text-lg text-white mb-8 opacity-90">
            Subscribe to our newsletter for weekly career tips and job market insights
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-6 py-3 bg-white text-orange-500 rounded-lg hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
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