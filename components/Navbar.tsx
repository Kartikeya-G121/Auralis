"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useRouter } from "next/navigation";

const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "/dashboard", label: "Dashboard", protected: true },
	{ href: "/login", label: "Login" },
	{ href: "/signup", label: "Signup" },
	{ href: "#", label: "About" },
];

export default function Navbar() {
	const [open, setOpen] = useState(false);
	const { theme } = useTheme();
	const router = useRouter();

	const handleNavClick = (href: string, protectedRoute?: boolean) => {
		if (protectedRoute) {
			router.push("/login");
			setOpen(false);
			return;
		}
		router.push(href);
		setOpen(false);
	};

	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 shadow-md">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
				<Link
					href="/"
					className="font-bold text-xl text-purple-600"
				>
					Auralis
				</Link>
				<nav className="hidden md:flex gap-6" style={{ pointerEvents: 'auto' }}>
					{navLinks.map((link) => (
						<button
							key={link.href}
							onClick={() => handleNavClick(link.href, link.protected)}
							className="font-medium text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 px-2 py-1 rounded transition bg-transparent border-none cursor-pointer"
							style={{ outline: "none" }}
						>
							{link.label}
						</button>
					))}
				</nav>
				<button
					className="md:hidden p-2 rounded text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-900 z-50"
					style={{ pointerEvents: 'auto', position: 'relative' }}
					onClick={() => setOpen((v) => !v)}
					aria-label="Open menu"
				>
					{open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
				</button>
			</div>
			<AnimatePresence>
				{open && (
					<motion.nav
						initial={{ y: -40, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: -40, opacity: 0 }}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
						className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg z-40"
						style={{ pointerEvents: 'auto', position: 'relative' }}
					>
						<div className="flex flex-col gap-2 px-6 py-4">
							{navLinks.map((link) => (
								<button
									key={link.href}
									onClick={() => handleNavClick(link.href, link.protected)}
									className="font-medium text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 px-2 py-2 rounded transition bg-transparent border-none cursor-pointer w-full text-left"
									style={{ outline: "none" }}
								>
									{link.label}
								</button>
							))}
						</div>
					</motion.nav>
				)}
			</AnimatePresence>
		</header>
	);
}
