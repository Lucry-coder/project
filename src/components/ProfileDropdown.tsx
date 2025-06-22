import React from 'react';
import { User, Settings, HelpCircle, LogOut, UserPlus } from 'lucide-react';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onSignOut: () => void;
  onSwitchUser: () => void;
  onOpenSettings: () => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  isOpen,
  onClose,
  onSignOut,
  onSwitchUser,
  onOpenSettings,
  user,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40" onClick={onClose}>
      <div className="absolute top-16 right-4 md:right-8 bg-black/95 backdrop-blur-md border border-gray-700 rounded-md shadow-xl min-w-64">
        <div className="p-2">
          {/* User Info */}
          <div className="flex items-center space-x-3 p-3 border-b border-gray-700">
            {user?.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-white/60 text-xs truncate">
                {user?.email || 'user@email.com'}
              </p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button 
              onClick={() => {
                onSwitchUser();
                onClose();
              }}
              className="flex items-center space-x-3 w-full text-left p-2 text-white hover:bg-gray-700/50 rounded transition-colors"
            >
              <UserPlus size={16} />
              <span className="text-sm">Switch Account</span>
            </button>
            
            <button 
              onClick={() => {
                onOpenSettings();
                onClose();
              }}
              className="flex items-center space-x-3 w-full text-left p-2 text-white hover:bg-gray-700/50 rounded transition-colors"
            >
              <Settings size={16} />
              <span className="text-sm">Account Settings</span>
            </button>
            
            <button className="flex items-center space-x-3 w-full text-left p-2 text-white hover:bg-gray-700/50 rounded transition-colors">
              <HelpCircle size={16} />
              <span className="text-sm">Help Center</span>
            </button>
          </div>

          {/* Sign Out */}
          <div className="border-t border-gray-700 pt-2">
            <button
              onClick={() => {
                onSignOut();
                onClose();
              }}
              className="flex items-center space-x-3 w-full text-left p-2 text-red-400 hover:bg-red-900/20 rounded transition-colors"
            >
              <LogOut size={16} />
              <span className="text-sm">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};