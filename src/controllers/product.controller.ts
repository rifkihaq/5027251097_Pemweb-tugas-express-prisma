import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: menampilkan seluruh data
export async function getProducts(req: Request, res: Response) {
  const products = await prisma.product.findMany();
  res.status(200).json(products);
}

// GET: menampilkan produk berdasarkan ID (untuk skenario tugas sebelumnya)
export async function getProductById(req: Request, res: Response) {
  const id = parseInt(req.params.id as string, 10);
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) return res.status(404).json({ message: 'produk tidak ditemukan' });
  res.status(200).json(product);
}

// POST: membuat data baru dengan validasi
export async function createProduct(req: Request, res: Response) {
  const { name, price } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ message: 'Kesalahan validasi: name dan price wajib diisi' });
  }
  const newProduct = await prisma.product.create({
    data: { name: String(name), price: Number(price) }
  });
  res.status(201).json(newProduct);
}

// PUT: mengupdate data yang sudah ada (berdasarkan id di body)
export async function updateProduct(req: Request, res: Response) {
  const { id, name, price } = req.body;
  if (!id || !name || price === undefined) {
    return res.status(400).json({ message: 'Kesalahan validasi: id, name, dan price wajib diisi' });
  }
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: { name: String(name), price: Number(price) }
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(404).json({ message: 'Data tidak ditemukan' });
  }
}

// DELETE: menghapus data berdasarkan parameter id
export async function deleteProduct(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    await prisma.product.delete({
      where: { id }
    });
    res.status(200).json({ message: 'Data berhasil dihapus' });
  } catch (error) {
    res.status(404).json({ message: 'Data tidak ditemukan' });
  }
}