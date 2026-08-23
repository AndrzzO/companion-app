import { motion } from "framer-motion";
import { CheckCircle2, Search, FileSearch, Calendar, Code, Rocket } from "lucide-react";

export function HowWeWork() {
  const steps = [
    { title: "Diagnóstico", desc: "Entendemos o problema", icon: <Search className="w-5 h-5" /> },
    { title: "Análise", desc: "Analisamos a solução", icon: <FileSearch className="w-5 h-5" /> },
    { title: "Planning", desc: "Planejamos cada sprint", icon: <Calendar className="w-5 h-5" /> },
    { title: "Dev", desc: "Desenvolvemos com excelência", icon: <Code className="w-5 h-5" /> },
    { title: "QA", desc: "Validamos cada detalhe", icon: <CheckCircle2 className="w-5 h-5" /> },
    { title: "Deploy", desc: "Entregamos resultados", icon: <Rocket className="w-5 h-5" /> }
  ];

  return (
    <section id="como-trabalhamos" className="py-32 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-accent/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] font-black tracking-[0.4em] text-accent uppercase mb-6 block"
          >
            Delivery Process
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-black text-white tracking-tighter"
          >
            COMO CONSTRUÍMOS <br /> <span className="text-gradient italic">SUCESSO.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
          {steps.map((s, i) => (
            <motion.div 
              key={s.title} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative flex flex-col items-center text-center p-8 glass rounded-2xl hover:bg-slate-900 transition-all duration-500 border-white/5"
            >
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center font-black text-accent mb-6 group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-500">
                {s.icon}
              </div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-white mb-2">{s.title}</h4>
              <p className="text-[11px] text-slate-500 font-bold leading-relaxed">{s.desc}</p>
              
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-white/10 z-20"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}