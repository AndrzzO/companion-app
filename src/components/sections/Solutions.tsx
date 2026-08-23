import { Database } from "@/integrations/supabase/types";

type Service = Database["public"]["Tables"]["services"]["Row"];
type Category = Database["public"]["Tables"]["categories"]["Row"];

interface SolutionsProps {
  services: Service[];
  categories: Category[];
}

export function Solutions({ services, categories }: SolutionsProps) {
  return (
    <section id="soluções" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">O que desenvolvemos</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Soluções tecnológicas sob medida, desenhadas para elevar a maturidade digital da sua empresa.
          </p>
        </div>

        {categories.map((category) => {
          const categoryServices = services.filter(s => s.category_id === category.id);
          if (categoryServices.length === 0) return null;

          return (
            <div key={category.id} className="mb-16 last:mb-0">
              <h3 className="text-xl font-semibold mb-8 border-l-4 border-blue-600 pl-4">
                {category.name}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryServices.map((service) => (
                  <div 
                    key={service.id} 
                    className="group p-8 border border-slate-100 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                        {service.name}
                      </h4>
                      {service.is_featured && (
                        <span className="text-[10px] uppercase tracking-widest font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded">
                          Destaque
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                      <div className="text-sm">
                        <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-1">Investimento</span>
                        <span className="font-semibold text-slate-900">
                          {service.price_prefix} {service.price ? `R$ ${service.price.toLocaleString('pt-BR')}` : 'Sob consulta'}
                        </span>
                      </div>
                      <a 
                        href={`https://wa.me/5511999999999?text=Olá, gostaria de saber mais sobre ${service.name}`}
                        className="text-blue-600 text-sm font-bold hover:underline"
                      >
                        {service.cta_text} →
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
