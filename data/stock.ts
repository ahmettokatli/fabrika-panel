export interface StockRecord {
  tarih: string;
  urunKodu: string;
  urunAdi: string;
  acilisStok: number;
  uretim: number;
  sevk: number;
  kalanStok: number;
}

export interface PaletRecord {
  paletNo: string;
  partiNo: string;
  urunKodu: string;
  urunAdi: string;
  uretimTarihi: string;
  adetMiktari: number;
  tavaIciAdedi: number;
  lotNo: string;
  makine: string;
  durum: 'stokta' | 'sevk edildi' | 'beklemede';
  firmaAdi?: string;
}

export const stockRecords: StockRecord[] = [
  { tarih: '2026-04-21', urunKodu: 'MM00.0412', urunAdi: '750 ML DESTO SIVI BULAŞIK DETERJANI - ŞEFFAF', acilisStok: 450000, uretim: 43200, sevk: 0, kalanStok: 493200 },
  { tarih: '2026-04-21', urunKodu: 'MM00.0411', urunAdi: '750 ML DESTO SIVI BULAŞIK DETERJANI - MAVİ', acilisStok: 180000, uretim: 41040, sevk: 50000, kalanStok: 171040 },
  { tarih: '2026-04-21', urunKodu: 'MM02.0101', urunAdi: '450 ML PARLATICI - PET - MAVİ', acilisStok: 95000, uretim: 38400, sevk: 0, kalanStok: 133400 },
  { tarih: '2026-04-21', urunKodu: 'MM00.1120', urunAdi: '1,5 LT YÜZEY TEMİZLEYİCİ - AKS', acilisStok: 62000, uretim: 17500, sevk: 30000, kalanStok: 49500 },
  { tarih: '2026-04-21', urunKodu: 'MM02.0811', urunAdi: '2,5 LT YÜZEY TEMİZLEYİCİ DOA', acilisStok: 28000, uretim: 10044, sevk: 0, kalanStok: 38044 },
  { tarih: '2026-04-21', urunKodu: 'MM00.0136', urunAdi: '1 LT ELBOW YÜZEY-RTU', acilisStok: 74000, uretim: 17856, sevk: 20000, kalanStok: 71856 },
  { tarih: '2026-04-21', urunKodu: 'MM02.0021', urunAdi: '1 LT SIVI BULAŞIK SÜNGERLİ', acilisStok: 110000, uretim: 23100, sevk: 45000, kalanStok: 88100 },
  { tarih: '2026-04-21', urunKodu: 'MM00.0634', urunAdi: '1,5 LT BULUT KONS.YUM.PET', acilisStok: 55000, uretim: 22876, sevk: 0, kalanStok: 77876 },
  { tarih: '2026-04-21', urunKodu: 'MM02.0212', urunAdi: '1000 ML DOA ŞEFFAF YÜZEY TEM.', acilisStok: 38000, uretim: 31680, sevk: 15000, kalanStok: 54680 },
  { tarih: '2026-04-21', urunKodu: 'MM02.0300', urunAdi: '739 ML EXTRA SIVI BULAŞIK', acilisStok: 0, uretim: 0, sevk: 0, kalanStok: 0 },

  { tarih: '2026-04-22', urunKodu: 'MM00.0412', urunAdi: '750 ML DESTO SIVI BULAŞIK DETERJANI - ŞEFFAF', acilisStok: 493200, uretim: 42800, sevk: 55000, kalanStok: 481000 },
  { tarih: '2026-04-22', urunKodu: 'MM02.0300', urunAdi: '739 ML EXTRA SIVI BULAŞIK ŞİŞE', acilisStok: 0, uretim: 30968, sevk: 0, kalanStok: 30968 },
  { tarih: '2026-04-22', urunKodu: 'MM02.0101', urunAdi: '450 ML PARLATICI - PET - MAVİ', acilisStok: 133400, uretim: 39200, sevk: 60000, kalanStok: 112600 },
  { tarih: '2026-04-22', urunKodu: 'MM00.1120', urunAdi: '1,5 LT YÜZEY TEMİZLEYİCİ - AKS', acilisStok: 49500, uretim: 20100, sevk: 0, kalanStok: 69600 },

  { tarih: '2026-04-23', urunKodu: 'MM00.0412', urunAdi: '750 ML DESTO SIVI BULAŞIK DETERJANI - ŞEFFAF', acilisStok: 481000, uretim: 43000, sevk: 0, kalanStok: 524000 },
  { tarih: '2026-04-23', urunKodu: 'MM00.0411', urunAdi: '750 ML DESTO SIVI BULAŞIK DETERJANI - MAVİ', acilisStok: 171040, uretim: 40200, sevk: 80000, kalanStok: 131240 },

  { tarih: '2026-04-24', urunKodu: 'MM00.0412', urunAdi: '750 ML DESTO SIVI BULAŞIK DETERJANI - ŞEFFAF', acilisStok: 524000, uretim: 0, sevk: 250000, kalanStok: 274000 },
];

export const paletRecords: PaletRecord[] = [
  { paletNo: '000665/01', partiNo: '000665', urunKodu: 'MM00.0412', urunAdi: '750 ML DESTO SIVI BULAŞIK DETERJANI - ŞEFFAF', uretimTarihi: '2026-04-16', adetMiktari: 1260, tavaIciAdedi: 90, lotNo: 'APS-64801-69', makine: 'Hat 1', durum: 'sevk edildi', firmaAdi: 'Desto Kimya A.Ş.' },
  { paletNo: '000665/02', partiNo: '000665', urunKodu: 'MM00.0412', urunAdi: '750 ML DESTO SIVI BULAŞIK DETERJANI - ŞEFFAF', uretimTarihi: '2026-04-16', adetMiktari: 1260, tavaIciAdedi: 90, lotNo: 'APS-64801-69', makine: 'Hat 1', durum: 'sevk edildi', firmaAdi: 'Desto Kimya A.Ş.' },
  { paletNo: '000655/76', partiNo: '000655', urunKodu: 'MM02.0811', urunAdi: '2,5 LT YÜZEY TEMİZLEYİCİ DOA', uretimTarihi: '2026-04-16', adetMiktari: 408, tavaIciAdedi: 34, lotNo: 'APS-64801-73', makine: 'Hat 5', durum: 'stokta', firmaAdi: 'Endeks Kimya San. ve Tic.' },
  { paletNo: '000666/01', partiNo: '000666', urunKodu: 'MM00.0412', urunAdi: '750 ML DESTO SIVI BULAŞIK DETERJANI - ŞEFFAF', uretimTarihi: '2026-04-21', adetMiktari: 1260, tavaIciAdedi: 90, lotNo: 'APS-64801-69', makine: 'Hat 1', durum: 'stokta' },
  { paletNo: '000666/02', partiNo: '000666', urunKodu: 'MM00.0412', urunAdi: '750 ML DESTO SIVI BULAŞIK DETERJANI - ŞEFFAF', uretimTarihi: '2026-04-21', adetMiktari: 1260, tavaIciAdedi: 90, lotNo: 'APS-64801-69', makine: 'Hat 1', durum: 'stokta' },
  { paletNo: '000667/01', partiNo: '000667', urunKodu: 'MM00.0411', urunAdi: '750 ML DESTO SIVI BULAŞIK DETERJANI - MAVİ', uretimTarihi: '2026-04-21', adetMiktari: 1260, tavaIciAdedi: 90, lotNo: 'APS-64801-70', makine: 'Hat 2', durum: 'sevk edildi', firmaAdi: 'BioClean Türkiye' },
  { paletNo: '000668/01', partiNo: '000668', urunKodu: 'MM02.0300', urunAdi: '739 ML EXTRA SIVI BULAŞIK ŞİŞE', uretimTarihi: '2026-04-22', adetMiktari: 1050, tavaIciAdedi: 75, lotNo: 'APS-64802-02', makine: 'Hat 2', durum: 'stokta' },
  { paletNo: '000669/01', partiNo: '000669', urunKodu: 'MM02.0101', urunAdi: '450 ML PARLATICI - PET - MAVİ', uretimTarihi: '2026-04-22', adetMiktari: 1440, tavaIciAdedi: 120, lotNo: 'APS-64802-03', makine: 'Hat 3', durum: 'beklemede' },
];
