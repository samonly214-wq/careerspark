import { useState } from 'react';
import { Header } from './Header';
import { Bell, Briefcase, MessageSquare, Calendar, CheckCheck, Trash2, Settings } from 'lucide-react';
import { Seo } from './Seo';

interface Notification {
  id: string;
  type: 'application' | 'message' | 'interview' | 'match' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  icon: typeof Bell;
  color: string;
}

export function NotificationsPage() {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'interview',
      title: 'Interview Scheduled',
      message: 'Your interview with Tech Innovations Inc. is scheduled for tomorrow at 2:00 PM',
      timestamp: '2 hours ago',
      read: false,
      icon: Calendar,
      color: 'text-orange-500 bg-orange-50',
    },
    {
      id: '2',
      type: 'application',
      title: 'Application Status Update',
      message: 'Your application for Senior Frontend Developer at Digital Solutions Corp has been reviewed',
      timestamp: '5 hours ago',
      read: false,
      icon: Briefcase,
      color: 'text-blue-500 bg-blue-50',
    },
    {
      id: '3',
      type: 'message',
      title: 'New Message',
      message: 'Creative Studio has sent you a message regarding your application',
      timestamp: '1 day ago',
      read: true,
      icon: MessageSquare,
      color: 'text-green-500 bg-green-50',
    },
    {
      id: '4',
      type: 'match',
      title: 'New Job Match',
      message: '5 new jobs match your profile and preferences',
      timestamp: '1 day ago',
      read: true,
      icon: Bell,
      color: 'text-purple-500 bg-purple-50',
    },
    {
      id: '5',
      type: 'application',
      title: 'Application Received',
      message: 'Your application for Data Scientist at Analytics Pro has been received',
      timestamp: '2 days ago',
      read: true,
      icon: Briefcase,
      color: 'text-blue-500 bg-blue-50',
    },
    {
      id: '6',
      type: 'system',
      title: 'Profile Update',
      message: 'Your profile is 85% complete. Add more details to increase your chances',
      timestamp: '3 days ago',
      read: true,
      icon: Bell,
      color: 'text-gray-500 bg-gray-50',
    },
  ];

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read) 
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    console.log('Marking notification as read:', id);
  };

  const markAllAsRead = () => {
    console.log('Marking all notifications as read');
  };

  const deleteNotification = (id: string) => {
    console.log('Deleting notification:', id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo title="Notifications" noindex description="Private notifications page for the signed in user." />
      <Header />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl text-black mb-2">Notifications</h1>
            <p className="text-gray-600">
              {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'You\'re all caught up!'}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <CheckCheck className="w-4 h-4" />
              <span className="hidden sm:inline">Mark all as read</span>
            </button>
            <a
              href="/settings"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </a>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'unread'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {filteredNotifications.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 sm:p-6 hover:bg-gray-50 transition-colors ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full ${notification.color} flex items-center justify-center`}>
                      <notification.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <div className="flex-1">
                          <h3 className={`text-base sm:text-lg ${!notification.read ? 'font-semibold' : ''} text-black mb-1`}>
                            {notification.title}
                          </h3>
                          <p className="text-sm sm:text-base text-gray-700 mb-2">
                            {notification.message}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-500">
                            {notification.timestamp}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-2 hover:bg-white rounded transition-colors"
                              title="Mark as read"
                            >
                              <CheckCheck className="w-5 h-5 text-gray-600" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-2 hover:bg-white rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5 text-gray-600" />
                          </button>
                        </div>
                      </div>
                      {notification.type === 'interview' && (
                        <button className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm">
                          View Interview Details
                        </button>
                      )}
                      {notification.type === 'message' && (
                        <button className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm">
                          Read Message
                        </button>
                      )}
                      {notification.type === 'match' && (
                        <button className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm">
                          View Jobs
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl text-gray-600 mb-2">No notifications</h3>
              <p className="text-gray-500">
                {filter === 'unread' 
                  ? "You're all caught up! No unread notifications."
                  : "You don't have any notifications yet."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}