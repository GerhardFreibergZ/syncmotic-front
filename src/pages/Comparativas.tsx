import { Card } from "@/components/ui/card";
import { SavingsChart } from "@/components/SavingsChart";
import { mesesData } from "@/data/mockData";
import { TrendingDown, TrendingUp, DollarSign, Zap } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Comparativas() {
  // Preparar datos para gráficos
  const chartData = mesesData.map((m) => ({
    mes: m.mes.substring(0, 3),
    consumo: m.total_consumo_kwh,
    ahorro: m.total_ahorro_kwh,
  }));

  const ahorroData = mesesData.map((m) => ({
    mes: m.mes.substring(0, 3),
    ahorro_kwh: m.total_ahorro_kwh,
    ahorro_soles: m.total_ahorro_soles,
    co2_evitado: m.co2_evitado_kg,
  }));

  // Calcular estadísticas
  const totalAhorroKwh = mesesData.reduce(
    (sum, m) => sum + m.total_ahorro_kwh,
    0
  );
  const totalAhorroSoles = mesesData.reduce(
    (sum, m) => sum + m.total_ahorro_soles,
    0
  );
  const totalCO2Evitado = mesesData.reduce(
    (sum, m) => sum + m.co2_evitado_kg,
    0
  );
  const promedioConsumo =
    mesesData.reduce((sum, m) => sum + m.total_consumo_kwh, 0) /
    mesesData.length;

  const mejorMes = mesesData.reduce((prev, current) =>
    prev.total_ahorro_kwh > current.total_ahorro_kwh ? prev : current
  );

  const consumoTendencia =
    mesesData[mesesData.length - 1].total_consumo_kwh -
    mesesData[0].total_consumo_kwh;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Comparativas Mensuales
        </h1>
        <p className="text-muted-foreground mt-1">
          Análisis histórico del consumo y ahorro energético
        </p>
      </div>

      {/* Resumen estadístico */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="metric-card bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <div className="flex items-start justify-between">
            <div>
              <p className="stat-label">Ahorro Acumulado</p>
              <h3 className="stat-value">{totalAhorroKwh} kWh</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Últimos 6 meses
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/20">
              <TrendingDown className="h-6 w-6 text-success" />
            </div>
          </div>
        </Card>

        <Card className="metric-card bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <div className="flex items-start justify-between">
            <div>
              <p className="stat-label">Ahorro Total</p>
              <h3 className="stat-value">S/ {totalAhorroSoles}</h3>
              <p className="text-sm text-muted-foreground mt-1">En dinero</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/20">
              <DollarSign className="h-6 w-6 text-success" />
            </div>
          </div>
        </Card>

        <Card className="metric-card bg-gradient-to-br from-info/10 to-info/5 border-info/20">
          <div className="flex items-start justify-between">
            <div>
              <p className="stat-label">Consumo Promedio</p>
              <h3 className="stat-value">{Math.round(promedioConsumo)} kWh</h3>
              <p className="text-sm text-muted-foreground mt-1">Por mes</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-info/20">
              <Zap className="h-6 w-6 text-info" />
            </div>
          </div>
        </Card>

        <Card className="metric-card bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <div className="flex items-start justify-between">
            <div>
              <p className="stat-label">CO₂ Evitado</p>
              <h3 className="stat-value">{totalCO2Evitado} kg</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Impacto ambiental
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/20">
              <TrendingDown className="h-6 w-6 text-success" />
            </div>
          </div>
        </Card>
      </div>

      {/* Insights */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="metric-card">
          <h3 className="text-lg font-semibold text-foreground mb-3">
            Mejor Mes de Ahorro
          </h3>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/20">
              <TrendingDown className="h-8 w-8 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {mejorMes.mes} {mejorMes.year}
              </p>
              <p className="text-sm text-muted-foreground">
                Ahorro de {mejorMes.total_ahorro_kwh} kWh (S/{" "}
                {mejorMes.total_ahorro_soles})
              </p>
            </div>
          </div>
        </Card>

        <Card className="metric-card">
          <h3 className="text-lg font-semibold text-foreground mb-3">
            Tendencia General
          </h3>
          <div className="flex items-center gap-4">
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-full ${
                consumoTendencia < 0 ? "bg-success/20" : "bg-warning/20"
              }`}
            >
              {consumoTendencia < 0 ? (
                <TrendingDown className="h-8 w-8 text-success" />
              ) : (
                <TrendingUp className="h-8 w-8 text-warning" />
              )}
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {Math.abs(consumoTendencia)} kWh
              </p>
              <p className="text-sm text-muted-foreground">
                {consumoTendencia < 0 ? "Reducción" : "Incremento"} en el periodo
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Gráfico de tendencia */}
      <SavingsChart data={chartData} type="line" />

      {/* Gráfico de ahorros */}
      <Card className="metric-card">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">
            Evolución del Ahorro
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Ahorro mensual en kWh y equivalente económico
          </p>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={ahorroData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="mes"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar
              dataKey="ahorro_kwh"
              name="Ahorro (kWh)"
              fill="hsl(var(--success))"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="ahorro_soles"
              name="Ahorro (S/)"
              fill="hsl(var(--info))"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Tabla de comparación mensual */}
      <Card className="metric-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Comparación Detallada
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">
                  Mes
                </th>
                <th className="text-right py-3 px-4 font-semibold text-foreground">
                  Consumo (kWh)
                </th>
                <th className="text-right py-3 px-4 font-semibold text-foreground">
                  Ahorro (kWh)
                </th>
                <th className="text-right py-3 px-4 font-semibold text-foreground">
                  Ahorro (S/)
                </th>
                <th className="text-right py-3 px-4 font-semibold text-foreground">
                  CO₂ Evitado (kg)
                </th>
              </tr>
            </thead>
            <tbody>
              {mesesData.map((mes) => (
                <tr
                  key={`${mes.mes}-${mes.year}`}
                  className="border-b border-border hover:bg-muted/30"
                >
                  <td className="py-3 px-4 font-medium">
                    {mes.mes} {mes.year}
                  </td>
                  <td className="text-right py-3 px-4">
                    {mes.total_consumo_kwh}
                  </td>
                  <td className="text-right py-3 px-4 font-semibold text-success">
                    {mes.total_ahorro_kwh}
                  </td>
                  <td className="text-right py-3 px-4 font-semibold text-success">
                    {mes.total_ahorro_soles}
                  </td>
                  <td className="text-right py-3 px-4 text-muted-foreground">
                    {mes.co2_evitado_kg}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
