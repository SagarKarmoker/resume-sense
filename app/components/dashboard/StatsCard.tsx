import { LucideIcon } from "lucide-react";
import { useState, useEffect } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconBgColor: string;
  delay?: number;
}

export default function StatsCard({ title, value, icon: Icon, iconBgColor, delay = 0 }: StatsCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (isVisible && typeof value === 'number') {
      const duration = 1000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    } else if (isVisible) {
      setDisplayValue(value as number);
    }
  }, [isVisible, value]);

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-200 p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-slate-900">
            {typeof value === 'number' ? displayValue : value}
            {typeof value === 'number' && title.includes('Score') && '/100'}
            {typeof value === 'number' && title.includes('Match') && '%'}
          </p>
        </div>
        <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:rotate-3`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      
      {/* Animated background gradient */}
      <div className={`absolute inset-0 rounded-xl opacity-0 hover:opacity-10 transition-opacity duration-300 ${iconBgColor.replace('bg-', 'bg-gradient-to-r from-')}`}></div>
    </div>
  );
} 