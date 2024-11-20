import React from 'react';
import { Timer } from './Timer';

export function FloatingTimer() {
  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 bg-card rounded-2xl shadow-lg p-6 border hidden lg:block">
      <Timer compact />
    </div>
  );
}