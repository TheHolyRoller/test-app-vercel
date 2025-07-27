import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  message?: string;
  quizData?: {
    recipientName: string;
    results: any;
    finalScore: number;
    memoryScore: number;
    writingScore: number;
    readingScore: number;
    examResultsScore: number;
    organisationalScore: number;
  };
}

const DyslexiaResultsReport = ({
  recipientName = "Quiz Participant",
  results = {
    reading: { yes: 0, sometimes: 0, no: 0, questions: [] },
    writing: { yes: 0, sometimes: 0, no: 0, questions: [] },
    memory: { yes: 0, sometimes: 0, no: 0, questions: [] },
    tests: { yes: 0, sometimes: 0, no: 0, questions: [] },
    plans: { yes: 0, sometimes: 0, no: 0, questions: [] }
  },
  showDetailedQuestions = true
}) => {
  const sections = [
    { key: 'reading', title: 'Reading', icon: '📖', color: '#10b981' },
    { key: 'writing', title: 'Writing', icon: '✍️', color: '#3b82f6' },
    { key: 'memory', title: 'Memory', icon: '🧠', color: '#f59e0b' },
    { key: 'tests', title: 'Tests', icon: '📝', color: '#eab308' },
    { key: 'plans', title: 'Planning & Organization', icon: '📋', color: '#ef4444' }
  ];

  // Calculate the score for a single section: Only 'Yes' answers contribute points
  const getSectionScore = (sectionData: any) => {
    return sectionData.yes || 0;
  };

  // Calculate the overall assessment score
  const getOverallAssessmentScore = () => {
    let totalScore = 0;
    let totalPossibleYesQuestions = 0;

    sections.forEach(section => {
      const sectionData = results[section.key];
      if (sectionData) {
        totalScore += getSectionScore(sectionData);
        totalPossibleYesQuestions += sectionData.questions ? sectionData.questions.length : 0;
      }
    });

    const normalizedScore = totalPossibleYesQuestions > 0 ? (totalScore / totalPossibleYesQuestions) * 100 : 0;
    return {
      score: totalScore,
      maxScore: totalPossibleYesQuestions,
      normalizedScore: Math.round(normalizedScore)
    };
  };

  const { normalizedScore } = getOverallAssessmentScore();
  const DYSLEXIA_ZONE_THRESHOLD = 75;

  const getOverallMessage = () => {
    if (normalizedScore >= 75) {
      return {
        level: 'High Likelihood of Dyslexia',
        message: 'Your responses strongly indicate characteristics commonly associated with dyslexia across multiple learning areas. This pattern suggests you may benefit significantly from professional evaluation and specialized learning strategies. Many successful individuals with dyslexia have found that understanding their learning differences opens doors to effective accommodations and personalized approaches that enhance their strengths.',
        color: '#dc2626',
        bgColor: '#fef2f2'
      };
    } else if (normalizedScore >= 50) {
      return {
        level: 'Moderate Likelihood of Dyslexia',
        message: 'Your responses indicate several signs that could be related to dyslexia, suggesting a moderate likelihood of these learning differences. While these patterns aren\'t conclusive on their own, they point toward potential areas where targeted support or accommodations might be helpful. Consider discussing these results with an educational specialist to explore strategies that could enhance your learning experience.',
        color: '#d97706',
        bgColor: '#fffbeb'
      };
    } else if (normalizedScore >= 25) {
      return {
        level: 'Low Likelihood of Dyslexia',
        message: 'Your responses show some characteristics that can be associated with dyslexia, but overall suggest a lower likelihood of significant dyslexic traits. While everyone has unique learning preferences, your patterns indicate that traditional learning approaches likely work well for you. However, if you continue to experience specific challenges, don\'t hesitate to seek guidance from learning specialists.',
        color: '#059669',
        bgColor: '#f0fdf4'
      };
    } else {
      return {
        level: 'Very Low Likelihood of Dyslexia',
        message: 'Your responses indicate very few characteristics typically associated with dyslexia. This suggests that you likely process information in ways that align well with conventional learning and reading methods. Your learning profile appears to be well-suited to traditional educational approaches, though everyone can benefit from discovering their optimal learning strategies.',
        color: '#10b981',
        bgColor: '#ecfdf5'
      };
    }
  };

  const overallResult = getOverallMessage();
  const reportDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif', backgroundColor: '#ffffff' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#1e40af', padding: '40px 30px', textAlign: 'center' }}>
        <h1 style={{ color: '#ffffff', fontSize: '32px', fontWeight: 'bold', margin: '0 0 16px 0' }}>
          Dyslexia Screener Report
        </h1>
        <p style={{ color: '#e0e7ff', fontSize: '18px', margin: '0 0 8px 0' }}>
          For: <strong>{recipientName}</strong>
        </p>
        <p style={{ color: '#e0e7ff', fontSize: '14px', margin: '0' }}>
          Date of Report: {reportDate}
         <span style={{fontWeight: '600', display: 'block', marginTop: '1rem'}} >

          AdultDyslexiaScreener.com 
          <span style={{display: 'block'}}></span>
          by ivvi
         </span>
        </p>
      </div>

      {/* Introduction */}

      {/* replace this text with a dynamic variable that you pass in through props  */}
      <div style={{ padding: '30px' }}>
                 <div style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '24px', marginBottom: '32px', textAlign: 'center' }}>
           <p style={{ color: '#374151', fontSize: '16px', lineHeight: '1.6', margin: '0' }}>
           This report summarizes your results from the Adult Dyslexia Screening Assessment. This is a <span style={{fontWeight: '700'}}> screening tool  </span> and <span style={{fontWeight: '700'}}> not a diagnosis.   </span>  It helps identify potential signs of dyslexia and highlight if a Dyslexia Assessment or support might be beneficial.
           </p>
         </div>

                   {/* Overall Summary */}
        <div style={{ backgroundColor: overallResult.bgColor, border: `2px solid ${overallResult.color}`, borderRadius: '12px', padding: '32px', marginBottom: '32px', textAlign: 'center' }}>
          <h2 style={{ color: '#1f2937', fontSize: '28px', fontWeight: 'bold', margin: '0 0 24px 0' }}>
            Overall Result
          </h2>

          {/* Score Circle */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ 
              // width: '120px', 
              // height: '120px', 
              // borderRadius: '50%', 
              // backgroundColor: normalizedScore >= DYSLEXIA_ZONE_THRESHOLD ? '#dc2626' : '#2563eb',
              // color: '#ffffff',
              // fontSize: '36px',
              // fontWeight: 'bold',
              // display: 'flex',
              // alignItems: 'center',
              // justifyContent: 'center',
              // margin: '0 auto 8px auto',
              // boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
            }}>
            </div>
            <h1 style={{fontSize: '2rem',  color: '#4169E1'}} >

              <span style={{fontSize: '3.3rem', fontWeight: '750'}} >

              {normalizedScore}
              </span>
              /100
            </h1>
            {/* <p style={{ color: '#374151', fontSize: '16px', fontWeight: '600', margin: '0' }}>Overall Score</p> */}
          </div>

          {/* Zone Indicator */}
          <div style={{ marginBottom: '24px' }}>
            {normalizedScore >= 75 ? (
              <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '8px 16px', borderRadius: '20px', fontSize: '16px', fontWeight: 'bold', display: 'inline-block' }}>
                🚨 High Likelihood Zone (75-100%)
              </div>
            ) : normalizedScore >= 50 ? (
              <div style={{ backgroundColor: '#fef3c7', color: '#92400e', padding: '8px 16px', borderRadius: '20px', fontSize: '16px', fontWeight: 'bold', display: 'inline-block' }}>
                ⚠️ Moderate Likelihood Zone (50-74%)
              </div>
            ) : normalizedScore >= 25 ? (
              <div style={{ backgroundColor: '#d1fae5', color: '#065f46', padding: '8px 16px', borderRadius: '20px', fontSize: '16px', fontWeight: 'bold', display: 'inline-block' }}>
                ✓ Low Likelihood Zone (25-49%)
              </div>
            ) : (
              <div style={{ backgroundColor: '#ecfdf5', color: '#047857', padding: '8px 16px', borderRadius: '20px', fontSize: '16px', fontWeight: 'bold', display: 'inline-block' }}>
                ✅ Very Low Likelihood Zone (0-24%)
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ backgroundColor: '#e5e7eb', height: '30px', borderRadius: '15px', position: 'relative', border: '2px solid #d1d5db' }}>
              <div style={{ 
                backgroundColor: normalizedScore >= 75 ? '#dc2626' : normalizedScore >= 50 ? '#d97706' : '#059669',
                height: '26px',
                borderRadius: '13px',
                width: `${Math.min(normalizedScore, 100)}%`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: '8px',
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: '14px'
              }}>

                {normalizedScore}
                /100
              </div>
              {/* Zone markers */}
              {/* <div style={{ position: 'absolute', top: '-8px', left: '25%', color: '#6b7280', fontWeight: 'bold', fontSize: '10px' }}>
                25%
              </div>
              <div style={{ position: 'absolute', top: '-8px', left: '50%', color: '#d97706', fontWeight: 'bold', fontSize: '10px' }}>
                50%
              </div>
              <div style={{ position: 'absolute', top: '-8px', left: '75%', color: '#dc2626', fontWeight: 'bold', fontSize: '10px' }}>
                75%
              </div> */}
            </div>
          </div>

          <h3 style={{ color: overallResult.color, fontSize: '20px', fontWeight: 'bold', margin: '0 0 12px 0' }}>
            {overallResult.level}
          </h3>
                     <p style={{ color: '#374151', fontSize: '16px', lineHeight: '1.6', margin: '0' }}>
             {overallResult.message}
           </p>
         </div>

         {/* Understanding Your Results */}
         <div style={{ backgroundColor: '#fffbeb', border: '2px solid #f59e0b', borderRadius: '12px', padding: '32px', marginBottom: '32px' }}>
           <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
             <div style={{ 
               backgroundColor: '#f59e0b', 
               width: '40px', 
               height: '40px', 
               borderRadius: '8px', 
               display: 'flex', 
               alignItems: 'center', 
               justifyContent: 'center', 
               color: '#ffffff', 
               fontSize: '20px', 
               marginRight: '12px'
             }}>
               💡
             </div>
             <h2 style={{ color: '#1f2937', fontSize: '24px', fontWeight: 'bold', margin: '0' }}>
               Understanding Your Results
             </h2>
           </div>
           
           <div style={{ color: '#374151', fontSize: '16px', lineHeight: '1.6' }}>
             <p style={{ marginBottom: '16px' }}>
               This screener assesses common indicators of Dyslexia, informed by a meta-analysis of screening questions used by Dyslexia associations worldwide and Dyslexia researchers, to help identify those with a high probability of dyslexia. To properly identify dyslexia, you need to have a full 1-2 hour dyslexia assessment.
             </p>
             <p style={{ margin: '0' }}>
               This short screener identifies where you may be affected across several key areas. A score above 75% is an indicator that dyslexia may be affecting your studies or work. Below are the questions you answered &#39;Yes&#39; to.
             </p>
           </div>
         </div>

         {/* Detailed Results by Area */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ color: '#1f2937', fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
            📋 Detailed Results by Area
          </h2>
          
          {sections.map(section => {
            const sectionData = results[section.key];
            const filteredQuestions = sectionData?.questions?.filter((item: any) => item.answer === 'Yes') || [];

            if (filteredQuestions.length === 0) {
              return null;
            }

            return (
              <div key={section.key} style={{ 
                backgroundColor: section.color + '1a', 
                border: `2px solid ${section.color}`, 
                borderRadius: '12px', 
                padding: '24px', 
                marginBottom: '20px' 
              }}>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ 
                    backgroundColor: section.color, 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '8px', 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: '#ffffff', 
                    fontSize: '20px', 
                    fontWeight: 'bold',
                    marginRight: '12px',
                    verticalAlign: 'middle'
                  }}>
                    {section.icon}
                  </div>
                  <span style={{ color: '#1f2937', fontSize: '20px', fontWeight: 'bold', verticalAlign: 'middle' }}>
                    Signs of Dyslexia in {section.title}
                  </span>
                </div>

                {showDetailedQuestions && (
                  <div>
                    <h4 style={{ color: '#1f2937', fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>
                      Question Details:
                    </h4>
                    <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '16px', border: '1px solid #e5e7eb' }}>
                      {filteredQuestions.map((item: any, idx: number) => (
                        <div key={idx} style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'flex-start', 
                          padding: '12px', 
                          backgroundColor: '#f9fafb', 
                          borderRadius: '6px', 
                          marginBottom: idx < filteredQuestions.length - 1 ? '8px' : '0'
                        }}>
                          <span style={{ color: '#1f2937', fontWeight: '500', flex: '1', paddingRight: '16px' }}>
                            {idx + 1}. {item.q}
                          </span>
                          <div style={{ 
                            backgroundColor: '#10b981', 
                            color: '#ffffff', 
                            padding: '4px 12px', 
                            borderRadius: '12px', 
                            fontSize: '12px', 
                            fontWeight: 'bold'
                          }}>
                            YES
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Next Steps */}
        <div style={{ backgroundColor: '#f3e8ff', border: '2px solid #8b5cf6', borderRadius: '12px', padding: '32px', marginBottom: '32px' }}>
          <h2 style={{ color: '#1f2937', fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
            🎯 Recommended Next Steps & Self-Advocacy
          </h2>
          <div style={{ color: '#374151', fontSize: '16px', lineHeight: '1.6' }}>
            <div style={{ marginBottom: '16px' }}>
              <span style={{ color: '#8b5cf6', fontWeight: 'bold' }}>✓</span>
              <strong> Professional Consultation:</strong> Share this report with an educational psychologist,
              learning specialist, or a relevant professional to discuss a formal evaluation and personalized support strategies.
            </div>
            <div style={{ marginBottom: '16px' }}>
              <span style={{ color: '#8b5cf6', fontWeight: 'bold' }}>✓</span>
              <strong> Document Your Experiences:</strong> Keep a journal detailing specific challenges,
              such as how difficulties with reading or writing impact daily tasks or work.
            </div>
            <div style={{ marginBottom: '16px' }}>
              <span style={{ color: '#8b5cf6', fontWeight: 'bold' }}>✓</span>
              <strong> Research Accommodations:</strong> Explore common accommodations for dyslexia
              in academic and professional settings (e.g., extended time, assistive technology, audiobooks).
            </div>
            <div style={{ marginBottom: '16px' }}>
              <span style={{ color: '#8b5cf6', fontWeight: 'bold' }}>✓</span>
              <strong> Connect with Support Groups:</strong> Find local or online dyslexia support networks.
              Sharing experiences and strategies with others who understand can be incredibly empowering.
            </div>
            <div>
              <span style={{ color: '#8b5cf6', fontWeight: 'bold' }}>✓</span>
              <strong> Embrace Your Strengths:</strong> Remember that dyslexia often comes with unique strengths
              such as strong visual-spatial reasoning, creative thinking, and problem-solving skills.
            </div>
          </div>
        </div>

        {/* Visual Strategies */}
        <div style={{ backgroundColor: '#f0fdf4', border: '2px solid #10b981', borderRadius: '12px', padding: '32px', marginBottom: '32px' }}>
          <h2 style={{ color: '#1f2937', fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
            ✨ Visual Strategy Suggestions ✨
          </h2>
          <p style={{ color: '#374151', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
            This screener is brought to you by <a href="https://ivvi.app" style={{ color: '#2563eb', fontWeight: '600' }}>ivvi.app</a>, 
            a mind-mapping software designed for individuals with dyslexia. Consider exploring visual learning techniques and tools like mind maps to enhance your learning experience.
          </p>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '20px', border: '1px solid #d1d5db' }}>
            <h3 style={{ color: '#1f2937', fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>
              Recommended Visual Strategies:
            </h3>
            <ul style={{ color: '#374151', fontSize: '14px', lineHeight: '1.6', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}>Use mind maps to organize information visually</li>
              <li style={{ marginBottom: '8px' }}>Try color-coding for different topics or categories</li>
              <li style={{ marginBottom: '8px' }}>Break down complex tasks into visual flowcharts</li>
              <li style={{ marginBottom: '8px' }}>Use graphic organizers for writing and planning</li>
              <li style={{ marginBottom: '8px' }}>Explore text-to-speech and audiobook options</li>
              <li>Consider using ivvi.app for visual note-taking and brainstorming</li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{ backgroundColor: '#fef2f2', border: '2px solid #dc2626', borderRadius: '12px', padding: '24px', marginBottom: '32px' }}>
          <h3 style={{ color: '#1f2937', fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>
            ⚠️ Important Disclaimer
          </h3>
          <p style={{ color: '#374151', fontSize: '16px', lineHeight: '1.6', margin: '0' }}>
            This screening tool is for informational purposes only and is not a diagnostic instrument.
            It cannot replace a comprehensive evaluation by a qualified professional (e.g., an educational psychologist).
            Decisions regarding learning accommodations, educational plans, or employment adjustments
            should always be made in consultation with relevant experts.
          </p>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', color: '#6b7280', fontSize: '14px', borderTop: '1px solid #e5e7eb', paddingTop: '24px' }}>
          <p style={{ margin: '0 0 8px 0' }}>
            Questions? Contact us at{' '}
            <a href="mailto:support@dyslexiaquiz.com" style={{ color: '#2563eb' }}>
              support@dyslexiaquiz.com
            </a>
          </p>
          <p style={{ margin: '0' }}>
            This report was generated using an AI-powered screening tool.
          </p>
        </div>
      </div>


    </div>
  );
};

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  message,
  quizData
}) => {
  // If quiz data is available, render the full report
  if (quizData) {
    return (
      <DyslexiaResultsReport 
        recipientName={quizData.recipientName || firstName}
        results={quizData.results}
        showDetailedQuestions={true}
      />
    );
  }

  // Otherwise, render the simple template
  return (
    <div>
      <h1>Welcome, {firstName}!</h1>
      {message && (
        <div style={{ whiteSpace: 'pre-line' }}>
          {message}
        </div>
      )}
    </div>
  );
};