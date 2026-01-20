import { Header } from './Header';
import { Shield, Briefcase } from 'lucide-react';

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Shield className="w-16 h-16 text-orange-500 mx-auto mb-6" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-300">
              Last updated: January 13, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose max-w-none">
            <div className="mb-8">
              <h2 className="text-2xl text-black mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Welcome to Career Spark. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you about how we look after your personal data when you visit our 
                website and tell you about your privacy rights and how the law protects you.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl text-black mb-4">2. Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                We may collect, use, store and transfer different kinds of personal data about you which we have 
                grouped together as follows:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier</li>
                <li><strong>Contact Data:</strong> includes email address, telephone numbers, and physical address</li>
                <li><strong>Profile Data:</strong> includes your resume, work history, education, skills, and preferences</li>
                <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version</li>
                <li><strong>Usage Data:</strong> includes information about how you use our website and services</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl text-black mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We will only use your personal data when the law allows us to. Most commonly, we will use your 
                personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>To provide and maintain our job search and recruitment services</li>
                <li>To match job seekers with suitable job opportunities</li>
                <li>To communicate with you about your applications and our services</li>
                <li>To improve our website and services</li>
                <li>To send you marketing communications (with your consent)</li>
                <li>To comply with legal obligations</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl text-black mb-4">4. Data Sharing and Disclosure</h2>
              <p className="text-gray-700 mb-4">
                We may share your personal information with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Employers:</strong> When you apply for a job, we share your application materials with the hiring company</li>
                <li><strong>Service Providers:</strong> Third-party companies that help us operate our platform</li>
                <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
              </ul>
              <p className="text-gray-700 mt-4">
                We require all third parties to respect the security of your personal data and to treat it in 
                accordance with the law.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl text-black mb-4">5. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We have put in place appropriate security measures to prevent your personal data from being 
                accidentally lost, used, or accessed in an unauthorized way. We limit access to your personal 
                data to those employees, agents, contractors, and other third parties who have a business need 
                to know.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl text-black mb-4">6. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We will only retain your personal data for as long as necessary to fulfill the purposes we 
                collected it for, including for the purposes of satisfying any legal, accounting, or reporting 
                requirements.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl text-black mb-4">7. Your Legal Rights</h2>
              <p className="text-gray-700 mb-4">
                Under certain circumstances, you have rights under data protection laws in relation to your 
                personal data, including the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Request access to your personal data</li>
                <li>Request correction of your personal data</li>
                <li>Request erasure of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Request restriction of processing your personal data</li>
                <li>Request transfer of your personal data</li>
                <li>Right to withdraw consent</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl text-black mb-4">8. Cookies</h2>
              <p className="text-gray-700 mb-4">
                Our website uses cookies to distinguish you from other users of our website. This helps us to 
                provide you with a good experience when you browse our website and also allows us to improve 
                our site. You can set your browser to refuse all or some browser cookies.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl text-black mb-4">9. Third-Party Links</h2>
              <p className="text-gray-700 mb-4">
                Our website may include links to third-party websites, plug-ins, and applications. Clicking on 
                those links or enabling those connections may allow third parties to collect or share data about 
                you. We do not control these third-party websites and are not responsible for their privacy 
                statements.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl text-black mb-4">10. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this privacy policy from time to time. We will notify you of any changes by posting 
                the new privacy policy on this page and updating the "Last updated" date.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl text-black mb-4">11. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this privacy policy or our privacy practices, please contact us:
              </p>
              <ul className="list-none space-y-2 text-gray-700">
                <li>Email: privacy@careerspark.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: 123 Business Avenue, San Francisco, CA 94105</li>
              </ul>
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
