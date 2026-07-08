import { useState, useEffect } from 'react';
import './index.css';

// Real Wisconsin Life Insurance sample questions (high-yield topics)
const sampleQuestions = [
  {
    id: 1,
    topic: "Regulation",
    question: "What is the purpose of the Wisconsin Life Insurance Guaranty Association?",
    options: [
      "To regulate insurance rates",
      "To guarantee payment of claims if an insurer becomes insolvent",
      "To provide free life insurance to low-income residents",
      "To license insurance agents"
    ],
    correctAnswer: 1,
    explanation: "The Guaranty Association protects policyholders if an insurer becomes insolvent."
  },
  {
    id: 2,
    topic: "Policy Provisions",
    question: "In Wisconsin, what is the standard free-look period for most life insurance policies?",
    options: ["10 days", "20 days", "30 days", "45 days"],
    correctAnswer: 1,
    explanation: "Wisconsin law generally provides a 20-day free look period for life insurance policies."
  },
  {
    id: 3,
    topic: "Beneficiaries",
    question: "Under Wisconsin law, what happens to a spouse's beneficiary designation after divorce?",
    options: [
      "It remains valid",
      "It is automatically revoked",
      "It transfers to the children",
      "It requires court approval to change"
    ],
    correctAnswer: 1,
    explanation: "In Wisconsin, divorce generally revokes the ex-spouse as beneficiary unless the decree says otherwise."
  },
  {
    id: 4,
    topic: "Taxation",
    question: "What is the tax treatment of a Modified Endowment Contract (MEC)?",
    options: [
      "Tax-deferred growth like a traditional life policy",
      "Distributions are taxed LIFO (earnings first)",
      "All gains are tax-free",
      "Subject to 10% early withdrawal penalty before age 59½ on taxable portions"
    ],
    correctAnswer: 1,
    explanation: "MECs are taxed LIFO — earnings come out first, and there's a 10% penalty on taxable distributions before 59½."
  },
  {
    id: 5,
    topic: "Annuities",
    question: "What is the exclusion ratio in a fixed annuity?",
    options: [
      "The percentage of the payment that is taxable",
      "The portion of each payment that is a tax-free return of principal",
      "The commission paid to the agent",
      "The insurer's expense loading"
    ],
    correctAnswer: 1,
    explanation: "The exclusion ratio determines how much of each annuity payment is considered a nontaxable return of principal."
  }
];

function FlashcardsSection({ flashcards }) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [ratings, setRatings] = useState({});
  const [dueCards, setDueCards] = useState(flashcards.length);

  const currentCard = flashcards[currentCardIndex];

  const handleRating = (rating) => {
    const newRatings = {...ratings};
    newRatings[currentCard.id] = rating;
    setRatings(newRatings);
    
    setShowAnswer(false);
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Flashcards • SM-2 Spaced Repetition</h2>
        <div className="text-sm text-slate-400">
          Card {currentCardIndex + 1} of {flashcards.length} • Due: {dueCards}
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl p-12 min-h-[420px] flex flex-col items-center justify-center border border-slate-700 relative">
        <div className="absolute top-6 right-6 text-xs bg-slate-800 px-3 py-1 rounded-full">
          {currentCard.category}
        </div>
        
        <div className="text-center mb-12">
          <div className="text-xl text-slate-400 mb-6">WISCONSIN LIFE INSURANCE</div>
          <div className="text-2xl font-medium leading-relaxed max-w-2xl">
            {currentCard.front}
          </div>
        </div>

        {showAnswer ? (
          <div className="text-center text-emerald-400 text-xl mb-12 max-w-2xl border-t border-slate-700 pt-8">
            {currentCard.back}
          </div>
        ) : (
          <button 
            onClick={() => setShowAnswer(true)}
            className="mt-8 px-10 py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl text-lg font-medium transition-colors"
          >
            Show Answer
          </button>
        )}

        {showAnswer && (
          <div className="flex gap-4 mt-12">
            {['Again', 'Hard', 'Good', 'Easy'].map((rating, idx) => (
              <button
                key={idx}
                onClick={() => handleRating(rating)}
                className="px-8 py-4 rounded-2xl border border-slate-700 hover:bg-slate-800 transition-all hover:scale-105 text-sm font-medium"
              >
                {rating}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center gap-4 mt-8 text-sm">
        <button onClick={() => setCurrentCardIndex(Math.max(0, currentCardIndex - 1))} className="px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl">Previous</button>
        <button onClick={() => setCurrentCardIndex((currentCardIndex + 1) % flashcards.length)} className="px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl">Next</button>
      </div>
    </div>
  );
}

function PassProApp() {
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [examTimeLeft, setExamTimeLeft] = useState(120 * 60);
  const [isExamRunning, setIsExamRunning] = useState(false);
  const [examAnswers, setExamAnswers] = useState({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examResults, setExamResults] = useState(null);

  // Flashcard state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const baseFlashcards = [
    { id: 1, front: "What is the purpose of the Wisconsin State Life Insurance Fund?", back: "To guarantee life insurance policies in case of insurer insolvency (guaranty association).", category: "Regulation" },
    { id: 2, front: "What is the free-look period for life insurance policies in Wisconsin?", back: "20 days for most policies.", category: "Policy Provisions" },
    { id: 3, front: "Define insurable interest in life insurance.", back: "A financial or emotional interest in the continued life of the insured.", category: "Basics" },
    { id: 4, front: "What is the incontestability period in Wisconsin?", back: "2 years (standard).", category: "Policy Provisions" },
    { id: 5, front: "What does 'revocable beneficiary' mean?", back: "The owner can change the beneficiary at any time without consent.", category: "Beneficiaries" },
  ];

  const expandedFlashcards = [...baseFlashcards];

  // Simple exam logic
  const currentQuestion = sampleQuestions[0]; // placeholder for now

  const startExam = () => {
    setIsExamRunning(true);
    setExamAnswers({});
    setExamSubmitted(false);
    setExamResults(null);
    setExamTimeLeft(120 * 60);
  };

  const submitExam = () => {
    // Simple scoring for demo
    const total = sampleQuestions.length;
    let correct = 0;
    
    sampleQuestions.forEach(q => {
      if (examAnswers[q.id] === q.correctAnswer) correct++;
    });

    const score = Math.round((correct / total) * 100);
    
    const weakTopics = score < 80 ? ["Annuities", "Beneficiaries"] : [];

    const results = {
      score,
      correct,
      total,
      weakTopics,
      answers: examAnswers
    };

    setExamResults(results);
    setExamSubmitted(true);
    setIsExamRunning(false);
  };

  const handleExamAnswer = (questionId, optionIndex) => {
    setExamAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const resetExam = () => {
    setIsExamRunning(false);
    setExamSubmitted(false);
    setExamResults(null);
    setExamAnswers({});
  };

  const renderContent = () => {
    switch(currentSection) {
      case 'dashboard':
        return (
          <div className="p-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight">Welcome back, Amanda 👋</h1>
                  <p className="text-slate-400 mt-2">Your Wisconsin Life Insurance Exam is in 41 days. Let's get you to 100%.</p>
                </div>
                <div className="text-right">
                  <div className="text-emerald-400 text-5xl font-bold">74%</div>
                  <p className="text-sm text-slate-400">Readiness Score</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900 p-6 rounded-3xl">
                  <h3 className="text-lg font-semibold mb-4">Current Streak</h3>
                  <div className="text-5xl font-bold text-orange-400">7 days 🔥</div>
                </div>
                <div className="bg-slate-900 p-6 rounded-3xl">
                  <h3 className="text-lg font-semibold mb-4">Practice Exams Taken</h3>
                  <div className="text-5xl font-bold">12</div>
                </div>
                <div className="bg-slate-900 p-6 rounded-3xl">
                  <h3 className="text-lg font-semibold mb-4">Weak Areas</h3>
                  <div className="text-orange-400">Annuities • Beneficiaries</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'full-exam':
        return (
          <div className="p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Full Exam Simulator (PSI Style)</h2>
            
            {!isExamRunning && !examSubmitted && (
              <div className="bg-slate-900 rounded-3xl p-8 text-center">
                <p className="text-xl mb-6">Ready to test your knowledge?</p>
                <button 
                  onClick={startExam}
                  className="bg-emerald-600 hover:bg-emerald-700 px-10 py-4 rounded-2xl text-lg font-semibold"
                >
                  Start 5-Question Practice Exam
                </button>
                <p className="text-xs text-slate-500 mt-4">(Demo version — full 100-question exam coming soon)</p>
              </div>
            )}

            {isExamRunning && !examSubmitted && (
              <div>
                <div className="mb-4 text-lg">Time Left: {Math.floor(examTimeLeft / 60)}:{(examTimeLeft % 60).toString().padStart(2, '0')}</div>
                
                {sampleQuestions.map((q, index) => (
                  <div key={q.id} className="bg-slate-900 rounded-2xl p-6 mb-6">
                    <div className="font-medium mb-4">{index + 1}. {q.question}</div>
                    <div className="space-y-2">
                      {q.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleExamAnswer(q.id, i)}
                          className={`w-full text-left p-3 rounded-xl border ${examAnswers[q.id] === i ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-700 hover:bg-slate-800'}`}
                        >
                          {String.fromCharCode(65 + i)}. {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <button 
                  onClick={submitExam}
                  className="mt-4 w-full py-4 bg-emerald-600 hover:bg-emerald-700 rounded-2xl text-lg font-semibold"
                >
                  Submit Exam
                </button>
              </div>
            )}

            {examSubmitted && examResults && (
              <div className="bg-slate-900 rounded-3xl p-8">
                <div className="text-center mb-8">
                  <div className="text-6xl font-bold text-emerald-400 mb-2">{examResults.score}%</div>
                  <div>You got {examResults.correct} out of {examResults.total} correct</div>
                </div>

                {examResults.weakTopics.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-orange-400 mb-2">Focus Areas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {examResults.weakTopics.map((topic, i) => (
                        <span key={i} className="px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-sm">{topic}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <button onClick={resetExam} className="flex-1 py-3 border border-slate-700 rounded-xl">Retake Exam</button>
                  <button 
                    onClick={() => setCurrentSection('ai-coach')}
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-semibold"
                  >
                    Review with ARIA
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case 'flashcards':
        return <FlashcardsSection flashcards={expandedFlashcards} />;

      default:
        return <div className="p-8"><h2 className="text-3xl">{currentSection.toUpperCase()} Section</h2><p>Content loaded from your uploaded modules.</p></div>;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200">
      <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">P</div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">PassPro</h1>
              <p className="text-xs text-slate-400">WI Life Insurance</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {[
            {id: 'dashboard', label: 'Dashboard', icon: 'fa-home'},
            {id: 'study', label: 'Study Modules', icon: 'fa-book'},
            {id: 'flashcards', label: 'Flashcards', icon: 'fa-bolt'},
            {id: 'full-exam', label: 'Practice Exam', icon: 'fa-pencil-alt'},
            {id: 'ai-coach', label: 'AI Coach', icon: 'fa-robot'},
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setCurrentSection(item.id)}
              className={`nav-item flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-colors text-left ${currentSection === item.id ? 'bg-slate-800 text-emerald-400' : 'hover:bg-slate-800'}`}
            >
              <i className={`fas ${item.icon} w-5`}></i>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-2xl">
            <div className="w-9 h-9 bg-purple-500 rounded-full flex items-center justify-center text-sm font-semibold">A</div>
            <div>
              <p className="font-medium">Amanda</p>
              <p className="text-xs text-slate-400">74% Ready • 41 days</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
}

export default PassProApp;
