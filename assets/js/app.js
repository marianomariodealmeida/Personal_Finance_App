import { supabase, getCurrentUser } from './supabase-client.js';

class SPARouter {
  constructor() {
    this.routes = {
      dashboard: this.renderDashboard,
      activities: this.renderActivities,
      chat: this.renderChat,
      profile: this.renderProfile,
      paywall: this.renderPaywall,
      security: this.renderSecurity
    };
    this.currentRoute = 'dashboard';
  }

  init() {
    window.addEventListener('popstate', () => {
      const route = window.location.hash.replace('#', '') || 'dashboard';
      this.navigate(route, false);
    });

    const initialRoute = window.location.hash.replace('#', '') || 'dashboard';
    this.navigate(initialRoute, false);
  }

  async navigate(routeName, pushState = true) {
    if (!this.routes[routeName]) routeName = 'dashboard';
    this.currentRoute = routeName;

    if (pushState) {
      window.history.pushState({}, '', `#${routeName}`);
    }

    this.updateActiveNavButtons(routeName);
    
    const container = document.getElementById('app-view');
    if (container) {
      container.innerHTML = '<div class="flex items-center justify-center h-full"><div class="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin"></div></div>';
      container.innerHTML = await this.routes[routeName]();
      if (window.lucide) lucide.createIcons();
    }
  }

  updateActiveNavButtons(routeName) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
      const target = btn.getAttribute('data-target');
      if (target === routeName) {
        btn.classList.add('text-brand');
        btn.classList.remove('text-gray-400');
      } else {
        btn.classList.remove('text-brand');
        btn.classList.add('text-gray-400');
      }
    });
  }

  // Métodos de renderização das vistas
  async renderDashboard() {
    return `
      <div class="space-y-4">
        <div class="glass-panel p-5 rounded-2xl">
          <p class="text-xs text-gray-400 uppercase tracking-wider mb-1">Saldo Total</p>
          <h2 class="text-3xl font-extrabold text-white">R$ 14.850,00</h2>
        </div>
        <div class="glass-panel p-4 rounded-2xl">
          <h3 class="text-sm font-semibold mb-3">Resumo do Mês</h3>
          <p class="text-xs text-gray-400">Sem lançamentos pendentes para hoje.</p>
        </div>
      </div>
    `;
  }

  async renderActivities() {
    return `<div class="glass-panel p-4 rounded-2xl"><h2 class="text-lg font-bold">Atividades Recentes</h2></div>`;
  }

  async renderChat() {
    return `
      <div class="flex flex-col h-[calc(100vh-140px)]">
        <div id="chat-messages" class="flex-1 overflow-y-auto space-y-3 pr-1">
          <div class="p-3 rounded-2xl bg-card max-w-[80%] text-sm text-gray-200">
            Olá! Sou o Pierre. Como posso ajudar nas tuas finanças hoje?
          </div>
        </div>
        <div class="pt-3 flex gap-2">
          <input id="chat-input" type="text" placeholder="Pergunta algo sobre os teus gastos..." class="flex-1 bg-card border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand" />
          <button id="send-btn" class="bg-brand text-black font-bold px-4 rounded-xl flex items-center justify-center">
            <i data-lucide="send" class="w-5 h-5"></i>
          </button>
        </div>
      </div>
    `;
  }

  async renderProfile() {
    return `<div class="glass-panel p-4 rounded-2xl"><h2 class="text-lg font-bold">Perfil & Definições</h2></div>`;
  }

  async renderPaywall() {
    return `<div class="glass-panel p-4 rounded-2xl text-center"><h2 class="text-xl font-bold text-brand">Pierre Pro</h2></div>`;
  }

  async renderSecurity() {
    return `<div class="glass-panel p-4 rounded-2xl"><h2 class="text-lg font-bold">Central de Segurança</h2></div>`;
  }
}

export const router = new SPARouter();
document.addEventListener('DOMContentLoaded', () => router.init());
