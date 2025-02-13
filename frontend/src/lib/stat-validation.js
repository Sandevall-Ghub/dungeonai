export const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8]

export const CLASS_REQUIREMENTS = {
  fighter: { strength: 13 },
  wizard: { intelligence: 13 },
  rogue: { dexterity: 13 },
  cleric: { wisdom: 13 },
  paladin: { strength: 13, charisma: 13 },
  ranger: { dexterity: 13, wisdom: 13 }
}

export const RACE_BONUSES = {
  human: {
    type: 'all',
    value: 1,
    description: 'Versatile Heritage: +1 to all ability scores'
  },
  elf: {
    type: 'specific',
    bonuses: {
      dexterity: 2,
      intelligence: 1
    },
    description: 'Elven Grace: +2 Dexterity, +1 Intelligence'
  },
  dwarf: {
    type: 'specific',
    bonuses: {
      constitution: 2,
      wisdom: 1
    },
    description: 'Dwarven Resilience: +2 Constitution, +1 Wisdom'
  },
  halfling: {
    type: 'specific',
    bonuses: {
      dexterity: 2,
      charisma: 1
    },
    description: 'Naturally Stealthy: +2 Dexterity, +1 Charisma'
  },
  dragonborn: {
    type: 'specific',
    bonuses: {
      strength: 2,
      charisma: 1
    },
    description: 'Draconic Might: +2 Strength, +1 Charisma'
  }
}

export const CLASS_RECOMMENDATIONS = {
  fighter: {
    primary: 'strength',
    secondary: 'constitution',
    description: 'Martial Prowess: High Strength for combat effectiveness'
  },
  wizard: {
    primary: 'intelligence',
    secondary: 'constitution',
    description: 'Arcane Knowledge: High Intelligence for spellcasting'
  },
  rogue: {
    primary: 'dexterity',
    secondary: 'intelligence',
    description: 'Nimble Expert: High Dexterity for stealth and precision'
  },
  cleric: {
    primary: 'wisdom',
    secondary: 'constitution',
    description: 'Divine Power: High Wisdom for spellcasting'
  },
  paladin: {
    primary: 'strength',
    secondary: 'charisma',
    description: 'Holy Warrior: Balance of Strength and Charisma'
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
  if (race && RACE_BONUSES[race]) {
    const racialBonus = RACE_BONUSES[race]
    if (racialBonus.type === 'all') {
      validation.suggestions.push(`+${racialBonus.value} to all abilities from ${race}`)
    } else if (racialBonus.type === 'specific') {
      Object.entries(racialBonus.bonuses).forEach(([stat, bonus]) => {
        validation.suggestions.push(`+${bonus} ${stat} from ${race}`)
      })
    }
  }

  // Build Optimization Suggestions
  const highestStat = Object.entries(stats).reduce((a, b) => stats[a] > stats[b] ? a : b)[0]
  Object.entries(CLASS_RECOMMENDATIONS).forEach(([className, recommendation]) => {
    const primaryStat = recommendation.primary
    if (primaryStat === highestStat) {
      validation.suggestions.push(`Consider ${className} class (high ${primaryStat})`)
    }
  })

  return validation
}

export function calculateTotalStats(baseStats, race) {
  const totalStats = { ...baseStats }
  
  if (race) {
    const racialBonus = RACE_BONUSES[race]
    if (racialBonus.type === 'all') {
      Object.keys(totalStats).forEach(stat => {
        totalStats[stat] += racialBonus.value
      })
    } else if (racialBonus.type === 'specific') {
      Object.entries(racialBonus.bonuses).forEach(([stat, bonus]) => {
        totalStats[stat] += bonus
      })
    }
  }
  
  return totalStats
}