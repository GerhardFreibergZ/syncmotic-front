import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartDataPoint {
  mes: string;
  consumo: number;
  ahorro: number;
}

interface SavingsChartProps {
  data: ChartDataPoint[];
  type?: "line" | "bar";
}

export function SavingsChart({ data, type = "line" }: SavingsChartProps) {
  return (
    <Card className="metric-card">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Tendencia de Consumo y Ahorro
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Evolución mensual en kWh
        </p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        {type === "line" ? (
          <LineChart data={data}>
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
            <Line
              type="monotone"
              dataKey="consumo"
              name="Consumo Total"
              stroke="hsl(var(--info))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--info))", r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="ahorro"
              name="Ahorro"
              stroke="hsl(var(--success))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--success))", r: 4 }}
            />
          </LineChart>
        ) : (
          <BarChart data={data}>
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
              dataKey="consumo"
              name="Consumo Total"
              fill="hsl(var(--info))"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="ahorro"
              name="Ahorro"
              fill="hsl(var(--success))"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        )}
      </ResponsiveContainer>
    </Card>
  );
}
