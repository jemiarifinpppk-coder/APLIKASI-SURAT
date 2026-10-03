import React from 'react';
import { FullDocumentState } from '../types/letter';
import { KopSuratView } from './KopSuratView';
import { KemenagTteQr } from './KemenagTteQr';
import { KemenagLogo } from './KemenagLogo';
import { formatIndoDate } from '../utils/dateHelpers';
import {
  getKeteranganSubtitle,
  getKeteranganDefaultPernyataan,
  getKeteranganDefaultTujuan,
} from '../utils/keteranganHelpers';

interface DocumentRendererProps {
  state: FullDocumentState;
  showWatermark?: boolean;
}

export const DocumentRenderer: React.FC<DocumentRendererProps> = ({
  state,
  showWatermark = false,
}) => {
  const { madrasah, jenisSurat, penandatangan } = state;

  const getFontClass = () => {
    switch (madrasah.fontFamily) {
      case 'times':
        return 'font-times';
      case 'arial':
        return 'font-arial';
      case 'lora':
        return 'font-lora';
      case 'bookman':
      default:
        return 'font-bookman';
    }
  };

  const getPaperClass = () => {
    switch (madrasah.paperSize) {
      case 'f4':
        return 'f4-paper';
      case 'letter':
        return 'letter-paper';
      case 'a4':
      default:
        return 'a4-paper';
    }
  };

  const getMarginClass = () => {
    switch (madrasah.marginPreset) {
      case 'kompak':
        return 'margin-kompak';
      case 'lebar':
        return 'margin-lebar';
      case 'standar':
      default:
        return 'margin-standar';
    }
  };

  const renderSuratTugas = () => {
    const st = state.suratTugas;
    return (
      <div className="space-y-2.5 sm:space-y-3 text-justify text-[10pt] sm:text-[10.5pt] leading-[1.45]">
        {/* Title & Number */}
        <div className="text-center my-1.5">
          <h2 className="text-[12.5pt] sm:text-[13.5pt] font-bold uppercase tracking-wide underline">
            SURAT TUGAS
          </h2>
          <p className="text-[10pt] sm:text-[10.5pt] font-semibold mt-0.5 tracking-tight">
            Nomor : {st.nomorSurat || 'B-    /MTs.21.07.03/PP.00.6/09/2026'}
          </p>
          {(st.perihal || '').trim() && (
            <p className="text-[10pt] sm:text-[10.5pt] font-bold uppercase mt-1 tracking-tight">
              Tentang : {st.perihal}
            </p>
          )}
        </div>

        {/* Menimbang / Dasar Penugasan */}
        {st.dasarTugas && st.dasarTugas.length > 0 && (
          <div className="flex gap-2">
            <div className="w-24 shrink-0 font-medium">Menimbang / Dasar</div>
            <div className="w-3 shrink-0 text-center">:</div>
            <div className="flex-1 space-y-0.5">
              {st.dasarTugas.map((item, idx) => (
                <div key={idx} className="flex gap-1.5 items-start">
                  <span className="shrink-0">{idx + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Header Penugasan */}
        <div className="text-center font-bold uppercase tracking-wider my-1">
          MEMBERI TUGAS:
        </div>

        {/* Personel List / Tabel */}
        <div className="flex gap-2">
          <div className="w-24 shrink-0 font-medium">Kepada</div>
          <div className="w-3 shrink-0 text-center">:</div>
          <div className="flex-1">
            {st.personelList.length === 1 ? (
              <div className="space-y-0.5 pl-0.5 text-[10pt] sm:text-[10.5pt]">
                <div className="flex">
                  <span className="w-32 font-medium">Nama</span>
                  <span className="w-3">:</span>
                  <span className="font-bold">{st.personelList[0].nama}</span>
                </div>
                <div className="flex">
                  <span className="w-32 font-medium">NIP</span>
                  <span className="w-3">:</span>
                  <span>{st.personelList[0].nip || '-'}</span>
                </div>
                <div className="flex">
                  <span className="w-32 font-medium">Pangkat / Golongan</span>
                  <span className="w-3">:</span>
                  <span>{st.personelList[0].pangkatGol || '-'}</span>
                </div>
                <div className="flex">
                  <span className="w-32 font-medium">Jabatan</span>
                  <span className="w-3">:</span>
                  <span>{st.personelList[0].jabatan || '-'}</span>
                </div>
                {st.personelList[0].keterangan && (
                  <div className="flex">
                    <span className="w-32 font-medium">Keterangan</span>
                    <span className="w-3">:</span>
                    <span>{st.personelList[0].keterangan}</span>
                  </div>
                )}
              </div>
            ) : (
              <table className="w-full border-collapse border border-black text-[9pt] sm:text-[9.5pt] my-1">
                <thead>
                  <tr className="bg-neutral-100 font-bold text-center">
                    <th className="border border-black px-1.5 py-0.5 w-7">No.</th>
                    <th className="border border-black px-1.5 py-0.5">Nama Lengkap & NIP</th>
                    <th className="border border-black px-1.5 py-0.5 w-24">Pangkat/Gol</th>
                    <th className="border border-black px-1.5 py-0.5 w-28">Jabatan</th>
                    <th className="border border-black px-1.5 py-0.5 w-20">Ket.</th>
                  </tr>
                </thead>
                <tbody>
                  {st.personelList.map((p, idx) => (
                    <tr key={p.id || idx}>
                      <td className="border border-black px-1.5 py-0.5 text-center align-top">{idx + 1}.</td>
                      <td className="border border-black px-1.5 py-0.5 align-top">
                        <div className="font-bold">{p.nama}</div>
                        <div className="text-[8pt] text-neutral-800">NIP. {p.nip || '-'}</div>
                      </td>
                      <td className="border border-black px-1.5 py-0.5 text-center align-top">{p.pangkatGol || '-'}</td>
                      <td className="border border-black px-1.5 py-0.5 align-top">{p.jabatan || '-'}</td>
                      <td className="border border-black px-1.5 py-0.5 text-center align-top">{p.keterangan || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Maksud Tugas & Rincian */}
        <div className="flex gap-2 mt-2">
          <div className="w-24 shrink-0 font-medium">Untuk</div>
          <div className="w-3 shrink-0 text-center">:</div>
          <div className="flex-1 space-y-1.5">
            <p>
              1.{' '}
              {st.maksudTugas ||
                (st.perihal
                  ? `Melaksanakan tugas ${
                      st.perihal.toLowerCase().startsWith('melaksanakan')
                        ? st.perihal
                        : st.perihal
                    }.`
                  : 'Melaksanakan tugas dinas sesuai penugasan yang diberikan.')}
            </p>
            <div className="grid grid-cols-[135px_12px_1fr] gap-y-0.5 pl-3.5 text-[9.5pt] sm:text-[10pt]">
              <span className="font-medium">Tempat Pelaksanaan</span>
              <span>:</span>
              <span>{st.tempatTugas}</span>
              
              <span className="font-medium">Waktu Pelaksanaan</span>
              <span>:</span>
              <span>{st.waktuTugas}</span>
              
              {st.anggaranTugas && (
                <>
                  <span className="font-medium">Beban Anggaran</span>
                  <span>:</span>
                  <span>{st.anggaranTugas}</span>
                </>
              )}
            </div>
            <p className="mt-1">
              2. {st.klausulPenutup || 'Melaporkan hasil pelaksanaan tugas secara tertulis kepada Kepala Madrasah.'}
            </p>
          </div>
        </div>

        {/* Closing Sentence */}
        <p className="pt-1 text-justify indent-8">
          Demikian surat tugas ini diberikan kepada yang bersangkutan untuk dilaksanakan dengan penuh rasa tanggung jawab.
        </p>
      </div>
    );
  };

  const renderSK = () => {
    const sk = state.sk;
    return (
      <div className="space-y-3.5 text-justify text-[10pt] sm:text-[10.5pt] leading-[1.5]">
        {/* Title SK */}
        <div className="text-center my-2">
          <h2 className="text-[11.5pt] sm:text-[12pt] font-bold uppercase tracking-wide">
            KEPUTUSAN KEPALA {madrasah.unitKerja || 'MADRASAH TSANAWIYAH NEGERI 3 JENEPONTO'}
          </h2>
          <p className="text-[10.5pt] sm:text-[11pt] font-bold mt-0.5">
            NOMOR : {sk.nomorSK || '142 TAHUN 2026'}
          </p>
          <p className="text-[10.5pt] sm:text-[11pt] font-bold uppercase mt-2 max-w-xl mx-auto tracking-tight leading-snug">
            TENTANG<br />
            {sk.tentangSK}
          </p>
          <p className="text-[10.5pt] font-bold uppercase tracking-wider mt-2.5">
            DENGAN RAHMAT TUHAN YANG MAHA ESA<br />
            KEPALA {madrasah.unitKerja || 'MADRASAH TSANAWIYAH NEGERI 3 JENEPONTO'},
          </p>
        </div>

        {/* Konsideran Menimbang */}
        <div className="flex gap-2">
          <div className="w-28 shrink-0 font-medium">Menimbang</div>
          <div className="w-3 shrink-0 text-center">:</div>
          <div className="flex-1 space-y-1">
            {sk.menimbang.map((item, idx) => (
              <div key={idx} className="flex gap-2 items-start">
                <span className="shrink-0 font-medium">{String.fromCharCode(97 + idx)}.</span>
                <span className="text-justify">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Konsideran Mengingat */}
        <div className="flex gap-2">
          <div className="w-28 shrink-0 font-medium">Mengingat</div>
          <div className="w-3 shrink-0 text-center">:</div>
          <div className="flex-1 space-y-1">
            {sk.mengingat.map((item, idx) => (
              <div key={idx} className="flex gap-2 items-start">
                <span className="shrink-0 font-medium">{idx + 1}.</span>
                <span className="text-justify">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Konsideran Memperhatikan */}
        {sk.memperhatikan && sk.memperhatikan.length > 0 && (
          <div className="flex gap-2">
            <div className="w-28 shrink-0 font-medium">Memperhatikan</div>
            <div className="w-3 shrink-0 text-center">:</div>
            <div className="flex-1 space-y-1">
              {sk.memperhatikan.map((item, idx) => (
                <div key={idx} className="flex gap-2 items-start">
                  <span className="shrink-0 font-medium">{idx + 1}.</span>
                  <span className="text-justify">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MEMUTUSKAN */}
        <div className="text-center font-bold uppercase tracking-wider my-2">
          MEMUTUSKAN:
        </div>

        <div className="flex gap-2">
          <div className="w-28 shrink-0 font-medium">Menetapkan</div>
          <div className="w-3 shrink-0 text-center">:</div>
          <div className="flex-1 font-bold uppercase leading-snug">
            KEPUTUSAN KEPALA {madrasah.unitKerja || 'MADRASAH TSANAWIYAH NEGERI 3 JENEPONTO'} TENTANG {sk.tentangSK}.
          </div>
        </div>

        {/* Diktum List */}
        <div className="space-y-2 pt-1">
          {sk.diktumList.map((diktum) => (
            <div key={diktum.id || diktum.key} className="flex gap-2">
              <div className="w-28 shrink-0 font-bold uppercase">{diktum.key}</div>
              <div className="w-3 shrink-0 text-center">:</div>
              <div className="flex-1 text-justify">{diktum.content}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderLampiranContent = () => {
    const sk = state.sk;
    const pegawaiList = sk.lampiranPegawaiList || [];

    return (
      <div>
        {/* Header Info Lampiran (Right Aligned Kemenag Format) */}
        <div className="flex justify-end mb-3 text-[8.5pt] sm:text-[9pt] leading-tight">
          <div className="w-full max-w-[360px] text-left border-b border-neutral-200 pb-1.5">
            <div className="grid grid-cols-[85px_10px_1fr] gap-0.5">
              <span className="font-semibold">LAMPIRAN</span>
              <span>:</span>
              <span className="font-bold uppercase">
                KEPUTUSAN KEPALA {madrasah.unitKerja || 'MADRASAH TSANAWIYAH NEGERI 3 JENEPONTO'}
              </span>

              <span className="font-semibold">NOMOR</span>
              <span>:</span>
              <span className="font-mono font-medium">{sk.nomorSK || '142 TAHUN 2026'}</span>

              <span className="font-semibold">TANGGAL</span>
              <span>:</span>
              <span>{formatIndoDate(penandatangan.tanggalPenetapan)}</span>

              <span className="font-semibold">TENTANG</span>
              <span>:</span>
              <span className="font-bold uppercase leading-snug">{sk.tentangSK}</span>
            </div>
          </div>
        </div>

        {/* Title of Lampiran */}
        <div className="text-center my-3 space-y-1">
          <h2 className="font-bold uppercase text-[10.5pt] sm:text-[11.5pt] tracking-wide leading-snug underline">
            {sk.judulLampiran || 'DAFTAR NAMA GURU, PEMBAGIAN TUGAS MENGAJAR, DAN TUGAS TAMBAHAN'}
          </h2>
          {sk.lampiranSubJudul && (
            <h3 className="font-bold uppercase text-[9.5pt] sm:text-[10.5pt] tracking-wide text-neutral-800">
              {sk.lampiranSubJudul}
            </h3>
          )}
        </div>

        {/* Table of Teachers / Staff */}
        <div className="overflow-x-auto my-2.5">
          <table className="w-full border-collapse border border-black text-[8.5pt] sm:text-[9pt] leading-snug">
            <thead>
              <tr className="bg-neutral-100 text-center font-bold">
                <th className="border border-black p-1.5 w-8">NO.</th>
                <th className="border border-black p-1.5 min-w-[180px] sm:min-w-[210px] text-left">
                  NAMA LENGKAP / NIP / GOL.
                </th>
                <th className="border border-black p-1.5 min-w-[120px] sm:min-w-[140px] text-left">JABATAN</th>
                <th className="border border-black p-1.5 min-w-[200px] text-left">
                  TUGAS / MATA PELAJARAN / UNIT
                </th>
              </tr>
            </thead>
            <tbody>
              {pegawaiList.length > 0 ? (
                pegawaiList.map((pegawai, idx) => (
                  <tr key={pegawai.id || idx} className="align-top hover:bg-neutral-50/50">
                    <td className="border border-black p-1.5 text-center font-medium">{idx + 1}.</td>
                    <td className="border border-black p-1.5">
                      <div className="font-bold text-neutral-900">{pegawai.nama || '-'}</div>
                      {pegawai.nip && (
                        <div className="text-[8pt] font-mono text-neutral-700">NIP. {pegawai.nip}</div>
                      )}
                      {pegawai.pangkatGol && (
                        <div className="text-[8pt] text-neutral-600">{pegawai.pangkatGol}</div>
                      )}
                    </td>
                    <td className="border border-black p-1.5">{pegawai.jabatan || '-'}</td>
                    <td className="border border-black p-1.5 font-medium">{pegawai.tugas || '-'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="border border-black p-4 text-center text-neutral-500 italic">
                    (Belum ada data guru/pegawai pada lampiran ini)
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderUndangan = () => {
    const un = state.undangan;
    return (
      <div className="space-y-4 text-justify text-[10.5pt] sm:text-[11pt] leading-[1.6]">
        {/* Identitas Surat Undangan */}
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex">
              <span className="w-24 font-medium">Nomor</span>
              <span className="w-4">:</span>
              <span>{un.nomorSurat || 'B-091/Ma.21.14/HM.01/09/2026'}</span>
            </div>
            <div className="flex">
              <span className="w-24 font-medium">Sifat</span>
              <span className="w-4">:</span>
              <span>{un.sifat}</span>
            </div>
            <div className="flex">
              <span className="w-24 font-medium">Lampiran</span>
              <span className="w-4">:</span>
              <span>{un.lampiran || '-'}</span>
            </div>
            <div className="flex">
              <span className="w-24 font-medium">Hal</span>
              <span className="w-4">:</span>
              <span className="font-bold underline">{un.hal}</span>
            </div>
          </div>

          <div className="text-right text-[10pt] sm:text-[10.5pt]">
            <p>{penandatangan.tempatPenetapan || madrasah.kabupatenKota}, {formatIndoDate(penandatangan.tanggalPenetapan)}</p>
          </div>
        </div>

        {/* Kepada Yth */}
        <div className="pt-2">
          <p className="font-medium">Kepada Yth.</p>
          <div className="pl-4 space-y-0.5 mt-1 font-semibold">
            {un.penerimaList.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>

        {/* Salam Pembuka */}
        <div className="pt-2">
          <p className="italic font-serif">Assalamu’alaikum Warahmatullahi Wabarakatuh,</p>
          <p className="mt-2 indent-8">
            Dengan hormat, dalam rangka koordinasi dan pelaksanaan program madrasah, kami mengharapkan kehadiran Bapak/Ibu Saudara(i) pada:
          </p>
        </div>

        {/* Jadwal & Tempat */}
        <div className="grid grid-cols-[140px_16px_1fr] gap-y-1.5 pl-8 my-3">
          <span className="font-medium">Hari, Tanggal</span>
          <span>:</span>
          <span className="font-bold">{un.hariTanggal}</span>

          <span className="font-medium">Waktu</span>
          <span>:</span>
          <span>{un.waktu}</span>

          <span className="font-medium">Tempat</span>
          <span>:</span>
          <span>{un.tempat}</span>

          <span className="font-medium align-top">Acara / Agenda</span>
          <span className="align-top">:</span>
          <div className="whitespace-pre-line font-medium">
            {un.acara}
          </div>

          {un.dresscode && (
            <>
              <span className="font-medium">Pakaian (Dresscode)</span>
              <span>:</span>
              <span>{un.dresscode}</span>
            </>
          )}
        </div>

        {/* Catatan Tambahan */}
        {un.catatan && (
          <p className="indent-8 text-[10pt] italic text-neutral-800">
            Catatan: {un.catatan}
          </p>
        )}

        {/* Salam Penutup */}
        <div className="pt-2">
          <p className="indent-8">
            Mengingat pentingnya agenda tersebut, dimohon kehadirannya tepat pada waktunya. Atas perhatian dan kerjasamanya kami ucapkan terima kasih.
          </p>
          <p className="italic font-serif mt-2">Wassalamu’alaikum Warahmatullahi Wabarakatuh.</p>
        </div>
      </div>
    );
  };

  const renderKeterangan = () => {
    const ket = state.keterangan;

    // Khusus KP4 (Surat Keterangan Untuk Mendapatkan Pembayaran Tunjangan Keluarga) persis contoh foto
    if (ket.subJenis === 'kp4') {
      const susunan = ket.susunanKeluarga && ket.susunanKeluarga.length > 0 ? ket.susunanKeluarga : [
        { id: '1', nama: 'Hj. Maryam, S.Pd.', tanggalLahir: '14-04-1988', tanggalPerkawinan: '10-08-2010', pekerjaanSekolah: 'Guru Honorer', keterangan: 'Istri' },
        { id: '2', nama: 'Muhammad Fadhil Ramadhan', tanggalLahir: '15-10-2012', tanggalPerkawinan: '-', pekerjaanSekolah: 'Pelajar SMP', keterangan: 'AK' },
        { id: '3', nama: 'Nurfadilah Ramadhani', tanggalLahir: '12-05-2016', tanggalPerkawinan: '-', pekerjaanSekolah: 'Siswa SD', keterangan: 'AK' },
      ];
      const useBknNum = ket.penomoranBKN !== false;

      return (
        <div className="space-y-3.5 text-justify text-[10pt] sm:text-[10.5pt] leading-[1.45] text-black">
          {/* Header Title persis seperti contoh foto */}
          <div className="relative text-center my-2">
            <div className="absolute right-0 top-0 text-[8.5pt] font-bold tracking-wider text-slate-800 border border-black px-1.5 py-0.5 leading-none">
              MODEL KP. 4
            </div>
            <h2 className="text-[13pt] font-bold uppercase tracking-wider underline">
              SURAT KETERANGAN
            </h2>
            <h3 className="text-[11.5pt] font-bold uppercase tracking-wide underline mt-0.5">
              {ket.judulKeteranganCustom || 'UNTUK MENDAPATKAN PEMBAYARAN TUNJANGAN KELUARGA'}
            </h3>
            {ket.nomorSurat && (
              <p className="text-[10pt] font-semibold mt-1">
                Nomor : {ket.nomorSurat}
              </p>
            )}
          </div>

          <p className="font-normal">Saya yang bertanda tangan dibawah ini :</p>

          <div className="grid grid-cols-[28px_200px_16px_1fr] gap-y-0.5 text-[9.5pt] sm:text-[10pt] leading-[1.38] pl-0.5">
            <span>{useBknNum ? '34.' : '1.'}</span>
            <span>N a m a</span>
            <span>:</span>
            <div>
              <span className="font-bold">{ket.namaPegawai || 'Ahmad Faisal, S.Pd.I.'}</span>
              {ket.nipPegawai && (
                <span className="ml-2 font-normal text-slate-700 text-[9pt]">/ NIP. {ket.nipPegawai}</span>
              )}
            </div>

            <span>{useBknNum ? '35.' : '2.'}</span>
            <span>Tempat/Tanggal Lahir</span>
            <span>:</span>
            <span>{ket.tempatTglLahir || 'Jeneponto, 15 Juli 1985'}</span>

            <span>{useBknNum ? '36.' : '3.'}</span>
            <span>Jenis Kelamin</span>
            <span>:</span>
            <span>{ket.jenisKelamin || 'Laki-laki'}</span>

            <span>{useBknNum ? '37.' : '4.'}</span>
            <span>A g a m a</span>
            <span>:</span>
            <span>{ket.agamaPegawai || 'Islam'}</span>

            <span>{useBknNum ? '38.' : '5.'}</span>
            <span>Status Kepegawaian</span>
            <span>:</span>
            <span>{ket.statusKepegawaian || 'PNS'}</span>

            <span>{useBknNum ? '39.' : '6.'}</span>
            <span>Jabatan Struktural / Fungsional</span>
            <span>:</span>
            <span>{ket.jabatanPegawai || 'Guru Ahli Muda / Guru Mapel'}</span>

            <span>{useBknNum ? '40.' : '7.'}</span>
            <span>Pangkat / Golongan</span>
            <span>:</span>
            <span>{ket.pangkatGolPegawai || 'Penata Tk. I (III/d)'}</span>

            <span>{useBknNum ? '41.' : '8.'}</span>
            <span>Pada Instansi</span>
            <span>:</span>
            <span>{ket.instansiOrtu || madrasah.unitKerja || 'MTsN 3 Jeneponto'}</span>

            <span>{useBknNum ? '42.' : '9.'}</span>
            <span>Masa Kerja Golongan</span>
            <span>:</span>
            <span>{ket.masaKerjaGolongan || '12 Tahun 04 Bulan'}</span>

            <span>{useBknNum ? '43.' : '10.'}</span>
            <span>Gaji Pokok</span>
            <span>:</span>
            <span>{ket.gajiPokok || 'Rp. 3.550.000,-'}</span>

            <span>{useBknNum ? '44.' : '11.'}</span>
            <span>Alamat/Tempat Tinggal</span>
            <span>:</span>
            <span>{ket.alamatSiswa || 'Lingkungan Kalukuang, Kel. Balang Toa, Kec. Binamu'}</span>
          </div>

          <p className="mt-2 font-normal">Menerangkan dengan sesungguhnya bahwa saya :</p>

          <div className="space-y-1 pl-0.5 text-[9.5pt] sm:text-[10pt]">
            <div className="grid grid-cols-[24px_1fr] gap-x-1">
              <span>m.</span>
              <div>
                <p>
                  Disamping jabatan utama tersebut, bekerja pula sebagai :{' '}
                  <span className="font-medium">{ket.pekerjaanSampingan || '...................................................'}</span>
                </p>
                <p className="mt-0.5">
                  Dengan mendapatkan penghasilan sebesar Rp.{' '}
                  <span className="font-mono">{ket.penghasilanSampingan || '....................'}</span> sebulan
                </p>
              </div>
            </div>

            <div className="grid grid-cols-[24px_1fr] gap-x-1">
              <span>n.</span>
              <p>
                Mempunyai pensiun / pensiun janda sebesar Rp.{' '}
                <span className="font-mono">{ket.pensiunJanda || '....................'}</span> sebulan
              </p>
            </div>

            <div className="grid grid-cols-[24px_1fr] gap-x-1">
              <span>o.</span>
              <p>Mempunyai susunan keluarga sebagai berikut:</p>
            </div>
          </div>

          {/* Tabel Susunan Keluarga */}
          <div className="mt-1.5 overflow-hidden">
            <table className="w-full border-collapse border border-black text-[9pt] leading-tight">
              <thead>
                <tr className="text-center font-medium bg-slate-50/50">
                  <th className="border border-black px-1.5 py-1 w-9" rowSpan={2}>No</th>
                  <th className="border border-black px-2 py-1" rowSpan={2}>
                    Nama isteri/suami/anak<br />tanggungan
                  </th>
                  <th className="border border-black px-2 py-1" colSpan={2}>
                    Tanggal
                  </th>
                  <th className="border border-black px-2 py-1" rowSpan={2}>
                    Pekerjaan/<br />Sekolah
                  </th>
                  <th className="border border-black px-2 py-1 w-24" rowSpan={2}>
                    Keterangan<br />AK.AT.AA
                  </th>
                </tr>
                <tr className="text-center font-medium bg-slate-50/50">
                  <th className="border border-black px-1.5 py-0.5 w-24">Kelahiran</th>
                  <th className="border border-black px-1.5 py-0.5 w-24">Perkawinan</th>
                </tr>
              </thead>
              <tbody>
                {susunan.map((item, idx) => (
                  <tr key={item.id || idx}>
                    <td className="border border-black px-1.5 py-1 text-center">{idx + 1}.</td>
                    <td className="border border-black px-2 py-1 font-medium">{item.nama}</td>
                    <td className="border border-black px-1.5 py-1 text-center">{item.tanggalLahir || '-'}</td>
                    <td className="border border-black px-1.5 py-1 text-center">{item.tanggalPerkawinan || '-'}</td>
                    <td className="border border-black px-2 py-1">{item.pekerjaanSekolah || '-'}</td>
                    <td className="border border-black px-1.5 py-1 text-center font-medium">{item.keterangan || '-'}</td>
                  </tr>
                ))}
                {/* Minimal baris kosong bila sedikit agar proporsional persis contoh form */}
                {Array.from({ length: Math.max(0, 4 - susunan.length) }).map((_, i) => (
                  <tr key={`empty-${i}`}>
                    <td className="border border-black px-1.5 py-2 text-center text-transparent">{susunan.length + i + 1}.</td>
                    <td className="border border-black px-2 py-2"></td>
                    <td className="border border-black px-1.5 py-2"></td>
                    <td className="border border-black px-1.5 py-2"></td>
                    <td className="border border-black px-2 py-2"></td>
                    <td className="border border-black px-1.5 py-2"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[9.5pt] sm:text-[10pt] pl-0.5">
            Jumlah anak seluruhnya ({ket.jumlahAnakTanggungan || susunan.filter((m) => ['AK', 'AT', 'AA'].includes(m.keterangan)).length || '2'}) orang yang menjadi tanggungan, termasuk yang tidak masuk dalam daftar gaji.
          </p>

          <p className="text-[9.5pt] sm:text-[10pt] text-justify leading-relaxed">
            Keterangan ini saya buat dengan sesungguhnya. Apabila keterangan ini ternyata tidak benar atau palsu, saya bersedia dituntut dimuka pengadilan berdasarkan Undang-undang yang berlaku dan bersedia mengembalikan semua penghasilan yang telah saya terima yang seharusnya bukan menjadi hak saya.
          </p>

          {/* Dual Signature Block persis seperti contoh foto */}
          <div className="grid grid-cols-2 gap-4 pt-4 text-[9.5pt] sm:text-[10pt]">
            <div>
              <p>Mengetahui :</p>
              <p className="font-semibold">
                {penandatangan.jabatan && penandatangan.jabatan !== 'Kepala Madrasah'
                  ? penandatangan.jabatan
                  : 'Kepala MTsN 3 Jeneponto'}
              </p>

              <div className="min-h-[52px] my-1 flex items-center justify-start">
                {penandatangan.customSignatureUrl ? (
                  <img
                    src={penandatangan.customSignatureUrl}
                    alt="Tanda Tangan Kepala"
                    className="h-12 max-w-[130px] object-contain"
                  />
                ) : null}
              </div>

              <p className="font-bold underline uppercase">
                {penandatangan.nama || 'Dr. H. Hamzah, S.Ag., S.Pd., M.Pd'}
              </p>
              <p>NIP. {penandatangan.nip || '197109062007011025'}</p>
            </div>

            <div>
              <p>
                {penandatangan.tempatPenetapan || madrasah.kabupatenKota || 'Jeneponto'},{' '}
                {formatIndoDate(penandatangan.tanggalPenetapan)}
              </p>
              <p className="font-semibold">Yang menerangkan,</p>

              <div className="min-h-[52px] my-1 flex items-center justify-start">
                {/* Manual signature space */}
              </div>

              <p className="font-bold underline uppercase">
                {ket.namaPegawai || 'Ahmad Faisal, S.Pd.I.'}
              </p>
              <p>NIP. {ket.nipPegawai || '198507152011011008'}</p>
            </div>
          </div>

          {/* Footnote Ket persis seperti contoh foto */}
          <div className="pt-2 text-[8.5pt] leading-tight text-neutral-800">
            <p className="font-semibold underline">Ket</p>
            <p>(AK) : Anak Kandung</p>
            <p>(AT) : Anak Tiri</p>
            <p>(AA) : Anak Angkat</p>
          </div>
        </div>
      );
    }

    // Khusus Keterangan Tentang Diri Siswa (Buku Induk / Rapor Madrasah) persis contoh foto
    if (ket.subJenis === 'diri_siswa') {
      const namaAyah = ket.namaAyah !== undefined && ket.namaAyah !== '' ? ket.namaAyah : (ket.namaOrtu ? ket.namaOrtu.split('/')[0].trim() : 'Arifuddin');
      const namaIbu = ket.namaIbu !== undefined && ket.namaIbu !== '' ? ket.namaIbu : 'Sayuti / ICCA KR. MANIRA';
      const pekerjaanAyah = ket.pekerjaanAyah !== undefined && ket.pekerjaanAyah !== '' ? ket.pekerjaanAyah : 'Petani';
      const pekerjaanIbu = ket.pekerjaanIbu !== undefined && ket.pekerjaanIbu !== '' ? ket.pekerjaanIbu : 'IRT';
      const alamatOrtu = ket.alamatOrtu !== undefined && ket.alamatOrtu !== '' ? ket.alamatOrtu : (ket.alamatSiswa || 'Bangkala, Desa Tugisi');

      return (
        <div className="text-black text-[9.5pt] sm:text-[10pt] leading-[1.36]">
          {/* Logo Kemenag RI di tengah persis contoh foto */}
          <div className="text-center pt-1 pb-1">
            {madrasah.customLogoUrl ? (
              <img
                src={madrasah.customLogoUrl}
                alt="Logo Madrasah"
                className="w-18 h-18 mx-auto object-contain"
              />
            ) : (
              <KemenagLogo className="w-18 h-18 mx-auto" />
            )}
            <h2 className="text-[13pt] sm:text-[13.5pt] font-bold uppercase tracking-wider mt-3 mb-4 text-black text-center">
              KETERANGAN TENTANG DIRI SISWA
            </h2>
          </div>

          {/* Tabel Daftar Isian 1 - 16 persis seperti contoh foto */}
          <div className="space-y-1 pl-1 text-[9.5pt] sm:text-[10pt]">
            {/* 1. Nama Siswa */}
            <div className="grid grid-cols-[24px_210px_16px_1fr] items-start">
              <span>1</span>
              <span>Nama Siswa (Lengkap)</span>
              <span>:</span>
              <span className="font-bold uppercase tracking-wide">
                {ket.namaSiswa || 'AIDUL AKBAR'}
              </span>
            </div>

            {/* 2. Nomor Induk / NISN */}
            <div className="grid grid-cols-[24px_210px_16px_1fr] items-start">
              <span>2</span>
              <span>Nomor Induk / NISN</span>
              <span>:</span>
              <span className="font-mono">
                {ket.nisLocal && ket.nisn && ket.nisLocal !== ket.nisn
                  ? `${ket.nisLocal} / ${ket.nisn}`
                  : (ket.nisn || ket.nisLocal || '-')}
              </span>
            </div>

            {/* 3. Tempat Tanggal Lahir */}
            <div className="grid grid-cols-[24px_210px_16px_1fr] items-start">
              <span>3</span>
              <span>Tempat Tanggal Lahir</span>
              <span>:</span>
              <span>{ket.tempatTglLahir || 'Jeneponto, 18-12-2007'}</span>
            </div>

            {/* 4. Jenis Kelamin */}
            <div className="grid grid-cols-[24px_210px_16px_1fr] items-start">
              <span>4</span>
              <span>Jenis Kelamin</span>
              <span>:</span>
              <span>{ket.jenisKelamin || 'Laki-laki'}</span>
            </div>

            {/* 5. Agama */}
            <div className="grid grid-cols-[24px_210px_16px_1fr] items-start">
              <span>5</span>
              <span>Agama</span>
              <span>:</span>
              <span>{ket.agamaSiswa || 'Islam'}</span>
            </div>

            {/* 6. Status dalam Keluarga */}
            <div className="grid grid-cols-[24px_210px_16px_1fr] items-start">
              <span>6</span>
              <span>Status dalam Keluarga</span>
              <span>:</span>
              <span>{ket.statusDalamKeluarga || ket.statusAnak || 'Anak kandung'}</span>
            </div>

            {/* 7. Anak ke */}
            <div className="grid grid-cols-[24px_210px_16px_1fr] items-start">
              <span>7</span>
              <span>Anak ke</span>
              <span>:</span>
              <span>{ket.anakKe || '2 (dua)'}</span>
            </div>

            {/* 8. Alamat Siswa */}
            <div className="grid grid-cols-[24px_210px_16px_1fr] items-start">
              <span>8</span>
              <span>Alamat Siswa</span>
              <span>:</span>
              <span>{ket.alamatSiswa || 'Bangkala, Desa Tugisi'}</span>
            </div>

            {/* 9. Nomor Telepon Rumah */}
            <div className="grid grid-cols-[24px_210px_16px_1fr] items-start">
              <span>9</span>
              <span>Nomor Telepon Rumah</span>
              <span>:</span>
              <span>{ket.teleponSiswa || '-'}</span>
            </div>

            {/* 10. Sekolah Asal */}
            <div className="grid grid-cols-[24px_210px_16px_1fr] items-start">
              <span>10</span>
              <span>Sekolah Asal</span>
              <span>:</span>
              <span>{ket.sekolahAsal || 'SD NO 212 Parasangang Beru'}</span>
            </div>

            {/* 11. Diterima di sekolah ini */}
            <div className="grid grid-cols-[24px_210px_16px_1fr] items-start">
              <span>11</span>
              <span>Diterima di sekolah ini</span>
              <span></span>
              <span></span>
            </div>
            <div className="grid grid-cols-[24px_210px_16px_1fr] items-start">
              <span></span>
              <span className="pl-4">Di kelas</span>
              <span>:</span>
              <span>{ket.diterimaDiKelas !== undefined && ket.diterimaDiKelas !== '' ? ket.diterimaDiKelas : (ket.kelas || '-')}</span>
            </div>
            <div className="grid grid-cols-[24px_210px_16px_1fr] items-start">
              <span></span>
              <span className="pl-4">Pada tanggal</span>
              <span>:</span>
              <span>{ket.diterimaTanggal ? formatIndoDate(ket.diterimaTanggal) : '-'}</span>
            </div>

            {/* 12. Nama Orang Tua */}
            <div className="grid grid-cols-[24px_210px_16px_1fr] items-start">
              <span>12</span>
              <span>Nama Orang Tua</span>
              <span></span>
              <span></span>
            </div>
            <div className="grid grid-cols-[24px_210px_16px_1fr] items-start">
              <span></span>
              <span className="pl-4">a. Ayah</span>
              <span>:</span>
              <span className="font-medium">{namaAyah}</span>
            </div>
            <div className="grid grid-cols-[24px_210px_16px_1fr] items-start">
              <span></span>
              <span className="pl-4">b. Ibu</span>
              <span>:</span>
              <span className="font-medium">{namaIbu}</span>
            </div>

            {/* 13. Alamat Orang Tua */}
            <div className="grid grid-cols-[24px_210px_16px_1fr] items-start">
              <span>13</span>
              <span>Alamat Orang Tua</span>
              <span>:</span>
              <span>{alamatOrtu}</span>
            </div>
            <div className="grid grid-cols-[24px_210px_16px_1fr] items-start">
              <span></span>
              <span className="pl-4">Nomor Telepon Rumah</span>
              <span>:</span>
              <span>{ket.teleponOrtu || '-'}</span>
            </div>

            {/* 14. Pekerjaan Orang Tua */}
            <div className="grid grid-cols-[24px_210px_16px_1fr] items-start">
              <span>14</span>
              <span>Pekerjaan Orang Tua</span>
              <span></span>
              <span></span>
            </div>
            <div className="grid grid-cols-[24px_210px_16px_1fr] items-start">
              <span></span>
              <span className="pl-4">a. Ayah</span>
              <span>:</span>
              <span>{pekerjaanAyah}</span>
            </div>
            <div className="grid grid-cols-[24px_210px_16px_1fr] items-start">
              <span></span>
              <span className="pl-4">b. Ibu</span>
              <span>:</span>
              <span>{pekerjaanIbu}</span>
            </div>

            {/* 15. Nama Wali Siswa */}
            <div className="grid grid-cols-[24px_210px_16px_1fr] items-start">
              <span>15</span>
              <span>Nama Wali Siswa</span>
              <span>:</span>
              <span>{ket.namaWali || '-'}</span>
            </div>
            <div className="grid grid-cols-[24px_210px_16px_1fr] items-start">
              <span></span>
              <span className="pl-4">Nomor Telepon Rumah</span>
              <span>:</span>
              <span>{ket.teleponWali || '-'}</span>
            </div>

            {/* 16. Pekerjaan Wali Siswa */}
            <div className="grid grid-cols-[24px_210px_16px_1fr] items-start">
              <span>16</span>
              <span>Pekerjaan Wali Siswa</span>
              <span>:</span>
              <span>{ket.pekerjaanWali || '-'}</span>
            </div>
          </div>

          {/* Bagian Bawah: Pas Foto 3x4 di Kiri & Kepala Madrasah (sesuai pejabat penandatangan) di Kanan */}
          <div className="grid grid-cols-[140px_1fr] items-end justify-between pt-5 mt-2 pl-4 pr-2 avoid-break">
            {/* Kotak Pas Foto 3 x 4 persis contoh foto */}
            <div className="w-[30mm] h-[40mm] border border-black flex flex-col items-center justify-center text-center p-1 bg-white shadow-xs">
              {ket.pasFotoUrl ? (
                <img
                  src={ket.pasFotoUrl}
                  alt="Pas Foto Siswa 3x4"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-slate-600 font-medium text-[8.5pt] flex flex-col items-center justify-center gap-1 select-none">
                  <span>Pas Foto</span>
                  <span className="font-bold">3 x 4</span>
                </div>
              )}
            </div>

            {/* Blok Tanda Tangan Kepala Madrasah sesuai data pejabat penandatanganan di aplikasi */}
            <div className="text-left ml-auto text-[9.5pt] sm:text-[10pt] leading-tight space-y-1">
              <p>
                {penandatangan.tempatPenetapan || madrasah.kabupatenKota || 'Jeneponto'},{' '}
                {formatIndoDate(penandatangan.tanggalPenetapan)}
              </p>
              <p className="font-semibold">
                {penandatangan.jabatan && penandatangan.jabatan !== 'Kepala Madrasah'
                  ? penandatangan.jabatan
                  : 'Kepala MTsN 3 Jeneponto'}
              </p>

              <div className="relative min-h-[58px] my-1 flex items-center justify-start">
                {penandatangan.customSignatureUrl ? (
                  <img
                    src={penandatangan.customSignatureUrl}
                    alt="Tanda Tangan Kepala"
                    className="h-14 max-w-[140px] object-contain"
                  />
                ) : penandatangan.useTte ? (
                  <KemenagTteQr
                    nomorSurat={ket.nomorSurat || 'REG-DIRI-SISWA'}
                    perihal="Keterangan Tentang Diri Siswa"
                    penandatangan={penandatangan}
                    madrasah={madrasah}
                    size={56}
                  />
                ) : (
                  <div className="h-14" />
                )}

                {penandatangan.showStempel && (
                  <div className="absolute left-[-22px] top-[-8px] w-20 h-20 rounded-full border-2 border-dashed border-violet-800/70 opacity-80 pointer-events-none flex flex-col items-center justify-center text-violet-800 text-[5.5pt] font-bold text-center leading-none uppercase rotate-[-12deg] select-none">
                    <div className="border border-violet-800/50 rounded-full w-16 h-16 p-0.5 flex flex-col items-center justify-center">
                      <span className="text-[4.5pt] tracking-tighter">KEMENTERIAN AGAMA</span>
                      <span className="text-[6pt] my-0.5 text-violet-900 font-extrabold">
                        {madrasah.kabupatenKota || 'KAB. JENEPONTO'}
                      </span>
                      <span className="text-[4.5pt]">
                        {madrasah.unitKerja ? madrasah.unitKerja.split(' ')[0] : 'MADRASAH'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <p className="font-bold underline uppercase">
                {penandatangan.nama || 'Hj. Rahmawati, S.Ag., M.A.'}
              </p>
              <p>NIP. {penandatangan.nip || '197301021997032002'}</p>
            </div>
          </div>
        </div>
      );
    }

    // Khusus Surat Keterangan Gangguan Aplikasi PUSAKA (sesuai format resmi Kemenag / contoh foto pengguna)
    if (ket.subJenis === 'aplikasi_pusaka') {
      const hariTanggal =
        ket.hariTanggalGangguan ||
        (penandatangan.tanggalPenetapan
          ? formatIndoDate(penandatangan.tanggalPenetapan)
          : 'Kamis, 01 Oktober 2026');

      return (
        <div className="space-y-3.5 text-black text-[10.5pt] sm:text-[11pt] leading-[1.5]">
          {/* Judul Dokumen */}
          <div className="text-center my-2">
            <h2 className="text-[13pt] sm:text-[14pt] font-bold uppercase tracking-wider underline">
              SURAT KETERANGAN
            </h2>
          </div>

          {/* Blok Metadata Nomor, Sifat, Lampiran, Hal persis seperti contoh foto */}
          <div className="grid grid-cols-[85px_16px_1fr] gap-y-0.5 text-[10.5pt] sm:text-[11pt] leading-[1.4] mb-3">
            <span>Nomor</span>
            <span>:</span>
            <span className="font-semibold">{ket.nomorSurat || 'B-    /MTs.21.07.03/KP.01.2/10/2026'}</span>

            <span>Sifat</span>
            <span>:</span>
            <span>{ket.sifatSurat || 'Biasa'}</span>

            <span>Lampiran</span>
            <span>:</span>
            <span>{ket.lampiranSurat || '-'}</span>

            <span>Hal</span>
            <span>:</span>
            <span className="font-bold">
              {ket.halSurat || 'Pemberitahuan gangguan Aplikasi PUSAKA'}
            </span>
          </div>

          {/* Yth. Tujuan persis contoh foto */}
          <div className="mt-2 mb-3">
            <p className="font-normal">
              <u>Yth. {ket.tujuanYth || `Seluruh ASN ( PNS dan PPPK ) Dalam Lingkup ${madrasah.unitKerja}`}</u>
            </p>
          </div>

          {/* Isi Pernyataan / Surat Keterangan */}
          <div className="space-y-3 text-justify leading-[1.6]">
            {ket.isiKeteranganTambahan ? (
              ket.isiKeteranganTambahan
                .split('\n')
                .filter((p) => p.trim().length > 0)
                .map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))
            ) : (
              <p>
                Sehubungan adanya gangguan pada Aplikasi PUSAKA Kemenag maka beberapa pegawai tidak bisa melakukan presensi kedatangan/kepulangan sebagaimana seharusnya. Gangguan yang dimaksud terjadi pada :
              </p>
            )}

            {/* Rincian Waktu Gangguan */}
            <div className="grid grid-cols-[130px_16px_1fr] gap-y-1 pl-4 my-2">
              <span>Hari/Tanggal</span>
              <span>:</span>
              <span className="font-medium">{hariTanggal}</span>

              <span>Waktu</span>
              <span>:</span>
              <span className="font-medium">
                {ket.waktuGangguan || '06.30 - 08.00'} {ket.zonaWaktu || 'WITA'}
              </span>
            </div>

            {/* Jika ada daftar pegawai khusus */}
            {ket.daftarPegawaiPusaka && ket.daftarPegawaiPusaka.length > 0 && (
              <div className="my-2 pl-4">
                <p className="font-semibold mb-1">Daftar Pegawai yang Mengalami Gangguan:</p>
                <table className="w-full border-collapse border border-black text-[9.5pt] sm:text-[10pt]">
                  <thead>
                    <tr className="bg-slate-100 font-bold text-center">
                      <th className="border border-black px-2 py-1 w-10">No.</th>
                      <th className="border border-black px-2 py-1 text-left">Nama Pegawai</th>
                      <th className="border border-black px-2 py-1 text-left">NIP</th>
                      <th className="border border-black px-2 py-1 text-left">Jabatan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ket.daftarPegawaiPusaka.map((peg, idx) => (
                      <tr key={peg.id || idx}>
                        <td className="border border-black px-2 py-1 text-center">{idx + 1}.</td>
                        <td className="border border-black px-2 py-1 font-semibold">{peg.nama}</td>
                        <td className="border border-black px-2 py-1">{peg.nip || '-'}</td>
                        <td className="border border-black px-2 py-1">{peg.jabatan || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {ket.tujuanKeterangan ? (
              ket.tujuanKeterangan
                .split('\n')
                .filter((p) => p.trim().length > 0)
                .map((paragraph, idx) => (
                  <p key={idx} className="mt-2">{paragraph}</p>
                ))
            ) : (
              <p className="mt-2">
                Demikian surat pemberitahuan ini kami sampaikan untuk digunakan sebagai keterangan gangguan absensi pada waktu yang dimaksud.
              </p>
            )}
          </div>
        </div>
      );
    }

    const ketSubtitle = getKeteranganSubtitle(ket.subJenis, ket.judulKeteranganCustom);
    const activePernyataan =
      ket.isiKeteranganTambahan && ket.isiKeteranganTambahan.trim()
        ? ket.isiKeteranganTambahan
        : getKeteranganDefaultPernyataan(ket.subJenis);
    const activeTujuan =
      ket.tujuanKeterangan && ket.tujuanKeterangan.trim()
        ? ket.tujuanKeterangan
        : getKeteranganDefaultTujuan(ket.subJenis);

    return (
      <div className="space-y-4 text-justify text-[11pt] leading-[1.6]">
        {/* Title */}
        <div className="text-center my-3">
          <h2 className="text-[14pt] font-bold uppercase tracking-wider underline">
            SURAT KETERANGAN
          </h2>
          {ketSubtitle && (
            <p className="text-[10.5pt] font-bold uppercase tracking-wide mt-0.5 text-slate-800">
              {ketSubtitle}
            </p>
          )}
          <p className="text-[11pt] font-semibold mt-0.5">
            Nomor : {ket.nomorSurat || 'B-    /MTs.21.07.03/PP.00.4/09/2026'}
          </p>
        </div>

        <p className="indent-8">
          Yang bertanda tangan di bawah ini, Kepala {madrasah.unitKerja}, dengan ini menerangkan dengan sesungguhnya bahwa:
        </p>

        {/* Data Subjek (Siswa / Pegawai / Alumni) */}
        {ket.subJenis === 'penghasilan_guru' ? (
          <div className="grid grid-cols-[160px_16px_1fr] gap-y-1.5 pl-8 my-3">
            <span className="font-medium">Nama Lengkap</span>
            <span>:</span>
            <span className="font-bold">{ket.namaPegawai || 'Dra. Hj. Maryam, M.Pd.'}</span>

            <span className="font-medium">NIP</span>
            <span>:</span>
            <span>{ket.nipPegawai || '197605122002122001'}</span>

            <span className="font-medium">Pangkat / Golongan</span>
            <span>:</span>
            <span>{ket.pangkatGolPegawai || 'Pembina (IV/a)'}</span>

            <span className="font-medium">Jabatan</span>
            <span>:</span>
            <span>{ket.jabatanPegawai || 'Guru Ahli Madya'}</span>

            <span className="font-medium">Unit Kerja</span>
            <span>:</span>
            <span>{madrasah.unitKerja}</span>

            <span className="font-medium">Penghasilan / Gaji</span>
            <span>:</span>
            <span className="font-bold">{ket.gajiPokok || 'Rp 3.550.000,-'}</span>
          </div>
        ) : (
          <div className="grid grid-cols-[160px_16px_1fr] gap-y-1.5 pl-8 my-3">
            <span className="font-medium">Nama Lengkap</span>
            <span>:</span>
            <span className="font-bold">{ket.namaSiswa}</span>

            <span className="font-medium">
              {ket.nisn && ket.nisLocal
                ? 'NISN / NIS'
                : ket.nisLocal
                ? 'NIS'
                : 'NISN / NIS'}
            </span>
            <span>:</span>
            <span>
              {ket.nisn && ket.nisLocal
                ? `${ket.nisn} / ${ket.nisLocal}`
                : ket.nisn || ket.nisLocal || '-'}
            </span>

            <span className="font-medium">Tempat, Tanggal Lahir</span>
            <span>:</span>
            <span>{ket.tempatTglLahir}</span>

            <span className="font-medium">Jenis Kelamin</span>
            <span>:</span>
            <span>{ket.jenisKelamin}</span>

            {ket.subJenis === 'tidak_terbit_skhu' ? (
              <>
                <span className="font-medium">Tahun Kelulusan</span>
                <span>:</span>
                <span className="font-semibold">{ket.tahunLulus || '2023/2024'}</span>

                {ket.nomorIjazah && (
                  <>
                    <span className="font-medium">Nomor Seri Ijazah</span>
                    <span>:</span>
                    <span className="font-mono font-medium">{ket.nomorIjazah}</span>
                  </>
                )}
              </>
            ) : ket.subJenis === 'lulus' ? (
              <>
                <span className="font-medium">Kelas Terakhir</span>
                <span>:</span>
                <span>{ket.kelas || 'IX (Sembilan)'}</span>

                <span className="font-medium">Tahun Kelulusan</span>
                <span>:</span>
                <span className="font-semibold">{ket.tahunLulus || '2025/2026'}</span>
              </>
            ) : (
              <>
                <span className="font-medium">Kelas / Jurusan</span>
                <span>:</span>
                <span>{ket.kelas} {ket.jurusan ? `(${ket.jurusan})` : ''}</span>
              </>
            )}

            <span className="font-medium">Nama Orang Tua / Wali</span>
            <span>:</span>
            <span>{ket.namaOrtu}</span>

            <span className="font-medium">Alamat</span>
            <span>:</span>
            <span>{ket.alamatSiswa}</span>
          </div>
        )}

        {/* Pernyataan */}
        <div className="space-y-2">
          {activePernyataan
            .split('\n')
            .filter((p) => p.trim().length > 0)
            .map((paragraph, idx) => (
              <p key={idx} className="indent-8 text-justify">
                {paragraph}
              </p>
            ))}
        </div>

        <p className="indent-8">
          Surat keterangan ini diberikan kepada yang bersangkutan untuk keperluan:{' '}
          <strong className="underline">{activeTujuan}</strong>
        </p>

        <p className="indent-8">
          Demikian surat keterangan ini dibuat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya.
        </p>
      </div>
    );
  };

  const renderRekomendasi = () => {
    const rek = state.rekomendasi;
    return (
      <div className="space-y-4 text-justify text-[10.5pt] sm:text-[11pt] leading-[1.6]">
        <div className="text-center my-3">
          <h2 className="text-[13pt] sm:text-[14pt] font-bold uppercase tracking-wider underline">
            SURAT REKOMENDASI
          </h2>
          <p className="text-[10.5pt] sm:text-[11pt] font-semibold mt-0.5">
            Nomor : {rek.nomorSurat || 'B-    /Ma.21.14/PP.00.2/09/2026'}
          </p>
        </div>

        <p className="indent-8">
          Yang bertanda tangan di bawah ini, Kepala {madrasah.unitKerja}, dengan ini memberikan rekomendasi kepada:
        </p>

        <div className="pl-6 space-y-3">
          {rek.personelList.map((p, idx) => (
            <div key={p.id || idx} className="grid grid-cols-[140px_16px_1fr] gap-y-1">
              <span className="font-medium">Nama</span>
              <span>:</span>
              <span className="font-bold">{p.nama}</span>

              <span className="font-medium">NIP / NISN</span>
              <span>:</span>
              <span>{p.nip}</span>

              <span className="font-medium">Kelas / Jabatan</span>
              <span>:</span>
              <span>{p.pangkatGol} ({p.jabatan})</span>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-3">
          <div className="w-28 shrink-0 font-medium">Untuk Keperluan</div>
          <div className="w-3 shrink-0 text-center">:</div>
          <div className="flex-1 font-bold">
            {rek.tujuanRekomendasi}
          </div>
        </div>

        <p className="indent-8">
          {rek.alasanRekomendasi}
        </p>

        <p className="indent-8">
          {rek.klausulPenutup || 'Demikian surat rekomendasi ini diberikan dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.'}
        </p>
      </div>
    );
  };

  const renderPengantar = () => {
    const sp = state.pengantar;
    return (
      <div className="space-y-4 text-justify text-[10.5pt] sm:text-[11pt] leading-[1.6]">
        {/* Identitas Surat Pengantar */}
        <div className="flex justify-between items-start">
          <div>
            <div className="flex">
              <span className="w-24 font-medium">Nomor</span>
              <span className="w-4">:</span>
              <span>{sp.nomorSurat || 'B-    /Ma.21.14/PP.00.8/09/2026'}</span>
            </div>
            <div className="flex">
              <span className="w-24 font-medium">Lampiran</span>
              <span className="w-4">:</span>
              <span>1 (satu) Berkas</span>
            </div>
            <div className="flex">
              <span className="w-24 font-medium">Hal</span>
              <span className="w-4">:</span>
              <span className="font-bold underline">SURAT PENGANTAR</span>
            </div>
          </div>

          <div className="text-right text-[10pt] sm:text-[10.5pt]">
            <p>{penandatangan.tempatPenetapan || madrasah.kabupatenKota}, {formatIndoDate(penandatangan.tanggalPenetapan)}</p>
          </div>
        </div>

        <div className="pt-2">
          <p className="font-medium">Kepada Yth.</p>
          <div className="pl-4 font-semibold whitespace-pre-line">
            {sp.tujuanYth}
            <p>{sp.alamatTujuan}</p>
          </div>
        </div>

        <p className="indent-8">
          Bersama ini kami kirimkan naskah dinas / berkas sebagaimana tercantum dalam tabel di bawah ini:
        </p>

        {/* Tabel Berkas */}
        <table className="w-full border-collapse border border-black text-[9.5pt] sm:text-[10pt] my-2">
          <thead>
            <tr className="bg-neutral-100 font-bold text-center">
              <th className="border border-black px-2 py-1.5 w-10">No.</th>
              <th className="border border-black px-2 py-1.5">Jenis Naskah Dinas / Berkas yang Dikirimkan</th>
              <th className="border border-black px-2 py-1.5 w-28">Banyaknya</th>
              <th className="border border-black px-2 py-1.5 w-48">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {sp.daftarBerkas.map((item, idx) => (
              <tr key={item.id || idx}>
                <td className="border border-black px-2 py-1 text-center align-top">{idx + 1}.</td>
                <td className="border border-black px-2 py-1 align-top font-medium">{item.naskah}</td>
                <td className="border border-black px-2 py-1 text-center align-top">{item.banyaknya}</td>
                <td className="border border-black px-2 py-1 align-top text-[9pt]">{item.keterangan}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="indent-8">
          Demikian untuk maklum dan atas perhatian serta kerjasamanya kami ucapkan terima kasih.
        </p>
      </div>
    );
  };

  const renderIzinDispensasi = () => {
    const iz = state.izinDispensasi;
    const isCutiOrIzinPegawai =
      iz.subJenis &&
      ['cuti_tahunan', 'cuti_sakit', 'cuti_alasan_penting', 'cuti_melahirkan', 'cuti_besar', 'izin_tidak_masuk'].includes(
        iz.subJenis
      );

    if (isCutiOrIzinPegawai) {
      const getTitle = () => {
        switch (iz.subJenis) {
          case 'cuti_tahunan':
            return 'SURAT IZIN CUTI TAHUNAN';
          case 'cuti_sakit':
            return 'SURAT IZIN CUTI SAKIT';
          case 'cuti_alasan_penting':
            return 'SURAT IZIN CUTI KARENA ALASAN PENTING';
          case 'cuti_melahirkan':
            return 'SURAT IZIN CUTI MELAHIRKAN';
          case 'cuti_besar':
            return 'SURAT IZIN CUTI BESAR';
          case 'izin_tidak_masuk':
            return 'SURAT IZIN TIDAK MASUK KERJA';
          default:
            return 'SURAT IZIN CUTI';
        }
      };

      const nama = iz.namaPegawai || (iz.personelList[0]?.nama) || 'Drs. H. Muhammad Arifin, M.Pd.';
      const nip = iz.nipPegawai || (iz.personelList[0]?.nip) || '-';
      const pangkatGol = iz.pangkatGolPegawai || (iz.personelList[0]?.pangkatGol) || '-';
      const jabatan = iz.jabatanPegawai || (iz.personelList[0]?.jabatan) || 'Guru Madya';
      const unit = madrasah.unitKerja || iz.unitKerjaPegawai || 'Madrasah';

      return (
        <div className="space-y-2.5 sm:space-y-3 text-justify text-[10pt] sm:text-[10.5pt] leading-[1.45]">
          {/* Title & Number */}
          <div className="text-center my-1.5">
            <h2 className="text-[12.5pt] sm:text-[13.5pt] font-bold uppercase tracking-wide underline">
              {getTitle()}
            </h2>
            <p className="text-[10pt] sm:text-[10.5pt] font-semibold mt-0.5 tracking-tight">
              Nomor : {iz.nomorSurat || 'B-    /Ma.21.14/KP.08.1/09/2026'}
            </p>
          </div>

          <p className="indent-8">
            Diberikan {iz.jenisCuti || 'Cuti Tahunan'} kepada Pegawai Negeri Sipil / Tenaga Pendidik pada {madrasah.unitKerja}:
          </p>

          {/* Identity Block */}
          <div className="space-y-0.5 pl-4 sm:pl-6 text-[9.5pt] sm:text-[10pt]">
            <div className="flex">
              <span className="w-36 sm:w-40 font-medium">Nama</span>
              <span className="w-3">:</span>
              <span className="font-bold">{nama}</span>
            </div>
            <div className="flex">
              <span className="w-36 sm:w-40 font-medium">NIP</span>
              <span className="w-3">:</span>
              <span>{nip}</span>
            </div>
            <div className="flex">
              <span className="w-36 sm:w-40 font-medium">Pangkat / Gol. Ruang</span>
              <span className="w-3">:</span>
              <span>{pangkatGol}</span>
            </div>
            <div className="flex">
              <span className="w-36 sm:w-40 font-medium">Jabatan</span>
              <span className="w-3">:</span>
              <span>{jabatan}</span>
            </div>
            <div className="flex">
              <span className="w-36 sm:w-40 font-medium">Satuan Kerja</span>
              <span className="w-3">:</span>
              <span>{unit}</span>
            </div>
            {iz.masaKerja && (
              <div className="flex">
                <span className="w-36 sm:w-40 font-medium">Masa Kerja</span>
                <span className="w-3">:</span>
                <span>{iz.masaKerja}</span>
              </div>
            )}
          </div>

          <p className="indent-8">
            Terhitung mulai tanggal{' '}
            <span className="font-semibold">
              {iz.tanggalMulai ? formatIndoDate(iz.tanggalMulai) : '14 September 2026'}
            </span>{' '}
            sampai dengan tanggal{' '}
            <span className="font-semibold">
              {iz.tanggalSelesai ? formatIndoDate(iz.tanggalSelesai) : '17 September 2026'}
            </span>{' '}
            selama <span className="font-semibold">{iz.lamanyaCuti || '4 (empat) hari kerja'}</span>, dengan ketentuan sebagai berikut:
          </p>

          {/* Rincian & Ketentuan Cuti */}
          <div className="space-y-1 pl-4 sm:pl-6 text-[9.5pt] sm:text-[10pt]">
            <div className="flex items-start gap-1.5">
              <span className="shrink-0 font-medium">1.</span>
              <div className="flex-1">
                <span>Alasan / Keperluan: </span>
                <span className="font-medium">{iz.alasanCuti || 'Menjalankan hak cuti untuk keperluan keluarga.'}</span>
              </div>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="shrink-0 font-medium">2.</span>
              <div className="flex-1">
                <span>Alamat & Kontak selama cuti: </span>
                <span>{iz.alamatSelamaCuti || 'Sesuai domisili keluarga'}</span>
                {iz.teleponSelamaCuti && <span> (No. HP/WA: {iz.teleponSelamaCuti})</span>}
              </div>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="shrink-0 font-medium">3.</span>
              <div className="flex-1">
                <span>
                  {iz.catatanCuti ||
                    'Setelah berakhir jangka waktu cuti tersebut, yang bersangkutan wajib melaporkan diri kembali kepada Kepala Madrasah dan bekerja kembali sebagaimana mestinya.'}
                </span>
              </div>
            </div>
          </div>

          <p className="indent-8 pt-0.5">
            Demikian surat izin cuti ini diberikan kepada yang bersangkutan untuk dapat dipergunakan sebagaimana mestinya.
          </p>
        </div>
      );
    }

    // Default: Dispensasi Kegiatan / Lomba Siswa & Guru
    return (
      <div className="space-y-2.5 sm:space-y-3 text-justify text-[10pt] sm:text-[10.5pt] leading-[1.45]">
        <div className="text-center my-1.5">
          <h2 className="text-[12.5pt] sm:text-[13.5pt] font-bold uppercase tracking-wide underline">
            SURAT DISPENSASI / IZIN
          </h2>
          <p className="text-[10pt] sm:text-[10.5pt] font-semibold mt-0.5">
            Nomor : {iz.nomorSurat || 'B-    /Ma.21.14/PP.00.2/09/2026'}
          </p>
        </div>

        <p className="indent-8">
          Yang bertanda tangan di bawah ini, Kepala {madrasah.unitKerja}, memberikan izin / dispensasi kepada:
        </p>

        <table className="w-full border-collapse border border-black text-[9pt] sm:text-[9.5pt] my-1">
          <thead>
            <tr className="bg-neutral-100 font-bold text-center">
              <th className="border border-black px-1.5 py-0.5 w-7">No.</th>
              <th className="border border-black px-1.5 py-0.5">Nama Lengkap</th>
              <th className="border border-black px-1.5 py-0.5 w-28">NISN / NIP</th>
              <th className="border border-black px-1.5 py-0.5 w-36">Kelas / Tugas</th>
            </tr>
          </thead>
          <tbody>
            {iz.personelList.map((p, idx) => (
              <tr key={p.id || idx}>
                <td className="border border-black px-1.5 py-0.5 text-center align-top">{idx + 1}.</td>
                <td className="border border-black px-1.5 py-0.5 align-top font-bold">{p.nama}</td>
                <td className="border border-black px-1.5 py-0.5 text-center align-top">{p.nip}</td>
                <td className="border border-black px-1.5 py-0.5 align-top">{p.pangkatGol} ({p.jabatan})</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="indent-8">
          {iz.alasanDispensasi}
        </p>

        <div className="grid grid-cols-[130px_12px_1fr] gap-y-0.5 pl-6 my-1 text-[9.5pt] sm:text-[10pt]">
          <span className="font-medium">Nama Kegiatan</span>
          <span>:</span>
          <span className="font-bold">{iz.namaKegiatan}</span>

          <span className="font-medium">Waktu Kegiatan</span>
          <span>:</span>
          <span>{iz.waktuKegiatan}</span>

          <span className="font-medium">Tempat Kegiatan</span>
          <span>:</span>
          <span>{iz.tempatKegiatan}</span>

          <span className="font-medium">Penyelenggara</span>
          <span>:</span>
          <span>{iz.penyelenggara}</span>
        </div>

        <p className="indent-8 pt-0.5">
          Demikian surat dispensasi ini diberikan agar dapat dipergunakan sebagaimana mestinya.
        </p>
      </div>
    );
  };

  const isRapat = madrasah.contentDensity === 'rapat';

  const renderSignatureBlock = (isLampiran: boolean = false) => (
    <div className={`avoid-break signature-block ${isRapat ? 'mt-2.5 sm:mt-3 pt-0.5' : 'mt-4 sm:mt-5 pt-1'}`}>
      <div className="flex justify-between items-start gap-3">
        {/* Tembusan on Left (only on main letter) */}
        <div className="w-1/2 text-[8.5pt] sm:text-[9pt] leading-tight">
          {!isLampiran && penandatangan.tembusanList && penandatangan.tembusanList.length > 0 && (
            <div className="space-y-0.5">
              <p className="font-semibold underline">Tembusan Yth :</p>
              <ol className="list-decimal pl-4 space-y-0.5 text-neutral-800">
                {penandatangan.tembusanList.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* Signature Block on Right */}
        <div className="w-1/2 max-w-[270px] ml-auto text-left text-[9.5pt] sm:text-[10pt] relative">
          {/* Date of Document */}
          <p>
            {penandatangan.tempatPenetapan || madrasah.kabupatenKota || 'Jeneponto'},{' '}
            {formatIndoDate(penandatangan.tanggalPenetapan)}
          </p>

          {/* Official Title */}
          <p className="font-bold mt-0.5 uppercase">
            {penandatangan.statusJabatan && penandatangan.statusJabatan !== 'Definitif'
              ? `${penandatangan.statusJabatan} `
              : ''}
            {penandatangan.jabatan || 'Kepala Madrasah'},
          </p>

          {/* Signature Area (Manual space OR QR Code Electronic Signature) */}
          <div className={`my-1 ${isRapat ? 'min-h-[44px]' : 'min-h-[58px]'} flex items-center justify-start gap-2.5 relative`}>
            {penandatangan.showQrcode ? (
              <div className="flex items-center gap-2 p-1 border border-emerald-800/30 rounded bg-emerald-50/40 text-[7pt] leading-tight">
                {/* Official Kemenag QR Code with Kemenag Logo Center */}
                <div className="w-14 h-14 shrink-0 bg-white border border-neutral-300 p-0.5 flex items-center justify-center shadow-xs">
                  <KemenagTteQr
                    className="w-full h-full"
                    customImageUrl={penandatangan.customSignatureUrl}
                  />
                </div>
                <div className="text-neutral-700">
                  <p className="font-bold text-emerald-900 uppercase text-[7.5pt]">TTE Kemenag RI</p>
                  <p className="line-clamp-2">Ditandatangani secara elektronik bersertifikat BSrE</p>
                </div>
              </div>
            ) : penandatangan.customSignatureUrl ? (
              <div className={`${isRapat ? 'h-11' : 'h-14'} w-32 flex items-center justify-start`}>
                <img
                  src={penandatangan.customSignatureUrl}
                  alt="Tanda Tangan"
                  className="max-h-full max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div className={`${isRapat ? 'h-11' : 'h-14'} w-full`} />
            )}

            {/* Simulated Official Kemenag Rubber Stamp if enabled */}
            {penandatangan.showStempel && (
              <div className="absolute left-[-20px] top-[-8px] w-22 h-22 rounded-full border-2 border-dashed border-violet-800/70 opacity-80 pointer-events-none flex flex-col items-center justify-center text-violet-800 text-[6pt] font-bold text-center leading-none uppercase rotate-[-12deg] select-none">
                <div className="border border-violet-800/50 rounded-full w-18 h-18 p-1 flex flex-col items-center justify-center">
                  <span className="text-[5pt] tracking-tighter">KEMENTERIAN AGAMA</span>
                  <span className="text-[6.5pt] my-0.5 text-violet-900 font-extrabold">
                    {madrasah.kabupatenKota || 'KAB. JENEPONTO'}
                  </span>
                  <span className="text-[4.5pt]">
                    {madrasah.unitKerja ? madrasah.unitKerja.split(' ')[0] : 'MADRASAH'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Official Name & NIP */}
          <div className="font-bold uppercase tracking-tight underline">
            {penandatangan.nama || 'Dr. H. Sudirman, S.Ag., M.Pd.I.'}
          </div>
          <div className="text-[9pt] text-neutral-800">
            NIP. {penandatangan.nip || '197204151998031003'}
          </div>
          {penandatangan.pangkatGol && (
            <div className="text-[8pt] text-neutral-700">
              {penandatangan.pangkatGol}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const hasSkLampiran =
    jenisSurat === 'sk' &&
    state.sk.hasLampiran &&
    state.sk.lampiranPegawaiList &&
    state.sk.lampiranPegawaiList.length > 0;

  const getPagePrintSize = () => {
    switch (madrasah.paperSize) {
      case 'f4':
        return '215mm 330mm';
      case 'letter':
        return '215.9mm 279.4mm';
      case 'a4':
      default:
        return '210mm 297mm';
    }
  };

  return (
    <div
      id="document-printable"
      className={`print-area ${getFontClass()} text-black space-y-6 print:space-y-0`}
    >
      {/* Dynamic @page paper size rule to force browser print to exact paper boundaries */}
      <style>{`
        @media print {
          @page {
            size: ${getPagePrintSize()};
            margin: 0mm;
          }
        }
      `}</style>

      {/* PAGE 1: Lembar Utama Surat */}
      <div
        className={`sheet-page pdf-page ${getPaperClass()} ${getMarginClass()} relative bg-white transition-all mx-auto`}
      >
        {/* Watermark Draft if enabled */}
        {showWatermark && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center select-none z-0 opacity-10">
            <span className="text-[72pt] font-black text-neutral-400 rotate-[-35deg] tracking-widest uppercase">
              DRAF RESMI
            </span>
          </div>
        )}

        {/* Main Container Content - Page 1 */}
        <div className="relative z-10 flex flex-col">
          <div>
            {/* Header / Kop Madrasah (Dikecualikan pada KP4 jika mode tanpa kop aktif dan Diri Siswa sesuai format baku berlogo tengah) */}
            {!(
              jenisSurat === 'keterangan' &&
              ((state.keterangan.subJenis === 'kp4' && state.keterangan.hideKopSuratKP4 !== false) ||
                (state.keterangan.subJenis === 'diri_siswa' && state.keterangan.hideKopDiriSiswa !== false))
            ) && (
              <KopSuratView config={madrasah} />
            )}

            {/* Letter Body by Type */}
            <div className={isRapat ? 'mt-1.5' : 'mt-2'}>
              {jenisSurat === 'surat_tugas' && renderSuratTugas()}
              {jenisSurat === 'sk' && renderSK()}
              {jenisSurat === 'undangan' && renderUndangan()}
              {jenisSurat === 'keterangan' && renderKeterangan()}
              {jenisSurat === 'rekomendasi' && renderRekomendasi()}
              {jenisSurat === 'pengantar' && renderPengantar()}
              {jenisSurat === 'izin_dispensasi' && renderIzinDispensasi()}
            </div>
          </div>

          {/* Signature & Tembusan Block for Page 1 (Ditiadakan pada KP4 dan Diri Siswa karena telah memiliki blok tanda tangan khusus di badan formulir) */}
          {!(
            jenisSurat === 'keterangan' &&
            (state.keterangan.subJenis === 'kp4' || state.keterangan.subJenis === 'diri_siswa')
          ) && (
            <div className="mt-8">
              {renderSignatureBlock(false)}
            </div>
          )}
        </div>
      </div>

      {/* PAGE 2: Lampiran SK (jika ada) */}
      {hasSkLampiran && (
        <div
          className={`sheet-page pdf-page ${getPaperClass()} ${getMarginClass()} relative bg-white transition-all mx-auto break-before-page print:break-before-page`}
        >
          {/* Screen-only page indicator badge */}
          <div className="no-print absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-800 text-white text-[10px] font-bold px-3 py-0.5 rounded-full shadow-xs flex items-center gap-1">
            <span>Halaman 2: Lampiran Keputusan</span>
          </div>

          <div className="relative z-10 flex flex-col">
            <div>
              {renderLampiranContent()}
            </div>
            <div className="mt-8">
              {renderSignatureBlock(true)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
