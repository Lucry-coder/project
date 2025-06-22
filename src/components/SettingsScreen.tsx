import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Lock, 
  Bell, 
  Monitor, 
  Volume2, 
  Globe, 
  Shield, 
  CreditCard,
  Download,
  Smartphone,
  Tv,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';

interface SettingsScreenProps {
  isOpen: boolean;
  onClose: () => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onUpdateUser?: (userData: any) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser
}) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    language: 'en',
    autoplay: true,
    notifications: true,
    downloadQuality: 'high',
    streamingQuality: 'auto',
    maturityRating: 'all'
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  if (!isOpen) return null;

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');

    // Simula salvataggio
    setTimeout(() => {
      onUpdateUser?.(formData);
      setSaveMessage('Settings saved successfully!');
      setIsSaving(false);
      
      // Nascondi messaggio dopo 3 secondi
      setTimeout(() => setSaveMessage(''), 3000);
    }, 1000);
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'account', name: 'Account', icon: Shield },
    { id: 'playback', name: 'Playback', icon: Monitor },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'devices', name: 'Devices', icon: Smartphone },
    { id: 'billing', name: 'Billing', icon: CreditCard }
  ];

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="relative">
          {user?.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-20 h-20 rounded-full"
            />
          ) : (
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center">
              <User size={32} className="text-white" />
            </div>
          )}
          <button className="absolute bottom-0 right-0 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition-colors">
            <User size={12} />
          </button>
        </div>
        <div>
          <h3 className="text-white text-lg font-semibold">Profile Picture</h3>
          <p className="text-gray-400 text-sm">Click to change your avatar</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Language
          </label>
          <select
            value={formData.language}
            onChange={(e) => handleInputChange('language', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <option value="en">English</option>
            <option value="it">Italiano</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Maturity Rating
          </label>
          <select
            value={formData.maturityRating}
            onChange={(e) => handleInputChange('maturityRating', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <option value="all">All Maturity Ratings</option>
            <option value="teen">Teen and Below</option>
            <option value="mature">Mature</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderAccountTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-800/50 p-6 rounded-lg">
        <h3 className="text-white text-lg font-semibold mb-4 flex items-center">
          <Lock className="mr-2" size={20} />
          Change Password
        </h3>
        
        <div className="space-y-4">
          <div className="relative">
            <input
              type={showPasswords.current ? 'text' : 'password'}
              placeholder="Current Password"
              value={formData.currentPassword}
              onChange={(e) => handleInputChange('currentPassword', e.target.value)}
              className="w-full px-4 py-3 pr-12 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <button
              type="button"
              onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPasswords.current ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showPasswords.new ? 'text' : 'password'}
              placeholder="New Password"
              value={formData.newPassword}
              onChange={(e) => handleInputChange('newPassword', e.target.value)}
              className="w-full px-4 py-3 pr-12 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <button
              type="button"
              onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showPasswords.confirm ? 'text' : 'password'}
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className="w-full px-4 py-3 pr-12 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <button
              type="button"
              onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPasswords.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 p-6 rounded-lg">
        <h3 className="text-white text-lg font-semibold mb-4">Account Security</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Two-Factor Authentication</p>
              <p className="text-gray-400 text-sm">Add an extra layer of security</p>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors">
              Enable
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Login Activity</p>
              <p className="text-gray-400 text-sm">View recent login attempts</p>
            </div>
            <button className="text-red-400 hover:text-red-300 transition-colors">
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlaybackTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-800/50 p-6 rounded-lg">
        <h3 className="text-white text-lg font-semibold mb-4 flex items-center">
          <Monitor className="mr-2" size={20} />
          Video Quality
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Streaming Quality
            </label>
            <select
              value={formData.streamingQuality}
              onChange={(e) => handleInputChange('streamingQuality', e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="auto">Auto (Recommended)</option>
              <option value="low">Low (Save Data)</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="ultra">Ultra HD 4K</option>
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Download Quality
            </label>
            <select
              value={formData.downloadQuality}
              onChange={(e) => handleInputChange('downloadQuality', e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="standard">Standard</option>
              <option value="high">High</option>
              <option value="ultra">Ultra HD</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 p-6 rounded-lg">
        <h3 className="text-white text-lg font-semibold mb-4">Playback Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Autoplay next episode</p>
              <p className="text-gray-400 text-sm">Automatically play the next episode</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.autoplay}
                onChange={(e) => handleInputChange('autoplay', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Autoplay previews</p>
              <p className="text-gray-400 text-sm">Play previews while browsing</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-800/50 p-6 rounded-lg">
        <h3 className="text-white text-lg font-semibold mb-4 flex items-center">
          <Bell className="mr-2" size={20} />
          Notification Preferences
        </h3>
        
        <div className="space-y-4">
          {[
            { key: 'newReleases', label: 'New releases', desc: 'Get notified about new movies and shows' },
            { key: 'recommendations', label: 'Recommendations', desc: 'Personalized content suggestions' },
            { key: 'watchReminders', label: 'Watch reminders', desc: 'Reminders for shows in your list' },
            { key: 'accountUpdates', label: 'Account updates', desc: 'Important account information' },
            { key: 'promotions', label: 'Promotions', desc: 'Special offers and deals' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{item.label}</p>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={item.key !== 'promotions'}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDevicesTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-800/50 p-6 rounded-lg">
        <h3 className="text-white text-lg font-semibold mb-4 flex items-center">
          <Smartphone className="mr-2" size={20} />
          Manage Devices
        </h3>
        
        <div className="space-y-4">
          {[
            { name: 'MacBook Pro', type: 'Computer', lastUsed: '2 hours ago', current: true, icon: Monitor },
            { name: 'iPhone 15', type: 'Mobile', lastUsed: '1 day ago', current: false, icon: Smartphone },
            { name: 'Samsung Smart TV', type: 'TV', lastUsed: '3 days ago', current: false, icon: Tv },
            { name: 'iPad Air', type: 'Tablet', lastUsed: '1 week ago', current: false, icon: Smartphone }
          ].map((device, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-600 rounded-lg">
                  <device.icon size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-medium flex items-center">
                    {device.name}
                    {device.current && (
                      <span className="ml-2 px-2 py-1 bg-green-600 text-xs rounded-full">Current</span>
                    )}
                  </p>
                  <p className="text-gray-400 text-sm">{device.type} • Last used {device.lastUsed}</p>
                </div>
              </div>
              {!device.current && (
                <button className="text-red-400 hover:text-red-300 text-sm transition-colors">
                  Sign Out
                </button>
              )}
            </div>
          ))}
        </div>

        <button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-3 rounded-md transition-colors">
          Sign Out of All Devices
        </button>
      </div>
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-800/50 p-6 rounded-lg">
        <h3 className="text-white text-lg font-semibold mb-4 flex items-center">
          <CreditCard className="mr-2" size={20} />
          Subscription & Billing
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-red-600/20 border border-red-600/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-semibold">Premium Plan</p>
                <p className="text-gray-300 text-sm">Ultra HD • 4 screens • Download</p>
              </div>
              <div className="text-right">
                <p className="text-white font-bold text-xl">$15.99</p>
                <p className="text-gray-300 text-sm">per month</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-700/50 rounded-lg">
              <p className="text-white font-medium mb-2">Next billing date</p>
              <p className="text-gray-300">January 15, 2025</p>
            </div>
            <div className="p-4 bg-gray-700/50 rounded-lg">
              <p className="text-white font-medium mb-2">Payment method</p>
              <p className="text-gray-300">•••• •••• •••• 1234</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-md transition-colors">
              Change Plan
            </button>
            <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-md transition-colors">
              Update Payment
            </button>
            <button className="flex-1 text-red-400 hover:text-red-300 py-3 transition-colors">
              Cancel Subscription
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 p-6 rounded-lg">
        <h3 className="text-white text-lg font-semibold mb-4">Billing History</h3>
        <div className="space-y-3">
          {[
            { date: 'Dec 15, 2024', amount: '$15.99', status: 'Paid' },
            { date: 'Nov 15, 2024', amount: '$15.99', status: 'Paid' },
            { date: 'Oct 15, 2024', amount: '$15.99', status: 'Paid' }
          ].map((bill, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded">
              <span className="text-white">{bill.date}</span>
              <span className="text-white">{bill.amount}</span>
              <span className="text-green-400 text-sm">{bill.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfileTab();
      case 'account': return renderAccountTab();
      case 'playback': return renderPlaybackTab();
      case 'notifications': return renderNotificationsTab();
      case 'devices': return renderDevicesTab();
      case 'billing': return renderBillingTab();
      default: return renderProfileTab();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 border-r border-gray-700 flex-shrink-0">
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-white text-xl font-bold">Settings</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                      activeTab === tab.id
                        ? 'bg-red-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-white text-3xl font-bold">
                {tabs.find(tab => tab.id === activeTab)?.name}
              </h1>
              
              <div className="flex items-center space-x-4">
                {saveMessage && (
                  <div className="bg-green-600/20 border border-green-600/50 px-4 py-2 rounded-md">
                    <p className="text-green-400 text-sm">{saveMessage}</p>
                  </div>
                )}
                
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white px-6 py-3 rounded-md transition-colors flex items-center space-x-2"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};