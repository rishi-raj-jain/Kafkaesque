import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
	const [theme, setThemeState] = React.useState<
		"theme-light" | "dark" | "system"
	>("system");

	const updateAllDataWrapperSrc = (isDark) => {
		const dataWrapperScripts = document.querySelectorAll(
			'iframe[src*="datawrapper.dwcdn.net/"]'
		);
		dataWrapperScripts.forEach((script) => {
			const src = script.getAttribute("src");
			const newSrc =
				src.split("?")[0] + `?dark=${isDark ? "true" : "false"}`;
			script.setAttribute("src", newSrc);
		});
	};

	React.useEffect(() => {
		const isDarkMode = document.documentElement.classList.contains("dark");
		setThemeState(isDarkMode ? "dark" : "theme-light");
	}, []);

	React.useEffect(() => {
		const isDark =
			theme === "dark" ||
			(theme === "system" &&
				window.matchMedia("(prefers-color-scheme: dark)").matches);
		document.documentElement.classList[isDark ? "add" : "remove"]("dark");
		localStorage.setItem("theme", isDark ? "dark" : "light");
		updateAllDataWrapperSrc(isDark);
	}, [theme]);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setThemeState("theme-light")}>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setThemeState("dark")}>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setThemeState("system")}>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
