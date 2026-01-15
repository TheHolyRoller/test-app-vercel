'use client';

import { useState } from 'react';
// import { EmailTemplate } from '../Components/email-template.tsx';
import { EmailTemplate } from '../Components/email-template';


// Sample results data
const sampleResults = {
  reading: { 
    yes: 3, sometimes: 1, no: 1, 
    questions: [
      { q: "Do you find it difficult to read aloud?", answer: "Yes" },
      { q: "Do you often lose your place when reading?", answer: "Yes" },
      { q: "Do you find reading tiring?", answer: "Yes" }
    ] 
  },
  writing: { 
    yes: 2, sometimes: 2, no: 1, 
    questions: [
      { q: "Do you struggle with spelling?", answer: "Yes" },
      { q: "Do you find it hard to organize written work?", answer: "Yes" }
    ] 
  },
  memory: { 
    yes: 2, sometimes: 1, no: 2, 
    questions: [
      { q: "Do you have difficulty remembering sequences?", answer: "Yes" },
      { q: "Do you forget things you've just been told?", answer: "Yes" }
    ] 
  },
  tests: { 
    yes: 1, sometimes: 2, no: 2, 
    questions: [
      { q: "Do you run out of time in exams?", answer: "Yes" }
    ] 
  },
  plans: { 
    yes: 2, sometimes: 1, no: 2, 
    questions: [
      { q: "Do you find it hard to plan your day?", answer: "Yes" },
      { q: "Do you often feel disorganized?", answer: "Yes" }
    ] 
  }
};

// Score levels for testing
const scoreLevels = [
  { label: 'Level 1: High (75-100)', score: 85, color: '#dc2626' },
  { label: 'Level 2: Moderate (50-74)', score: 62, color: '#d97706' },
  { label: 'Level 3: Low (25-49)', score: 35, color: '#059669' },
  { label: 'Level 4: None (0-24)', score: 15, color: '#10b981' },
];

export default function EmailPreview() {
  const [viewMode, setViewMode] = useState('mobile');
  const [selectedLevel, setSelectedLevel] = useState(0);

  const containerWidth = viewMode === 'mobile' ? '375px' : '100%';
  const currentScore = scoreLevels[selectedLevel].score;

  const sampleQuizData = {
    recipientName: "Test User",
    results: sampleResults,
    score: currentScore,
    memoryScore: 14,
    writingScore: 16,
    readingScore: 18,
    examResultsScore: 10,
    organisationalScore: 14,
    yesAnswers: [],
    yesAnswersBySection: {},
    totalYesAnswers: 10
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f3f4f6', 
      padding: '20px' 
    }}>
      {/* Controls */}
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto 20px auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'center'
      }}>
        {/* View Mode */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setViewMode('mobile')}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: viewMode === 'mobile' ? '#1e40af' : '#e5e7eb',
              color: viewMode === 'mobile' ? 'white' : '#374151',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            📱 Mobile
          </button>
          <button
            onClick={() => setViewMode('desktop')}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: viewMode === 'desktop' ? '#1e40af' : '#e5e7eb',
              color: viewMode === 'desktop' ? 'white' : '#374151',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            🖥️ Desktop
          </button>
        </div>

        {/* Score Level Selector */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {scoreLevels.map((level, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedLevel(idx)}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                backgroundColor: selectedLevel === idx ? level.color : '#e5e7eb',
                color: selectedLevel === idx ? 'white' : '#374151',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      {/* Preview Container */}
      <div style={{ 
        maxWidth: containerWidth,
        margin: '0 auto',
        backgroundColor: 'white',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <EmailTemplate 
          firstName="Test User"
          toEmail="test@example.com"
          quizData={sampleQuizData}
        />
      </div>
    </div>
  );
}
