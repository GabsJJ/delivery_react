import ListaCategoria from "@/components/categoria/listacategoria/ListaCategoria";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

function Categorias() {
  const navigate = useNavigate();
  return (
    <main className="mx-auto py-12 px-6 w-full">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Gerenciar Categorias
          </h1>
          <Button
            onClick={() => navigate("/novacategoria")}
            className="bg-laranja-tema hover:bg-laranja-escuro text-white flex items-center gap-2 shadow-sm"
          >
            <PlusIcon size={20} weight="bold" />
            <p className="hidden md:flex">Nova Categoria</p>
          </Button>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <ListaCategoria />
        </div>
      </div>
    </main>
  )
}

export default Categorias;
