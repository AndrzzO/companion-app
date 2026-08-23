import { motion } from "framer-motion";
import { Code2, Zap, LayoutDashboard, TrendingUp } from "lucide-react";

export function Pillars() {
  const pillars = [
    { 
      title: "Desenvolvimento", 
      description: "Sistemas robustos e interfaces de alta fidelidade que convertem visitantes em clientes fiéis.",
      icon: <Code2 className="w-6 h-6" />,
      color: "bg-blue-500/10 text-blue-500"
    },
    { 
      title: "Automação", 
      description: "Fluxos de trabalho inteligentes que eliminam gargalos e devolvem tempo para o que importa.",
      icon: <Zap className="w-6 h-6" />,
      color: "bg-amber-500/10 text-amber-500"
    },
    { 
      title: "Gestão", 
      description: "Painéis estratégicos que transformam dados complexos em insights claros para decisões rápidas.",
      icon: <LayoutDashboard className="w-6 h-6" />,
      color: "bg-emerald-500/10 text-emerald-500"
    },
    { 
      title: "Escalabilidade", 
      description: "Infraestrutura flexível projetada para suportar o crescimento exponencial do seu ecossistema.",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-purple-500/10 text-purple-500"
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-32 bg-slate-950 relative overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/5 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/5 to-transparent"></div>

      <div className="container mx-auto px-6">
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden shadow-2xl"
        >
          {pillars.map((p) => (
            <motion.div 
              key={p.title} 
              variants={item}
              className="bg-slate-950 p-10 group hover:bg-slate-900 transition-all duration-500 relative"
            >
              <div className={`w-14 h-14 rounded-2xl ${p.color} flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                {p.icon}
              </div>
              <h3 className="font-black text-xs uppercase tracking-[0.2em] mb-4 text-white group-hover:text-accent transition-colors">{p.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">{p.description}</p>
              
              <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-6 h-px bg-accent"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}