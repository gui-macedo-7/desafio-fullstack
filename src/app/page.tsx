'use client';

import { useEffect, useState } from "react";
import Link from 'next/link';
import { Livro } from '@/app/types/Livro';
import LivroCard from '@/app/Components/LivroCard';

export default function HomePage() {
  const [livros, setLivros] = useState<Livro[]>([]);

  useEffect(() => {
    const livrosStorage = localStorage.getItem('livros');
    if (livrosStorage) {
      setLivros(JSON.parse(livrosStorage));
    }
  }, []);


  // Função para deletar livro
  function handleDelete(id: string) {
    const livrosAtualizados = livros.filter((livro) => livro.id !== id);
    setLivros(livrosAtualizados);
    localStorage.setItem('livros', JSON.stringify(livrosAtualizados));
  }
  

  return (
    <main className="max-w-5xl mx-auto p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="font-sans text-4xl font-bold">Biblioteca de Livros</h1>
        <Link
          href="/cadastro"
          className="bg-blue-600 text-white px-4 py-2 font-bold rounded"
        >
          📝 Cadastrar novo livro
        </Link>
      </header>


      {/* Se não houver livros cadastrado aparece uma mensagem indicando que não há livros */}
      {livros.length === 0 ? (
        <p className="text-gray-700">Nenhum livro cadastrado ainda.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {livros.map((livro) => (
            <LivroCard key={livro.id} {...livro} onDelete={handleDelete} />
          ))}
        </ul>
      )}
    </main>
  );
}
