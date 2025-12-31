
// Import React to provide the React namespace for ReactNode types
import React from 'react';

export interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TrustFactor {
  title: string;
  description: string;
  icon: React.ReactNode;
}