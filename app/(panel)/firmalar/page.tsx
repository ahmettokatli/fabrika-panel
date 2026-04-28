'use client';

import { companies } from '@/data/companies';
import { shipmentRecords } from '@/data/shipments';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function FirmalarPage() {
  // Firma bazlı sevkiyat dağılımı
  const firmaDagilim = companies.map((c, i) => ({
    name: c.ad.split(' ')[0],
    adet: c.toplamSevkiyat,
    tutar: c.toplamTutar,
    color: COLORS[i % COLORS.length],
  }));

  // Firma bazlı sevkiyat sayısı
  const firmaIrsaliye = companies.map(c => ({
    ...c,
    irsaliyeSayisi: shipmentRecords.filter(s => s.firmaAdi === c.ad).length,
    toplamAdet: shipmentRecords.filter(s => s.firmaAdi === c.ad).reduce((s, r) => s + r.adet, 0),
  }));

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Firma Analizi</h2>
        <p className="text-gray-400 text-sm">Müşteri bazlı sevkiyat ve ciro analizi</p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Sevkiyat Dağılımı (Adet)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={firmaDagilim} dataKey="adet" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} %${((percent ?? 0) * 100).toFixed(0)}`} labelLine={false}>
                {firmaDagilim.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#fff' }} formatter={(v) => `${v} adet`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Firma Bazlı Toplam Tutar (₺)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={firmaDagilim}>
              <XAxis dataKey="name" stroke="#9CA3AF" fontSize={11} />
              <YAxis stroke="#9CA3AF" fontSize={11} tickFormatter={v => (v / 1000000).toFixed(1) + 'M'} />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#fff' }} formatter={(v) => `${v} ₺`} />
              <Bar dataKey="tutar" radius={[4, 4, 0, 0]} name="Toplam Tutar">
                {firmaDagilim.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left text-gray-400 font-medium px-4 py-3">Firma</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Sektör</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Şehir</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Yetkili</th>
              <th className="text-right text-gray-400 font-medium px-4 py-3">İrsaliye</th>
              <th className="text-right text-gray-400 font-medium px-4 py-3">Toplam Adet</th>
              <th className="text-right text-gray-400 font-medium px-4 py-3">Toplam Tutar</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Son Sevkiyat</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Durum</th>
            </tr>
          </thead>
          <tbody>
            {firmaIrsaliye.map((f, i) => (
              <tr key={i} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                <td className="px-4 py-3 text-white font-medium text-sm">{f.ad}</td>
                <td className="px-4 py-3 text-gray-400 text-xs">{f.sektor}</td>
                <td className="px-4 py-3 text-gray-400 text-xs">{f.sehir}</td>
                <td className="px-4 py-3 text-gray-400 text-xs">{f.yetkili}</td>
                <td className="px-4 py-3 text-right text-white">{f.irsaliyeSayisi}</td>
                <td className="px-4 py-3 text-right text-white font-medium">{f.toplamSevkiyat.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-green-400 font-medium">{f.toplamTutar.toLocaleString()} ₺</td>
                <td className="px-4 py-3 text-gray-400 text-xs">{f.sonSevkiyat}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${f.aktif ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-400'}`}>
                    {f.aktif ? 'Aktif' : 'Pasif'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
