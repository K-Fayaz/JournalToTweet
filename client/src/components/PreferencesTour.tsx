import React, { useEffect, useState } from 'react';

const steps = [
  {
    title: 'Step 1: Choose Your Tones',
    description: 'Select the writing tones that best reflect your personality. You can pick more than one!',
    button: 'Go to Tones',
    targetId: 'tones-section',
  },
  {
    title: 'Step 2: Pick 5 Timeslots',
    description: 'Choose up to 5 times per day for tweet generation. These are when the AI will analyze your journals.',
    button: 'Go to Timeslots',
    targetId: 'timeslots-section',
  },
  {
    title: 'Step 3: Save Preferences',
    description: 'Click the Save button below to save your selected tones and timeslots.',
    button: 'Go to Save',
    targetId: 'save-button',
  },
  {
    title: 'All Set!',
    description: 'You can update your tone and slots anytime from this page. Ready to continue!',
    button: 'Finish',
    targetId: null,
  },
];

const highlightClass = 'ring-4 ring-cyan-400 ring-opacity-60 transition-all duration-300';

const PreferencesTour: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    const storedStep = parseInt(localStorage.getItem('tourStep') || '1', 10);
    setStep(storedStep);
    setVisible(storedStep >= 1 && storedStep <= 4);
  }, []);

  useEffect(() => {
    // Highlight the relevant section
    steps.forEach((s, idx) => {
      if (!s.targetId) return;
      const el = document.getElementById(s.targetId);
      if (el) {
        if (step === idx + 1) {
          el.classList.add(highlightClass);
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          el.classList.remove(highlightClass);
        }
      }
    });
    // Remove highlight on unmount
    return () => {
      steps.forEach((s) => {
        if (!s.targetId) return;
        const el = document.getElementById(s.targetId);
        if (el) el.classList.remove(highlightClass);
      });
    };
  }, [step]);

  const handleAction = () => {
    if (step < 4) {
      setStep(step + 1);
      localStorage.setItem('tourStep', (step + 1).toString());
    } else {
      setVisible(false);
      localStorage.setItem('tourStep', '5');
    }
  };

  if (!visible || step < 1 || step > 4) return null;

  const { title, description, button } = steps[step - 1];

  return (
    <div className="fixed top-8 left-72 z-50 max-w-xs w-full">
      <div className="bg-gray-900 border border-cyan-600 rounded-2xl shadow-xl p-6 flex flex-col items-center animate-fade-in">
        <h3 className="text-lg font-bold text-cyan-400 mb-2 text-center">{title}</h3>
        <p className="text-gray-300 text-sm mb-4 text-center">{description}</p>
        <button
          onClick={handleAction}
          className="px-5 py-2 bg-cyan-600 rounded-lg font-bold text-white hover:bg-cyan-500 transition-colors duration-200 shadow"
        >
          {button}
        </button>
      </div>
    </div>
  );
};

export default PreferencesTour; 