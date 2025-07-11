import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import type Categoria from "@/models/Categoria";
import { BallTriangle } from "react-loader-spinner";
import CardCategoria from "../cardcategoria/CardCategoria";
import AuthContext from "@/contexts/AuthContext/AuthContext";
import { buscar } from "@/services/Service";

function ListaCategoria() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarCategorias() {
    try {
      setIsLoading(true);

      await buscar("/categoria", setCategorias, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado para acessar essa página.");
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    buscarCategorias();
  }, [categorias.length]);

  return (
    <>
      <div className="flex justify-center items-center w-full my-4">
        <div className="container flex flex-col mx-2 justify-center items-center">
          {isLoading && (
            <BallTriangle
              color="#e64500"
              ariaLabel="ball-triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          )}

          {!isLoading && categorias.length === 0 && (
            <span className="text-3xl text-center my-8">
              Nenhuma categoria foi encontrada!
            </span>
          )}

          <div
            className="grid grid-cols-1 md:grid-cols-2
                                    lg:grid-cols-3 gap-8"
          >
            {categorias.map((categoria) => (
              <CardCategoria key={categoria.id} categoria={categoria} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaCategoria;
