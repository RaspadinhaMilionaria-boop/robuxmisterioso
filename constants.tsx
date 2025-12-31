
import React from 'react';
import { ShoppingCart, ShieldCheck, Zap, Layers, HelpCircle, Package, CheckCircle, Info } from 'lucide-react';
import { Step, FAQItem, TrustFactor } from './types';

export const STEPS: Step[] = [
  {
    id: 1,
    title: 'Adquira o seu Robux Misterioso',
    description: 'Escolha a sua oferta e inicie o processo de compra simplificado.',
    icon: <ShoppingCart className="w-8 h-8 text-[#00E676]" />
  },
  {
    id: 2,
    title: 'Pagamento Seguro',
    description: 'Utilizamos as melhores tecnologias para garantir que sua transação seja 100% protegida.',
    icon: <ShieldCheck className="w-8 h-8 text-[#00E676]" />
  },
  {
    id: 3,
    title: 'Receba seu Robux',
    description: 'Receba entre 500 e 22.500 Robux garantidos diretamente na sua conta.',
    icon: <Zap className="w-8 h-8 text-[#00E676]" />
  }
];

export const TRUST_FACTORS: TrustFactor[] = [
  {
    title: 'Robux Garantido',
    description: 'Você sempre receberá algum valor em robux, sendo o mínimo 500robux e o máximo 22.500.',
    icon: <CheckCircle className="w-6 h-6 text-[#00E676]" />
  },
  {
    title: 'Processo Simples',
    description: 'Sem burocracia. Informe seu usuário e receba seu pacote.',
    icon: <Layers className="w-6 h-6 text-[#00E676]" />
  },
  {
    title: 'Entrega Rápida',
    description: 'Nossa equipe processa os pedidos em tempo recorde para você não esperar.',
    icon: <Zap className="w-6 h-6 text-[#00E676]" />
  },
  {
    title: 'Transparência',
    description: 'Valores claros e processo auditado para sua total tranquilidade.',
    icon: <Info className="w-6 h-6 text-[#00E676]" />
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: 'Eu posso receber menos Robux do que comprei?',
    answer: 'Não. Sempre existe um valor mínimo garantido de pelo menos 500 Robux em cada compra do Robux Misterioso.'
  },
  {
    question: 'Todo mundo ganha bônus?',
    answer: 'O bônus é uma surpresa! Todos recebem pelo menos o valor mínimo de 500 Robux, mas alguns sortudos recebem bônus extras que podem chegar ao prêmio máximo de 22.500.'
  },
  {
    question: 'Quanto tempo demora para receber?',
    answer: 'Normalmente a entrega ocorre em até 24 horas após a confirmação do pagamento, dependendo da demanda do sistema.'
  },
  {
    question: 'É seguro?',
    answer: 'Sim! Trabalhamos com processos transparentes e seguros, focados na satisfação do cliente e na integridade da sua conta.'
  },
  {
    question: 'Preciso ter conta no Roblox?',
    answer: 'Sim, é fundamental informar corretamente o seu nome de usuário do Roblox para que possamos realizar a entrega do pacote.'
  }
];
