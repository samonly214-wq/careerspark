import { useState } from 'react';
import { Header } from './Header';
import { Search, Send, Paperclip, MoreVertical, Archive, Trash2 } from 'lucide-react';
import { Seo } from './Seo';

interface Message {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  timestamp: string;
  read: boolean;
  avatar?: string;
}

export function MessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState<string | null>('1');
  const [messageContent, setMessageContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const messages: Message[] = [
    {
      id: '1',
      sender: 'Tech Innovations Inc.',
      subject: 'Interview Invitation - Senior Frontend Developer',
      preview: 'We are impressed with your application and would like to invite you...',
      timestamp: '2 hours ago',
      read: false,
    },
    {
      id: '2',
      sender: 'Digital Solutions Corp',
      subject: 'Application Status Update',
      preview: 'Thank you for your interest in the Product Manager position...',
      timestamp: '5 hours ago',
      read: true,
    },
    {
      id: '3',
      sender: 'Creative Studio',
      subject: 'Next Steps in Your Application',
      preview: 'Hi! We would love to schedule a portfolio review with you...',
      timestamp: '1 day ago',
      read: true,
    },
    {
      id: '4',
      sender: 'Analytics Pro',
      subject: 'Technical Assessment',
      preview: 'Please complete the following technical assessment...',
      timestamp: '2 days ago',
      read: true,
    },
    {
      id: '5',
      sender: 'Cloud Systems Ltd',
      subject: 'Thank You for Applying',
      preview: 'We have received your application for the DevOps Engineer position...',
      timestamp: '3 days ago',
      read: true,
    },
  ];

  const filteredMessages = messages.filter((msg) =>
    searchQuery === '' ||
    msg.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sending message:', messageContent);
    setMessageContent('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo title="Messages" noindex description="Private messages — only visible to authenticated users." />
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl text-black mb-6">Messages</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Message List */}
            <div className="lg:col-span-1 border-r border-gray-200">
              {/* Search */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Messages */}
              <div className="overflow-y-auto max-h-[calc(100vh-280px)]">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => setSelectedMessage(message.id)}
                    className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedMessage === message.id ? 'bg-orange-50' : ''
                    } ${!message.read ? 'bg-blue-50' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className={`text-sm ${!message.read ? 'font-bold' : ''} text-black`}>
                        {message.sender}
                      </h3>
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                    </div>
                    <p className={`text-sm ${!message.read ? 'font-semibold' : ''} text-gray-700 mb-1 truncate`}>
                      {message.subject}
                    </p>
                    <p className="text-xs text-gray-600 truncate">{message.preview}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Content */}
            <div className="lg:col-span-2">
              {selectedMessage ? (
                <div className="flex flex-col h-full">
                  {/* Message Header */}
                  <div className="p-4 sm:p-6 border-b border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-lg sm:text-xl text-black mb-1">
                          {messages.find((m) => m.id === selectedMessage)?.subject}
                        </h2>
                        <p className="text-sm text-gray-600">
                          From: {messages.find((m) => m.id === selectedMessage)?.sender}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {messages.find((m) => m.id === selectedMessage)?.timestamp}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                          <Archive className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                          <Trash2 className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                          <MoreVertical className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Message Body */}
                  <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
                    <div className="prose max-w-none">
                      <p className="text-gray-700">
                        Dear Candidate,
                      </p>
                      <p className="text-gray-700 mt-4">
                        {messages.find((m) => m.id === selectedMessage)?.preview}
                      </p>
                      <p className="text-gray-700 mt-4">
                        We were particularly impressed with your experience in React and TypeScript, as well as your portfolio of work. We believe you would be a great fit for our team.
                      </p>
                      <p className="text-gray-700 mt-4">
                        Please let us know your availability for an interview in the coming week. We look forward to speaking with you.
                      </p>
                      <p className="text-gray-700 mt-4">
                        Best regards,<br />
                        Hiring Team
                      </p>
                    </div>
                  </div>

                  {/* Reply Form */}
                  <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
                    <form onSubmit={handleSendMessage}>
                      <textarea
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                        placeholder="Type your reply..."
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none mb-3"
                      />
                      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                        <button
                          type="button"
                          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                          <Paperclip className="w-5 h-5" />
                          <span className="text-sm">Attach File</span>
                        </button>
                        <button
                          type="submit"
                          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                        >
                          <Send className="w-5 h-5" />
                          Send Reply
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full p-8">
                  <p className="text-gray-500 text-center">Select a message to view its content</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
