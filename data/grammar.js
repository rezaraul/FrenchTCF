// Grammar topics for TCF B2 prep.
// Each topic: id, title, level, explanation (array of paragraph strings, may include French examples),
// points (array of bullet strings), quiz (array of {q, options[4], answerIndex, explanation})
const GRAMMAR_DATA = [
  {
    id: "temps-du-passe",
    title: "Les temps du passé : passé composé, imparfait, plus-que-parfait",
    level: "B1",
    points: [
      "Le passé composé raconte un événement précis, achevé : « Hier, je suis allé au marché. »",
      "L'imparfait décrit une situation, une habitude ou un décor dans le passé : « Quand j'étais enfant, j'habitais à la campagne. »",
      "Le plus-que-parfait exprime une action antérieure à une autre action passée : « Quand je suis arrivé, elle était déjà partie. »",
      "On combine souvent les trois : le plus-que-parfait pour le fond, l'imparfait pour le décor, le passé composé pour l'événement qui fait avancer le récit."
    ],
    quiz: [
      { q: "Quand j'étais petit, je ___ souvent chez mes grands-parents.", options: ["suis allé", "allais", "étais allé", "irai"], answerIndex: 1, explanation: "Habitude répétée dans le passé → imparfait." },
      { q: "Hier soir, nous ___ au restaurant avec des amis.", options: ["dînions", "avons dîné", "avions dîné", "dînerons"], answerIndex: 1, explanation: "Événement unique et achevé → passé composé." },
      { q: "Quand elle est arrivée à la gare, le train ___ déjà.", options: ["partait", "est parti", "était parti", "part"], answerIndex: 2, explanation: "Action antérieure à une autre action passée → plus-que-parfait." },
      { q: "Il faisait beau et les oiseaux ___ quand je suis sorti.", options: ["ont chanté", "chantaient", "avaient chanté", "chanteront"], answerIndex: 1, explanation: "Description du décor → imparfait." },
    ],
  },
  {
    id: "subjonctif",
    title: "Le subjonctif présent",
    level: "B2",
    points: [
      "Le subjonctif s'emploie après des verbes/expressions de volonté, doute, sentiment ou nécessité : « il faut que, je veux que, je doute que, je suis content que ».",
      "Formation régulière : radical de la 3e personne du pluriel du présent + terminaisons -e, -es, -e, -ions, -iez, -ent. Ex. : ils finissent → que je finisse.",
      "Verbes irréguliers fréquents : être (que je sois), avoir (que j'aie), faire (que je fasse), aller (que j'aille), pouvoir (que je puisse), savoir (que je sache), vouloir (que je veuille).",
      "Après une certitude (je pense que, il est certain que) on utilise l'indicatif, pas le subjonctif — sauf à la forme négative ou interrogative où le doute apparaît."
    ],
    quiz: [
      { q: "Il faut que tu ___ à l'heure demain.", options: ["es", "sois", "seras", "étais"], answerIndex: 1, explanation: "« il faut que » impose le subjonctif : que tu sois." },
      { q: "Je doute qu'il ___ raison cette fois.", options: ["a", "ait", "aura", "avait"], answerIndex: 1, explanation: "Verbe de doute → subjonctif : qu'il ait raison." },
      { q: "Je pense qu'elle ___ tout à fait raison.", options: ["a", "ait", "aie", "avait eu"], answerIndex: 0, explanation: "« je pense que » exprime une certitude → indicatif : elle a raison." },
      { q: "Nous sommes ravis que vous ___ pu venir.", options: ["avez", "ayez", "aviez", "auriez"], answerIndex: 1, explanation: "Sentiment (ravis que) → subjonctif : que vous ayez pu." },
      { q: "Il est important que nous ___ ce problème rapidement.", options: ["réglons", "réglions", "réglerons", "réglions pas"], answerIndex: 1, explanation: "« il est important que » → subjonctif : que nous réglions." },
    ],
  },
  {
    id: "conditionnel-hypotheses",
    title: "Le conditionnel et les phrases hypothétiques avec « si »",
    level: "B2",
    points: [
      "Si + présent → présent ou futur : « Si tu étudies, tu réussis / réussiras. » (réalité, hypothèse probable)",
      "Si + imparfait → conditionnel présent : « Si j'avais plus de temps, je voyagerais davantage. » (hypothèse irréelle ou peu probable au présent)",
      "Si + plus-que-parfait → conditionnel passé : « Si j'avais su, je ne serais pas venu. » (hypothèse irréelle dans le passé, regret)",
      "Le conditionnel sert aussi à exprimer la politesse (je voudrais...), une information non confirmée (le suspect serait...) et un conseil (tu devrais...)."
    ],
    quiz: [
      { q: "Si j'avais le temps, je ___ ce roman.", options: ["lirai", "lirais", "lis", "aurais lu"], answerIndex: 1, explanation: "Si + imparfait → conditionnel présent." },
      { q: "Si tu m'avais prévenu, je ___ t'aider.", options: ["viendrais", "serais venu", "venais", "viens"], answerIndex: 1, explanation: "Si + plus-que-parfait → conditionnel passé." },
      { q: "S'il fait beau demain, nous ___ à la plage.", options: ["irions", "allions", "irons", "serions allés"], answerIndex: 2, explanation: "Si + présent → futur simple." },
      { q: "___ -vous m'indiquer où se trouve la gare, s'il vous plaît ?", options: ["Pouvez", "Pourriez", "Pouviez", "Pourrez"], answerIndex: 1, explanation: "Le conditionnel de politesse : Pourriez-vous...?" },
    ],
  },
  {
    id: "pronoms-relatifs",
    title: "Les pronoms relatifs simples et composés",
    level: "B2",
    points: [
      "Qui = sujet ; Que = complément d'objet direct ; Où = lieu ou temps ; Dont = remplace « de + nom » (parler de, avoir besoin de, être content de...).",
      "Pronoms relatifs composés (avec préposition) : lequel, laquelle, lesquels, lesquelles — et leurs formes contractées auquel, duquel, etc.",
      "Ex. : « Le projet auquel je pense demande beaucoup de travail. » / « La personne avec laquelle je travaille est très compétente. »",
      "Ce qui / ce que / ce dont s'utilisent quand il n'y a pas d'antécédent précis : « Je ne sais pas ce qui s'est passé. »"
    ],
    quiz: [
      { q: "C'est un sujet ___ je m'intéresse beaucoup.", options: ["que", "qui", "auquel", "dont"], answerIndex: 2, explanation: "s'intéresser à qch → auquel." },
      { q: "Voici le livre ___ je t'ai parlé.", options: ["que", "dont", "où", "qui"], answerIndex: 1, explanation: "parler de qch → dont." },
      { q: "L'entreprise ___ il travaille est en pleine expansion.", options: ["que", "dont", "où", "qui"], answerIndex: 2, explanation: "Lieu → où (travailler dans une entreprise = y travailler)." },
      { q: "Je ne comprends pas ___ tu veux dire.", options: ["ce qui", "ce que", "ce dont", "lequel"], answerIndex: 1, explanation: "« vouloir dire quelque chose » (COD) sans antécédent → ce que." },
    ],
  },
  {
    id: "voix-passive",
    title: "La voix passive",
    level: "B2",
    points: [
      "Formation : être (au temps voulu) + participe passé (accordé avec le sujet) + par/de + agent. Ex. : « La lettre a été envoyée par le directeur. »",
      "On utilise « de » plutôt que « par » avec les verbes de sentiment ou d'état : « Il est aimé de tous. »",
      "La voix passive met l'accent sur l'action ou sur celui qui la subit plutôt que sur celui qui la fait ; très fréquente dans les textes de presse et les rapports.",
      "On ne peut passiver que les verbes transitifs directs (avec COD)."
    ],
    quiz: [
      { q: "Le nouveau pont ___ par la mairie l'an dernier.", options: ["a inauguré", "a été inauguré", "inaugurait", "sera inauguré"], answerIndex: 1, explanation: "Passé composé passif : a été inauguré." },
      { q: "Ce roman ___ dans plus de trente langues.", options: ["traduit", "est traduit", "traduira", "a traduit"], answerIndex: 1, explanation: "Présent passif : est traduit." },
      { q: "Elle ___ de tous ses collègues.", options: ["est respectée", "est respectée de", "est respectée par", "respecte"], answerIndex: 2, explanation: "Verbe de sentiment → « de » : elle est respectée de tous." },
    ],
  },
  {
    id: "gerondif-participe",
    title: "Le gérondif et le participe présent",
    level: "B2",
    points: [
      "Gérondif = en + participe présent (radical de « nous » au présent + -ant). Il exprime la simultanéité, la manière ou la condition : « Il travaille en écoutant de la musique. »",
      "Le gérondif a toujours le même sujet que le verbe principal.",
      "Le participe présent (sans « en ») peut avoir un sujet différent et fonctionne souvent comme une proposition relative : « Les personnes souhaitant participer doivent s'inscrire. » = qui souhaitent participer.",
      "Ne pas confondre avec l'adjectif verbal, qui s'accorde : « une histoire fascinante »."
    ],
    quiz: [
      { q: "Elle a réussi son examen ___ beaucoup.", options: ["travaillant", "en travaillant", "travaille", "en travaille"], answerIndex: 1, explanation: "Manière/moyen, même sujet → gérondif : en travaillant." },
      { q: "Les candidats ___ un visa doivent fournir un justificatif de domicile.", options: ["demandant", "en demandant", "demandé", "qui demande"], answerIndex: 0, explanation: "Équivaut à une relative (qui demandent) → participe présent sans « en »." },
      { q: "___ la porte, il a entendu du bruit.", options: ["Ouvrant", "En ouvrant", "Ayant ouvert", "Ouvert"], answerIndex: 1, explanation: "Simultanéité, même sujet → gérondif." },
    ],
  },
  {
    id: "accord-participe-passe",
    title: "L'accord du participe passé",
    level: "B2",
    points: [
      "Avec « avoir » : le participe passé s'accorde avec le COD seulement si celui-ci est placé avant le verbe. « Les fleurs que j'ai achetées. »",
      "Avec « être » (verbes non pronominaux) : accord avec le sujet. « Elles sont parties tôt. »",
      "Verbes pronominaux : accord avec le sujet sauf si un COD suit le verbe. « Ils se sont lavés » mais « Ils se sont lavé les mains » (les mains = COD après le verbe → pas d'accord).",
      "Aucun accord si le COD est placé après le verbe avec « avoir » : « J'ai acheté des fleurs. »"
    ],
    quiz: [
      { q: "Les photos qu'il a ___ sont magnifiques.", options: ["pris", "prise", "prises", "prit"], answerIndex: 2, explanation: "COD (que = les photos, f.pl.) placé avant → accord : prises." },
      { q: "Elle s'est ___ les cheveux ce matin.", options: ["lavé", "lavée", "lavés", "lavées"], answerIndex: 0, explanation: "COD (les cheveux) après le verbe → pas d'accord : lavé." },
      { q: "Nous nous sommes ___ hier soir.", options: ["téléphoné", "téléphonés", "téléphonées", "téléphonée"], answerIndex: 0, explanation: "« se téléphoner » = téléphoner à qqn (COI) → jamais d'accord." },
      { q: "Les erreurs ont été ___ rapidement.", options: ["corrigé", "corrigée", "corrigées", "corrigés"], answerIndex: 2, explanation: "Passif avec « être » → accord avec le sujet (les erreurs, f.pl.) : corrigées." },
    ],
  },
  {
    id: "connecteurs-logiques",
    title: "Les connecteurs logiques (cause, conséquence, opposition, concession, but)",
    level: "B2",
    points: [
      "Cause : car, parce que, puisque, étant donné que, comme (en tête de phrase).",
      "Conséquence : donc, par conséquent, c'est pourquoi, si bien que, de sorte que.",
      "Opposition : mais, alors que, tandis que, en revanche, par contre.",
      "Concession (idée de « malgré ») : bien que + subjonctif, quoique + subjonctif, malgré + nom, même si + indicatif.",
      "But : pour que / afin que + subjonctif (sujets différents), pour / afin de + infinitif (même sujet)."
    ],
    quiz: [
      { q: "___ il pleuve, la manifestation sportive aura lieu.", options: ["Malgré", "Bien que", "Car", "Donc"], answerIndex: 1, explanation: "Concession + subjonctif → Bien que." },
      { q: "Il a raté son train ; ___, il est arrivé en retard à la réunion.", options: ["parce que", "par conséquent", "bien que", "afin que"], answerIndex: 1, explanation: "Conséquence → par conséquent." },
      { q: "Elle travaille le week-end ___ payer ses études.", options: ["pour que", "afin de", "parce que", "quoique"], answerIndex: 1, explanation: "But, même sujet + infinitif → afin de." },
      { q: "___ le contexte économique difficile, l'entreprise a maintenu ses emplois.", options: ["Malgré", "Bien que", "Parce que", "Afin que"], answerIndex: 0, explanation: "Concession + nom → malgré." },
    ],
  },
  {
    id: "discours-rapporte",
    title: "Le discours rapporté au passé (concordance des temps)",
    level: "B2",
    points: [
      "Quand le verbe introducteur est au passé, les temps du discours direct changent : présent → imparfait ; passé composé → plus-que-parfait ; futur → conditionnel présent ; futur antérieur → conditionnel passé.",
      "« Je pars demain » → Il a dit qu'il partait le lendemain.",
      "Les repères temporels changent aussi : aujourd'hui → ce jour-là ; hier → la veille ; demain → le lendemain ; maintenant → à ce moment-là.",
      "Si le verbe introducteur est au présent, aucun changement de temps n'est nécessaire."
    ],
    quiz: [
      { q: "Elle a dit : « Je viendrai demain. » → Elle a dit qu'elle ___ le lendemain.", options: ["viendra", "viendrait", "venait", "était venue"], answerIndex: 1, explanation: "Futur → conditionnel présent : viendrait." },
      { q: "Il a expliqué : « J'ai fini mon travail. » → Il a expliqué qu'il ___ son travail.", options: ["a fini", "finissait", "avait fini", "aurait fini"], answerIndex: 2, explanation: "Passé composé → plus-que-parfait : avait fini." },
      { q: "« Je pars aujourd'hui » devient, rapporté au passé : Il a dit qu'il partait ___.", options: ["aujourd'hui", "ce jour-là", "la veille", "le lendemain"], answerIndex: 1, explanation: "aujourd'hui → ce jour-là." },
    ],
  },
  {
    id: "negation-avancee",
    title: "La négation avancée",
    level: "B2",
    points: [
      "Ne... que = seulement : « Il ne reste que deux places. »",
      "Ne... guère = presque pas : « Elle ne sort guère le soir. »",
      "Ne... aucun(e) = pas un(e) seul(e) : « Je n'ai aucune idée. »",
      "Ne... ni... ni = négation de deux éléments : « Il n'a ni frère ni sœur. »",
      "Ne... plus (fin d'une action), ne... jamais (fréquence nulle), ne... nulle part (lieu) complètent la panoplie de la négation."
    ],
    quiz: [
      { q: "Je ___ ce dossier terminé avant vendredi.", options: ["n'ai que", "n'aurai que", "n'ai guère", "n'ai aucun"], answerIndex: 1, explanation: "Restriction dans le futur → n'aurai que (seulement)." },
      { q: "Il ___ confiance en la nouvelle stratégie.", options: ["n'a que", "n'a guère", "n'a ni", "ne va guère"], answerIndex: 1, explanation: "« presque pas confiance » → n'a guère confiance." },
      { q: "Cette solution ___ satisfaisante ___ durable.", options: ["n'est... que", "n'est ni... ni", "ne... guère... ni", "n'est aucune... ni"], answerIndex: 1, explanation: "Négation de deux éléments → n'est ni... ni." },
    ],
  },
  {
    id: "comparaison",
    title: "Le comparatif et le superlatif",
    level: "B1",
    points: [
      "Comparatif : plus / aussi / moins + adjectif/adverbe + que. « Ce quartier est plus calme que le centre-ville. »",
      "Comparatif de « bon » = meilleur ; de « bien » = mieux (ne pas dire « plus bon »).",
      "Superlatif : le/la/les plus... / le/la/les moins... « C'est le train le plus rapide d'Europe. »",
      "Avec un nom : plus de / autant de / moins de + nom + que. « Il y a plus de circulation le vendredi. »"
    ],
    quiz: [
      { q: "Ce restaurant est ___ que celui d'à côté (qualité supérieure).", options: ["plus bon", "meilleur", "mieux", "aussi bon"], answerIndex: 1, explanation: "Comparatif irrégulier de bon → meilleur." },
      { q: "Elle chante ___ que sa sœur.", options: ["meilleur", "mieux", "plus bonne", "la meilleure"], answerIndex: 1, explanation: "Comparatif de l'adverbe bien → mieux." },
      { q: "C'est ___ solution la ___ économique.", options: ["la / plus", "le / plus", "la / moins", "les / plus"], answerIndex: 0, explanation: "Superlatif féminin : la solution la plus économique." },
    ],
  },
  {
    id: "futur-anterieur",
    title: "Le futur antérieur",
    level: "B2",
    points: [
      "Formation : avoir/être au futur simple + participe passé. « J'aurai fini avant midi. »",
      "Il exprime une action future qui sera terminée avant une autre action future : « Quand tu arriveras, j'aurai déjà préparé le dîner. »",
      "Fréquent après « quand, dès que, une fois que, aussitôt que » pour marquer l'antériorité au futur (contrairement à l'anglais qui utilise souvent le présent)."
    ],
    quiz: [
      { q: "Dès que nous ___ notre travail, nous partirons en vacances.", options: ["finirons", "aurons fini", "finissons", "avons fini"], answerIndex: 1, explanation: "Antériorité dans le futur après « dès que » → futur antérieur." },
      { q: "Appelle-moi quand tu ___ à la maison.", options: ["arriveras", "seras arrivé", "arrives", "es arrivé"], answerIndex: 1, explanation: "Action future antérieure à l'appel → futur antérieur : seras arrivé." },
    ],
  },
];

if (typeof module !== "undefined") { module.exports = GRAMMAR_DATA; }
