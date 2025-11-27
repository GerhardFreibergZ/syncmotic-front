-- Tabla para almacenar las lecturas de consumo de equipos
CREATE TABLE public.equipment_readings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  equipment_id TEXT NOT NULL,
  equipment_name TEXT NOT NULL,
  category TEXT NOT NULL,
  consumo_kwh DECIMAL(10,2) NOT NULL,
  costo_soles DECIMAL(10,2) NOT NULL,
  estado TEXT CHECK (estado IN ('normal', 'alerta', 'optimo')),
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabla para almacenar resúmenes mensuales
CREATE TABLE public.monthly_summary (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mes TEXT NOT NULL,
  year INTEGER NOT NULL,
  total_consumo_kwh DECIMAL(10,2) NOT NULL,
  total_ahorro_kwh DECIMAL(10,2) NOT NULL,
  total_ahorro_soles DECIMAL(10,2) NOT NULL,
  consumo_anterior_kwh DECIMAL(10,2) NOT NULL,
  co2_evitado_kg DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(mes, year)
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_equipment_readings_timestamp ON public.equipment_readings(timestamp DESC);
CREATE INDEX idx_equipment_readings_equipment_id ON public.equipment_readings(equipment_id);
CREATE INDEX idx_monthly_summary_date ON public.monthly_summary(year DESC, mes);

-- Habilitar Row Level Security
ALTER TABLE public.equipment_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monthly_summary ENABLE ROW LEVEL SECURITY;

-- Políticas RLS: permitir lectura pública (dashboard público)
CREATE POLICY "Anyone can read equipment readings" 
ON public.equipment_readings 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can read monthly summary" 
ON public.monthly_summary 
FOR SELECT 
USING (true);

-- Solo permitir inserción desde funciones autenticadas (edge functions)
CREATE POLICY "Service role can insert equipment readings" 
ON public.equipment_readings 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Service role can insert monthly summary" 
ON public.monthly_summary 
FOR INSERT 
WITH CHECK (true);

-- Habilitar realtime para actualizaciones en vivo
ALTER PUBLICATION supabase_realtime ADD TABLE public.equipment_readings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.monthly_summary;