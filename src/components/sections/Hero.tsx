import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Shield, Cpu, Code } from "lucide-react";

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-mesh">
      {/* Background visual elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Engineering Premium Solutions</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl lg:text-8xl font-black mb-8 leading-[0.95] tracking-tighter"
          >
            TECNOLOGIA <br />
            <span className="text-gradient">QUE TRANSFORMA</span> <br />
            <span className="flex items-center gap-4">
              RESULTADOS
              <div className="h-px flex-grow bg-white/10 hidden lg:block"></div>
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg lg:text-xl text-slate-400 mb-12 max-w-2xl leading-relaxed"
          >
            Desenvolvemos ecossistemas digitais de alta performance. 
            Sites, sistemas e automações desenhados para elevar a maturidade tecnológica da sua empresa.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 items-start sm:items-center"
          >
            <a 
              href="#contato" 
              className="group relative bg-accent text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all duration-300 shadow-premium overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Solicitar Diagnóstico
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>
            
            <a 
              href="#soluções" 
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-colors group"
            >
              Nossas Soluções
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Bento-style stats/info cards */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { icon: <Shield className="w-5 h-5" />, title: "Segurança Pró-ativa", desc: "Protocolos avançados de proteção de dados." },
            { icon: <Cpu className="w-5 h-5" />, title: "Performance Extrema", desc: "Infraestrutura escalável e código otimizado." },
            { icon: <Code className="w-5 h-5" />, title: "Clean Code", desc: "Arquitetura sólida para facilitar evolução." }
          ].map((item, i) => (
            <div key={i} className="glass-card p-8 rounded-2xl group hover:border-accent/30 transition-all duration-500">
              <div className="text-accent mb-6 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
              <h3 className="font-bold text-sm uppercase tracking-widest mb-3">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}