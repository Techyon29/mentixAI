"use client";

import React, { useState } from 'react';
import PreExamSetup from './PreExamSetup';
import TestEnvironment from './TestEnvironment';

const MOCK_QUESTIONS = [
  { id: 1, text: "Which organelle is known as the 'Powerhouse of the Cell'?", options: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"] },
  { id: 2, text: "The primary site of photosynthesis in plants is:", options: ["Stem", "Root", "Flowers", "Leaves"] },
  { id: 3, text: "What gas is released during photosynthesis as a byproduct?", options: ["Carbon Dioxide", "Nitrogen", "Oxygen", "Hydrogen"] },
  { id: 4, text: "Chlorophyll is primarily responsible for absorbing which light spectrum?", options: ["Green", "Blue & Red", "Yellow", "Infrared"] },
  { id: 5, text: "The light-independent reactions of photosynthesis are also known as:", options: ["Krebs Cycle", "Calvin Cycle", "Glycolysis", "Citric Acid Cycle"] },
];

const TestFlowContainer = () => {
  const [testState, setTestState] = useState<'setup' | 'attempting'>('setup');

  const handleSetupComplete = () => {
    setTestState('attempting');
  };

  const handleTestFinish = (score: number) => {
    // After test finish, we usually close the tab or redirect back
    window.close();
  };

  if (testState === 'setup') {
    return <PreExamSetup onComplete={handleSetupComplete} testName="Photosynthesis Process" />;
  }

  return (
    <TestEnvironment 
      testName="Photosynthesis Process" 
      questions={MOCK_QUESTIONS} 
      onFinish={handleTestFinish} 
    />
  );
};

export default TestFlowContainer;
