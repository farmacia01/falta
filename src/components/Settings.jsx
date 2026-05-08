import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';
import { Loader2, Save, Globe, ShoppingCart, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Settings() {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [urls, setUrls] = useState({
    webhook_cotacao: '',
    webhook_pedido: ''
  });

  useEffect(() => {
    if (profile?.farmacias) {
      setUrls({
        webhook_cotacao: profile.farmacias.webhook_cotacao || '',
        webhook_pedido: profile.farmacias.webhook_pedido || ''
      });
    }
  }, [profile]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from('farmacias')
        .update({
          webhook_cotacao: urls.webhook_cotacao,
          webhook_pedido: urls.webhook_pedido
        })
        .eq('id', profile.farmacia_id);

      if (error) throw error;
      
      setMessage({ type: 'success', text: 'Configurações salvas com sucesso!' });
      // Forçar refresh para atualizar o contexto global
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto animate-fade-in">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-[var(--text-main)] mb-2">Configurações da Unidade</h1>
        <p className="text-[var(--text-muted)] font-medium">Configure as automações n8n individuais para esta farmácia.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {message && (
          <div className={`p-4 rounded-2xl flex items-center gap-3 font-bold text-sm animate-shake ${
            message.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
          }`}>
            {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            {message.text}
          </div>
        )}

        <div className="grid gap-6">
          {/* Card Webhook Cotação */}
          <div className="bg-[var(--bg-card)] p-5 sm:p-6 md:p-8 rounded-[2rem] border border-[var(--border)] shadow-xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
              <Globe size={160} />
            </div>
            
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Globe size={24} />
                </div>
                <div>
                  <h3 className="font-black text-lg text-[var(--text-main)]">Webhook de Cotações</h3>
                  <p className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-widest">Envia dados para o n8n disparar fornecedores</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">URL Production n8n</label>
                <input 
                  type="url"
                  className="w-full px-5 py-4 bg-[var(--bg-main)] border border-[var(--border)] rounded-2xl text-sm font-bold text-[var(--text-main)] focus:border-blue-500 outline-none transition-all"
                  placeholder="https://n8n.suaempresa.com/webhook/..."
                  value={urls.webhook_cotacao}
                  onChange={(e) => setUrls({...urls, webhook_cotacao: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Card Webhook Pedido */}
          <div className="bg-[var(--bg-card)] p-5 sm:p-6 md:p-8 rounded-[2rem] border border-[var(--border)] shadow-xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
              <ShoppingCart size={160} />
            </div>
            
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                  <ShoppingCart size={24} />
                </div>
                <div>
                  <h3 className="font-black text-lg text-[var(--text-main)]">Webhook de Pedidos</h3>
                  <p className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-widest">Disparado quando uma cotação é finalizada</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">URL Production n8n</label>
                <input 
                  type="url"
                  className="w-full px-5 py-4 bg-[var(--bg-main)] border border-[var(--border)] rounded-2xl text-sm font-bold text-[var(--text-main)] focus:border-purple-500 outline-none transition-all"
                  placeholder="https://n8n.suaempresa.com/webhook/..."
                  value={urls.webhook_pedido}
                  onChange={(e) => setUrls({...urls, webhook_pedido: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            disabled={saving}
            className="w-full sm:w-auto justify-center px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-blue-600/20 transition-all flex items-center gap-3 active:scale-[0.98] disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            Salvar Configurações
          </button>
        </div>
      </form>
    </div>
  );
}
