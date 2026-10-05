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
      "Démarré lors du stage de fin de 2e année (API qui monitore les API de front office), évalué par un rapport de stage et une soutenance.",
    ],
    tags: ["NestJS", "TypeScript", "Flutter", "PostgreSQL"],
    featured: false,
  },
  {
    org: "Legrand × IUT",
    meta: ["Projet académique · SAÉ 3 et 4", "Équipe de cinq"],
    title: "Application de modes opératoires pour les ateliers",
    context:
      "Une application web pour rédiger et consulter les modes opératoires utilisés dans les ateliers de production de Legrand, afin de passer d'un système manuel à un outil automatisé.",
    bullets: [
      "Semestre 3 : mise en place de l'architecture, du backlog sur Azure DevOps et de la maquette Figma, puis début du développement avec les composants Vue.js (lecture et édition, insertion d'images et de texte).",
      "Semestre 4 : poursuite du développement et ajout d'une zone de dessin pour insérer des formes et annoter l'image et l'étape.",
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
  {
    org: "IUT du Limousin",
    meta: ["BUT 2", "Module cryptographie (R3.09)"],
    title: "Chiffrement de Vigenère et cryptanalyse de Kasiski",
    context:
      "Implémenter en Python le chiffrement et le déchiffrement de Vigenère, puis casser un texte chiffré par la méthode de Kasiski.",
    bullets: [
      "Chiffrement et déchiffrement avec une clé, et vérification des saisies partagée entre les exercices.",
      "Analyse de Kasiski : repérage des répétitions, calcul des distances et du PGCD pour retrouver la longueur de la clé.",
    ],
    tags: ["Python", "Cryptographie"],
    featured: false,
  },
  {
    org: "IUT du Limousin",
    meta: ["BUT 2", "Module développement web (R3.01)"],
    title: "Site de recettes en PHP",
    context:
      "Créer un site web dynamique de recettes de cuisine, dans l'esprit de Marmiton, pour appliquer le développement web côté serveur.",
    bullets: [
      "Site en PHP avec contenu dynamique.",
    ],
    tags: ["PHP", "HTML", "CSS"],
    featured: false,
  },
  {
    org: "IUT du Limousin",
    meta: ["BUT 2", "Complément web (R4.Real.10)"],
    title: "Clone de Netflix en JavaScript",
    context:
      "Reproduire l'interface d'un site de streaming pour explorer les différents composants d'une application web.",
    bullets: [
      "Découverte et assemblage des composants d'une interface web en JavaScript.",
    ],
    tags: ["JavaScript", "Composants web"],
    featured: false,
  },
  {
    org: "IUT du Limousin",
    meta: ["BUT 1 · SAÉ 2.01, 2.02 et 2.06", "Équipe de cinq · 3 mois"],
    title: "Jeu de plateau Latice en Java et JavaFX",
    context:
      "Développer le jeu Latice en équipe, avec une version console puis une interface graphique, livré en plusieurs versions successives.",
    bullets: [
      "Moteur du jeu en Java, version console et gestion des événements.",
      "Interface JavaFX conçue avec Scene Builder : j'ai réalisé les différentes interfaces et la gestion des événements côté front.",
      "Tests unitaires avec suivi de la couverture de code à chaque version, jusqu'à 74 %, et découpage en packages et contrôleurs dédiés.",
    ],
    tags: ["Java", "JavaFX", "Scene Builder", "Tests unitaires", "Git"],
    featured: false,
  },
  {
    org: "IUT du Limousin",
    meta: ["BUT 1 · SAÉ 2.03", "Équipe de deux · 2 mois"],
    title: "Réseau avec services DNS, SSH et DHCP sous Kathara",
    context:
      "Installer des services réseau dans un réseau virtuel émulé, avec une gestion rigoureuse de l'adressage.",
    bullets: [
      "Création et installation des différents réseaux sous Kathara.",
      "Mise en place de serveurs DNS, SSH et DHCP et gestion des adresses IP.",
      "Rapport, soutenance et démonstration du fonctionnement.",
    ],
    tags: ["Kathara", "DNS", "SSH", "DHCP", "IPv4"],
    featured: false,
  },
  {
    org: "IUT du Limousin",
    meta: ["BUT 1 · SAÉ 1.05", "Équipe de trois"],
    title: "Cahier des charges d'une application de bibliothèque universitaire",
    context:
      "Recueillir les besoins d'une bibliothèque et justifier les choix techniques avant tout développement.",
    bullets: [
      "Besoins fonctionnels et non fonctionnels, parties prenantes, contraintes et risques.",
      "Priorisation avec la méthode MoSCoW et estimation du budget.",
      "Rapport de recueil des besoins, diaporama explicatif et soutenance.",
    ],
    tags: ["Recueil de besoins", "MoSCoW", "Gestion de projet"],
    featured: false,
  },
  {
    org: "IUT du Limousin",
    meta: ["BUT 1 · SAÉ 1.04", "Gestion de bases de données"],
    title: "Base de données pour une bibliothèque",
    context:
      "Concevoir et créer une base de données relationnelle pour une bibliothèque, puis en extraire les données voulues.",
    bullets: [
      "Création et gestion de la base de données.",
      "Extraction et analyse des données demandées.",
      "Rapport détaillé avec captures d'écran et soutenance.",
    ],
    tags: ["SQL", "Modélisation", "Analyse de données"],
    featured: false,
  },
  {
    org: "IUT du Limousin",
    meta: ["BUT 1 · SAÉ 1.03", "Équipe de deux · 2 mois"],
    title: "Poste de développement sous Linux et bibliothèque en C",
    context:
      "Installer un poste de développement complet sur une machine virtuelle Linux et programmer en C bas niveau.",
    bullets: [
      "Installation et configuration de la machine virtuelle Linux.",
      "Création et gestion d'une bibliothèque, avec des fonctions adaptées programmées en C.",
      "Rapport détaillé avec captures d'écran et soutenance expliquant la démarche.",
    ],
    tags: ["Linux", "C", "Machine virtuelle"],
    featured: false,
  },
  {
    org: "IUT du Limousin",
    meta: ["BUT 1 · SAÉ 1.01 et 1.02", "Équipe de deux · 3 mois"],
    title: "Mini-jeux en Python et comparaison d'algorithmes",
    context:
      "Concevoir plusieurs mini-jeux en reprenant les concepts de base de l'algorithmique, et comparer des approches pour résoudre un même problème.",
    bullets: [
      "Implémentation de toute l'application et des algorithmes.",
      "Comparaison de différentes approches algorithmiques.",
      "Rapport avec captures d'écran des jeux, soutenance et dossier du projet.",
    ],
    tags: ["Python", "Algorithmique"],
    featured: false,
  },
  {
    org: "IUT du Limousin",
    meta: ["BUT 1 · SAÉ 1.06", "Environnement économique et écologique"],
    title: "Interview d'un professionnel du numérique",
    context:
      "Découvrir un métier de l'informatique en interrogeant un professionnel, puis le présenter à l'oral.",
    bullets: [
      "Préparation et réalisation de l'interview.",
      "Présentation du professionnel et de son métier lors d'une soutenance.",
    ],
    tags: ["Communication", "Découverte des métiers"],
    featured: false,
  },
];

export default projects;
