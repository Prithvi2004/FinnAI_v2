import React, { useState, useRef, useEffect } from 'react';
import { UserCircle2, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function UserMenu() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-300 hover:text-gold transition-colors"
      >
        <UserCircle2 className="w-8 h-8" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-navy-800 border border-navy-700 rounded-lg shadow-xl py-1 animate-fadeIn">
          <div className="px-4 py-2 border-b border-navy-700">
            <p className="text-sm text-gray-300 truncate">{user.email}</p>
          </div>
          
          <button
            onClick={() => {/* TODO: Implement settings */}}
            className="w-full px-4 py-2 text-left text-gray-300 hover:bg-navy-700 flex items-center space-x-2"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
          
          <button
            onClick={() => {
              signOut();
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left text-gray-300 hover:bg-navy-700 flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
}