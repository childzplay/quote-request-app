import React from 'react';
import { ArrowLeft } from 'lucide-react';


export const PrimaryButton = ({ onClick, text, styles = "Vahvista!" }) => {
  return (
    <button 
      onClick={onClick}
      className={`bg-gradient-to-tl from-purple-600 to-teal-500 text-white text-xl font-bold px-8 py-4 rounded transition-all duration-300 hover:text-2xl ${styles}`}
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

export const SubmitButton = ({ text, styles, onClick }) => {
  return (
    <button 
      type="submit"
      onClick={onClick} 
      className={`bg-gradient-to-tl from-purple-600 to-teal-500 text-white text-2xl px-8 py-5 rounded font-bold transition-all duration-300 hover:text-3xl ${styles}`}
    >
      {text}
    </button>
  );
};