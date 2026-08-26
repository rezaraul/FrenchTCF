// Listening exercises. `script` is read aloud with the browser's French text-to-speech voice.
// `speakers` (optional) lets the player alternate voices for dialogues (array of {text} spoken in order).
const LISTENING_DATA = [
  {
    id: "l1",
    level: "A2",
    title: "Une annonce à la gare",
    script: "Attention, mesdames et messieurs. Le train à destination de Lyon, prévu à quatorze heures dix, partira exceptionnellement voie douze au lieu de la voie sept. Nous vous prions de nous excuser pour la gêne occasionnée.",
    questions: [
      { q: "Quelle est la destination du train ?", options: ["Paris", "Lyon", "Marseille", "Bordeaux"], answerIndex: 1 },
      { q: "Qu'est-ce qui a changé ?", options: ["L'heure de départ", "La voie de départ", "Le prix du billet", "Le nombre de wagons"], answerIndex: 1 },
      { q: "De quelle voie le train partira-t-il ?", options: ["Voie 7", "Voie 10", "Voie 12", "Voie 14"], answerIndex: 2 },
    ],
  },
  {
    id: "l2",
    level: "A2",
    title: "Un appel pour un rendez-vous",
    script: "Bonjour, c'est le cabinet du docteur Lambert. Je vous appelle pour confirmer votre rendez-vous de vendredi matin à neuf heures trente. Si vous ne pouvez pas venir, merci de nous prévenir au moins vingt-quatre heures à l'avance. Bonne journée.",
    questions: [
      { q: "Qui appelle ?", options: ["Une pharmacie", "Le cabinet du docteur Lambert", "Une banque", "Un ami"], answerIndex: 1 },
      { q: "Quand est le rendez-vous ?", options: ["Lundi après-midi", "Vendredi matin à 9h30", "Samedi soir", "Jeudi à 24h"], answerIndex: 1 },
      { q: "Que faut-il faire en cas d'empêchement ?", options: ["Rien", "Prévenir 24h à l'avance", "Venir quand même", "Rappeler le lendemain"], answerIndex: 1 },
    ],
  },
  {
    id: "l3",
    level: "B1",
    title: "Dialogue : réserver une table",
    speakers: [
      { text: "Bonsoir, restaurant Le Petit Jardin, je vous écoute." },
      { text: "Bonsoir, je voudrais réserver une table pour quatre personnes, samedi soir vers vingt heures." },
      { text: "Très bien, samedi vingt heures pour quatre. C'est à quel nom ?" },
      { text: "Au nom de Rousseau. Est-ce qu'il serait possible d'avoir une table en terrasse ?" },
      { text: "Oui, tout à fait, je vous note une table en terrasse. À samedi, monsieur Rousseau." },
    ],
    script: "Bonsoir, restaurant Le Petit Jardin, je vous écoute. Bonsoir, je voudrais réserver une table pour quatre personnes, samedi soir vers vingt heures. Très bien, samedi vingt heures pour quatre. C'est à quel nom ? Au nom de Rousseau. Est-ce qu'il serait possible d'avoir une table en terrasse ? Oui, tout à fait, je vous note une table en terrasse. À samedi, monsieur Rousseau.",
    questions: [
      { q: "Pour combien de personnes est la réservation ?", options: ["Deux", "Trois", "Quatre", "Six"], answerIndex: 2 },
      { q: "Quel jour et à quelle heure ?", options: ["Vendredi à 20h", "Samedi à 20h", "Samedi à 8h du matin", "Dimanche à 20h"], answerIndex: 1 },
      { q: "Que demande le client en plus ?", options: ["Une réduction", "Une table en terrasse", "Un menu enfant", "Un parking"], answerIndex: 1 },
    ],
  },
  {
    id: "l4",
    level: "B1",
    title: "Un flash météo",
    script: "Et voici la météo pour ce week-end. Samedi, le temps sera nuageux sur la moitié nord du pays, avec quelques averses en fin de journée. Les températures resteront fraîches pour la saison, autour de quinze degrés. Dimanche, en revanche, le soleil fera son retour presque partout, avec des températures en hausse, jusqu'à vingt et un degrés dans le sud. Un temps idéal pour profiter des activités en plein air.",
    questions: [
      { q: "Quel temps est prévu samedi dans le nord ?", options: ["Ensoleillé", "Nuageux avec des averses", "Neige", "Orageux toute la journée"], answerIndex: 1 },
      { q: "Quelle température est annoncée samedi ?", options: ["Autour de 15 degrés", "Autour de 30 degrés", "Autour de 0 degré", "Autour de 21 degrés"], answerIndex: 0 },
      { q: "Comment sera le temps dimanche ?", options: ["Pluvieux", "Ensoleillé avec des températures en hausse", "Identique à samedi", "Neigeux"], answerIndex: 1 },
    ],
  },
  {
    id: "l5",
    level: "B2",
    title: "Chronique radio : le télétravail",
    script: "Bonjour à tous et bienvenue dans cette chronique consacrée au monde du travail. Aujourd'hui, on s'intéresse au télétravail, qui continue de faire débat trois ans après la pandémie. Selon une étude récente, près de quarante pour cent des salariés français ayant un poste télétravaillable pratiquent aujourd'hui un ou deux jours de travail à distance par semaine. Les avantages avancés sont connus : gain de temps de transport, meilleure concentration, plus grande autonomie. Mais les critiques persistent également, notamment de la part de certains dirigeants qui estiment que cela affaiblit la culture d'entreprise et complique la formation des nouveaux employés. Résultat : de plus en plus d'entreprises imposent désormais un nombre minimum de jours de présence au bureau, ce qui ne fait pas toujours l'unanimité parmi les salariés.",
    questions: [
      { q: "Quel pourcentage de salariés télétravaillent un ou deux jours par semaine, selon l'étude citée ?", options: ["Environ 10 %", "Environ 40 %", "Environ 75 %", "100 %"], answerIndex: 1 },
      { q: "Quel avantage du télétravail n'est PAS mentionné ?", options: ["Gain de temps de transport", "Meilleure concentration", "Salaire plus élevé", "Plus grande autonomie"], answerIndex: 2 },
      { q: "Quelle critique est formulée par certains dirigeants ?", options: ["Cela coûte trop cher en électricité", "Cela affaiblit la culture d'entreprise", "Cela réduit les impôts", "Cela améliore trop la productivité"], answerIndex: 1 },
      { q: "Que font de plus en plus d'entreprises selon la chronique ?", options: ["Elles interdisent totalement le télétravail", "Elles imposent un minimum de jours au bureau", "Elles ferment leurs bureaux", "Elles augmentent les salaires"], answerIndex: 1 },
    ],
  },
  {
    id: "l6",
    level: "B2",
    title: "Interview : consommation responsable",
    speakers: [
      { text: "Aujourd'hui, nous recevons une spécialiste de la consommation responsable. Bonjour, merci d'être avec nous." },
      { text: "Bonjour, merci de votre invitation." },
      { text: "On entend beaucoup parler de consommation responsable ces dernières années. Concrètement, de quoi s'agit-il ?" },
      { text: "Il s'agit de consommer en tenant compte de l'impact environnemental et social de nos achats : privilégier les produits locaux, réduire le gaspillage, ou encore acheter moins mais de meilleure qualité." },
      { text: "Est-ce que ce changement de comportement est vraiment généralisé, ou reste-t-il réservé à une minorité ?" },
      { text: "C'est une tendance de fond qui touche de plus en plus de foyers, même si le prix reste souvent un frein important pour beaucoup de consommateurs." },
    ],
    script: "Aujourd'hui, nous recevons une spécialiste de la consommation responsable. Bonjour, merci d'être avec nous. Bonjour, merci de votre invitation. On entend beaucoup parler de consommation responsable ces dernières années. Concrètement, de quoi s'agit-il ? Il s'agit de consommer en tenant compte de l'impact environnemental et social de nos achats : privilégier les produits locaux, réduire le gaspillage, ou encore acheter moins mais de meilleure qualité. Est-ce que ce changement de comportement est vraiment généralisé, ou reste-t-il réservé à une minorité ? C'est une tendance de fond qui touche de plus en plus de foyers, même si le prix reste souvent un frein important pour beaucoup de consommateurs.",
    questions: [
      { q: "Que signifie « consommation responsable » selon l'invitée ?", options: ["Acheter le moins cher possible", "Tenir compte de l'impact environnemental et social des achats", "Ne plus rien acheter", "Acheter uniquement en ligne"], answerIndex: 1 },
      { q: "Quel exemple concret est donné ?", options: ["Voyager davantage", "Privilégier les produits locaux", "Changer de téléphone chaque année", "Acheter en grande quantité"], answerIndex: 1 },
      { q: "Quel frein principal est mentionné à la fin ?", options: ["Le manque de temps", "Le prix", "Le manque de magasins", "La météo"], answerIndex: 1 },
    ],
  },
];

if (typeof module !== "undefined") { module.exports = LISTENING_DATA; }
