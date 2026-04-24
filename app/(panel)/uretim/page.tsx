'use client';

import { useState } from 'react';
import { productionRecords } from '@/data/production';

const DATES = ['2026-04-21', '2026-04-22', '2026-04-23'];

export default function UretimPage() {
  const [selectedDate, setSelectedDate] = useState('2026-04-23');

  const records = productionRecords.filter(r => r.tarih === selectedDate);
  const totalUretim = records.reduce((s, r) => s + r.uretim, 0);
  const totalKapasite = records.reduce((s, r) => s + r.kapasite, 0);
  const totalHammadde = records.reduce((s, r) => s + r.hammaddeKg, 0);
  const totalDurus = records.reduce((s, r) => s + r.durusSaat, 0);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Günlük Üretim</h2>
          <p className="text-gray-400 text-sm">Hat bazlı üretim takibi</p>
        </div>
        <div className="flex gap-2">
          {DATES.map(d => (
            <button
              key={d}
              onClick={() => setSelectedDate(d)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedDate === d ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
            >
              {d.slice(5).replace('-', '/')}
            </button>
          ))}
        </div>
      </div>

      {/* Özet */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-blue-600">
          <p className="text-gray-400 text-xs mb-1">Toplam Üretim</p>
          <p className="text-white text-xl font-bold">{totalUretim.toLocaleString()}</p>
          <p className="text-gray-500 text-xs">adet</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-purple-600">
          <p className="text-gray-400 text-xs mb-1">Toplam Kapasite</p>
          <p className="text-white text-xl font-bold">{Math.round(totalKapasite).toLocaleString()}</p>
          <p className="text-gray-500 text-xs">adet</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-green-600">
          <p className="text-gray-400 text-xs mb-1">Hammadde Tüketim</p>
          <p className="text-white text-xl font-bold">{Math.round(totalHammadde).toLocaleString()}</p>
          <p className="text-gray-500 text-xs">kg</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-red-600">
          <p className="text-gray-400 text-xs mb-1">Toplam Duruş</p>
          <p className="text-white text-xl font-bold">{totalDurus}</p>
          <p className="text-gray-500 text-xs">saat</p>
        </div>
      </div>

      {/* Tablo */}
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left text-gray-400 font-medium px-4 py-3">Makine</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Ürün</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Lot No</th>
              <th className="text-right text-gray-400 font-medium px-4 py-3">Saat</th>
              <th className="text-right text-gray-400 font-medium px-4 py-3">Duruş</th>
              <th className="text-right text-gray-400 font-medium px-4 py-3">Kapasite</th>
              <th className="text-right text-gray-400 font-medium px-4 py-3">Üretim</th>
              <th className="text-right text-gray-400 font-medium px-4 py-3">Verimlilik</th>
              <th className="text-right text-gray-400 font-medium px-4 py-3">Hammadde</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Not</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => {
              const verimPct = r.uretim > 0 ? r.verimlilik * 100 : 0;
              const verimColor = verimPct >= 100 ? 'text-green-400' : verimPct >= 95 ? 'text-yellow-400' : verimPct === 0 ? 'text-gray-600' : 'text-red-400';
              return (
                <tr key={i} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-white font-medium">{r.makine}</p>
                    <p className="text-gray-500 text-xs">{r.makineModel}</p>
                  </td>
                  <td className="px-4 py-3">
                    {r.urunKodu ? (
                      <>
                        <p className="text-white text-xs font-mono">{r.urunKodu}</p>
                        <p className="text-gray-400 text-xs">{r.urunAdi.slice(0, 35)}...</p>
                      </>
                    ) : (
                      <span className="text-gray-600 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs font-mono">{r.lotNo || '—'}</td>
                  <td className="px-4 py-3 text-right text-white">{r.saat || 0}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={r.durusSaat > 0 ? 'text-red-400 font-medium' : 'text-gray-500'}>{r.durusSaat}</span>
                  </td>
                  <td className="px-4 py-3 text-right text-gray-300">{r.kapasite > 0 ? Math.round(r.kapasite).toLocaleString() : '—'}</td>
                  <td className="px-4 py-3 text-right text-white font-medium">{r.uretim > 0 ? r.uretim.toLocaleString() : '—'}</td>
                  <td className={`px-4 py-3 text-right font-medium ${verimColor}`}>
                    {r.uretim > 0 ? `%${verimPct.toFixed(1)}` : '—'}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-300">{r.hammaddeKg > 0 ? r.hammaddeKg.toLocaleString() + ' kg' : '—'}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{r.not || ''}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
