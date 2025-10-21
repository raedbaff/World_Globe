import { AttackCategory, AttackSeverity, type Attack } from "../types/Attack";

export const sampleAttacks: Attack[] = [
  {
    id: "atk-001",
    category: AttackCategory.INFILTRATION,
    date: "2025-10-18T09:21:00Z",
    source: { longitude: 37.6173, latitude: 55.7558, countryName: "Russia" },
    target: {
      longitude: -74.006,
      latitude: 40.7128,
      countryName: "United States",
    },
    description:
      "Stealthy credential stuffing against web-login endpoints, low request rate to avoid throttles.",
    impact: AttackSeverity.MODERATE,
  },
  {
    id: "atk-002",
    category: AttackCategory.FLOODING,
    date: "2025-10-19T14:05:00Z",
    source: { longitude: 103.8198, latitude: 1.3521, countryName: "Singapore" },
    target: { longitude: 139.6917, latitude: 35.6895, countryName: "Japan" },
    description:
      "High-volume traffic flood from botnet cluster hitting API gateway, causing intermittent timeouts.",
    impact: AttackSeverity.SEVERE,
  },
  {
    id: "atk-003",
    category: AttackCategory.SIGNAL_JAM,
    date: "2025-09-30T22:40:00Z",
    source: { longitude: 31.2357, latitude: 30.0444, countryName: "Egypt" },
    target: { longitude: 28.9784, latitude: 41.0082, countryName: "Turkey" },
    description:
      "Protocol-level malformed packet stream disrupting telemetry feeds on edge routers.",
    impact: AttackSeverity.MODERATE,
  },
  {
    id: "atk-004",
    category: AttackCategory.SHADOW_ACCESS,
    date: "2025-10-05T03:12:00Z",
    source: {
      longitude: -0.1276,
      latitude: 51.5074,
      countryName: "United Kingdom",
    },
    target: { longitude: 2.3522, latitude: 48.8566, countryName: "France" },
    description:
      "Unauthorized SSH access discovered on a poorly hardened bastion host; lateral movement detected.",
    impact: AttackSeverity.CRITICAL,
  },
  {
    id: "atk-005",
    category: AttackCategory.DATA_LEAK,
    date: "2025-10-01T12:00:00Z",
    source: { longitude: -46.6333, latitude: -23.5505, countryName: "Brazil" },
    target: { longitude: -3.7038, latitude: 40.4168, countryName: "Spain" },
    description:
      "Large-scale exfiltration of user PII via encrypted channel to external storage.",
    impact: AttackSeverity.CATASTROPHIC,
  },
  {
    id: "atk-006",
    category: AttackCategory.INFILTRATION,
    date: "2025-08-21T06:30:00Z",
    source: { longitude: 18.0632, latitude: 59.3348, countryName: "Sweden" },
    target: {
      longitude: 4.9041,
      latitude: 52.3676,
      countryName: "Netherlands",
    },
    description:
      "Targeted exploit attempt against outdated CMS plugins; multiple failed attempts recorded.",
    impact: AttackSeverity.MINOR,
  },
  {
    id: "atk-007",
    category: AttackCategory.FLOODING,
    date: "2025-10-15T19:50:00Z",
    source: { longitude: 116.4074, latitude: 39.9042, countryName: "China" },
    target: {
      longitude: 151.2093,
      latitude: -33.8688,
      countryName: "Australia",
    },
    description:
      "Sustained volumetric UDP floods focused on game servers, saturating uplink for several minutes.",
    impact: AttackSeverity.SEVERE,
  },
  {
    id: "atk-008",
    category: AttackCategory.SIGNAL_JAM,
    date: "2025-07-12T11:05:00Z",
    source: { longitude: -3.7038, latitude: 40.4168, countryName: "Spain" },
    target: { longitude: 12.4964, latitude: 41.9028, countryName: "Italy" },
    description:
      "Targeted manipulation of DNS responses causing resolution failures for critical domains.",
    impact: AttackSeverity.SEVERE,
  },
  {
    id: "atk-009",
    category: AttackCategory.SHADOW_ACCESS,
    date: "2025-09-02T23:59:00Z",
    source: {
      longitude: -122.4194,
      latitude: 37.7749,
      countryName: "United States",
    },
    target: {
      longitude: -0.1276,
      latitude: 51.5074,
      countryName: "United Kingdom",
    },
    description:
      "Compromised service account used to create persistent backdoor and exfiltrate config files.",
    impact: AttackSeverity.CRITICAL,
  },
  {
    id: "atk-010",
    category: AttackCategory.DATA_LEAK,
    date: "2025-10-20T07:45:00Z",
    source: {
      longitude: 18.4241,
      latitude: -33.9249,
      countryName: "South Africa",
    },
    target: {
      longitude: 28.0473,
      latitude: -26.2041,
      countryName: "South Africa",
    },
    description:
      "Internal leak from misconfigured storage bucket exposing analytics datasets publicly.",
    impact: AttackSeverity.MODERATE,
  },
];
