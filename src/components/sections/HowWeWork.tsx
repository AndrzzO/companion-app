import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Search, FileSearch, Calendar, Code, Rocket, X } from "lucide-react";
import { useState } from "react";

export function HowWeWork() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    { 
      title: "Diagnóstico", 
      desc: "Entendemos o problema", 
      details: "Mergulhamos fundo no seu modelo de negócio para identificar gargalos operacionais e oportunidades de otimização tecnológica.",
      icon: <Search className="w-5 h-5" /> 
    },
    { 
      title: "Análise", 
      desc: "Analisamos a solução", 
      details: "Cruzamos suas necessidades com as melhores tecnologias do mercado para desenhar uma arquitetura robusta e escalável.",
      icon: <FileSearch className="w-5 h-5" /> 
    },
    { 
      title: "Planning", 
      desc: "Planejamos cada sprint", 
      details: "Estruturamos o roadmap de desenvolvimento com entregas claras, prazos realistas e marcos de sucesso bem definidos.",
      icon: <Calendar className="w-5 h-5" /> 
    },
    { 
      title: "Dev", 
      desc: "Desenvolvemos com excelência", 
      details: "Nossa engenharia transforma o plano em código limpo, seguindo padrões premium de performance e segurança.",
      icon: <Code className="w-5 h-5" /> 
    },
    { 
      title: "QA", 
      desc: "Validamos cada detalhe", 
      details: "Testes rigorosos garantem que cada funcionalidade opere perfeitamente antes de chegar ao ambiente de produção.",
      icon: <CheckCircle2 className="w-5 h-5" /> 
    },
    { 
      title: "Deploy", 
      desc: "Entregamos resultados", 
      details: "Lançamento assistido e monitorado, garantindo uma transição suave para as novas ferramentas que impulsionarão seu negócio.",
      icon: <Rocket className="w-5 h-5" /> 
    }
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
              
              <button
                onClick={() => setActiveStep(i)}
                className="mt-4 text-[9px] font-black uppercase tracking-tighter text-accent opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer underline underline-offset-4"
              >
                Ver Detalhes
              </button>

              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-white/10 z-20"></div>
              )}
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {activeStep !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md"
              onClick={() => setActiveStep(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="glass-card max-w-lg w-full p-12 rounded-3xl relative border-accent/20"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setActiveStep(null)}
                  className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-8">
                  {steps[activeStep as number].icon}
                </div>

                <span className="text-[10px] font-black tracking-[0.3em] text-accent uppercase mb-4 block">
                  Fase {(activeStep as number) + 1} / {steps[activeStep as number].title}
                </span>

                <h3 className="text-3xl font-black text-white mb-6 tracking-tighter italic">
                  {steps[activeStep as number].desc}
                </h3>

                <p className="text-slate-400 text-lg leading-relaxed font-medium">
                  {steps[activeStep as number].details}
                </p>

                <div className="mt-12 pt-8 border-t border-white/5">
                  <button 
                    onClick={() => setActiveStep(null)}
                    className="w-full py-4 bg-accent text-white rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all"
                  >
                    Entendido
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}