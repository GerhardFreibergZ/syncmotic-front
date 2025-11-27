// Mock data para el dashboard de ahorro energético

export interface EquipoData {
  nombre: string;
  consumo_kwh: number;
  costo_soles: number;
  categoria: "Cocina" | "Refrigeración" | "Climatización" | "Iluminación" | "Otros";
  estado: "normal" | "alerta" | "optimo";
}

export interface MesData {
  mes: string;
  year: number;
  total_consumo_kwh: number;
  total_ahorro_kwh: number;
  total_ahorro_soles: number;
  consumo_anterior_kwh: number;
  co2_evitado_kg: number;
  equipos: EquipoData[];
}

export const mesesData: MesData[] = [
  {
    mes: "Enero",
    year: 2024,
    total_consumo_kwh: 1450,
    total_ahorro_kwh: 150,
    total_ahorro_soles: 105,
    consumo_anterior_kwh: 1600,
    co2_evitado_kg: 75,
    equipos: [
      { nombre: "Cafetera Express", consumo_kwh: 380, costo_soles: 55, categoria: "Cocina", estado: "normal" },
      { nombre: "Horno Eléctrico", consumo_kwh: 290, costo_soles: 42, categoria: "Cocina", estado: "alerta" },
      { nombre: "Refrigeradora Industrial", consumo_kwh: 450, costo_soles: 65, categoria: "Refrigeración", estado: "normal" },
      { nombre: "Sistema de Iluminación", consumo_kwh: 180, costo_soles: 26, categoria: "Iluminación", estado: "optimo" },
      { nombre: "Aire Acondicionado", consumo_kwh: 150, costo_soles: 22, categoria: "Climatización", estado: "optimo" },
    ]
  },
  {
    mes: "Febrero",
    year: 2024,
    total_consumo_kwh: 1380,
    total_ahorro_kwh: 220,
    total_ahorro_soles: 154,
    consumo_anterior_kwh: 1600,
    co2_evitado_kg: 110,
    equipos: [
      { nombre: "Cafetera Express", consumo_kwh: 360, costo_soles: 52, categoria: "Cocina", estado: "optimo" },
      { nombre: "Horno Eléctrico", consumo_kwh: 270, costo_soles: 39, categoria: "Cocina", estado: "normal" },
      { nombre: "Refrigeradora Industrial", consumo_kwh: 430, costo_soles: 62, categoria: "Refrigeración", estado: "optimo" },
      { nombre: "Sistema de Iluminación", consumo_kwh: 170, costo_soles: 24, categoria: "Iluminación", estado: "optimo" },
      { nombre: "Aire Acondicionado", consumo_kwh: 150, costo_soles: 22, categoria: "Climatización", estado: "normal" },
    ]
  },
  {
    mes: "Marzo",
    year: 2024,
    total_consumo_kwh: 1320,
    total_ahorro_kwh: 280,
    total_ahorro_soles: 196,
    consumo_anterior_kwh: 1600,
    co2_evitado_kg: 140,
    equipos: [
      { nombre: "Cafetera Express", consumo_kwh: 340, costo_soles: 49, categoria: "Cocina", estado: "optimo" },
      { nombre: "Horno Eléctrico", consumo_kwh: 260, costo_soles: 38, categoria: "Cocina", estado: "optimo" },
      { nombre: "Refrigeradora Industrial", consumo_kwh: 410, costo_soles: 59, categoria: "Refrigeración", estado: "optimo" },
      { nombre: "Sistema de Iluminación", consumo_kwh: 160, costo_soles: 23, categoria: "Iluminación", estado: "optimo" },
      { nombre: "Aire Acondicionado", consumo_kwh: 150, costo_soles: 22, categoria: "Climatización", estado: "normal" },
    ]
  },
  {
    mes: "Abril",
    year: 2024,
    total_consumo_kwh: 1280,
    total_ahorro_kwh: 320,
    total_ahorro_soles: 224,
    consumo_anterior_kwh: 1600,
    co2_evitado_kg: 160,
    equipos: [
      { nombre: "Cafetera Express", consumo_kwh: 320, costo_soles: 46, categoria: "Cocina", estado: "optimo" },
      { nombre: "Horno Eléctrico", consumo_kwh: 250, costo_soles: 36, categoria: "Cocina", estado: "optimo" },
      { nombre: "Refrigeradora Industrial", consumo_kwh: 400, costo_soles: 58, categoria: "Refrigeración", estado: "optimo" },
      { nombre: "Sistema de Iluminación", consumo_kwh: 160, costo_soles: 23, categoria: "Iluminación", estado: "optimo" },
      { nombre: "Aire Acondicionado", consumo_kwh: 150, costo_soles: 22, categoria: "Climatización", estado: "normal" },
    ]
  },
  {
    mes: "Mayo",
    year: 2024,
    total_consumo_kwh: 1250,
    total_ahorro_kwh: 350,
    total_ahorro_soles: 245,
    consumo_anterior_kwh: 1600,
    co2_evitado_kg: 175,
    equipos: [
      { nombre: "Cafetera Express", consumo_kwh: 310, costo_soles: 45, categoria: "Cocina", estado: "optimo" },
      { nombre: "Horno Eléctrico", consumo_kwh: 240, costo_soles: 35, categoria: "Cocina", estado: "optimo" },
      { nombre: "Refrigeradora Industrial", consumo_kwh: 390, costo_soles: 56, categoria: "Refrigeración", estado: "optimo" },
      { nombre: "Sistema de Iluminación", consumo_kwh: 160, costo_soles: 23, categoria: "Iluminación", estado: "optimo" },
      { nombre: "Aire Acondicionado", consumo_kwh: 150, costo_soles: 22, categoria: "Climatización", estado: "normal" },
    ]
  },
  {
    mes: "Junio",
    year: 2024,
    total_consumo_kwh: 1200,
    total_ahorro_kwh: 400,
    total_ahorro_soles: 280,
    consumo_anterior_kwh: 1600,
    co2_evitado_kg: 200,
    equipos: [
      { nombre: "Cafetera Express", consumo_kwh: 300, costo_soles: 43, categoria: "Cocina", estado: "optimo" },
      { nombre: "Horno Eléctrico", consumo_kwh: 230, costo_soles: 33, categoria: "Cocina", estado: "optimo" },
      { nombre: "Refrigeradora Industrial", consumo_kwh: 380, costo_soles: 55, categoria: "Refrigeración", estado: "optimo" },
      { nombre: "Sistema de Iluminación", consumo_kwh: 140, costo_soles: 20, categoria: "Iluminación", estado: "optimo" },
      { nombre: "Aire Acondicionado", consumo_kwh: 150, costo_soles: 22, categoria: "Climatización", estado: "normal" },
    ]
  }
];

// Mes actual seleccionado por defecto
export const getCurrentMonthData = (): MesData => {
  return mesesData[mesesData.length - 1];
};

// Obtener datos de un mes específico
export const getMonthData = (month: string, year: number): MesData | undefined => {
  return mesesData.find(m => m.mes === month && m.year === year);
};

// Calcular porcentaje de mejora
export const calcularPorcentajeMejora = (actual: number, anterior: number): number => {
  if (anterior === 0) return 0;
  return Math.round(((anterior - actual) / anterior) * 100);
};
