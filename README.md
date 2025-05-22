# 📱 MobSolutions - Gestão em Saúde

![Logo MobSolutions](./assets/icon.png)

<p align="center">
  <img src="https://img.shields.io/badge/Expo-53.0.9-blue?logo=expo" alt="Expo Version">
  <img src="https://img.shields.io/badge/React_Native-0.79.2-61DAFB?logo=react" alt="React Native Version">
  <img src="https://img.shields.io/badge/License-0BSD-lightgrey" alt="License">
</p>

## 🚀 Visão Geral
Aplicativo de estatísticas medicas.

## 📋 Pré-requisitos
- Node.js 18+
- Yarn ou npm
- Expo Go (disponível na [App Store](https://apps.apple.com/br/app/expo-go/id982107779) e [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent))

## ⚡ Como Executar

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/app-mobsolutions.git
cd app-mobsolutions

# 2. Instale as dependências
yarn install
npm install
npm install expo
yarn add expo

# 3. Inicie o projeto
npx expo start

Escaneie o QR code com o app Expo Go!

```

## 🛠 Comandos Úteis

- expo start -	Inicia o servidor de desenvolvimento
- expo run:android	- Executa no emulador Android
- expo run:ios	- Executa no simulador iOS (requer Xcode)
- expo start - web	Executa versão web

## 🏗 Estrutura do Projeto

```bash 
.
├── app/
│   ├── (auth)/          # Telas de login/redefinição
│   ├── components/      # Componentes compartilhados
│   ├── contexts/        # Auth, Toast, etc.
│   └── services/        # API services
├── assets/             # Ícones, imagens
├── styles/             # Temas globais
└── app.json            # Configuração Expo

```

## 📚 Tecnologias

<div style="display: flex; gap: 10px; flex-wrap: wrap;"> <img src="https://img.shields.io/badge/React_Native-20232A?logo=react&logoColor=61DAFB" alt="React Native"> <img src="https://img.shields.io/badge/Expo-000020?logo=expo&logoColor=white" alt="Expo"> <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript"> <img src="https://img.shields.io/badge/React_Navigation-6B52AE?logo=react&logoColor=white" alt="React Navigation"> </div>
