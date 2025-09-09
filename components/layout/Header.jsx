"use client";

import React from "react";
import { Menu, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export default function Header() {
    const router = useRouter();

    const handleLogin = () => {
        router.push("/auth/login");
    };

    const handleSignup = () => {
        router.push("/auth/signup");
    };

    return (
        <header className="sticky top-0 z-50 bg-background border-b border-border">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/">
                            <Image
                                src="/images/logo.png"
                                alt={"EYGAR Logo"}
                                width={120}
                                height={40}
                                style={{ width: "100%", height: "auto" }}
                            />
                        </Link>
                    </div>

                    {/* Navigation - Desktop */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/properties"
                            className="text-foreground hover:text-primary"
                        >
                            Places to Stay
                        </Link>
                        
                    </nav>

                    {/* Right side controls */}
                    <div className="flex items-center space-x-4">

                        {/* User menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center space-x-2 bg-transparent"
                                >
                                    <Menu className="h-4 w-4" />
                                    <User className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <>
                                    <DropdownMenuItem onClick={handleSignup}>
                                        Signup
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleLogin}>
                                        Login
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                       <Link href="/bookings">My Bookings</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    
                                    <DropdownMenuItem>
                                        Help
                                    </DropdownMenuItem>
                                </>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>
    );
}
