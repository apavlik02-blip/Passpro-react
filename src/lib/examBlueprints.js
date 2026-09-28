// Domain weights mirror the official PSI/OCI Wisconsin content outlines
// (Series 22-01 Life, 22-03 Accident & Health, 22-05 Property, 22-07 Casualty,
// 22-09 Personal Lines), each scaled to 100 questions.

export const LIFE_EXAM = {
  key: 'life',
  label: 'Life Insurance',
  series: '22-01',
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
  series: '22-03',
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

// Property & Casualty exams — PSI outlines effective July 15, 2022.
// Section 1.0 (Insurance Regulation, 35%) is split between general licensing/
// state/federal regulation (`pc_regulation`, written for P&C producers) and
// the Wisconsin statute buckets that outline sections 1.4–1.6 call out.

export const PROPERTY_EXAM = {
  key: 'property',
  label: 'Property Insurance',
  series: '22-05',
  totalQuestions: 100,
  timeLimitMinutes: 120,
  passingScore: 70,
  weights: {
    pc_regulation: 22,
    wi_pc_statutes: 6,
    wi_property_regulation: 7,
    pc_general_insurance: 8,
    property_basics: 13,
    dwelling: 4,
    homeowners: 18,
    commercial_property: 9,
    businessowners_property: 9,
    personal_other: 4,
  },
}

export const CASUALTY_EXAM = {
  key: 'casualty',
  label: 'Casualty Insurance',
  series: '22-07',
  totalQuestions: 100,
  timeLimitMinutes: 120,
  passingScore: 70,
  weights: {
    pc_regulation: 22,
    wi_pc_statutes: 5,
    wi_auto_regulation: 5,
    pc_general_insurance: 8,
    casualty_basics: 13,
    personal_auto: 9,
    commercial_auto: 5,
    commercial_liability: 10,
    businessowners_liability: 10,
    // 3 items from outline 1.5 (WI worker's comp law) + 5 items from 7.0
    workers_comp: 8,
    umbrella: 2,
    casualty_other: 3,
  },
}

export const PERSONAL_LINES_EXAM = {
  key: 'personal_lines',
  label: 'Personal Lines',
  series: '22-09',
  totalQuestions: 100,
  timeLimitMinutes: 120,
  passingScore: 70,
  weights: {
    pc_regulation: 20,
    wi_pc_statutes: 5,
    wi_property_regulation: 5,
    wi_auto_regulation: 5,
    pc_general_insurance: 5,
    property_basics: 20,
    dwelling: 10,
    homeowners: 10,
    personal_auto: 10,
    personal_other: 7,
    umbrella: 3,
  },
}

export const EXAM_BLUEPRINTS = [
  LIFE_EXAM,
  HEALTH_EXAM,
  PROPERTY_EXAM,
  CASUALTY_EXAM,
  PERSONAL_LINES_EXAM,
]

export function getBlueprint(key) {
  return EXAM_BLUEPRINTS.find((blueprint) => blueprint.key === key) ?? null
}

// Every domain the blueprint samples from (including aliased domains).
export function blueprintDomains(blueprint) {
  const domains = new Set(Object.keys(blueprint.weights))
  Object.keys(blueprint.domainAliases ?? {}).forEach((alias) => domains.add(alias))
  return domains
}

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

    // Never repeat a question: a thin domain contributes what it has.
    selected.push(...available.slice(0, targetCount))
  })

  return {
    questions: shuffle(selected),
    shortfalls,
  }
}
