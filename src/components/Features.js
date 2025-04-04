import React from 'react';
import FeatureCard from './FeatureCard';
import { MapIcon, ChartBarIcon, CloudIcon } from '@heroicons/react/24/outline';

const Features = () => {
  const features = [
    {
      title: 'Interactive Maps',
      description: 'Visualize land data with advanced mapping tools and real-time updates.',
      icon: MapIcon,
    },
    {
      title: 'Data Visualization',
      description: 'Analyze survey data with intuitive charts and comprehensive analytics.',
      icon: ChartBarIcon,
    },
    {
      title: 'Cloud Storage',
      description: 'Secure and reliable storage for all your land survey data.',
      icon: CloudIcon,
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover the tools that make digital land surveying more efficient and accurate.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
