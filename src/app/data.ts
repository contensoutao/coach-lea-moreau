// TOUT le contenu du site est ici. Pour un vrai coach, on ne change que ce fichier (et les photos).
// ⚠️ Démo : Léa Moreau est un personnage fictif.

export const COACH = {
  prenom: "Léa",
  nom: "Léa Moreau",
  metier: "Coach sportive & nutrition",
  ville: "Bordeaux",
  zone: "Bordeaux et en visio",
  reponse: "Réponse sous 24 h, du lundi au samedi",
};

export const HERO = {
  lignes: ["Bouge.", "Mange mieux."],
  accent: "Tiens bon.",
  texte:
    "Coaching sportif et nutrition à Bordeaux et en visio. Un programme simple, une coach qui te suit chaque semaine, et des résultats qui durent.",
};

export const PILIERS = [
  { titre: "Des séances qui te ressemblent", texte: "En plein air sur les quais, chez toi ou en visio. 45 minutes, adaptées à ton niveau du jour — même si tu reprends de zéro." },
  { titre: "Un plan repas qui tient dans ta semaine", texte: "Pas de régime, pas de pesée. Des repas simples que tu as le temps de préparer, avec ce que tu aimes déjà." },
  { titre: "Un suivi chaque semaine", texte: "Un point par message, des ajustements quand la vie s'en mêle. Tu n'es jamais seule avec ton programme." },
];

export const APROPOS = {
  titre: "Moi, c'est Léa.",
  texte: [
    "J'ai commencé le sport tard, après des années à enchaîner les programmes abandonnés au bout de trois semaines. Ce qui a tout changé, ce n'est pas la motivation : c'est d'avoir quelqu'un qui adapte le plan à ma vraie vie.",
    "Aujourd'hui, c'est ce que je fais pour les femmes que j'accompagne : un cadre clair, de la bienveillance, et assez d'exigence pour que les résultats arrivent.",
  ],
};

export const ETAPES = [
  { titre: "La séance découverte", texte: "30 minutes offertes. On parle de tes objectifs, de ton quotidien, de ce qui a coincé avant." },
  { titre: "Ton plan sur mesure", texte: "Séances et repas calés sur ton emploi du temps réel, pas sur une semaine idéale." },
  { titre: "Le suivi", texte: "Une séance par semaine et un point par message. On ajuste au fil de l'eau." },
  { titre: "Le bilan à 3 mois", texte: "On mesure le chemin parcouru, et tu décides de la suite — sans engagement." },
];

export const OFFRES = [
  { nom: "Séance découverte", prix: "Offerte", detail: "30 min · en visio ou à Bordeaux", points: ["Tes objectifs et ton quotidien", "Un premier conseil concret", "Sans engagement"], phare: false },
  { nom: "Accompagnement 3 mois", prix: "390 €", detail: "soit 130 € par mois", points: ["1 séance par semaine", "Ton plan repas personnalisé", "Suivi par message 6 j/7", "Bilan à 3 mois"], phare: true },
  { nom: "Séance à l'unité", prix: "45 €", detail: "45 min", points: ["En plein air ou en visio", "Pour tester ou compléter", "Réservation à la semaine"], phare: false },
];

export const NUTRITION = {
  titre: "La nutrition, sans prise de tête.",
  texte: "Pas de liste d'aliments interdits. On part de ce que tu manges déjà, et on améliore une chose à la fois : le petit-déjeuner, puis les en-cas, puis les soirs où tu rentres tard.",
};

export const FAQ = [
  { q: "Faut-il déjà être sportive ?", r: "Non. La plupart des femmes que j'accompagne reprennent après des années sans sport. On commence à ton niveau." },
  { q: "Comment se passent les séances en visio ?", r: "Un lien vidéo, un tapis, ton téléphone posé devant toi. Je te corrige en direct, comme en vrai." },
  { q: "Est-ce que je vais devoir suivre un régime ?", r: "Non. On ajuste tes repas petit à petit, sans rien t'interdire." },
  { q: "Et si je dois annuler une séance ?", r: "Préviens-moi 24 h avant et on la décale, sans frais." },
];

export const OBJECTIFS = ["Reprendre le sport", "Perdre du poids durablement", "Mieux manger", "Retrouver de l'énergie", "Autre"];
