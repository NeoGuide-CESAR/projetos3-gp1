export type ProjectStatus = 'DRAFT' | 'IN_REVIEW' | 'CALCULATED';

export interface ProjectDetail {
  id: string;
  name: string;
  status: ProjectStatus;
  updatedAt: string;
  calculatedAt?: string | null;
  totalDemandKva?: number | null;
  submittedAt?: string | null;
  nextStep?: string | null;
  data: {
    cep: string;
    address: string;
    buildingType: string;
    evCharging: boolean;
    firePump: boolean;
  };
  // null = etapa não se aplica a este projeto
  steps: {
    residential: { groups: { name: string; units: number; area: number }[]; smartStudio: boolean } | null;
    commonArea: { label: string; items: { name: string; value: number }[] }[] | null;
    commercial: { shops: { name: string; area: number }[] } | null;
    evAndFire: { chargingPoints: number | null; firePumpPower: number | null } | null;
  };
}
