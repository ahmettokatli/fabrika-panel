'use client';

import { productionRecords } from '@/data/production';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function ArizalarPage() {
  const arizalar = productionRecords
    .filter(r => r.not && r.durusSaat > 0)
    .sort((a, b) => b.tarih.localeCompare(a.tarih));

  const tumDuruslar = productionRecords.filter(r => r.durusSaat > 0);
  const toplamDurus = tumDuruslar.reduce((s, r) => s + r.durusSaat, 0);

  // Hat bazlı toplam duruş
  const hatDurus = Array.from({ length: 10 }, (_, i) => {
    const hat = `Hat ${i + 1}`;
    const toplam = productionRecords.filter(r => r.makine === hat).reduce((s, r) => s + r.durusSaat, 0);
    return { hat, durusSaat: toplam };
  }).filter(h => h.durusSaat > 0);

  // Gün bazlı duruş
  const gunDurus = ['2026-04-21', '2026-04-22', '2026-04-23'].map(g => ({
    gun: g.slice(5),
    durusSaat: productionRecords.filter(r => r.tarih === g).reduce((s, r) => s + r.durusSaat, 0),
  }));

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Arıza & Duruş Takibi</h2>
        <p className="text-gray-400 text-sm">Hat bazlı arıza ve duruş kayıtları</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-red-600">
          <p className="text-gray-400 text-xs mb-1">Toplam Duruş (3 Gün)</p>
          <p className="text-white text-2xl font-bold">{toplamDurus}</p>
          <p className="text-gray-500 text-xs">saat</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-yellow-600">
          <p className="text-gray-400 text-xs mb-1">Arızalı Olay</p>
          <p className="text-white text-2xl font-bold">{arizalar.length}</p>
          <p className="text-gray-500 text-xs">kayıt</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-orange-600">
          <p className="text-gray-400 text-xs mb-1">Etkilenen Hat</p>
          <p className="text-white text-2xl font-bold">{new Set(arizalar.map(a => a.makine)).size}</p>
          <p className="text-gray-500 text-xs">hat</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Hat Bazlı Toplam Duruş (Saat)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={hatDurus}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="hat" stroke="#9CA3AF" fontSize={11} />
              <YAxis stroke="#9CA3AF" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#fff' }} formatter={(v) => `${v} saat`} />
              <Bar dataKey="durusSaat" fill="#EF4444" radius={[4, 4, 0, 0]} name="Duruş (saat)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Günlük Toplam Duruş (Saat)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={gunDurus}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="gun" stroke="#9CA3AF" fontSize={11} />
              <YAxis stroke="#9CA3AF" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#fff' }} formatter={(v) => `${v} saat`} />
              <Bar dataKey="durusSaat" fill="#F59E0B" radius={[4, 4, 0, 0]} name="Duruş (saat)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl overflow-x-auto">
        <div className="px-6 py-4 border-b border-gray-700">
          <h3 className="text-white font-semibold">Arıza & Duruş Kayıtları</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left text-gray-400 font-medium px-4 py-3">Tarih</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Makine</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Ürün</th>
              <th className="text-right text-gray-400 font-medium px-4 py-3">Duruş (Saat)</th>
              <th className="text-right text-gray-400 font-medium px-4 py-3">Üretim Kaybı</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Açıklama</th>
            </tr>
          </thead>
          <tbody>
            {arizalar.map((r, i) => {
              const kayip = r.kapasite > 0 ? Math.round((r.kapasite - r.uretim)) : 0;
              return (
                <tr key={i} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3 text-gray-300 text-xs">{r.tarih}</td>
                  <td className="px-4 py-3">
                    <p className="text-white font-medium text-sm">{r.makine}</p>
                    <p className="text-gray-500 text-xs">{r.makineModel}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{r.urunAdi.slice(0, 35)}...</td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-red-400 font-bold">{r.durusSaat}</span>
                    <span className="text-gray-500 text-xs"> saat</span>
                  </td>
                  <td className="px-4 py-3 text-right text-orange-400 font-medium">{kayip > 0 ? kayip.toLocaleString() : '—'} adet</td>
                  <td className="px-4 py-3">
                    <span className="bg-red-900/40 text-red-300 text-xs px-2 py-1 rounded">{r.not}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
