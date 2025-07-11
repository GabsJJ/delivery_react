import ListaCategoria from "@/components/categoria/listacategoria/ListaCategoria";
import { Button } from "@/components/ui/button";
import { Plus } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

function Categorias() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-white px-6 py-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Gerenciar Categorias
          </h1>
          <Button
            onClick={() => navigate("/novacategoria")}
            className="bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-2 shadow-sm"
          >
            <Plus size={20} weight="bold" />
            Nova Categoria
          </Button>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <ListaCategoria />
        </div>
      </div>
    </main>
  );
}

export default Categorias;
