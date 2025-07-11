import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const peopleData = [
    {
        id: 1,
        name: "Eduardo Tosta",
        photo:
            "https://ik.imagekit.io/vek/Projeto%20Integrador/Fotos%20Integrantes/Eduardo.jpg?updatedAt=1751907565885",
        bio: "Programador Back-End com experiência em Node.js e bancos de dados relacionais e não-relacionais. Curioso por natureza, busca criar APIs limpas, escaláveis e seguras que sustentam grandes aplicações",
        linkedin: "https://www.linkedin.com/in/eduardotosta-",
        github: "https://github.com/EduardoTosta",
    },
    {
        id: 2,
        name: "Vinícius Balbino",
        photo:
            "https://ik.imagekit.io/vek/Projeto%20Integrador/Fotos%20Integrantes/Vinicius.jpg?updatedAt=1751907565876",
        bio: "Desenvolvedor Full-Stack versátil que transita bem entre o Front e o Back-End. Focado em construir soluções completas, do banco de dados à interface final, sempre buscando boas práticas e performance",
        linkedin: "https://www.linkedin.com/in/vinicius-balbinob",
        github: "https://github.com/balbino-z",
    },
    {
        id: 3,
        name: "Cleiton Reis",
        photo:
            "https://ik.imagekit.io/vek/Projeto%20Integrador/Fotos%20Integrantes/Cleiton.jpg?updatedAt=1751907565732",
        bio: "Desenvolvedor Front-End apaixonado por criar interfaces intuitivas e responsivas. Domina tecnologias como React, HTML, CSS e JavaScript, com forte atenção à usabilidade e acessibilidade",
        linkedin: "https://www.linkedin.com/in/cleitonreisbr",
        github: "https://github.com/JuniorReis-dev",
    },
    {
        id: 4,
        name: "Victor Hugo",
        photo:
            "https://ik.imagekit.io/vek/Projeto%20Integrador/Fotos%20Integrantes/Victor.jpg?updatedAt=1751907565903",
        bio: "Facilitador ágil com sólida experiência em frameworks como Scrum e Kanban. Focado em promover a colaboração entre times multidisciplinares, remoção de impedimentos e entregas de valor contínuo. Apaixonado por transformar processos complexos em jornadas leves e produtivas",
        linkedin: "https://www.linkedin.com/in/victor-hugo-souza-ferreira",
        github: "https://github.com/ProjektVek",
    },
    {
        id: 5,
        name: "Iago Zandone",
        photo:
            "https://ik.imagekit.io/vek/Projeto%20Integrador/Fotos%20Integrantes/Iago.jpg?updatedAt=1751907566034",
        bio: "Dev Mobile com foco em React Native e Flutter. Cria apps robustos e intuitivos que conectam empresas aos usuários na palma da mão. Adepto do design responsivo e das experiências ágeis",
        linkedin: "https://www.linkedin.com/in/iagozandone",
        github: "https://github.com/iagozandone",
    },
    {
        id: 6,
        name: "Ângelo Dos Santos",
        photo:
            "https://ik.imagekit.io/vek/Projeto%20Integrador/Fotos%20Integrantes/Angelo.jpg?updatedAt=1751907565933",
        bio: "Especialista em testes de software, com olhar clínico para bugs e foco total na qualidade. Atua com testes manuais e automação, garantindo que cada funcionalidade funcione com excelência antes de chegar ao usuário final.",
        linkedin: "https://www.linkedin.com/in/angelokapunda",
        github: "https://github.com/angelokapunda",
    },
    {
        id: 7,
        name: "Gabriel Julio",
        photo:
            "https://ik.imagekit.io/vek/Projeto%20Integrador/Fotos%20Integrantes/Gabriel.jpg?updatedAt=1751907565644",
        bio: "Entusiasta de novas tecnologias e explorador nato do universo do desenvolvimento. Participa ativamente de projetos open source e hackathons, sempre em busca de soluções criativas que impactem o mundo",
        linkedin: "https://www.linkedin.com/in/gabriel-julio-2b9001190",
        github: "https://github.com/GabsJJ",
    },
];

const SobreEquipe = () => {
    const sectionRef = useRef(null);
    useEffect(() => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        const cards = gsap.utils.toArray(".gsap-card-item") as HTMLElement[];

        cards.forEach((card: HTMLElement) => {
            gsap.set(card, { autoAlpha: 0, scale: 0.8 });

            gsap.to(card, {
                autoAlpha: 1,
                scale: 1,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 60%",
                    toggleActions: "play none none reverse",
                },
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);


    return (
        <section
            ref={sectionRef}
            className="relative bg-canvas text-canvasText py-20"
        >
            <div className="fixed inset-0 -z-20 pointer-events-none"></div>

            <div className="container mx-auto px-4">
                <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-16 relative z-10">
                    Equipe
                </h1>

                <div className="space-y-16">
                    {peopleData.map((person, index) => (
                        <div
                            key={person.id}
                            className={`gsap-card-item flex flex-col md:flex-row items-center bg-gradient-to-br from-orange-100 to-orange-400 rounded-xl shadow-lg p-6 md:p-8 space-y-6 md:space-y-0 relative z-10
                ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} `}
                        >
                            {/* Photo Area */}
                            <div className="flex justify-center md:justify-start mx-auto">
                                <img
                                    src={person.photo}
                                    alt={`Foto de ${person.name}`}
                                    className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover object-center shadow-md border-4 border-surface-3"
                                />
                            </div>

                            {/* Text Area (Bio + Icons) */}
                            <div className="w-full md:w-2/3 text-center md:text-left md:pl-8 flex flex-col justify-center">
                                <h3 className="text-3xl font-bold mb-2 text-primary-5">
                                    {person.name}
                                </h3>
                                <p className="text-lg text-canvasText mb-4">{person.bio}</p>{" "}
                                {/* Icons Area */}
                                <div className="flex justify-center md:justify-start space-x-4">
                                    {person.linkedin && (
                                        <a
                                            href={person.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-600 hover:text-blue-700"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="48"
                                                height="60"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                            </svg>
                                        </a>
                                    )}
                                    {person.github && (
                                        <a
                                            href={person.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-600 hover:text-black"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="48"
                                                height="60"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-4.466 19.59c-.405.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.312-1.588-.823-2.147.082-.202.356-1.016-.079-2.117 0 0-.671-.215-2.198.82-.64-.18-1.324-.267-2.004-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SobreEquipe;
