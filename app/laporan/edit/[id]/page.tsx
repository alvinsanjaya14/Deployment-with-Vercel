"use client";

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';

export default function EditLaporanPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params); 
  const id = resolvedParams.id;

  const [judul, setJudul] = useState('');
  const [isiLaporan, setIsiLaporan] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    console.log("Fetching ID:", id);

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/laporan/${id}`);
        
        if (!res.ok) {
          throw new Error(`Gagal fetch: ${res.status}`);
        }

        const data = await res.json();
        
        if (data) {
          setJudul(data.judul);
          setIsiLaporan(data.isiLaporan);
        } else {
          alert("Data tidak ditemukan di database");
        }
      } catch (error) {
        console.error("Error loading data:", error);
        alert("Gagal memuat data laporan.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/laporan/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ judul, isiLaporan }),
      });

      if (!res.ok) throw new Error('Gagal update');

      router.push('/laporan');
      router.refresh(); 
    } catch (error) {
      alert("Gagal mengupdate data");
    }
  };

  if (loading) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5" style={{ maxWidth: '700px' }}>
      <h2>Edit Laporan</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Judul Laporan</label>
          <input
            type="text"
            className="form-control"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Isi Laporan</label>
          <textarea
            className="form-control"
            rows={5}
            value={isiLaporan}
            onChange={(e) => setIsiLaporan(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-success">Update Laporan</button>
      </form>
    </div>
  );
}