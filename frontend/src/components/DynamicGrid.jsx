import React, { useRef, useEffect } from 'react';

const DynamicGrid = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const colors = [
      '#FF6B35', // Naranja vibrante
      '#2E86AB', // Azul vibrante  
      '#A8DADC', // Verde agua vibrante
      '#457B9D', // Azul secundario
      '#F77F00'  // Naranja secundario
    ];

    let time = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleTouch = (e) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouch);

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gridSize = 40;
      const cols = Math.ceil(canvas.width / gridSize);
      const rows = Math.ceil(canvas.height / gridSize);

      for (let x = 0; x <= cols; x++) {
        for (let y = 0; y <= rows; y++) {
          const xPos = x * gridSize;
          const yPos = y * gridSize;
          
          // Distancia del mouse/touch para efectos interactivos
          const distanceToMouse = Math.sqrt(
            Math.pow(mouseX - xPos, 2) + Math.pow(mouseY - yPos, 2)
          );
          
          // Color que cambia basado en tiempo y posición del mouse
          const colorIndex = Math.floor(
            (time * 0.001 + distanceToMouse * 0.001) % colors.length
          );
          
          const opacity = Math.max(0.1, 1 - distanceToMouse / 200);
          const lineWidth = Math.max(0.5, 3 - distanceToMouse / 100);
          
          ctx.strokeStyle = colors[colorIndex] + Math.floor(opacity * 255).toString(16).padStart(2, '0');
          ctx.lineWidth = lineWidth;
          
          // Líneas horizontales
          if (y < rows) {
            ctx.beginPath();
            ctx.moveTo(xPos, yPos);
            ctx.lineTo(xPos, yPos + gridSize);
            ctx.stroke();
          }
          
          // Líneas verticales
          if (x < cols) {
            ctx.beginPath();
            ctx.moveTo(xPos, yPos);
            ctx.lineTo(xPos + gridSize, yPos);
            ctx.stroke();
          }
          
          // Puntos de intersección con efecto pulsante
          const pulse = Math.sin(time * 0.003 + distanceToMouse * 0.01) * 0.5 + 0.5;
          const pointSize = 2 + pulse * 2;
          
          ctx.fillStyle = colors[colorIndex] + Math.floor(opacity * 128).toString(16).padStart(2, '0');
          ctx.beginPath();
          ctx.arc(xPos, yPos, pointSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const animate = () => {
      time = Date.now();
      drawGrid();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouch);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'white' }}
    />
  );
};

export default DynamicGrid;