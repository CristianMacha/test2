import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

const FloatingCan = ({ position = [0, 0, 0], color = '#FF6B35' }) => {
  const meshRef = useRef();
  const groupRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Rotación suave
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
      meshRef.current.rotation.y = time * 0.3;
      meshRef.current.rotation.z = Math.cos(time * 0.7) * 0.1;
    }
    
    // Movimiento flotante
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.3;
      groupRef.current.position.x = position[0] + Math.cos(time * 0.6) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Lata principal */}
      <mesh ref={meshRef}>
        {/* Cuerpo de la lata */}
        <cylinderGeometry args={[1, 1, 2.5, 32]} />
        <meshStandardMaterial 
          color={color}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
      
      {/* Tapa superior */}
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[1.05, 1.05, 0.1, 32]} />
        <meshStandardMaterial 
          color="#C0C0C0"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Tapa inferior */}
      <mesh position={[0, -1.25, 0]}>
        <cylinderGeometry args={[1.05, 1.05, 0.1, 32]} />
        <meshStandardMaterial 
          color="#C0C0C0"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Texto en la lata */}
      <Text
        position={[0, 0.5, 1.1]}
        rotation={[0, 0, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/bold.woff"
      >
        ENERGY
      </Text>
      
      <Text
        position={[0, 0, 1.1]}
        rotation={[0, 0, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/bold.woff"
      >
        DRINK
      </Text>
      
      {/* Anillo decorativo */}
      <mesh position={[0, 0.8, 0]}>
        <torusGeometry args={[1.1, 0.05, 8, 32]} />
        <meshStandardMaterial 
          color="#FFD700"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Efectos de brillo */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.02, 1.02, 2.6, 32]} />
        <meshBasicMaterial 
          color={color}
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  );
};

export default FloatingCan;