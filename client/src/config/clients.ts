import { type Theme } from "@/types/theme";

export interface ClientConfig {
  id: string;
  name: string;
  type: "hotel" | "tour_agency" | "full_agency";
  domain: string[];
  theme: Theme;
  features: {
    showTours: boolean;
    showHotels: boolean;
    showPackages: boolean;
  };
  content: {
    hero: {
      title: string;
      subtitle: string;
      backgroundImage: string;
    };
    brand: {
      name: string;
      logo?: string;
    };
    contact?: {
      phone?: string;
      email?: string;
      address?: string;
    };
  };
}

export const clients: Record<string, ClientConfig> = {
  jepitravel: {
    id: "jepitravel",
    name: "JepiTravel",
    type: "full_agency",
    domain: ["jepitravel.com", "jepitravel.replit.app"],
    theme: {
      primary: "#DC2626", // Red theme
      variant: "professional",
      appearance: "light",
      radius: 0.5,
    },
    features: {
      showTours: true,
      showHotels: true,
      showPackages: true,
    },
    content: {
      hero: {
        title: "Descubre Cuetzalan",
        subtitle:
          "Explora uno de los pueblos mágicos más hermosos de México, donde la tradición y la naturaleza se encuentran",
        backgroundImage:
          "https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?q=80&w=1920&auto=format",
      },
      brand: {
        name: "JepiTravel",
      },
      contact: {
        phone: "(998) 221 2701",
        email: "info@jepitravel.com",
      },
    },
  },
  cancunguru: {
    id: "cancunguru",
    name: "Cancun Guru",
    type: "tour_agency",
    domain: ["cancunguru.com", "cancunguru.replit.app"],
    theme: {
      primary: "#06B6D4", // Turquoise theme
      variant: "vibrant",
      appearance: "light",
      radius: 0.75,
    },
    features: {
      showTours: true,
      showHotels: false,
      showPackages: false,
    },
    content: {
      hero: {
        title: "Aventuras en Cuetzalan",
        subtitle:
          "Los mejores tours y experiencias en el corazón de la Sierra Norte de Puebla",
        backgroundImage:
          "https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=1920&auto=format",
      },
      brand: {
        name: "Cancun Guru",
      },
      contact: {
        phone: "(998) 221 2701",
      },
    },
  },
  posada_santuario: {
    id: "posada_santuario",
    name: "Posada El Santuario",
    type: "hotel",
    domain: ["posadasantuario.com", "posada-santuario.replit.app"],
    theme: {
      primary: "#15803D", // Green theme
      variant: "professional",
      appearance: "light",
      radius: 0.5,
    },
    features: {
      showTours: false,
      showHotels: true,
      showPackages: false,
    },
    content: {
      hero: {
        title: "Tu Hogar en Cuetzalan",
        subtitle:
          "Disfruta de una estancia inolvidable en el corazón del pueblo mágico",
        backgroundImage:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1920&auto=format",
      },
      brand: {
        name: "Posada El Santuario",
      },
      contact: {
        phone: "(998) 221 2701",
        email: "reservas@posadasantuario.com",
      },
    },
  },
};
