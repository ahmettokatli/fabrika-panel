'use client';

import { shipmentRecords } from '@/data/shipments';

const statusColors: Record<string, string> = {
  'teslim edildi': 'bg-green-900 text-green-300',
  'yolda': 'bg-blue-900 text-blue-300',
  'hazırlanıyor': 'bg-yellow-900 text-yellow-300',
};

export default function SevkiyatPage() {
  const totalAdet = shipmentRecords.reduce((s, r) => s + r.adet, 0);
  const totalPalet = shipmentRecords.reduce((s, r) => s + r.paletSayisi, 0);
  const teslimEdilen = shipmentRecords.filter(r => r.durum === 'teslim edildi').length;

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Sevkiyat</h2>
        <p className="text-gray-400 text-sm">İrsaliye bazlı sevkiyat takibi</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-blue-600">
          <p className="text-gray-400 text-xs mb-1">Toplam Sevkiyat</p>
          <p className="text-white text-2xl font-bold">{shipmentRecords.length}</p>
          <p className="text-gray-500 text-xs">irsaliye</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-green-600">
          <p className="text-gray-400 text-xs mb-1">Toplam Adet</p>
          <p className="text-white text-2xl font-bold">{totalAdet.toLocaleString()}</p>
          <p className="text-gray-500 text-xs">adet</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-purple-600">
          <p className="text-gray-400 text-xs mb-1">Toplam Palet</p>
          <p className="text-white text-2xl font-bold">{totalPalet}</p>
          <p className="text-gray-500 text-xs">palet</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-green-600">
          <p className="text-gray-400 text-xs mb-1">Teslim Edildi</p>
          <p className="text-white text-2xl font-bold">{teslimEdilen}/{shipmentRecords.length}</p>
          <p className="text-gray-500 text-xs">irsaliye</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left text-gray-400 font-medium px-4 py-3">İrsaliye No</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Tarih</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Firma</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Ürün</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Parti No</th>
              <th className="text-right text-gray-400 font-medium px-4 py-3">Adet</th>
              <th className="text-right text-gray-400 font-medium px-4 py-3">Palet</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Nakliyeci</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Plaka</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Durum</th>
            </tr>
          </thead>
          <tbody>
            {[...shipmentRecords].reverse().map((s, i) => (
              <tr key={i} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                <td className="px-4 py-3 text-blue-400 text-xs font-mono">{s.irsaliyeNo}</td>
                <td className="px-4 py-3 text-gray-300 text-xs">{s.sevkTarihi}</td>
                <td className="px-4 py-3 text-white text-xs font-medium">{s.firmaAdi}</td>
                <td className="px-4 py-3">
                  <p className="text-gray-300 text-xs font-mono">{s.urunKodu}</p>
                  <p className="text-gray-500 text-xs">{s.urunAdi.slice(0, 30)}...</p>
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs font-mono">{s.partiNo}</td>
                <td className="px-4 py-3 text-right text-white font-medium">{s.adet.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-gray-300">{s.paletSayisi}</td>
                <td className="px-4 py-3 text-gray-400 text-xs">{s.nakliyeci}</td>
                <td className="px-4 py-3 text-gray-400 text-xs font-mono">{s.plaka}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${statusColors[s.durum]}`}>{s.durum}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
