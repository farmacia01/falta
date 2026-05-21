import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from './supabase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mover declaração para cima para evitar avisos de hoisting e lint
  async function fetchProfile(userId) {
    if (!isSupabaseConfigured) return;
    try {
      const { data, error } = await supabase
        .from('perfis')
        .select('*, farmacias(*)')
        .eq('id', userId);

      if (error) throw error;
      
      if (data && data.length > 0) {
        setProfile(data[0]);
      } else {
        setProfile(null);
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    // Verificar sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    }).catch(err => {
      console.error('Supabase Session Error:', err);
      setLoading(false);
    });

    // Escutar mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-main)]">
        <div className="relative">
           {/* Outer Ring */}
           <div className="w-20 h-20 border-4 border-[var(--primary)]/10 rounded-full"></div>
           {/* Spinning Ring */}
           <div className="absolute top-0 left-0 w-20 h-20 border-4 border-t-[var(--primary)] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
           {/* Inner Pulse */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[var(--primary)]/20 rounded-full animate-pulse"></div>
        </div>
        <div className="mt-8 text-center">
           <p className="text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.4em] animate-pulse">
              Iniciando Alice
           </p>
           <p className="text-[8px] font-bold text-[var(--text-muted)] uppercase tracking-widest mt-2">
              Sincronizando Dados de Saúde
           </p>
        </div>
      </div>
    );
  }

  const signOut = () => supabase?.auth.signOut();

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
