import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Paintbrush } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const themes = [
  { name: "Rojo", value: "oklch(61.66% 0.191 27.4)" },
  { name: "Azul", value: "oklch(61.66% 0.191 250.79)" },
  { name: "Verde", value: "oklch(61.66% 0.191 142.73)" },
  { name: "Morado", value: "oklch(61.66% 0.191 312.57)" },
  { name: "Naranja", value: "oklch(61.66% 0.191 49.77)" }
];

export function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    // Get theme from localStorage or use default
    return localStorage.getItem("theme") || themes[0].value;
  });

  useEffect(() => {
    // Update CSS variables when theme changes
    document.documentElement.style.setProperty("--theme-primary", theme);

    // Save to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-10 h-10">
          <Paintbrush className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.value}
            onClick={() => setTheme(t.value)}
            className="flex items-center gap-2"
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: t.value }}
            />
            {t.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}