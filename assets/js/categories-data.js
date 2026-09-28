const categoriesData = [
  {
    group: "Alimentação",
    color: "#FF7A00",
    bgAlpha: "rgba(255, 122, 0, 0.15)",
    icon: "shopping-cart",
    items: [
      { id: "supermercado", name: "Supermercado", icon: "shopping-cart" },
      { id: "alimentos_bebidas", name: "Alimentos e bebidas", icon: "coffee" },
      { id: "restaurantes", name: "Restaurantes, bares e lanchonetes", icon: "utensils" },
      { id: "delivery", name: "Delivery de alimentos", icon: "bike" }
    ]
  },
  {
    group: "Compras",
    color: "#EC4899",
    bgAlpha: "rgba(236, 72, 153, 0.15)",
    icon: "shopping-bag",
    items: [
      { id: "compras_geral", name: "Compras", icon: "shopping-bag" },
      { id: "compras_online", name: "Compras online", icon: "globe" },
      { id: "eletronicos", name: "Eletrônicos", icon: "smartphone" },
      { id: "petshops", name: "Pet Shops e veterinários", icon: "dog" },
      { id: "vestuario", name: "Vestuário", icon: "shirt" },
      { id: "infantil", name: "Artigos infantis", icon: "baby" },
      { id: "livraria", name: "Livraria", icon: "book-open" },
      { id: "esportes_artigos", name: "Artigos esportivos", icon: "trophy" },
      { id: "papelaria", name: "Papelaria", icon: "file-text" },
      { id: "cashback", name: "Cashback", icon: "badge-percent" }
    ]
  },
  {
    group: "Saúde e bem-estar",
    color: "#10B981",
    bgAlpha: "rgba(16, 185, 129, 0.15)",
    icon: "heart",
    items: [
      { id: "saude", name: "Saúde", icon: "heart-pulse" },
      { id: "saude_bem_estar", name: "Saúde e bem-estar", icon: "heart" },
      { id: "academia", name: "Academia e centros de lazer", icon: "dumbbell" },
      { id: "pratica_esportes", name: "Prática de esportes", icon: "activity" },
      { id: "bem_estar", name: "Bem-estar", icon: "smile" },
      { id: "dentista", name: "Dentista", icon: "smile" },
      { id: "farmacia", name: "Farmácia", icon: "cross" }
    ]
  },
  {
    group: "Transporte",
    color: "#F59E0B",
    bgAlpha: "rgba(245, 158, 11, 0.15)",
    icon: "car",
    items: [
      { id: "aluguel_veiculos", name: "Aluguel de veículos", icon: "car" },
      { id: "aluguel_bicicletas", name: "Aluguel de bicicletas", icon: "bike" },
      { id: "servicos_automotivos", name: "Serviços automotivos", icon: "wrench" },
      { id: "postos", name: "Postos de gasolina", icon: "fuel" },
      { id: "estacionamento", name: "Estacionamentos", icon: "square-p" },
      { id: "pedagios", name: "Pedágios e pagamentos no veículo", icon: "credit-card" },
      { id: "impostos_veiculos", name: "Taxas e impostos sobre veículos", icon: "file-text" },
      { id: "manutencao_veiculos", name: "Manutenção de veículos", icon: "wrench" },
      { id: "multas", name: "Multas de trânsito", icon: "alert-triangle" }
    ]
  },
  {
    group: "Moradia",
    color: "#8B5CF6",
    bgAlpha: "rgba(139, 92, 246, 0.15)",
    icon: "home",
    items: [
      { id: "moradia_geral", name: "Moradia", icon: "home" },
      { id: "aluguel", name: "Aluguel", icon: "key" },
      { id: "utilidade_publica", name: "Serviços de utilidade pública", icon: "wrench" },
      { id: "agua", name: "Água", icon: "droplet" },
      { id: "eletricidade", name: "Eletricidade", icon: "zap" },
      { id: "gas", name: "Gás", icon: "flame" },
      { id: "utensilios", name: "Utensílios para casa", icon: "box" },
      { id: "impostos_moradia", name: "Impostos sobre moradia", icon: "file-text" },
      { id: "telecomunicacao", name: "Telecomunicação", icon: "wifi" },
      { id: "internet", name: "Internet", icon: "wifi" },
      { id: "celular", name: "Celular", icon: "smartphone" },
      { id: "tv", name: "TV", icon: "tv" }
    ]
  },
  {
    group: "Lazer e entretenimento",
    color: "#3B82F6",
    bgAlpha: "rgba(59, 130, 246, 0.15)",
    icon: "umbrella",
    items: [
      { id: "lazer", name: "Lazer", icon: "umbrella" },
      { id: "viagens", name: "Viagens", icon: "plane" },
      { id: "aeroportos", name: "Aeroportos e cias. aéreas", icon: "plane-takeoff" },
      { id: "hospedagem", name: "Hospedagem", icon: "building" },
      { id: "milhas", name: "Programas de milhagem", icon: "award" },
      { id: "passagem_onibus", name: "Passagem de ônibus", icon: "bus" },
      { id: "bilhetes", name: "Bilhetes", icon: "ticket" },
      { id: "estadios", name: "Estádios e arenas", icon: "map-pin" },
      { id: "museus", name: "Museus e pontos turísticos", icon: "landmark" },
      { id: "cinema", name: "Cinema, Teatro e Concertos", icon: "film" }
    ]
  },
  {
    group: "Finanças",
    color: "#10B981",
    bgAlpha: "rgba(16, 185, 129, 0.15)",
    icon: "banknote",
    items: [
      { id: "investimentos", name: "Investimentos", icon: "trending-up" },
      { id: "investimento_auto", name: "Investimento automático", icon: "cpu" },
      { id: "renda_fixa", name: "Renda fixa", icon: "lock" },
      { id: "multimercado", name: "Fundos multimercado", icon: "pie-chart" },
      { id: "renda_variavel", name: "Renda variável", icon: "line-chart" },
      { id: "transf_mesma_titularidade", name: "Transferência mesma titularidade", icon: "arrow-left-right" },
      { id: "transf_pix", name: "Transferência - PIX", icon: "zap" },
      { id: "cartao_credito", name: "Pagamento de cartão de crédito", icon: "credit-card" },
      { id: "emprestimos", name: "Empréstimos e financiamento", icon: "landmark" }
    ]
  },
  {
    group: "Renda",
    color: "#22C55E",
    bgAlpha: "rgba(34, 197, 94, 0.15)",
    icon: "wallet",
    items: [
      { id: "renda_geral", name: "Renda", icon: "wallet" },
      { id: "salario", name: "Salário", icon: "dollar-sign" },
      { id: "aposentadoria", name: "Aposentadoria", icon: "shield-check" },
      { id: "empreendedorismo", name: "Atividades de empreendedorismo", icon: "briefcase" },
      { id: "auxilio", name: "Auxílio do governo", icon: "hand-heart" },
      { id: "nao_recorrente", name: "Renda não-recorrente", icon: "coins" }
    ]
  }
];
