import React from "react";

const Loader = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="flex flex-col items-center space-y-8 p-10 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700/80">
        
        {/* Modern Brand Logo Section (Optional, but professional) */}
        <div className="flex items-center space-x-3 text-emerald-600 dark:text-emerald-400 font-extrabold text-3xl">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
            📊
          </span>
          <span>Lime Survey</span>
        </div>

        {/* Emerald Animated Spinner with Chart Icon */}
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 rounded-full border-8 border-emerald-100 dark:border-emerald-950/60"></div>
          <div className="absolute inset-0 rounded-full border-8 border-emerald-600 dark:border-emerald-500 border-t-transparent animate-spin"></div>
          {/* Central Pulsing Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl animate-pulse">📊</span>
          </div>
        </div>

        {/* Professional Loading Typography */}
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Lime Survey is gathering feedback...
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
            Analyzing public opinion, please wait. Your insights help shape the future.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;