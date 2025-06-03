'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { DISH_SALES } from './constants';

export default function SalesByDishChart() {
  return (
    <div className="bg-[#F4F6F8] rounded-xl p-6 w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={DISH_SALES}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="qty" fill="#9BB968" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}