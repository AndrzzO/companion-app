export function HowWeWork() {
  const steps = ["Entendemos o problema", "Analisamos a solução", "Planejamos", "Desenvolvemos", "Validamos", "Entregamos"];
  return (
    <section id="como-trabalhamos" className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-16">Como trabalhamos</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border border-blue-500 flex items-center justify-center font-bold text-blue-400 mb-4">{i + 1}</div>
              <p className="font-semibold">{s}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
