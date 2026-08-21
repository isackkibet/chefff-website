'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, ChefHat } from 'lucide-react'
import AdminNav from '@/components/admin/AdminNav'
import AdminGuard from '@/components/admin/AdminGuard'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import ImageUploader from '@/components/ui/ImageUploader'
import { adminStore } from '@/lib/admin/store'
import { type MenuItem } from '@/lib/data'
import { useToast } from '@/components/ui/ToastProvider'

const CATEGORIES: MenuItem['category'][] = ['Starters', 'Mains', 'Desserts', 'Drinks', 'Chef Specials']
const emptyItem = (): Omit<MenuItem, 'id'> => ({
  name: '', category: 'Mains', description: '', price: 0,
  image: '', ingredients: [], allergens: [], dietary: [], available: true,
})

export default function AdminMenuPage() {
  const { toast } = useToast()
  const [items, setItems] = useState<MenuItem[]>([])
  const [filterCat, setFilterCat] = useState<'All' | MenuItem['category']>('All')
  const [modalMode, setModalMode] = useState<'add' | 'edit' | null>(null)
  const [editItem, setEditItem] = useState<MenuItem | null>(null)
  const [form, setForm] = useState(emptyItem())
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => { setItems([...adminStore.menu]) }, [])

  const filtered = filterCat === 'All' ? items : items.filter((m) => m.category === filterCat)

  function openAdd() {
    setForm(emptyItem())
    setEditItem(null)
    setModalMode('add')
  }
  function openEdit(item: MenuItem) {
    setEditItem(item)
    setForm({ ...item })
    setModalMode('edit')
  }
  function closeModal() { setModalMode(null); setEditItem(null) }

  function handleSave() {
    if (!form.name.trim() || !form.description.trim() || form.price <= 0) {
      toast('error', 'Please fill in name, description and price.')
      return
    }
    if (modalMode === 'add') {
      const newItem: MenuItem = { ...form, id: `m${Date.now()}`, ingredients: form.ingredients, allergens: form.allergens, dietary: form.dietary }
      adminStore.addMenuItem(newItem)
      toast('success', `"${newItem.name}" added to menu`)
    } else if (editItem) {
      adminStore.updateMenuItem({ ...editItem, ...form })
      toast('success', `"${form.name}" updated`)
    }
    setItems([...adminStore.menu])
    closeModal()
  }

  function handleDelete(id: string) {
    adminStore.deleteMenuItem(id)
    setItems([...adminStore.menu])
    setDeleteId(null)
    toast('success', 'Dish removed from menu')
  }

  function toggleAvail(id: string) {
    adminStore.toggleAvailability(id)
    setItems([...adminStore.menu])
  }

  const inputClass = 'w-full rounded-xl bg-[hsl(0_0%_10%)] border border-[hsl(0_0%_22%)] px-3 py-2.5 text-sm text-[hsl(42_30%_94%)] placeholder:text-[hsl(0_0%_38%)] focus:outline-none focus:border-[hsl(45_90%_52%)] transition-colors'

  return (
    <AdminGuard>
      <div className="flex min-h-screen">
        <AdminNav />
        <main className="flex-1 pt-14 lg:pt-0 overflow-x-hidden">
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-display font-bold mb-1">Menu Management</h1>
                <p className="text-sm text-[hsl(0_0%_50%)]">{items.length} dishes</p>
              </div>
              <Button variant="primary" size="sm" onClick={openAdd}>
                <Plus size={16} aria-hidden="true" /> Add Dish
              </Button>
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Filter by category">
              {(['All', ...CATEGORIES] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setFilterCat(c)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                    filterCat === c
                      ? 'bg-[hsl(45_90%_52%)] text-[hsl(0_0%_10%)]'
                      : 'bg-[hsl(0_0%_14%)] text-[hsl(0_0%_55%)] hover:bg-[hsl(0_0%_18%)]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" role="list">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  role="listitem"
                  className={`rounded-2xl bg-[hsl(0_0%_12%)] border overflow-hidden ${item.available ? 'border-[hsl(0_0%_18%)]' : 'border-[hsl(0_72%_51%/0.3)] opacity-70'}`}
                >
                  <div className="relative h-40">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="300px" />
                    ) : (
                      <div className="h-full flex items-center justify-center bg-[hsl(0_0%_10%)] text-[hsl(0_0%_30%)]">
                        <ChefHat size={32} aria-hidden="true" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex gap-1.5">
                      <Badge variant={item.available ? 'green' : 'error'}>
                        {item.available ? 'Available' : 'Unavailable'}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-sm leading-snug">{item.name}</h3>
                      <Badge variant="gold">{item.category}</Badge>
                    </div>
                    <p className="text-xs text-[hsl(0_0%_55%)] line-clamp-2 mb-3">{item.description}</p>
                    <p className="font-bold text-[hsl(45_90%_52%)] mb-3">KES {item.price.toLocaleString()}</p>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openEdit(item)}
                        className="flex-1 flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium bg-[hsl(0_0%_16%)] hover:bg-[hsl(0_0%_20%)] text-[hsl(0_0%_65%)] hover:text-[hsl(42_30%_94%)] transition-colors"
                        aria-label={`Edit ${item.name}`}
                      >
                        <Pencil size={12} aria-hidden="true" /> Edit
                      </button>
                      <button
                        onClick={() => toggleAvail(item.id)}
                        className="size-8 flex items-center justify-center rounded-lg bg-[hsl(0_0%_16%)] hover:bg-[hsl(0_0%_20%)] text-[hsl(0_0%_55%)] hover:text-[hsl(42_30%_94%)] transition-colors"
                        aria-label={item.available ? 'Mark unavailable' : 'Mark available'}
                        title={item.available ? 'Set Unavailable' : 'Set Available'}
                      >
                        {item.available ? <ToggleRight size={15} /> : <ToggleLeft size={15} />}
                      </button>
                      <button
                        onClick={() => setDeleteId(item.id)}
                        className="size-8 flex items-center justify-center rounded-lg bg-[hsl(0_72%_51%/0.1)] hover:bg-[hsl(0_72%_51%/0.2)] text-[hsl(0_72%_65%)] transition-colors"
                        aria-label={`Delete ${item.name}`}
                      >
                        <Trash2 size={13} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Add / Edit modal */}
      <Modal open={modalMode !== null} onClose={closeModal} aria-label={modalMode === 'add' ? 'Add dish' : 'Edit dish'} className="max-w-lg">
        <h2 className="font-display text-xl font-bold mb-5 pr-8">{modalMode === 'add' ? 'Add New Dish' : 'Edit Dish'}</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="dish-name" className="block text-sm font-medium mb-1.5">Dish Name *</label>
            <input id="dish-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="e.g. Grilled Salmon" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="dish-cat" className="block text-sm font-medium mb-1.5">Category *</label>
              <select id="dish-cat" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as MenuItem['category'] })} className={`${inputClass} cursor-pointer`}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="dish-price" className="block text-sm font-medium mb-1.5">Price (KES) *</label>
              <input id="dish-price" type="number" min="0" value={form.price || ''} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} className={inputClass} placeholder="2500" />
            </div>
          </div>
          <div>
            <label htmlFor="dish-desc" className="block text-sm font-medium mb-1.5">Description *</label>
            <textarea id="dish-desc" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${inputClass} resize-none`} placeholder="Brief description of the dish…" />
          </div>
          <div>
            <ImageUploader value={form.image} onChange={(image) => setForm({ ...form, image })} label="Dish Image" />
          </div>
          <div>
            <label htmlFor="dish-ingredients" className="block text-sm font-medium mb-1.5">Ingredients (comma-separated)</label>
            <input id="dish-ingredients" value={form.ingredients.join(', ')} onChange={(e) => setForm({ ...form, ingredients: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })} className={inputClass} placeholder="Salmon, Lemon, Capers…" />
          </div>
          <div>
            <label htmlFor="dish-allergens" className="block text-sm font-medium mb-1.5">Allergens (comma-separated)</label>
            <input id="dish-allergens" value={form.allergens.join(', ')} onChange={(e) => setForm({ ...form, allergens: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })} className={inputClass} placeholder="Fish, Dairy…" />
          </div>
          <div className="flex items-center gap-3">
            <input id="dish-available" type="checkbox" checked={form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} className="rounded" />
            <label htmlFor="dish-available" className="text-sm font-medium cursor-pointer">Available on menu</label>
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="primary" onClick={handleSave} className="flex-1">Save Dish</Button>
            <Button variant="outline" onClick={closeModal} className="flex-1">Cancel</Button>
          </div>
        </div>
      </Modal>

      {/* Delete confirm */}
      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} aria-label="Confirm delete" className="max-w-sm">
        <div className="text-center py-2">
          <Trash2 size={36} className="text-[hsl(0_72%_65%)] mx-auto mb-4" aria-hidden="true" />
          <h2 className="font-semibold text-lg mb-2">Remove this dish?</h2>
          <p className="text-sm text-[hsl(0_0%_50%)] mb-6">This action cannot be undone.</p>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setDeleteId(null)} className="flex-1">Cancel</Button>
            <Button onClick={() => deleteId && handleDelete(deleteId)} className="flex-1 bg-[hsl(0_72%_51%)] text-white hover:bg-[hsl(0_72%_44%)]">Delete</Button>
          </div>
        </div>
      </Modal>
    </AdminGuard>
  )
}
