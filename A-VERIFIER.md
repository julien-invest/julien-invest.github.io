# À vérifier par Julien avant publication

Ce fichier liste toutes les données chiffrées, dates et éléments à contrôler ou compléter avant la mise en ligne. Classé par ordre de priorité.

---

## 00. Nouvelles pages avis (Phase 14 — juillet 2026) — À COMPLÉTER

**11 nouvelles pages avis créées :**
- Multi-actifs : `avis-etoro.html` (note 3,5)
- Gestion pilotée : `avis-yomoni.html` (4,0), `avis-nalo.html` (4,0), `avis-ramify.html` (4,2)
- Assurance-vie : `avis-boursorama-vie.html` (4,0), `avis-fortuneo-vie.html` (4,3), `avis-corum-life.html` (3,8), `avis-garance-epargne.html` (3,7)
- SCPI : `avis-corum-origin.html` (4,2), `avis-remake-live.html` (4,2), `avis-iroko-zen.html` (4,3)

**⚠️ Liens de parrainage (obligatoire avant mise en ligne) :** ces 11 pages n'ont PAS de lien de parrainage (tu n'en avais pas). Chaque bouton CTA pointe vers le **site officiel** de la plateforme, avec un commentaire `<!-- TODO Julien : remplace le lien... -->` juste au-dessus dans le bloc `.avis-cta-box`. Remplace ces liens par tes vrais liens de parrainage une fois obtenus, et si la plateforme fournit un code, ajoute un `<p class="avis-cta-code">Code parrain : <strong>XXX</strong></p>` avant le bouton (modèle : `avis-boursobank.html`). Le texte de transparence dit « ce lien mènera vers un lien de parrainage » (au futur) tant que ce n'est pas fait — à ajuster une fois le vrai lien en place. **Voir la liste des plateformes à ouvrir un compte parrain en fin de fichier (section 00ter).**

**Données chiffrées à vérifier** (repérées par « à vérifier » dans les tableaux « en un coup d'œil ») : frais annuels tout compris, tickets d'entrée, assureurs partenaires (robo-advisors + AV), taux de distribution (TD) et frais des SCPI, conditions du fonds euros Garance. Ces chiffres (surtout frais robo/AV et TD des SCPI) évoluent souvent : confirme-les sur les sites officiels avant publication.

**Notes attribuées** (sur 5, modifiables dans chaque page : bloc `avis-note` visible + `avis-scores` + `reviewRating.ratingValue` du schema Review) — voir liste ci-dessus. Si tu changes une note, mets à jour les 3 endroits.

**Vidéos :** chaque page a une façade vidéo avec `const VIDEO_ID_AVIS_XXX = "VIDEO_ID"` à remplacer par l'ID YouTube quand la vidéo existe.

## 00bis. Schema Review sur les 25 pages avis existantes + 2 nouveaux outils (Phase 14)

- **Schema `Review`** ajouté aux 25 pages avis existantes (note reprise du bloc `avis-note` visible). Rien à faire, sauf si tu modifies une note : mets-la à jour à la fois dans le `avis-note` visible ET dans le `reviewRating.ratingValue` du schema.
- **`outils.html`** (nouvelle page hub des simulateurs/comparateurs) et **`comparatif-assurance-vie.html`** (comparateur AV interactif) créées. Les chiffres du comparateur AV (frais de gestion UC, ticket, fonds euros par contrat) sont **à vérifier** : ils sont dans le tableau `CONTRACTS` en haut du `<script>` de `comparatif-assurance-vie.html`. Les deux pages sont dans la nav (menu Outils), le sitemap, et `outils.html` liste tous les outils.

## 00ter. Plateformes où OUVRIR UN COMPTE PARRAIN (aucun lien de parrainage actuel)

Pour activer la monétisation des 11 nouvelles pages avis, il faut ouvrir/récupérer un lien (ou programme d'affiliation) sur ces plateformes, puis remplacer les liens `TODO Julien` :

| Plateforme | Type | Programme à chercher |
|---|---|---|
| eToro | Courtier multi-actifs | Programme d'affiliation eToro (Partners) |
| Yomoni | Gestion pilotée | Parrainage client ou affiliation |
| Nalo | Gestion pilotée | Parrainage client ou affiliation |
| Ramify | Gestion pilotée | Parrainage / affiliation |
| Boursorama Vie | Assurance-vie (BoursoBank) | Utiliser ton parrainage BoursoBank existant (code DIDE0356) adapté à l'ouverture AV |
| Fortuneo Vie | Assurance-vie | Ton parrainage Fortuneo existant (code 13385764) si applicable à l'AV |
| Corum Life | Assurance-vie SCPI | Affiliation Corum (souvent via CGP/apporteur) |
| Garance Épargne | Assurance-vie mutualiste | Vérifier s'il existe un apporteur/affiliation (souvent non) |
| Corum Origin | SCPI | Affiliation Corum |
| Remake Live | SCPI | Affiliation Remake / plateforme SCPI (ex : via un partenaire type Louve Invest qui donne du cashback) |
| Iroko Zen | SCPI | Affiliation Iroko / plateforme SCPI |

Note : pour les SCPI, une alternative est de passer par une plateforme d'intermédiation SCPI avec cashback (type Louve Invest, déjà sur le site) plutôt qu'un lien direct — à toi de choisir le montage. Certaines AV mutualistes (Garance) n'ont pas de programme d'apport : dans ce cas, laisse un lien neutre vers le site officiel.

---

## 00quater. Correctifs 08/07/2026 (logos + fiscalité + ClubFunding)

**Logos corrigés :**
- `images/logo-tokimo.png` : l'ancien était FAUX (icône orange d'une autre société). Remplacé par le vrai logo Tokimo crowdfunding (hexagone violet, source tokimo.eu — le vrai site, pas tokimo.co qui est une autre entreprise). Sert sur avis-tokimo, le hub et parrainage.html.
- `images/logo-premierebrique.png` : le bon design, mais remplacé par une version haute résolution (256px) plus nette.
- `images/logos/tokimo.svg` (utilisé par les cartes de l'article crowdfunding) : déjà violet/on-brand, laissé tel quel.

**Fiscalité mise à jour (flat tax 30% → 31,4%)** sur `article-scpi-vs-crowdfunding.html` et `article-crowdfunding-immobilier.html` : ces 2 articles avaient été oubliés lors de la mise à jour fiscale 2026. PFU crowdfunding = 31,4% (12,8% + 18,6% PS), rendement net recalculé 7,70% → 7,55%. **Non touché** (canonique, cohérent avec les autres articles) : le foncier SCPI reste à 17,2% (TMI + 17,2%), les TMI 30%, les taux de retard 25-30%.

**ClubFunding ajouté** comme 4e profil de plateforme dans `article-crowdfunding-immobilier.html` (section « 4 profils de plateformes », grille passée en 2×2). ⚠️ **Chiffres ClubFunding à vérifier** (repris de connaissances générales, pas de source officielle live) : ticket minimum **1 000 €**, rendement brut **~9-10%**, collecte cumulée **1 Md€+**, création **2015**, agrément PSFP, pas de marché secondaire. Confirme sur clubfunding.fr avant publication. Le lien du bouton pointe vers l'avis interne (`avis-clubfunding.html`), pas un lien de parrainage.

## 0. Données ETF (Phase 12) — PRIORITÉ MAXIMALE

Fichier : `data/etf.json` (37 ETF). **Vérifier chaque ligne contre le DIC (document d'informations clés) de l'émetteur avant publication**, puis passer `verifie` à `true` ligne par ligne.

- `isin`, `encours`, `perf_5_ans_annualisee` sont à `null` partout (rien n'a été inventé). À renseigner après vérification.
- `ter` reprend des ordres de grandeur publics connus, à confirmer.
- `eligible_pea`, `replication`, `politique`, `region`, `devise` : à confirmer aussi (notamment l'éligibilité PEA de certains S&P 500 et MSCI World).
- Tant que `verifie` est `false`, un point « en cours de vérification » s'affiche dans le comparateur. Voir le commentaire dans `comparateur-etf.html` pour retirer cet affichage une fois validé.

## 1. Dates de publication des articles (Phase 4)

Dates plausibles attribuées automatiquement, réparties sur janvier → juin 2026. À ajuster selon les vraies dates de publication. Elles apparaissent à deux endroits par article : la ligne visible sous le titre et le bloc JSON-LD (`datePublished` / `dateModified`).

| Article | Publié le | Mis à jour le |
|---|---|---|
| article-debuter-investissement.html | 15 janvier 2026 | 10 juin 2026 |
| article-pea-vs-cto.html | 3 février 2026 | 10 juin 2026 |
| article-fiscalite-investissement.html | 20 février 2026 | 10 juin 2026 |
| article-etf-monde-2026.html | 5 mars 2026 | 10 juin 2026 |
| article-liberte-financiere.html | 22 mars 2026 | 10 juin 2026 |
| article-assurance-vie-pea.html | 8 avril 2026 | 10 juin 2026 |
| article-dividendes-vs-etf.html | 24 avril 2026 | 10 juin 2026 |
| article-etf-physique-vs-synthetique.html | 12 mai 2026 | 10 juin 2026 |
| article-bitcoin-2026.html | 28 mai 2026 | 10 juin 2026 |
| article-5-erreurs-debutants.html | 2 juin 2026 | 10 juin 2026 |

## 1bis. Données du comparateur de courtiers (Phase 9)

Toutes les valeurs chiffrées du comparateur (`parrainage.html`, objet `COURTIERS` dans le script en bas de page) sont **indicatives** et marquées d'un astérisque. À vérifier sur le site de chaque courtier avant publication, puis retirer l'astérisque une fois confirmé.

| Courtier | Frais d'ordre | Droits de garde | ETF | Bonus |
|---|---|---|---|---|
| Trade Republic | 1€ par ordre* | 0€* | Large, plans programmés* | Variable selon l'offre* |
| Fortuneo | Variable selon l'offre* | 0€* | Sélection large* | Jusqu'à 140€ offerts* |
| BoursoBank | Variable selon l'offre* | 0€* | Sélection large* | Jusqu'à 150€ offerts* |
| DEGIRO | Frais réduits, variable* | Variable selon l'offre* | Catalogue très large* | Variable selon l'offre* |
| XTB | 0€ sous conditions* | 0€* | Sélection large* | Variable selon l'offre* |
| Bourse Direct | Variable selon l'offre* | 0€* | Sélection large* | Variable selon l'offre* |

## 1ter. Liens affiliés et codes parrainage manquants

- `parrainage.html` : certaines plateformes n'ont qu'un code parrainage (pas de lien direct) et une carte (Louve Invest) fonctionne par contact direct (DM Instagram / email) faute de lien d'affiliation. Vérifier et compléter les liens affiliés manquants si disponibles. Aucun lien ni montant de bonus n'a été inventé.
- Comparateur de courtiers : mêmes liens/codes que les cartes (Trade Republic, DEGIRO ont un lien ; Fortuneo, BoursoBank, XTB, Bourse Direct un code). À confirmer.

## 2. IDs de vidéos YouTube à remplacer

- `index.html` : constante `PRESENTATION_VIDEO_ID = "VIDEO_ID"` (section Présentation). Tant que l'ID n'est pas renseigné, la façade affiche « Vidéo bientôt disponible » avec lien vers la chaîne.
- Chaque article (Phase 7) a un bloc vidéo avec une constante `VIDEO_ID_ARTICLE_*` à remplacer : `VIDEO_ID_ARTICLE_PEA_CTO`, `_DEBUTER`, `_ERREURS`, `_FISCALITE`, `_AV_PEA`, `_DIVIDENDES`, `_ETF_MONDE`, `_ETF_SYNTH`, `_LIBERTE`, `_BITCOIN`. Même comportement de repli « Vidéo bientôt disponible ».

## 3. Témoignages réels à insérer

- `index.html`, `formation.html`, `coaching.html` : cartes témoignages présentes mais masquées (`is-hidden`) avec un commentaire `TÉMOIGNAGE RÉEL À INSÉRER`. Ne publier que des retours authentiques et vérifiables (retirer `is-hidden` et remplir).

## 4. Fiscalité 2026 (Phase 5)

Chiffres appliqués partout (à confirmer au regard du texte définitif de la LFSS 2026 et de la doctrine fiscale avant publication) :

- PFU / flat tax : **31,4%** (12,8% IR + 18,6% PS).
- PEA > 5 ans : exonération d'IR, **18,6%** de prélèvements sociaux au retrait.
- PEA < 5 ans / CTO : **31,4%**.
- Assurance-vie : **non concernée**, PS maintenus à 17,2% (avant 8 ans 30%, après 8 ans 24,7% avec abattement 4 600€ / 9 200€).
- Exemples recalculés : article PEA vs CTO (120 000€ de PV → PEA 22 320€, CTO 37 680€, écart 15 360€), article fiscalité, article dividendes vs ETF, simulateur fiscal.

## 4bis. Mentions légales (Phase 13)

- `mentions-legales.html`, section « Médiateur de la consommation » : compléter le **nom du médiateur** choisi, son **adresse postale** et l'**URL de saisine** (placeholders `À COMPLÉTER PAR JULIEN`). Obligatoire pour la vente aux consommateurs.
- Vérifier que la case de renonciation expresse au droit de rétractation est bien présente sur la page de paiement (systeme.io).

## 5. Vérifications diverses

- `images/og-cover.png` : présent (OK). Vérifier que le visuel est à jour.
