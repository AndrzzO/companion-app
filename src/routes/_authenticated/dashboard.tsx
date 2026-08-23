import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Painel Administrativo</h1>
      <p className="text-slate-600">Em desenvolvimento: gerenciamento de catálogo e categorias.</p>
    </div>
  )
}
