export function Solutions() {
  return (
    <section id="soluções" className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-16">O que desenvolvemos</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {["Sites Institucionais", "Sistemas Empresariais", "Dashboards", "Sistemas de Agendamento", "Gestão de Clientes", "Automação de Processos"].map((s) => (
            <div key={s} className="p-6 border border-slate-100 rounded-xl hover:shadow-lg transition-all">
              <h3 className="font-semibold text-lg">{s}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
