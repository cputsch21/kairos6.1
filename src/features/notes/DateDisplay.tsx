"use client";

/**
 * Date Display Component
 * 
 * Shows the date in the top right margin style.
 * Clicking opens the date picker.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { formatDate } from '@/shared/types';
import { useUIStore } from '@/stores/useUIStore';
import { getColorModeClasses } from '@/shared/types';

interface DateDisplayProps {
  date: string;
}

export const DateDisplay: React.FC<DateDisplayProps> = ({ date }) => {
  const { colorMode, toggleDatePicker } = useUIStore();
  const colors = getColorModeClasses(colorMode);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-6 right-6 z-40"
    >
      <button
        onClick={toggleDatePicker}
        className={`text-sm ${colors.textSecondary} hover:${colors.text} transition-colors cursor-pointer font-medium font-raleway`}
        title="Click to change date"
      >
        {formatDate(date)}
      </button>
    </motion.div>
  );
};
