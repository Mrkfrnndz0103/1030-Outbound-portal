import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "wouter";
import { Mail, Lock, User } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const [opsId, setOpsId] = useState("");
  const [password, setPassword] = useState("");

  const handleBackroomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Backroom login:", { opsId, password });
    setLocation("/");
  };

  const handleFTELogin = () => {
    console.log("FTE OAuth login");
    setLocation("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md space-y-6 animate-scale-in">
        <div className="text-center space-y-2">
          <div className="inline-flex h-16 w-16 rounded-xl bg-primary items-center justify-center mb-2">
            <span className="text-primary-foreground font-bold text-2xl">SOC</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Dispatch Portal</h1>
          <p className="text-muted-foreground">Sign in to manage outbound dispatches</p>
        </div>

        <Tabs defaultValue="backroom" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="backroom" data-testid="tab-backroom">Backroom OPS</TabsTrigger>
            <TabsTrigger value="fte" data-testid="tab-fte">FTE / Admin</TabsTrigger>
          </TabsList>

          <TabsContent value="backroom" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Backroom Login</CardTitle>
                <CardDescription>Enter your OPS ID and password to continue</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBackroomLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ops-id">OPS ID</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="ops-id"
                        placeholder="e.g., OPS123"
                        value={opsId}
                        onChange={(e) => setOpsId(e.target.value)}
                        className="pl-9 font-mono"
                        data-testid="input-ops-id"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-9"
                        data-testid="input-password"
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" data-testid="button-login-backroom">
                    Sign In
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fte" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>FTE / Admin Login</CardTitle>
                <CardDescription>Sign in with your company Gmail account</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={handleFTELogin}
                  data-testid="button-login-gmail"
                >
                  <Mail className="h-4 w-4" />
                  Continue with Gmail
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <p className="text-center text-sm text-muted-foreground">
          Need help? Contact IT Support
        </p>
      </div>
    </div>
  );
}
