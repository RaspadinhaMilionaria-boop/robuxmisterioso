
import React, { useState, useEffect } from 'react';
import { Package, ChevronDown, ChevronUp, Check, ArrowRight, Zap, ShieldCheck, ShoppingCart, Loader2 } from 'lucide-react';
import { STEPS, TRUST_FACTORS, FAQ_DATA } from './constants';
import SectionHeading from './components/SectionHeading';
import RobuxBox from './components/RobuxBox';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [winnerImages, setWinnerImages] = useState<string[]>([]);
  const [isLoadingWinners, setIsLoadingWinners] = useState(true);

  const CHECKOUT_URL = "https://lxpay.com.br/checkout/07e91ddf-83b8-446d-a12e-337ca976384d?offer=3fc2cb24-3e3e-4279-a595-3c970078bfaa";

  // Função para gerar avatares dos ganhadores via IA
  const generateWinnerAvatars = async () => {
    setIsLoadingWinners(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Geramos 3 avatares diferentes
      const avatars: string[] = [];
      const styles = [
        "teenage boy gamer, cool headset, Roblox 3D style, neon green theme",
        "teenage girl gamer, stylish cap, Roblox 3D style, blue and purple neon",
        "diverse teenage gamer, happy expression, Roblox 3D style, vibrant lighting"
      ];

      for (const style of styles) {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [
              { text: `3D digital avatar of a ${style}, high quality render, profile picture style, dark background.` }
            ]
          },
          config: {
            imageConfig: {
              aspectRatio: "1:1"
            }
          }
        });

        const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
        if (part?.inlineData?.data) {
          avatars.push(`data:image/png;base64,${part.inlineData.data}`);
        }
      }

      if (avatars.length > 0) {
        setWinnerImages(avatars);
      }
    } catch (error) {
      console.error("Erro ao gerar imagens dos ganhadores:", error);
      // Fallback para imagens genéricas se a API falhar
      setWinnerImages([
        "https://picsum.photos/seed/winner1/100/100",
        "https://picsum.photos/seed/winner2/100/100",
        "https://picsum.photos/seed/winner3/100/100"
      ]);
    } finally {
      setIsLoadingWinners(false);
    }
  };

  useEffect(() => {
    generateWinnerAvatars();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToOffer = () => {
    const el = document.getElementById('offer');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const goToCheckout = () => {
    window.location.href = CHECKOUT_URL;
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white selection:bg-[#00E676] selection:text-black">
      
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-effect py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-[#00E676] p-1.5 rounded-lg">
            <Package className="w-5 h-5 text-black" />
          </div>
          <span className="font-heading font-black text-xl tracking-tighter uppercase">Robux <span className="text-[#00E676]">Misterioso</span></span>
        </div>
        <button 
          onClick={scrollToOffer}
          className="hidden md:block bg-white/10 hover:bg-white/20 transition-all text-sm font-bold py-2 px-6 rounded-full border border-white/10"
        >
          Ir para Oferta
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-[#00E676] opacity-10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-blue-500 opacity-5 blur-[100px] rounded-full"></div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left z-10">
            <div className="inline-flex items-center gap-2 bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/20 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
              <Zap className="w-4 h-4" />
              Oferta Premium Limitada
            </div>
            <h1 className="text-5xl md:text-7xl font-black font-heading leading-tight mb-6 uppercase">
              Robux <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E676] to-[#00C853]">Misterioso</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto md:mx-0 mb-10 leading-relaxed">
              Compre agora um pacote de Robux Misterioso e você poderá ganhar até <span className="text-white font-bold">22.500 Robux</span> de uma única vez. Bônus garantido em todas as compras!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={goToCheckout}
                className="robux-gradient neon-glow text-black font-black text-lg py-5 px-10 rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 uppercase shadow-xl"
              >
                Comprar Robux Misterioso
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
            <div className="mt-8 flex items-center justify-center md:justify-start gap-4 text-sm text-gray-500 font-semibold uppercase tracking-widest">
              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-[#00E676]" /> 100% Seguro</span>
              <span className="w-1.5 h-1.5 bg-gray-700 rounded-full"></span>
              <span className="flex items-center gap-1"><Zap className="w-4 h-4 text-[#00E676]" /> Entrega Ágil</span>
            </div>
          </div>
          
          <div className="relative">
            <RobuxBox />
            
            {/* Social Proof Mini Card com imagens de IA */}
            <div className="absolute -bottom-6 -left-4 md:-left-12 glass-effect p-4 rounded-2xl flex items-center gap-4 animate-float border-white/10 shadow-2xl z-20 min-w-[220px]">
              <div className="flex -space-x-3">
                {isLoadingWinners ? (
                  // Skeleton state enquanto carrega as imagens da IA
                  [1, 2, 3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-white/10 animate-pulse border-2 border-[#1a1a1a] flex items-center justify-center">
                      <Loader2 className="w-4 h-4 text-[#00E676] animate-spin" />
                    </div>
                  ))
                ) : (
                  winnerImages.map((src, i) => (
                    <img key={i} src={src} className="w-10 h-10 rounded-full border-2 border-[#00E676]/30 object-cover" alt="Ganhador" />
                  ))
                )}
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Últimos Ganhadores</p>
                <p className="text-sm font-black text-[#00E676]">+12.000 Robux</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 bg-[#111111] px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            title="Como Funciona" 
            subtitle="O caminho mais rápido e divertido para turbinar seu saldo de Robux com bônus exclusivos."
          />
          
          <div className="grid md:grid-cols-3 gap-8 mt-16 relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00E676]/20 to-transparent -translate-y-12"></div>
            
            {STEPS.map((step) => (
              <div key={step.id} className="group relative z-10 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-[#1a1a1a] rounded-3xl border border-white/5 flex items-center justify-center mb-6 group-hover:border-[#00E676]/50 group-hover:bg-[#00E676]/5 transition-all shadow-xl">
                  {step.icon}
                </div>
                <div className="absolute -top-4 bg-[#00E676] text-black w-8 h-8 rounded-full font-black flex items-center justify-center text-sm shadow-lg">
                  {step.id}
                </div>
                <h3 className="text-xl font-bold mb-3 font-heading uppercase tracking-wide">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed max-w-xs">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Product Section */}
      <section id="offer" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#00E676] opacity-5 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-1/2 right-0 w-64 h-64 bg-purple-500 opacity-5 blur-[100px] rounded-full"></div>

        <div className="max-w-4xl mx-auto">
          <SectionHeading title="A Oferta Única" />
          
          <div className="glass-effect rounded-[40px] p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-[#00E676] text-black px-12 py-2 rotate-45 translate-x-10 translate-y-4 font-black text-sm uppercase tracking-widest shadow-lg">
              Melhor Valor
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block bg-[#00E676]/10 text-[#00E676] px-4 py-1 rounded-lg text-xs font-black uppercase tracking-widest mb-4">
                  Produto Digital
                </div>
                <h3 className="text-4xl md:text-5xl font-black font-heading mb-6 uppercase italic">
                  Robux <span className="text-[#00E676]">Misterioso</span>
                </h3>
                
                <ul className="space-y-6 mb-10">
                  <li className="flex items-start gap-4">
                    <div className="mt-1 bg-[#00E676]/20 p-1 rounded-md">
                      <Check className="w-5 h-5 text-[#00E676]" />
                    </div>
                    <div>
                      <p className="font-bold text-lg mb-1">Mais valor pelo mesmo preço</p>
                      <p className="text-gray-400 text-sm">Possibilidade real de receber muito mais Robux do que o valor padrão de mercado.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 bg-[#00E676]/20 p-1 rounded-md">
                      <Check className="w-5 h-5 text-[#00E676]" />
                    </div>
                    <div>
                      <p className="font-bold text-lg mb-1">Robux Garantido na Compra</p>
                      <p className="text-gray-400 text-sm">Você sempre recebe Robux. Não existe risco de sair sem nada.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 bg-[#00E676]/20 p-1 rounded-md">
                      <Check className="w-5 h-5 text-[#00E676]" />
                    </div>
                    <div>
                      <p className="font-bold text-lg mb-1">Perfeito para quem quer rapidez</p>
                      <p className="text-gray-400 text-sm">Sem precisar esperar promoções ou eventos oficiais. O bônus é seu agora!</p>
                    </div>
                  </li>
                </ul>

                <div className="bg-black/40 rounded-3xl p-6 border border-white/5 mb-8">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-gray-500 font-bold uppercase text-xs tracking-widest">Preço Especial</span>
                    <span className="text-gray-400 line-through text-sm">R$ 49,90</span>
                  </div>
                  <div className="text-4xl font-black font-heading">
                    R$ <span className="text-[#00E676]">19</span>,90
                  </div>
                </div>

                <button 
                  onClick={goToCheckout}
                  className="w-full robux-gradient text-black font-black py-5 rounded-2xl text-xl uppercase tracking-tighter hover:scale-[1.02] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3"
                >
                  <ShoppingCart className="w-6 h-6" />
                  Quero meu Robux Agora
                </button>
                <p className="text-center text-gray-500 text-xs mt-4 font-bold uppercase tracking-wider">
                  🔒 Pagamento Criptografado e Seguro
                </p>
              </div>

              <div className="hidden md:flex justify-center">
                <RobuxBox />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-[#111111] px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Confiança e Segurança" centered={false} />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {TRUST_FACTORS.map((factor, idx) => (
              <div key={idx} className="glass-effect p-8 rounded-[32px] border-white/5 hover:border-[#00E676]/30 transition-all group">
                <div className="mb-6 bg-white/5 w-12 h-12 rounded-2xl flex items-center justify-center group-hover:bg-[#00E676]/10 transition-all">
                  {factor.icon}
                </div>
                <h4 className="text-xl font-bold mb-3 font-heading uppercase">{factor.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{factor.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-white/5 to-transparent p-8 md:p-12 rounded-[40px] border border-white/5">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-4xl italic">
              "O <span className="text-white font-bold">Robux Misterioso</span> foi criado para oferecer uma experiência clara, simples e confiável. Você sempre recebe Robux garantido conforme a opção escolhida, sem riscos ou pegadinhas de sistema. Nosso compromisso é com a sua diversão."
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <SectionHeading title="FAQ" subtitle="Tire suas dúvidas e compre com total tranquilidade." />
        
        <div className="space-y-4 mt-12">
          {FAQ_DATA.map((faq, index) => (
            <div key={index} className="glass-effect rounded-2xl border-white/5 overflow-hidden">
              <button 
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition-all"
              >
                <span className="font-bold text-lg md:text-xl">{faq.question}</span>
                {openFaq === index ? (
                  <ChevronUp className="w-6 h-6 text-[#00E676]" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-500" />
                )}
              </button>
              {openFaq === index && (
                <div className="px-6 pb-6 pt-2 text-gray-400 leading-relaxed border-t border-white/5 animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto robux-gradient rounded-[48px] p-12 md:p-24 text-center relative overflow-hidden shadow-[0_0_100px_rgba(0,230,118,0.2)]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <h2 className="text-4xl md:text-6xl font-black font-heading text-black mb-8 uppercase leading-tight">
            Pronto para descobrir <br /> seu bônus?
          </h2>
          <p className="text-black/70 text-lg md:text-xl font-bold max-w-2xl mx-auto mb-12 uppercase tracking-wide">
            Não perca a chance de receber até 22.500 Robux hoje mesmo. A oferta pode expirar a qualquer momento!
          </p>
          <button 
            onClick={goToCheckout}
            className="bg-black text-white font-black text-xl py-6 px-12 rounded-3xl hover:scale-105 active:scale-95 transition-all shadow-2xl uppercase tracking-tighter"
          >
            Quero meu Robux Misterioso
          </button>
          
          <div className="mt-12 flex flex-wrap justify-center gap-6 opacity-60">
             <span className="bg-black/20 px-3 py-1 rounded-md text-xs font-black uppercase text-black">VISA</span>
             <span className="bg-black/20 px-3 py-1 rounded-md text-xs font-black uppercase text-black">Mastercard</span>
             <span className="bg-black/20 px-3 py-1 rounded-md text-xs font-black uppercase text-black">PIX</span>
             <span className="bg-black/20 px-3 py-1 rounded-md text-xs font-black uppercase text-black">Boleto</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-white/10 p-1 rounded-lg">
              <Package className="w-4 h-4 text-[#00E676]" />
            </div>
            <span className="font-heading font-black text-lg tracking-tighter uppercase">Robux <span className="text-[#00E676]">Misterioso</span></span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500 font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Suporte</a>
          </div>

          <p className="text-gray-600 text-xs font-bold uppercase tracking-tighter">
            © 2024 Robux Misterioso. Todos os direitos reservados.
          </p>
        </div>
        <div className="max-w-4xl mx-auto mt-8 text-center text-[10px] text-gray-700 font-bold uppercase leading-relaxed px-4">
          Aviso Legal: Este site não é afiliado, associado, autorizado, endossado por, ou de qualquer forma oficialmente conectado ao Roblox Corporation, ou qualquer uma de suas subsidiárias or afetadas.
        </div>
      </footer>
    </div>
  );
};

export default App;
