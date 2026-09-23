const referentiel = [
  {
    id: "realiser",
    title: "Réaliser",
    level: "Niveau 3",
    color: "#C8483B",
    description:
      "Développer — c'est-à-dire concevoir, coder, tester et intégrer — une solution informatique pour un client.",
    essentials: [
      "en respectant les besoins décrits par le client",
      "en appliquant les principes algorithmiques",
      "en veillant à la qualité du code et à sa documentation",
      "en choisissant les ressources techniques appropriées",
    ],
    situations: [
      "Élaborer une application informatique",
      "Faire évoluer une application informatique",
      "Maintenir en conditions opérationnelles une application informatique",
    ],
    levels: [
      {
        title: "Développer des applications informatiques simples",
        acs: [
          {
            code: "AC11.01",
            label: "Implémenter des conceptions simples",
            status: "done",
            evidence: "Mini-jeux développés en Python lors des cours d'algorithmique (SAÉ).",
          },
          {
            code: "AC11.02",
            label: "Élaborer des conceptions simples",
            status: "done",
            evidence:
              "Conception des mini-jeux Python à partir des concepts algorithmiques de base vus en cours.",
          },
          {
            code: "AC11.03",
            label: "Faire des essais et évaluer leurs résultats en regard des spécifications",
            status: "done",
            evidence: "SAÉ en bash sur les fondamentaux bas niveau, avec vérification des résultats obtenus.",
          },
          {
            code: "AC11.04",
            label: "Développer des interfaces utilisateurs",
            status: "done",
            evidence: "Interfaces Flutter (monitoring Legrand) et Vue.js (modes opératoires).",
          },
        ],
      },
      {
        title: "Partir des exigences et aller jusqu'à une application complète",
        acs: [
          {
            code: "AC21.01",
            label:
              "Élaborer et implémenter les spécifications fonctionnelles et non fonctionnelles à partir des exigences",
            status: "done",
            evidence:
              "Outil de monitoring XLPro4 : du besoin exprimé par Legrand à l'application livrée, en autonomie.",
          },
          {
            code: "AC21.02",
            label: "Appliquer des principes d'accessibilité et d'ergonomie",
            status: "done",
            evidence: "Respect des maquettes fournies par Legrand pour l'ergonomie et la stabilité des interfaces.",
          },
          {
            code: "AC21.03",
            label: "Adopter de bonnes pratiques de conception et de programmation",
            status: "done",
            evidence: "Principes SOLID, architecture modulaire NestJS (modules, services, contrôleurs).",
          },
          {
            code: "AC21.04",
            label: "Vérifier et valider la qualité de l'application par les tests",
            status: "done",
            evidence:
              "Jeu Latice (Java/JavaFX, équipe de 5) : tests unitaires avec suivi de la couverture de code à chaque version livrée, jusqu'à 74 %.",
          },
        ],
      },
      {
        title: "Adapter des applications sur un ensemble de supports (embarqué, web, mobile, IoT…)",
        acs: [
          {
            code: "AC31.01",
            label: "Choisir et implémenter les architectures adaptées",
            status: "done",
            evidence: "API NestJS séparée d'un front Flutter, un même code pour le web et le mobile.",
          },
          {
            code: "AC31.02",
            label: "Faire évoluer une application existante",
            status: "todo",
            evidence:
              "En cours : accompagnement de l'évolution des API existantes de Legrand pendant l'alternance.",
          },
          {
            code: "AC31.03",
            label: "Intégrer des solutions dans un environnement de production",
            status: "done",
            evidence:
              "Déploiement Azure (Terraform, Docker, Azure DevOps) ; API livrées en alternance chez Legrand.",
          },
        ],
      },
    ],
  },
  {
    id: "optimiser",
    title: "Optimiser",
    level: "Niveau 3",
    color: "#D9822B",
    description:
      "Proposer des applications informatiques optimisées en fonction de critères spécifiques : temps d'exécution, précision, consommation de ressources…",
    essentials: [
      "en formalisant et modélisant des situations complexes",
      "en recensant les algorithmes et les structures de données usuels",
      "en s'appuyant sur des schémas de raisonnement",
      "en justifiant les choix et validant les résultats",
    ],
    situations: [
      "Améliorer les performances des programmes dans des contextes contraints",
      "Limiter l'impact environnemental d'une application informatique",
      "Mettre en place des applications informatiques adaptées et efficaces",
    ],
    levels: [
      {
        title: "Appréhender et construire des algorithmes",
        acs: [
          {
            code: "AC12.01",
            label: "Analyser un problème avec méthode (découpage en éléments algorithmiques simples, structure de données…)",
          },
          {
            code: "AC12.02",
            label: "Comparer des algorithmes pour des problèmes classiques (tris simples, recherche…)",
          },
          {
            code: "AC12.03",
            label: "Formaliser et mettre en œuvre des outils mathématiques pour l'informatique",
          },
        ],
      },
      {
        title: "Sélectionner les algorithmes adéquats pour répondre à un problème donné",
        acs: [
          {
            code: "AC22.01",
            label: "Choisir des structures de données complexes adaptées au problème",
            status: "done",
            evidence:
              "Architecture NoSQL polyglotte : MongoDB (documents), Cassandra (historique), Redis (temps réel).",
          },
          {
            code: "AC22.02",
            label:
              "Utiliser des techniques algorithmiques adaptées pour des problèmes complexes (recherche opérationnelle, méthodes arborescentes, optimisation globale, intelligence artificielle…)",
          },
          {
            code: "AC22.03",
            label: "Comprendre les enjeux et moyens de sécurisation des données et du code",
            status: "done",
            evidence:
              "TP de cryptographie en Python : chiffrement/déchiffrement de Vigenère et cryptanalyse de Kasiski.",
          },
          {
            code: "AC22.04",
            label: "Évaluer l'impact environnemental et sociétal des solutions proposées",
            status: "todo",
            evidence: "À documenter",
          },
        ],
      },
      {
        title: "Analyser et optimiser des applications",
        acs: [
          {
            code: "AC32.01",
            label:
              "Anticiper les résultats de diverses métriques (temps d'exécution, occupation mémoire, montée en charge…)",
            status: "done",
            evidence: "Outil de monitoring de l'infrastructure d'XLPro4 Tableaux.",
          },
          {
            code: "AC32.02",
            label: "Profiler, analyser et justifier le comportement d'un code existant",
            status: "todo",
            evidence: "À documenter",
          },
          {
            code: "AC32.03",
            label:
              "Choisir et utiliser des bibliothèques et méthodes dédiées au domaine d'application (imagerie, immersion, IA, jeux vidéo, parallélisme, calcul formel…)",
            status: "done",
            evidence:
              "Jeu de plateau Latice : moteur en Java, interface JavaFX (équipe de 5, architecture en packages et contrôleurs dédiés).",
          },
        ],
      },
    ],
  },
  {
    id: "administrer",
    title: "Administrer",
    level: "Niveau 2",
    color: "#B8962E",
    description:
      "Installer, configurer, mettre à disposition, maintenir en conditions opérationnelles des infrastructures, des services et des réseaux et optimiser le système informatique d'une organisation.",
    essentials: [
      "en sécurisant le système d'information",
      "en appliquant les normes en vigueur et les bonnes pratiques architecturales et de sécurité",
      "en offrant une qualité de service optimale",
      "en assurant la continuité d'activité",
    ],
    situations: [
      "Déployer une nouvelle architecture technique",
      "Améliorer une infrastructure existante",
      "Sécuriser les applications et les services",
    ],
    levels: [
      {
        title: "Installer et configurer un poste de travail",
        acs: [
          { code: "AC13.01", label: "Identifier les différents composants (matériels et logiciels) d'un système numérique" },
          { code: "AC13.02", label: "Utiliser les fonctionnalités de base d'un système multitâches / multiutilisateurs" },
          { code: "AC13.03", label: "Installer et configurer un système d'exploitation et des outils de développement" },
          {
            code: "AC13.04",
            label: "Configurer un poste de travail dans un réseau d'entreprise",
            status: "done",
            evidence: "Plusieurs projets réseau en IPv4 et IPv6 (adressage, configuration).",
          },
        ],
      },
      {
        title: "Déployer des services dans une architecture réseau",
        acs: [
          {
            code: "AC23.01",
            label: "Concevoir et développer des applications communicantes",
            status: "done",
            evidence: "API REST NestJS consommée par un client Flutter ; API back-office et front-office en alternance.",
          },
          {
            code: "AC23.02",
            label: "Utiliser des serveurs et des services réseaux virtualisés",
            status: "done",
            evidence: "Conteneurs Docker, services managés Azure décrits en Terraform.",
          },
          {
            code: "AC23.03",
            label: "Sécuriser les services et données d'un système",
            status: "done",
            evidence: "Pipelines Azure DevOps authentifiés par identité managée, sans secret stocké.",
          },
        ],
      },
    ],
  },
  {
    id: "gerer",
    title: "Gérer",
    level: "Niveau 2",
    color: "#4E8A55",
    description:
      "Concevoir, gérer, administrer et exploiter les données de l'entreprise et mettre à disposition toutes les informations pour un bon pilotage de l'entreprise.",
    essentials: [
      "en respectant les réglementations sur le respect de la vie privée et la protection des données personnelles",
      "en respectant les enjeux économiques, sociétaux et écologiques de l'utilisation du stockage de données, ainsi que les différentes infrastructures (data centers, cloud, etc.)",
      "en s'appuyant sur des bases mathématiques",
      "en assurant la cohérence et la qualité",
    ],
    situations: [
      "Lancer un nouveau projet",
      "Sécuriser des données",
      "Exploiter des données pour la prise de décisions",
    ],
    levels: [
      {
        title: "Concevoir et mettre en place une base de données à partir d'un cahier des charges client",
        acs: [
          {
            code: "AC14.01",
            label: "Mettre à jour et interroger une base de données relationnelle (en requêtes directes ou à travers une application)",
            status: "done",
            evidence: "Requêtes et mises à jour sur bases relationnelles (PostgreSQL, SQL Server) dans plusieurs projets.",
          },
          {
            code: "AC14.02",
            label: "Visualiser des données",
            status: "done",
            evidence: "Visualisation des données de supervision via un tableau de bord Flutter (XLPro4).",
          },
          {
            code: "AC14.03",
            label: "Concevoir une base de données relationnelle à partir d'un cahier des charges",
            status: "done",
            evidence: "Conception de bases de données relationnelles pour plusieurs projets (bibliothèque universitaire, modes opératoires Legrand).",
          },
        ],
      },
      {
        title: "Optimiser une base de données, interagir avec une application et mettre en œuvre la sécurité",
        acs: [
          {
            code: "AC24.01",
            label: "Optimiser les modèles de données de l'entreprise",
            status: "done",
            evidence: "Modèle entité-association détaillé, puis traduction en modèle NoSQL (projet R5.10).",
          },
          {
            code: "AC24.02",
            label: "Assurer la sécurité des données (intégrité et confidentialité)",
            status: "done",
            evidence:
              "Principes de chiffrement et de cryptographie (TP Vigenère/Kasiski en Python) appliqués à la protection des données.",
          },
          {
            code: "AC24.03",
            label: "Organiser la restitution de données à travers la programmation et la visualisation",
            status: "done",
            evidence: "Tableau de bord Flutter des données de supervision stockées dans PostgreSQL.",
          },
          {
            code: "AC24.04",
            label: "Manipuler des données hétérogènes",
            status: "done",
            evidence: "MongoDB, Cassandra et Redis dans une même architecture.",
          },
        ],
      },
    ],
  },
  {
    id: "conduire",
    title: "Conduire",
    level: "Niveau 2",
    color: "#3E6FA8",
    description:
      "Satisfaire les besoins des utilisateurs au regard de la chaîne de valeur du client, organiser et piloter un projet informatique avec des méthodes classiques ou agiles.",
    essentials: [
      "en adoptant une démarche proactive, créative et critique",
      "en respectant les règles juridiques et les normes en vigueur",
      "en communiquant efficacement avec les différents acteurs d'un projet",
      "en sensibilisant à une gestion éthique, responsable, durable et interculturelle",
    ],
    situations: [
      "Lancer un nouveau projet",
      "Piloter le maintien d'un projet en condition opérationnelle",
      "Faire évoluer un système d'information",
    ],
    levels: [
      {
        title: "Identifier les besoins métiers des clients et des utilisateurs",
        acs: [
          {
            code: "AC15.01",
            label: "Appréhender les besoins du client et de l'utilisateur",
            status: "done",
            evidence: "Échanges avec les équipes Legrand pour comprendre leurs besoins sur le projet de modes opératoires.",
          },
          {
            code: "AC15.02",
            label: "Mettre en place les outils de gestion de projet",
            status: "done",
            evidence: "Azure DevOps pour la gestion de projet (backlog, pipelines) sur les projets Legrand et IUT.",
          },
          {
            code: "AC15.03",
            label: "Identifier les acteurs et les différentes phases d'un cycle de développement",
            status: "done",
            evidence: "Cycle de développement complet vécu à travers plusieurs SAÉ, du recueil du besoin au déploiement.",
          },
        ],
      },
      {
        title: "Appliquer une démarche de suivi de projet en fonction des besoins métiers des clients et des utilisateurs",
        acs: [
          {
            code: "AC25.01",
            label: "Identifier les processus présents dans une organisation en vue d'améliorer les systèmes d'information",
            status: "done",
            evidence: "Modes opératoires des ateliers de production Legrand, numérisés dans une application web.",
          },
          {
            code: "AC25.02",
            label: "Formaliser les besoins du client et de l'utilisateur",
            status: "done",
            evidence: "Recueil du besoin auprès de Legrand pour l'outil de monitoring, mené seule.",
          },
          {
            code: "AC25.03",
            label: "Identifier les critères de faisabilité d'un projet informatique",
            status: "done",
            evidence:
              "Cahier des charges d'une application de gestion de bibliothèque universitaire (équipe de 3) : contraintes, risques, priorisation MoSCoW et estimation budgétaire.",
          },
          {
            code: "AC25.04",
            label: "Définir et mettre en œuvre une démarche de suivi de projet",
            status: "done",
            evidence: "Sprints Scrum sur le projet de modes opératoires, en équipe de cinq.",
          },
        ],
      },
    ],
  },
  {
    id: "collaborer",
    title: "Collaborer",
    level: "Niveau 3",
    color: "#7A559E",
    description:
      "Acquérir, développer et exploiter les aptitudes nécessaires pour travailler efficacement dans une équipe informatique.",
    essentials: [
      "en inscrivant sa démarche au sein d'une équipe pluridisciplinaire",
      "en accompagnant la mise en œuvre des évolutions informatiques",
      "en veillant au respect des contraintes juridiques",
      "en développant une communication efficace et collaborative",
    ],
    situations: [
      "Lancer un nouveau projet",
      "Organiser son travail en relation avec celui de son équipe",
      "Élaborer, gérer et transmettre de l'information",
    ],
    levels: [
      {
        title: "Identifier ses aptitudes pour travailler dans une équipe",
        acs: [
          { code: "AC16.01", label: "Appréhender l'écosystème numérique" },
          { code: "AC16.02", label: "Découvrir les aptitudes requises selon les différents secteurs informatiques" },
          {
            code: "AC16.03",
            label: "Identifier les statuts, les fonctions et les rôles de chaque membre d'une équipe pluridisciplinaire",
          },
          { code: "AC16.04", label: "Acquérir les compétences interpersonnelles pour travailler en équipe" },
        ],
      },
      {
        title: "Situer son rôle et ses missions au sein d'une équipe informatique",
        acs: [
          {
            code: "AC26.01",
            label: "Comprendre la diversité, la structure et la dimension de l'informatique dans une organisation (ESN, DSI…)",
          },
          {
            code: "AC26.02",
            label: "Appliquer une démarche pour intégrer une équipe informatique au sein d'une organisation",
            status: "done",
            evidence: "Intégration dans une équipe de développement Legrand, en stage puis en alternance.",
          },
          {
            code: "AC26.03",
            label: "Mobiliser les compétences interpersonnelles pour travailler dans une équipe informatique",
            status: "done",
            evidence: "Projet à cinq pour Legrand ; un an en équipe chez Lidl.",
          },
          { code: "AC26.04", label: "Rendre compte de son activité professionnelle" },
        ],
      },
      {
        title: "Manager une équipe informatique",
        acs: [
          {
            code: "AC36.01",
            label: "Organiser et partager une veille technologique et informationnelle",
            status: "todo",
            evidence: "À documenter",
          },
          {
            code: "AC36.02",
            label: "Identifier les enjeux de l'économie de l'innovation numérique",
            status: "todo",
            evidence: "À documenter",
          },
          {
            code: "AC36.03",
            label: "Guider la conduite du changement informatique au sein d'une organisation",
            status: "todo",
            evidence: "À documenter",
          },
          {
            code: "AC36.04",
            label: "Accompagner le management de projet informatique",
            status: "done",
            evidence: "Vice-présidente du BDE : coordination d'un bureau et organisation d'événements.",
          },
        ],
      },
    ],
  },
];

export default referentiel;
