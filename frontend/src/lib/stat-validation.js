export const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8]

export const CLASS_REQUIREMENTS = {
  fighter: { strength: 13 },
  wizard: { intelligence: 13 },
  rogue: { dexterity: 13 },
  cleric: { wisdom: 13 },
  paladin: { strength: 13, charisma: 13 },
  ranger: { dexterity: 13, wisdom: 13 }
}

export const RACE_MODIFIERS = {
  human: {
    all: 1
  },
  elf: {
    dexterity: 2,
    intelligence: 1
  },
  dwarf: {
    constitution: 2,
    wisdom: 1
  }
}

export function validateStats(stats, characterClass, race, pointBuyMode = true) {
  const validation = {
    isValid: true,
    errors: {},
    warnings: {},
    suggestions: []
  }

  // Point Buy Validation (27 points total)
  if (pointBuyMode) {
    const POINT_COSTS = {
      8: 0, 9: 1, 10: 2, 11: 3,
      12: 4, 13: 5, 14: 7, 15: 9
    }
    
    const usedPoints = Object.values(stats).reduce((total, value) => {
      return total + (POINT_COSTS[value] || 0)
    }, 0)

    if (usedPoints > 27) {
      validation.isValid = false
      validation.errors.points = `Exceeded point buy limit (${usedPoints}/27)`
    }
  }

  // Class Requirements
  if (characterClass && CLASS_REQUIREMENTS[characterClass]) {
    const requirements = CLASS_REQUIREMENTS[characterClass]
    Object.entries(requirements).forEach(([stat, minimum]) => {
      const actualValue = stats[stat]
      if (actualValue < minimum) {
        validation.isValid = false
        validation.errors[stat] = `${characterClass} requires ${minimum} ${stat}`
      }
    })
  }

  // Ability Score Range
  Object.entries(stats).forEach(([stat, value]) => {
    if (value < 8 || value > 15) {
      validation.isValid = false
      validation.errors[stat] = `Must be between 8 and 15`
    }
  })

  // Racial Bonuses
  if (race && RACE_MODIFIERS[race]) {
    const modifiers = RACE_MODIFIERS[race]
    Object.entries(modifiers).forEach(([stat, bonus]) => {
      if (stat === 'all') {
        validation.suggestions.push(`+${bonus} to all abilities from ${race}`)
      } else {
        validation.suggestions.push(`+${bonus} ${stat} from ${race}`)
      }
    })
  }

  // Build Optimization Suggestions
  const highestStat = Object.entries(stats).reduce((a, b) => stats[a] > stats[b] ? a : b)[0]
  Object.entries(CLASS_REQUIREMENTS).forEach(([className, requirements]) => {
    const primaryStat = Object.keys(requirements)[0]
    if (primaryStat === highestStat) {
      validation.suggestions.push(`Consider ${className} class (high ${primaryStat})`)
    }
  })

  return validation
}