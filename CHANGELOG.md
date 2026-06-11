# Changelog — Chantier Julien Invest (juin 2026)

Récapitulatif des 14 phases du chantier. Architecture, direction artistique, header et footer conservés ; tout est complété, corrigé et enrichi.

## Phase 1 — Corrections critiques
- `parrainage.html` : catalogue des 31 plateformes reconstruit en **HTML statique** (7 sections ancrées, sommaire cliquable, cartes avec bouton Copier + liens affiliés `rel="sponsored noopener"`). Plus aucune injection JS du contenu (SEO + robustesse). Date de mise à jour ajoutée.
- `index.html` + `calculateur.html` : valeurs par défaut des résultats figées dans le HTML (fin des virgules orphelines sans JS), barres de progression initialisées. Compteur TikTok « 50K+ » en dur, animation en amélioration progressive.
- `blog.html` : carte « 5 erreurs » repointée vers le nouvel `article-5-erreurs-debutants.html`. Tous les liens de cartes vérifiés.

## Phase 2 — Cohérence des chiffres et des promesses
- « 37 élèves formés » partout (remplace 27). Garantie ramenée à **14 jours** (contact + CGV).
- Durée formation harmonisée à « **près de 4 heures** » (hero, FAQ, pricing, CTA, guides).
- Coaching : suppression de « Places limitées », « formation offerte/bonus » ; FAQ disponibilité reformulée. Reste à 97€.
- Témoignages : aucun faux avis. Cartes converties en composant masqué (`is-hidden` + commentaire) ; bloc de **preuve sociale réelle** (50 000+ TikTok, 37 élèves, 100% indépendant) sur index, formation, coaching.

## Phase 3 — Prix et conversion
- Prix **147€** affiché uniquement dans la carte Tarif de `formation.html` + FAQ dédiée. Nulle part ailleurs.
- `index.html` : section **vidéo de présentation** (façade lazy, iframe au clic, `PRESENTATION_VIDEO_ID`).
- **CTA sticky mobile** (≤768px, après 600px de scroll, fermeture mémorisée) sur index, formation, blog et articles.

## Phase 4 — SEO technique
- Domaine corrigé partout : `julieninvest.github.io` → `julien-invest.github.io`.
- `<link rel="canonical">` sur chaque page. JSON-LD : Organization partout, Course+Offer+FAQPage (formation), Service+Offer+FAQPage (coaching), FAQPage (contact). Articles : Article + dates.
- `sitemap.xml` régénéré (pages + articles + guides + nouvelles pages), `robots.txt` vérifié.
- Dates de publication visibles sous chaque titre d'article. `loading="lazy"` (images hors hero), `defer` (scripts non critiques). Titres et descriptions uniques (≤155 caractères).

## Phase 5 — Fiscalité 2026 (LFSS 2026)
- Flat tax / PFU : **31,4%** (12,8% IR + 18,6% PS). PEA > 5 ans : **18,6%**. CTO / PEA < 5 ans : **31,4%**. Assurance vie non concernée : **17,2%** (avant 8 ans 30%, après 8 ans 24,7%).
- Tous les exemples chiffrés recalculés et vérifiés (PEA vs CTO : 120 000€ → 22 320€ / 37 680€ / écart 15 360€).
- Simulateur liberté financière : champ imposition transformé en choix 18,6% / 31,4%.

## Phase 6 — Page À propos
- `a-propos.html` : hero photo + titre sans tiret, timeline du parcours (faits du site, placeholders « À COMPLÉTER »), principes, chiffres clés, double CTA, JSON-LD AboutPage/Person.
- Lien « À propos » ajouté au nav (desktop + mobile) et au footer de toutes les pages + lien « parcours complet » sur la home.

## Phase 7 — Enrichissement des 10 articles
- Chaque article réécrit : intro, sommaire ancré, H2/H3, **tableau + visuel SVG**, **2 encadrés « À retenir »**, **≥3 liens internes**, **FAQ (5 Q) + FAQPage JSON-LD**, **bloc vidéo lazy** (`VIDEO_ID_ARTICLE_*`), CTA formation sans prix. Fiscalité 2026, prose sans tiret. Temps de lecture mis à jour.

## Phase 8 — Quiz « Quel investisseur es-tu ? »
- `quiz.html` : 9 questions à choix unique, navigation retour, barre de progression, 4 profils calculés par score, CTA contextualisés (formation / coaching), aucune capture d'email, disclaimer. Cartes d'accès sur la home et `ressources.html`.

## Phase 9 — Comparateur de courtiers
- Section ajoutée en bas de `parrainage.html` : tableau interactif (filtres enveloppe, tri, mobile en cartes), valeurs chiffrées asterisquées, disclaimer, date de mise à jour.

## Phase 10 — Simulateur fiscal PEA / CTO / assurance vie
- 4e outil de `calculateur.html` (ancre `#fiscalite`, ajouté au menu Calculateur partout) : sliders + situation, calcul fiscalité 2026, 3 cartes net + écart, alerte plafond 150 000€, graphique en barres, CTA. Carte sur `ressources.html`.

## Phase 11 — Diagnostic de patrimoine
- `diagnostic.html` : saisie des montants, donut de répartition, épargne qui dort, perte de pouvoir d'achat, projection pédagogique, lectures recommandées, ebook + CTA, mention « aucune donnée stockée ». Cartes sur la home et `ressources.html`.

## Phase 12 — Comparateur ETF
- `data/etf.json` (37 ETF, ISIN/encours/perf à null, `verifie:false`). `comparateur-etf.html` : filtres (PEA, TER max, région, réplication, distribution), tableau triable, mode duel + simulateur d'impact des frais, point « en cours de vérification », disclaimer. Lien nav + carte ressources + liens depuis le guide et les articles ETF.

## Phase 13 — Mentions légales et CGV
- Garantie 14 jours (garantie commerciale), section droit de rétractation (renonciation expresse pour contenu numérique), section médiateur de la consommation (placeholders), confidentialité (Brevo + outils sans collecte).

## Phase 14 — Vérifications finales
- Grep : zéro occurrence résiduelle de 27 élèves, 30 jours (remboursement), 3h (durée formation), 17,2 hors assurance vie/historique, 30% flat tax hors historique, julieninvest.github.io, Places limitées, formation offerte.
- Liens internes : tous valides (fichiers + ancres). JSON-LD : 59 blocs, tous valides. Console sans erreur, rendu mobile 375px vérifié.
- Génération de ce CHANGELOG.md et de A-VERIFIER.md.
