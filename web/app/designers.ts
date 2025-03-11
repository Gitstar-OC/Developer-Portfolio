export interface Designer {
  name: string;
  twitter: string; // Just the username without the URL
  portfolio: string;
  github?: string | null; 
}

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
    twitter: "_chloeyan",
    portfolio: "https://chloeyan.me",
    github: "chloe-yan",
  },
  {
    name: "Guillermo Rauch",
    twitter: "rauchg",
    portfolio: "https://rauchg.com",
    github: "rauchg",
  },
  {
    name: "Alvish Baldha",
    twitter: "alvishbaldha",
    portfolio: "https://bento.me/alvish",
    github: "",
  },
  {
    name: "Pranathi Peri",
    twitter: "pranathiperii",
    portfolio: "https://pranathiperi.com",
    github: "pranathip",
  },
  {
    name: "Abjt",
    twitter: "abjt14",
    portfolio: "https://abjt.dev",
    github: "abjt14",
  },
  {
    name: "Nanda",
    twitter: "nandafyi",
    portfolio: "https://nan.fyi",
    github: "nandanmen",
  },
  {
    name: "Henry Heffernan",
    twitter: "henryheffernan",
    portfolio: "https://henryheffernan.com",
    github: "henryjeff",
  },
  {
    name: "Glenn Hitchcock",
    twitter: "glennui",
    portfolio: "https://glenn.me",
    github: "glennui",
  },
  {
    name: "Mariana Castilho",
    twitter: "mrncst",
    portfolio: "https://uilabs.dev",
    github: "mrnbpt",
  },
  {
    name: "Rafael Caferati",
    twitter: "rcaferati",
    portfolio: "https://caferati.me",
    github: "rcaferati",
  },
  {
    name: "Keita Yamada",
    twitter: "P5_keita",
    portfolio: "https://p5aholic.me",
    github: "p5aholic",
  },
  {
    name: "Bruno Simon",
    twitter: "bruno_simon",
    portfolio: "https://bruno-simon.com",
    github: "brunosimon",
  },

  {
    name: "Chris Coyier",
    twitter: "chriscoyier",
    portfolio: "https://chriscoyier.net",
    github: "chriscoyier",
  },
  {
    name: "Jen Simmons",
    twitter: "jensimmons",
    portfolio: "https://jensimmons.com",
    github: "jensimmons",
  },
  {
    name: "Rachel Andrew",
    twitter: "rachelandrew",
    portfolio: "https://rachelandrew.co.uk",
    github: "rachelandrew",
  },
  {
    name: "David Walsh",
    twitter: "davidwalshblog",
    portfolio: "https://davidwalsh.name",
    github: "darkwing",
  },
  {
    name: "Jhey", 
    twitter: "jh3yy", 
    portfolio: "https://jhey.dev",  
    github: "jh3y"
  }, 
  {
    name: "Una Kravets",
    twitter: "Una",
    portfolio: "https://una.im",
    github: "una",
  },
  {
    name: "Andy Bell",
    twitter: "belldotbz",
    portfolio: "https://andy-bell.co.uk",
    github: "Andy-set-studio",
  },
  {
    name: "Heydon Pickering",
    twitter: "heydonworks",
    portfolio: "https://heydonworks.com",
    github: "heydon",
  },
  {
    name: "Maggie Appleton",
    twitter: "Mappletons",
    portfolio: "https://maggieappleton.com",
    github: "maggieappleton",
  },
  {
    name: "Shu Ding", 
    twitter: "shuding_",  
    portfolio: "https://shud.in",
    github: "shuding"
  }
];

// simple placeholders : ) 
export const generatePlaceholderDesigners = (count: number): Designer[] => {
  return Array.from({ length: count }).map((_, index) => ({
    name: `Designer ${index + designers.length + 1}`,
    twitter: `designer${index + designers.length + 1}`,
    portfolio: `https://designer${index + designers.length + 1}.dev`,
    github: null,
  }));
};

export const getAllDesigners = (placeholderCount = 15): Designer[] => {
  return [
    ...designers,
    // ...generatePlaceholderDesigners(placeholderCount)
  ];
};