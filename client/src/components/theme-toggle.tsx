import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Paintbrush, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
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
  },
  { 
    name: "Coral", 
    value: "16 100% 66%",
    textColor: "16 0% 98%",
    accent: "16 20% 96.1%"
  },
  { 
    name: "Índigo", 
    value: "243 75% 59%",
    textColor: "243 0% 98%",
    accent: "243 20% 96.1%"
  }
];

const accentOptions = [
  { name: "Suave", value: "20%" },
  { name: "Medio", value: "40%" },
  { name: "Fuerte", value: "60%" }
];

export function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState<ThemeOption>(() => {
    // Get theme from localStorage or use default
    const savedTheme = localStorage.getItem("theme");
    return themes.find(t => t.value === savedTheme) || themes[0];
  });

  const [accentIntensity, setAccentIntensity] = useState(() => {
    return localStorage.getItem("accentIntensity") || "40%";
  });

  useEffect(() => {
    // Update CSS variables when theme changes
    document.documentElement.style.setProperty("--primary", currentTheme.value);
    document.documentElement.style.setProperty("--primary-foreground", currentTheme.textColor);
    document.documentElement.style.setProperty("--accent", currentTheme.accent);

    // Update accent intensity
    document.documentElement.style.setProperty(
      "--accent-strength", 
      accentIntensity
    );

    // Save to localStorage
    localStorage.setItem("theme", currentTheme.value);
    localStorage.setItem("accentIntensity", accentIntensity);
  }, [currentTheme, accentIntensity]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-10 h-10">
          <Paintbrush className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Personalizar Tema</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full ring-1 ring-border"
                style={{ backgroundColor: `hsl(${currentTheme.value})` }}
              />
              <span>Color Principal</span>
            </div>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
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
                  <Check className="h-4 w-4" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <div className="flex items-center gap-2">
              <span>Intensidad de Acentos</span>
            </div>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {accentOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => setAccentIntensity(option.value)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <span>{option.name}</span>
                {accentIntensity === option.value && (
                  <Check className="h-4 w-4" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}