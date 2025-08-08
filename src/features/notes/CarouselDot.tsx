"use client";

/**
 * Carousel Dot Component
 * 
 * Shows briefly during note navigation.
 * Only visible for a few seconds while navigating.
 * Animation is subtle and on-brand.
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/stores/useUIStore';
import { getColorModeClasses } from '@/shared/types';

export const CarouselDot: React.FC = () => {
  const { showCarouselDot, carouselDotPosition, carouselDotTotal, colorMode } = useUIStore();
  const colors = getColorModeClasses(colorMode);

  if (!showCarouselDot || carouselDotTotal <= 1) {
    return null;
  }

  return (
    <AnimatePresence>
      {showCarouselDot && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className={`flex items-center space-x-1 ${colors.surface} ${colors.border} border px-3 py-1 rounded-full text-sm shadow-lg backdrop-blur-sm`}>
            <span className={`font-medium ${colors.text}`}>{carouselDotPosition + 1}</span>
            <span className={`${colors.textSecondary}`}>/</span>
            <span className={`${colors.textSecondary}`}>{carouselDotTotal}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
