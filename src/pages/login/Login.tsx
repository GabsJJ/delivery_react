import { LImage } from "@/components/limage/LImage"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Login = () => {
    return (
        <div className="flex justify-between items-center h-screen bg-amber-100">
            <div className="w-full md:w-1/2 mx-2 flex justify-center">
                <Card className="w-full max-w-lg">
                    <CardHeader>
                        <CardTitle className="text-[#e54300] font-bold text-2xl">Login</CardTitle>
                        <CardDescription>
                            Insira seu email abaixo para entrar na sua conta
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@exemplo.com"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Senha</Label>
                                    </div>
                                    <Input id="password" type="password" required />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button type="submit" className="w-full bg-[#e54300] hover:bg-[#e54300]/90">
                            Login
                        </Button>
                        <CardAction className="flex justify-center items-center w-full">
                            <p className="text-sm">Não tem uma conta?</p>
                            <Button variant="link" className="p-1 text-[#e54300]">Cadastre-se</Button>
                        </CardAction>
                    </CardFooter>
                </Card>
            </div>
            <div className="md:block md:w-1/2 h-auto hidden">
                <LImage src="/img/loginBg.png" alt="background-image" className="w-full h-auto" />
            </div>
        </div>
    )
}

export default Login