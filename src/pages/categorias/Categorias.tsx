import ListaCategoria from "@/components/listacategoria/ListaCategoria"
import { Button } from "@/components/ui/button"
import { Plus } from '@phosphor-icons/react'

function Categorias() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-end px-4">
        <Button className="bg-orange-600 hover:bg-orange-800 transition duration-300">
          <Plus size={32} color="#fafafa" />
          Nova Categoria
        </Button>
      </div>
      <ListaCategoria />
    </div>
  )
}

export default Categorias