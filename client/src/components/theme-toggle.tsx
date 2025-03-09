import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Paintbrush } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ThemeOption {
  name: string;
  value: string;
  textColor: string;
  accent: string;
}

const themes: ThemeOption[] = [
  { 
    name: "Azul Profundo", 
    value: "210 100% 50%",
    textColor: "210 40% 98%",
    accent: "210 40% 96.1%"
  },
  { 
    name: "Verde Jade", 
    value: "142 76% 36%",
    textColor: "142 0% 98%",
    accent: "142 20% 96.1%"
  },
  { 
    name: "Terracota", 
    value: "14 51% 42%",
    textColor: "14 0% 98%",
    accent: "14 20% 96.1%"
  },
  { 
    name: "Morado Real", 
    value: "270 59% 50%",
    textColor: "270 0% 98%",
    accent: "270 20% 96.1%"
  },
  { 
    name: "Turquesa", 
    value: "174 86% 42%",
    textColor: "174 0% 98%",
    accent: "174 20% 96.1%"
  }
];

export function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState<ThemeOption>(() => {
    // Get theme from localStorage or use default
    const savedTheme = localStorage.getItem("theme");
    return themes.find(t => t.value === savedTheme) || themes[0];
  });

  useEffect(() => {
    // Update CSS variables when theme changes
    document.documentElement.style.setProperty("--primary", currentTheme.value);
    document.documentElement.style.setProperty("--primary-foreground", currentTheme.textColor);
    document.documentElement.style.setProperty("--accent", currentTheme.accent);

    // Save to localStorage
    localStorage.setItem("theme", currentTheme.value);
  }, [currentTheme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-10 h-10">
          <Paintbrush className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Tema de Colores</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => setCurrentTheme(theme)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="flex items-center gap-2 flex-1">
              <div
                className="w-4 h-4 rounded-full ring-1 ring-border"
                style={{ backgroundColor: `hsl(${theme.value})` }}
              />
              <span>{theme.name}</span>
            </div>
            {currentTheme.value === theme.value && (
              <div className="w-2 h-2 rounded-full bg-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}