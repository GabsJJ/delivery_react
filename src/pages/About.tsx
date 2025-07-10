
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Título */}
        <h1
          className="text-4xl md:text-5xl font-bold mb-6 text-center"
          style={{ color: "#ff7d37" }}
        >
          Sobre o Projeto
        </h1>

        {/* Parágrafo introdutório */}
        <p className="text-lg md:text-xl text-center text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
          O <span className="font-semibold "
            style={{ color: "#ff7d37" }}
          >GetFood</span> é uma aplicação moderna desenvolvida com foco em experiência do usuário, agilidade e segurança nas entregas urbanas. Ideal para restaurantes, mercados e pequenos comércios que desejam entregar com eficiência.
        </p>

        {/* Seção de características */}
        <div className="grid md:grid-cols-2 gap-10">
          <FeatureCard
            title="Tecnologia Moderna"
            description="Construído com React, TypeScript e Tailwind CSS, garantindo performance e facilidade de manutenção."
          />
          <FeatureCard
            title="Interface Intuitiva"
            description="Pensada para facilitar o uso tanto por entregadores quanto por clientes, com usabilidade fluida."
          />
          <FeatureCard
            title="Entrega Rápida"
            description="Algoritmo inteligente de roteamento para reduzir tempo de espera e melhorar a eficiência das entregas."
          />
          <FeatureCard
            title="Painel Administrativo"
            description="Gerencie pedidos, status de entregas e cadastros com um painel completo e responsivo."
          />
        </div>

        {/* CTA final */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 "
          style={{ color: "#ff7d37" }}>
            Vamos revolucionar a forma como você entrega!
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Junte-se ao RideBro Delivery e proporcione uma nova experiência aos seus clientes.
          </p>
          <button className="bg-[#ff7d37] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#ff7d37] transition-colors shadow-lg">
            Comece Agora
          </button>
        </div>
      </div>
    </div>
  );
}

// Componente de Feature
interface FeatureProps {
  title: string;
  description: string;
}

function FeatureCard({ title, description }: FeatureProps) {
  return (
    <div className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-md transition-all duration-300">
      <h3 className="text-xl font-semibold mb-2" style={{ color: "#ff7d37" }}>{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}
