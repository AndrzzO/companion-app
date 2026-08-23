import { Mail, Send } from "lucide-react";
import { getCatalog } from "@/lib/catalog.functions";
import { useQuery } from "@tanstack/react-query";

export function Footer() {
  const { data } = useQuery({
    queryKey: ["catalog"],
    queryFn: () => getCatalog(),
    staleTime: 1000 * 60 * 5,
  });

  const whatsappLink = data?.settings?.find((s: any) => s.key === 'whatsapp_link')?.value || 'https://wa.me/5511999999999';

  return (
    <footer id="contato" className="py-24 bg-slate-950 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 mb-20">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-lg">G</span>
              </div>
              <div className="font-bold text-lg tracking-widest text-white uppercase italic">GUILD<span className="text-accent">.</span>TECH</div>
            </div>
            <h2 className="text-3xl lg:text-5xl font-black text-white mb-8 tracking-tighter leading-tight">
              VAMOS ESCALAR <br />
              <span className="text-gradient italic">SUA OPERAÇÃO.</span>
            </h2>
            <p className="text-slate-400 max-w-md mb-10 leading-relaxed font-medium">
              Transformamos visão técnica em ativos digitais de alto valor. Entre em contato para um diagnóstico gratuito.
            </p>
            
            <div className="flex gap-4">
              {[
                { icon: <span>In</span>, href: "#" },
                { icon: <span>Gh</span>, href: "#" },
                { icon: <Mail className="w-4 h-4" />, href: "#" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div className="glass-card p-10 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[80px]"></div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  id="footer-name"
                  placeholder="NOME" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[10px] font-black tracking-widest text-white focus:border-accent transition-colors placeholder:text-slate-600"
                />
                <div className="w-full bg-slate-900/50 border border-white/5 rounded-xl px-4 py-3 text-[10px] font-black tracking-widest text-slate-500 flex items-center italic">
                  WHATSAPP DIRETO
                </div>
              </div>
              <textarea 
                id="footer-message"
                placeholder="PROJETO / DESAFIO" 
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[10px] font-black tracking-widest text-white focus:border-accent transition-colors placeholder:text-slate-600 resize-none"
              ></textarea>
              <button 
                onClick={() => {
                  const name = (document.getElementById('footer-name') as HTMLInputElement).value;
                  const message = (document.getElementById('footer-message') as HTMLTextAreaElement).value;
                  const text = `Olá, meu nome é ${name}. Gostaria de falar sobre: ${message}`;
                  // Using target="_blank" via window.open is usually preferred for social links from buttons
                  window.open(`https://wa.me/556182586603?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
                }}
                className="w-full bg-accent text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              >
                Falar no WhatsApp
                <Send className="w-3.5 h-3.5 rotate-[-45deg]" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-600 text-[9px] font-black uppercase tracking-[0.3em]">
            © 2026 GUILD TECH SUPPORT. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-8 text-slate-600 text-[9px] font-black uppercase tracking-[0.3em]">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
