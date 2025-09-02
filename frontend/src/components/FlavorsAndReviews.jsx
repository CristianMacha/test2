import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import mockData from '../mock';

const FlavorsAndReviews = () => {
  const [selectedFlavor, setSelectedFlavor] = useState(mockData.flavors[0]);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Sección de Sabores */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600">
              Sabores Irresistibles
            </h2>
            
            <div className="space-y-4 mb-8">
              {mockData.flavors.map((flavor, index) => (
                <motion.div
                  key={flavor.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    selectedFlavor.id === flavor.id
                      ? 'bg-white shadow-lg ring-2 ring-orange-300'
                      : 'bg-white/70 hover:bg-white hover:shadow-md'
                  }`}
                  onClick={() => setSelectedFlavor(flavor)}
                >
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg"
                      style={{ backgroundColor: flavor.color }}
                    >
                      {flavor.name[0]}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {flavor.name}
                      </h3>
                      <p className="text-gray-600">
                        {flavor.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button 
                size="lg"
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300"
              >
                Probar {selectedFlavor.name}
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Sección de Reseñas */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              Lo Que Dicen Nuestros Fans
            </h2>
            
            <div className="space-y-6">
              {mockData.reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="text-3xl">{review.avatar}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-bold text-gray-800">{review.name}</h4>
                              <p className="text-sm text-gray-600">{review.profession}, {review.age} años</p>
                            </div>
                            <div className="flex items-center">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} size={16} className="text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                          
                          <div className="relative">
                            <Quote size={20} className="absolute -top-2 -left-1 text-orange-300" />
                            <p className="text-gray-700 italic pl-6">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {/* Estadísticas de reseñas */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-8 grid grid-cols-3 gap-4"
            >
              {[
                { value: "4.9/5", label: "Calificación" },
                { value: "2,847", label: "Reseñas" },
                { value: "98%", label: "Recomiendan" }
              ].map((stat, index) => (
                <div key={index} className="text-center p-4 bg-white/60 rounded-lg">
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-600">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FlavorsAndReviews;