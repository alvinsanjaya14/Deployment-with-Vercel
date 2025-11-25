import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const laporan = await prisma.laporan.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(laporan);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { judul, isiLaporan } = body;

  if (!judul || !isiLaporan) {
    return NextResponse.json(
      { error: 'Judul dan Isi Laporan tidak boleh kosong' },
      { status: 400 }
    );
  }

  const newLaporan = await prisma.laporan.create({
    data: {
      judul,
      isiLaporan,
    },
  });
  
  return NextResponse.json(newLaporan, { status: 201 });
}