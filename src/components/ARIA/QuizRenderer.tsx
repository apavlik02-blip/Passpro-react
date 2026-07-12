import React from 'react';

interface Question { id: number; question: string; options: string[]; correct: string; explanation: string; know_this: string; }
interface QuizRendererProps { questions: Question[]; onComplete?: (results: any) => void; }

export default function QuizRenderer({ questions, onComplete }: QuizRendererProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [selectedAnswers, setSelectedAnswers] = React.useState<Record<number, string>>({});
  const [showResults, setShowResults] = React.useState(false);
  const currentQuestion = questions[currentIndex];

  const handleSelect = (option: string) => { setSelectedAnswers({ ...selectedAnswers, [currentQuestion.id]: option }); };
  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
    else { setShowResults(true); if (onComplete) onComplete(calculateResults()); }
  };
  const calculateResults = () => {
    let correctCount = 0;
    questions.forEach(q => { if (selectedAnswers[q.id] === q.correct) correctCount++; });
    return { overall_score: Math.round((correctCount / questions.length) * 100), correct_count: correctCount, total_questions: questions.length };
  };

  if (showResults) {
    const results = calculateResults();
    return <div style={{ padding: 20, background: 'rgba(255,255,255,0.03)', borderRadius: 12 }}><h3 style={{ color: '#C9874F' }}>Quiz Complete</h3><div style={{ fontSize: 24, fontWeight: 600 }}>{results.overall_score}%</div><button onClick={() => { setCurrentIndex(0); setSelectedAnswers({}); setShowResults(false); }} style={{ background: 'linear-gradient(135deg, #C9874F, #A0522D)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 8, cursor: 'pointer' }}>Retake</button></div>;
  }
  return <div style={{ padding: 20 }}><div>Question {currentIndex + 1} of {questions.length}</div><div style={{ fontSize: 18, marginBottom: 20 }}>{currentQuestion.question}</div>{currentQuestion.options.map((option, idx) => <button key={idx} onClick={() => handleSelect(option)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '14px', marginBottom: 8, background: selectedAnswers[currentQuestion.id] === option ? 'rgba(201,135,79,0.2)' : 'rgba(255,255,255,0.04)', border: selectedAnswers[currentQuestion.id] === option ? '1px solid #C9874F' : '1px solid rgba(201,135,79,0.15)', borderRadius: 10 }}>{option}</button>)}<button onClick={handleNext} disabled={!selectedAnswers[currentQuestion.id]} style={{ marginTop: 16, width: '100%', padding: '14px', background: selectedAnswers[currentQuestion.id] ? 'linear-gradient(135deg, #C9874F, #A0522D)' : 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: 10 }}> {currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'} </button></div>;
}
