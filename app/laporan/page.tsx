import Link from 'next/link';
import { prisma } from '@/lib/prisma'; 
import DeleteButton from '@/app/components/DeleteButton';

type Laporan = {
  id: number;
  judul: string;
  isiLaporan: string | null;
  status: string;
  createdAt: Date;
};

async function getLaporan() {
  const laporan = await prisma.laporan.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return laporan;
}

export default async function LaporanListPage() {
  const laporanList = await getLaporan();

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Daftar Laporan Masuk</h2>
        <Link href="/laporan/create" className="btn btn-primary">
          Buat Laporan Baru
        </Link>
      </div>
      
      <div className="list-group">
        {laporanList.map((laporan) => (
          <div key={laporan.id} className="list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
              <Link href={`/laporan/${laporan.id}`} className="text-decoration-none text-dark w-100">
                <h5 className="mb-1">{laporan.judul}</h5>
              </Link>
              <span className={`badge bg-${laporan.status === 'Selesai' ? 'success' : 'warning'} text-dark`}>
                {laporan.status}
              </span>
            </div>
            <p className="mb-1">{laporan.isiLaporan?.substring(0, 150)}...</p>
            <small>{new Date(laporan.createdAt).toLocaleDateString('id-ID')}</small>
            
            <div className="mt-2 text-end">
              <Link href={`/laporan/edit/${laporan.id}`} className="btn btn-sm btn-outline-warning me-2">
                Edit
              </Link>
              
              <DeleteButton id={laporan.id} />
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}