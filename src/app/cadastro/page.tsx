'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import { Livro } from '@/app/types/Livro';


export default function CadastroPage() {
    const router = useRouter();

    // Estados dos campos do formulário
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [genero, setGenero] = useState('');
    const [ano, setAno] = useState('');
    const [erro, setErro] = useState('');

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!titulo || !autor || !ano) {
            setErro('Preencha todos os campos obrigatórios.');
            return;
        }

        if (ano.length !== 4) {
            setErro('Informe um ano com 4 dígitos.')
            return;
        }

        // Cria um novo livro com ID único
        const novoLivro: Livro = {
            id: uuidv4(),
            titulo,
            autor,
            genero: genero || undefined,
            ano: Number(ano),
        };

        // Recupera e atualiza a lista de livros no localStorage
        const livrosExistentes = localStorage.getItem('livros');
        const listaLivros = livrosExistentes ? JSON.parse(livrosExistentes) : [];

        listaLivros.push(novoLivro);

        localStorage.setItem('livros', JSON.stringify(listaLivros));

        router.push('/');

    }

    return (
        <main className="max-w-xl mx-auto p-6">
            <h1 className="text-3xl font-sans font-bold mb-4">Cadastrar novo Livro</h1>

            {erro && <p className="text-red-600 font-bold mb-3">{erro}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="titulo" className="block mb-1 text-lg font-semibold">Título *</label>
                    <input
                        id="titulo"
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required />
                </div>

                <div>
                    <label htmlFor="autor" className="block mb-1 text-lg font-semibold">Autor *</label>
                    <input
                        id="autor"
                        type="text"
                        value={autor}
                        onChange={(e) => setAutor(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required />
                </div>

                <div>
                    <label htmlFor="genero" className="block mb-1 text-lg font-semibold">Gênero</label>
                    <input
                        id="genero"
                        type="text"
                        value={genero}
                        onChange={(e) => setGenero(e.target.value)}
                        className="w-full border px-3 py-2 rounded" />
                </div>

                <div>
                    <label htmlFor="ano" className="block mb-1 text-lg font-semibold">Ano de publicação *</label>
                    <input
                        id="ano"
                        type="number"
                        value={ano}
                        onChange={(e) => setAno(e.target.value)}
                        className="w-full border px-3 py-2 rounded appearance-none 
                        [&::-webkit-inner-spin-button]:appearance-none
                        [&::-webkit-outer-spin-button]:appearance-none"
                        required />
                </div>
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer">
                        Salvar
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push('/')}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition cursor-pointer">
                        Voltar
                    </button>
                </div>
            </form>
        </main>
    );
}