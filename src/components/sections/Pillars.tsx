export function Pillars() {
  const pillars = [
    { title: "Desenvolvimento", description: "Sites e sistemas desenvolvidos de acordo com as necessidades do negócio." },
    { title: "Automação", description: "Redução de tarefas manuais e repetitivas através de tecnologia." },
    { title: "Gestão", description: "Ferramentas para organizar informações, processos, clientes, serviços e operações." },
    { title: "Escalabilidade", description: "Soluções preparadas para acompanhar o crescimento da empresa." },
  ];
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {pillars.map((p) => (
          <div key={p.title} className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-lg mb-3">{p.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{p.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
