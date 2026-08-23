import { Database } from "@/integrations/supabase/types";

type Service = Database["public"]["Tables"]["services"]["Row"];
type Category = Database["public"]["Tables"]["categories"]["Row"];

interface SolutionsProps {
  services: Service[];
  categories: Category[];
}

export function Solutions({ services, categories }: SolutionsProps) {
  return (
    <section id="soluções" className="py-24 bg-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:40px_40px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-20">
          <h2 className="text-sm font-bold tracking-[0.2em] text-blue-600 uppercase mb-4">Portfólio de Soluções</h2>
          <h3 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">O que desenvolvemos</h3>
          <div className="h-1.5 w-20 bg-blue-600 mb-8"></div>
          <p className="text-lg text-slate-500 leading-relaxed">
            Engenharia de software aplicada para resolver desafios complexos. Desenvolvemos ferramentas digitais sob medida que elevam a maturidade operacional e estratégica do seu negócio.
          </p>
        </div>

        {categories.map((category) => {
          const categoryServices = services.filter(s => s.category_id === category.id);
          if (categoryServices.length === 0) return null;

          return (
            <div key={category.id} className="mb-24 last:mb-0">
              <div className="flex items-center gap-4 mb-12">
                <span className="text-xs font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full uppercase tracking-widest">
                  Categoria
                </span>
                <h4 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {category.name}
                </h4>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryServices.map((service) => (
                  <div 
                    key={service.id} 
                    className="group flex flex-col p-10 border border-slate-100 rounded-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-2 transition-all duration-500 bg-white"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <h5 className="font-bold text-xl text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                        {service.name}
                      </h5>
                      {service.is_featured && (
                        <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.15em] font-black text-blue-600 bg-blue-50 px-2.5 py-1.5 rounded-md border border-blue-100">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
                          Premium
                        </div>
                      )}
                    </div>
                    
                    <p className="text-slate-500 leading-relaxed mb-10 flex-grow">
                      {service.description}
                    </p>
                    
                    <div className="pt-8 border-t border-slate-50 flex flex-col gap-6">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-slate-400 text-[9px] font-bold uppercase tracking-widest mb-1">Investimento Est.</span>
                          <span className="font-bold text-slate-900 text-lg">
                            {service.price_prefix} {service.price ? `R$ ${service.price.toLocaleString('pt-BR')}` : 'Sob consulta'}
                          </span>
                        </div>
                        <a 
                          href={`https://wa.me/5511999999999?text=Olá, gostaria de saber mais sobre ${service.name}`}
                          className="bg-slate-900 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                        >
                          →
                        </a>
                      </div>
                      
                      <a 
                        href={`https://wa.me/5511999999999?text=Olá, gostaria de saber mais sobre ${service.name}`}
                        className="text-slate-400 text-[10px] font-bold uppercase tracking-widest hover:text-blue-600 transition-colors duration-300"
                      >
                        {service.cta_text}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
