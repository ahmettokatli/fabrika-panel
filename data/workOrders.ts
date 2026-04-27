import { products } from './products';

export interface WorkOrder {
  id: string;
  siparisFirma: string;
  urunKodu: string;
  urunAdi: string;
  siparisAdedi: number;
  oncelik: 'yüksek' | 'normal' | 'düşük';
  teslimTarihi: string;
  acilisTarihi: string;
  durum: 'beklemede' | 'üretimde' | 'tamamlandı' | 'iptal';

  // Atama
  atananHat: string;
  atananHatModel: string;

  // Hesaplanan değerler
  gerekliBammaddeKg: number;
  tahminiSure: number; // saat
  tahminiGun: number;
  tahminiPalet: number;
  tavaIciAdedi: number;
  paletBasiAdet: number;

  // Stok durumu
  mevcutHammaddeKg: number;
  hammaddeYeterli: boolean;

  // Gerçekleşme
  uretilenAdet: number;
  kalanAdet: number;
  tamamlanmaYuzdesi: number;
  gerceklesenHammaddeKg: number;
}

// Ürüne ve hatta göre kapasite hesapla (adet/saat)
function hesaplaKapasite(urunKodu: string, hatModel: string): number {
  const urun = products.find(p => p.code === urunKodu);
  if (!urun) return 0;
  // Hat modeline göre verimlilik faktörü
  const faktor = hatModel === 'PF-8' ? 1.0 : hatModel === 'DPH-70' ? 0.95 : 0.90;
  return Math.round((3600 / urun.cycle) * urun.goz * faktor);
}

function hesaplaGun(kapasite: number, adet: number): number {
  if (kapasite === 0) return 0;
  return Math.ceil(adet / (kapasite * 24));
}

export const workOrders: WorkOrder[] = [
  {
    id: 'IS-2026-001',
    siparisFirma: 'Desto Kimya A.Ş.',
    urunKodu: 'MM00.0412',
    urunAdi: '750 ML DESTO SIVI BULAŞIK DETERJANI - ŞEFFAF',
    siparisAdedi: 300000,
    oncelik: 'yüksek',
    teslimTarihi: '2026-04-30',
    acilisTarihi: '2026-04-21',
    durum: 'üretimde',
    atananHat: 'Hat 1',
    atananHatModel: 'PF-8',
    gerekliBammaddeKg: Math.round(300000 * 32 / 1000),
    tahminiSure: Math.ceil(300000 / hesaplaKapasite('MM00.0412', 'PF-8')),
    tahminiGun: hesaplaGun(hesaplaKapasite('MM00.0412', 'PF-8'), 300000),
    tahminiPalet: Math.ceil(300000 / 1260),
    tavaIciAdedi: 90,
    paletBasiAdet: 1260,
    mevcutHammaddeKg: 8240,
    hammaddeYeterli: 8240 >= Math.round(300000 * 32 / 1000),
    uretilenAdet: 129000,
    kalanAdet: 171000,
    tamamlanmaYuzdesi: 43,
    gerceklesenHammaddeKg: Math.round(129000 * 32 / 1000),
  },
  {
    id: 'IS-2026-002',
    siparisFirma: 'BioClean Türkiye',
    urunKodu: 'MM00.0411',
    urunAdi: '750 ML DESTO SIVI BULAŞIK DETERJANI - MAVİ',
    siparisAdedi: 150000,
    oncelik: 'normal',
    teslimTarihi: '2026-05-05',
    acilisTarihi: '2026-04-21',
    durum: 'üretimde',
    atananHat: 'Hat 2',
    atananHatModel: 'PF-8',
    gerekliBammaddeKg: Math.round(150000 * 32 / 1000),
    tahminiSure: Math.ceil(150000 / hesaplaKapasite('MM00.0411', 'PF-8')),
    tahminiGun: hesaplaGun(hesaplaKapasite('MM00.0411', 'PF-8'), 150000),
    tahminiPalet: Math.ceil(150000 / 1260),
    tavaIciAdedi: 90,
    paletBasiAdet: 1260,
    mevcutHammaddeKg: 1850,
    hammaddeYeterli: 1850 >= Math.round(150000 * 32 / 1000),
    uretilenAdet: 81240,
    kalanAdet: 68760,
    tamamlanmaYuzdesi: 54,
    gerceklesenHammaddeKg: Math.round(81240 * 32 / 1000),
  },
  {
    id: 'IS-2026-003',
    siparisFirma: 'Paksoy Kimya Ltd.',
    urunKodu: 'MM02.0101',
    urunAdi: '450 ML PARLATICI - PET - MAVİ',
    siparisAdedi: 200000,
    oncelik: 'normal',
    teslimTarihi: '2026-05-08',
    acilisTarihi: '2026-04-21',
    durum: 'üretimde',
    atananHat: 'Hat 3',
    atananHatModel: 'PF-8',
    gerekliBammaddeKg: Math.round(200000 * 29 / 1000),
    tahminiSure: Math.ceil(200000 / hesaplaKapasite('MM02.0101', 'PF-8')),
    tahminiGun: hesaplaGun(hesaplaKapasite('MM02.0101', 'PF-8'), 200000),
    tahminiPalet: Math.ceil(200000 / 1440),
    tavaIciAdedi: 120,
    paletBasiAdet: 1440,
    mevcutHammaddeKg: 8240,
    hammaddeYeterli: true,
    uretilenAdet: 123100,
    kalanAdet: 76900,
    tamamlanmaYuzdesi: 62,
    gerceklesenHammaddeKg: Math.round(123100 * 29 / 1000),
  },
  {
    id: 'IS-2026-004',
    siparisFirma: 'Endeks Kimya San. ve Tic.',
    urunKodu: 'MM02.0811',
    urunAdi: '2,5 LT YÜZEY TEMİZLEYİCİ DOA - 80 GR',
    siparisAdedi: 50000,
    oncelik: 'düşük',
    teslimTarihi: '2026-05-15',
    acilisTarihi: '2026-04-21',
    durum: 'üretimde',
    atananHat: 'Hat 5',
    atananHatModel: 'DPH-70',
    gerekliBammaddeKg: Math.round(50000 * 80 / 1000),
    tahminiSure: Math.ceil(50000 / hesaplaKapasite('MM02.0811', 'DPH-70')),
    tahminiGun: hesaplaGun(hesaplaKapasite('MM02.0811', 'DPH-70'), 50000),
    tahminiPalet: Math.ceil(50000 / 408),
    tavaIciAdedi: 34,
    paletBasiAdet: 408,
    mevcutHammaddeKg: 8240,
    hammaddeYeterli: true,
    uretilenAdet: 31144,
    kalanAdet: 18856,
    tamamlanmaYuzdesi: 62,
    gerceklesenHammaddeKg: Math.round(31144 * 80 / 1000),
  },
  {
    id: 'IS-2026-005',
    siparisFirma: 'Temsa Temizlik Ür. A.Ş.',
    urunKodu: 'MM02.0021',
    urunAdi: '1 LT SIVI BULAŞIK SÜNGERLİ - ŞEFFAF',
    siparisAdedi: 120000,
    oncelik: 'yüksek',
    teslimTarihi: '2026-04-28',
    acilisTarihi: '2026-04-22',
    durum: 'tamamlandı',
    atananHat: 'Hat 8',
    atananHatModel: 'DPH-70',
    gerekliBammaddeKg: Math.round(120000 * 40 / 1000),
    tahminiSure: Math.ceil(120000 / hesaplaKapasite('MM02.0021', 'DPH-70')),
    tahminiGun: hesaplaGun(hesaplaKapasite('MM02.0021', 'DPH-70'), 120000),
    tahminiPalet: Math.ceil(120000 / 1000),
    tavaIciAdedi: 80,
    paletBasiAdet: 1000,
    mevcutHammaddeKg: 8240,
    hammaddeYeterli: true,
    uretilenAdet: 120000,
    kalanAdet: 0,
    tamamlanmaYuzdesi: 100,
    gerceklesenHammaddeKg: Math.round(120000 * 40 / 1000),
  },
  {
    id: 'IS-2026-006',
    siparisFirma: 'Desto Kimya A.Ş.',
    urunKodu: 'MM02.0300',
    urunAdi: '739 ML EXTRA SIVI BULAŞIK ŞİŞE - ŞEFFAF',
    siparisAdedi: 80000,
    oncelik: 'normal',
    teslimTarihi: '2026-05-10',
    acilisTarihi: '2026-04-27',
    durum: 'beklemede',
    atananHat: 'Hat 2',
    atananHatModel: 'PF-8',
    gerekliBammaddeKg: Math.round(80000 * 40 / 1000),
    tahminiSure: Math.ceil(80000 / hesaplaKapasite('MM02.0300', 'PF-8')),
    tahminiGun: hesaplaGun(hesaplaKapasite('MM02.0300', 'PF-8'), 80000),
    tahminiPalet: Math.ceil(80000 / 1050),
    tavaIciAdedi: 75,
    paletBasiAdet: 1050,
    mevcutHammaddeKg: 8240,
    hammaddeYeterli: true,
    uretilenAdet: 0,
    kalanAdet: 80000,
    tamamlanmaYuzdesi: 0,
    gerceklesenHammaddeKg: 0,
  },
];
