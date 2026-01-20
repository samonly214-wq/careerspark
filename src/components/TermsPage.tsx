import { Header } from './Header';
import { FileText, Briefcase } from 'lucide-react';

export function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <FileText className="w-16 h-16 text-orange-500 mx-auto mb-6" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-4">Terms of Service</h1>
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
              <h2 className="text-2xl text-black mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using Career Spark, you accept and agree to be bound by the terms and provision 
                of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl text-black mb-4">2. Use License</h2>
              <p className="text-gray-700 mb-4">
                Permission is granted to temporarily access the materials (information or software) on Career 
                Spark's website for personal, non-commercial transitory viewing only. This is the grant of a 
                license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial)</li>
                <li>Attempt to decompile or reverse engineer any software contained on Career Spark's website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl text-black mb-4">3. User Accounts</h2>
              <p className="text-gray-700 mb-4">
                When you create an account with us, you must provide information that is accurate, complete, and 
                current at all times. Failure to do so constitutes a breach of the Terms, which may result in 
                immediate termination of your account on our Service.
              </p>
              <p className="text-gray-700 mb-4">
                You are responsible for safeguarding the password that you use to access the Service and for any 
                activities or actions under your password.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl text-black mb-4">4. Prohibited Uses</h2>
              <p className="text-gray-700 mb-4">
                You may use the Service only for lawful purposes and in accordance with these Terms. You agree 
                not to use the Service:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>In any way that violates any applicable national or international law or regulation</li>
                <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
                <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity</li>
                <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service</li>
                <li>To post false, inaccurate, misleading, defamatory, or libelous content</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl text-black mb-4">5. Job Postings</h2>
              <p className="text-gray-700 mb-4">
                Employers posting jobs on Career Spark agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Post only legitimate job openings with genuine intent to hire</li>
                <li>Provide accurate information about the position, requirements, and compensation</li>
                <li>Comply with all applicable employment laws and regulations</li>
                <li>Not discriminate based on race, color, religion, gender, national origin, age, disability, or any other protected characteristic</li>
                <li>Not use job postings to collect resumes for purposes other than hiring for the posted position</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl text-black mb-4">6. Resume and Application Data</h2>
              <p className="text-gray-700 mb-4">
                Job seekers retain ownership of their resume and application materials. By uploading your resume 
                to Career Spark, you grant us permission to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Display your resume to potential employers</li>
                <li>Use your information to match you with relevant job opportunities</li>
                <li>Store your data in accordance with our Privacy Policy</li>
              </ul>
              <p className="text-gray-700 mt-4">
                You may delete your resume and account at any time through your account settings.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl text-black mb-4">7. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                The Service and its original content (excluding Content provided by users), features, and 
                functionality are and will remain the exclusive property of Career Spark and its licensors. 
                The Service is protected by copyright, trademark, and other laws of both the United States and 
                foreign countries.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl text-black mb-4">8. Payment Terms</h2>
              <p className="text-gray-700 mb-4">
                For paid services, you agree to pay all fees or charges to your account based on the fees, 
                charges, and billing terms in effect at the time a fee or charge is due and payable. All fees 
                are non-refundable unless otherwise stated. We reserve the right to change our pricing at any 
                time.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl text-black mb-4">9. Disclaimer</h2>
              <p className="text-gray-700 mb-4">
                Career Spark does not guarantee job placement or interview opportunities. We are a platform 
                that connects job seekers with employers, but we do not control hiring decisions. The materials 
                on Career Spark's website are provided on an 'as is' basis. Career Spark makes no warranties, 
                expressed or implied, and hereby disclaims and negates all other warranties including, without 
                limitation, implied warranties or conditions of merchantability, fitness for a particular purpose.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl text-black mb-4">10. Limitations of Liability</h2>
              <p className="text-gray-700 mb-4">
                In no event shall Career Spark or its suppliers be liable for any damages (including, without 
                limitation, damages for loss of data or profit, or due to business interruption) arising out of 
                the use or inability to use the materials on Career Spark's website.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl text-black mb-4">11. Termination</h2>
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your account and bar access to the Service immediately, without prior 
                notice or liability, under our sole discretion, for any reason whatsoever and without limitation, 
                including but not limited to a breach of the Terms.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl text-black mb-4">12. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                Career Spark may revise these terms of service for its website at any time without notice. By 
                using this website you are agreeing to be bound by the then current version of these terms of 
                service.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl text-black mb-4">13. Governing Law</h2>
              <p className="text-gray-700 mb-4">
                These terms and conditions are governed by and construed in accordance with the laws of 
                California, United States, and you irrevocably submit to the exclusive jurisdiction of the 
                courts in that location.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl text-black mb-4">14. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <ul className="list-none space-y-2 text-gray-700">
                <li>Email: legal@careerspark.com</li>
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
