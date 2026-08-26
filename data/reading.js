// Reading comprehension passages, TCF-style multiple choice, graded A2 -> B2.
const READING_DATA = [
  {
    id: "r1",
    level: "A2",
    title: "Une annonce de colocation",
    text: "Cherche colocataire pour appartement de 3 pièces, proche du centre-ville. Chambre de 12 m², lumineuse, avec placard. Loyer : 420 € par mois, charges comprises (eau, électricité, internet). Immeuble calme, sans ascenseur (3e étage). Métro à 5 minutes à pied. Disponible à partir du 1er septembre. Non-fumeur souhaité. Contactez Camille au 06 12 34 56 78 après 18h.",
    questions: [
      { q: "Que cherche l'auteur de l'annonce ?", options: ["Un appartement à louer", "Un colocataire", "Un déménageur", "Une chambre d'hôtel"], answerIndex: 1 },
      { q: "Combien coûte le loyer par mois ?", options: ["12 €", "420 €", "600 €", "Charges non comprises"], answerIndex: 1 },
      { q: "L'immeuble a-t-il un ascenseur ?", options: ["Oui", "Non", "Ce n'est pas précisé", "Un seul"], answerIndex: 1 },
      { q: "Quand peut-on emménager ?", options: ["Immédiatement", "Le 1er septembre", "Après 18h", "Le 3e étage"], answerIndex: 1 },
    ],
  },
  {
    id: "r2",
    level: "A2",
    title: "Un message professionnel",
    text: "Bonjour Sophie, Je vous confirme notre rendez-vous de demain à 14h dans nos locaux. N'oubliez pas d'apporter les documents dont nous avons parlé au téléphone (contrat et pièce d'identité). Si vous avez un empêchement, merci de me prévenir au moins deux heures à l'avance. À demain, Marc",
    questions: [
      { q: "À quelle heure est le rendez-vous ?", options: ["Le matin", "À 14h", "Dans deux heures", "Ce n'est pas indiqué"], answerIndex: 1 },
      { q: "Que doit apporter Sophie ?", options: ["Un ordinateur", "Le contrat et une pièce d'identité", "De l'argent", "Rien de spécial"], answerIndex: 1 },
      { q: "Que doit faire Sophie en cas d'empêchement ?", options: ["Ne rien faire", "Prévenir Marc à l'avance", "Annuler par écrit", "Envoyer un document"], answerIndex: 1 },
    ],
  },
  {
    id: "r3",
    level: "B1",
    title: "Le télétravail en France",
    text: "Depuis quelques années, le télétravail s'est largement développé en France. De plus en plus d'entreprises proposent à leurs salariés de travailler depuis leur domicile un ou plusieurs jours par semaine. Cette organisation présente plusieurs avantages : moins de temps passé dans les transports, plus de flexibilité dans l'emploi du temps, et souvent une meilleure concentration. Cependant, certains salariés se plaignent d'un sentiment d'isolement et de la difficulté à séparer vie professionnelle et vie personnelle. Les entreprises doivent donc trouver un équilibre entre les besoins des employés et le maintien du travail en équipe.",
    questions: [
      { q: "Quel est le sujet principal du texte ?", options: ["Les transports en commun", "Le développement du télétravail", "La vie personnelle des salariés", "La création d'entreprises"], answerIndex: 1 },
      { q: "Quel avantage du télétravail est mentionné ?", options: ["Un salaire plus élevé", "Moins de temps de transport", "Plus de vacances", "Moins de responsabilités"], answerIndex: 1 },
      { q: "Quel problème certains salariés rencontrent-ils ?", options: ["Un sentiment d'isolement", "Trop de réunions", "Un manque de matériel", "Des trajets trop longs"], answerIndex: 0 },
      { q: "Que doivent faire les entreprises selon le texte ?", options: ["Interdire le télétravail", "Trouver un équilibre entre besoins individuels et travail d'équipe", "Réduire les salaires", "Supprimer les bureaux"], answerIndex: 1 },
    ],
  },
  {
    id: "r4",
    level: "B1",
    title: "Un article sur l'alimentation locale",
    text: "De plus en plus de consommateurs français choisissent d'acheter des produits locaux et de saison. Cette tendance s'explique par plusieurs raisons : le souci de soutenir les agriculteurs de la région, la volonté de réduire l'impact environnemental lié au transport des aliments, et la recherche d'une meilleure qualité gustative. Les marchés locaux et les systèmes de paniers hebdomadaires, comme les AMAP, connaissent ainsi un succès grandissant, notamment dans les grandes villes où les habitants souhaitent renouer avec une alimentation plus proche de la nature.",
    questions: [
      { q: "Que choisissent de plus en plus de Français ?", options: ["Des produits importés", "Des produits locaux et de saison", "Des plats préparés", "Des produits surgelés"], answerIndex: 1 },
      { q: "Quelle n'est PAS une raison citée dans le texte ?", options: ["Soutenir les agriculteurs locaux", "Réduire l'impact environnemental", "Économiser de l'argent", "Une meilleure qualité gustative"], answerIndex: 2 },
      { q: "Où ce phénomène est-il particulièrement présent ?", options: ["À la campagne uniquement", "Dans les grandes villes", "Nulle part", "Dans les petits villages"], answerIndex: 1 },
    ],
  },
  {
    id: "r5",
    level: "B2",
    title: "La transition énergétique : entre ambition et réalité",
    text: "La transition vers des sources d'énergie renouvelables est devenue un enjeu central des politiques publiques en Europe. Si les objectifs affichés sont ambitieux — neutralité carbone d'ici 2050 pour de nombreux pays —, leur mise en œuvre se heurte à des obstacles considérables. D'une part, le coût des infrastructures nécessaires (parcs éoliens, panneaux solaires, réseaux intelligents) demeure élevé, et les investissements publics ne suivent pas toujours le rythme annoncé. D'autre part, l'acceptabilité sociale de certains projets, notamment l'implantation d'éoliennes à proximité des habitations, suscite des oppositions locales fréquentes. Enfin, la dépendance persistante aux énergies fossiles dans les transports et l'industrie lourde complique davantage la donne. Malgré ces difficultés, plusieurs experts s'accordent à dire qu'un retour en arrière n'est plus envisageable : il s'agit désormais de savoir à quel rythme, et à quel coût social, cette transition pourra réellement s'accomplir.",
    questions: [
      { q: "Quel est l'enjeu central évoqué dans le texte ?", options: ["La transition énergétique", "La croissance économique", "L'immigration", "La réforme des retraites"], answerIndex: 0 },
      { q: "Quel obstacle financier est mentionné ?", options: ["Le manque de main-d'œuvre", "Le coût élevé des infrastructures", "La baisse des salaires", "L'absence de technologie"], answerIndex: 1 },
      { q: "Pourquoi certains projets d'éoliennes rencontrent-ils une opposition ?", options: ["Ils sont trop chers pour l'État", "Une opposition sociale locale liée à leur proximité des habitations", "Ils ne produisent pas assez d'énergie", "Ils sont interdits par la loi"], answerIndex: 1 },
      { q: "Selon les experts cités, que reste-t-il à déterminer ?", options: ["Si la transition doit avoir lieu", "Le rythme et le coût social de la transition", "Le pays qui doit commencer", "L'abandon total du projet"], answerIndex: 1 },
      { q: "Quel autre facteur complique la transition énergétique ?", options: ["La dépendance aux énergies fossiles dans les transports et l'industrie", "Le prix du pétrole en baisse", "Le manque d'ingénieurs", "La météo instable"], answerIndex: 0 },
    ],
  },
  {
    id: "r6",
    level: "B2",
    title: "Le télétravail a-t-il changé durablement le monde du travail ?",
    text: "Longtemps marginal, le télétravail s'est imposé de façon spectaculaire à la faveur de la crise sanitaire, avant de connaître un reflux partiel une fois la situation normalisée. Aujourd'hui, la question n'est plus de savoir si le télétravail va disparaître, mais plutôt sous quelle forme il va perdurer. De nombreuses entreprises ont opté pour des modèles hybrides, combinant présence au bureau et travail à distance, dans une proportion qui varie selon les secteurs et les cultures d'entreprise. Ce basculement n'est pas sans conséquences : il redessine les besoins immobiliers des entreprises, qui réduisent parfois la surface de leurs bureaux, tout en posant de nouvelles questions en matière de management, de cohésion d'équipe et de droit du travail. Certains observateurs y voient une avancée en matière de qualité de vie ; d'autres redoutent un affaiblissement du lien social et une évaluation plus difficile de la performance individuelle. Quoi qu'il en soit, il semble peu probable que l'on revienne purement et simplement au modèle antérieur, tant les attentes des salariés ont évolué.",
    questions: [
      { q: "Quel événement a favorisé l'essor du télétravail selon le texte ?", options: ["Une réforme du droit du travail", "La crise sanitaire", "Une nouvelle loi européenne", "La hausse du prix de l'immobilier"], answerIndex: 1 },
      { q: "Quel modèle de nombreuses entreprises ont-elles adopté ?", options: ["Le télétravail à 100 %", "Un modèle hybride", "Le retour total au bureau", "La semaine de quatre jours"], answerIndex: 1 },
      { q: "Quelle conséquence immobilière est évoquée ?", options: ["L'agrandissement des bureaux", "La réduction de la surface des bureaux", "La construction de nouveaux sièges sociaux", "Le déménagement à l'étranger"], answerIndex: 1 },
      { q: "D'après le texte, quelle inquiétude certains observateurs expriment-ils ?", options: ["Une hausse des salaires", "Un affaiblissement du lien social", "Une baisse de la productivité des managers", "Une pénurie de bureaux"], answerIndex: 1 },
      { q: "Quelle est la conclusion générale du texte ?", options: ["Le télétravail va totalement disparaître", "Un retour pur et simple au modèle antérieur semble peu probable", "Toutes les entreprises vont fermer leurs bureaux", "Le sujet ne fait plus débat"], answerIndex: 1 },
    ],
  },
  {
    id: "r7",
    level: "B2",
    title: "Réseaux sociaux et information : un rapport ambivalent",
    text: "Si les réseaux sociaux ont démocratisé l'accès à l'information et permis l'émergence de nouvelles voix, ils sont aussi régulièrement pointés du doigt pour leur rôle dans la propagation de fausses informations. La rapidité de diffusion d'un contenu, combinée à des algorithmes qui privilégient l'engagement plutôt que la fiabilité, favorise la viralité de messages parfois trompeurs, voire délibérément mensongers. Face à ce constat, plusieurs pistes sont explorées : le développement de l'esprit critique dès le plus jeune âge à travers l'éducation aux médias, la mise en place de dispositifs de vérification des faits (fact-checking) par les plateformes elles-mêmes, ou encore un encadrement législatif plus strict. Aucune de ces solutions, prise isolément, ne semble toutefois suffisante : c'est probablement leur combinaison, associée à une responsabilisation accrue des utilisateurs, qui permettra de limiter les dérives sans pour autant restreindre la liberté d'expression.",
    questions: [
      { q: "Quel double rôle des réseaux sociaux le texte décrit-il ?", options: ["Ils sont uniquement bénéfiques", "Ils démocratisent l'information mais favorisent aussi les fausses informations", "Ils n'ont aucun impact sur l'information", "Ils remplacent totalement les journalistes"], answerIndex: 1 },
      { q: "Pourquoi les contenus trompeurs se propagent-ils facilement ?", options: ["Les utilisateurs les vérifient toujours", "Les algorithmes privilégient l'engagement plutôt que la fiabilité", "Les plateformes les interdisent", "Il n'y a pas assez d'utilisateurs"], answerIndex: 1 },
      { q: "Quelle piste concerne l'éducation ?", options: ["Le fact-checking par les plateformes", "L'éducation aux médias dès le plus jeune âge", "L'encadrement législatif", "La fermeture des réseaux sociaux"], answerIndex: 1 },
      { q: "Quelle est la conclusion de l'auteur ?", options: ["Une seule solution suffit", "La combinaison de plusieurs approches est nécessaire", "Il faut interdire les réseaux sociaux", "Le problème est déjà résolu"], answerIndex: 1 },
    ],
  },
];

if (typeof module !== "undefined") { module.exports = READING_DATA; }
