import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/privacidade')({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: 'Política de Privacidade | Guild Tech Support' },
      { name: 'description', content: 'Saiba como a Guild Tech Support coleta, utiliza e protege os dados de quem entra em contato pelo site.' },
      { property: 'og:title', content: 'Política de Privacidade | Guild Tech Support' },
      { property: 'og:description', content: 'Como tratamos e protegemos os dados enviados através do nosso site.' },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: 'https://joy-omatic-maker.lovable.app/privacidade' },
    ],
    links: [{ rel: 'canonical', href: 'https://joy-omatic-maker.lovable.app/privacidade' }],
  }),
})

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-3xl mx-auto px-6 py-24 space-y-8">
        <h1 className="text-4xl font-black tracking-tighter">Política de Privacidade</h1>
        <p className="text-muted-foreground leading-relaxed">
          Esta política descreve como a Guild Tech Support trata as informações compartilhadas por
          visitantes e clientes através deste site.
        </p>
        <section className="space-y-3">
          <h2 className="text-xl font-bold">Dados que coletamos</h2>
          <p className="text-muted-foreground leading-relaxed">
            Coletamos apenas os dados que você informa voluntariamente no formulário de contato,
            como nome e a descrição do projeto, além do número utilizado no contato via WhatsApp.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-bold">Como usamos os dados</h2>
          <p className="text-muted-foreground leading-relaxed">
            Utilizamos as informações exclusivamente para responder à sua solicitação, elaborar
            propostas e dar continuidade ao atendimento comercial. Não vendemos nem compartilhamos
            seus dados com terceiros para fins de marketing.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-bold">Seus direitos</h2>
          <p className="text-muted-foreground leading-relaxed">
            Você pode solicitar a qualquer momento o acesso, a correção ou a exclusão dos seus dados
            entrando em contato conosco pelo WhatsApp informado no site.
          </p>
        </section>
        <Link to="/" className="inline-block text-accent font-bold">Voltar para a página inicial</Link>
      </main>
    </div>
  )
}
