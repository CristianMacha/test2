// Mock data para Energy Drink
export const mockData = {
  brand: {
    name: "Energy Drink",
    slogan: "Activa Tu Poder",
    cta: "Prueba YA!",
    email: "grupo3@pamer.com",
    location: {
      lat: -12.074764015621291,
      lng: -77.10202139892571,
      address: "San Miguel, Lima, Perú"
    }
  },
  
  benefits: [
    {
      id: 1,
      title: "Mejora tu concentración",
      description: "Fórmula única con cafeína natural que potencia tu enfoque mental durante horas.",
      icon: "brain",
      kpi: "+85% concentración"
    },
    {
      id: 2,
      title: "Recarga tu energía",
      description: "Energía instantánea que dura todo el día sin bajones ni efectos secundarios.",
      icon: "battery",
      kpi: "6h de energía"
    },
    {
      id: 3,
      title: "Aumenta tu rendimiento",
      description: "Optimiza tu rendimiento físico y mental para superar cualquier desafío.",
      icon: "trending-up",
      kpi: "+40% rendimiento"
    }
  ],

  flavors: [
    {
      id: 1,
      name: "Citrus Blast",
      description: "Explosión de cítricos con toque de lima y naranja fresca",
      color: "#FF6B35", // Naranja vibrante
      image: "citrus"
    },
    {
      id: 2,
      name: "Berry Power",
      description: "Mezcla intensa de frutos rojos con un toque energizante",
      color: "#2E86AB", // Azul vibrante
      image: "berry"
    },
    {
      id: 3,
      name: "Tropical Boost",
      description: "Sabor tropical exótico que te transporta al paraíso",
      color: "#A23B72", // Verde vibrante
      image: "tropical"
    }
  ],

  reviews: [
    {
      id: 1,
      name: "María José",
      age: 22,
      profession: "Estudiante",
      rating: 5,
      comment: "¡Increíble! Me ayuda a mantenerme concentrada durante mis largas sesiones de estudio. El sabor Citrus Blast es mi favorito.",
      avatar: "👩‍🎓"
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      age: 25,
      profession: "Deportista",
      rating: 5,
      comment: "Perfect para mis entrenamientos matutinos. Berry Power me da toda la energía que necesito sin sentirme pesado.",
      avatar: "🏃‍♂️"
    },
    {
      id: 3,
      name: "Ana Lucía",
      age: 19,
      profession: "Streamer",
      rating: 5,
      comment: "Como streamer, necesito mantenerme alerta por horas. Energy Drink es mi compañero perfecto para las maratones gaming.",
      avatar: "🎮"
    }
  ],

  gameMessages: [
    "¡Activa Tu Poder!",
    "Prueba YA!",
    "Mejora tu rendimiento",
    "¡Energía Desbloqueada!",
    "¡Power Up Activado!",
    "¡Eres Imparable!"
  ],

  socialMedia: [
    { platform: "Instagram", handle: "@energydrink_pe", url: "#" },
    { platform: "TikTok", handle: "@energydrinkpe", url: "#" },
    { platform: "Facebook", handle: "Energy Drink Perú", url: "#" }
  ]
};

export default mockData;