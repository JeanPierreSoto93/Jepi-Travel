import { useEffect } from "react";
import { getClientTheme } from "@/utils/client-detection";

export function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const theme = getClientTheme();
    
    // Update theme.json values dynamically
    document.documentElement.style.setProperty("--primary", theme.primary);
    document.documentElement.style.setProperty("--radius", `${theme.radius}rem`);
    
    // Update data-theme attribute for variant
    document.documentElement.setAttribute("data-theme", theme.variant);
    
    // Update color scheme preference
    if (theme.appearance === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return <>{children}</>;
}
