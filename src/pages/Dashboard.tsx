import { useState } from "react";
import { Zap, TrendingDown, DollarSign, Leaf, Activity } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { SavingsChart } from "@/components/SavingsChart";
import { MonthSelector } from "@/components/MonthSelector";
import {
  getCurrentMonthData,
  getMonthData,
  calcularPorcentajeMejora,
  mesesData,
} from "@/data/mockData";

export default function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState(
    `${getCurrentMonthData().mes}-${getCurrentMonthData().year}`
  );

  const currentData = (() => {
    const [mes, year] = selectedMonth.split("-");
    return getMonthData(mes, parseInt(year)) || getCurrentMonthData();
  })();

  const porcentajeMejora = calcularPorcentajeMejora(
    currentData.total_consumo_kwh,
    currentData.consumo_anterior_kwh
  );

  // Preparar datos para el gráfico
  const chartData = mesesData.map((m) => ({
    mes: `${m.mes.substring(0, 3)}`,
    consumo: m.total_consumo_kwh,
    ahorro: m.total_ahorro_kwh,
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Dashboard de Ahorro Energético
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitoreo y optimización del consumo de tu cafetería
          </p>
        </div>
        <MonthSelector
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
        />
      </div>

      {/* Resumen automático */}
      <div className="metric-card bg-gradient-to-r from-success/10 via-success/5 to-transparent border-success/20">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/20">
            <Leaf className="h-6 w-6 text-success" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              ¡Excelente trabajo!
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Este mes has ahorrado{" "}
              <span className="font-semibold text-success">
                {currentData.total_ahorro_kwh} kWh
              </span>{" "}
              equivalentes a{" "}
              <span className="font-semibold text-success">
                S/ {currentData.total_ahorro_soles}
              </span>
              , evitando la emisión de{" "}
              <span className="font-semibold text-success">
                {currentData.co2_evitado_kg} kg de CO₂
              </span>{" "}
              al ambiente.
            </p>
          </div>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Consumo Actual"
          value={`${currentData.total_consumo_kwh} kWh`}
          subtitle={currentData.mes}
          icon={Zap}
          variant="info"
        />
        <MetricCard
          title="Ahorro Acumulado"
          value={`${currentData.total_ahorro_kwh} kWh`}
          subtitle="vs. periodo anterior"
          icon={TrendingDown}
          trend={{
            value: porcentajeMejora,
            label: "mejora",
          }}
          variant="success"
        />
        <MetricCard
          title="Has Ahorrado"
          value={`S/ ${currentData.total_ahorro_soles}`}
          subtitle="este mes"
          icon={DollarSign}
          variant="success"
        />
        <MetricCard
          title="Impacto Ambiental"
          value={`${currentData.co2_evitado_kg} kg`}
          subtitle="CO₂ evitado"
          icon={Leaf}
          variant="success"
        />
      </div>

      {/* Indicador de estado */}
      <div className="metric-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Estado del Sistema
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Rendimiento general de eficiencia energética
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-success/20 mx-auto">
                <Activity className="h-8 w-8 text-success" />
              </div>
              <span className="badge-success mt-2">Óptimo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de tendencias */}
      <SavingsChart data={chartData} type="line" />

      {/* Equipos con mayor consumo */}
      <div className="metric-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Equipos Principales
        </h3>
        <div className="space-y-3">
          {currentData.equipos
            .sort((a, b) => b.consumo_kwh - a.consumo_kwh)
            .slice(0, 3)
            .map((equipo) => {
              const porcentajeConsumo = Math.round(
                (equipo.consumo_kwh / currentData.total_consumo_kwh) * 100
              );
              return (
                <div
                  key={equipo.nombre}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border"
                >
                  <div>
                    <p className="font-medium text-foreground">{equipo.nombre}</p>
                    <p className="text-sm text-muted-foreground">
                      {equipo.categoria}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">
                      {equipo.consumo_kwh} kWh
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {porcentajeConsumo}% del total
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
