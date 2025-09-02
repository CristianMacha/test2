import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Instagram, Facebook, Twitter, Heart, Zap } from 'lucide-react';
import mockData from '../mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Productos",
      links: [
        { name: "Citrus Blast", href: "#flavors" },
        { name: "Berry Power", href: "#flavors" },
        { name: "Tropical Boost", href: "#flavors" },
        { name: "Edición Limitada", href: "#" }
      ]
    },
    {
      title: "Empresa",
      links: [
        { name: "Sobre Nosotros", href: "#about" },
        { name: "Nuestra Historia", href: "#" },
        { name: "Carreras", href: "#" },
        { name: "Prensa", href: "#" }
      ]
    },
    {
      title: "Soporte",
      links: [
        { name: "Centro de Ayuda", href: "#" },
        { name: "Contacto", href: "#contact" },
        { name: "FAQ", href: "#" },
        { name: "Garantía", href: "#" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Política de Privacidad", href: "#" },
        { name: "Términos de Uso", href: "#" },
        { name: "Política de Cookies", href: "#" },
        { name: "Aviso Legal", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    {
      icon: Instagram,
      href: "https://instagram.com/energydrink_pe",
      color: "hover:text-pink-500",
      name: "Instagram"
    },
    {
      icon: Facebook,
      href: "https://facebook.com/energydrinkperu",
      color: "hover:text-blue-600",
      name: "Facebook"
    },
    {
      icon: Twitter,
      href: "https://twitter.com/energydrink_pe",
      color: "hover:text-blue-400",
      name: "Twitter"
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-500 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-green-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Sección principal del footer */}
        <div className="px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-6 gap-8">
              
              {/* Brand section */}
              <motion.div 
                className="lg:col-span-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="mb-8">
                  <h3 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-400">
                    {mockData.brand.name}
                  </h3>
                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                    Activamos tu poder interior con cada sorbo. Descubre la bebida energizante 
                    que está revolucionando la forma de enfrentar tus desafíos diarios.
                  </p>
                  
                  {/* Stats mini */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                      <div className="text-2xl font-bold text-orange-400">10K+</div>
                      <div className="text-xs text-gray-400">Usuarios</div>
                    </div>
                    <div className="text-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                      <div className="text-2xl font-bold text-blue-400">95%</div>
                      <div className="text-xs text-gray-400">Satisfacción</div>
                    </div>
                  </div>
                </div>

                {/* Redes sociales */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <Zap size={20} className="mr-2 text-orange-400" />
                    Síguenos
                  </h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => {
                      const IconComponent = social.icon;
                      return (
                        <motion.a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:scale-110 ${social.color}`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <IconComponent size={18} />
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* Links sections */}
              {footerSections.map((section, sectionIndex) => (
                <motion.div
                  key={sectionIndex}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: sectionIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-lg font-semibold mb-6 text-white">
                    {section.title}
                  </h4>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <motion.li
                        key={linkIndex}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <a
                          href={link.href}
                          className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                        >
                          <span className="w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2"></span>
                          {link.name}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter section */}
        <motion.div
          className="border-t border-gray-700 py-12 px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-400">
                  ¡Mantente Energizado!
                </h4>
                <p className="text-gray-400">
                  Recibe las últimas noticias, ofertas especiales y tips de energía directamente en tu email.
                </p>
              </div>
              <div className="flex">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 px-4 py-3 bg-white/10 border border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent backdrop-blur-sm text-white placeholder-gray-400"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-blue-600 rounded-r-lg hover:from-orange-600 hover:to-blue-700 transition-all duration-300 font-semibold hover:shadow-lg">
                  Suscribirse
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom section */}
        <div className="border-t border-gray-700 py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-4 text-gray-400">
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2 text-orange-400" />
                  <span>{mockData.brand.location.address}</span>
                </div>
                <div className="hidden md:block">|</div>
                <div className="flex items-center">
                  <Mail size={16} className="mr-2 text-blue-400" />
                  <a href={`mailto:${mockData.brand.email}`} className="hover:text-white transition-colors">
                    {mockData.brand.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center text-gray-400">
                <span>© {currentYear} Energy Drink. Hecho con</span>
                <Heart size={16} className="mx-2 text-red-400 animate-pulse" />
                <span>en Perú</span>
              </div>
            </motion.div>

            {/* Disclaimer */}
            <motion.div
              className="mt-6 pt-6 border-t border-gray-800 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-xs text-gray-500 max-w-4xl mx-auto leading-relaxed">
                Energy Drink es una bebida energizante formulada para adultos. 
                Contiene cafeína natural. No recomendado para menores de 18 años, mujeres embarazadas o en período de lactancia. 
                Consume con moderación como parte de una dieta balanceada y estilo de vida activo.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;