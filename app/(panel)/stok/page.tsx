'use client';

import { stockRecords } from '@/data/stock';
import { products } from '@/data/products';

// Son stok durumu her ürün için
function getLatestStock() {
  const latest: Record<string, typeof stockRecords[0]> = {};
  for (const r of stockRecords) {
    if (!latest[r.urunKodu] || r.tarih > latest[r.urunKodu].tarih) {
      latest[r.urunKodu] = r;
    }
  }
  return Object.values(latest);
}

export default function StokPage() {
  const latestStocks = getLatestStock();
  const allCodes = products.map(p => p.code);

  // Ürün koduna göre son stok, yoksa sıfır
  const stokList = allCodes.map(code => {
    const found = latestStocks.find(s => s.urunKodu === code);
    const product = products.find(p => p.code === code)!;
    return found ?? {
      tarih: '—',
      urunKodu: code,
      urunAdi: product.name,
      acilisStok: 0,
      uretim: 0,
      sevk: 0,
      kalanStok: 0,
    };
  });

  // Hareket geçmişi
  const hareketler = [...stockRecords].sort((a, b) => b.tarih.localeCompare(a.tarih));

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Ürün Stoku</h2>
        <p className="text-gray-400 text-sm">Güncel stok seviyeleri ve hareket geçmişi</p>
      </div>

      {/* Güncel Stok */}
      <div className="bg-gray-800 rounded-xl overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-700">
          <h3 className="text-white font-semibold">Güncel Stok Seviyeleri</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left text-gray-400 font-medium px-4 py-3">Ürün Kodu</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Ürün Adı</th>
              <th className="text-right text-gray-400 font-medium px-4 py-3">Açılış Stok</th>
              <th className="text-right text-gray-400 font-medium px-4 py-3">Üretim</th>
              <th className="text-right text-gray-400 font-medium px-4 py-3">Sevkiyat</th>
              <th className="text-right text-gray-400 font-medium px-4 py-3">Kalan Stok</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Son Güncelleme</th>
            </tr>
          </thead>
          <tbody>
            {stokList.map((s, i) => (
              <tr key={i} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                <td className="px-4 py-3 text-blue-400 text-xs font-mono">{s.urunKodu}</td>
                <td className="px-4 py-3 text-white text-xs">{s.urunAdi.slice(0, 45)}{s.urunAdi.length > 45 ? '...' : ''}</td>
                <td className="px-4 py-3 text-right text-gray-300">{s.acilisStok.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-green-400">{s.uretim > 0 ? `+${s.uretim.toLocaleString()}` : '—'}</td>
                <td className="px-4 py-3 text-right text-red-400">{s.sevk > 0 ? `-${s.sevk.toLocaleString()}` : '—'}</td>
                <td className="px-4 py-3 text-right text-white font-bold text-base">{s.kalanStok.toLocaleString()}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{s.tarih}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Hareket Geçmişi */}
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700">
          <h3 className="text-white font-semibold">Stok Hareket Geçmişi</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left text-gray-400 font-medium px-4 py-3">Tarih</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Ürün</th>
              <th className="text-right text-gray-400 font-medium px-4 py-3">Açılış</th>
              <th className="text-right text-gray-400 font-medium px-4 py-3">Üretim</th>
              <th className="text-right text-gray-400 font-medium px-4 py-3">Sevk</th>
              <th className="text-right text-gray-400 font-medium px-4 py-3">Kapanış</th>
            </tr>
          </thead>
          <tbody>
            {hareketler.map((h, i) => (
              <tr key={i} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                <td className="px-4 py-3 text-gray-300 text-xs">{h.tarih}</td>
                <td className="px-4 py-3">
                  <p className="text-white text-xs font-mono">{h.urunKodu}</p>
                  <p className="text-gray-500 text-xs">{h.urunAdi.slice(0, 40)}...</p>
                </td>
                <td className="px-4 py-3 text-right text-gray-300">{h.acilisStok.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-green-400">{h.uretim > 0 ? `+${h.uretim.toLocaleString()}` : '—'}</td>
                <td className="px-4 py-3 text-right text-red-400">{h.sevk > 0 ? `-${h.sevk.toLocaleString()}` : '—'}</td>
                <td className="px-4 py-3 text-right text-white font-medium">{h.kalanStok.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
