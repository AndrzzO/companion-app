import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/termos')({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: 'Termos de Uso | Guild Tech Support' },
      { name: 'description', content: 'Condições de uso do site da Guild Tech Support e regras aplicáveis aos orçamentos e serviços solicitados.' },
      { property: 'og:title', content: 'Termos de Uso | Guild Tech Support' },
      { property: 'og:description', content: 'Condições de uso do site e regras aplicáveis aos serviços da Guild Tech Support.' },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: 'https://joy-omatic-maker.lovable.app/termos' },
    ],
    links: [{ rel: 'canonical', href: 'https://joy-omatic-maker.lovable.app/termos' }],
  }),
})

function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-3xl mx-auto px-6 py-24 space-y-8">
        <h1 className="text-4xl font-black tracking-tighter">Termos de Uso</h1>
        <p className="text-muted-foreground leading-relaxed">
          Ao navegar neste site e solicitar contato, você concorda com as condições descritas abaixo.
        </p>
        <section className="space-y-3">
          <h2 className="text-xl font-bold">Uso do site</h2>
          <p className="text-muted-foreground leading-relaxed">
            O conteúdo publicado tem caráter informativo. Os serviços apresentados no catálogo podem
            ser ajustados conforme o escopo de cada projeto.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-bold">Orçamentos e propostas</h2>
          <p className="text-muted-foreground leading-relaxed">
            Valores e prazos indicados são referências iniciais. A contratação só se efetiva após
            proposta formal aceita por ambas as partes.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-bold">Propriedade intelectual</h2>
          <p className="text-muted-foreground leading-relaxed">
            Marca, textos e identidade visual deste site pertencem à Guild Tech Support e não podem
            ser reproduzidos sem autorização.
          </p>
        </section>
        <Link to="/" className="inline-block text-accent font-bold">Voltar para a página inicial</Link>
      </main>
    </div>
  )
}
