export interface RawMaterialEntry {
  id: number;
  lotNo: string;
  hammaddeAdi: string;
  tedarikci: string;
  girisTarihi: string;
  miktar: number; // kg
  birimFiyat: number; // TL/kg
  aciklama: string;
}

export interface RawMaterialStock {
  hammaddeAdi: string;
  tedarikci: string;
  mevcutStok: number; // kg
  minStok: number; // kg - kritik eşik
  birimFiyat: number;
}

export const rawMaterialEntries: RawMaterialEntry[] = [
  { id: 1, lotNo: 'APS-64800-01', hammaddeAdi: 'PET Granül - Şeffaf', tedarikci: 'ATEA Packaging Ltd', girisTarihi: '2026-04-10', miktar: 12000, birimFiyat: 42.5, aciklama: 'FIBC çuval, 10 adet' },
  { id: 2, lotNo: 'APS-64800-02', hammaddeAdi: 'PET Granül - Mavi', tedarikci: 'ATEA Packaging Ltd', girisTarihi: '2026-04-10', miktar: 6000, birimFiyat: 44.0, aciklama: 'FIBC çuval, 5 adet' },
  { id: 3, lotNo: 'APS-64800-03', hammaddeAdi: 'Masterbatch - Mavi', tedarikci: 'Polisan Kimya', girisTarihi: '2026-04-12', miktar: 500, birimFiyat: 120.0, aciklama: 'Renk masterbatch' },
  { id: 4, lotNo: 'APS-64800-04', hammaddeAdi: 'Katkı Maddesi - UV Stabilizatör', tedarikci: 'Polisan Kimya', girisTarihi: '2026-04-12', miktar: 200, birimFiyat: 185.0, aciklama: '' },
  { id: 5, lotNo: 'APS-64801-01', hammaddeAdi: 'PET Granül - Şeffaf', tedarikci: 'ATEA Packaging Ltd', girisTarihi: '2026-04-15', miktar: 14400, birimFiyat: 42.5, aciklama: 'FIBC çuval, 12 adet' },
  { id: 6, lotNo: 'APS-64801-02', hammaddeAdi: 'PET Granül - Mavi', tedarikci: 'ATEA Packaging Ltd', girisTarihi: '2026-04-15', miktar: 4800, birimFiyat: 44.0, aciklama: 'FIBC çuval, 4 adet' },
  { id: 7, lotNo: 'APS-64801-03', hammaddeAdi: 'Masterbatch - Mavi', tedarikci: 'Polisan Kimya', girisTarihi: '2026-04-16', miktar: 300, birimFiyat: 120.0, aciklama: '' },
  { id: 8, lotNo: 'APS-64802-01', hammaddeAdi: 'PET Granül - Şeffaf', tedarikci: 'ATEA Packaging Ltd', girisTarihi: '2026-04-18', miktar: 12000, birimFiyat: 43.0, aciklama: 'FIBC çuval, 10 adet — fiyat güncellendi' },
  { id: 9, lotNo: 'APS-64802-02', hammaddeAdi: 'Katkı Maddesi - UV Stabilizatör', tedarikci: 'Polisan Kimya', girisTarihi: '2026-04-19', miktar: 150, birimFiyat: 185.0, aciklama: '' },
  { id: 10, lotNo: 'APS-64803-01', hammaddeAdi: 'PET Granül - Şeffaf', tedarikci: 'ATEA Packaging Ltd', girisTarihi: '2026-04-21', miktar: 16800, birimFiyat: 43.0, aciklama: 'FIBC çuval, 14 adet' },
  { id: 11, lotNo: 'APS-64803-02', hammaddeAdi: 'PET Granül - Mavi', tedarikci: 'ATEA Packaging Ltd', girisTarihi: '2026-04-21', miktar: 3600, birimFiyat: 44.5, aciklama: 'FIBC çuval, 3 adet' },
  { id: 12, lotNo: 'APS-64803-03', hammaddeAdi: 'Masterbatch - Mavi', tedarikci: 'Polisan Kimya', girisTarihi: '2026-04-22', miktar: 250, birimFiyat: 122.0, aciklama: '' },
];

export const rawMaterialStock: RawMaterialStock[] = [
  { hammaddeAdi: 'PET Granül - Şeffaf', tedarikci: 'ATEA Packaging Ltd', mevcutStok: 8240, minStok: 5000, birimFiyat: 43.0 },
  { hammaddeAdi: 'PET Granül - Mavi', tedarikci: 'ATEA Packaging Ltd', mevcutStok: 1850, minStok: 2000, birimFiyat: 44.5 },
  { hammaddeAdi: 'Masterbatch - Mavi', tedarikci: 'Polisan Kimya', mevcutStok: 320, minStok: 200, birimFiyat: 122.0 },
  { hammaddeAdi: 'Katkı Maddesi - UV Stabilizatör', tedarikci: 'Polisan Kimya', mevcutStok: 95, minStok: 100, birimFiyat: 185.0 },
];
