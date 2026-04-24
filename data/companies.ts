export interface Company {
  id: number;
  ad: string;
  sektor: string;
  sehir: string;
  yetkili: string;
  telefon: string;
  toplamSevkiyat: number; // adet
  toplamTutar: number; // TL
  sonSevkiyat: string;
  aktif: boolean;
}

export const companies: Company[] = [
  { id: 1, ad: 'Desto Kimya A.Ş.', sektor: 'Temizlik Ürünleri', sehir: 'İstanbul', yetkili: 'Mehmet Yılmaz', telefon: '0212 555 01 01', toplamSevkiyat: 375000, toplamTutar: 4875000, sonSevkiyat: '2026-04-24', aktif: true },
  { id: 2, ad: 'BioClean Türkiye', sektor: 'Temizlik Ürünleri', sehir: 'Ankara', yetkili: 'Ayşe Kaya', telefon: '0312 444 02 02', toplamSevkiyat: 145000, toplamTutar: 1885000, sonSevkiyat: '2026-04-23', aktif: true },
  { id: 3, ad: 'Endeks Kimya San. ve Tic.', sektor: 'Kimya', sehir: 'İzmir', yetkili: 'Ali Demir', telefon: '0232 333 03 03', toplamSevkiyat: 30000, toplamTutar: 390000, sonSevkiyat: '2026-04-21', aktif: true },
  { id: 4, ad: 'Temsa Temizlik Ür. A.Ş.', sektor: 'Temizlik Ürünleri', sehir: 'Bursa', yetkili: 'Fatma Şahin', telefon: '0224 222 04 04', toplamSevkiyat: 45000, toplamTutar: 585000, sonSevkiyat: '2026-04-21', aktif: true },
  { id: 5, ad: 'Paksoy Kimya Ltd.', sektor: 'Kimya', sehir: 'Adana', yetkili: 'Hasan Çelik', telefon: '0322 111 05 05', toplamSevkiyat: 60000, toplamTutar: 780000, sonSevkiyat: '2026-04-22', aktif: true },
];
