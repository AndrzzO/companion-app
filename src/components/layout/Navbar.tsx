import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 py-4">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="font-bold text-xl tracking-tight text-slate-900">GUILD TECH SUPPORT</div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          {["Início", "Soluções", "Serviços", "Produtos", "Sobre nós", "Como trabalhamos", "FAQ", "Contato"].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} className="hover:text-blue-600 transition-colors">
              {item}
            </a>
          ))}
        </div>
        <a 
          href="https://wa.me/5511999999999" 
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm"
        >
          Solicitar orçamento
        </a>
      </div>
    </nav>
  );
}
