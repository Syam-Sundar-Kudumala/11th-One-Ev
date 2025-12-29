import { motion } from "framer-motion";
import { ArrowRight, Zap, Battery, Gauge } from "lucide-react";

interface ProductCardProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  specs: Array<{ label: string; value: string; icon: any }>;
  accentColor: string; // 'primary' or 'secondary'
  reversed?: boolean;
}

export function ProductCard({ 
  id, 
  title, 
  subtitle, 
  description, 
  image, 
  specs, 
  accentColor,
  reversed = false 
}: ProductCardProps) {
  const isPrimary = accentColor === 'primary';
  const colorClass = isPrimary ? "text-primary" : "text-secondary";
  const bgClass = isPrimary ? "bg-primary" : "bg-secondary";
  const borderClass = isPrimary ? "border-primary" : "border-secondary";
  
  return (
    <div id={id} className="py-24 overflow-hidden relative">
      {/* Background decoration */}
      <div className={`absolute top-1/2 ${reversed ? 'right-0' : 'left-0'} -translate-y-1/2 w-1/2 h-full ${bgClass} opacity-[0.03] blur-3xl rounded-full`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}>
          
          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: reversed ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 space-y-8"
          >
            <div className="space-y-2">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white/5 ${colorClass} border border-white/10`}>
                {subtitle}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
                {title}
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              {description}
            </p>

            <div className="grid grid-cols-3 gap-6">
              {specs.map((spec, i) => (
                <div key={i} className="space-y-2">
                  <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${colorClass}`}>
                    <spec.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-xl">{spec.value}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">{spec.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <a href="#waitlist" className={`inline-flex items-center gap-2 font-bold ${colorClass} hover:opacity-80 transition-opacity`}>
              Reserve Yours <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative"
          >
            <div className={`absolute inset-0 ${bgClass} blur-[100px] opacity-20`} />
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
              <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" 
              />
              
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="flex items-center justify-between backdrop-blur-md bg-white/5 p-4 rounded-xl border border-white/10">
                  <span className="font-display font-bold">Prototype Phase</span>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs uppercase tracking-wider">In Development</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
