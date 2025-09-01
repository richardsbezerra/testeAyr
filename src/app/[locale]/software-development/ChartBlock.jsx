// ./_ChartBlockLazyWrapper.jsx
import React, { memo, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const ChartBlockInner = ({ data, chartStyle, CellComponent = Cell, tooltipStyle }) => {
  const cells = useMemo(() => data.map((entry, idx) => ({ key: idx, fill: entry.color })), [data]);
  return (
    <div className="lg:col-span-3 bg-slate-800/50 border border-white/6 rounded-xl p-3 sm:p-5">
      <h3 className="text-base sm:text-lg font-semibold mb-3">(ROI)</h3>
      <div style={chartStyle} className="w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#8892b0" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#8892b0" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
            <Tooltip cursor={{ fill: 'rgba(136, 132, 216, 0.06)' }} contentStyle={tooltipStyle} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {cells.map(c => <CellComponent key={c.key} fill={c.fill} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default memo(ChartBlockInner);
