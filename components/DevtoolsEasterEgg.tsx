'use client'

import { useEffect } from 'react'

export function DevtoolsEasterEgg() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log(
        '%cTHE AUTOMATION GUYS %c/// Intelligent systems for ambitious teams.',
        'color: #3B82F6; font-weight: bold; font-size: 14px; font-family: monospace;',
        'color: #8C8C88; font-size: 12px; font-family: monospace;'
      )
      console.log(
        '%cLooking at the code? We like your style. Send us a note at hello@theautomationguys.com',
        'color: #F2F2F0; font-size: 11px; font-style: italic;'
      )
    }
  }, [])

  return null
}
