import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Mail, Phone, MapPin, Clock, Instagram, Facebook } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import mockData from '../mock';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapAndContact = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    // Cargar el mapa después de un breve delay para mejor rendimiento
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleEmailClick = () => {
    window.location.href = `mailto:${mockData.brand.email}`;
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      info: mockData.brand.email,
      action: handleEmailClick
    },
    {
      icon: Phone,
      title: 'Teléfono',
      info: '+51 999 888 777',
      action: () => window.location.href = 'tel:+51999888777'
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      info: mockData.brand.location.address,
      action: null
    },
    {
      icon: Clock,
      title: 'Horario',
      info: 'Lun - Dom: 24/7',
      action: null
    }
  ];

  const socialLinks = [
    {
      icon: Instagram,
      name: 'Instagram',
      handle: '@energydrink_pe',
      color: 'from-pink-500 to-purple-600',
      url: 'https://instagram.com/energydrink_pe'
    },
    {
      icon: Facebook,
      name: 'Facebook',
      handle: 'Energy Drink Perú',
      color: 'from-blue-600 to-blue-700',
      url: 'https://facebook.com/energydrinkperu'
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">
            Encuéntranos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Visita nuestra ubicación principal en Lima o contáctanos para conocer más sobre Energy Drink
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold mb-8 text-gray-800">
                Información de Contacto
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((contact, index) => {
                  const IconComponent = contact.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-blue-600 rounded-lg flex items-center justify-center">
                              <IconComponent size={24} className="text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800 mb-1">
                                {contact.title}
                              </h4>
                              <p className="text-gray-600">
                                {contact.info}
                              </p>
                            </div>
                            {contact.action && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={contact.action}
                                className="border-orange-300 text-orange-600 hover:bg-orange-50"
                              >
                                Contactar
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Redes sociales */}
            <div>
              <h4 className="text-2xl font-bold mb-6 text-gray-800">
                Síguenos en Redes
              </h4>
              
              <div className="space-y-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-4">
                              <div className={`w-10 h-10 bg-gradient-to-r ${social.color} rounded-lg flex items-center justify-center`}>
                                <IconComponent size={20} className="text-white" />
                              </div>
                              <div>
                                <h5 className="font-semibold text-gray-800">
                                  {social.name}
                                </h5>
                                <p className="text-sm text-gray-600">
                                  {social.handle}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </a>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Call to action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-orange-500 to-blue-600 rounded-2xl p-8 text-white text-center"
            >
              <h4 className="text-2xl font-bold mb-4">
                ¿Listo para Activar Tu Poder?
              </h4>
              <p className="mb-6">
                Únete a miles de personas que ya han descubierto el poder de Energy Drink
              </p>
              <Button 
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
                onClick={handleEmailClick}
              >
                Contáctanos Ahora
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Mapa */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="h-96 lg:h-[600px]"
          >
            <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-xl overflow-hidden">
              <CardContent className="p-0 h-full">
                {isMapLoaded ? (
                  <MapContainer
                    center={[mockData.brand.location.lat, mockData.brand.location.lng]}
                    zoom={15}
                    className="h-full w-full rounded-xl"
                    zoomControl={true}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[mockData.brand.location.lat, mockData.brand.location.lng]}>
                      <Popup>
                        <div className="text-center p-2">
                          <h4 className="font-bold text-lg mb-2 text-orange-600">
                            Energy Drink HQ
                          </h4>
                          <p className="text-gray-700 mb-2">
                            {mockData.brand.location.address}
                          </p>
                          <p className="text-sm text-gray-600">
                            ¡Ven y conoce nuestras instalaciones!
                          </p>
                        </div>
                      </Popup>
                    </Marker>
                  </MapContainer>
                ) : (
                  <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 rounded-xl">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                      <p className="text-gray-600">Cargando mapa...</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Información adicional */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Delivery Gratis",
                description: "En pedidos mayores a S/50 en Lima Metropolitana",
                icon: "🚚"
              },
              {
                title: "Garantía 100%",
                description: "Si no estás satisfecho, te devolvemos tu dinero",
                icon: "✅"
              },
              {
                title: "Soporte 24/7",
                description: "Estamos aquí para ayudarte cuando lo necesites",
                icon: "🔧"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MapAndContact;