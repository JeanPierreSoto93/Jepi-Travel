import { motion } from "framer-motion";

export function Hero() {
  return (
    <div className="relative h-[500px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80')`
        }}
      />

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white max-w-2xl"
        >
          <h1 className="text-5xl font-bold mb-4">
            TURQUÍA Y MADRID
          </h1>
          <p className="text-2xl mb-8">
            Con vuelo incluido
          </p>
          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg inline-block">
            <div className="flex items-center gap-2">
              <span className="text-primary font-semibold">HASTA</span>
              <span className="text-4xl font-bold text-primary">24 MSI</span>
            </div>
            <p className="text-gray-600 text-sm">
              CONSULTA FECHAS DE SALIDA EN 2025
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
