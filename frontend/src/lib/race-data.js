export const RACES = {
  human: {
    name: "Human",
    description: "Ambitious and diverse, humans are the most adaptable of all races",
    features: [
      {
        name: "Versatile Heritage",
        description: "+1 to all ability scores"
      },
      {
        name: "Extra Language",
        description: "You can speak, read, and write one extra language"
      }
    ],
    traits: {
      age: "Humans reach adulthood in their late teens and live less than a century",
      size: "Medium",
      speed: "30 feet",
      languages: ["Common", "Choice of one"]
    },
    subraces: [],
    lore: [
      "In the reckonings of most worlds, humans are the youngest of the common races",
      "Whatever drives them, humans are the innovators, the achievers, and the pioneers"
    ]
  },
  elf: {
    name: "Elf",
    description: "Magical people of otherworldly grace, living in places of ethereal beauty",
    features: [
      {
        name: "Keen Senses",
        description: "Proficiency in the Perception skill"
      },
      {
        name: "Fey Ancestry",
        description: "Advantage on saving throws against being charmed"
      },
      {
        name: "Trance",
        description: "4 hours of meditation instead of sleep"
      }
    ],
    traits: {
      age: "Live to be over 700 years old",
      size: "Medium",
      speed: "30 feet",
      languages: ["Common", "Elvish"]
    },
    subraces: ["High Elf", "Wood Elf", "Dark Elf"],
    lore: [
      "Elves are a magical people of otherworldly grace",
      "They live in places of ethereal beauty, in the midst of ancient forests"
    ]
  }
  // Add more races...
}