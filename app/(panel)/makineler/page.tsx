'use client';

import { useState } from 'react';
import { productionRecords } from '@/data/production';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from 'recharts';

const MAKINELER = [
  { id: 'Hat 1', model: 'PF-8' },
  { id: 'Hat 2', model: 'PF-8' },
  { id: 'Hat 3', model: 'PF-8' },
  { id: 'Hat 4', model: 'DPH-70' },
  { id: 'Hat 5', model: 'DPH-70' },
  { id: 'Hat 6', model: 'DPH-70' },
  { id: 'Hat 7', model: 'MB-50' },
  { id: 'Hat 8', model: 'DPH-70' },
  { id: 'Hat 9', model: 'DPH-70' },
  { id: 'Hat 10', model: 'DPH-70' },
];

const DATES = ['2026-04-21', '2026-04-22', '2026-04-23'];
const TODAY = '2026-04-23';

export default function MakinelerPage() {
  const [selected, setSelected] = useState<string | null>(null);

  const selectedMakine = selected ? MAKINELER.find(m => m.id === selected) : null;

  // Seçili makine verisi
  const makineRecords = selected
    ? productionRecords.filter(r => r.makine === selected)
    : [];

  const trendData = DATES.map(g => {
    const r = makineRecords.find(r => r.tarih === g);
    return {
      gun: g.slice(5),
      verimlilik: r && r.uretim > 0 ? Math.round(r.verimlilik * 100) : 0,
      uretim: r?.uretim ?? 0,
      durusSaat: r?.durusSaat ?? 0,
    };
  });

  const toplamUretim = makineRecords.reduce((s, r) => s + r.uretim, 0);
  const toplamDurus = makineRecords.reduce((s, r) => s + r.durusSaat, 0);
  const toplamHammadde = makineRecords.reduce((s, r) => s + r.hammaddeKg, 0);
  const avgVerimlilik = makineRecords.filter(r => r.uretim > 0).length > 0
    ? makineRecords.filter(r => r.uretim > 0).reduce((s, r) => s + r.verimlilik, 0) / makineRecords.filter(r => r.uretim > 0).length
    : 0;

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Makine Performansı</h2>
        <p className="text-gray-400 text-sm">Hat bazlı performans ve verimlilik takibi</p>
      </div>

      {/* Makine Kartları */}
      <div className="grid grid-cols-5 gap-3 mb-8">
        {MAKINELER.map(m => {
          const todayRecord = productionRecords.find(r => r.makine === m.id && r.tarih === TODAY);
          const verim = todayRecord && todayRecord.uretim > 0 ? todayRecord.verimlilik * 100 : null;
          const duruyor = todayRecord && todayRecord.uretim === 0;
          const isSelected = selected === m.id;

          const borderColor = duruyor
            ? 'border-gray-600'
            : verim === null
            ? 'border-gray-600'
            : verim >= 100
            ? 'border-green-500'
            : verim >= 95
            ? 'border-yellow-500'
            : 'border-red-500';

          const statusDot = duruyor
            ? 'bg-gray-500'
            : verim === null
            ? 'bg-gray-500'
            : verim >= 100
            ? 'bg-green-500'
            : verim >= 95
            ? 'bg-yellow-500'
            : 'bg-red-500';

          return (
            <button
              key={m.id}
              onClick={() => setSelected(isSelected ? null : m.id)}
              className={`bg-gray-800 rounded-xl p-4 border-2 text-left transition-all hover:bg-gray-700 ${borderColor} ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-bold text-sm">{m.id}</span>
                <span className={`w-2.5 h-2.5 rounded-full ${statusDot}`} />
              </div>
              <p className="text-gray-500 text-xs mb-2">{m.model}</p>
              {duruyor ? (
                <p className="text-gray-500 text-xs">Duruyor</p>
              ) : verim !== null ? (
                <>
                  <p className={`text-lg font-bold ${verim >= 100 ? 'text-green-400' : verim >= 95 ? 'text-yellow-400' : 'text-red-400'}`}>
                    %{verim.toFixed(1)}
                  </p>
                  <p className="text-gray-500 text-xs">verimlilik</p>
                  {todayRecord && todayRecord.durusSaat > 0 && (
                    <p className="text-red-400 text-xs mt-1">{todayRecord.durusSaat}s duruş</p>
                  )}
                </>
              ) : (
                <p className="text-gray-600 text-xs">Veri yok</p>
              )}
            </button>
          );
        })}
      </div>

      {/* Detay */}
      {selectedMakine && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-xl font-bold text-white">{selectedMakine.id}</h3>
            <span className="text-gray-400 text-sm bg-gray-800 px-3 py-1 rounded-full">{selectedMakine.model}</span>
          </div>

          {/* KPI'lar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
            <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-blue-600">
              <p className="text-gray-400 text-xs mb-1">Toplam Üretim (3 gün)</p>
              <p className="text-white text-xl font-bold">{toplamUretim.toLocaleString()}</p>
              <p className="text-gray-500 text-xs">adet</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-purple-600">
              <p className="text-gray-400 text-xs mb-1">Ort. Verimlilik</p>
              <p className={`text-xl font-bold ${avgVerimlilik >= 1 ? 'text-green-400' : avgVerimlilik >= 0.95 ? 'text-yellow-400' : 'text-red-400'}`}>
                %{(avgVerimlilik * 100).toFixed(1)}
              </p>
              <p className="text-gray-500 text-xs">3 günlük ortalama</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-red-600">
              <p className="text-gray-400 text-xs mb-1">Toplam Duruş</p>
              <p className="text-white text-xl font-bold">{toplamDurus}</p>
              <p className="text-gray-500 text-xs">saat</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-green-600">
              <p className="text-gray-400 text-xs mb-1">Hammadde Tüketim</p>
              <p className="text-white text-xl font-bold">{Math.round(toplamHammadde).toLocaleString()}</p>
              <p className="text-gray-500 text-xs">kg (3 gün)</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Verimlilik Trendi */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h4 className="text-white font-semibold mb-4">Verimlilik Trendi (%)</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="gun" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} domain={[80, 110]} />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#fff' }} formatter={(v) => `%${v}`} />
                  <Line type="monotone" dataKey="verimlilik" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6', r: 5 }} name="Verimlilik %" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Üretim Trendi */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h4 className="text-white font-semibold mb-4">Günlük Üretim (Adet)</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="gun" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} tickFormatter={v => (v / 1000).toFixed(0) + 'K'} />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#fff' }} formatter={(v) => `${v} adet`} />
                  <Bar dataKey="uretim" fill="#10B981" radius={[4, 4, 0, 0]} name="Üretim" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Günlük Detay Tablosu */}
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700">
              <h4 className="text-white font-semibold">Günlük Detay</h4>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-gray-400 font-medium px-4 py-3">Tarih</th>
                  <th className="text-left text-gray-400 font-medium px-4 py-3">Ürün</th>
                  <th className="text-left text-gray-400 font-medium px-4 py-3">Lot No</th>
                  <th className="text-right text-gray-400 font-medium px-4 py-3">Cycle</th>
                  <th className="text-right text-gray-400 font-medium px-4 py-3">Çalışma</th>
                  <th className="text-right text-gray-400 font-medium px-4 py-3">Duruş</th>
                  <th className="text-right text-gray-400 font-medium px-4 py-3">Kapasite</th>
                  <th className="text-right text-gray-400 font-medium px-4 py-3">Üretim</th>
                  <th className="text-right text-gray-400 font-medium px-4 py-3">Verimlilik</th>
                  <th className="text-right text-gray-400 font-medium px-4 py-3">Hammadde</th>
                  <th className="text-left text-gray-400 font-medium px-4 py-3">Not</th>
                </tr>
              </thead>
              <tbody>
                {makineRecords.sort((a, b) => b.tarih.localeCompare(a.tarih)).map((r, i) => {
                  const verimPct = r.uretim > 0 ? r.verimlilik * 100 : 0;
                  const verimColor = verimPct >= 100 ? 'text-green-400' : verimPct >= 95 ? 'text-yellow-400' : verimPct === 0 ? 'text-gray-600' : 'text-red-400';
                  return (
                    <tr key={i} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                      <td className="px-4 py-3 text-gray-300 text-xs">{r.tarih}</td>
                      <td className="px-4 py-3">
                        {r.urunKodu ? (
                          <>
                            <p className="text-white text-xs font-mono">{r.urunKodu}</p>
                            <p className="text-gray-500 text-xs">{r.urunAdi.slice(0, 30)}...</p>
                          </>
                        ) : <span className="text-gray-600 text-xs">—</span>}
                      </td>
                      <td className="px-4 py-3 text-purple-400 text-xs font-mono">{r.lotNo || '—'}</td>
                      <td className="px-4 py-3 text-right text-gray-300 text-xs">{r.mevcutCycle > 0 ? r.mevcutCycle : '—'}</td>
                      <td className="px-4 py-3 text-right text-white">{r.saat - r.durusSaat}s</td>
                      <td className="px-4 py-3 text-right">
                        <span className={r.durusSaat > 0 ? 'text-red-400 font-medium' : 'text-gray-500'}>{r.durusSaat}s</span>
                      </td>
                      <td className="px-4 py-3 text-right text-gray-300">{r.kapasite > 0 ? Math.round(r.kapasite).toLocaleString() : '—'}</td>
                      <td className="px-4 py-3 text-right text-white font-medium">{r.uretim > 0 ? r.uretim.toLocaleString() : '—'}</td>
                      <td className={`px-4 py-3 text-right font-medium ${verimColor}`}>
                        {r.uretim > 0 ? `%${verimPct.toFixed(1)}` : '—'}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-300 text-xs">{r.hammaddeKg > 0 ? r.hammaddeKg.toLocaleString() + ' kg' : '—'}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs">{r.not || ''}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!selected && (
        <div className="text-center py-16 text-gray-600">
          <p className="text-4xl mb-3">⚙️</p>
          <p>Detayları görmek için bir makineye tıkla</p>
        </div>
      )}
    </div>
  );
}
