// Domain weights mirror the official PSI/OCI Wisconsin content outlines
// (Series 22-01 Life, Series 22-03 Accident & Health), scaled to 100 questions.

export const LIFE_EXAM = {
  key: 'life',
  label: 'Life Insurance',
  totalQuestions: 100,
  timeLimitMinutes: 120,
  passingScore: 70,
  weights: {
    insurance_regulation: 20,
    wisconsin_regulation: 15,
    general_insurance: 10,
    life_basics: 10,
    life_types: 12,
    policy_provisions: 14,
    annuities: 10,
    taxation: 5,
    qualified_plans: 4,
  },
}

export const HEALTH_EXAM = {
  key: 'health',
  label: 'Accident & Health Insurance',
  totalQuestions: 100,
  timeLimitMinutes: 120,
  passingScore: 70,
  weights: {
    insurance_regulation: 18,
    wisconsin_health_regulation: 12,
    general_insurance: 8,
    health_basics: 7,
    health_plan_types: 7,
    disability_income: 8,
    medical_plans: 8,
    group_health: 8,
    dental: 4,
    medicare: 8,
    ltc: 8,
    aca_hipaa: 4,
  },
  // domains folded into another domain's bucket when sampling
  domainAliases: {
    medicaid: 'medicare',
  },
}

export const EXAM_BLUEPRINTS = [LIFE_EXAM, HEALTH_EXAM]

function shuffle(items) {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function buildExam(blueprint, questionBank) {
  const byDomain = {}

  questionBank.forEach((question) => {
    const domain = blueprint.domainAliases?.[question.category] ?? question.category
    if (!byDomain[domain]) {
      byDomain[domain] = []
    }
    byDomain[domain].push(question)
  })

  const selected = []
  const shortfalls = []

  Object.entries(blueprint.weights).forEach(([domain, targetCount]) => {
    const available = shuffle(byDomain[domain] ?? [])

    if (available.length < targetCount) {
      shortfalls.push({
        domain,
        target: targetCount,
        available: available.length,
      })
    }

    for (let i = 0; i < targetCount; i += 1) {
      if (available.length === 0) break
      selected.push(available[i % available.length])
    }
  })

  return {
    questions: shuffle(selected),
    shortfalls,
  }
}
