import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCatalog } from '@/lib/catalog.functions'
import { upsertCategory, deleteCategory, upsertService, deleteService, updateSetting } from '@/lib/admin.functions'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Plus, Edit2, Trash2, Settings, Package, Layers, LogOut } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  const { data } = useSuspenseQuery({
    queryKey: ['catalog'],
    queryFn: () => getCatalog()
  })
  
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('services')
  
  // Mutations
  const categoryMutation = useMutation({
    mutationFn: (payload: any) => upsertCategory({ data: payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['catalog'] })
      toast.success('Categoria salva com sucesso')
    }
  })

  const delCategoryMutation = useMutation({
    mutationFn: (id: string) => deleteCategory({ data: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['catalog'] })
      toast.success('Categoria removida')
    }
  })

  const serviceMutation = useMutation({
    mutationFn: (payload: any) => upsertService({ data: payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['catalog'] })
      toast.success('Serviço salvo com sucesso')
    }
  })

  const delServiceMutation = useMutation({
    mutationFn: (id: string) => deleteService({ data: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['catalog'] })
      toast.success('Serviço removido')
    }
  })

  const settingsMutation = useMutation({
    mutationFn: (payload: { key: string; value: string }) => updateSetting({ data: payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['catalog'] })
      toast.success('Configurações atualizadas')
    }
  })

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate({ to: '/auth' })
  }

  const whatsappLink = data.settings.find(s => s.key === 'whatsapp_link')?.value || ''

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-black uppercase tracking-tighter">Guild Tech <span className="text-accent">Admin</span></h1>
        </div>
        
        <nav className="flex-grow p-4 space-y-2">
          <Button 
            variant={activeTab === 'services' ? 'secondary' : 'ghost'} 
            className="w-full justify-start gap-3"
            onClick={() => setActiveTab('services')}
          >
            <Package size={18} /> Serviços
          </Button>
          <Button 
            variant={activeTab === 'categories' ? 'secondary' : 'ghost'} 
            className="w-full justify-start gap-3"
            onClick={() => setActiveTab('categories')}
          >
            <Layers size={18} /> Categorias
          </Button>
          <Button 
            variant={activeTab === 'settings' ? 'secondary' : 'ghost'} 
            className="w-full justify-start gap-3"
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={18} /> Configurações
          </Button>
        </nav>
        
        <div className="p-4 border-t border-slate-800">
          <Button variant="ghost" className="w-full justify-start gap-3 text-slate-400 hover:text-white" onClick={handleLogout}>
            <LogOut size={18} /> Sair
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-10 overflow-auto">
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
              {activeTab === 'services' && 'Gerenciar Serviços'}
              {activeTab === 'categories' && 'Categorias do Catálogo'}
              {activeTab === 'settings' && 'Configurações Globais'}
            </h2>
            <p className="text-slate-500 font-medium">Controle total sobre o conteúdo dinâmico do site.</p>
          </div>
          
          {(activeTab === 'services' || activeTab === 'categories') && (
            <CategoryOrServiceDialog 
              type={activeTab as 'services' | 'categories'} 
              categories={data.categories}
              onSave={(item) => activeTab === 'services' ? serviceMutation.mutate(item) : categoryMutation.mutate(item)}
            />
          )}
        </header>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {activeTab === 'services' && (
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50">
                  <TableHead className="font-bold">Nome</TableHead>
                  <TableHead className="font-bold">Categoria</TableHead>
                  <TableHead className="font-bold">Preço</TableHead>
                  <TableHead className="font-bold">Status</TableHead>
                  <TableHead className="text-right font-bold">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium text-slate-900">{service.name}</TableCell>
                    <TableCell className="text-slate-500">
                      {data.categories.find(c => c.id === service.category_id)?.name || '-'}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {service.price ? `R$ ${service.price.toLocaleString('pt-BR')}` : 'Consultar'}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        service.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {service.status === 'active' ? 'Ativo' : 'Inativo'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <CategoryOrServiceDialog 
                        type="services" 
                        categories={data.categories}
                        item={service}
                        onSave={(item) => serviceMutation.mutate(item)}
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => {
                          if (confirm('Tem certeza que deseja excluir este serviço?')) {
                            delServiceMutation.mutate(service.id)
                          }
                        }}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {data.services.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-slate-400">
                      Nenhum serviço cadastrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}

          {activeTab === 'categories' && (
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50">
                  <TableHead className="font-bold">Nome</TableHead>
                  <TableHead className="font-bold">Ordem</TableHead>
                  <TableHead className="font-bold">Status</TableHead>
                  <TableHead className="text-right font-bold">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.categories.map((cat) => (
                  <TableRow key={cat.id}>
                    <TableCell className="font-medium text-slate-900">{cat.name}</TableCell>
                    <TableCell className="text-slate-500">{cat.display_order}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        cat.is_active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {cat.is_active ? 'Ativo' : 'Inativo'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <CategoryOrServiceDialog 
                        type="categories" 
                        categories={data.categories}
                        item={cat}
                        onSave={(item) => categoryMutation.mutate(item)}
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => {
                          if (confirm('Tem certeza que deseja excluir esta categoria? Todas as soluções vinculadas ficarão órfãs.')) {
                            delCategoryMutation.mutate(cat.id)
                          }
                        }}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {activeTab === 'settings' && (
            <div className="p-8 max-w-2xl space-y-8">
              <div className="space-y-4">
                <Label className="text-base font-bold text-slate-900">Link Global de WhatsApp</Label>
                <div className="flex gap-4">
                  <Input 
                    defaultValue={whatsappLink}
                    placeholder="https://wa.me/..."
                    id="wa-link-input"
                    className="flex-grow"
                  />
                  <Button onClick={() => {
                    const val = (document.getElementById('wa-link-input') as HTMLInputElement).value
                    settingsMutation.mutate({ key: 'whatsapp_link', value: val })
                  }}>
                    Atualizar Link
                  </Button>
                </div>
                <p className="text-sm text-slate-500">Este link será usado em todos os botões de "Fazer Orçamento" no site.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function CategoryOrServiceDialog({ type, categories, item, onSave }: { 
  type: 'services' | 'categories', 
  categories: any[],
  item?: any,
  onSave: (data: any) => void
}) {
  const [open, setOpen] = useState(false)
  const isEdit = !!item

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data: any = Object.fromEntries(formData.entries())
    
    if (type === 'services') {
      data.price = data.price ? parseFloat(data.price) : null
      data.is_featured = formData.get('is_featured') === 'on'
      data.display_order = parseInt(data.display_order || '0')
    } else {
      data.display_order = parseInt(data.display_order || '0')
      data.is_active = formData.get('is_active') === 'on'
    }
    
    if (isEdit) data.id = item.id
    
    onSave(data)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-accent hover:bg-accent/5">
            <Edit2 size={16} />
          </Button>
        ) : (
          <Button className="gap-2 bg-slate-900 hover:bg-slate-800">
            <Plus size={18} /> {type === 'services' ? 'Novo Serviço' : 'Nova Categoria'}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEdit ? 'Editar' : 'Adicionar'} {type === 'services' ? 'Serviço' : 'Categoria'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input name="name" defaultValue={item?.name} required />
            </div>
            
            {type === 'services' && (
              <>
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Select name="category_id" defaultValue={item?.category_id || ''}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(c => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Prefixo Preço</Label>
                    <Input name="price_prefix" defaultValue={item?.price_prefix || 'A partir de'} />
                  </div>
                  <div className="space-y-2">
                    <Label>Preço (R$)</Label>
                    <Input name="price" type="number" step="0.01" defaultValue={item?.price} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Texto CTA</Label>
                  <Input name="cta_text" defaultValue={item?.cta_text || 'Solicitar orçamento'} />
                </div>
              </>
            )}
            
            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea name="description" defaultValue={item?.description} rows={3} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Ordem de Exibição</Label>
                <Input name="display_order" type="number" defaultValue={item?.display_order || 0} />
              </div>
              <div className="flex items-center space-x-2 pt-8">
                <Switch 
                  id={type === 'services' ? 'featured' : 'active'} 
                  name={type === 'services' ? 'is_featured' : 'is_active'}
                  defaultChecked={type === 'services' ? item?.is_featured : (isEdit ? item?.is_active : true)} 
                />
                <Label htmlFor={type === 'services' ? 'featured' : 'active'}>
                  {type === 'services' ? 'Destaque (Premium)' : 'Ativo'}
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Salvar Alterações</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
