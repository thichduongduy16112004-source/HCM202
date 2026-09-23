import React, { type PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const SceneTransition: React.FC<PropsWithChildren> = ({ children }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0.45, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.04 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.72, ease: [0.22, 1, 0.36, 1] }}
      className="relative isolate"
    >
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          className="documentary-paper-sweep pointer-events-none absolute inset-x-0 top-0 z-20 h-16 md:h-24"
          initial={{ opacity: 0.9, scaleX: 1 }}
          whileInView={{ opacity: 0, scaleX: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          style={{ transformOrigin: 'right center' }}
        />
      )}
      {children}
    </motion.div>
  );
};
