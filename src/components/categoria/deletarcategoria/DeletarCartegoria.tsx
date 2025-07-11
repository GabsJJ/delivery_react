import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Categoria from "@/models/Categoria";
import { ToastAlerta } from "@/utils/ToastAlerta";
import AuthContext from "@/contexts/AuthContext/AuthContext";
import { buscar, deletar } from "@/services/Service";

function DeletarCategoria() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarCategoriaPorId(id: string) {
    try {
      await buscar(`/categoria/${id}`, setCategoria);
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarCategoriaPorId(id);
    }
  }, [id]);

  async function deletarCategoria() {
    setIsLoading(true);

    try {
      await deletar(`/categoria/${id}`);

      ToastAlerta("Categoria excluída com sucesso!", "sucesso");
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao excluir a categoria!", "erro");
        console.error(error);
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/categorias");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-50 px-4">
      <Card className="w-full max-w-md border border-orange-200 shadow-md rounded-xl">
        <CardHeader>
          <CardTitle className="text-orange-600 text-center text-2xl">
            Excluir Categoria
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-gray-700 text-center mb-4">
            Você tem certeza que deseja excluir a categoria{" "}
            <span className="font-semibold">{categoria.nome}</span>?
          </p>
        </CardContent>

        <CardFooter className="flex justify-center gap-4">
          <Button
            className="bg-orange-600 hover:bg-orange-700 text-white"
            onClick={deletarCategoria}
            disabled={isLoading}
          >
            {isLoading ? "Excluindo..." : "Confirmar Exclusão"}
          </Button>

          <Button
            variant="outline"
            className="border-orange-600 text-orange-600 hover:bg-orange-100"
            onClick={retornar}
          >
            Cancelar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default DeletarCategoria;
