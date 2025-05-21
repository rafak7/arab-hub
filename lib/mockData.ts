export interface Company {
  id: string;
  name: string;
  country: string;
  type: 'importer' | 'exporter' | 'both';
  sectors: string[];
  certifications: string[];
  logo?: string;
  description?: string;
  matchScore?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  company?: Company;
  connections: string[];
  profileViews: number;
}

export const countries = [
  { code: 'BR', name: 'Brazil' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'QA', name: 'Qatar' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'BH', name: 'Bahrain' },
  { code: 'OM', name: 'Oman' },
  { code: 'EG', name: 'Egypt' },
  { code: 'JO', name: 'Jordan' },
  { code: 'LB', name: 'Lebanon' }
];

// Grupos geográficos para melhorar o matching
export const countryGroups = {
  arabWorld: ['SA', 'AE', 'QA', 'KW', 'BH', 'OM', 'EG', 'JO', 'LB'],
  latinAmerica: ['BR']
};

export const sectors = [
  'agriculture',
  'food',
  'textile',
  'technology',
  'construction',
  'manufacturing',
  'healthcare',
  'energy',
  'tourism'
];

export const certifications = [
  'halal',
  'iso9001',
  'iso14001',
  'iso22000',
  'haccp',
  'gmp',
  'other'
];

// Mock company data
export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'Verde Organics',
    country: 'BR',
    type: 'exporter',
    sectors: ['agriculture', 'food'],
    certifications: ['halal', 'iso9001'],
    logo: 'https://images.pexels.com/photos/2321384/pexels-photo-2321384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Leading organic produce exporter from Brazil specializing in tropical fruits and nuts.',
  },
  {
    id: '2',
    name: 'Al Madar Trading',
    country: 'SA',
    type: 'importer',
    sectors: ['food', 'textile'],
    certifications: ['iso9001'],
    logo: 'https://images.pexels.com/photos/2957862/pexels-photo-2957862.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Saudi Arabian import company specializing in food products and textiles.',
  },
  {
    id: '3',
    name: 'BrazTech Solutions',
    country: 'BR',
    type: 'exporter',
    sectors: ['technology', 'manufacturing'],
    certifications: ['iso9001', 'iso14001'],
    logo: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Brazilian technology manufacturer exporting innovative solutions worldwide.',
  },
  {
    id: '4',
    name: 'Gulf Import Group',
    country: 'AE',
    type: 'importer',
    sectors: ['construction', 'energy'],
    certifications: ['iso9001'],
    logo: 'https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'UAE-based company importing construction materials and energy solutions.',
  },
  {
    id: '5',
    name: 'Brazil Coffee Traders',
    country: 'BR',
    type: 'exporter',
    sectors: ['food', 'agriculture'],
    certifications: ['halal', 'iso9001'],
    logo: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Premium coffee bean exporter from the finest Brazilian plantations.',
  },
  {
    id: '6',
    name: 'Qatar Medical Imports',
    country: 'QA',
    type: 'importer',
    sectors: ['healthcare', 'technology'],
    certifications: ['iso9001', 'iso14001'],
    logo: 'https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Qatari company specializing in importing medical equipment and healthcare technology.',
  },
  {
    id: '7',
    name: 'BrasilTextil',
    country: 'BR',
    type: 'exporter',
    sectors: ['textile', 'manufacturing'],
    certifications: ['iso9001'],
    logo: 'https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Brazilian textile manufacturer exporting high-quality fabrics and garments.',
  },
  {
    id: '8',
    name: 'Kuwait Food Distributors',
    country: 'KW',
    type: 'importer',
    sectors: ['food'],
    certifications: ['halal', 'iso22000'],
    logo: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Kuwaiti food distribution company specializing in imported goods.',
  },
  {
    id: '9',
    name: 'Natura Brasil',
    country: 'BR',
    type: 'exporter',
    sectors: ['healthcare', 'manufacturing'],
    certifications: ['iso9001', 'iso14001', 'other'],
    logo: 'https://images.pexels.com/photos/3737847/pexels-photo-3737847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Brazilian cosmetics manufacturer using natural Amazonian ingredients with sustainable practices.',
  },
  {
    id: '10',
    name: 'Dubai Luxury Imports',
    country: 'AE',
    type: 'importer',
    sectors: ['textile', 'manufacturing'],
    certifications: ['iso9001'],
    logo: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Luxury goods importer based in Dubai focusing on high-end textiles and manufactured goods.',
  },
  {
    id: '11',
    name: 'Halal Meats Brasil',
    country: 'BR',
    type: 'exporter',
    sectors: ['food', 'agriculture'],
    certifications: ['halal', 'iso22000', 'haccp'],
    logo: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Specialized Brazilian meat exporter with full Halal certification for Middle Eastern markets.',
  },
  {
    id: '12',
    name: 'Saudi Solar Solutions',
    country: 'SA',
    type: 'importer',
    sectors: ['energy', 'technology'],
    certifications: ['iso9001', 'iso14001'],
    logo: 'https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Saudi company importing renewable energy technologies to expand solar capacity in the region.',
  },
  {
    id: '13',
    name: 'Brasil Pharma Exports',
    country: 'BR',
    type: 'exporter',
    sectors: ['healthcare', 'manufacturing'],
    certifications: ['iso9001', 'gmp', 'other'],
    logo: 'https://images.pexels.com/photos/3683098/pexels-photo-3683098.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Brazilian pharmaceutical manufacturer exporting medications and healthcare products worldwide.',
  },
  {
    id: '14',
    name: 'Omani Fresh Produce',
    country: 'OM',
    type: 'importer',
    sectors: ['food', 'agriculture'],
    certifications: ['halal', 'iso22000', 'haccp'],
    logo: 'https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Oman-based food import company specializing in fresh fruits and vegetables.',
  },
  {
    id: '15',
    name: 'TechBrazil',
    country: 'BR',
    type: 'exporter',
    sectors: ['technology', 'manufacturing'],
    certifications: ['iso9001', 'iso14001'],
    logo: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Brazilian tech company exporting software solutions and manufactured electronic devices.',
  },
  {
    id: '16',
    name: 'Egyptian Construction Materials',
    country: 'EG',
    type: 'importer',
    sectors: ['construction', 'manufacturing'],
    certifications: ['iso9001'],
    logo: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Egyptian company importing construction materials and machinery for large-scale projects.',
  },
  {
    id: '17',
    name: 'Brasil Açúcar & Etanol',
    country: 'BR',
    type: 'exporter',
    sectors: ['agriculture', 'energy'],
    certifications: ['iso9001', 'halal', 'iso14001'],
    logo: 'https://images.pexels.com/photos/773471/pexels-photo-773471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Brazilian sugar and ethanol producer exporting sustainable biofuels and food ingredients.',
  },
  {
    id: '18',
    name: 'Jordanian Medical Supplies',
    country: 'JO',
    type: 'importer',
    sectors: ['healthcare'],
    certifications: ['iso9001', 'gmp'],
    logo: 'https://images.pexels.com/photos/3376799/pexels-photo-3376799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Jordan-based medical supply company importing healthcare products and equipment.',
  },
  {
    id: '19',
    name: 'EcoBrasil Furniture',
    country: 'BR',
    type: 'exporter',
    sectors: ['manufacturing', 'construction'],
    certifications: ['iso9001', 'iso14001'],
    logo: 'https://images.pexels.com/photos/116910/pexels-photo-116910.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Brazilian sustainable furniture manufacturer exporting eco-friendly wood products.',
  },
  {
    id: '20',
    name: 'Bahrain Gourmet Imports',
    country: 'BH',
    type: 'importer',
    sectors: ['food'],
    certifications: ['halal', 'iso22000', 'haccp'],
    logo: 'https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Bahraini gourmet food importer specializing in premium international food products.',
  },
  {
    id: '21',
    name: 'AgroSul Brasil',
    country: 'BR',
    type: 'both',
    sectors: ['agriculture', 'food', 'technology'],
    certifications: ['halal', 'iso9001', 'iso22000'],
    logo: 'https://images.pexels.com/photos/259280/pexels-photo-259280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Brazilian agribusiness company that both exports agricultural products and imports agricultural technology.',
  },
  {
    id: '22',
    name: 'Lebanese Trading Group',
    country: 'LB',
    type: 'both',
    sectors: ['food', 'textile', 'manufacturing'],
    certifications: ['halal', 'iso9001'],
    logo: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Lebanese trading company specializing in a wide range of imports and exports between Middle East and South America.',
  },
  {
    id: '23',
    name: 'Tech Horizons Brasil',
    country: 'BR',
    type: 'exporter',
    sectors: ['technology', 'energy'],
    certifications: ['iso9001', 'iso14001'],
    logo: 'https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Brazilian clean tech exporter specializing in renewable energy solutions and smart grid technologies.',
  },
  {
    id: '24',
    name: 'Qatar Tourism Investments',
    country: 'QA',
    type: 'importer',
    sectors: ['tourism', 'construction'],
    certifications: ['iso9001'],
    logo: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Qatari company importing hospitality equipment and construction materials for tourism infrastructure.',
  }
];

// Mock user data
export const mockUser: User = {
  id: '123',
  name: 'John Silva',
  email: 'john.silva@example.com',
  company: {
    id: '5',
    name: 'Brazil Coffee Traders',
    country: 'BR',
    type: 'exporter',
    sectors: ['food', 'agriculture'],
    certifications: ['halal', 'iso9001'],
    logo: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Premium coffee bean exporter from the finest Brazilian plantations.'
  },
  connections: ['2', '4', '8'],
  profileViews: 156
};

/**
 * Calcula o score de compatibilidade (match) entre duas empresas
 * Considera múltiplos fatores com diferentes pesos para um cálculo mais preciso
 * 
 * @param company1 Empresa base para comparação (geralmente a empresa do usuário)
 * @param company2 Empresa a ser comparada
 * @returns Pontuação de 0 a 100 indicando o nível de compatibilidade
 */
export const calculateMatchScore = (company1: Company, company2: Company): number => {
  let score = 0;
  const maxScore = 100;
  
  // 1. Compatibilidade de tipo (importador x exportador) - 30% do score
  if (
    (company1.type === 'importer' && company2.type === 'exporter') ||
    (company1.type === 'exporter' && company2.type === 'importer')
  ) {
    score += 30;
  } else if (company1.type === 'both' || company2.type === 'both') {
    score += 20; // Se um deles for 'both', há compatibilidade parcial
  }
  
  // 2. Setores em comum - 25% do score
  const commonSectors = company1.sectors.filter(sector => 
    company2.sectors.includes(sector)
  );
  
  const sectorScore = Math.min(commonSectors.length / Math.max(company1.sectors.length, 1) * 25, 25);
  score += sectorScore;
  
  // 3. Certificações em comum - 15% do score
  const commonCerts = company1.certifications.filter(cert => 
    company2.certifications.includes(cert)
  );
  
  const certScore = Math.min(commonCerts.length / Math.max(company1.certifications.length, 1) * 15, 15);
  score += certScore;
  
  // 4. Compatibilidade geográfica (Brasil x países árabes) - 20% do score
  const isCompany1Arab = countryGroups.arabWorld.includes(company1.country);
  const isCompany2Arab = countryGroups.arabWorld.includes(company2.country);
  const isCompany1Latin = countryGroups.latinAmerica.includes(company1.country);
  const isCompany2Latin = countryGroups.latinAmerica.includes(company2.country);
  
  if ((isCompany1Arab && isCompany2Latin) || (isCompany1Latin && isCompany2Arab)) {
    score += 20; // Conexão Brasil-Mundo Árabe é o foco principal
  } else {
    score += 5; // Outras conexões geográficas têm menor prioridade
  }
  
  // 5. Bônus para certas combinações específicas - 10% do score
  // Ex: Exportador de alimentos brasileiro com certificação halal + Importador de alimentos de país árabe
  if (
    (company1.country === 'BR' && company1.type === 'exporter' && 
     company1.sectors.includes('food') && company1.certifications.includes('halal') &&
     countryGroups.arabWorld.includes(company2.country) && company2.type === 'importer' && 
     company2.sectors.includes('food')) ||
    (company2.country === 'BR' && company2.type === 'exporter' && 
     company2.sectors.includes('food') && company2.certifications.includes('halal') &&
     countryGroups.arabWorld.includes(company1.country) && company1.type === 'importer' && 
     company1.sectors.includes('food'))
  ) {
    score += 10;
  }
  
  // Normaliza o score para garantir que esteja entre 0 e 100
  return Math.min(Math.round(score), maxScore);
};

// Get suggested connections based on calculated match score
export const getSuggestedConnections = (user: User, limit = 3): Company[] => {
  if (!user.company) return [];
  
  // Filtra empresas que não sejam a própria do usuário e não estão conectadas
  const potentialMatches = mockCompanies.filter(company => 
    company.id !== user.company?.id && 
    !user.connections.includes(company.id)
  );
  
  // Calcula o score de match para cada empresa potencial
  const companiesWithScores = potentialMatches.map(company => {
    const matchScore = calculateMatchScore(user.company!, company);
    return { ...company, matchScore };
  });
  
  // Ordena por score de match e retorna os melhores matches
  return companiesWithScores
    .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
    .slice(0, limit);
};

// Get connected companies
export const getConnections = (user: User): Company[] => {
  return mockCompanies.filter(company => user.connections.includes(company.id));
};

// Filter companies
export const filterCompanies = (
  companies: Company[],
  filters: {
    country?: string,
    sector?: string,
    type?: 'importer' | 'exporter' | 'both'
  }
): Company[] => {
  return companies.filter(company => {
    if (filters.country && company.country !== filters.country) return false;
    if (filters.sector && !company.sectors.includes(filters.sector)) return false;
    if (filters.type && company.type !== filters.type) return false;
    return true;
  });
};