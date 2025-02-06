import React from 'react';
import { ArrowLeft } from 'lucide-react';

export const PrimaryButton = ({ onClick, text = "Vahvista!" }) => {
  return (
    <button 
      onClick={onClick}
      className="bg-gradient-to-tl from-purple-600 to-teal-500 text-white text-lg font-bold px-6 py-3 rounded hover:bg-green-700"
    >
      {text}
    </button>
  );
};

export const ReturnButton = ({ size = 16, color = "purple", text = "Takaisin", onClick }) => {
  return (
    <button 
      onClick={onClick} 
      className="flex items-center text-gray-600 hover:text-purple-600 px-0 py-2 mb-6 transition-colors"
    >
      <ArrowLeft size={size} />
      <span className="ml-2">{text}</span>
    </button>
  );
};

export const SubmitButton = ({ text, onClick }) => {
  return (
    <button 
      type="submit"
      onClick={onClick} 
      className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
    >
      {text}
    </button>
  );
};