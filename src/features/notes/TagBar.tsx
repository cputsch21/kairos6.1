"use client";

/**
 * Tag Bar Component
 * 
 * Hidden by default, shows on hover.
 * Tags are rendered in primary color, deletable via X.
 * Scrolls horizontally only.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TagBarProps } from '@/shared/types';
import { useUIStore } from '@/stores/useUIStore';
import { getColorModeClasses } from '@/shared/types';

export const TagBar: React.FC<TagBarProps> = ({
  isOpen,
  onToggle,
  tags,
  onTagDelete,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { colorMode } = useUIStore();
  const colors = getColorModeClasses(colorMode);

  return (
    <div
      className="fixed top-6 left-6 z-40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tag Icon - hidden by default, shows on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={onToggle}
            className={`p-2 rounded-full ${colors.surface} ${colors.border} border shadow-sm hover:shadow-md transition-all duration-200`}
            title="Toggle tags"
          >
            <svg
              className="w-4 h-4 text-primary-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Tag Bar - hidden by default, can be opened */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className={`mt-2 p-3 rounded-lg ${colors.surface} ${colors.border} border shadow-lg max-w-xs`}
          >
            {tags.length === 0 ? (
              <div className={`text-sm ${colors.textSecondary} font-sans`}>
                No tags yet
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {tags.map((tag, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-1 bg-primary-400 text-white px-2 py-1 rounded-full text-xs font-medium"
                  >
                    <span>{tag}</span>
                    <button
                      onClick={() => onTagDelete(tag)}
                      className="ml-1 hover:bg-primary-500 rounded-full w-4 h-4 flex items-center justify-center transition-colors"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
