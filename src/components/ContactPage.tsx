import { Header } from './Header';
import { Mail, Phone, MapPin, Send, Briefcase, MessageSquare, Clock } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    // Handle form submission
    console.log('Form submitted:', formData);
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'support@careerspark.com',
      subContent: 'We typically respond within 24 hours',
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+1 (555) 123-4567',
      subContent: 'Mon-Fri, 9am-6pm EST',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: '123 Business Avenue',
      subContent: 'San Francisco, CA 94105',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <MessageSquare className="w-16 h-16 text-orange-500 mx-auto mb-6" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-4">Get In Touch</h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="flex justify-center mb-4">
                  <info.icon className="w-10 h-10 text-orange-500" />
                </div>
                <h3 className="text-lg text-black mb-2">{info.title}</h3>
                <p className="text-gray-900 mb-1">{info.content}</p>
                <p className="text-sm text-gray-600">{info.subContent}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 lg:p-10">
            <h2 className="text-2xl sm:text-3xl text-black mb-6 text-center">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john.doe@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Subject *</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="job-seeker">Job Seeker Help</option>
                  <option value="employer">Employer Services</option>
                  <option value="partnership">Partnership Opportunities</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell us how we can help you..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl text-black mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg text-black mb-2">How do I create an account?</h3>
              <p className="text-gray-600">
                Click on the "Sign Up" button in the top right corner and follow the registration process. You can sign up as either a job seeker or an employer.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg text-black mb-2">Is Career Spark free to use?</h3>
              <p className="text-gray-600">
                For job seekers, Career Spark is completely free. Employers can post jobs with our flexible pricing plans. Check our pricing page for more details.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg text-black mb-2">How long does it take to hear back from employers?</h3>
              <p className="text-gray-600">
                Response times vary by employer. Most employers review applications within 1-2 weeks. You can track your application status in your dashboard.
              </p>
            </div>
            <div className="pb-6">
              <h3 className="text-lg text-black mb-2">Can I edit my job posting after publishing?</h3>
              <p className="text-gray-600">
                Yes, employers can edit job postings at any time from their dashboard. Simply navigate to "My Jobs" and click the "Edit" button on the job you wish to modify.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-8 h-8 text-orange-500" />
              <h2 className="text-2xl text-black">Business Hours</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-700">Monday - Friday</span>
                <span className="text-gray-900">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-700">Saturday</span>
                <span className="text-gray-900">10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-700">Sunday</span>
                <span className="text-gray-900">Closed</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-700">Holidays</span>
                <span className="text-gray-900">Closed</span>
              </div>
            </div>
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