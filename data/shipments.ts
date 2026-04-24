export interface ShipmentRecord {
  id: number;
  sevkTarihi: string;
  firmaAdi: string;
  irsaliyeNo: string;
  urunKodu: string;
  urunAdi: string;
  adet: number;
  paletSayisi: number;
  partiNo: string;
  nakliyeci: string;
  plaka: string;
  durum: 'teslim edildi' | 'yolda' | 'hazırlanıyor';
}

export const shipmentRecords: ShipmentRecord[] = [
  { id: 1, sevkTarihi: '2026-04-21', firmaAdi: 'BioClean Türkiye', irsaliyeNo: 'IRŞ-2026-0412', urunKodu: 'MM00.0411', urunAdi: '750 ML DESTO SIVI BULAŞIK DETERJANI - MAVİ', adet: 50000, paletSayisi: 40, partiNo: '000660', nakliyeci: 'Aras Kargo', plaka: '34ABC123', durum: 'teslim edildi' },
  { id: 2, sevkTarihi: '2026-04-21', firmaAdi: 'Endeks Kimya San. ve Tic.', irsaliyeNo: 'IRŞ-2026-0413', urunKodu: 'MM00.1120', urunAdi: '1,5 LT YÜZEY TEMİZLEYİCİ - AKS', adet: 30000, paletSayisi: 25, partiNo: '000661', nakliyeci: 'MNG Kargo', plaka: '06DEF456', durum: 'teslim edildi' },
  { id: 3, sevkTarihi: '2026-04-21', firmaAdi: 'Desto Kimya A.Ş.', irsaliyeNo: 'IRŞ-2026-0414', urunKodu: 'MM00.0136', urunAdi: '1 LT ELBOW YÜZEY-RTU', adet: 20000, paletSayisi: 18, partiNo: '000662', nakliyeci: 'Horoz Lojistik', plaka: '35GHI789', durum: 'teslim edildi' },
  { id: 4, sevkTarihi: '2026-04-21', firmaAdi: 'Temsa Temizlik Ür. A.Ş.', irsaliyeNo: 'IRŞ-2026-0415', urunKodu: 'MM02.0021', urunAdi: '1 LT SIVI BULAŞIK SÜNGERLİ', adet: 45000, paletSayisi: 36, partiNo: '000663', nakliyeci: 'Aras Kargo', plaka: '34JKL012', durum: 'teslim edildi' },
  { id: 5, sevkTarihi: '2026-04-21', firmaAdi: 'BioClean Türkiye', irsaliyeNo: 'IRŞ-2026-0416', urunKodu: 'MM02.0212', urunAdi: '1000 ML DOA ŞEFFAF YÜZEY TEM.', adet: 15000, paletSayisi: 12, partiNo: '000664', nakliyeci: 'Aras Kargo', plaka: '34ABC123', durum: 'teslim edildi' },
  { id: 6, sevkTarihi: '2026-04-22', firmaAdi: 'Desto Kimya A.Ş.', irsaliyeNo: 'IRŞ-2026-0417', urunKodu: 'MM00.0412', urunAdi: '750 ML DESTO SIVI BULAŞIK DETERJANI - ŞEFFAF', adet: 55000, paletSayisi: 44, partiNo: '000665', nakliyeci: 'Horoz Lojistik', plaka: '35MNO345', durum: 'teslim edildi' },
  { id: 7, sevkTarihi: '2026-04-22', firmaAdi: 'Paksoy Kimya Ltd.', irsaliyeNo: 'IRŞ-2026-0418', urunKodu: 'MM02.0101', urunAdi: '450 ML PARLATICI - PET - MAVİ', adet: 60000, paletSayisi: 42, partiNo: '000656', nakliyeci: 'MNG Kargo', plaka: '06PRS678', durum: 'teslim edildi' },
  { id: 8, sevkTarihi: '2026-04-23', firmaAdi: 'BioClean Türkiye', irsaliyeNo: 'IRŞ-2026-0419', urunKodu: 'MM00.0411', urunAdi: '750 ML DESTO SIVI BULAŞIK DETERJANI - MAVİ', adet: 80000, paletSayisi: 64, partiNo: '000667', nakliyeci: 'Aras Kargo', plaka: '34TUV901', durum: 'yolda' },
  { id: 9, sevkTarihi: '2026-04-24', firmaAdi: 'Desto Kimya A.Ş.', irsaliyeNo: 'IRŞ-2026-0420', urunKodu: 'MM00.0412', urunAdi: '750 ML DESTO SIVI BULAŞIK DETERJANI - ŞEFFAF', adet: 250000, paletSayisi: 198, partiNo: '000666', nakliyeci: 'Horoz Lojistik', plaka: '35WXY234', durum: 'hazırlanıyor' },
];
