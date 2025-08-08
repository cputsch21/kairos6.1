"use client";

/**
 * TipTap Editor Component
 * 
 * Rich text editor with markdown support, no toolbar.
 * All formatting by markdown/keyboard.
 */

import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { motion } from 'framer-motion';
import { useNotesStore } from '@/stores/useNotesStore';
import { useUIStore } from '@/stores/useUIStore';
import { getColorModeClasses } from '@/shared/types';

interface TipTapEditorProps {
  content: string;
  onUpdate: (content: string) => void;
  placeholder?: string;
}

export const TipTapEditor: React.FC<TipTapEditorProps> = ({
  content,
  onUpdate,
  placeholder = 'Start typing...',
}) => {
  const { colorMode } = useUIStore();
  const colors = getColorModeClasses(colorMode);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: `prose prose-lg max-w-none focus:outline-none text-gray-800 font-raleway leading-relaxed min-h-[50vh]`,
      },
    },
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
    },
  });

  // Update content when it changes externally
  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  // Update color mode classes
  useEffect(() => {
    if (editor) {
      const element = editor.view.dom as HTMLElement;
      element.className = `prose prose-lg max-w-none focus:outline-none text-gray-800 font-raleway leading-relaxed min-h-[50vh]`;
    }
  }, [colorMode, editor]);

  if (!editor) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <EditorContent editor={editor} />
    </motion.div>
  );
};
