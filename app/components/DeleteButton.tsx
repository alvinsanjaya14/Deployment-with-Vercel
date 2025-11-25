"use client"; 

import { useRouter } from 'next/navigation';

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = confirm("Apakah Anda yakin ingin menghapus laporan ini?");
    
    if (confirmDelete) {
      try {
        await fetch(`/api/laporan/${id}`, {
          method: 'DELETE',
        });
        
        router.refresh(); 
      } catch (error) {
        console.error("Gagal menghapus:", error);
        alert("Terjadi kesalahan saat menghapus data.");
      }
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      className="btn btn-sm btn-outline-danger"
    >
      Delete
    </button>
  );
}