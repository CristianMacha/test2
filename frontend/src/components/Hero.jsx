import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import FloatingCan from './FloatingCan';
import { Button } from './ui/button';
import mockData from '../mock';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Contenido principal */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Texto principal */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:text-left"
          >
            <motion.h1 
              className="text-6xl lg:text-8xl font-bold mb-6"
              style={{ 
                fontFamily: 'system-ui, -apple-system, sans-serif',
                background: 'linear-gradient(135deg, #FF6B35 0%, #2E86AB 50%, #A8DADC 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {mockData.brand.slogan}
            </motion.h1>
            
            <motion.p 
              className="text-xl lg:text-2xl mb-8 text-gray-700 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Libera tu energía interior con <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-600">{mockData.brand.name}</span>. 
              La bebida que potencia tu rendimiento y despierta tu máximo potencial.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button 
                size="lg"
                className="text-lg px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => document.getElementById('game')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {mockData.brand.cta}
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Lata 3D */}
          <motion.div 
            className="h-96 lg:h-[500px]"
            initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          >
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 5]} intensity={1.2} />
                <pointLight position={[-10, -10, -5]} color="#FF6B35" intensity={0.5} />
                <pointLight position={[10, -10, -5]} color="#2E86AB" intensity={0.5} />
                
                <FloatingCan position={[0, 0, 0]} color="#FF6B35" />
                
                <Environment preset="studio" />
                <OrbitControls 
                  enableZoom={false} 
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={0.5}
                />
              </Suspense>
            </Canvas>
          </motion.div>
        </div>
      </div>
      
      {/* Elementos decorativos flotantes */}
      <motion.div
        className="absolute top-20 left-10 w-4 h-4 bg-orange-400 rounded-full opacity-60"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-40 right-20 w-6 h-6 bg-blue-400 rounded-full opacity-60"
        animate={{
          y: [0, 15, 0],
          x: [0, 10, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <motion.div
        className="absolute bottom-32 left-20 w-3 h-3 bg-green-400 rounded-full opacity-60"
        animate={{
          y: [0, -25, 0],
          x: [0, -15, 0],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;