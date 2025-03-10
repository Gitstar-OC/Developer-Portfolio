// Designer data type
export interface Designer {
  name: string
  twitter: string // Just the username without the URL
  portfolio: string
  github?: string | null // Optional GitHub username
}

// List of designers
export const designers: Designer[] = [
  {
    name: "Emil Kowalski",
    twitter: "emilkowalski_",
    portfolio: "https://emilkowal.ski",
    github: "emilkowalski",
  },
  {
    name: "Rauno Freiberg",
    twitter: "raunofreiberg",
    portfolio: "https://rauno.me",
    github: "raunofreiberg",
  },
  {
    name: "Lee Robinson",
    twitter: "leeerob",
    portfolio: "https://leerob.io",
    github: "leerob",
  },
  {
    name: "Paco Coursey",
    twitter: "pacocoursey",
    portfolio: "https://paco.me",
    github: "pacocoursey",
  },
  {
    name: "Max Stoiber",
    twitter: "mxstbr",
    portfolio: "https://mxstbr.com",
    github: "mxstbr",
  },
  {
    name: "Chloe Yan", 
    twitter: "https://x.com/_chloeyan", 
    portfolio: "https://chloeyan.me",  
    github: "chloe-yan"

  }
]

// Generate more designers for scrolling effect
export const generatePlaceholderDesigners = (count: number): Designer[] => {
  return Array.from({ length: count }).map((_, index) => ({
    name: `Designer ${index + designers.length + 1}`,
    twitter: `designer${index + designers.length + 1}`,
    portfolio: `https://designer${index + designers.length + 1}.dev`,
    github: null,
  }))
}

// Combine real and placeholder designers
export const getAllDesigners = (placeholderCount = 15): Designer[] => {
  return [...designers, 
    // ...generatePlaceholderDesigners(placeholderCount)
  
  ]
}

