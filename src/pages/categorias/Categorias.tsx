import ListaCategoria from "@/components/listacategoria/ListaCategoria"
import { PlusIcon } from '@phosphor-icons/react'
import { Link } from "react-router-dom"

function Categorias() {
  return (
    <div className="mx-auto py-12 px-4 w-screen">
			<div className="container flex justify-between px-4">
        <h1 className="text-4xl font-bold text-gray-800">Categorias</h1>
        <Link
          to="/"
          className="
            bg-[#e54300] hover:bg-[#bf3700]
            text-white font-bold py-2 px-4 rounded-md 
            transition-colors
            flex items-center gap-2
        ">
          <PlusIcon size={20} color="#fafafa" />
          Nova Categoria
        </Link>
      </div>
      <ListaCategoria />
    </div>
  )
}

export default Categorias