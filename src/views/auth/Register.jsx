import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { BookOpen, ArrowLeft, Eye, EyeOff, UserPlus, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function Register() {
    const [formData, setFormData] = useState({
        fullName: "",
        studentId: "",
        class: "",
        username: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleRegister = () => {
        console.log("Registering student:", formData);
        // Add your registration logic here
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-40 -left-40 w-80 h-80 bg-purple-200 rounded-full opacity-20 blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, -50, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* Left side - Image section for PC */}
            <motion.div
                className="hidden lg:flex lg:w-1/2 h-screen relative"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600">
                    <img
                        src="https://images.unsplash.com/photo-1650513259622-081281181c32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwYm9va3MlMjBzaGVsdmVzJTIwaW50ZXJpb3IlMjBtb2Rlcm58ZW58MXx8fHwxNzcxMjMyODk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="Library"
                        className="w-full h-full object-cover opacity-30"
                    />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white">
                    <motion.div
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    >
                        <div className="w-32 h-32 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
                            <UserPlus className="w-16 h-16" />
                        </div>
                    </motion.div>
                    <motion.h1
                        className="text-5xl mb-4 text-center"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Join Our Community
                    </motion.h1>
                    <motion.p
                        className="text-xl text-blue-100 text-center max-w-md"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        Register now and get access to thousands of books and resources
                    </motion.p>
                    <motion.div
                        className="mt-12 space-y-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.9 }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                ✓
                            </div>
                            <span className="text-lg">Free Access to Digital Library</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                ✓
                            </div>
                            <span className="text-lg">Borrow Physical Books</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                ✓
                            </div>
                            <span className="text-lg">Study Room Reservations</span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Right side - Register form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full max-w-md"
                >
                    <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/80">
                        <CardHeader className="space-y-3 text-center pb-6">
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            >
                                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg relative">
                                    <UserPlus className="w-10 h-10 text-white" />
                                    <motion.div
                                        className="absolute -top-1 -right-1"
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <Sparkles className="w-5 h-5 text-yellow-400" />
                                    </motion.div>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <CardTitle className="text-4xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                    Student Registration
                                </CardTitle>
                                <CardDescription className="text-base mt-2">Create your account to access the library</CardDescription>
                            </motion.div>
                        </CardHeader>
                        <CardContent>
                            <motion.div
                                className="space-y-4"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.3 }}
                            >
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input
                                        id="fullName"
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={formData.fullName}
                                        onChange={(e) => handleChange("fullName", e.target.value)}
                                        className="rounded-lg border-2 focus:border-purple-500 transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="studentId">Student ID</Label>
                                    <Input
                                        id="studentId"
                                        type="text"
                                        placeholder="Enter your student ID"
                                        value={formData.studentId}
                                        onChange={(e) => handleChange("studentId", e.target.value)}
                                        className="rounded-lg border-2 focus:border-purple-500 transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="class">Class</Label>
                                    <Input
                                        id="class"
                                        type="text"
                                        placeholder="Enter your class"
                                        value={formData.class}
                                        onChange={(e) => handleChange("class", e.target.value)}
                                        className="rounded-lg border-2 focus:border-purple-500 transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="Choose a username"
                                        value={formData.username}
                                        onChange={(e) => handleChange("username", e.target.value)}
                                        className="rounded-lg border-2 focus:border-purple-500 transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Create a password"
                                            value={formData.password}
                                            onChange={(e) => handleChange("password", e.target.value)}
                                            className="rounded-lg border-2 focus:border-purple-500 transition-all pr-10"
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

                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Button
                                        className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 rounded-lg mt-2 shadow-lg"
                                        onClick={handleRegister}
                                    >
                                        Register
                                    </Button>
                                </motion.div>

                                <Link to="/">
                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button
                                            variant="outline"
                                            className="w-full rounded-lg mt-2 border-2 hover:border-purple-500 transition-all"
                                        >
                                            <ArrowLeft className="w-4 h-4 mr-2" />
                                            Back to Login
                                        </Button>
                                    </motion.div>
                                </Link>
                            </motion.div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}