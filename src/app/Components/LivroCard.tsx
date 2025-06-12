import Link from 'next/link';
import { Livro } from '@/app/types/Livro';

// Recebe os dados do livro e a função para deletar pelo ID
type LivroCardProps = Livro & {
  onDelete: (id: string) => void;
};

export default function LivroCard({ id, titulo, autor, genero, ano, onDelete }: LivroCardProps) {
  return (
    <li className="border rounded p-6 shadow-md hover:shadow-lg transition flex flex-col w-full">
      <h2 className="text-2xl font-semibold mb-4">{titulo}</h2>
      <p className="text-lg mb-1"><strong>Autor:</strong> {autor}</p>
      <p className="text-lg mb-1"><strong>Gênero:</strong> {genero ?? 'Não informado'}</p>
      <p className="text-lg mb-5"><strong>Ano:</strong> {ano}</p>


      <div className="flex justify-between mt-auto">
        <Link
          href={`/livros/${id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Ver detalhes
        </Link>

        <button
          onClick={() => onDelete(id)}
          className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-700 transition"
          type="button"
        >
          Excluir
        </button>
      </div>
    </li>
  );
}
