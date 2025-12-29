import { Navbar } from "@/components/Navbar";
import { WaitlistForm } from "@/components/WaitlistForm";
import { ProductCard } from "@/components/ProductCard";
import { motion, useScroll, useTransform } from "framer-motion";
import { Battery, Zap, Gauge, Shield, Leaf, Wind } from "lucide-react";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden" ref={containerRef}>
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Abstract futuristic background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
          <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          {/* Grid effect */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        <div className="container relative z-10 px-4 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-bold tracking-wider uppercase mb-6 backdrop-blur-sm">
              The Future of Mobility
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-6">
              BEYOND <span className="gradient-text">ELECTRIC</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
              Experience the next generation of urban and off-road mobility. 
              Built for those who dare to lead the charge.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a 
              href="#motorcycle" 
              className="px-8 py-4 rounded-xl font-bold bg-white text-black hover:bg-gray-200 transition-colors min-w-[160px]"
            >
              Explore Moto
            </a>
            <a 
              href="#scooty" 
              className="px-8 py-4 rounded-xl font-bold border border-white/20 hover:bg-white/5 transition-colors min-w-[160px]"
            >
              Explore Scooty
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </section>

      {/* BRAND VALUES */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Leaf, title: "Eco-Engineered", desc: "Zero emissions without compromising raw power." },
              { icon: Shield, title: "Safety First", desc: "Advanced stability control and rider safety systems." },
              { icon: Wind, title: "Aerodynamic", desc: "Sculpted for efficiency and breathtaking speed." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-display">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <ProductCard
        id="motorcycle"
        title="The Predator 11"
        subtitle="Adventure Series"
        description="Built for the untamed path. The Predator 11 combines rugged durability with electric precision, delivering instant torque for conquering any terrain. Designed for the modern adventurer who demands power and sustainability."
        image="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop" /* high-quality motorcycle image */
        specs={[
          { label: "Range", value: "250 km", icon: Battery },
          { label: "Top Speed", value: "140 km/h", icon: Gauge },
          { label: "Torque", value: "80 Nm", icon: Zap },
        ]}
        accentColor="primary"
      />

      <ProductCard
        id="scooty"
        title="The E-Grace"
        subtitle="Urban Series"
        description="Elegance meets efficiency. The E-Grace is crafted for the sophisticated urban commuter. With its lightweight frame, ample storage, and whisper-quiet motor, it turns your daily commute into a moment of zen."
        image="https://images.unsplash.com/photo-1620802051788-b295ed1b996c?q=80&w=2070&auto=format&fit=crop" /* high-quality scooter image */
        specs={[
          { label: "Range", value: "120 km", icon: Battery },
          { label: "Charging", value: "2 Hours", icon: Zap },
          { label: "Weight", value: "85 kg", icon:  Leaf },
        ]}
        accentColor="secondary"
        reversed={true}
      />

      {/* TECHNOLOGY / SUSTAINABILITY */}
      <section id="technology" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Powered by Innovation</h2>
            <p className="text-muted-foreground text-lg">
              Our proprietary battery management system and lightweight alloy frames set a new standard for the industry. We don't just build vehicles; we engineer experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
             <div className="relative aspect-video rounded-2xl overflow-hidden group">
               <img 
                 src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop" /* engineering/tech abstract */
                 alt="Battery Tech"
                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
               />
               <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-8 text-center">
                 <div>
                   <h3 className="text-2xl font-display font-bold mb-2">HyperCore Battery</h3>
                   <p className="text-gray-300">High-density cells with 3000+ charge cycles.</p>
                 </div>
               </div>
             </div>
             <div className="relative aspect-video rounded-2xl overflow-hidden group">
               <img 
                 src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" /* manufacturing/tech abstract */
                 alt="Smart Connectivity"
                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
               />
               <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-8 text-center">
                 <div>
                   <h3 className="text-2xl font-display font-bold mb-2">Smart Connect</h3>
                   <p className="text-gray-300">Real-time diagnostics and GPS tracking via app.</p>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* WAITLIST SECTION */}
      <section id="waitlist" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-primary/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight">
                Be the <span className="text-primary">11thOne</span> to Ride the Future.
              </h2>
              <p className="text-xl text-muted-foreground">
                Join our exclusive waitlist to get early access, developer updates, and special launch pricing.
                Limited slots available for the first production batch.
              </p>
              <ul className="space-y-4">
                {[
                  "Priority delivery slot",
                  "Exclusive founder's badge",
                  "Lifetime app subscription"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-lg font-medium">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <Zap className="w-3 h-3" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-display font-bold text-2xl mb-1">11thOne</h3>
            <p className="text-muted-foreground text-sm">Next-Generation Electric Vehicles</p>
          </div>
          <div className="text-sm text-muted-foreground text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} 11thOne EVs. All rights reserved.</p>
            <p className="mt-1">Prototype designs subject to change.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
