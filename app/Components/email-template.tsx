import * as React from 'react';

interface EmailTemplateProps {
 firstName: string;
 message?: string;
 toEmail?: string;
 quizData?: {
 recipientName: string;
 results: any;
 finalScore: number;
 score: number;
 memoryScore: number;
 writingScore: number;
 readingScore: number;
 examResultsScore: number;
 organisationalScore: number;
 yesAnswers?: any[];
 yesAnswersBySection?: any;
 totalYesAnswers?: number;
 };
}

// Brand colors from ivvi Design System 2026
const brand = {
 reason: '#013699', // Primary blue
 action: '#ef7a1a', // Orange CTA
 vision: '#79a479', // Green
 wisdom: '#d3c9bf', // Neutral tan
 comfort: '#eeede8', // Light background
 creation: '#00143d', // Dark navy text
};

const DyslexiaResultsReport = ({
 recipientName = "Quiz Participant",
 results = {
 reading: { yes: 0, sometimes: 0, no: 0, questions: [] },
 writing: { yes: 0, sometimes: 0, no: 0, questions: [] },
 memory: { yes: 0, sometimes: 0, no: 0, questions: [] },
 tests: { yes: 0, sometimes: 0, no: 0, questions: [] },
 plans: { yes: 0, sometimes: 0, no: 0, questions: [] }
 },
 toEmail,
 showDetailedQuestions = true,
 finalScore = 0,
 yesAnswers = [],
 yesAnswersBySection = {}
}) => {
 const sections = [
 { key: 'reading', title: 'Reading', icon: '📖', color: brand.reason },
 { key: 'writing', title: 'Writing', icon: '✍️', color: brand.action },
 { key: 'memory', title: 'Memory', icon: '🧠', color: brand.vision },
 { key: 'tests', title: 'Tests', icon: '📝', color: brand.wisdom },
 { key: 'plans', title: 'Planning & Organization', icon: '📋', color: brand.reason }
 ];

 const unsubscribeURL = `http://:3000/unsubscribe?email=${encodeURI(toEmail)}`;
 const normalizedScore = Math.round(finalScore);
 const reportDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

 // Determine level (1-4) based on score
 const getLevel = () => {
 if (normalizedScore >= 75) return 1;
 if (normalizedScore >= 50) return 2;
 if (normalizedScore >= 25) return 3;
 return 4;
 };
 const level = getLevel();

 // Level-specific content
 const getLevelContent = () => {
 if (level === 1) {
 return {
 headline: 'High Likelihood of Dyslexia',
 color: brand.action, // Orange instead of red - urgent but not scary
 summary: `Your responses show a strong pattern of traits commonly associated with dyslexia. You may have already been identified with dyslexia or a Specific Learning Difficulty (SpLD) earlier in life—or this might be confirming something you've long suspected.

Even if you've learned to read, dyslexia affects much more than reading ability. It can impact memory, organisation, writing, and how you perform under test conditions. For studying, these wider impacts matter significantly.`,
 understanding: `Your score of ${normalizedScore}% places you in the high likelihood range. This doesn't mean there's anything "wrong" with you—it means your brain processes information differently, and you've likely been working harder than others to achieve your results.

If you've made it this far in education without formal support, you've done so through determination and extra effort. But as studying gets more demanding—more reading, more writing, tighter deadlines, higher-stakes exams—this approach can become harder to sustain.`,
 recommendations: [
 { bold: 'Try text-to-speech tools', text: ' for reading-heavy content' },
 { bold: 'Explore speech-to-text', text: ' for writing tasks' },
 { bold: 'Use visual note-taking', text: ' methods like mind mapping' },
 { bold: 'Look at which categories scored highest', text: ' to understand where to focus' }
 ],
 recommendationsIntro: 'While you explore assessment:'
 };
 } else if (level === 2) {
 return {
 headline: 'Moderate Likelihood of Dyslexia or Related Difference',
 color: brand.action, // Orange - worth attention
 summary: `Your responses suggest a moderate likelihood of dyslexia or a related neurodivergent profile. You've identified with a notable number of challenges. This may indicate dyslexia, or it could point to another difference such as ADHD, which shares many traits with dyslexia.

At this level, it can feel like you can push through. But often it's the testing, planning, and writing challenges that trip you up when it matters most.`,
 understanding: `Your score of ${normalizedScore}% places you in the moderate likelihood range. This suggests there's something worth exploring further.

Check your category breakdown:
• If Reading and Writing are high but Planning and Tests are low → this points more toward dyslexia
• If Planning, Memory, and Tests are high but Reading is low → this may indicate ADHD or executive function differences
• A mix across all areas → investigating multiple possibilities may be helpful`,
 recommendations: [
 { bold: 'Look at which categories scored highest', text: '—this tells you where to focus' },
 { bold: 'Try strategies designed', text: ' for different thinking styles' },
 { bold: 'Use tools that reduce cognitive load', text: ' (visual planners, recording apps, speech-to-text)' },
 { bold: "Don't dismiss your challenges", text: ' as "just needing to try harder"' }
 ],
 recommendationsIntro: 'In the meantime:'
 };
 } else if (level === 3) {
 return {
 headline: 'Low Likelihood of Dyslexia',
 color: brand.vision, // Green - reassuring
 summary: `Your responses suggest some traits that can be associated with dyslexia, but at a level that indicates dyslexia is unlikely to be significantly affecting you.

That said, there are a few things worth considering. If you have a spike in one particular category, there may be something specific worth exploring. And sometimes, stress, anxiety, or tiredness can affect how we respond to questions like these.`,
 understanding: `Your score of ${normalizedScore}% places you in the low likelihood range. Based on this screening, dyslexia is unlikely to be significantly affecting your studies.

However, check your category breakdown:
• If one category is notably higher than others, you may have specific challenges in that area worth addressing
• If all categories are relatively even, this profile is less likely to indicate a specific learning difference

Consider other factors: Are you currently stressed, anxious, or going through a difficult time? Were you tired when you completed the screener?`,
 recommendations: [
 { bold: "If you're struggling with your studies", text: ', consider speaking to your student support or wellbeing service—about what\'s going on for you more broadly' },
 { bold: 'Explore general study skills', text: ' and learning strategies' },
 { bold: 'If a particular category stood out', text: ', look into strategies for that specific area' },
 { bold: 'Take care of your wellbeing', text: '—stress and anxiety can affect learning just as much as a learning difference' }
 ],
 recommendationsIntro: 'Some suggestions:'
 };
 } else {
 return {
 headline: 'No Significant Indicators',
 color: brand.vision, // Green - all good
 summary: `Based on your responses, the screener hasn't identified significant indicators of dyslexia. Your current approaches to studying appear to be working well for you.`,
 understanding: `Your score of ${normalizedScore}% indicates that the challenges commonly associated with dyslexia are not strongly present in your responses.

This screening is just one snapshot. If you have concerns that weren't captured by these questions, or if your situation changes, you're always welcome to retake the screener or speak to a professional.`,
 recommendations: [],
 recommendationsIntro: ''
 };
 }
 };

 const content = getLevelContent();

 // Section visibility based on level
 const showAssessmentRecommendation = level <= 2;
 const showDetailedResults = level <= 3;
 const showVisualStrategies = level <= 3;

 return (
 <div style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif', backgroundColor: '#ffffff' }}>
 
 {/* Header - Reason Blue */}
 <div style={{ backgroundColor: brand.reason, padding: '32px 16px', textAlign: 'center' }}>
 <h1 style={{ color: '#ffffff', fontSize: '26px', fontWeight: 'bold', margin: '0 0 12px 0' }}>
 Dyslexia Screener Report
 </h1>
 <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', margin: '0 0 4px 0' }}>
 For: <strong>{recipientName}</strong>
 </p>
 <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', margin: '0' }}>
 {reportDate} • AdultDyslexiaScreener.com by ivvi
 </p>
 </div>

 {/* Overall Result + Summary - Full blue block like header */}
 <div style={{ backgroundColor: brand.reason, padding: '32px 16px', textAlign: 'center' }}>
 <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', margin: '0 0 20px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
 Your Result
 </p>
 <div style={{ fontSize: '64px', fontWeight: '800', color: '#ffffff', margin: '0 0 8px 0' }}>
 {normalizedScore}<span style={{ fontSize: '24px', fontWeight: '400', opacity: 0.7 }}>/100</span>
 </div>
 <div style={{ color: '#ffffff', fontSize: '20px', fontWeight: '700', marginBottom: '24px', padding: '8px 20px', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '20px', display: 'inline-block' }}>
 {content.headline}
 </div>
 </div>

 {/* Summary - Comfort background */}
 <div style={{ backgroundColor: brand.comfort, padding: '24px 16px' }}>
 <p style={{ color: brand.creation, fontSize: '13px', fontWeight: '600', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.7 }}>
 What this means
 </p>
 {content.summary.split('\n\n').map((paragraph, idx) => (
 <p key={idx} style={{ color: brand.creation, fontSize: '15px', lineHeight: '1.8', margin: idx < content.summary.split('\n\n').length - 1 ? '0 0 16px 0' : '0' }}>
 {paragraph}
 </p>
 ))}
 </div>

 {/* Understanding Your Results - White background */}
 <div style={{ backgroundColor: '#ffffff', padding: '28px 16px' }}>
 <h2 style={{ color: brand.creation, fontSize: '18px', fontWeight: 'bold', margin: '0 0 20px 0' }}>
 💡 Understanding Your Results
 </h2>
 {content.understanding.split('\n\n').map((paragraph, idx) => (
 <p key={idx} style={{ color: brand.creation, fontSize: '15px', lineHeight: '1.8', margin: '0 0 16px 0', whiteSpace: 'pre-line' }}>
 {paragraph}
 </p>
 ))}
 </div>

 {/* Assessment Recommendation - Action Orange - Only for Level 1 & 2 */}
 {showAssessmentRecommendation && (
 <div style={{ backgroundColor: brand.action, padding: '24px 16px' }}>
 <h2 style={{ color: '#ffffff', fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0' }}>
 🎯 Assessment Recommendation
 </h2>
 <p style={{ color: '#ffffff', fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px 0', fontWeight: '600' }}>
 We recommend speaking to your student support or wellbeing service about getting a formal assessment.
 </p>
 <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 12px 0' }}>
 A dyslexia assessment (typically 1-2 hours with an educational psychologist) will:
 </p>
 <div style={{ color: 'rgba(255,255,255,0.95)', fontSize: '14px', lineHeight: '1.8' }}>
 <p style={{ margin: '0 0 6px 0' }}>• Confirm your profile and document your specific challenges</p>
 <p style={{ margin: '0 0 6px 0' }}>• Unlock access to support such as extra time in exams, assistive technology, and learning support</p>
 <p style={{ margin: '0 0 16px 0' }}>• For UK university students, enable access to Disabled Students' Allowance (DSA) funding</p>
 </div>
 <p style={{ color: '#ffffff', fontSize: '14px', lineHeight: '1.6', margin: '0', fontWeight: '600' }}>
 Take this report to your conversation. Your student support team can guide you toward assessment.
 </p>
 </div>
 )}

 {/* Detailed Results by Area - Comfort background - Only for Levels 1-3 */}
 {showDetailedResults && (
 <div style={{ backgroundColor: brand.comfort, padding: '28px 16px' }}>
 <h2 style={{ color: brand.creation, fontSize: '18px', fontWeight: 'bold', margin: '0 0 20px 0' }}>
 📋 Questions You Answered Yes To
 </h2>
 
 {sections.map(section => {
 const sectionData = results[section.key];
 const filteredQuestions = sectionData?.questions?.filter((item: any) => item.answer === 'Yes') || [];

 if (filteredQuestions.length === 0) {
 return null;
 }

 return (
 <div key={section.key} style={{ 
 backgroundColor: '#ffffff', 
 borderRadius: '12px', 
 padding: '20px', 
 marginBottom: '16px'
 }}>
 <h3 style={{ color: brand.reason, fontSize: '16px', fontWeight: '700', margin: '0 0 16px 0' }}>
 {section.icon} {section.title}
 </h3>
 {showDetailedQuestions && filteredQuestions.map((item: any, idx: number) => (
 <div key={idx} style={{ 
 display: 'flex', 
 justifyContent: 'space-between', 
 alignItems: 'flex-start',
 padding: '12px 0',
 borderBottom: idx < filteredQuestions.length - 1 ? '1px solid #f0f0f0' : 'none'
 }}>
 <span style={{ color: brand.creation, fontSize: '14px', flex: '1', paddingRight: '16px', lineHeight: '1.5' }}>
 {item.q}
 </span>
 <span style={{ 
 color: brand.vision, 
 fontSize: '11px', 
 fontWeight: '700',
 flexShrink: 0,
 backgroundColor: '#f0f7f0',
 padding: '4px 10px',
 borderRadius: '12px'
 }}>
 YES
 </span>
 </div>
 ))}
 </div>
 );
 })}
 </div>
 )}

 {/* General Recommendations - White background */}
 {content.recommendations.length > 0 && (
 <div style={{ backgroundColor: '#ffffff', padding: '28px 16px' }}>
 <h2 style={{ color: brand.creation, fontSize: '18px', fontWeight: 'bold', margin: '0 0 20px 0' }}>
 📝 {content.recommendationsIntro}
 </h2>
 <div style={{ color: brand.creation, fontSize: '15px', lineHeight: '1.8' }}>
 {content.recommendations.map((rec, idx) => (
 <p key={idx} style={{ margin: idx < content.recommendations.length - 1 ? '0 0 14px 0' : '0' }}>
 ✓ <strong>{rec.bold}</strong>{rec.text}
 </p>
 ))}
 </div>
 </div>
 )}

 {/* Level 4 closing message - Comfort background */}
 {level === 4 && (
 <div style={{ backgroundColor: brand.comfort, padding: '28px 16px' }}>
 <p style={{ color: brand.creation, fontSize: '16px', lineHeight: '1.8', margin: '0 0 16px 0' }}>
 <strong>Thank you for completing the screener.</strong> We hope it's given you some reassurance that your current study approaches are working for you.
 </p>
 <p style={{ color: brand.creation, fontSize: '15px', lineHeight: '1.8', margin: '0' }}>
 If you ever have concerns in the future, or if things change, the screener is always here. And if you'd like to explore how you learn best, your student support service can help with that too—it's not just for people with learning differences.
 </p>
 </div>
 )}

 {/* Visual Strategies - Vision Green - Only for Levels 1-3 */}
 {showVisualStrategies && (
 <div style={{ backgroundColor: brand.vision, padding: '28px 16px' }}>
 <h2 style={{ color: '#ffffff', fontSize: '18px', fontWeight: 'bold', margin: '0 0 20px 0' }}>
 ✨ Try These Visual Strategies
 </h2>
 <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: '15px', lineHeight: '1.7', margin: '0 0 20px 0' }}>
 This screener is from <a href="https://ivvi.app" style={{ color: '#ffffff', fontWeight: '600', textDecoration: 'underline' }}>ivvi.app</a>, mind-mapping software designed for dyslexia.
 </p>
 <div style={{ color: '#ffffff', fontSize: '15px', lineHeight: '2' }}>
 <p style={{ margin: '0' }}>• Use mind maps to organize information</p>
 <p style={{ margin: '0' }}>• Try color-coding for different topics</p>
 <p style={{ margin: '0' }}>• Break tasks into visual flowcharts</p>
 <p style={{ margin: '0' }}>• Explore text-to-speech options</p>
 </div>
 </div>
 )}

 {/* Disclaimer - Subtle white background */}
 <div style={{ backgroundColor: '#ffffff', padding: '24px 16px', borderTop: `3px solid ${brand.wisdom}` }}>
 <p style={{ color: brand.creation, fontSize: '12px', lineHeight: '1.7', margin: '0', opacity: 0.7 }}>
 <strong>Disclaimer:</strong> This is for informational purposes only and cannot replace evaluation by a qualified professional. Decisions about accommodations should be made with relevant experts.
 </p>
 </div>

 {/* Footer - Creation Navy */}
 <div style={{ backgroundColor: brand.creation, padding: '28px 16px', textAlign: 'center' }}>
 <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px', margin: '0 0 16px 0' }}>
 Questions? <a href="mailto:support@dyslexiaquiz.com" style={{ color: '#ffffff', textDecoration: 'underline' }}>support@dyslexiaquiz.com</a>
 </p>
 <a
 href={unsubscribeURL}
 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', textDecoration: 'underline' }}
 >
 Unsubscribe
 </a>
 </div>
 </div>
 );
};

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
 firstName,
 message,
 toEmail,
 quizData
}) => {

 // If quiz data is available, render the full report
 if (quizData) {
 return (
 <DyslexiaResultsReport 
 recipientName={quizData.recipientName || firstName}
 toEmail={toEmail}
 results={quizData.results}
 showDetailedQuestions={true}
 finalScore={quizData.score}
 yesAnswers={quizData.yesAnswers || []}
 yesAnswersBySection={quizData.yesAnswersBySection || {}}
 
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
