import { Header } from './Header';
import { Check, Briefcase } from 'lucide-react';
import { Seo } from './Seo';

export function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: '$99',
      period: '/month',
      description: 'Perfect for small businesses and startups',
      features: [
        'Post up to 3 jobs per month',
        'Access to candidate database',
        '30-day job listing duration',
        'Email support',
        'Basic analytics',
        'Company profile page',
      ],
      popular: false,
    },
    {
      name: 'Professional',
      price: '$249',
      period: '/month',
      description: 'Ideal for growing companies',
      features: [
        'Post up to 10 jobs per month',
        'Access to candidate database',
        '60-day job listing duration',
        'Priority email support',
        'Advanced analytics & reporting',
        'Featured company profile',
        'Resume database access',
        'Dedicated account manager',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large organizations with high-volume hiring',
      features: [
        'Unlimited job postings',
        'Full candidate database access',
        '90-day job listing duration',
        '24/7 phone & email support',
        'Custom analytics & reporting',
        'Premium company profile',
        'API access',
        'Dedicated account manager',
        'Custom integrations',
        'White-label solutions',
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo title="Pricing" description="Flexible, transparent pricing plans for employers. Choose the right plan for your hiring needs." />
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-4">Simple, Transparent Pricing</h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Choose the plan that's right for your hiring needs. No hidden fees, cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-md overflow-hidden ${
                  plan.popular ? 'ring-2 ring-orange-500 relative' : ''
                }`}
              >
                {plan.popular && (
                  <div className="bg-orange-500 text-white text-center py-2 text-sm">
                    Most Popular
                  </div>
                )}
                <div className="p-6 sm:p-8">
                  <h3 className="text-2xl text-black mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl sm:text-5xl text-black">{plan.price}</span>
                    {plan.period && <span className="text-gray-600 ml-2">{plan.period}</span>}
                  </div>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <button
                    className={`w-full py-3 rounded-lg transition-colors mb-8 ${
                      plan.popular
                        ? 'bg-orange-500 text-white hover:bg-orange-600'
                        : 'border-2 border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-500'
                    }`}
                  >
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                  </button>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-700 mb-3">What's included:</p>
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-black mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg text-black mb-2">Can I change my plan later?</h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg text-black mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept all major credit cards (Visa, Mastercard, American Express) and bank transfers for annual plans.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg text-black mb-2">Is there a free trial available?</h3>
              <p className="text-gray-600">
                Yes, we offer a 14-day free trial on all plans. No credit card required to start.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg text-black mb-2">What happens when my job listing expires?</h3>
              <p className="text-gray-600">
                Your job listing will be automatically archived. You can repost it at any time if you still have available job slots in your plan.
              </p>
            </div>
            <div className="pb-6">
              <h3 className="text-lg text-black mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600">
                We offer a 30-day money-back guarantee. If you're not satisfied with our service, contact us for a full refund.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl text-white mb-6">Still have questions?</h2>
          <p className="text-lg text-white mb-8 opacity-90">
            Our team is here to help you choose the right plan for your needs.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-white text-orange-500 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Contact Sales
          </a>
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
