import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { getCatalog } from "@/lib/catalog.functions";
import { useQuery } from "@tanstack/react-query";

export function Navbar() {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(2, 6, 23, 0)", "rgba(2, 6, 23, 0.8)"]
  );
  const borderBottom = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.05)"]
  );

  const { data } = useQuery({
    queryKey: ["catalog"],
    queryFn: () => getCatalog(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const whatsappLink = data?.settings?.find((s: any) => s.key === 'whatsapp_link')?.value || 'https://wa.me/5511999999999';

  const navItems = [
    { name: "Início", href: "#inicio" },
    { name: "Soluções", href: "#soluções" },
    { name: "Processo", href: "#como-trabalhamos" },
    { name: "Contato", href: "#contato" },
  ];

  return (
    <motion.nav 
      style={{ backgroundColor, borderBottom }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md py-5"
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
            <span className="text-white font-black text-lg">G</span>
          </div>
          <div className="font-bold text-lg tracking-widest text-white uppercase italic">GUILD<span className="text-accent">.</span>TECH</div>
        </div>
        
        <div className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.2em] font-bold text-slate-400">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className="hover:text-white transition-colors relative group py-2"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <a 
          href={whatsappLink} 
          className="flex items-center gap-2 bg-white text-slate-950 px-6 py-2.5 rounded-full text-[11px] uppercase tracking-widest font-black hover:bg-accent hover:text-white transition-all duration-300 shadow-premium"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Orçamento
        </a>
      </div>
    </motion.nav>
  );
}
