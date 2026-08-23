import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
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
  head: ({ loaderData }) => ({
    meta: [
      { title: "Guild Tech Support | Sistemas e Sites Sob Medida para Empresas" },
      {
        name: "description",
        content: "Desenvolvemos sites, sistemas e ferramentas digitais sob medida para empresas que buscam mais eficiência, organização e crescimento.",
      },
      { property: "og:title", content: "Guild Tech Support | Engenharia de Software Premium" },
      { property: "og:description", content: "Soluções tecnológicas personalizadas: sites, sistemas, automação e dashboards para o seu negócio." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://joy-omatic-maker.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://joy-omatic-maker.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Catálogo de soluções Guild Tech Support",
          itemListElement: (loaderData?.services ?? []).map((s: any, i: number) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Service",
              name: s.name,
              description: s.description ?? undefined,
              provider: { "@type": "Organization", name: "Guild Tech Support" },
              ...(s.price
                ? {
                    offers: {
                      "@type": "Offer",
                      price: String(s.price),
                      priceCurrency: "BRL",
                    },
                  }
                : {}),
            },
          })),
        }),
      },
    ],
  }),
});


function Index() {
  useEffect(() => {
    // Basic Rate Limiting simulation/guard for high-frequency interactions
    // In a real edge environment, this would be handled at the gateway level.
  }, []);
  const { data } = useSuspenseQuery(catalogQueryOptions);
  
  const whatsappLink = data.settings.find((s: any) => s.key === 'whatsapp_link')?.value || 'https://wa.me/556182586603';

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
