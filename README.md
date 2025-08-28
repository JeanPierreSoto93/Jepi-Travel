# 📚 Documentación del Proyecto: JepiTravel Booking Engine

## 🎯 **RESUMEN EJECUTIVO**

El **JepiTravel Booking Engine** es una plataforma SaaS multi-cliente para reservas de hoteles y tours, desarrollada con arquitectura moderna y diseñada para servir múltiples negocios turísticos desde una sola aplicación. El sistema permite que diferentes empresas (hoteles, agencias de tours, posadas) tengan su propia marca, tema, configuración y dominio personalizado.

---

## 🏗️ **ARQUITECTURA DEL SISTEMA**

### **Stack Tecnológico**
- **Frontend**: React 18.3.1 + TypeScript + Vite
- **Estilizado**: Tailwind CSS + Radix UI + Framer Motion
- **Routing**: Wouter (cliente) + Express (servidor)
- **Pagos**: Stripe
- **Analytics**: Google Analytics 4
- **Estado**: TanStack Query (React Query)

### **Estructura de Directorios**

```
booking-engine/
├── client/                    # Aplicación React frontend
│   ├── src/
│   │   ├── components/        # Componentes reutilizables
│   │   │   ├── ui/           # Componentes base de UI (Radix)
│   │   │   ├── landings/     # Componentes específicos por cliente
│   │   │   └── [otros]/      # Navbar, Footer, etc.
│   │   ├── config/           # Configuraciones por cliente
│   │   ├── pages/            # Páginas de la aplicación
│   │   ├── hooks/            # Custom hooks
│   │   ├── types/            # Definiciones TypeScript
│   │   └── utils/            # Utilidades y helpers
│   ├── public/               # Assets estáticos
│   └── [archivos de config]
├── server/                   # Backend Node.js
├── shared/                   # Código compartido (schemas)
├── scripts/                  # Scripts de construcción
└── [archivos de config raíz]
```

---

## 🎨 **SISTEMA MULTI-CLIENTE**

### **Concepto Principal**
El sistema permite que múltiples negocios turísticos operen con:
- **Dominios únicos**: Cada cliente tiene su dominio/subdominio
- **Branding personalizado**: Logos, colores, tipografías
- **Configuración específica**: Funciones habilitadas/deshabilitadas
- **Contenido único**: Textos, imágenes, ofertas por cliente

### **Clientes Configurados**

#### **1. JepiTravel (Cliente Principal)**
- **Tipo**: Agencia completa (hoteles + tours + paquetes)
- **Dominio**: `demo.jepitravel.com`
- **Tema**: Rojo profesional (#DC2626)
- **Características**: Funcionalidad completa

#### **2. Posada El Santuario**
- **Tipo**: Hotel boutique
- **Dominio**: `posadasantuario.jepitravel.com`
- **Tema**: Magenta vibrante (#E91E63)
- **Características**: Solo reservas de hotel, página especializada

#### **3. Vive la Aventura**
- **Tipo**: Agencia de tours de aventura
- **Dominio**: `vivelaventura.jepitravel.com`
- **Tema**: Verde lima (#8BC34A)
- **Características**: Solo tours, enfoque en aventura

#### **4. Cancun Guru**
- **Tipo**: Agencia de tours
- **Dominio**: `cancunguru.jepitravel.com`
- **Tema**: Turquesa (#06B6D4)
- **Características**: Solo tours

---

## ⚙️ **CONFIGURACIÓN POR CLIENTE**

### **Archivo Principal: `src/config/clients.ts`**

Cada cliente se define con la siguiente estructura:

```typescript
interface ClientConfig {
  id: string;                    // Identificador único
  name: string;                  // Nombre del negocio
  type: "hotel" | "tour_agency" | "full_agency";
  domain: string[];              // Dominios asignados
  theme: Theme;                  // Colores y apariencia
  analytics?: AnalyticsConfig;   // Google Analytics, Facebook Pixel
  branding: BrandingConfig;      // Logo, tipografías, estilos
  features: FeaturesConfig;      // Funciones habilitadas
  content: ContentConfig;        // Textos, imágenes, contacto
}
```

### **Sistema de Detección de Cliente**

La detección se realiza en `src/utils/client-detection.ts`:

1. **Parámetro URL**: `?agency=cliente_id`
2. **Coincidencia de dominio**: Mapeo automático
3. **Localhost**: Fallback a JepiTravel + preview mode
4. **Fallback**: JepiTravel por defecto

---

## 🎯 **FUNCIONALIDADES PRINCIPALES**

### **1. Reservas de Hoteles**
- **Búsqueda**: Por destino, fechas, huéspedes
- **Filtros**: Precio, calificación, amenidades
- **Detalle**: Galería, descripción, habitaciones
- **Reserva**: Formulario + integración Stripe
- **Confirmación**: Email + lookup de reservas

### **2. Tours y Experiencias**
- **Catálogo**: Tours categorizados
- **Detalle**: Itinerario, incluye/no incluye
- **Reserva**: Selección de fechas y participantes
- **Paquetes**: Combinaciones hotel + tour

### **3. Sistema de Pagos**
- **Integración Stripe**: Procesamiento seguro
- **Métodos**: Tarjetas de crédito/débito
- **Monedas**: Configuración por cliente
- **Confirmación**: Webhooks para estado de pago

### **4. SEO Dinámico**
- **Metadatos por cliente**: Title, description, keywords
- **Open Graph**: Imágenes y contenido personalizado
- **Schema.org**: Structured data para hoteles/tours
- **HTML específico**: Archivos generados por cliente

---

## 🛠️ **COMPONENTES CLAVE**

### **1. Detección y Configuración**
```typescript
// Obtener cliente actual
const client = getCurrentClient();

// Aplicar tema dinámico
<ClientThemeProvider>
  <App />
</ClientThemeProvider>
```

### **2. Routing Dinámico**
```typescript
// En App.tsx
<Switch>
  <Route path="/" component={Home} />
  <Route path="/hotels" component={HotelListPage} />
  <Route path="/tours" component={TourListPage} />
  // Rutas condicionales según cliente
</Switch>
```

### **3. Páginas Personalizadas**
```typescript
// Landing específica para Posada El Santuario
import PosadaElSantuarioHome from "@/pages/landings/PosadaElSantuarioHome";

// Sistema de override automático
if (hasCustomLanding(clientId)) {
  return getLandingComponent(clientId);
}
```

### **4. Componentes de UI Temáticos**
- **Navbar**: Estilo y contenido por cliente
- **Footer**: Enlaces y contenido personalizado
- **Botones**: Formas y colores según branding
- **Cards**: Layouts adaptados al tipo de negocio

---

## 📊 **SISTEMA DE ANALYTICS**

### **Google Analytics 4**
- **Configuración por cliente**: Measurement IDs únicos
- **E-commerce mejorado**: Tracking de reservas
- **Dimensiones personalizadas**: Tipo de cliente, categorías
- **Eventos**: Búsquedas, visualizaciones, conversiones

### **Implementación**
```typescript
// En AnalyticsManager.tsx
const trackReservation = (reservationData) => {
  gtag('event', 'purchase', {
    transaction_id: reservationData.id,
    value: reservationData.total,
    currency: reservationData.currency,
    // ... más datos
  });
};
```

---

## 🚀 **DESARROLLO Y DEPLOY**

### **Scripts Disponibles**
```bash
# Desarrollo
npm run dev                 # Cliente + servidor en paralelo
npm run dev:client         # Solo cliente React
npm run dev:server         # Solo servidor Express

# Construcción
npm run build              # Build completo
npm run copy-assets        # Copiar archivos estáticos

# Producción
npm run start              # Servidor en desarrollo
npm run start:prod         # Servidor en producción
```

### **Proceso de Build**
1. **Vite**: Construye el cliente React
2. **ESBuild**: Empaqueta el servidor Express
3. **Scripts**: Copia assets y genera HTML específicos
4. **Output**: Directorio `dist/` listo para deploy

### **Archivos HTML Generados**
- `index.html` - Genérico (JepiTravel)
- `index-posada_santuario.html` - Posada El Santuario
- `index-vive_la_aventura.html` - Vive la Aventura
- `index-jepitravel.html` - JepiTravel específico

---

## 🗄️ **BASE DE DATOS**

### **ORM: Drizzle**
```typescript
// Schema básico en shared/schema.ts
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});
```

### **Configuración**
- **Proveedor**: Neon PostgreSQL
- **Migrations**: Automáticas con `drizzle-kit`
- **Conexión**: Variable de entorno `DATABASE_URL`

---

## 🎨 **SISTEMA DE TEMAS**

### **Configuración Dinámica**
```typescript
// En ClientThemeProvider.tsx
const applyTheme = (theme: Theme) => {
  document.documentElement.style.setProperty('--primary', theme.primary);
  document.documentElement.style.setProperty('--radius', `${theme.radius}rem`);
  // ... más propiedades CSS
};
```

### **Variables CSS Dinámicas**
- `--primary`: Color principal del cliente
- `--secondary`: Color secundario
- `--accent`: Color de acento
- `--radius`: Border radius de componentes
- `--font-family`: Tipografía principal

---

## 📱 **RESPONSIVE Y UX**

### **Breakpoints**
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### **Componentes Adaptativos**
- **Navbar**: Hamburger menu en móvil
- **Search**: Formulario colapsible
- **Cards**: Grid responsivo
- **Modales**: Fullscreen en móvil

---

## 🔐 **SEGURIDAD**

### **Autenticación**
- **Passport.js**: Estrategia local
- **Sessions**: Express-session con PostgreSQL store
- **Passwords**: Hashing seguro

### **Pagos**
- **Stripe**: PCI compliance automático
- **Webhooks**: Verificación de signatures
- **HTTPS**: Required para producción

---

## 🚧 **LIMITACIONES Y TODOs**

### **Limitaciones Actuales**
1. **Base de datos**: Schema básico, falta estructura de reservas
2. **Autenticación**: Implementación básica
3. **CMS**: Contenido hardcodeado en configuración
4. **Testing**: Sin tests implementados
5. **CI/CD**: Deploy manual

### **Próximas Mejoras**
1. **Admin Panel**: Dashboard para gestionar clientes
2. **CMS**: Editor de contenido en línea
3. **Multi-idioma**: i18n implementation
4. **PWA**: Progressive Web App features
5. **Testing**: Unit + E2E tests
6. **Monitoring**: Error tracking + performance

---

## 📞 **CONTACTO Y SOPORTE**

### **Desarrollador Principal**
- **Nombre**: Jean Pierre Soto
- **Email**: jeanpierresoto93@gmail.com
- **Empresa**: JepiSoft

### **Repositorio**
- **Ubicación**: `/booking-engine/` en JepiTravel monorepo
- **Tecnología**: Full-Stack TypeScript
- **Licencia**: MIT

---

## 🔧 **GUÍA DE CONFIGURACIÓN PARA NUEVOS CLIENTES**

### **1. Agregar Cliente en `clients.ts`**
```typescript
nuevo_cliente: {
  id: "nuevo_cliente",
  name: "Nuevo Cliente",
  type: "hotel", // o "tour_agency" o "full_agency"
  domain: ["nuevocliente.jepitravel.com"],
  theme: {
    primary: "#000000", // Color principal
    variant: "professional",
    appearance: "light",
    radius: 0.5,
  },
  branding: {
    fontFamily: "'Poppins', sans-serif",
    logoText: true,
    navbarStyle: "solid",
    footerStyle: "expanded",
    buttonStyle: "rounded",
  },
  features: {
    showTours: true,
    showHotels: true,
    showPackages: false,
  },
  content: {
    hero: {
      title: "Título del Hero",
      subtitle: "Subtítulo descriptivo",
      backgroundImage: "URL de imagen"
    },
    brand: {
      name: "Nuevo Cliente",
      slogan: "Slogan del negocio"
    },
    contact: {
      email: "contacto@nuevocliente.com",
      phone: "+52 xxx xxx xxxx"
    }
  }
}
```

### **2. Configurar SEO en `generate-html.cjs`**
```javascript
nuevo_cliente: {
  title: "Título SEO - Nuevo Cliente",
  description: "Descripción meta para SEO",
  keywords: "palabras, clave, separadas, por, comas",
  ogImage: "URL de imagen Open Graph",
  canonical: "https://nuevocliente.jepitravel.com"
}
```

### **3. Crear Página Personalizada (Opcional)**
```typescript
// En src/pages/landings/NuevoClienteHome.tsx
export default function NuevoClienteHome() {
  return (
    <div>
      {/* Contenido específico del cliente */}
    </div>
  );
}
```

### **4. Configurar Dominio en Servidor**
```typescript
// En server/index.ts
const domainHTMLMap = {
  'nuevocliente.jepitravel.com': 'index-nuevo_cliente.html',
  // ... otros dominios
};
```

---

## 📈 **MÉTRICAS Y ANALYTICS**

### **KPIs Principales**
- **Conversión**: Visitantes → Reservas
- **AOV**: Average Order Value por cliente
- **Engagement**: Tiempo en sitio, páginas por sesión
- **Funnel**: Búsqueda → Detalle → Reserva → Pago

### **Eventos Tracked**
- `search_hotels` / `search_tours`
- `view_hotel` / `view_tour`
- `begin_checkout`
- `purchase`
- `contact_click`

---

Este sistema representa una plataforma escalable y moderna para el sector turístico, con capacidad de servir múltiples negocios manteniendo una base de código unificada y eficiente.
