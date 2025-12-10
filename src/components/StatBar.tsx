import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface StatBarProps {
  label: string;
  value: number;
  maxValue?: number;
  delay?: number;
}

const StatBar = ({ label, value, maxValue = 100, delay = 0 }: StatBarProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const percentage = (value / maxValue) * 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(percentage);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [percentage, delay]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
          {label}
        </span>
        <span className="text-xs font-bold text-primary">
          {value}
        </span>
      </div>
      
      <div className="stat-bar">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${animatedValue}%` }}
          transition={{ duration: 1.5, delay, ease: 'easeOut' }}
          className="stat-bar-fill"
        />
        
        {/* Shimmer Effect */}
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 2, delay: delay + 1, repeat: Infinity, repeatDelay: 3 }}
          className="absolute inset-y-0 w-1/3 bg-shimmer"
        />
      </div>
    </div>
  );
};

export default StatBar;
