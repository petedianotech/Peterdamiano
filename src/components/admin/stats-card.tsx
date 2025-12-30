export default function StatsCard({
  title,
  value,
  icon,
  trend,
  trendColor = 'text-green-500',
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  trendColor?: string;
}) {
  return (
    <div className="bg-card p-6 rounded-xl border">
      <div className="flex items-center gap-4 mb-2">
        {icon}
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      </div>
      <div>
        <p className="text-3xl font-bold">{value}</p>
        {trend && <p className={`text-xs font-medium mt-1 ${trendColor}`}>{trend}</p>}
      </div>
    </div>
  );
}
