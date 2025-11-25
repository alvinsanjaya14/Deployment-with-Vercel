import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body text-center">
          <h1 className="card-title text-primary">Project Next.js: Website Pengaduan Masyarakat</h1>
          <h4 className="card-subtitle mb-2 text-muted">Alvin Sanjaya</h4>
          <p className="card-text fs-5">NIM: 535240115</p>
          <hr />
          <p className="card-text fs-4 fw-bold">
            Topik Project: Website Pengaduan Masyarakat
          </p>

          <Link href="/laporan" className="btn btn-primary btn-lg mt-4">
            Lihat Laporan
          </Link>
          
        </div>
      </div>
    </main>
  );
}