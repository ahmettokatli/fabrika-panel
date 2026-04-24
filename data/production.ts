export interface ProductionRecord {
  id: number;
  tarih: string;
  makine: string;
  makineModel: string;
  urunKodu: string;
  urunAdi: string;
  gramaj: number;
  cycle: number;
  mevcutCycle: number;
  goz: number;
  saat: number;
  durusSaat: number;
  kapasite: number;
  uretim: number;
  verimlilik: number;
  hammaddeKg: number;
  lotNo: string;
  not: string;
}

export const productionRecords: ProductionRecord[] = [
  // 21 Nisan
  { id: 1, tarih: '2026-04-21', makine: 'Hat 1', makineModel: 'PF-8', urunKodu: 'MM00.0412', urunAdi: '750 ML DESTO SIVI BULAŞIK DETERJANI - ŞEFFAF', gramaj: 32, cycle: 16.4, mevcutCycle: 16.4, goz: 8, saat: 24, durusSaat: 0, kapasite: 42146, uretim: 43200, verimlilik: 1.025, hammaddeKg: 1382.4, lotNo: 'APS-64801-69', not: '' },
  { id: 2, tarih: '2026-04-21', makine: 'Hat 2', makineModel: 'PF-8', urunKodu: 'MM00.0411', urunAdi: '750 ML DESTO SIVI BULAŞIK DETERJANI - MAVİ', gramaj: 32, cycle: 17.4, mevcutCycle: 17.4, goz: 8, saat: 24, durusSaat: 0, kapasite: 39724, uretim: 41040, verimlilik: 1.033, hammaddeKg: 1313.3, lotNo: 'APS-64801-70', not: '' },
  { id: 3, tarih: '2026-04-21', makine: 'Hat 3', makineModel: 'PF-8', urunKodu: 'MM02.0101', urunAdi: '450 ML PARLATICI - PET - MAVİ', gramaj: 29, cycle: 15, mevcutCycle: 15, goz: 8, saat: 24, durusSaat: 4, kapasite: 38400, uretim: 38400, verimlilik: 1.0, hammaddeKg: 1113.6, lotNo: 'APS-64801-71', not: 'Piston Keçe Arızası' },
  { id: 4, tarih: '2026-04-21', makine: 'Hat 4', makineModel: 'DPH-70', urunKodu: 'MM00.1120', urunAdi: '1,5 LT YÜZEY TEMİZLEYİCİ - PET - AKS', gramaj: 65, cycle: 15.9, mevcutCycle: 16.25, goz: 6, saat: 24, durusSaat: 10, kapasite: 19019, uretim: 17500, verimlilik: 0.92, hammaddeKg: 1137.5, lotNo: 'APS-64801-72', not: 'AKS Set Bağlandı / Cycle 16,25' },
  { id: 5, tarih: '2026-04-21', makine: 'Hat 5', makineModel: 'DPH-70', urunKodu: 'MM02.0811', urunAdi: '2,5 LT YÜZEY TEMİZLEYİCİ DOA - PET - 80 GR', gramaj: 80, cycle: 21, mevcutCycle: 21, goz: 3, saat: 24, durusSaat: 4, kapasite: 10286, uretim: 10044, verimlilik: 0.977, hammaddeKg: 803.5, lotNo: 'APS-64801-73', not: 'Kalıp değişti' },
  { id: 6, tarih: '2026-04-21', makine: 'Hat 6', makineModel: 'DPH-70', urunKodu: 'MM00.0136', urunAdi: '1 LT ELBOW YÜZEY-RTU - PET - YENİ ŞİŞE', gramaj: 44, cycle: 19, mevcutCycle: 19, goz: 4, saat: 24, durusSaat: 0, kapasite: 18189, uretim: 17856, verimlilik: 0.982, hammaddeKg: 785.7, lotNo: 'APS-64801-74', not: '' },
  { id: 7, tarih: '2026-04-21', makine: 'Hat 7', makineModel: 'MB-50', urunKodu: '', urunAdi: '', gramaj: 0, cycle: 0, mevcutCycle: 0, goz: 0, saat: 0, durusSaat: 24, kapasite: 0, uretim: 0, verimlilik: 0, hammaddeKg: 0, lotNo: '', not: 'Sipariş yok' },
  { id: 8, tarih: '2026-04-21', makine: 'Hat 8', makineModel: 'DPH-70', urunKodu: 'MM02.0021', urunAdi: '1 LT SIVI BULAŞIK SÜNGERLİ - ŞEFFAF', gramaj: 40, cycle: 18, mevcutCycle: 18, goz: 5, saat: 24, durusSaat: 0, kapasite: 24000, uretim: 23100, verimlilik: 0.963, hammaddeKg: 924, lotNo: 'APS-64801-75', not: '' },
  { id: 9, tarih: '2026-04-21', makine: 'Hat 9', makineModel: 'DPH-70', urunKodu: 'MM00.0634', urunAdi: '1,5 LT BULUT KONS.YUM.PET-ŞEFFAF', gramaj: 59, cycle: 14.9, mevcutCycle: 14.9, goz: 4, saat: 24, durusSaat: 0, kapasite: 23195, uretim: 22876, verimlilik: 0.986, hammaddeKg: 1349.7, lotNo: 'APS-64801-76', not: '' },
  { id: 10, tarih: '2026-04-21', makine: 'Hat 10', makineModel: 'DPH-70', urunKodu: 'MM02.0212', urunAdi: '1000 ML DOA ŞEFFAF YÜZEY TEM. - PET', gramaj: 40, cycle: 13.9, mevcutCycle: 13.9, goz: 5, saat: 24, durusSaat: 0, kapasite: 31079, uretim: 31680, verimlilik: 1.019, hammaddeKg: 1267.2, lotNo: 'APS-64801-77', not: '' },

  // 22 Nisan
  { id: 11, tarih: '2026-04-22', makine: 'Hat 1', makineModel: 'PF-8', urunKodu: 'MM00.0412', urunAdi: '750 ML DESTO SIVI BULAŞIK DETERJANI - ŞEFFAF', gramaj: 32, cycle: 16.4, mevcutCycle: 16.4, goz: 8, saat: 24, durusSaat: 0, kapasite: 42146, uretim: 42800, verimlilik: 1.015, hammaddeKg: 1369.6, lotNo: 'APS-64802-01', not: '' },
  { id: 12, tarih: '2026-04-22', makine: 'Hat 2', makineModel: 'PF-8', urunKodu: 'MM02.0300', urunAdi: '739 ML EXTRA SIVI BULAŞIK ŞİŞE - ŞEFFAF', gramaj: 40, cycle: 13.95, mevcutCycle: 13.95, goz: 5, saat: 24, durusSaat: 0, kapasite: 31004, uretim: 30968, verimlilik: 0.999, hammaddeKg: 1238.7, lotNo: 'APS-64802-02', not: '' },
  { id: 13, tarih: '2026-04-22', makine: 'Hat 3', makineModel: 'PF-8', urunKodu: 'MM02.0101', urunAdi: '450 ML PARLATICI - PET - MAVİ', gramaj: 29, cycle: 15, mevcutCycle: 15, goz: 8, saat: 24, durusSaat: 2, kapasite: 40320, uretim: 39200, verimlilik: 0.972, hammaddeKg: 1136.8, lotNo: 'APS-64802-03', not: '' },
  { id: 14, tarih: '2026-04-22', makine: 'Hat 4', makineModel: 'DPH-70', urunKodu: 'MM00.1120', urunAdi: '1,5 LT YÜZEY TEMİZLEYİCİ - PET - AKS', gramaj: 65, cycle: 15.9, mevcutCycle: 15.9, goz: 6, saat: 24, durusSaat: 0, kapasite: 20566, uretim: 20100, verimlilik: 0.977, hammaddeKg: 1306.5, lotNo: 'APS-64802-04', not: '' },
  { id: 15, tarih: '2026-04-22', makine: 'Hat 5', makineModel: 'DPH-70', urunKodu: 'MM02.0811', urunAdi: '2,5 LT YÜZEY TEMİZLEYİCİ DOA', gramaj: 80, cycle: 21, mevcutCycle: 21, goz: 3, saat: 24, durusSaat: 0, kapasite: 12343, uretim: 12100, verimlilik: 0.980, hammaddeKg: 968, lotNo: 'APS-64802-05', not: '' },
  { id: 16, tarih: '2026-04-22', makine: 'Hat 6', makineModel: 'DPH-70', urunKodu: 'MM00.0136', urunAdi: '1 LT ELBOW YÜZEY-RTU - PET', gramaj: 44, cycle: 19, mevcutCycle: 19, goz: 4, saat: 24, durusSaat: 0, kapasite: 18189, uretim: 18000, verimlilik: 0.990, hammaddeKg: 792, lotNo: 'APS-64802-06', not: '' },
  { id: 17, tarih: '2026-04-22', makine: 'Hat 7', makineModel: 'MB-50', urunKodu: 'MM02.0021', urunAdi: '1 LT SIVI BULAŞIK SÜNGERLİ - ŞEFFAF', gramaj: 40, cycle: 18, mevcutCycle: 18, goz: 5, saat: 24, durusSaat: 3, kapasite: 21000, uretim: 20500, verimlilik: 0.976, hammaddeKg: 820, lotNo: 'APS-64802-07', not: 'Kalıp Temizliği' },
  { id: 18, tarih: '2026-04-22', makine: 'Hat 8', makineModel: 'DPH-70', urunKodu: 'MM02.0021', urunAdi: '1 LT SIVI BULAŞIK SÜNGERLİ - ŞEFFAF', gramaj: 40, cycle: 18, mevcutCycle: 18, goz: 5, saat: 24, durusSaat: 0, kapasite: 24000, uretim: 23800, verimlilik: 0.992, hammaddeKg: 952, lotNo: 'APS-64802-08', not: '' },
  { id: 19, tarih: '2026-04-22', makine: 'Hat 9', makineModel: 'DPH-70', urunKodu: 'MM00.0634', urunAdi: '1,5 LT BULUT KONS.YUM.PET-ŞEFFAF', gramaj: 59, cycle: 14.9, mevcutCycle: 14.9, goz: 4, saat: 24, durusSaat: 0, kapasite: 23195, uretim: 23000, verimlilik: 0.992, hammaddeKg: 1357, lotNo: 'APS-64802-09', not: '' },
  { id: 20, tarih: '2026-04-22', makine: 'Hat 10', makineModel: 'DPH-70', urunKodu: 'MM02.0212', urunAdi: '1000 ML DOA ŞEFFAF YÜZEY TEM. - PET', gramaj: 40, cycle: 13.9, mevcutCycle: 13.9, goz: 5, saat: 24, durusSaat: 0, kapasite: 31079, uretim: 31500, verimlilik: 1.014, hammaddeKg: 1260, lotNo: 'APS-64802-10', not: '' },

  // 23 Nisan
  { id: 21, tarih: '2026-04-23', makine: 'Hat 1', makineModel: 'PF-8', urunKodu: 'MM00.0412', urunAdi: '750 ML DESTO SIVI BULAŞIK DETERJANI - ŞEFFAF', gramaj: 32, cycle: 16.4, mevcutCycle: 16.4, goz: 8, saat: 24, durusSaat: 0, kapasite: 42146, uretim: 43000, verimlilik: 1.020, hammaddeKg: 1376, lotNo: 'APS-64803-01', not: '' },
  { id: 22, tarih: '2026-04-23', makine: 'Hat 2', makineModel: 'PF-8', urunKodu: 'MM00.0411', urunAdi: '750 ML DESTO SIVI BULAŞIK DETERJANI - MAVİ', gramaj: 32, cycle: 17.4, mevcutCycle: 17.4, goz: 8, saat: 24, durusSaat: 0, kapasite: 39724, uretim: 40200, verimlilik: 1.012, hammaddeKg: 1286.4, lotNo: 'APS-64803-02', not: '' },
  { id: 23, tarih: '2026-04-23', makine: 'Hat 3', makineModel: 'PF-8', urunKodu: 'MM02.0101', urunAdi: '450 ML PARLATICI - PET - MAVİ', gramaj: 29, cycle: 15, mevcutCycle: 15, goz: 8, saat: 24, durusSaat: 0, kapasite: 46080, uretim: 45500, verimlilik: 0.987, hammaddeKg: 1319.5, lotNo: 'APS-64803-03', not: '' },
  { id: 24, tarih: '2026-04-23', makine: 'Hat 4', makineModel: 'DPH-70', urunKodu: 'MM00.1120', urunAdi: '1,5 LT YÜZEY TEMİZLEYİCİ - PET - AKS', gramaj: 65, cycle: 15.9, mevcutCycle: 15.9, goz: 6, saat: 24, durusSaat: 0, kapasite: 20566, uretim: 20400, verimlilik: 0.992, hammaddeKg: 1326, lotNo: 'APS-64803-04', not: '' },
  { id: 25, tarih: '2026-04-23', makine: 'Hat 5', makineModel: 'DPH-70', urunKodu: 'MM02.0811', urunAdi: '2,5 LT YÜZEY TEMİZLEYİCİ DOA', gramaj: 80, cycle: 21, mevcutCycle: 21, goz: 3, saat: 24, durusSaat: 6, kapasite: 9257, uretim: 9000, verimlilik: 0.972, hammaddeKg: 720, lotNo: 'APS-64803-05', not: 'Soğutma Suyu Arızası' },
  { id: 26, tarih: '2026-04-23', makine: 'Hat 6', makineModel: 'DPH-70', urunKodu: 'MM00.0136', urunAdi: '1 LT ELBOW YÜZEY-RTU - PET', gramaj: 44, cycle: 19, mevcutCycle: 19, goz: 4, saat: 24, durusSaat: 0, kapasite: 18189, uretim: 18200, verimlilik: 1.001, hammaddeKg: 800.8, lotNo: 'APS-64803-06', not: '' },
  { id: 27, tarih: '2026-04-23', makine: 'Hat 7', makineModel: 'MB-50', urunKodu: 'MM02.0021', urunAdi: '1 LT SIVI BULAŞIK SÜNGERLİ - ŞEFFAF', gramaj: 40, cycle: 18, mevcutCycle: 18, goz: 5, saat: 24, durusSaat: 0, kapasite: 24000, uretim: 24000, verimlilik: 1.0, hammaddeKg: 960, lotNo: 'APS-64803-07', not: '' },
  { id: 28, tarih: '2026-04-23', makine: 'Hat 8', makineModel: 'DPH-70', urunKodu: 'MM02.0021', urunAdi: '1 LT SIVI BULAŞIK SÜNGERLİ - ŞEFFAF', gramaj: 40, cycle: 18, mevcutCycle: 18, goz: 5, saat: 24, durusSaat: 0, kapasite: 24000, uretim: 23900, verimlilik: 0.996, hammaddeKg: 956, lotNo: 'APS-64803-08', not: '' },
  { id: 29, tarih: '2026-04-23', makine: 'Hat 9', makineModel: 'DPH-70', urunKodu: 'MM00.0634', urunAdi: '1,5 LT BULUT KONS.YUM.PET-ŞEFFAF', gramaj: 59, cycle: 14.9, mevcutCycle: 14.9, goz: 4, saat: 24, durusSaat: 0, kapasite: 23195, uretim: 23100, verimlilik: 0.996, hammaddeKg: 1362.9, lotNo: 'APS-64803-09', not: '' },
  { id: 30, tarih: '2026-04-23', makine: 'Hat 10', makineModel: 'DPH-70', urunKodu: 'MM02.0212', urunAdi: '1000 ML DOA ŞEFFAF YÜZEY TEM. - PET', gramaj: 40, cycle: 13.9, mevcutCycle: 13.9, goz: 5, saat: 24, durusSaat: 0, kapasite: 31079, uretim: 31200, verimlilik: 1.004, hammaddeKg: 1248, lotNo: 'APS-64803-10', not: '' },
];
