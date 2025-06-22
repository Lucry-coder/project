import React, { useState } from 'react';
import { 
  X, 
  Search, 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  Book, 
  Video, 
  Settings, 
  CreditCard, 
  Monitor, 
  Smartphone,
  ChevronRight,
  ChevronDown,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Send
} from 'lucide-react';

interface HelpCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
  notHelpful: number;
}

interface SupportArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  icon: any;
  popular: boolean;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'How do I cancel my Netflix subscription?',
    answer: 'You can cancel your Netflix subscription at any time. Go to Account Settings > Billing > Cancel Subscription. Your account will remain active until the end of your current billing period. No cancellation fees apply.',
    category: 'billing',
    helpful: 245,
    notHelpful: 12
  },
  {
    id: '2',
    question: 'Why is Netflix not working on my device?',
    answer: 'Try these troubleshooting steps: 1) Check your internet connection (minimum 3 Mbps required), 2) Restart the Netflix app, 3) Restart your device, 4) Update the Netflix app to the latest version, 5) Clear app cache and data, 6) Try a different device to isolate the issue.',
    category: 'technical',
    helpful: 189,
    notHelpful: 23
  },
  {
    id: '3',
    question: 'How many devices can I watch Netflix on?',
    answer: 'The number of simultaneous streams depends on your plan: Basic (1 screen), Standard (2 screens), Premium (4 screens). You can install Netflix on unlimited devices, but streaming is limited by your plan. Manage your devices in Account Settings > Manage Download Devices.',
    category: 'account',
    helpful: 156,
    notHelpful: 8
  },
  {
    id: '4',
    question: 'How do I change my password?',
    answer: 'To change your password: 1) Sign in to Netflix on a web browser, 2) Go to Account Settings, 3) Click "Change Password", 4) Enter your current password, 5) Enter your new password twice to confirm, 6) Click "Save". You\'ll be signed out of all devices and need to sign back in.',
    category: 'account',
    helpful: 134,
    notHelpful: 5
  },
  {
    id: '5',
    question: 'Can I download shows to watch offline?',
    answer: 'Yes! Look for the download icon (↓) next to eligible titles. Downloads are available on mobile devices (iOS/Android) and Windows 10/11 computers. Downloaded content expires after a certain period (usually 7 days after download, 48 hours after you start watching). Not all titles are available for download due to licensing restrictions.',
    category: 'features',
    helpful: 198,
    notHelpful: 15
  },
  {
    id: '6',
    question: 'How do I change video quality?',
    answer: 'To adjust video quality: 1) Go to Account Settings on a web browser, 2) Click "Playback Settings", 3) Choose from Auto (recommended), Low (0.3 GB/hour), Medium (0.7 GB/hour), High (3 GB/hour), or Ultra HD (7 GB/hour). Changes apply to all devices on your account.',
    category: 'technical',
    helpful: 167,
    notHelpful: 19
  },
  {
    id: '7',
    question: 'What is Netflix\'s refund policy?',
    answer: 'Netflix doesn\'t offer refunds for partial billing periods. However, if you cancel your subscription, you can continue watching until the end of your current billing period. If you believe you were charged in error, contact customer support within 60 days of the charge.',
    category: 'billing',
    helpful: 89,
    notHelpful: 34
  },
  {
    id: '8',
    question: 'How do I set up parental controls?',
    answer: 'To set up parental controls: 1) Go to Account Settings, 2) Click "Profile & Parental Controls", 3) Select the profile you want to restrict, 4) Set maturity rating (Little Kids, Older Kids, Teens, Adults), 5) You can also block specific titles by entering their names.',
    category: 'features',
    helpful: 112,
    notHelpful: 7
  }
];

const supportArticles: SupportArticle[] = [
  {
    id: '1',
    title: 'Getting Started with Netflix',
    description: 'Learn the basics of using Netflix, from creating your profile to finding content you love',
    category: 'Getting Started',
    readTime: '5 min read',
    icon: Video,
    popular: true
  },
  {
    id: '2',
    title: 'Managing Your Account',
    description: 'How to update your profile, change settings, and manage your subscription preferences',
    category: 'Account Management',
    readTime: '8 min read',
    icon: Settings,
    popular: true
  },
  {
    id: '3',
    title: 'Billing and Payments',
    description: 'Understanding your bill, payment methods, and subscription plans',
    category: 'Billing',
    readTime: '6 min read',
    icon: CreditCard,
    popular: false
  },
  {
    id: '4',
    title: 'Troubleshooting Playback Issues',
    description: 'Fix common streaming problems, buffering, and video quality issues',
    category: 'Technical Support',
    readTime: '10 min read',
    icon: Monitor,
    popular: true
  },
  {
    id: '5',
    title: 'Mobile App Features',
    description: 'Make the most of Netflix on your phone and tablet with downloads and mobile-only features',
    category: 'Mobile',
    readTime: '7 min read',
    icon: Smartphone,
    popular: false
  },
  {
    id: '6',
    title: 'Netflix Originals Guide',
    description: 'Discover exclusive Netflix content and how to find the latest originals',
    category: 'Content',
    readTime: '4 min read',
    icon: Star,
    popular: false
  }
];

const quickActions = [
  {
    title: 'Contact Support',
    description: 'Chat with our support team',
    icon: MessageCircle,
    action: 'chat',
    available: true
  },
  {
    title: 'Call Us',
    description: 'Speak with a representative',
    icon: Phone,
    action: 'call',
    available: true
  },
  {
    title: 'Email Support',
    description: 'Send us a detailed message',
    icon: Mail,
    action: 'email',
    available: false
  },
  {
    title: 'Community Forum',
    description: 'Ask the community',
    icon: HelpCircle,
    action: 'forum',
    available: true
  }
];

export const HelpCenter: React.FC<HelpCenterProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [chatMessage, setChatMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [faqFeedback, setFaqFeedback] = useState<Record<string, 'helpful' | 'not-helpful' | null>>({});

  if (!isOpen) return null;

  const categories = [
    { id: 'all', name: 'All Topics', count: faqData.length },
    { id: 'account', name: 'Account', count: faqData.filter(f => f.category === 'account').length },
    { id: 'billing', name: 'Billing', count: faqData.filter(f => f.category === 'billing').length },
    { id: 'technical', name: 'Technical', count: faqData.filter(f => f.category === 'technical').length },
    { id: 'features', name: 'Features', count: faqData.filter(f => f.category === 'features').length }
  ];

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFAQFeedback = (faqId: string, type: 'helpful' | 'not-helpful') => {
    setFaqFeedback(prev => ({
      ...prev,
      [faqId]: type
    }));
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'chat':
        setShowChat(true);
        break;
      case 'call':
        alert('Call support: 1-866-579-7172\nAvailable 24/7');
        break;
      case 'forum':
        alert('Community forum coming soon!');
        break;
      default:
        break;
    }
  };

  const renderOverviewTab = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-to-r from-red-600/20 to-red-800/20 rounded-xl border border-red-600/30">
        <HelpCircle size={64} className="text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-white mb-4">How can we help you?</h1>
        <p className="text-gray-300 text-lg mb-8">Find answers to common questions or get in touch with our support team</p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for help topics, billing, technical issues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.action}
              onClick={() => handleQuickAction(action.action)}
              disabled={!action.available}
              className={`p-6 rounded-xl border transition-all duration-200 text-left ${
                action.available
                  ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 hover:border-red-600/50 hover:scale-105'
                  : 'bg-gray-800/30 border-gray-700/50 opacity-50 cursor-not-allowed'
              }`}
            >
              <Icon size={32} className={action.available ? 'text-red-500 mb-3' : 'text-gray-500 mb-3'} />
              <h3 className="text-white font-semibold mb-2">{action.title}</h3>
              <p className="text-gray-400 text-sm">{action.description}</p>
              {!action.available && (
                <span className="text-xs text-gray-500 mt-2 block">Coming Soon</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Popular Articles */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Star className="mr-3 text-yellow-500" size={24} />
          Popular Help Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportArticles.filter(article => article.popular).map((article) => {
            const Icon = article.icon;
            return (
              <div
                key={article.id}
                className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:bg-gray-700/50 hover:border-red-600/50 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <Icon size={24} className="text-red-500 group-hover:text-red-400" />
                  <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded-full">
                    {article.readTime}
                  </span>
                </div>
                <h3 className="text-white font-semibold mb-2 group-hover:text-red-400 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{article.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{article.category}</span>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-red-400 transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Updates */}
      <div className="bg-blue-600/10 border border-blue-600/30 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <AlertCircle className="text-blue-400 mr-3" size={24} />
          <h3 className="text-white font-semibold">Recent Updates</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="text-white text-sm font-medium">New Download Feature</p>
              <p className="text-gray-400 text-xs">You can now download up to 100 titles per device</p>
              <span className="text-xs text-gray-500">2 days ago</span>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="text-white text-sm font-medium">Improved Video Quality</p>
              <p className="text-gray-400 text-xs">Enhanced streaming quality for mobile devices</p>
              <span className="text-xs text-gray-500">1 week ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFAQTab = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600"
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name} ({category.count})
            </option>
          ))}
        </select>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12">
            <HelpCircle size={48} className="text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No FAQs found matching your search</p>
            <p className="text-gray-500 text-sm">Try different keywords or browse all categories</p>
          </div>
        ) : (
          filteredFAQs.map((faq) => (
            <div
              key={faq.id}
              className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-700/50 transition-colors"
              >
                <h3 className="text-white font-medium pr-4">{faq.question}</h3>
                <ChevronDown
                  size={20}
                  className={`text-gray-400 transition-transform flex-shrink-0 ${
                    expandedFAQ === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {expandedFAQ === faq.id && (
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-700 pt-4">
                    <p className="text-gray-300 leading-relaxed mb-6">{faq.answer}</p>
                    
                    {/* Feedback */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-400 text-sm">Was this helpful?</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleFAQFeedback(faq.id, 'helpful')}
                            className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors ${
                              faqFeedback[faq.id] === 'helpful'
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-green-600/20 hover:text-green-400'
                            }`}
                          >
                            <ThumbsUp size={14} />
                            <span>Yes ({faq.helpful})</span>
                          </button>
                          <button
                            onClick={() => handleFAQFeedback(faq.id, 'not-helpful')}
                            className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors ${
                              faqFeedback[faq.id] === 'not-helpful'
                                ? 'bg-red-600 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-red-600/20 hover:text-red-400'
                            }`}
                          >
                            <ThumbsDown size={14} />
                            <span>No ({faq.notHelpful})</span>
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span className="capitalize">{faq.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderContactTab = () => (
    <div className="space-y-8">
      <div className="text-center">
        <MessageCircle size={48} className="text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Contact Support</h2>
        <p className="text-gray-400">We're here to help 24/7</p>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center">
          <MessageCircle size={32} className="text-green-500 mx-auto mb-4" />
          <h3 className="text-white font-semibold mb-2">Live Chat</h3>
          <p className="text-gray-400 text-sm mb-4">Average wait time: 2 minutes</p>
          <button
            onClick={() => setShowChat(true)}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Start Chat
          </button>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center">
          <Phone size={32} className="text-blue-500 mx-auto mb-4" />
          <h3 className="text-white font-semibold mb-2">Phone Support</h3>
          <p className="text-gray-400 text-sm mb-4">Available 24/7</p>
          <button
            onClick={() => handleQuickAction('call')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Call Now
          </button>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center opacity-50">
          <Mail size={32} className="text-gray-500 mx-auto mb-4" />
          <h3 className="text-gray-400 font-semibold mb-2">Email Support</h3>
          <p className="text-gray-500 text-sm mb-4">Response within 24 hours</p>
          <button
            disabled
            className="w-full bg-gray-600 text-gray-400 py-2 px-4 rounded-lg cursor-not-allowed"
          >
            Coming Soon
          </button>
        </div>
      </div>

      {/* Support Hours */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center">
          <Clock className="mr-2" size={20} />
          Support Hours
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-white font-medium mb-2">Live Chat & Phone</h4>
            <p className="text-gray-400 text-sm">Available 24/7, 365 days a year</p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-2">Email Support</h4>
            <p className="text-gray-400 text-sm">Coming soon - Response within 24 hours</p>
          </div>
        </div>
      </div>

      {/* Common Issues Quick Fix */}
      <div className="bg-yellow-600/10 border border-yellow-600/30 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center">
          <AlertCircle className="mr-2 text-yellow-500" size={20} />
          Before You Contact Us
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
            <p className="text-gray-300 text-sm">Try restarting your device and the Netflix app</p>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
            <p className="text-gray-300 text-sm">Check your internet connection (minimum 3 Mbps required)</p>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
            <p className="text-gray-300 text-sm">Make sure your Netflix app is updated to the latest version</p>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', name: 'Overview', icon: HelpCircle },
    { id: 'faq', name: 'FAQ', icon: Book },
    { id: 'contact', name: 'Contact', icon: MessageCircle }
  ];

  return (
    <div className="fixed inset-0 bg-black/95 z-50 overflow-y-auto">
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-gray-900 border-b border-gray-700 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-red-600 text-2xl font-bold">NETFLIX</h1>
                <span className="text-gray-400">|</span>
                <h2 className="text-white text-xl font-semibold">Help Center</h2>
              </div>
              
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800"
              >
                <X size={24} />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-1 mt-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-red-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-6 py-8">
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'faq' && renderFAQTab()}
          {activeTab === 'contact' && renderContactTab()}
        </div>

        {/* Live Chat Modal */}
        {showChat && (
          <div className="fixed inset-0 bg-black/80 z-60 flex items-end justify-end p-6">
            <div className="bg-gray-900 border border-gray-700 rounded-xl w-96 h-96 flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <MessageCircle size={16} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Netflix Support</h3>
                    <p className="text-green-400 text-xs">Online now</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowChat(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">N</span>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3 max-w-xs">
                      <p className="text-white text-sm">Hi! I'm here to help you with any Netflix questions. What can I assist you with today?</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-gray-700">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        // Handle send message
                        setChatMessage('');
                      }
                    }}
                  />
                  <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors">
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};