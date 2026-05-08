import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, Mail, Lock, Building2, Sparkles, ShieldCheck } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import logo from '../assets/logo.png';

export default function Login() {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pharmacyName, setPharmacyName] = useState('');
  const [error, setError] = useState(null);

  // Se o usuário está logado mas não tem farmácia, força o modo de cadastro de farmácia
  useEffect(() => {
    if (user && !profile?.farmacia_id) {
      setIsSignUp(true);
    }
  }, [user, profile]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        let currentUserId = user?.id;

        if (!user) {
          // 1. Criar Usuário (Se não estiver logado)
          const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: pharmacyName } }
          });
          if (authError) throw authError;
          currentUserId = authData.user.id;
        }

        // 2. Criar a Farmácia (Tenant)
        const { data: farmData, error: farmError } = await supabase
          .from('farmacias')
          .insert([{ nome: pharmacyName }])
          .select()
          .single();

        if (farmError) throw farmError;

        // 3. Criar ou Atualizar Perfil
        const { error: profileError } = await supabase
          .from('perfis')
          .upsert({ 
            id: currentUserId, 
            farmacia_id: farmData.id,
            nome_completo: pharmacyName,
            role: 'admin'
          });

        if (profileError) throw profileError;

        // Forçar recarregamento para capturar o novo perfil no contexto
        window.location.reload();
      } else {
        // Fluxo de Login Comum
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (loginError) throw loginError;
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-main)] p-4 sm:p-6">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-10 space-y-4">
          <div className="flex justify-center mb-6">
             <img 
               src={logo} 
               alt="Alice Farma" 
               className="h-24 md:h-32 w-auto transition-all duration-300 dark:invert" 
             />
          </div>
          <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.3em]">Inteligência em Cotações Farmacêuticas</p>
        </div>

        <div className="bg-[var(--bg-card)] p-6 sm:p-8 md:p-10 rounded-[2.5rem] border border-[var(--border)] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
             <Building2 size={120} />
          </div>

          <form onSubmit={handleAuth} className="space-y-6 relative z-10">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-bold animate-shake">
                {error}
              </div>
            )}

            {isSignUp && (
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Nome da Farmácia</label>
                <div className="relative group">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-blue-500 transition-colors" size={18} />
                  <input 
                    type="text" 
                    required 
                    className="w-full pl-12 pr-4 py-4 bg-[var(--bg-main)] border border-[var(--border)] rounded-2xl text-sm font-bold text-[var(--text-main)] outline-none focus:border-blue-500/30 transition-all"
                    placeholder="Ex: Farmácia Central"
                    value={pharmacyName}
                    onChange={(e) => setPharmacyName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">E-mail Corporativo</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-blue-500 transition-colors" size={18} />
                <input 
                  type="email" 
                  required 
                  className="w-full pl-12 pr-4 py-4 bg-[var(--bg-main)] border border-[var(--border)] rounded-2xl text-sm font-bold text-[var(--text-main)] outline-none focus:border-blue-500/30 transition-all"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Senha de Acesso</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-blue-500 transition-colors" size={18} />
                <input 
                  type="password" 
                  required 
                  className="w-full pl-12 pr-4 py-4 bg-[var(--bg-main)] border border-[var(--border)] rounded-2xl text-sm font-bold text-[var(--text-main)] outline-none focus:border-blue-500/30 transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (isSignUp ? 'Criar Minha Farmácia' : 'Entrar no Sistema')}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest hover:text-blue-500 transition-colors"
            >
              {isSignUp ? 'Já tenho uma conta corporativa' : 'Quero cadastrar minha farmácia'}
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 opacity-30">
           <div className="flex items-center gap-2">
              <ShieldCheck size={14} />
              <span className="text-[9px] font-bold uppercase tracking-widest">Criptografia Ponta-a-Ponta</span>
           </div>
           <div className="flex items-center gap-2">
              <Building2 size={14} />
              <span className="text-[9px] font-bold uppercase tracking-widest">SaaS Enterprise</span>
           </div>
        </div>
      </div>
    </div>
  );
}
