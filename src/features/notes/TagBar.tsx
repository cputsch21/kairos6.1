"use client";

/**
 * Tag Bar Component
 * 
 * Hidden by default, shows on hover.
 * Tags are rendered in primary color, deletable via X.
 * Scrolls horizontally only.
 */

import React from 'react';
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
  const { colorMode } = useUIStore();
  const colors = getColorModeClasses(colorMode);

  return (
    <>
      {isOpen && (
        <div className="bg-white rounded-lg shadow-sm p-2 max-w-xs font-sourcesans">
          {tags.length === 0 ? (
            <div className="text-sm text-gray-500 font-sourcesans">
              No tags yet
            </div>
          ) : (
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 bg-[#B6B1E1] text-white px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap font-sourcesans"
                >
                  <span>{tag}</span>
                  <button
                    onClick={() => onTagDelete(tag)}
                    className="ml-1 hover:bg-[#9a94d4] rounded-full w-3 h-3 flex items-center justify-center transition-colors"
                  >
                    <svg
                      className="w-2 h-2"
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
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};
