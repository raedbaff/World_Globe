export const AttackCategory = {
  INFILTRATION: {
    id: "INFILTRATION_EVENTS",
    label: "Infiltration Attempts",
    color: "#E63946",
  },
  FLOODING: {
    id: "FLOODING_TRAFFIC",
    label: "Traffic Floods",
    color: "#457B9D",
  },
  SIGNAL_JAM: {
    id: "SIGNAL_JAMMING",
    label: "Signal Disruption",
    color: "#F1C40F",
  },
  SHADOW_ACCESS: {
    id: "SHADOW_ACCESS",
    label: "Unauthorized Access",
    color: "#8E44AD",
  },
  DATA_LEAK: {
    id: "DATA_LEAKS",
    label: "Data Leaks",
    color: "#2ECC71",
  },
} as const;

export const AttackSeverity = {
  MINOR: {
    id: "SEV_MINOR",
    label: "Minor Breach",
    level: 1,
    color: "#5BBCFF",
  },
  MODERATE: {
    id: "SEV_MODERATE",
    label: "Active Threat",
    level: 2,
    color: "#F5D547",
  },
  SEVERE: {
    id: "SEV_SEVERE",
    label: "Major Assault",
    level: 3,
    color: "#FF6B35",
  },
  CRITICAL: {
    id: "SEV_CRITICAL",
    label: "System Collapse",
    level: 4,
    color: "#E01E37",
  },
  CATASTROPHIC: {
    id: "SEV_CATASTROPHIC",
    label: "Global Disruption",
    level: 5,
    color: "#7B1FA2",
  },
} as const;

export type AttackSeverityKey = keyof typeof AttackSeverity;
export type AttackSeverityItem = (typeof AttackSeverity)[AttackSeverityKey];
export type AttackCategoryKey = keyof typeof AttackCategory;
export type AttackCategoryItem = (typeof AttackCategory)[AttackCategoryKey];

export interface Attack {
  id: string;
  category: AttackCategoryItem;
  date: string;
  source: {
    longitude: number;
    latitude: number;
    countryName: string;
  };
  target: {
    longitude: number;
    latitude: number;
    countryName: string;
  };
  description: string;
  impact: AttackSeverityItem;
}
