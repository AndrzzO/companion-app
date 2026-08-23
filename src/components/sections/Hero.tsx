export function Hero() {
  return (
    <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 bg-slate-900 text-white">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight">Tecnologia que transforma <br/><span className="text-blue-400">processos em resultados.</span></h1>
        <p className="text-lg lg:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">Desenvolvemos sites, sistemas e ferramentas digitais sob medida para empresas que buscam mais eficiência, organização e crescimento.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contato" className="bg-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all">Solicitar orçamento</a>
          <a href="#soluções" className="bg-transparent border border-slate-700 px-8 py-4 rounded-lg font-semibold hover:border-slate-500 transition-all">Conhecer nossas soluções</a>
        </div>
      </div>
    </section>
  );
}
