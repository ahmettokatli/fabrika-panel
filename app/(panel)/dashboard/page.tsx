'use client';

import { productionRecords } from '@/data/production';
import { rawMaterialStock } from '@/data/rawMaterials';
import { stockRecords } from '@/data/stock';
import { shipmentRecords } from '@/data/shipments';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';

const TODAY = '2026-04-23';

export default function DashboardPage() {
  const todayProduction = productionRecords.filter(r => r.tarih === TODAY);
  const totalUretim = todayProduction.reduce((s, r) => s + r.uretim, 0);
  const totalHammadde = todayProduction.reduce((s, r) => s + r.hammaddeKg, 0);
  const avgVerimlilik = todayProduction.filter(r => r.uretim > 0).reduce((s, r) => s + r.verimlilik, 0) / todayProduction.filter(r => r.uretim > 0).length;
  const totalDurus = todayProduction.reduce((s, r) => s + r.durusSaat, 0);

  const kritikStok = rawMaterialStock.filter(r => r.mevcutStok <= r.minStok);

  const todayShipments = shipmentRecords.filter(r => r.sevkTarihi === TODAY);
  const totalSevk = todayShipments.reduce((s, r) => s + r.adet, 0);

  // Günlük üretim trendi (son 3 gün)
  const gunler = ['2026-04-21', '2026-04-22', '2026-04-23'];
  const trendData = gunler.map(g => ({
    gun: g.slice(5),
    uretim: productionRecords.filter(r => r.tarih === g).reduce((s, r) => s + r.uretim, 0),
    hammadde: Math.round(productionRecords.filter(r => r.tarih === g).reduce((s, r) => s + r.hammaddeKg, 0)),
  }));

  // Hat bazlı bugünkü üretim
  const hatData = todayProduction.filter(r => r.uretim > 0).map(r => ({
    hat: r.makine,
    uretim: r.uretim,
    verimlilik: Math.round(r.verimlilik * 100),
  }));

  // Güncel stok özeti (son kayıt)
  const stokOzet = [
    { urun: 'DESTO ŞEFFAF', stok: 524000 },
    { urun: 'DESTO MAVİ', stok: 131240 },
    { urun: 'PARLATICI', stok: 112600 },
    { urun: 'YÜZEY 1.5LT', stok: 69600 },
    { urun: 'EXTRA 739ML', stok: 30968 },
  ];

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
        <p className="text-gray-400 text-sm">23 Nisan 2026 — Günlük Özet</p>
      </div>

      {/* KPI Kartları */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        <StatCard label="Toplam Üretim" value={totalUretim.toLocaleString()} unit="adet" color="blue" icon="⚙️" />
        <StatCard label="Hammadde Tüketim" value={Math.round(totalHammadde).toLocaleString()} unit="kg" color="purple" icon="📦" />
        <StatCard label="Ort. Verimlilik" value={(avgVerimlilik * 100).toFixed(1)} unit="%" color={avgVerimlilik >= 0.95 ? 'green' : 'yellow'} icon="📈" />
        <StatCard label="Toplam Duruş" value={totalDurus.toString()} unit="saat" color={totalDurus > 10 ? 'red' : 'green'} icon="⏸️" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        <StatCard label="Bugün Sevkiyat" value={totalSevk.toLocaleString()} unit="adet" color="blue" icon="🚚" />
        <StatCard label="Aktif Hat" value={todayProduction.filter(r => r.uretim > 0).length.toString()} unit="/ 10 hat" color="green" icon="🏭" />
        <StatCard label="Kritik Stok" value={kritikStok.length.toString()} unit="hammadde" color={kritikStok.length > 0 ? 'red' : 'green'} icon="⚠️" />
        <StatCard label="Toplam Sevkiyat" value="655.000" unit="adet (haftalık)" color="purple" icon="📊" />
      </div>

      {/* Grafikler */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Günlük Üretim Trendi</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="gun" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} tickFormatter={v => (v / 1000).toFixed(0) + 'K'} />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#fff' }} formatter={(v) => String(v)} />
              <Line type="monotone" dataKey="uretim" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6' }} name="Üretim (adet)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Hat Bazlı Verimlilik (%) — Bugün</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={hatData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="hat" stroke="#9CA3AF" fontSize={11} />
              <YAxis stroke="#9CA3AF" fontSize={12} domain={[80, 110]} />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#fff' }} formatter={(v) => `%${v}`} />
              <Bar dataKey="verimlilik" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Verimlilik %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Stok Durumu */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Ürün Stok Durumu</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={stokOzet} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" stroke="#9CA3AF" fontSize={11} tickFormatter={v => (v / 1000).toFixed(0) + 'K'} />
              <YAxis type="category" dataKey="urun" stroke="#9CA3AF" fontSize={11} width={80} />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#fff' }} formatter={(v) => `${v} adet`} />
              <Bar dataKey="stok" fill="#10B981" radius={[0, 4, 4, 0]} name="Stok (adet)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Kritik Uyarılar */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Uyarılar & Bildirimler</h3>
          <div className="space-y-3">
            {kritikStok.map((s, i) => (
              <div key={i} className="flex items-start gap-3 bg-red-900/30 border border-red-800 rounded-lg p-3">
                <span className="text-red-400 text-lg">⚠️</span>
                <div>
                  <p className="text-red-300 font-medium text-sm">{s.hammaddeAdi}</p>
                  <p className="text-red-400 text-xs">Stok: {s.mevcutStok.toLocaleString()} kg — Min: {s.minStok.toLocaleString()} kg</p>
                </div>
              </div>
            ))}
            {todayProduction.filter(r => r.not && r.durusSaat > 0).map((r, i) => (
              <div key={i} className="flex items-start gap-3 bg-yellow-900/30 border border-yellow-800 rounded-lg p-3">
                <span className="text-yellow-400 text-lg">🔧</span>
                <div>
                  <p className="text-yellow-300 font-medium text-sm">{r.makine} — {r.durusSaat} saat duruş</p>
                  <p className="text-yellow-400 text-xs">{r.not}</p>
                </div>
              </div>
            ))}
            <div className="flex items-start gap-3 bg-blue-900/30 border border-blue-800 rounded-lg p-3">
              <span className="text-blue-400 text-lg">🚚</span>
              <div>
                <p className="text-blue-300 font-medium text-sm">Bugün {todayShipments.length} sevkiyat planlandı</p>
                <p className="text-blue-400 text-xs">Toplam {totalSevk.toLocaleString()} adet</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, unit, color, icon }: { label: string; value: string; unit: string; color: string; icon: string }) {
  const colors: Record<string, string> = {
    blue: 'border-blue-600 bg-blue-900/20',
    green: 'border-green-600 bg-green-900/20',
    red: 'border-red-600 bg-red-900/20',
    yellow: 'border-yellow-600 bg-yellow-900/20',
    purple: 'border-purple-600 bg-purple-900/20',
  };
  return (
    <div className={`bg-gray-800 rounded-xl p-3 md:p-5 border-l-4 ${colors[color]}`}>
      <div className="flex items-center justify-between mb-1 md:mb-2">
        <p className="text-gray-400 text-xs font-medium leading-tight">{label}</p>
        <span className="text-base md:text-xl">{icon}</span>
      </div>
      <p className="text-white text-xl md:text-2xl font-bold truncate">{value}</p>
      <p className="text-gray-500 text-xs">{unit}</p>
    </div>
  );
}
