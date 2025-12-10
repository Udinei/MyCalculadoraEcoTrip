# Requisitos da Página — Análise a partir das imagens recebidas

Resumo: recebi 5 imagens (aparência de uma única página/app de cálculo de emissões). Abaixo está a análise visual e técnica para recriar a página em HTML/CSS/JS, seguida da ordem sugerida de criação e nomenclatura com prefixo numérico.

**Observação:** você inicialmente disse que enviaria 5 imagens — a imagem que faltava foi recebida e incluída nesta análise.

**1. Mapa rápido das imagens recebidas (visuais)**
- Imagem 1: Tela “Resultados da Emissão” — cards com rota, distância, emissão de CO₂, economia vs carro.
- Imagem 2: Comparativo por meio de transporte — cards para Ônibus, Carro, Caminhão com barras de progresso e estado selecionado.
- Imagem 3: Formulário de entrada — campos Origem, Destino, Distância (checkbox "Inserir distância manualmente"), seleção de meio de transporte (ícones), rodapé com loader "Calculando...".
- Imagem 4: Créditos de Carbono (visão geral) — créditos necessários, custo estimado, box informativo e botão "Compensar Emissões".
- Imagem 5: Créditos de Carbono (close-up / detalhe) — versão mais nítida/recortada da mesma seção, útil para extrair cores, tipografia e detalhes do CTA.

**2. Requisitos funcionais**
- Formulário para entrada de `origem`, `destino` e `distância` (possível habilitar distância manualmente).
- Seletor visual de meio de transporte com 4 opções (Bicicleta, Carro, Ônibus, Caminhão).
- Ação de cálculo com estado de loading e feedback visual.
- Resultados apresentando resumo (cards) e comparativo por transporte com porcentagens relativas e barras de progresso.
- Seção de créditos de carbono com número de créditos e custo estimado e CTA para "Compensar Emissões".

**3. Requisitos técnicos e estrutura sugerida**
- Estrutura HTML principal:
  - `header` (título da página ou seção).
  - `form#calc-form` com inputs: `input[name=origin]`, `input[name=destination]`, `input[name=distance]` e `input[type=checkbox]` para distância manual.
  - `div.transport-selector` com quatro botões/tiles (`button.transport-option`) contendo `img`/`svg` + `span` label.
  - `section.results` com `div.card` para cada resumo e `section.comparative` com `div.transport-card` repetível.
  - `section.carbon-credits` com dois painéis de métricas e um `button.btn-primary` para compensação.

- Classes CSS recomendadas (exemplos):
  - `.container`, `.card`, `.card--selected`, `.transport-option`, `.progress`, `.help-box`, `.btn-primary`.

- Estilos e design:
  - Grid responsivo: desktop 2-colunas para cards, mobile 1-coluna.
  - Cartões com `border-radius: 8px`, `box-shadow` sutil e fundo branco.
  - Estado selecionado: borda verde 2px e leve sombra.

- Cores (sugestões aproximadas; amostrar com um conta-gotas para valores exatos):
  - Verde destaque: aprox. `#16b78a` a `#00c48c`.
  - Verde claro/checkbox: `#e9f8f2` para fundos de cards selecionados.
  - Laranja (barras médias): aprox. `#f59e0b`.
  - Vermelho (barras altas): aprox. `#ef4444`.
  - Cinzas de UI: `#f3f4f6` (bg), `#6b7280` (subtexto).

- Tipografia:
  - Família: Inter / Roboto / system-ui.
  - Hierarquia: títulos 18–22px semibold; texto 14–16px.

**4. Comportamento / Interações detalhadas**
- Seleção de transporte atualiza o estado do componente e recalcula as métricas (emitir evento `change` para atualizar a UI).
- Checkbox "Inserir distância manualmente" habilita/desabilita o input de distância.
- Loader central/rodapé com anel animado e texto "Calculando..." enquanto a API ou cálculo roda.
- Animações: transição de preenchimento da `.progress` (CSS transition da largura), fade-in nos cards quando os resultados chegam.

**5. Assets a exportar / especificações**
- Ícones: `bicicleta.svg`, `carro.svg`, `onibus.svg`, `caminhao.svg` — exportar também em PNG 64px e 32px.
- Ícones menores: `leaf.svg` (emissões), `route.svg` (rota), `coin.svg` (custo), `info.svg` (dica).
- Recomenda-se SVG para ícones (escaláveis); PNG apenas para compatibilidade/preview.

**6. Acessibilidade e responsividade**
- Todos os botões/tiles devem ser foco-acessíveis (`tabindex`, `:focus` styles) e ter `aria-pressed`/`aria-selected` conforme apropriado.
- Contraste de cores testado para textos principais (WCAG AA) — ajustar se necessário.
- Layout leve: empilhar verticalmente em telas < 640px, usar grid 2 colunas entre 640–1024px e 2 colunas mais largas >1024px.


**7. Ordem de criação e nomes sugeridos (número inicial do nome + ordem de criação)**

Recomendo criar os assets/páginas nesta ordem lógica (prefixo numérico no nome do arquivo para controlar sequência):

- `01_formulario_entrada.png` — (Imagem 3) Formulário de entrada com seleção de transporte e loader.
- `02_resultados_resumo.png` — (Imagem 1) Tela de resumo com cards: rota, distância, emissão, economia vs carro.
- `03_comparativo_transportes.png` — (Imagem 2) Seção comparativa com cards por transporte e barras de progresso.
- `04_creditos_carbono_overview.png` — (Imagem 4) Visão geral da seção de créditos de carbono com métricas e CTA.
- `05_creditos_carbono_detalhe.png` — (Imagem 5) Close-up/recorte do painel de créditos — útil para extrair cor, tipografia e detalhes do botão.

Observação: os nomes acima incluem o "número do início" (`01`, `02`, etc.) — isso atende ao requisito de documentar o número inicial do nome dos arquivos e a ordem de criação sugerida. Se você já tiver os arquivos com nomes que começam por número, envie os nomes ou os próprios arquivos para que eu atualize a lista com os números reais e copie-os para `assets/screenshots/`.

**8. Próximos passos que posso executar para você**
- Exportar SVGs a partir das imagens (se você enviar arquivos fonte ou versões em alta resolução).
- Gerar um protótipo HTML/CSS estático replicando o visual (posso criar um pequeno `index.html` + `styles.css`).
- Ajustar cores/ fontes com amostras exatas se você quiser que eu extraia os hexs diretamente das imagens.

Se deseja que eu gere já um protótipo estático com os assets, diga que eu proceda — eu posso criar os arquivos e rodar uma pré-visualização local.

----

Arquivo gerado automaticamente a partir das imagens recebidas em: `e:/workspace/MyCalculadoraEcoTrip/requisitos_pagina.md`
