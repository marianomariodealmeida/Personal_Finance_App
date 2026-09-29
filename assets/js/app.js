import { supabase, getCurrentUser } from './supabase-client.js';

class SPARouter {
  constructor() {
    this.routes = {
      welcome: this.renderWelcome,
      login: this.renderLogin,
      register: this.renderRegister,
      dashboard: this.renderDashboard,
      activities: this.renderActivities,
      chat: this.renderChat,
      profile: this.renderProfile
    };
    this.currentRoute = 'welcome';
  }

  async init() {
    window.addEventListener('popstate', () => {
      const route = window.location.hash.replace('#', '') || 'dashboard';
      this.navigate(route, false);
    });

    const initialRoute = window.location.hash.replace('#', '') || 'dashboard';
    await this.navigate(initialRoute, false);
  }

  async navigate(routeName, pushState = true) {
    const user = await getCurrentUser();
    const authRoutes = ['welcome', 'login', 'register'];

    if (!user && !authRoutes.includes(routeName)) {
      routeName = 'welcome';
    }

    if (user && authRoutes.includes(routeName)) {
      routeName = 'dashboard';
    }

    if (!this.routes[routeName]) routeName = user ? 'dashboard' : 'welcome';
    this.currentRoute = routeName;

    if (pushState) {
      window.history.pushState({}, '', `#${routeName}`);
    }

    const isAuthPage = authRoutes.includes(routeName);
    const topBar = document.getElementById('top-bar');
    const navBar = document.querySelector('nav');

    if (topBar) topBar.style.display = isAuthPage ? 'none' : 'flex';
    if (navBar) navBar.style.display = isAuthPage ? 'none' : 'flex';

    const container = document.getElementById('app-view');
    if (container) {
      if (isAuthPage) {
        container.className = "flex-1 overflow-y-auto no-scrollbar relative p-0 pb-0 bg-black";
      } else {
        container.className = "flex-1 overflow-y-auto no-scrollbar relative p-4 pb-24 bg-[#0A0A0A]";
        this.updateActiveNavButtons(routeName);
      }

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

  // --- TELAS DE AUTENTICAÇÃO ---

  // 1. Tela Inicial (João-de-barro / PerFinApp)
  async renderWelcome() {
    return `
      <div class="relative h-screen w-full flex flex-col justify-between p-6 bg-cover bg-center overflow-hidden" 
           style="background-image: linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.9)), url('https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&q=80');">
        
        <!-- Logo e Título -->
        <div class="pt-8 text-center">
          <h1 class="text-4xl font-black text-white tracking-wider">PerFinApp</h1>
        </div>

        <!-- Mensagem do João de Barro e Botões -->
        <div class="space-y-6 pb-6 z-10">
          <h2 class="text-2xl font-medium text-white leading-tight">
            Construindo suas finanças,<br />tijolo por tijolo.
          </h2>

          <div class="flex gap-3">
            <button onclick="router.navigate('login')" class="flex-1 py-3.5 px-4 bg-white text-black font-semibold rounded-full text-sm hover:bg-gray-200 transition-colors">
              Já tenho conta
            </button>
            <button onclick="router.navigate('register')" class="flex-1 py-3.5 px-4 bg-[#262626] text-white font-semibold rounded-full text-sm hover:bg-[#333333] transition-colors border border-white/10">
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // 2. Tela de Cadastro (João-de-barro)
  async renderRegister() {
    return `
      <div class="min-h-screen w-full bg-black text-white p-6 flex flex-col justify-between">
        <div>
          <button onclick="router.navigate('welcome')" class="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-white mb-12">
            <i data-lucide="arrow-left" class="w-5 h-5"></i>
          </button>

          <!-- Ícone do João-de-barro -->
          <div class="flex justify-center mb-8">
            <div class="w-16 h-16 bg-[#1A1A1A] rounded-2xl flex items-center justify-center border border-border">
              <i data-lucide="bird" class="w-10 h-10 text-white"></i>
            </div>
          </div>

          <h2 class="text-2xl font-semibold text-center mb-2">Crie sua conta</h2>
          <p class="text-xs text-gray-400 text-center mb-8">Escolha como deseja continuar no PerFinApp</p>

          <div class="space-y-3">
            <button onclick="window.loginWithGoogle()" class="w-full py-3.5 bg-[#121212] border border-[#2A2A2A] rounded-full text-sm font-medium text-white flex items-center justify-center gap-3 hover:bg-[#1A1A1A] transition-colors">
              <svg class="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
              Continuar com Google
            </button>

            <button onclick="window.loginWithMicrosoft()" class="w-full py-3.5 bg-[#121212] border border-[#2A2A2A] rounded-full text-sm font-medium text-white flex items-center justify-center gap-3 hover:bg-[#1A1A1A] transition-colors">
              <svg class="w-4 h-4" viewBox="0 0 23 23"><path fill="#f35325" d="M1 1h10v10H1z"/><path fill="#81bc06" d="M12 1h10v10H12z"/><path fill="#05a6f0" d="M1 12h10v10H1z"/><path fill="#ffba08" d="M12 12h10v10H12z"/></svg>
              Continuar com Microsoft
            </button>
          </div>
        </div>

        <p class="text-center text-xs text-gray-500 pb-4">
          Ao continuar você concorda com os <a href="#" class="underline">Termos de uso</a>
        </p>
      </div>
    `;
  }

  // 3. Tela de Login (João-de-barro)
  async renderLogin() {
    return `
      <div class="min-h-screen w-full bg-black text-white p-6 flex flex-col justify-between">
        <div>
          <button onclick="router.navigate('welcome')" class="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-white mb-12">
            <i data-lucide="arrow-left" class="w-5 h-5"></i>
          </button>

          <!-- Ícone do João-de-barro -->
          <div class="flex justify-center mb-8">
            <div class="w-16 h-16 bg-[#1A1A1A] rounded-2xl flex items-center justify-center border border-border">
              <i data-lucide="bird" class="w-10 h-10 text-white"></i>
            </div>
          </div>

          <h2 class="text-2xl font-semibold text-center mb-2">Bem-vindo de volta</h2>
          <p class="text-xs text-gray-400 text-center mb-8">Acesse sua conta para continuar no PerFinApp</p>

          <div class="space-y-3">
            <button onclick="window.loginWithGoogle()" class="w-full py-3.5 bg-[#121212] border border-[#2A2A2A] rounded-full text-sm font-medium text-white flex items-center justify-center gap-3 hover:bg-[#1A1A1A] transition-colors">
              <svg class="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
              Entrar com Google
            </button>

            <button onclick="window.loginWithMicrosoft()" class="w-full py-3.5 bg-[#121212] border border-[#2A2A2A] rounded-full text-sm font-medium text-white flex items-center justify-center gap-3 hover:bg-[#1A1A1A] transition-colors">
              <svg class="w-4 h-4" viewBox="0 0 23 23"><path fill="#f35325" d="M1 1h10v10H1z"/><path fill="#81bc06" d="M12 1h10v10H12z"/><path fill="#05a6f0" d="M1 12h10v10H1z"/><path fill="#ffba08" d="M12 12h10v10H12z"/></svg>
              Entrar com Microsoft
            </button>
          </div>
        </div>

        <p class="text-center text-xs text-gray-500 pb-4">
          Ao continuar você concorda com os <a href="#" class="underline">Termos de uso</a>
        </p>
      </div>
    `;
  }

  // --- TELAS INTERNAS ---

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
            Olá! Sou o João-de-barro, o teu assistente financeiro no PerFinApp. Como posso ajudar a organizar a tua casa financeira hoje?
          </div>
        </div>
        <div class="pt-3 flex gap-2">
          <input id="chat-input" type="text" placeholder="Pergunta algo ao João de Barro..." class="flex-1 bg-card border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand" />
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
}

export const router = new SPARouter();
window.router = router;

document.addEventListener('DOMContentLoaded', () => {
  router.init();
});
