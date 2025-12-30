'use client';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Week 1', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Week 2', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Week 3', uv: 5000, pv: 9800, amt: 2290 },
  { name: 'Week 4', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Week 5', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Week 6', uv: 4390, pv: 3800, amt: 2500 },
  { name: 'Week 7', uv: 3490, pv: 4300, amt: 2100 },
];

export default function ContentPerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10, right: 30, left: 0, bottom: 0,
        }}
      >
        <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
            </linearGradient>
        </defs>
        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} hide />
        <Tooltip
            contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
                borderRadius: '0.5rem'
            }}
            labelStyle={{
                fontWeight: 'bold'
            }}
        />
        <Area type="monotone" dataKey="uv" stroke="hsl(var(--accent))" strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
