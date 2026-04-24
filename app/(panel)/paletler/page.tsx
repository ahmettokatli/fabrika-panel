'use client';

import { paletRecords } from '@/data/stock';

const statusColors: Record<string, string> = {
  'stokta': 'bg-green-900 text-green-300',
  'sevk edildi': 'bg-gray-700 text-gray-300',
  'beklemede': 'bg-yellow-900 text-yellow-300',
};

export default function PaletlerPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Palet Takibi</h2>
        <p className="text-gray-400 text-sm">Parti ve palet bazlı izlenebilirlik — Lot → Makine → Palet → Firma</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-green-600">
          <p className="text-gray-400 text-xs mb-1">Stokta</p>
          <p className="text-white text-2xl font-bold">{paletRecords.filter(p => p.durum === 'stokta').length}</p>
          <p className="text-gray-500 text-xs">palet</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-gray-500">
          <p className="text-gray-400 text-xs mb-1">Sevk Edildi</p>
          <p className="text-white text-2xl font-bold">{paletRecords.filter(p => p.durum === 'sevk edildi').length}</p>
          <p className="text-gray-500 text-xs">palet</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-yellow-600">
          <p className="text-gray-400 text-xs mb-1">Beklemede</p>
          <p className="text-white text-2xl font-bold">{paletRecords.filter(p => p.durum === 'beklemede').length}</p>
          <p className="text-gray-500 text-xs">palet</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left text-gray-400 font-medium px-4 py-3">Palet No</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Parti No</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Ürün</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Lot No (Hammadde)</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Makine</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Üretim Tarihi</th>
              <th className="text-right text-gray-400 font-medium px-4 py-3">Adet</th>
              <th className="text-right text-gray-400 font-medium px-4 py-3">Tava İçi</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Firma</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Durum</th>
            </tr>
          </thead>
          <tbody>
            {paletRecords.map((p, i) => (
              <tr key={i} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                <td className="px-4 py-3 text-blue-400 font-mono text-xs">{p.paletNo}</td>
                <td className="px-4 py-3 text-gray-300 font-mono text-xs">{p.partiNo}</td>
                <td className="px-4 py-3">
                  <p className="text-white text-xs font-mono">{p.urunKodu}</p>
                  <p className="text-gray-500 text-xs">{p.urunAdi.slice(0, 30)}...</p>
                </td>
                <td className="px-4 py-3 text-purple-400 font-mono text-xs">{p.lotNo || '—'}</td>
                <td className="px-4 py-3 text-gray-300 text-xs">{p.makine}</td>
                <td className="px-4 py-3 text-gray-300 text-xs">{p.uretimTarihi}</td>
                <td className="px-4 py-3 text-right text-white font-medium">{p.adetMiktari.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-gray-300">{p.tavaIciAdedi}</td>
                <td className="px-4 py-3 text-gray-400 text-xs">{p.firmaAdi || '—'}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${statusColors[p.durum]}`}>{p.durum}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
