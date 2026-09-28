// Wisconsin license catalog — the five major-line producer licenses PassPro
// prepares candidates for. Each entry ties together the PSI exam blueprint,
// the official outline sections (for display), and the study modules that
// belong to that license. Outline weights come from the PSI content outlines
// (effective July 15, 2022); see docs/WI-OCI-STANDARDS.md.
import {
  CASUALTY_EXAM,
  HEALTH_EXAM,
  LIFE_EXAM,
  PERSONAL_LINES_EXAM,
  PROPERTY_EXAM,
  blueprintDomains,
} from './examBlueprints.js'

export const LICENSES = [
  {
    key: 'life',
    name: 'Life',
    fullName: 'Wisconsin Life Insurance',
    series: '22-01',
    family: 'Life & Health',
    exam: LIFE_EXAM,
    tagline: 'Sell life insurance and annuities.',
    description:
      'For producers selling term, whole, universal, and variable life plus annuities. Heavy on policy provisions, Wisconsin replacement rules, and suitability.',
    careers: ['Life agent', 'Financial services rep', 'Final expense agent'],
    outline: [
      ['Insurance regulation (incl. WI law)', 35],
      ['Policy provisions, options & riders', 14],
      ['Life insurance policies', 12],
      ['General insurance', 10],
      ['Life insurance basics', 10],
      ['Annuities', 10],
      ['Federal tax considerations', 5],
      ['Qualified plans', 4],
    ],
    modules: [
      'wisconsin-regulation',
      'insurance-basics-concepts',
      'insurers-producers-marketing',
      'life-insurance-types',
      'policy-provisions-riders',
      'annuities-taxation',
      'qualified-plans-retirement',
      'group-life-business-uses',
    ],
  },
  {
    key: 'health',
    name: 'Accident & Health',
    fullName: 'Wisconsin Accident & Health Insurance',
    series: '22-03',
    family: 'Life & Health',
    exam: HEALTH_EXAM,
    tagline: 'Sell medical, disability, Medicare supplement, and LTC coverage.',
    description:
      'For producers selling health plans, disability income, long-term care, dental, and Medicare products. Wisconsin mandated benefits (s. 632.895) are a must-know.',
    careers: ['Health agent', 'Medicare agent', 'Benefits producer'],
    outline: [
      ['Insurance regulation (incl. WI law)', 35],
      ['General insurance', 10],
      ['A&H insurance basics', 8],
      ['Disability income', 8],
      ['Medical plans', 8],
      ['Group A&H', 8],
      ['Medicare', 8],
      ['Long-term care', 8],
      ['Dental', 4],
      ['Federal tax considerations', 3],
    ],
    modules: [
      'wisconsin-regulation',
      'insurance-basics-concepts',
      'insurers-producers-marketing',
      'health-insurance-basics',
      'health-plan-types',
      'disability-income-ltc',
      'medicare-medicaid',
      'group-health-wisconsin-regulation',
      'dental-insurance',
      'aca-hipaa-tax-favored-accounts',
    ],
  },
  {
    key: 'property',
    name: 'Property',
    fullName: 'Wisconsin Property Insurance',
    series: '22-05',
    family: 'Property & Casualty',
    exam: PROPERTY_EXAM,
    tagline: 'Insure homes, buildings, and business property.',
    description:
      'For producers writing homeowners, dwelling, commercial property, BOP, and farm property. Expect coinsurance math, valuation, and the Wisconsin Insurance Plan.',
    careers: ['Agency producer', 'Customer service rep', 'Commercial lines producer'],
    outline: [
      ['Insurance regulation (incl. WI law)', 35],
      ['Homeowners policy', 18],
      ['Property insurance basics', 13],
      ['Commercial package policy', 9],
      ['Businessowners policy', 9],
      ['General insurance', 8],
      ['Dwelling policy', 4],
      ['Other coverages & options', 4],
    ],
    modules: [
      'pc-regulation-wisconsin',
      'property-insurance-basics',
      'dwelling-homeowners',
      'commercial-property-bop',
      'flood-other-personal-coverages',
    ],
  },
  {
    key: 'casualty',
    name: 'Casualty',
    fullName: 'Wisconsin Casualty Insurance',
    series: '22-07',
    family: 'Property & Casualty',
    exam: CASUALTY_EXAM,
    tagline: 'Insure liability, autos, workers comp, and surety.',
    description:
      'For producers writing auto, general liability, BOP liability, crime, and worker’s compensation. Wisconsin auto minimums and WC rules are tested directly.',
    careers: ['Agency producer', 'Commercial lines producer', 'Auto specialist'],
    outline: [
      ['Insurance regulation (incl. WI law)', 35],
      ['Auto insurance', 14],
      ['Casualty insurance basics', 13],
      ['Commercial package policy', 10],
      ['Businessowners policy', 10],
      ['General insurance', 8],
      ['Worker’s compensation', 5],
      ['Other coverages & options', 5],
    ],
    modules: [
      'pc-regulation-wisconsin',
      'personal-auto-wisconsin',
      'casualty-liability-commercial',
      'workers-comp-umbrella-surety',
    ],
  },
  {
    key: 'personal_lines',
    name: 'Personal Lines',
    fullName: 'Wisconsin Personal Lines',
    series: '22-09',
    family: 'Property & Casualty',
    exam: PERSONAL_LINES_EXAM,
    tagline: 'Insure individuals and families: home, auto, and umbrella.',
    description:
      'A focused license for producers who only write personal risks: homeowners, dwelling, personal auto, flood, and personal umbrella. No commercial lines.',
    careers: ['Personal lines CSR', 'Captive agency producer', 'Call-center agent'],
    outline: [
      ['Insurance regulation (incl. WI law)', 35],
      ['Property insurance basics', 20],
      ['Dwelling policy', 10],
      ['Homeowners policy', 10],
      ['Auto insurance', 10],
      ['Other coverages & options', 10],
      ['General insurance', 5],
    ],
    modules: [
      'pc-regulation-wisconsin',
      'property-insurance-basics',
      'dwelling-homeowners',
      'personal-auto-wisconsin',
      'flood-other-personal-coverages',
      'workers-comp-umbrella-surety',
    ],
  },
]

export const DEFAULT_LICENSE_KEY = 'life'

export const LICENSE_FAMILIES = ['Life & Health', 'Property & Casualty']

// Facts shared by every major-line license (OCI prelicensing page + PSI bulletin).
export const SHARED_EXAM_FACTS = [
  { label: 'Exam vendor', value: 'PSI' },
  { label: 'Scored questions', value: '100' },
  { label: 'Time limit', value: '2 hours' },
  { label: 'Passing score', value: '70%' },
  { label: 'Exam fee', value: '$75 per exam' },
  { label: 'Prelicensing education', value: '20 hrs (8 general + 12 per line)' },
  { label: 'Prelicensing valid for', value: '1 year' },
]

export function getLicense(key) {
  return LICENSES.find((license) => license.key === key) ?? null
}

export function licenseDomains(license) {
  return license ? blueprintDomains(license.exam) : new Set()
}

export function questionsForLicense(questionBank, license) {
  if (!license) return questionBank
  const domains = licenseDomains(license)
  return questionBank.filter((question) => domains.has(question.category))
}

export function modulesForLicense(studyModules, license) {
  if (!license) return studyModules
  const order = new Map(license.modules.map((id, index) => [id, index]))
  return studyModules
    .filter((module) => order.has(module.id))
    .sort((a, b) => order.get(a.id) - order.get(b.id))
}
