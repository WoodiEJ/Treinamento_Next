import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center text-sm bg-muted">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Logar na sua conta</CardTitle>
                    <CardDescription>Coloque seu email e senha pra acessar</CardDescription>
                    <CardAction>
                        <Button variant="link">Cadastre-se</Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="email@email.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Senha</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="**********"
                                    required
                                />
                                <p>Esqueceu sua senha?</p>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full">
                        Logar
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}