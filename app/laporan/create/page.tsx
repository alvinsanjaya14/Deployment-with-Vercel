"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateLaporanPage() {
  const [judul, setJudul] = useState('');
  const [isiLaporan, setIsiLaporan] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch('/api/laporan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ judul, isiLaporan }),
    });

    router.push('/laporan');
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '700px' }}>
      <h2>Buat Laporan Pengaduan Baru</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="judul" className="form-label">Judul Laporan</label>
          <input
            type="text"
            className="form-control"
            id="judul"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            required
            placeholder="mis: Jalan Rusak di Depan..."
          />
        </div>
        <div className="mb-3">
          <label htmlFor="isiLaporan" className="form-label">Isi Laporan</label>
          <textarea
            className="form-control"
            id="isiLaporan"
            rows={5}
            value={isiLaporan}
            onChange={(e) => setIsiLaporan(e.target.value)}
            placeholder="Jelaskan detail laporan Anda di sini..."
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Kirim Laporan</button>
      </form>
    </div>
  );
}