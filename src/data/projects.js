const projects = [
  {
    org: "Legrand",
    meta: ["Alternance", "Depuis septembre 2026"],
    title: "API pour le back-office et le front-office",
    context:
      "En alternance pendant ma 3e année de BUT, je conçois et développe plusieurs API utilisées à la fois par les outils internes et par les interfaces destinées aux utilisateurs.",
    bullets: [
      "Conception et développement de plusieurs API.",
      "Intégration dans l'écosystème applicatif existant de Legrand.",
    ],
    tags: [],
    featured: true,
  },
  {
    org: "Legrand",
    meta: ["Stage puis CDD", "Avril – juillet 2026", "Projet mené seule"],
    title: "Application de monitoring pour XLPro4 Tableaux",
    context:
      "XLPro4 Tableaux est le logiciel de Legrand qui sert aux installateurs et aux bureaux d'études à concevoir, implanter et chiffrer des tableaux électriques de distribution.",
    bullets: [
      "Conception et développement d'une API NestJS qui surveille l'infrastructure du logiciel.",
      "Interface web en Flutter pour visualiser l'état des services.",
      "Modélisation et stockage des données de supervision dans PostgreSQL.",
      "Projet mené en autonomie, du recueil du besoin à la livraison.",
    ],
    tags: ["NestJS", "TypeScript", "Flutter", "PostgreSQL"],
    featured: false,
  },
  {
    org: "Legrand × IUT",
    meta: ["Projet académique", "Équipe de cinq"],
    title: "Application de modes opératoires pour les ateliers",
    context:
      "Une application web pour rédiger et consulter les modes opératoires utilisés dans les ateliers de production de Legrand.",
    bullets: [
      "Front en Vue.js et TypeScript, API Node.js, base SQL Server.",
      "Déploiement sur Azure : infrastructure décrite avec Terraform, conteneurs Docker, pipelines Azure DevOps.",
      "Organisation en sprints avec Scrum.",
    ],
    tags: [
      "Vue.js",
      "TypeScript",
      "Node.js",
      "SQL Server",
      "Terraform",
      "Docker",
      "Azure DevOps",
    ],
    featured: false,
  },
  {
    org: "IUT du Limousin",
    meta: ["BUT 3", "Infrastructure"],
    title: "Déployer une application NestJS et Flutter Web sur Azure",
    context:
      "Mettre en ligne une application complète en décrivant toute l'infrastructure sous forme de code.",
    bullets: [
      "Infrastructure Azure écrite en Terraform : back NestJS, front Flutter Web, base MySQL.",
      "Pipelines Azure DevOps avec authentification par identité managée.",
    ],
    tags: ["Terraform", "Azure", "Azure DevOps", "NestJS", "Flutter Web", "MySQL"],
    featured: false,
  },
  {
    org: "IUT du Limousin",
    meta: ["BUT 3", "Module NoSQL"],
    title: "Architecture NoSQL pour une plateforme de gestion de projets",
    context:
      "Concevoir le stockage d'une plateforme collaborative multi-organisations : projets, tâches, commentaires et collaboration en temps réel.",
    bullets: [
      "Architecture polyglotte : MongoDB pour les projets et les tâches, Cassandra pour l'historique, Redis pour les notifications et le temps réel.",
      "Analyse CAP, répartition des données et tolérance aux pannes.",
      "Prototype et dossier d'architecture présentés à l'oral.",
    ],
    tags: ["MongoDB", "Cassandra", "Redis", "Modélisation"],
    featured: false,
  },
];

export default projects;
