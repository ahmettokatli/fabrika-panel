'use client';

import { rawMaterialEntries, rawMaterialStock } from '@/data/rawMaterials';

export default function HammaddePage() {
  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Hammadde Yönetimi</h2>
        <p className="text-gray-400 text-sm">Lot takibi, giriş kayıtları ve stok durumu</p>
      </div>

      {/* Stok Durumu */}
      <div className="mb-8">
        <h3 className="text-white font-semibold mb-4">Mevcut Stok</h3>
        <div className="grid grid-cols-2 gap-4">
          {rawMaterialStock.map((s, i) => {
            const pct = Math.min((s.mevcutStok / (s.minStok * 3)) * 100, 100);
            const kritik = s.mevcutStok <= s.minStok;
            return (
              <div key={i} className={`bg-gray-800 rounded-xl p-5 border ${kritik ? 'border-red-700' : 'border-gray-700'}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-white font-medium text-sm">{s.hammaddeAdi}</p>
                    <p className="text-gray-500 text-xs">{s.tedarikci}</p>
                  </div>
                  {kritik && <span className="text-xs bg-red-900 text-red-300 px-2 py-0.5 rounded-full">KRİTİK</span>}
                </div>
                <div className="flex items-end justify-between mb-2">
                  <div>
                    <p className="text-white text-2xl font-bold">{s.mevcutStok.toLocaleString()}</p>
                    <p className="text-gray-500 text-xs">kg mevcut</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">Min: {s.minStok.toLocaleString()} kg</p>
                    <p className="text-gray-400 text-sm">{s.birimFiyat.toFixed(2)} ₺/kg</p>
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${kritik ? 'bg-red-500' : pct > 60 ? 'bg-green-500' : 'bg-yellow-500'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Giriş Kayıtları */}
      <div>
        <h3 className="text-white font-semibold mb-4">Hammadde Giriş Kayıtları</h3>
        <div className="bg-gray-800 rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 font-medium px-4 py-3">Lot No</th>
                <th className="text-left text-gray-400 font-medium px-4 py-3">Hammadde</th>
                <th className="text-left text-gray-400 font-medium px-4 py-3">Tedarikçi</th>
                <th className="text-left text-gray-400 font-medium px-4 py-3">Giriş Tarihi</th>
                <th className="text-right text-gray-400 font-medium px-4 py-3">Miktar (kg)</th>
                <th className="text-right text-gray-400 font-medium px-4 py-3">Birim Fiyat</th>
                <th className="text-right text-gray-400 font-medium px-4 py-3">Toplam Tutar</th>
                <th className="text-left text-gray-400 font-medium px-4 py-3">Açıklama</th>
              </tr>
            </thead>
            <tbody>
              {[...rawMaterialEntries].reverse().map((e, i) => (
                <tr key={i} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3 text-blue-400 text-xs font-mono">{e.lotNo}</td>
                  <td className="px-4 py-3 text-white text-xs">{e.hammaddeAdi}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{e.tedarikci}</td>
                  <td className="px-4 py-3 text-gray-300 text-xs">{e.girisTarihi}</td>
                  <td className="px-4 py-3 text-right text-white font-medium">{e.miktar.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-gray-300">{e.birimFiyat.toFixed(2)} ₺</td>
                  <td className="px-4 py-3 text-right text-green-400 font-medium">{(e.miktar * e.birimFiyat).toLocaleString(undefined, { maximumFractionDigits: 0 })} ₺</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{e.aciklama || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
