import type Categoria from "@/models/Categoria";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../../ui/alert-dialog";
import { Button } from "../../ui/button";
import { TrashSimple } from "@phosphor-icons/react";
import { PencilSimple } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { deletar } from "@/service/Service";
import { AuthContext } from "@/contexts/AuthContext";
import { ToastAlerta } from "@/utils/ToastAlerta";
import { useContext, useState } from "react";

interface CardCategoriaProps {
  categoria: Categoria;
}

export default function CardCategoria({ categoria }: CardCategoriaProps) {
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;
  const [isLoading, setIsLoading] = useState(false);

  async function excluirCategoria() {
    setIsLoading(true);
    try {
      await deletar(`/categoria/${categoria.id}`, {
        headers: { Authorization: token },
      });
      ToastAlerta("Categoria excluída com sucesso!", "sucesso");
      window.location.reload();
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      if (msg.includes("401") || msg.includes("403")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao excluir a categoria!", "erro");
      }
    }
    setIsLoading(false);
  }

  return (
    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex">
        <CardTitle>{categoria.nome}</CardTitle>
      </CardHeader>

      <CardContent>
        <CardDescription className="flex text-left gap-2">
          <span className="font-bold">Descrição: </span>
          {categoria.descricao}
        </CardDescription>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Link to={`/editarcategorias/${categoria.id}`}>
          <Button className="bg-green-600 hover:bg-green-700 text-white flex gap-1 items-center">
            <PencilSimple size={20} />
            Editar
          </Button>
        </Link>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="bg-red-500 hover:bg-red-600 text-white flex gap-1 items-center">
              <TrashSimple size={20} />
              Excluir
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir categoria</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir <strong>{categoria.nome}</strong>
                ? Essa ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={excluirCategoria}
                disabled={isLoading}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                {isLoading ? "Excluindo..." : "Confirmar"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
