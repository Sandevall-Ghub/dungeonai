export const BACKGROUNDS = {
  acolyte: {
    name: "Acolyte",
    description: "You have spent your life in service to a temple",
    proficiencies: ["Religion", "Insight"],
    languages: 2,
    feature: "Shelter of the Faithful",
    traits: {
      personality: [
        "I idolize a particular hero of my faith",
        "I can find common ground between fierce enemies"
      ],
      ideals: [
        "Tradition. Ancient traditions must be preserved and upheld",
        "Faith. I trust that my deity will guide my actions"
      ],
      bonds: [
        "I would die to recover an ancient relic of my faith",
        "I seek to preserve a sacred text"
      ],
      flaws: [
        "I judge others harshly, and myself even more severely",
        "I put too much trust in those who wield power within my temple"
      ]
    },
    equipment: [
      "Holy symbol",
      "Prayer book",
      "5 sticks of incense",
      "Vestments",
      "Common clothes",
      "15 gp"
    ]
  },
  criminal: {
    name: "Criminal",
    description: "You have lived a life of crime",
    proficiencies: ["Deception", "Stealth"],
    tools: ["Thieves' tools", "One gaming set"],
    feature: "Criminal Contact",
    traits: {
      personality: [
        "I always have a plan for what to do when things go wrong",
        "I am always calm, no matter what the situation"
      ],
      ideals: [
        "Honor. I don't steal from others in the trade",
        "Freedom. Chains are meant to be broken"
      ],
      bonds: [
        "I'm trying to pay off an old debt I owe",
        "I seek to restore someone I wronged"
      ],
      flaws: [
        "When I see something valuable, I can't think about anything else",
        "I have a weakness for the vices of the city"
      ]
    },
    equipment: [
      "Crowbar",
      "Dark common clothes with hood",
      "Gaming set",
      "15 gp"
    ]
  }
  // Add more backgrounds...
}