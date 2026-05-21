create or replace function public.validar_token_fornecedor(p_token text)
returns table (
  cotacao_id uuid,
  fornecedor_id uuid,
  expires_at timestamp with time zone,
  status text
)
language sql
security definer
set search_path = public
as $$
  select
    t.cotacao_id,
    t.fornecedor_id,
    t.expires_at,
    case
      when t.expires_at is not null and t.expires_at < now() then 'expired'
      else 'valid'
    end as status
  from tokens_acesso_fornecedores t
  join cotacoes_mestre cm on cm.id = t.cotacao_id
  join fornecedores f on f.id = t.fornecedor_id
  where t.token = p_token
    and f.farmacia_id = cm.farmacia_id
  limit 1;
$$;

revoke all on function public.validar_token_fornecedor(text) from public;
grant execute on function public.validar_token_fornecedor(text) to anon, authenticated;
