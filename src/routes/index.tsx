import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { Solutions } from "@/components/sections/Solutions";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { Footer } from "@/components/layout/Footer";
import { getCatalog } from "@/lib/catalog.functions";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";

const catalogQueryOptions = queryOptions({
  queryKey: ["catalog"],
  queryFn: () => getCatalog(),
});

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(catalogQueryOptions),
  component: Index,
  head: () => ({
    title: "Guild Tech Support | Tecnologia que transforma processos em resultados",
    meta: [
      {
        name: "description",
        content: "Desenvolvemos sites, sistemas e ferramentas digitais sob medida para empresas que buscam mais eficiência, organização e crescimento.",
      },
      { property: "og:title", content: "Guild Tech Support | Engenharia de Software Premium" },
      { property: "og:description", content: "Soluções tecnológicas personalizadas: sites, sistemas, automação e dashboards para o seu negócio." },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Index() {
  const { data } = useSuspenseQuery(catalogQueryOptions);
  
  const whatsappLink = data.settings.find((s: any) => s.key === 'whatsapp_link')?.value || 'https://wa.me/5511999999999';

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/30">
      <Navbar />
      <main>
        <Hero />
        <Pillars />
        <Solutions services={data.services} categories={data.categories} whatsappLink={whatsappLink} />
        <HowWeWork />
      </main>
      <Footer />
    </div>
  );
}
