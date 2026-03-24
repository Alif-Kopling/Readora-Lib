import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { BookOpen, Eye, EyeOff, Sparkles, Book, GraduationCap } from "lucide-react";
import { motion } from "motion/react";
import useAuthStore from "../../stores/auth";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const handleLogin = (userType) => {
        if (!username.trim() || !password.trim()) {
            alert("Username dan password wajib diisi");
            return;
        }

        const role = userType === "admin" ? "admin" : "siswa";
        const userData = {
            id: Date.now().toString(),
            username: username.trim(),
            name: username.trim(),
            role,
        };

        // sementara token dummy sampai API auth siap
        login(userData, `mock-token-${Date.now()}`);

        if (role === "admin") {
            navigate("/admin/dashboard", { replace: true });
            return;
        }

        navigate("/login", { replace: true });
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[radial-gradient(ellipse_at_top_left,_var(--color-blue-100),_transparent),_radial-gradient(ellipse_at_bottom_right,_var(--color-purple-100),_transparent)]">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 blur-[120px] rounded-full animate-float" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/20 blur-[120px] rounded-full animate-float" style={{ animationDelay: '-3s' }} />
            </div>

            {/* Left side - Image section for PC */}
            <motion.div
                className="hidden lg:flex lg:w-1/2 h-screen relative"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800">
                    <img
                        src="https://images.unsplash.com/photo-1650513259622-081281181c32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwYm9va3MlMjBzaGVsdmVzJTIwaW50ZXJpb3IlMjBtb2Rlcm58ZW58MXx8fHwxNzcxMjMyODk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="Library"
                        className="w-full h-full object-cover opacity-30"
                    />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    >
                        <div className="w-32 h-32 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
                            <BookOpen className="w-16 h-16" />
                        </div>
                    </motion.div>
                    <motion.h1
                        className="text-5xl mb-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Readora
                    </motion.h1>
                    <motion.p
                        className="text-xl text-blue-100 text-center max-w-md"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        Book Operation & Knowledge Education Portal
                    </motion.p>
                    <motion.div
                        className="flex gap-8 mt-12"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.9 }}
                    >
                        <div className="text-center">
                            <div className="text-4xl mb-2">10K+</div>
                            <div className="text-blue-200 text-sm">Books Available</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl mb-2">5K+</div>
                            <div className="text-blue-200 text-sm">Active Students</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl mb-2">24/7</div>
                            <div className="text-blue-200 text-sm">Access</div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Right side - Login form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full max-w-md animate-fade-in-up"
                >
                    <Card className="shadow-premium border-white/40 glass">
                        <CardHeader className="space-y-3 text-center pb-6">
                            <div className="mx-auto w-20 h-20 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg relative group transition-transform hover:scale-110 duration-300">
                                <BookOpen className="w-10 h-10 text-white" />
                                <div className="absolute -top-1 -right-1 group-hover:rotate-12 transition-transform">
                                    <Sparkles className="w-5 h-5 text-yellow-400" />
                                </div>
                            </div>
                            <div className="animate-scale-in">
                                <CardTitle className="text-4xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    Login
                                </CardTitle>
                                <CardDescription className="text-base mt-2 font-medium">Welcome back! Please login to continue</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="student" className="w-full">
                                <TabsList className="grid w-full grid-cols-2 mb-6 bg-blue-50/50 p-1 rounded-xl">
                                    <TabsTrigger value="admin" className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300">
                                        <GraduationCap className="w-4 h-4 mr-2" />
                                        Admin
                                    </TabsTrigger>
                                    <TabsTrigger value="student" className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300">
                                        <Book className="w-4 h-4 mr-2" />
                                        Student
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="admin">
                                    <motion.div
                                        className="space-y-4"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="space-y-2">
                                            <Label htmlFor="admin-username">Username</Label>
                                            <Input
                                                id="admin-username"
                                                type="text"
                                                placeholder="Enter your username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                className="rounded-lg border-2 focus:border-blue-500 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="admin-password">Password</Label>
                                            <div className="relative">
                                                <Input
                                                    id="admin-password"
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Enter your password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="rounded-lg border-2 focus:border-blue-500 transition-all pr-10"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                                >
                                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        </div>
                                        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                            <Button
                                                className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl py-6 shadow-lg shadow-blue-200 transition-all duration-300 font-semibold text-lg"
                                                onClick={() => handleLogin("admin")}
                                            >
                                                Sign In as Admin
                                            </Button>
                                        </motion.div>
                                    </motion.div>
                                </TabsContent>

                                <TabsContent value="student">
                                    <motion.div
                                        className="space-y-4"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="space-y-2">
                                            <Label htmlFor="student-username">Username</Label>
                                            <Input
                                                id="student-username"
                                                type="text"
                                                placeholder="Enter your username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                className="rounded-lg border-2 focus:border-blue-500 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="student-password">Password</Label>
                                            <div className="relative">
                                                <Input
                                                    id="student-password"
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Enter your password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="rounded-lg border-2 focus:border-blue-500 transition-all pr-10"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                                >
                                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        </div>
                                        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                            <Button
                                                className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl py-6 shadow-lg shadow-blue-200 transition-all duration-300 font-semibold text-lg"
                                                onClick={() => handleLogin("student")}
                                            >
                                                Sign In as Student
                                            </Button>
                                        </motion.div>
                                    </motion.div>
                                </TabsContent>
                            </Tabs>

                            <motion.div
                                className="mt-6 text-center text-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                <span className="text-gray-600">Not a member? </span>
                                <Link
                                    to="/register"
                                    className="text-blue-500 hover:text-blue-600 hover:underline font-medium"
                                >
                                    Register
                                </Link>
                            </motion.div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}