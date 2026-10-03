import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not configured');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// AI Helper endpoint for drafting & polishing Madrasah Kemenag letters
app.post('/api/ai/draft-refine', async (req, res) => {
  try {
    const { type, prompt, context } = req.body;
    
    const ai = getGeminiClient();
    
    let systemInstruction = `Anda adalah asisten administrasi ahli Tata Naskah Dinas Kementerian Agama Republik Indonesia (PMA No. 12 Tahun 2026 / PMA No. 44 Tahun 2010).
Tugas Anda adalah membuat atau menyempurnakan draf naskah dinas madrasah (Surat Tugas, Surat Keputusan / SK, Surat Undangan, Surat Keterangan, Surat Rekomendasi) dengan bahasa birokrasi yang santun, lugas, presisi, baku, dan sesuai regulasi perundang-undangan pendidikan madrasah di Indonesia.

Keluarkan hasil dalam format JSON yang terstruktur dan rapi.`;

    let userPrompt = '';

    if (type === 'sk_konsideran') {
      userPrompt = `Buatkan konsideran Surat Keputusan (SK) Madrasah untuk perihal: "${prompt}".
Konteks Madrasah: ${context || 'Madrasah Aliyah / Tsanawiyah Negeri / Swasta di lingkungan Kemenag'}.
Berikan respon JSON dengan struktur:
{
  "tentang": "Judul tentang SK (huruf kapital)",
  "menimbang": ["poin a", "poin b", "poin c"],
  "mengingat": ["1. UU No...", "2. PP No...", "3. PMA No..."],
  "memperhatikan": ["Hasil rapat dewan guru..."],
  "diktum": [
    {"key": "KESATU", "title": "KESATU", "content": "isi ketetapan kesatu..."},
    {"key": "KEDUA", "title": "KEDUA", "content": "isi ketetapan kedua..."},
    {"key": "KETIGA", "title": "KETIGA", "content": "isi ketetapan ketiga..."}
  ]
}`;
    } else if (type === 'surat_tugas') {
      userPrompt = `Buatkan formulasi teks naskah Surat Tugas Madrasah untuk agenda: "${prompt}".
Konteks: ${context || 'Penugasan guru / tenaga kependidikan madrasah'}.
Berikan respon JSON dengan struktur:
{
  "perihal": "Perihal surat tugas",
  "maksudTugas": "Rumusan maksud dan tujuan tugas dinas secara lengkap dan formal",
  "bebanAnggaran": "Rekomendasi sumber pembiayaan (misal: DIPA Madrasah TA 2026 / DIPA BDK / Biaya Mandiri)",
  "klausulTambahan": "Setelah melaksanakan tugas agar menyampaikan laporan tertulis kepada Kepala Madrasah"
}`;
    } else if (type === 'undangan') {
      userPrompt = `Buatkan draf Surat Undangan Dinas Madrasah untuk kegiatan: "${prompt}".
Konteks: ${context || 'Rapat atau acara madrasah'}.
Berikan respon JSON dengan struktur:
{
  "hal": "Perihal undangan",
  "penerimaList": ["Bapak/Ibu Dewan Guru", "Komite Madrasah", "dst"],
  "acara": "Rincian susunan atau pokok bahasan agenda rapat",
  "catatan": "Catatan kehadiran atau kelengkapan yang harus dibawa"
}`;
    } else if (type === 'izin_dispensasi') {
      userPrompt = `Buatkan draf naskah Surat Izin / Cuti / Dispensasi Madrasah sesuai standar Kemenag & BKN untuk: "${prompt}".
Konteks: ${context || 'Pegawai / Guru / Siswa Madrasah'}.
Berikan respon JSON dengan struktur:
{
  "subJenis": "cuti_tahunan / cuti_alasan_penting / cuti_sakit / cuti_melahirkan / izin_tidak_masuk / dispensasi_kegiatan",
  "jenisCuti": "Nama jenis cuti / izin resmi",
  "perihal": "Perihal surat izin / cuti",
  "alasanCuti": "Rumusan alasan cuti atau izin secara formal dan jelas",
  "lamanyaCuti": "Durasi cuti (contoh: 4 (empat) hari kerja)",
  "catatanCuti": "Ketentuan kewajiban lapor kembali atau pelimpahan tugas pengajaran",
  "result": "Penjelasan ringkas draf surat"
}`;
    } else {
      userPrompt = `Bantu susun naskah dinas madrasah sesuai permintaan berikut: "${prompt}".
Konteks: ${context || 'Umum madrasah'}.
Berikan respon JSON dengan struktur:
{
  "result": "Teks naskah dinas yang rapi dan baku sesuai standar Kemenag"
}`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { result: text };
    }

    res.json({ success: true, data });
  } catch (error: any) {
    console.error('Gemini Draft Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Gagal menghasilkan draf dengan AI',
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server Madrasah Letter Generator running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
