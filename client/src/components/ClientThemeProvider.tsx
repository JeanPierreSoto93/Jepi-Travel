import { useEffect } from "react";
import { getClientTheme } from "@/utils/client-detection";

function hexToHSL(hex: string): string {
  // Remove the # if present
  hex = hex.replace('#', '');

  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Find max and min values
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  // Convert to degrees and percentages
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

export function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    function applyTheme() {
      const theme = getClientTheme();

      // Convert hex color to HSL
      const hslColor = hexToHSL(theme.primary);

      // Apply theme variables
      document.documentElement.style.setProperty("--primary", hslColor);
      document.documentElement.style.setProperty("--radius", `${theme.radius}rem`);
      document.documentElement.setAttribute("data-theme", theme.variant);

      // Update color scheme preference
      if (theme.appearance === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }

    // Apply theme immediately on mount
    applyTheme();

    // Set up a listener for URL changes that might affect the agency
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-url') {
          applyTheme();
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-url']
    });

    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
}