// Progress helpers
export function calculateNewReadiness(oldReadiness, quizScore) { return Math.round(oldReadiness * 0.7 + quizScore * 0.3); }
export function updateWeakDomains(currentWeak, domainScores) { return currentWeak; }
export function getDefaultProgress(userId) { return { current_readiness: 45, weak_domains: [], study_streak: 0 }; }
