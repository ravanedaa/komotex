# KomoTex Landing Page - Setup Guide

Esta landing page foi desenvolvida com **Next.js 15**, **Tailwind CSS**, **Framer Motion** e **shadcn/ui**, seguindo todas as diretrizes de design e performance solicitadas.

## 🚀 Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

## 📦 Instalação

1. Instale as dependências do projeto:
```bash
npm install
```
Isso instalará os pacotes necessários: `framer-motion`, `lenis`, `lucide-react`, `clsx`, `tailwind-merge`, etc.

## 🎨 Imagens e Assets

Para que o site fique exatamente como no design, você precisa adicionar as imagens na pasta `public/`.
Renomeie os arquivos fornecidos (ou use suas próprias imagens) para os seguintes nomes:

- `public/hero-hanger.png` - Imagem da camiseta no cabide (Hero)
- `public/fabric-float.png` - Imagem do tecido flutuando/caindo (Seção Sobre)
- `public/detail-sleeve.png` - Detalhe da manga (Card Produto 1)

Você também pode adicionar:
- `public/og-image.jpg` - Para compartilhamento em redes sociais (1200x630px)

## 🛠️ Comandos Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento em `localhost:3000`.
- `npm run build`: Cria a versão otimizada para produção.
- `npm start`: Inicia o servidor de produção.

## 🌐 Variáveis de Ambiente

Este projeto é estático e visual, portanto não requer chaves de API obrigatórias para funcionar.
No entanto, para integrações futuras (como formulário de contato), você pode configurar:

```env
# Exemplo opcional
NEXT_PUBLIC_CONTACT_EMAIL=contato@komotex.com.br
```

## 📝 Estrutura do Projeto

- `app/page.tsx`: Página principal com todas as seções (Hero, Diferenciais, Produtos, CTA).
- `app/layout.tsx`: Configuração global, fontes (Inter Tight) e metadados SEO.
- `app/globals.css`: Variáveis de cores (Tailwind v4 theme) e estilos globais.
- `components/SmoothScroll.tsx`: Configuração do Lenis Scroll.
- `components/ui/`: Componentes reutilizáveis (Botões, etc).

## ✨ Customização

Para alterar as cores principais, edite o arquivo `app/globals.css`:
```css
:root {
  --primary: #0c769a; /* Cor principal */
}
```
A fonte **Inter Tight** já está configurada e otimizada via `next/font`.
