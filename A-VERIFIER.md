# À vérifier par Julien avant publication

Ce fichier liste toutes les données chiffrées, dates et éléments à contrôler ou compléter avant la mise en ligne. Classé par ordre de priorité.

---

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

## 5. Vérifications diverses

- `images/og-cover.png` : présent (OK). Vérifier que le visuel est à jour.
