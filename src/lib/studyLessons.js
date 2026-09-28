import { Content as LifeInsuranceTypes } from '../content/study/life-insurance-types.jsx'
import { Content as PolicyProvisionsRiders } from '../content/study/policy-provisions-riders.jsx'
import { Content as AnnuitiesTaxation } from '../content/study/annuities-taxation.jsx'
import { Content as WisconsinRegulation } from '../content/study/wisconsin-regulation.jsx'
import { Content as HealthInsuranceBasics } from '../content/study/health-insurance-basics.jsx'
import { Content as HealthPlanTypes } from '../content/study/health-plan-types.jsx'
import { Content as DisabilityIncomeLtc } from '../content/study/disability-income-ltc.jsx'
import { Content as MedicareMedicaid } from '../content/study/medicare-medicaid.jsx'
import { Content as GroupHealthWisconsinRegulation } from '../content/study/group-health-wisconsin-regulation.jsx'
import { Content as InsuranceBasicsConcepts } from '../content/study/insurance-basics-concepts.jsx'
import { Content as QualifiedPlansRetirement } from '../content/study/qualified-plans-retirement.jsx'
import { Content as InsurersProducersMarketing } from '../content/study/insurers-producers-marketing.jsx'
import { Content as GroupLifeBusinessUses } from '../content/study/group-life-business-uses.jsx'
import { Content as DentalInsurance } from '../content/study/dental-insurance.jsx'
import { Content as AcaHipaaTaxFavoredAccounts } from '../content/study/aca-hipaa-tax-favored-accounts.jsx'

import { Content as PcRegulationWisconsin } from '../content/study/pc-regulation-wisconsin.jsx'
import { Content as PropertyInsuranceBasics } from '../content/study/property-insurance-basics.jsx'
import { Content as DwellingHomeowners } from '../content/study/dwelling-homeowners.jsx'
import { Content as PersonalAutoWisconsin } from '../content/study/personal-auto-wisconsin.jsx'
import { Content as CommercialPropertyBop } from '../content/study/commercial-property-bop.jsx'
import { Content as CasualtyLiabilityCommercial } from '../content/study/casualty-liability-commercial.jsx'
import { Content as WorkersCompUmbrellaSurety } from '../content/study/workers-comp-umbrella-surety.jsx'
import { Content as FloodOtherPersonalCoverages } from '../content/study/flood-other-personal-coverages.jsx'

// Keyed by study_modules.id — add an entry here whenever a new module needs a lesson.
export const STUDY_LESSONS = {
  'life-insurance-types': LifeInsuranceTypes,
  'policy-provisions-riders': PolicyProvisionsRiders,
  'annuities-taxation': AnnuitiesTaxation,
  'wisconsin-regulation': WisconsinRegulation,
  'health-insurance-basics': HealthInsuranceBasics,
  'health-plan-types': HealthPlanTypes,
  'disability-income-ltc': DisabilityIncomeLtc,
  'medicare-medicaid': MedicareMedicaid,
  'group-health-wisconsin-regulation': GroupHealthWisconsinRegulation,
  'insurance-basics-concepts': InsuranceBasicsConcepts,
  'qualified-plans-retirement': QualifiedPlansRetirement,
  'insurers-producers-marketing': InsurersProducersMarketing,
  'group-life-business-uses': GroupLifeBusinessUses,
  'dental-insurance': DentalInsurance,
  'aca-hipaa-tax-favored-accounts': AcaHipaaTaxFavoredAccounts,
  // Property & Casualty (Property 22-05, Casualty 22-07, Personal Lines 22-09)
  'pc-regulation-wisconsin': PcRegulationWisconsin,
  'property-insurance-basics': PropertyInsuranceBasics,
  'dwelling-homeowners': DwellingHomeowners,
  'personal-auto-wisconsin': PersonalAutoWisconsin,
  'commercial-property-bop': CommercialPropertyBop,
  'casualty-liability-commercial': CasualtyLiabilityCommercial,
  'workers-comp-umbrella-surety': WorkersCompUmbrellaSurety,
  'flood-other-personal-coverages': FloodOtherPersonalCoverages,
}
