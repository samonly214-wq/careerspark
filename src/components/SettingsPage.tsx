import { useState } from 'react';
import { Header } from './Header';
import { User, Lock, Bell, Mail, Globe, CreditCard, Shield, Eye } from 'lucide-react';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'notifications' | 'privacy' | 'billing'>('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'account', label: 'Account', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl text-black mb-6">Settings</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-4">
            {/* Sidebar */}
            <div className="lg:col-span-1 border-r border-gray-200 bg-gray-50">
              <nav className="p-4 space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                      activeTab === tab.id
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="lg:col-span-3 p-6 sm:p-8">
              {/* Profile Settings */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl text-black mb-6">Profile Settings</h2>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-10 h-10 text-gray-500" />
                      </div>
                      <div>
                        <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors mr-2">
                          Upload Photo
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">First Name</label>
                        <input
                          type="text"
                          placeholder="John"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          placeholder="Doe"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Professional Title</label>
                      <input
                        type="text"
                        placeholder="Senior Frontend Developer"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Bio</label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about yourself..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
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

                    <button className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {/* Account Settings */}
              {activeTab === 'account' && (
                <div>
                  <h2 className="text-2xl text-black mb-6">Account Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        placeholder="john.doe@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <h3 className="text-lg text-black mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-700 mb-2">Current Password</label>
                          <input
                            type="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-2">New Password</label>
                          <input
                            type="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-2">Confirm New Password</label>
                          <input
                            type="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        </div>
                      </div>
                    </div>

                    <button className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors">
                      Update Account
                    </button>

                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <h3 className="text-lg text-black mb-4 text-red-600">Danger Zone</h3>
                      <button className="w-full border-2 border-red-500 text-red-500 py-3 rounded-lg hover:bg-red-50 transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Settings */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-2xl text-black mb-6">Notification Preferences</h2>
                  <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="text-lg text-black mb-4">Email Notifications</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700">New job matches</span>
                          <input type="checkbox" defaultChecked className="w-5 h-5 text-orange-500" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700">Application status updates</span>
                          <input type="checkbox" defaultChecked className="w-5 h-5 text-orange-500" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700">Messages from employers</span>
                          <input type="checkbox" defaultChecked className="w-5 h-5 text-orange-500" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700">Weekly job digest</span>
                          <input type="checkbox" className="w-5 h-5 text-orange-500" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700">Career tips and resources</span>
                          <input type="checkbox" className="w-5 h-5 text-orange-500" />
                        </label>
                      </div>
                    </div>

                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="text-lg text-black mb-4">Push Notifications</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700">New messages</span>
                          <input type="checkbox" defaultChecked className="w-5 h-5 text-orange-500" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700">Interview reminders</span>
                          <input type="checkbox" defaultChecked className="w-5 h-5 text-orange-500" />
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg text-black mb-4">SMS Notifications</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700">Interview reminders</span>
                          <input type="checkbox" className="w-5 h-5 text-orange-500" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700">Urgent updates</span>
                          <input type="checkbox" className="w-5 h-5 text-orange-500" />
                        </label>
                      </div>
                    </div>

                    <button className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors">
                      Save Preferences
                    </button>
                  </div>
                </div>
              )}

              {/* Privacy Settings */}
              {activeTab === 'privacy' && (
                <div>
                  <h2 className="text-2xl text-black mb-6">Privacy Settings</h2>
                  <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="text-lg text-black mb-4">Profile Visibility</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700">Make profile public</span>
                          <input type="checkbox" defaultChecked className="w-5 h-5 text-orange-500" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700">Show profile in search results</span>
                          <input type="checkbox" defaultChecked className="w-5 h-5 text-orange-500" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700">Allow employers to contact me</span>
                          <input type="checkbox" defaultChecked className="w-5 h-5 text-orange-500" />
                        </label>
                      </div>
                    </div>

                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="text-lg text-black mb-4">Data Sharing</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700">Share analytics data</span>
                          <input type="checkbox" className="w-5 h-5 text-orange-500" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700">Allow personalized job recommendations</span>
                          <input type="checkbox" defaultChecked className="w-5 h-5 text-orange-500" />
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg text-black mb-4">Data Management</h3>
                      <div className="space-y-3">
                        <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                          Download My Data
                        </button>
                        <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                          Request Account Deletion
                        </button>
                      </div>
                    </div>

                    <button className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors">
                      Save Privacy Settings
                    </button>
                  </div>
                </div>
              )}

              {/* Billing Settings */}
              {activeTab === 'billing' && (
                <div>
                  <h2 className="text-2xl text-black mb-6">Billing & Subscription</h2>
                  <div className="space-y-6">
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg text-black mb-1">Free Plan</h3>
                          <p className="text-gray-600">For job seekers</p>
                        </div>
                        <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm">Active</span>
                      </div>
                      <p className="text-gray-700 mb-4">You're currently on the free plan for job seekers.</p>
                      <a href="/pricing" className="text-orange-500 hover:text-orange-600">
                        View all plans →
                      </a>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg text-black mb-4">Payment Method</h3>
                      <p className="text-gray-600 mb-4">No payment method on file.</p>
                      <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        Add Payment Method
                      </button>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg text-black mb-4">Billing History</h3>
                      <p className="text-gray-600">No billing history available.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
