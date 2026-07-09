"use client";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
export function ProfitChart({ data }: { data: { month: string; profit: number }[] }) {
  if (!data.length) return <div className="grid h-64 place-items-center text-slate-500">Graficul va apărea după prima vânzare.</div>;
  return <div className="h-64 w-full"><ResponsiveContainer><BarChart data={data}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="month"/><YAxis width={45}/><Tooltip formatter={(v) => `${Number(v).toFixed(2)} RON`}/><Bar dataKey="profit" fill="#007782" radius={[7,7,0,0]}/></BarChart></ResponsiveContainer></div>;
}
