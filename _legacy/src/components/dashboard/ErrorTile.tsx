'use client';

import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorTileProps {
  message?: string;
}

export function ErrorTile({ message = 'Unable to load courses. Check your connection or try again.' }: ErrorTileProps) {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 24,
        mass: 1.0,
      }}
      className="col-span-2 rounded-2xl border border-red-500/20 bg-red-950/10 p-6"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10">
          <AlertCircle className="h-5 w-5 text-red-400" />
        </div>
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-medium text-red-300">Connection Error</h3>
            <p className="mt-1 text-sm text-slate-400">{message}</p>
          </div>
          <button
            onClick={handleRetry}
            className="inline-flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/20"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Retry
          </button>
        </div>
      </div>
    </motion.article>
  );
}
