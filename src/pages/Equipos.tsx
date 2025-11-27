import { useState } from "react";
import { ArrowUpDown, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MonthSelector } from "@/components/MonthSelector";
import {
  getCurrentMonthData,
  getMonthData,
  EquipoData,
} from "@/data/mockData";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export default function Equipos() {
  const [selectedMonth, setSelectedMonth] = useState(
    `${getCurrentMonthData().mes}-${getCurrentMonthData().year}`
  );
  const [sortBy, setSortBy] = useState<"consumo" | "costo">("consumo");
  const [filterCategoria, setFilterCategoria] = useState<string>("todas");

  const currentData = (() => {
    const [mes, year] = selectedMonth.split("-");
    return getMonthData(mes, parseInt(year)) || getCurrentMonthData();
  })();

  // Filtrar equipos
  let equiposFiltrados = [...currentData.equipos];
  if (filterCategoria !== "todas") {
    equiposFiltrados = equiposFiltrados.filter(
      (e) => e.categoria === filterCategoria
    );
  }

  // Ordenar equipos
  equiposFiltrados.sort((a, b) => {
    if (sortBy === "consumo") {
      return b.consumo_kwh - a.consumo_kwh;
    }
    return b.costo_soles - a.costo_soles;
  });

  // Datos para el gráfico de pastel
  const pieData = currentData.equipos.map((equipo) => ({
    name: equipo.nombre,
    value: equipo.consumo_kwh,
  }));

  const getEstadoBadge = (estado: EquipoData["estado"]) => {
    switch (estado) {
      case "optimo":
        return <span className="badge-success">Óptimo</span>;
      case "alerta":
        return <span className="badge-warning">Alerta</span>;
      default:
        return <span className="badge-info">Normal</span>;
    }
  };

  const categorias = [
    "todas",
    ...Array.from(new Set(currentData.equipos.map((e) => e.categoria))),
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Consumo por Equipos
          </h1>
          <p className="text-muted-foreground mt-1">
            Detalle del consumo energético de cada equipo
          </p>
        </div>
        <MonthSelector
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
        />
      </div>

      {/* Resumen */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="metric-card">
          <p className="stat-label">Total Equipos</p>
          <h3 className="stat-value">{currentData.equipos.length}</h3>
        </Card>
        <Card className="metric-card">
          <p className="stat-label">Consumo Total</p>
          <h3 className="stat-value">{currentData.total_consumo_kwh} kWh</h3>
        </Card>
        <Card className="metric-card">
          <p className="stat-label">Costo Total</p>
          <h3 className="stat-value">
            S/{" "}
            {currentData.equipos.reduce((sum, e) => sum + e.costo_soles, 0)}
          </h3>
        </Card>
      </div>

      {/* Gráfico de pastel */}
      <Card className="metric-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Distribución de Consumo por Equipo
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* Filtros y ordenamiento */}
      <Card className="metric-card">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">
            Lista de Equipos
          </h3>
          <div className="flex gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={filterCategoria} onValueChange={setFilterCategoria}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat === "todas" ? "Todas las categorías" : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              <Select
                value={sortBy}
                onValueChange={(v) => setSortBy(v as "consumo" | "costo")}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consumo">Mayor consumo</SelectItem>
                  <SelectItem value="costo">Mayor costo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Tabla de equipos */}
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Equipo</TableHead>
                <TableHead className="font-semibold">Categoría</TableHead>
                <TableHead className="font-semibold text-right">
                  Consumo (kWh)
                </TableHead>
                <TableHead className="font-semibold text-right">
                  Costo (S/)
                </TableHead>
                <TableHead className="font-semibold text-right">
                  % del Total
                </TableHead>
                <TableHead className="font-semibold text-center">
                  Estado
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {equiposFiltrados.map((equipo) => {
                const porcentaje = Math.round(
                  (equipo.consumo_kwh / currentData.total_consumo_kwh) * 100
                );
                return (
                  <TableRow key={equipo.nombre} className="hover:bg-muted/30">
                    <TableCell className="font-medium">
                      {equipo.nombre}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {equipo.categoria}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {equipo.consumo_kwh}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {equipo.costo_soles}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${porcentaje}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">
                          {porcentaje}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {getEstadoBadge(equipo.estado)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
