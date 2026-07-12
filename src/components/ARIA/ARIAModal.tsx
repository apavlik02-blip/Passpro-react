'use client';
import React from 'react';
import ARIAAgent from './ARIAAgent';
export default function ARIAModal({ isOpen, onClose, user }) {
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,10,7,0.9)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={onClose}>
      <div style={{ width: '100%', maxWidth: 820, maxHeight: '90vh', background: '#1A120A', borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(201,135,79,0.2)' }} onClick={e => e.stopPropagation()}>
        <ARIAAgent userId={user?.id} />
      </div>
    </div>
  );
}
