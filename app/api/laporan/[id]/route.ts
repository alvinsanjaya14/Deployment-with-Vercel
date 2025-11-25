import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const resolvedParams = await params; 
    const id = parseInt(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 });
    }

    const laporan = await prisma.laporan.findUnique({
      where: { id: id },
    });

    if (!laporan) {
      return NextResponse.json({ error: 'Laporan tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json(laporan);
  } catch (error) {
    console.error("ERROR GET LAPORAN:", error); 
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    const body = await request.json();
    const { judul, isiLaporan } = body;

    const updatedLaporan = await prisma.laporan.update({
      where: { id: id },
      data: { judul, isiLaporan },
    });

    return NextResponse.json(updatedLaporan);
  } catch (error) {
    console.error("ERROR UPDATE LAPORAN:", error);
    return NextResponse.json({ error: 'Gagal update data' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const resolvedParams = await params; 
    const id = parseInt(resolvedParams.id);

    await prisma.laporan.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: 'Deleted' }, { status: 200 });
  } catch (error) {
    console.error("ERROR DELETE LAPORAN:", error);
    return NextResponse.json({ error: 'Gagal hapus data' }, { status: 500 });
  }
}