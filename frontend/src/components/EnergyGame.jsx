import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Trophy } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import mockData from '../mock';

const EnergyGame = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const gameStateRef = useRef({
    isPlaying: false,
    score: 0,
    energyBar: 0,
    player: { x: 0, y: 0, width: 60, height: 40 },
    cans: [],
    particles: [],
    powerUps: [],
    lastCanSpawn: 0,
    lastPowerUpSpawn: 0,
    gameSpeed: 1,
    level: 1
  });

  const [gameState, setGameState] = useState({
    isPlaying: false,
    score: 0,
    energyBar: 0,
    showInstructions: true,
    gameOver: false,
    showCelebration: false,
    motivationalMessage: '',
    level: 1
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      resizeCanvas();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const container = canvas.parentElement;
    canvas.width = container.offsetWidth;
    canvas.height = 400;
    
    // Actualizar posición del jugador al centro
    gameStateRef.current.player.x = canvas.width / 2 - gameStateRef.current.player.width / 2;
    gameStateRef.current.player.y = canvas.height - gameStateRef.current.player.height - 20;
  }, []);

  const spawnCan = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const colors = ['#FF6B35', '#2E86AB', '#A8DADC'];
    gameStateRef.current.cans.push({
      x: Math.random() * (canvas.width - 40),
      y: -40,
      width: 40,
      height: 60,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: 0,
      rotationSpeed: (Math.random() - 0.5) * 0.2,
      glowIntensity: Math.random() * 0.5 + 0.5
    });
  }, []);

  const spawnPowerUp = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    gameStateRef.current.powerUps.push({
      x: Math.random() * (canvas.width - 30),
      y: -30,
      width: 30,
      height: 30,
      type: Math.random() > 0.5 ? 'speed' : 'energy',
      pulse: 0
    });
  }, []);

  const spawnParticles = useCallback((x, y, color, count = 10) => {
    for (let i = 0; i < count; i++) {
      gameStateRef.current.particles.push({
        x: x + Math.random() * 20 - 10,
        y: y + Math.random() * 20 - 10,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        color,
        life: 1,
        decay: 0.02,
        size: Math.random() * 4 + 2
      });
    }
  }, []);

  const checkCollisions = useCallback(() => {
    const player = gameStateRef.current.player;
    
    // Colisiones con latas
    gameStateRef.current.cans = gameStateRef.current.cans.filter(can => {
      if (
        player.x < can.x + can.width &&
        player.x + player.width > can.x &&
        player.y < can.y + can.height &&
        player.y + player.height > can.y
      ) {
        // Colisión detectada
        gameStateRef.current.score += 10;
        gameStateRef.current.energyBar = Math.min(100, gameStateRef.current.energyBar + 15);
        
        // Spawear partículas
        spawnParticles(can.x + can.width/2, can.y + can.height/2, can.color, 15);
        
        // Verificar si se completó la barra de energía
        if (gameStateRef.current.energyBar >= 100) {
          const message = mockData.gameMessages[Math.floor(Math.random() * mockData.gameMessages.length)];
          setGameState(prev => ({
            ...prev,
            showCelebration: true,
            motivationalMessage: message,
            energyBar: 0
          }));
          
          // Spawear muchas partículas de celebración
          spawnParticles(player.x + player.width/2, player.y, '#FFD700', 30);
          
          gameStateRef.current.energyBar = 0;
          gameStateRef.current.level += 1;
          gameStateRef.current.gameSpeed = Math.min(3, gameStateRef.current.gameSpeed + 0.2);
          
          setTimeout(() => {
            setGameState(prev => ({ ...prev, showCelebration: false }));
          }, 3000);
        }
        
        return false; // Remover la lata
      }
      return true;
    });

    // Colisiones con power-ups
    gameStateRef.current.powerUps = gameStateRef.current.powerUps.filter(powerUp => {
      if (
        player.x < powerUp.x + powerUp.width &&
        player.x + player.width > powerUp.x &&
        player.y < powerUp.y + powerUp.height &&
        player.y + player.height > powerUp.y
      ) {
        if (powerUp.type === 'speed') {
          gameStateRef.current.gameSpeed *= 0.8; // Ralentizar caída temporalmente
          setTimeout(() => {
            gameStateRef.current.gameSpeed /= 0.8;
          }, 3000);
        } else if (powerUp.type === 'energy') {
          gameStateRef.current.energyBar = Math.min(100, gameStateRef.current.energyBar + 25);
        }
        
        spawnParticles(powerUp.x + powerUp.width/2, powerUp.y + powerUp.height/2, '#FFD700', 12);
        return false;
      }
      return true;
    });
  }, [spawnParticles]);

  const updateGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !gameStateRef.current.isPlaying) return;

    const currentTime = Date.now();
    
    // Spawear latas
    if (currentTime - gameStateRef.current.lastCanSpawn > 1500 / gameStateRef.current.gameSpeed) {
      spawnCan();
      gameStateRef.current.lastCanSpawn = currentTime;
    }
    
    // Spawear power-ups ocasionalmente
    if (currentTime - gameStateRef.current.lastPowerUpSpawn > 8000) {
      spawnPowerUp();
      gameStateRef.current.lastPowerUpSpawn = currentTime;
    }

    // Actualizar latas
    gameStateRef.current.cans = gameStateRef.current.cans.filter(can => {
      can.y += 3 * gameStateRef.current.gameSpeed;
      can.rotation += can.rotationSpeed;
      can.glowIntensity = Math.sin(currentTime * 0.01) * 0.3 + 0.7;
      return can.y < canvas.height + 60;
    });

    // Actualizar power-ups
    gameStateRef.current.powerUps = gameStateRef.current.powerUps.filter(powerUp => {
      powerUp.y += 2 * gameStateRef.current.gameSpeed;
      powerUp.pulse += 0.2;
      return powerUp.y < canvas.height + 30;
    });

    // Actualizar partículas
    gameStateRef.current.particles = gameStateRef.current.particles.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vx *= 0.99;
      particle.vy *= 0.99;
      particle.life -= particle.decay;
      return particle.life > 0;
    });

    checkCollisions();
    
    setGameState(prev => ({
      ...prev,
      score: gameStateRef.current.score,
      energyBar: gameStateRef.current.energyBar,
      level: gameStateRef.current.level
    }));
  }, [spawnCan, spawnPowerUp, checkCollisions]);

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fondo con gradiente
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#E3F2FD');
    gradient.addColorStop(1, '#FFFFFF');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar jugador
    const player = gameStateRef.current.player;
    ctx.fillStyle = '#FF6B35';
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // Cara del jugador
    ctx.fillStyle = '#FFF';
    ctx.fillRect(player.x + 10, player.y + 8, 8, 8);
    ctx.fillRect(player.x + 42, player.y + 8, 8, 8);
    ctx.fillRect(player.x + 20, player.y + 24, 20, 4);

    // Dibujar latas con efectos
    gameStateRef.current.cans.forEach(can => {
      ctx.save();
      ctx.translate(can.x + can.width/2, can.y + can.height/2);
      ctx.rotate(can.rotation);
      
      // Efecto de brillo
      ctx.shadowColor = can.color;
      ctx.shadowBlur = 10 * can.glowIntensity;
      
      ctx.fillStyle = can.color;
      ctx.fillRect(-can.width/2, -can.height/2, can.width, can.height);
      
      // Líneas decorativas
      ctx.strokeStyle = '#FFF';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-can.width/2 + 5, -can.height/2 + 10);
      ctx.lineTo(can.width/2 - 5, -can.height/2 + 10);
      ctx.moveTo(-can.width/2 + 5, can.height/2 - 10);
      ctx.lineTo(can.width/2 - 5, can.height/2 - 10);
      ctx.stroke();
      
      ctx.restore();
    });

    // Dibujar power-ups
    gameStateRef.current.powerUps.forEach(powerUp => {
      const scale = 1 + Math.sin(powerUp.pulse) * 0.2;
      const size = powerUp.width * scale;
      
      ctx.save();
      ctx.translate(powerUp.x + powerUp.width/2, powerUp.y + powerUp.height/2);
      
      ctx.fillStyle = powerUp.type === 'speed' ? '#00E676' : '#FFD700';
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = 15;
      
      ctx.beginPath();
      ctx.arc(0, 0, size/2, 0, Math.PI * 2);
      ctx.fill();
      
      // Símbolo
      ctx.fillStyle = '#FFF';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(powerUp.type === 'speed' ? '⚡' : '★', 0, 5);
      
      ctx.restore();
    });

    // Dibujar partículas
    gameStateRef.current.particles.forEach(particle => {
      ctx.save();
      ctx.globalAlpha = particle.life;
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }, []);

  const gameLoop = useCallback(() => {
    updateGame();
    drawGame();
    animationRef.current = requestAnimationFrame(gameLoop);
  }, [updateGame, drawGame]);

  const startGame = () => {
    gameStateRef.current = {
      ...gameStateRef.current,
      isPlaying: true,
      score: 0,
      energyBar: 0,
      cans: [],
      particles: [],
      powerUps: [],
      lastCanSpawn: Date.now(),
      lastPowerUpSpawn: Date.now(),
      gameSpeed: 1,
      level: 1
    };
    
    setGameState(prev => ({
      ...prev,
      isPlaying: true,
      showInstructions: false,
      gameOver: false,
      showCelebration: false,
      score: 0,
      energyBar: 0,
      level: 1
    }));
    
    resizeCanvas();
    gameLoop();
  };

  const pauseGame = () => {
    gameStateRef.current.isPlaying = !gameStateRef.current.isPlaying;
    setGameState(prev => ({ ...prev, isPlaying: gameStateRef.current.isPlaying }));
    
    if (gameStateRef.current.isPlaying) {
      gameLoop();
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const resetGame = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    gameStateRef.current = {
      isPlaying: false,
      score: 0,
      energyBar: 0,
      player: { x: 0, y: 0, width: 60, height: 40 },
      cans: [],
      particles: [],
      powerUps: [],
      lastCanSpawn: 0,
      lastPowerUpSpawn: 0,
      gameSpeed: 1,
      level: 1
    };
    
    setGameState({
      isPlaying: false,
      score: 0,
      energyBar: 0,
      showInstructions: true,
      gameOver: false,
      showCelebration: false,
      motivationalMessage: '',
      level: 1
    });
  };

  // Controles de teclado y touch
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStateRef.current.isPlaying) return;
      
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const player = gameStateRef.current.player;
      const speed = 8;
      
      if (e.key === 'ArrowLeft' && player.x > 0) {
        player.x = Math.max(0, player.x - speed);
      } else if (e.key === 'ArrowRight' && player.x < canvas.width - player.width) {
        player.x = Math.min(canvas.width - player.width, player.x + speed);
      }
    };

    const handleTouch = (e) => {
      if (!gameStateRef.current.isPlaying) return;
      e.preventDefault();
      
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const touchX = touch.clientX - rect.left;
      
      const player = gameStateRef.current.player;
      player.x = Math.max(0, Math.min(canvas.width - player.width, touchX - player.width/2));
    };

    window.addEventListener('keydown', handleKeyPress);
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('touchmove', handleTouch);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (canvas) {
        canvas.removeEventListener('touchmove', handleTouch);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    resizeCanvas();
  }, [resizeCanvas]);

  return (
    <section id="game" className="py-20 px-4 bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-blue-600">
            Atrapa la Energía
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Juega y demuestra tus reflejos. ¡Atrapa todas las latas de Energy Drink para llenar tu barra de energía!
          </p>
        </motion.div>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-6">
            {/* Controles del juego */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={gameState.isPlaying ? pauseGame : startGame}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                >
                  {gameState.isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  <span className="ml-2">{gameState.isPlaying ? 'Pausar' : 'Jugar'}</span>
                </Button>
                
                <Button
                  onClick={resetGame}
                  variant="outline"
                  className="border-orange-300 text-orange-600 hover:bg-orange-50"
                >
                  <RotateCcw size={20} />
                  <span className="ml-2">Reiniciar</span>
                </Button>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{gameState.score}</div>
                  <div className="text-sm text-gray-600">Puntos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">Nivel {gameState.level}</div>
                  <div className="text-sm text-gray-600">Dificultad</div>
                </div>
              </div>
            </div>

            {/* Barra de energía */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">Energía</span>
                <span className="text-sm font-semibold text-orange-600">{gameState.energyBar}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full"
                  style={{ width: `${gameState.energyBar}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${gameState.energyBar}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Canvas del juego */}
            <div className="relative">
              <canvas
                ref={canvasRef}
                className="w-full border-2 border-gray-200 rounded-xl bg-gradient-to-b from-blue-100 to-white"
                style={{ height: '400px' }}
              />
              
              {/* Instrucciones */}
              {gameState.showInstructions && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center"
                >
                  <div className="text-center text-white p-8">
                    <Trophy size={48} className="mx-auto mb-4 text-yellow-400" />
                    <h3 className="text-2xl font-bold mb-4">¿Listo para el Desafío?</h3>
                    <p className="mb-4">
                      {isMobile 
                        ? "Desliza tu dedo a izquierda o derecha para moverte y atrapar las latas."
                        : "Usa las flechas ← → para moverte y atrapar las latas."
                      }
                    </p>
                    <p className="text-sm">¡Llena la barra de energía al 100% para activar tu poder!</p>
                  </div>
                </motion.div>
              )}
              
              {/* Mensaje de celebración */}
              {gameState.showCelebration && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-r from-orange-500/90 to-yellow-500/90 rounded-xl flex items-center justify-center"
                >
                  <div className="text-center text-white">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Trophy size={64} className="mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-3xl font-bold mb-2">{gameState.motivationalMessage}</h3>
                    <p className="text-xl">¡Nivel {gameState.level} Desbloqueado!</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Información adicional */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                💡 <strong>Power-ups:</strong> ⚡ Ralentiza el tiempo | ★ Energía extra
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default EnergyGame;