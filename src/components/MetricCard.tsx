import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  variant?: "default" | "success" | "warning" | "info";
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
}: MetricCardProps) {
  const variantStyles = {
    default: "bg-gradient-to-br from-card to-muted/30",
    success: "bg-gradient-to-br from-success/10 to-success/5 border-success/20",
    warning: "bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20",
    info: "bg-gradient-to-br from-info/10 to-info/5 border-info/20",
  };

  const iconVariantStyles = {
    default: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    info: "bg-info/10 text-info",
  };

  return (
    <Card
      className={`metric-card ${variantStyles[variant]} animate-fade-in`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="stat-label">{title}</p>
          <h3 className="stat-value">{value}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center gap-2 mt-3">
              <span
                className={`text-sm font-medium ${
                  trend.value > 0 ? "text-success" : "text-destructive"
                }`}
              >
                {trend.value > 0 ? "+" : ""}
                {trend.value}%
              </span>
              <span className="text-xs text-muted-foreground">{trend.label}</span>
            </div>
          )}
        </div>
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-lg ${iconVariantStyles[variant]}`}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
}
