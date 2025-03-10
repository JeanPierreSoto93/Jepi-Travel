import { useEffect } from "react";
import { getClientTheme } from "@/utils/client-detection";

export function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    function applyTheme() {
      const theme = getClientTheme();

      // Handle both OKLCH and hex color formats
      const primary = theme.primary.startsWith('#') 
        ? theme.primary
        : `oklch(${theme.primary})`;

      // Apply theme variables
      document.documentElement.style.setProperty("--primary", primary);
      document.documentElement.style.setProperty("--radius", `${theme.radius}rem`);
      document.documentElement.setAttribute("data-theme", theme.variant);

      // Update color scheme preference
      if (theme.appearance === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }

    // Apply theme immediately
    applyTheme();

    // Also set up a listener for URL changes that might affect the agency
    const observer = new MutationObserver(() => {
      applyTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-url']
    });

    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
}