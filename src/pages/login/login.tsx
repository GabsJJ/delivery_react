import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "@/contexts/AuthContext/AuthContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RotatingLines } from "react-loader-spinner";
import type UsuarioLogin from "@/models/UsuarioLogin";
import { Button } from "@/components/ui/button";
import './glass.css'
import { LImage } from "@/components/limage/LImage";

function Login() {
  const navigate = useNavigate();
  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  );
  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token !== "") {
      navigate("/home");
    }
  }, [usuario.token, navigate]);

  function atualizarEstado(e: React.ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({ ...usuarioLogin, [e.target.name]: e.target.value });
  }

  function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  return (
    <div className="
      min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-orange-700 px-4
      w-screen
    ">
      <LImage src="/img/loginBg.png" alt="background" className="absolute inset-0 blur-[6px] object-cover w-full h-full md:w-1/2 " />
      <Card className="max-w-sm w-full p-6 rounded-2xl shadow-xl border-none bg-white glass">
        <CardHeader className="text-center space-y-2">
          <img
            src="https://ik.imagekit.io/asis0anat/Log%20in%20hero%20img.svg?updatedAt=1752147028924"
            alt="Login"
            className="w-20 h-20 mx-auto"
          />
          <CardTitle className="text-3xl font-bold text-orange-600">
            Login
          </CardTitle>
          <CardDescription className="text-gray-800 text-sm">
            Use seus dados e entre nessa missão com a gente!
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={login} className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="usuario">Usuário</Label>
                <Input
                  type="text"
                  id="usuario"
                  name="usuario"
                  placeholder="Digite seu usuário"
                  value={usuarioLogin.usuario}
                  onChange={atualizarEstado}
                  className="bg-orange-50 border border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 text-gray-800 placeholder-orange-300 rounded-lg transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <Input
                  type="password"
                  id="senha"
                  name="senha"
                  placeholder="Digite sua senha"
                  value={usuarioLogin.senha}
                  onChange={atualizarEstado}
                  className="bg-orange-50 border border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 text-gray-800 placeholder-orange-300 rounded-lg transition-all duration-300"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="18"
                    visible
                  />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-800">
            Não tem conta?{" "}
            <Link
              to="/cadastro"
              className="text-orange-600 font-semibold underline hover:text-orange-700"
            >
              Cadastre-se!
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;