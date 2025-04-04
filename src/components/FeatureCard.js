import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ title, description, icon: Icon }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-800 p-6 rounded-lg shadow-xl transform transition-all duration-300 hover:shadow-green-500/20"
    >
      <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-green-500/20">
        <Icon className="w-6 h-6 text-green-500" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
