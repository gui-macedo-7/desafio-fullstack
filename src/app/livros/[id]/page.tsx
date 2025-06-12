'use client'

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Livro } from '@/app/types/Livro';


export default function DetalhesPage() {
    const { id } = useParams();
    const router = useRouter();
    const [livro, setLivro] = useState<Livro | null>(null);

    useEffect(() => {
        const livrosStorage = localStorage.getItem('livros');
        if (livrosStorage) {
            const listaLivros: Livro[] = JSON.parse(livrosStorage);
            const livroEncontrado = listaLivros.find((livro) => livro.id === id);
            if (livroEncontrado) {
                setLivro(livroEncontrado);
            }
        }
    }, [id]);


    // Verifica se o livro com o ID informado existe. Se não existir, mostra mensagem de erro.
    if (!livro) {
        return (
            <main className="max-w-xl mx-auto p-6">
                <p className="text-red-600">Livro não encontrado.</p>
                <button
                    onClick={() => router.push('/')}
                    className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition cursor-pointer">
                    Voltar
                </button>
            </main>
        );
    }

    // Exibe detalhes do livro
    return (
        <main className="max-w-xl mx-auto p-6">
            <h1 className="text-3xl font-sans font-bold mb-4">Detalhes do Livro</h1>
            <p className="text-lg mb-2"><strong>Título: </strong>{livro.titulo}</p>
            <p className="text-lg mb-2"><strong>Autor: </strong>{livro.autor}</p>
            <p className="text-lg mb-2"><strong>Gênero: </strong>{livro.genero ?? 'Não informado'}</p>
            <p className="text-lg mb-2"><strong>Ano de publicação: </strong>{livro.ano}</p>

            <button
                onClick={() => router.push('/')}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition cursor-pointer">
                Voltar
            </button>
        </main>
    );
}