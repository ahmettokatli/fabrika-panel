'use client';

import { useState } from 'react';
import { workOrders, WorkOrder } from '@/data/workOrders';
import { products } from '@/data/products';
import { rawMaterialStock } from '@/data/rawMaterials';
import { companies } from '@/data/companies';

const HATLAR = [
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

const statusColors: Record<string, string> = {
  'beklemede': 'bg-yellow-900 text-yellow-300',
  'üretimde': 'bg-blue-900 text-blue-300',
  'tamamlandı': 'bg-green-900 text-green-300',
  'iptal': 'bg-red-900 text-red-300',
};

const oncelikColors: Record<string, string> = {
  'yüksek': 'bg-red-900 text-red-300',
  'normal': 'bg-gray-700 text-gray-300',
  'düşük': 'bg-gray-800 text-gray-400',
};

// Kapasite hesabı (adet/saat)
function hesaplaKapasite(urunKodu: string, hatModel: string): number {
  const urun = products.find(p => p.code === urunKodu);
  if (!urun) return 0;
  const faktor = hatModel === 'PF-8' ? 1.0 : hatModel === 'DPH-70' ? 0.95 : 0.90;
  return Math.round((3600 / urun.cycle) * urun.goz * faktor);
}

interface YeniIsEmri {
  firma: string;
  urunKodu: string;
  adet: string;
  oncelik: 'yüksek' | 'normal' | 'düşük';
  teslimTarihi: string;
  hat: string;
}

const EMPTY_FORM: YeniIsEmri = {
  firma: '',
  urunKodu: '',
  adet: '',
  oncelik: 'normal',
  teslimTarihi: '',
  hat: '',
};

export default function IsEmirleriPage() {
  const [orders] = useState<WorkOrder[]>(workOrders);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<YeniIsEmri>(EMPTY_FORM);
  const [selected, setSelected] = useState<WorkOrder | null>(null);

  // Form hesaplamaları
  const selectedUrun = products.find(p => p.code === form.urunKodu);
  const selectedHat = HATLAR.find(h => h.id === form.hat);
  const adet = parseInt(form.adet) || 0;
  const kapasite = selectedUrun && selectedHat ? hesaplaKapasite(form.urunKodu, selectedHat.model) : 0;
  const tahminiSaat = kapasite > 0 ? Math.ceil(adet / kapasite) : 0;
  const tahminiGun = Math.ceil(tahminiSaat / 24);
  const gerekliHammadde = selectedUrun ? Math.round(adet * selectedUrun.gramaj / 1000) : 0;
  const mevcutStok = rawMaterialStock.find(s =>
    (form.urunKodu.includes('0411') || form.urunKodu.includes('0101')) ? s.hammaddeAdi.includes('Mavi') : s.hammaddeAdi.includes('Şeffaf')
  )?.mevcutStok ?? 8240;
  const hammaddeYeterli = gerekliHammadde <= mevcutStok;
  const tahminiPalet = selectedUrun ? Math.ceil(adet / (selectedUrun.goz * 140)) : 0;

  // Özet
  const aktif = orders.filter(o => o.durum === 'üretimde').length;
  const bekleyen = orders.filter(o => o.durum === 'beklemede').length;
  const tamamlanan = orders.filter(o => o.durum === 'tamamlandı').length;
  const geciken = orders.filter(o => o.durum !== 'tamamlandı' && o.durum !== 'iptal' && o.teslimTarihi < '2026-04-27').length;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">İş Emirleri</h2>
          <p className="text-gray-400 text-sm">Sipariş bazlı üretim planlama ve takip</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setSelected(null); }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors"
        >
          + Yeni İş Emri
        </button>
      </div>

      {/* Özet kartlar */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-blue-600">
          <p className="text-gray-400 text-xs mb-1">Üretimde</p>
          <p className="text-white text-2xl font-bold">{aktif}</p>
          <p className="text-gray-500 text-xs">aktif iş emri</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-yellow-600">
          <p className="text-gray-400 text-xs mb-1">Beklemede</p>
          <p className="text-white text-2xl font-bold">{bekleyen}</p>
          <p className="text-gray-500 text-xs">planlanmış</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-green-600">
          <p className="text-gray-400 text-xs mb-1">Tamamlanan</p>
          <p className="text-white text-2xl font-bold">{tamamlanan}</p>
          <p className="text-gray-500 text-xs">iş emri</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-red-600">
          <p className="text-gray-400 text-xs mb-1">Geciken</p>
          <p className="text-white text-2xl font-bold">{geciken}</p>
          <p className="text-gray-500 text-xs">teslim tarihi geçmiş</p>
        </div>
      </div>

      <div className={`grid gap-6 ${selected || showForm ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {/* İş Emri Listesi */}
        <div>
          <div className="space-y-3">
            {orders.map((o) => {
              const gecikti = o.durum !== 'tamamlandı' && o.durum !== 'iptal' && o.teslimTarihi < '2026-04-27';
              return (
                <div
                  key={o.id}
                  onClick={() => { setSelected(o); setShowForm(false); }}
                  className={`bg-gray-800 rounded-xl p-5 cursor-pointer transition-all border-2 hover:border-blue-500 ${selected?.id === o.id ? 'border-blue-500' : 'border-transparent'}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-blue-400 font-mono text-xs">{o.id}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[o.durum]}`}>{o.durum}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${oncelikColors[o.oncelik]}`}>{o.oncelik}</span>
                        {gecikti && <span className="text-xs px-2 py-0.5 rounded-full bg-red-900 text-red-300">⚠️ GECİKTİ</span>}
                      </div>
                      <p className="text-white font-medium text-sm">{o.siparisFirma}</p>
                      <p className="text-gray-400 text-xs">{o.urunAdi.slice(0, 50)}...</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{o.siparisAdedi.toLocaleString()}</p>
                      <p className="text-gray-500 text-xs">adet sipariş</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  {o.durum !== 'beklemede' && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">İlerleme</span>
                        <span className={o.tamamlanmaYuzdesi === 100 ? 'text-green-400' : 'text-blue-400'}>
                          %{o.tamamlanmaYuzdesi} — {o.uretilenAdet.toLocaleString()} / {o.siparisAdedi.toLocaleString()} adet
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${o.tamamlanmaYuzdesi === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                          style={{ width: `${o.tamamlanmaYuzdesi}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>📍 {o.atananHat} ({o.atananHatModel})</span>
                    <span>🗓️ Teslim: {o.teslimTarihi}</span>
                    <span>📦 {o.tahminiPalet} palet</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detay Paneli */}
        {selected && !showForm && (
          <div className="bg-gray-800 rounded-xl p-6 h-fit sticky top-8">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold">{selected.id}</h3>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white text-xl">×</button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-xs mb-1">Firma</p>
                <p className="text-white font-medium">{selected.siparisFirma}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Ürün</p>
                <p className="text-blue-400 font-mono text-xs">{selected.urunKodu}</p>
                <p className="text-white text-sm">{selected.urunAdi}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-900 rounded-lg p-3">
                  <p className="text-gray-500 text-xs mb-1">Sipariş Adedi</p>
                  <p className="text-white font-bold">{selected.siparisAdedi.toLocaleString()}</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-3">
                  <p className="text-gray-500 text-xs mb-1">Kalan Adet</p>
                  <p className={`font-bold ${selected.kalanAdet === 0 ? 'text-green-400' : 'text-yellow-400'}`}>{selected.kalanAdet.toLocaleString()}</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-3">
                  <p className="text-gray-500 text-xs mb-1">Tahmini Süre</p>
                  <p className="text-white font-bold">{selected.tahminiGun} gün</p>
                  <p className="text-gray-600 text-xs">{selected.tahminiSure} saat</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-3">
                  <p className="text-gray-500 text-xs mb-1">Tahmini Palet</p>
                  <p className="text-white font-bold">{selected.tahminiPalet}</p>
                  <p className="text-gray-600 text-xs">{selected.paletBasiAdet} adet/palet</p>
                </div>
              </div>

              <div className={`rounded-lg p-3 ${selected.hammaddeYeterli ? 'bg-green-900/30 border border-green-800' : 'bg-red-900/30 border border-red-800'}`}>
                <p className="text-gray-400 text-xs mb-1">Hammadde Durumu</p>
                <p className={`font-bold ${selected.hammaddeYeterli ? 'text-green-400' : 'text-red-400'}`}>
                  {selected.hammaddeYeterli ? '✓ Yeterli' : '✗ Yetersiz — Sipariş Gerekli'}
                </p>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-gray-500">Gerekli: {selected.gerekliBammaddeKg.toLocaleString()} kg</span>
                  <span className="text-gray-500">Mevcut: {selected.mevcutHammaddeKg.toLocaleString()} kg</span>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-3">
                <p className="text-gray-500 text-xs mb-2">Gerçekleşen Tüketim</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Üretilen:</span>
                  <span className="text-white font-medium">{selected.uretilenAdet.toLocaleString()} adet</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Tüketilen:</span>
                  <span className="text-white font-medium">{selected.gerceklesenHammaddeKg.toLocaleString()} kg</span>
                </div>
              </div>

              <div className="flex gap-2 text-xs">
                <div className="flex-1 bg-gray-900 rounded-lg p-2 text-center">
                  <p className="text-gray-500">Hat</p>
                  <p className="text-white font-medium">{selected.atananHat}</p>
                </div>
                <div className="flex-1 bg-gray-900 rounded-lg p-2 text-center">
                  <p className="text-gray-500">Açılış</p>
                  <p className="text-white font-medium">{selected.acilisTarihi}</p>
                </div>
                <div className="flex-1 bg-gray-900 rounded-lg p-2 text-center">
                  <p className="text-gray-500">Teslim</p>
                  <p className="text-white font-medium">{selected.teslimTarihi}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Yeni İş Emri Formu */}
        {showForm && (
          <div className="bg-gray-800 rounded-xl p-6 h-fit sticky top-8">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold">Yeni İş Emri</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white text-xl">×</button>
            </div>

            <div className="space-y-4">
              {/* Firma */}
              <div>
                <label className="block text-gray-400 text-xs mb-1">Müşteri Firma</label>
                <select
                  value={form.firma}
                  onChange={e => setForm({ ...form, firma: e.target.value })}
                  className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seçiniz...</option>
                  {companies.map(c => <option key={c.id} value={c.ad}>{c.ad}</option>)}
                </select>
              </div>

              {/* Ürün */}
              <div>
                <label className="block text-gray-400 text-xs mb-1">Ürün</label>
                <select
                  value={form.urunKodu}
                  onChange={e => setForm({ ...form, urunKodu: e.target.value })}
                  className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seçiniz...</option>
                  {products.map(p => <option key={p.code} value={p.code}>{p.code} — {p.name.slice(0, 40)}</option>)}
                </select>
              </div>

              {/* Adet */}
              <div>
                <label className="block text-gray-400 text-xs mb-1">Sipariş Adedi</label>
                <input
                  type="number"
                  value={form.adet}
                  onChange={e => setForm({ ...form, adet: e.target.value })}
                  placeholder="örn: 300000"
                  className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Hat */}
              <div>
                <label className="block text-gray-400 text-xs mb-1">Atanacak Hat</label>
                <select
                  value={form.hat}
                  onChange={e => setForm({ ...form, hat: e.target.value })}
                  className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seçiniz...</option>
                  {HATLAR.map(h => <option key={h.id} value={h.id}>{h.id} ({h.model})</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Öncelik */}
                <div>
                  <label className="block text-gray-400 text-xs mb-1">Öncelik</label>
                  <select
                    value={form.oncelik}
                    onChange={e => setForm({ ...form, oncelik: e.target.value as 'yüksek' | 'normal' | 'düşük' })}
                    className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="yüksek">Yüksek</option>
                    <option value="normal">Normal</option>
                    <option value="düşük">Düşük</option>
                  </select>
                </div>

                {/* Teslim tarihi */}
                <div>
                  <label className="block text-gray-400 text-xs mb-1">Teslim Tarihi</label>
                  <input
                    type="date"
                    value={form.teslimTarihi}
                    onChange={e => setForm({ ...form, teslimTarihi: e.target.value })}
                    className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Otomatik Hesaplama */}
              {adet > 0 && selectedUrun && selectedHat && (
                <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
                  <p className="text-blue-400 text-xs font-semibold mb-3">⚡ Otomatik Hesaplama</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-gray-800 rounded-lg p-2">
                      <p className="text-gray-500 mb-0.5">Tahmini Süre</p>
                      <p className="text-white font-bold">{tahminiGun} gün</p>
                      <p className="text-gray-600">{tahminiSaat} saat</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-2">
                      <p className="text-gray-500 mb-0.5">Tahmini Palet</p>
                      <p className="text-white font-bold">~{tahminiPalet} palet</p>
                    </div>
                    <div className={`rounded-lg p-2 col-span-2 ${hammaddeYeterli ? 'bg-green-900/30' : 'bg-red-900/30'}`}>
                      <p className="text-gray-500 mb-0.5">Hammadde</p>
                      <p className={`font-bold ${hammaddeYeterli ? 'text-green-400' : 'text-red-400'}`}>
                        {hammaddeYeterli ? '✓ Yeterli' : '✗ Yetersiz — Sipariş Ver!'}
                      </p>
                      <p className="text-gray-500 mt-0.5">Gerekli: {gerekliHammadde.toLocaleString()} kg | Mevcut: {mevcutStok.toLocaleString()} kg</p>
                    </div>
                  </div>
                </div>
              )}

              <button
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 text-white font-semibold rounded-lg py-2.5 text-sm transition-colors"
                disabled={!form.firma || !form.urunKodu || !form.adet || !form.hat}
                onClick={() => { setShowForm(false); setForm(EMPTY_FORM); }}
              >
                İş Emri Oluştur
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
