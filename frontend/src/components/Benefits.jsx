import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Battery, TrendingUp } from 'lucide-react';
import mockData from '../mock';

const iconComponents = {
  brain: Brain,
  battery: Battery,
  'trending-up': TrendingUp
};

const Benefits = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">
            Beneficios Comprobados
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre cómo Energy Drink transforma tu rendimiento diario con ingredientes científicamente respaldados
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {mockData.benefits.map((benefit, index) => {
            const IconComponent = iconComponents[benefit.icon];
            
            return (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                {/* Fondo decorativo que aparece en hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Contenido */}
                <div className="relative z-10">
                  {/* Icono */}
                  <motion.div 
                    className="mb-6"
                    whileHover={{ 
                      rotate: [0, -5, 5, 0],
                      scale: 1.1
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:shadow-lg transition-shadow duration-300">
                      <IconComponent size={32} className="text-white" />
                    </div>
                  </motion.div>
                  
                  {/* KPI Badge */}
                  <motion.div 
                    className="inline-block mb-4 px-3 py-1 bg-gradient-to-r from-green-100 to-green-200 text-green-800 text-sm font-semibold rounded-full"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.3, type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                  >
                    {benefit.kpi}
                  </motion.div>
                  
                  {/* Título */}
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-blue-600 transition-all duration-300">
                    {benefit.title}
                  </h3>
                  
                  {/* Descripción */}
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {benefit.description}
                  </p>
                </div>
                
                {/* Elemento decorativo */}
                <motion.div
                  className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-orange-200 to-blue-200 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
            );
          })}
        </div>
        
        {/* Estadísticas adicionales */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Usuarios Satisfechos" },
              { number: "95%", label: "Recomiendan Energy Drink" },
              { number: "24/7", label: "Energía Disponible" },
              { number: "0", label: "Efectos Secundarios" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm lg:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;