import { Header } from './Header';
import { Users, Target, Award, Heart, Briefcase } from 'lucide-react';

export function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To connect talented individuals with their dream careers and help companies build exceptional teams.',
    },
    {
      icon: Heart,
      title: 'Our Values',
      description: 'Integrity, innovation, and inclusivity guide everything we do. We believe in creating opportunities for everyone.',
    },
    {
      icon: Award,
      title: 'Our Excellence',
      description: 'Committed to providing the best job search experience with cutting-edge technology and personalized support.',
    },
  ];

  const team = [
    { name: 'Sarah Johnson', role: 'CEO & Founder', image: null },
    { name: 'Michael Chen', role: 'CTO', image: null },
    { name: 'Emily Davis', role: 'Head of Operations', image: null },
    { name: 'James Wilson', role: 'Head of Marketing', image: null },
  ];

  const stats = [
    { number: '10,000+', label: 'Jobs Posted' },
    { number: '5,000+', label: 'Companies' },
    { number: '50,000+', label: 'Job Seekers' },
    { number: '95%', label: 'Success Rate' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Briefcase className="w-16 h-16 sm:w-20 sm:h-20 text-orange-500" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-6">About Career Spark</h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              We're on a mission to revolutionize the way people find jobs and companies find talent.
              Since 2020, we've been connecting ambitious professionals with forward-thinking employers.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl text-orange-500 mb-2">{stat.number}</div>
                <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl text-black mb-6 text-center">Our Story</h2>
            <div className="space-y-4 text-gray-600 text-base sm:text-lg">
              <p>
                Career Spark was founded in 2020 by a group of HR professionals and tech entrepreneurs who saw
                the need for a more efficient, transparent, and user-friendly job search platform. We noticed
                that both job seekers and employers were frustrated with existing solutions that were either
                too complex or lacked essential features.
              </p>
              <p>
                Our platform was built from the ground up with one goal in mind: to make job searching and
                hiring as seamless as possible. We leverage cutting-edge technology, including AI-powered
                matching algorithms, to connect the right candidates with the right opportunities.
              </p>
              <p>
                Today, Career Spark serves thousands of companies and job seekers across multiple industries.
                We're proud to have facilitated countless successful placements and continue to innovate in
                the recruitment technology space.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl text-black mb-12 text-center">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 sm:p-8 text-center">
                <div className="flex justify-center mb-4">
                  <value.icon className="w-12 h-12 sm:w-16 sm:h-16 text-orange-500" />
                </div>
                <h3 className="text-xl sm:text-2xl text-black mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl text-black mb-12 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
                </div>
                <h3 className="text-lg sm:text-xl text-black mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl text-white mb-6">Ready to Start Your Journey?</h2>
          <p className="text-lg sm:text-xl text-white mb-8 opacity-90">
            Join thousands of professionals who have found their dream careers through Career Spark.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="px-8 py-3 bg-white text-orange-500 rounded-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Get Started
            </a>
            <a
              href="/contact"
              className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-orange-500 transition-colors inline-block"
            >
              Contact Us
            </a>
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
