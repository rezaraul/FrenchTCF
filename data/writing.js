// Writing practice, modelled on the real TCF "Expression écrite" tasks.
const WRITING_DATA = [
  {
    id: "w-task1",
    task: "Tâche 1",
    title: "Rédiger un message pratique",
    instructions: "Décrivez, racontez ou expliquez une situation dans un message simple et clair (invitation, demande, information...).",
    wordRange: "60–120 mots",
    timeSuggested: "10 minutes",
    prompts: [
      "Vous organisez une fête pour l'anniversaire d'un ami commun. Écrivez un message à vos amis pour les inviter : donnez la date, le lieu, l'heure et ce qu'ils doivent apporter.",
      "Vous avez un problème avec le chauffage de votre appartement. Écrivez un message à votre propriétaire pour décrire le problème et demander une intervention rapide.",
      "Un ami francophone vous demande des conseils pour visiter votre ville. Écrivez-lui un message avec trois recommandations et vos raisons.",
    ],
    checklist: [
      "J'ai respecté le nombre de mots demandé (60–120).",
      "Le message a une formule d'ouverture et de clôture adaptées.",
      "Les informations essentielles (qui, quoi, quand, où) sont claires.",
      "J'ai utilisé des connecteurs simples (et, mais, donc, d'abord, ensuite).",
      "J'ai vérifié les accords et la conjugaison."
    ],
    model: "Salut Karim,\n\nJ'organise une petite fête pour l'anniversaire de Léa samedi prochain, le 12, chez moi à partir de 19h. On va faire un dîner surprise avant qu'elle n'arrive vers 20h30 ! Est-ce que tu pourrais apporter un dessert ? Manon s'occupe des boissons et moi je fais un plat principal.\n\nPréviens-moi si tu peux venir, et surtout ne dis rien à Léa !\n\nÀ bientôt,\nSarah",
  },
  {
    id: "w-task2",
    task: "Tâche 2",
    title: "Raconter une expérience et donner son avis",
    instructions: "Racontez un événement personnel et exprimez vos sentiments, impressions ou opinions à ce sujet.",
    wordRange: "120–150 mots",
    timeSuggested: "15 minutes",
    prompts: [
      "Racontez un voyage qui vous a particulièrement marqué. Expliquez pourquoi cette expérience a été importante pour vous.",
      "Décrivez un changement récent dans votre vie (déménagement, nouveau travail, nouvelle habitude) et expliquez comment vous l'avez vécu.",
      "Racontez une expérience où vous avez dû apprendre quelque chose de nouveau rapidement. Qu'avez-vous ressenti ?",
    ],
    checklist: [
      "J'ai respecté le nombre de mots demandé (120–150).",
      "Le récit suit un ordre chronologique clair.",
      "J'ai varié les temps du passé (passé composé, imparfait).",
      "J'ai exprimé clairement mon opinion ou mon ressenti (je trouve que, ce qui m'a plu, ce qui m'a surpris...).",
      "Le texte est organisé en paragraphes (introduction, développement, conclusion)."
    ],
    model: "L'année dernière, j'ai eu l'occasion de passer trois semaines au Portugal, un pays que je ne connaissais pas du tout. Au début, je craignais de ne pas comprendre la langue, mais les habitants ont été incroyablement accueillants.\n\nCe qui m'a le plus marqué, c'est la ville de Porto, avec ses ruelles colorées et sa vue sur le fleuve. J'ai aussi beaucoup aimé goûter la cuisine locale, en particulier les pâtisseries.\n\nCe voyage m'a appris à sortir de ma zone de confort et à voyager davantage seul(e). Depuis, je cherche toujours à découvrir des endroits que je ne connais pas, plutôt que de retourner toujours aux mêmes destinations.",
  },
  {
    id: "w-task3",
    task: "Tâche 3",
    title: "Comparer des points de vue et argumenter",
    instructions: "Présentez un sujet, comparez différents points de vue, puis exprimez et justifiez votre propre opinion.",
    wordRange: "120–180 mots",
    timeSuggested: "20 minutes",
    prompts: [
      "Certains pensent que le télétravail devrait devenir la norme, d'autres préfèrent le travail au bureau. Présentez les deux points de vue et donnez le vôtre.",
      "Pour certains, les réseaux sociaux rapprochent les gens ; pour d'autres, ils les isolent. Qu'en pensez-vous ?",
      "Faut-il interdire les voitures individuelles dans les grandes villes pour réduire la pollution ? Présentez les arguments pour et contre, puis donnez votre avis.",
    ],
    checklist: [
      "J'ai respecté le nombre de mots demandé (120–180).",
      "J'ai présenté au moins deux points de vue différents (d'un côté... de l'autre...).",
      "J'ai utilisé des connecteurs logiques variés (cependant, néanmoins, par ailleurs, en revanche).",
      "Mon opinion personnelle est clairement énoncée et justifiée.",
      "La structure comporte une introduction, un développement argumenté et une conclusion."
    ],
    model: "Le télétravail suscite aujourd'hui un débat important. D'un côté, ses partisans soulignent qu'il permet de gagner du temps de transport, de mieux concilier vie professionnelle et vie privée, et d'améliorer la concentration. De l'autre, certains estiment qu'il affaiblit les liens entre collègues et complique la formation des nouveaux employés.\n\nÀ mon avis, un modèle hybride, combinant quelques jours au bureau et quelques jours à distance, représente le meilleur compromis. En effet, il permet de profiter des avantages du télétravail tout en conservant les échanges directs, essentiels à la cohésion d'équipe et à l'innovation.\n\nEn conclusion, il ne me semble pas souhaitable d'imposer un modèle unique : chaque entreprise devrait pouvoir adapter son organisation selon ses besoins et ceux de ses employés.",
  },
];

if (typeof module !== "undefined") { module.exports = WRITING_DATA; }
