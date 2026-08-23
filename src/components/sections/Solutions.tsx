import { Database } from "@/integrations/supabase/types";
import { motion } from "framer-motion";
import { ArrowUpRight, Zap } from "lucide-react";

type Service = Database["public"]["Tables"]["services"]["Row"];
type Category = Database["public"]["Tables"]["categories"]["Row"];

interface SolutionsProps {
  services: Service[];
  categories: Category[];
}

export function Solutions({ services, categories }: SolutionsProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="soluções" className="py-32 bg-background relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-8 bg-accent"></div>
            <span className="text-[10px] font-black tracking-[0.3em] text-accent uppercase">Engineered Portfolio</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-black text-white mb-8 tracking-tighter"
          >
            CATÁLOGO DE <br />
            <span className="text-gradient">SOLUÇÕES</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 leading-relaxed font-medium"
          >
            Engenharia de software aplicada para resolver desafios complexos. Desenvolvemos ferramentas digitais sob medida que elevam a maturidade operacional e estratégica do seu negócio.
          </motion.p>
        </div>

        {categories.map((category) => {
          const categoryServices = services.filter(s => s.category_id === category.id);
          if (categoryServices.length === 0) return null;

          return (
            <div key={category.id} className="mb-32 last:mb-0">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-end justify-between border-b border-white/5 pb-8 mb-16"
              >
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 block">
                    Domain / {category.name}
                  </span>
                  <h4 className="text-3xl font-black text-white tracking-tighter uppercase italic">
                    {category.name}
                  </h4>
                </div>
                <div className="text-slate-600 text-xs font-mono">
                  {categoryServices.length.toString().padStart(2, '0')} UNITS
                </div>
              </motion.div>
              
              <motion.div 
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {categoryServices.map((service) => (
                  <motion.div 
                    key={service.id} 
                    variants={item}
                    className="group flex flex-col p-10 glass-card rounded-3xl hover:-translate-y-2 transition-all duration-500"
                  >
                    <div className="flex justify-between items-start mb-8">
                      <h5 className="font-black text-xl text-white group-hover:text-accent transition-colors duration-300 tracking-tight leading-tight">
                        {service.name}
                      </h5>
                      {service.is_featured && (
                        <div className="flex items-center gap-1.5 text-[8px] uppercase tracking-[0.2em] font-black text-accent bg-accent/10 px-3 py-1.5 rounded-full border border-accent/20">
                          <Zap className="w-2.5 h-2.5 fill-accent" />
                          Premium
                        </div>
                      )}
                    </div>
                    
                    <p className="text-slate-400 text-sm leading-relaxed mb-12 flex-grow font-medium">
                      {service.description}
                    </p>
                    
                    <div className="pt-8 border-t border-white/5 flex flex-col gap-8">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-slate-500 text-[9px] font-bold uppercase tracking-[0.2em] mb-1">Est. Investment</span>
                          <span className="font-black text-white text-lg tracking-tight">
                            {service.price_prefix} {service.price ? `R$ ${service.price.toLocaleString('pt-BR')}` : 'Consult'}
                          </span>
                        </div>
                        
                        <a 
                          href={`https://wa.me/5511999999999?text=Olá, gostaria de saber mais sobre ${service.name}`}
                          className="bg-white text-slate-950 w-12 h-12 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300 shadow-premium group/btn"
                        >
                          <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </a>
                      </div>
                      
                      <a 
                        href={`https://wa.me/5511999999999?text=Olá, gostaria de saber mais sobre ${service.name}`}
                        className="text-slate-500 text-[9px] font-black uppercase tracking-[0.3em] hover:text-accent transition-colors duration-300"
                      >
                        {service.cta_text || "Request Access"}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}