'use client'

import {useState} from "react";
import Link from "next/link";
import {User, Settings, HelpCircle, LogOut, Bell, Search} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {User as SupabaseUser, UserResponse} from "@supabase/auth-js";

export interface HeaderProps {
    supabaseUser?: SupabaseUser
}

const Header = ({supabaseUser}: HeaderProps) => {

    const [searchQuery, setSearchQuery] = useState("");

    const handleLogout = () => {
        console.log("Logging out...");
        // Handle logout logic here
    };

    const handleProfileClick = () => {
        console.log("Opening profile...");
        // Handle profile navigation
    };

    const handleSettingsClick = () => {
        console.log("Opening settings...");
        // Handle settings navigation
    };

    const handleHelpClick = () => {
        console.log("Opening help...");
        // Handle help/support navigation
    };

    return (
        <header
            className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-6">
                {/* Logo Section */}
                <div className="flex items-center space-x-4">
                    <Link href="/dashboard" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                        <div
                            className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                            <span className="text-background font-bold text-lg">🌪️</span>
                        </div>
                        <span className="font-bold text-xl text-gradient">Cyclone AI</span>
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="flex-1 max-w-md mx-8">
                    <div className="relative">
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"/>
                        <Input
                            type="text"
                            placeholder="Search organizations, repositories..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 pr-4 bg-muted/50 border-muted focus:border-primary"
                        />
                    </div>
                </div>

                {/* User Menu Section */}
                <div className="flex items-center space-x-4">
                    {/* Notifications */}
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="w-4 h-4"/>
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"></span>
                    </Button>

                    {/* User Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={supabaseUser.email} alt={supabaseUser.email}/>
                                    <AvatarFallback className="bg-primary text-primary-foreground">
                                        {supabaseUser.email}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{supabaseUser.email}</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {supabaseUser.email}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem onClick={handleProfileClick}>
                                <User className="mr-2 h-4 w-4"/>
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleSettingsClick}>
                                <Settings className="mr-2 h-4 w-4"/>
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleHelpClick}>
                                <HelpCircle className="mr-2 h-4 w-4"/>
                                <span>Help & Support</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem onClick={handleLogout}
                                              className="text-destructive focus:text-destructive">
                                <LogOut className="mr-2 h-4 w-4"/>
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
};

export default Header;