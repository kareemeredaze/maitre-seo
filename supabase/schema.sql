-- =====================================================
-- Maitre SEO — Database Schema
-- Run this in Supabase SQL Editor (Project > SQL Editor)
-- =====================================================

-- 1. Custom types
create type campaign_status as enum ('active', 'completed', 'paused', 'draft');
create type backlink_status as enum ('live', 'pending', 'removed', 'replaced');
create type invoice_status as enum ('paid', 'pending', 'overdue');
create type activity_type as enum ('backlink', 'campaign', 'invoice', 'auth', 'profile');

-- 2. Users table (extends Supabase Auth)
create table public.users (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  full_name text,
  company text,
  company_website text,
  company_sector text,
  phone text,
  avatar_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- 3. Campaigns
create table public.campaigns (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  name text not null,
  status campaign_status default 'draft' not null,
  start_date date,
  end_date date,
  target_links integer default 0 not null,
  delivered_links integer default 0 not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- 4. Backlinks
create table public.backlinks (
  id uuid default gen_random_uuid() primary key,
  campaign_id uuid references public.campaigns(id) on delete cascade not null,
  url text not null,
  anchor_text text not null,
  target_url text not null,
  dr integer default 0 not null,
  status backlink_status default 'pending' not null,
  live_date date,
  created_at timestamptz default now() not null
);

-- 5. Invoices
create table public.invoices (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  number text not null unique,
  amount numeric(10,2) not null,
  status invoice_status default 'pending' not null,
  due_date date not null,
  pdf_url text,
  created_at timestamptz default now() not null
);

-- 6. Activity log
create table public.activity_log (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  type activity_type not null,
  message text not null,
  created_at timestamptz default now() not null
);

-- =====================================================
-- Indexes
-- =====================================================
create index idx_campaigns_user_id on public.campaigns(user_id);
create index idx_backlinks_campaign_id on public.backlinks(campaign_id);
create index idx_invoices_user_id on public.invoices(user_id);
create index idx_activity_log_user_id on public.activity_log(user_id);
create index idx_activity_log_created_at on public.activity_log(created_at desc);

-- =====================================================
-- Row Level Security (RLS)
-- =====================================================

-- Enable RLS on all tables
alter table public.users enable row level security;
alter table public.campaigns enable row level security;
alter table public.backlinks enable row level security;
alter table public.invoices enable row level security;
alter table public.activity_log enable row level security;

-- Users: can read/update own profile
create policy "Users can view own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = id);

-- Campaigns: can read own campaigns
create policy "Users can view own campaigns"
  on public.campaigns for select
  using (auth.uid() = user_id);

-- Backlinks: can read backlinks for own campaigns
create policy "Users can view own backlinks"
  on public.backlinks for select
  using (
    campaign_id in (
      select id from public.campaigns where user_id = auth.uid()
    )
  );

-- Invoices: can read own invoices
create policy "Users can view own invoices"
  on public.invoices for select
  using (auth.uid() = user_id);

-- Activity log: can read own activity
create policy "Users can view own activity"
  on public.activity_log for select
  using (auth.uid() = user_id);

-- =====================================================
-- Trigger: auto-create user profile on signup
-- =====================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =====================================================
-- Trigger: auto-update updated_at
-- =====================================================
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_users_updated_at
  before update on public.users
  for each row execute function public.update_updated_at();

create trigger update_campaigns_updated_at
  before update on public.campaigns
  for each row execute function public.update_updated_at();
