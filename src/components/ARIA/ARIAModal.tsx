'use client';

import React from 'react';
import ARIAAgent from './ARIAAgent';

interface ARIAModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: any;
  initialMode?: 'study' | 'quiz' | 'coach';
}

export default function ARIAModal({ isOpen, onClose, user, initialMode = 'study' }: ARIAModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(15, 10, 7, 0.88)', backdropFilter: 'blur(8px)',
        zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16
      }} 
      onClick={onClose}
    >
      <div 
        style={{ 
          width: '100%', maxWidth: 860, maxHeight: '92vh',
          borderRadius: 24, overflow: 'hidden',
          boxShadow: '0 25px 70px rgba(0,0,0,0.6)',
          border: '1px solid rgba(201,135,79,0.2)'
        }} 
        onClick={e => e.stopPropagation()}
      >
        <ARIAAgent userId={user?.id} />
      </div>
    </div>
  );
}
