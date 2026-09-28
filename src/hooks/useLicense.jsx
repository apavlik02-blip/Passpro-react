/* eslint-disable react-refresh/only-export-components -- provider + hook live together by design */
// The member's selected Wisconsin license ("track"). Drives which study
// modules, questions, flashcards, and practice exams the member sees.
// Persisted per browser in localStorage; defaults to Life.
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { DEFAULT_LICENSE_KEY, getLicense } from '../lib/licenses.js'

const STORAGE_KEY = 'passpro_license'

const LicenseContext = createContext(null)

function readStoredKey() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return getLicense(stored) ? stored : null
  } catch {
    return null
  }
}

export function LicenseProvider({ children }) {
  const [storedKey, setStoredKey] = useState(readStoredKey)
  const licenseKey = storedKey ?? DEFAULT_LICENSE_KEY

  const setLicenseKey = useCallback((key) => {
    if (!getLicense(key)) return
    setStoredKey(key)
    try {
      window.localStorage.setItem(STORAGE_KEY, key)
    } catch {
      // Private mode or blocked storage: the choice still applies this session.
    }
  }, [])

  const value = useMemo(
    () => ({
      licenseKey,
      license: getLicense(licenseKey),
      hasChosen: storedKey !== null,
      setLicenseKey,
    }),
    [licenseKey, storedKey, setLicenseKey],
  )

  return <LicenseContext.Provider value={value}>{children}</LicenseContext.Provider>
}

export function useLicense() {
  const context = useContext(LicenseContext)
  if (!context) {
    throw new Error('useLicense must be used inside <LicenseProvider>')
  }
  return context
}
