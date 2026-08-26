// Speaking practice, modelled on the real TCF "Expression orale" tasks.
const SPEAKING_DATA = [
  {
    id: "s-task1",
    task: "Tâche 1",
    title: "Entretien dirigé (se présenter)",
    instructions: "Répondez à des questions personnelles simples sur vous, votre vie, vos goûts. Pas de préparation : parlez spontanément pendant environ 2 minutes.",
    prepSeconds: 0,
    speakSeconds: 120,
    prompts: [
      "Présentez-vous : votre nom, votre âge, votre ville, votre travail ou vos études.",
      "Parlez de votre famille et de vos amis proches.",
      "Décrivez une journée typique de votre semaine.",
      "Quels sont vos loisirs préférés et pourquoi ?",
    ],
    checklist: [
      "J'ai parlé de façon fluide, sans trop de silences.",
      "J'ai utilisé des phrases complètes et variées (pas seulement des mots isolés).",
      "J'ai donné des détails et des exemples, pas seulement des réponses courtes.",
      "Ma prononciation était claire et compréhensible.",
    ],
  },
  {
    id: "s-task2",
    task: "Tâche 2",
    title: "Interaction : obtenir des informations",
    instructions: "Vous devez poser des questions à un interlocuteur imaginaire pour obtenir des informations sur un sujet donné (2 minutes de préparation, puis parlez).",
    prepSeconds: 120,
    speakSeconds: 90,
    prompts: [
      "Vous voulez vous inscrire à un cours de français dans une école de langue. Préparez les questions à poser à l'accueil (horaires, prix, niveau, matériel nécessaire).",
      "Vous cherchez un appartement à louer. Préparez les questions à poser à l'agence (loyer, charges, surface, disponibilité).",
      "Vous voulez organiser un voyage. Préparez les questions à poser à une agence de voyages (dates, budget, hébergement, activités).",
    ],
    checklist: [
      "J'ai formulé des questions grammaticalement correctes (inversion, est-ce que...).",
      "Mes questions couvrent les informations essentielles du sujet.",
      "J'ai enchaîné mes questions de façon logique et naturelle.",
      "J'ai utilisé des formules de politesse appropriées.",
    ],
  },
  {
    id: "s-task3",
    task: "Tâche 3",
    title: "Présenter et défendre un point de vue",
    instructions: "Donnez votre opinion sur un sujet et défendez-la avec des arguments (2 minutes de préparation, puis environ 3 minutes de présentation).",
    prepSeconds: 120,
    speakSeconds: 180,
    prompts: [
      "Pensez-vous que les réseaux sociaux ont un effet positif ou négatif sur la société ? Justifiez votre point de vue avec des arguments.",
      "Selon vous, faut-il privilégier le télétravail ou le travail au bureau ? Présentez votre position et vos arguments.",
      "Pensez-vous que les grandes villes devraient limiter la circulation des voitures ? Développez votre opinion avec des exemples.",
    ],
    checklist: [
      "J'ai clairement énoncé mon opinion dès le début.",
      "J'ai donné au moins deux arguments développés (pas seulement affirmés).",
      "J'ai utilisé des connecteurs logiques (d'abord, ensuite, par ailleurs, en conclusion).",
      "J'ai anticipé et évoqué un contre-argument avant de conclure.",
      "Ma conclusion résume clairement ma position.",
    ],
  },
];

if (typeof module !== "undefined") { module.exports = SPEAKING_DATA; }
