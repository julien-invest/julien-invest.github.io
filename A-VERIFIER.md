# À vérifier par Julien avant publication

Ce fichier liste toutes les données chiffrées, dates et éléments à contrôler ou compléter avant la mise en ligne. Classé par ordre de priorité.

---

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

## 2. IDs de vidéos YouTube à remplacer

- `index.html` : constante `PRESENTATION_VIDEO_ID = "VIDEO_ID"` (section Présentation). Tant que l'ID n'est pas renseigné, la façade affiche « Vidéo bientôt disponible » avec lien vers la chaîne.

## 3. Témoignages réels à insérer

- `index.html`, `formation.html`, `coaching.html` : cartes témoignages présentes mais masquées (`is-hidden`) avec un commentaire `TÉMOIGNAGE RÉEL À INSÉRER`. Ne publier que des retours authentiques et vérifiables (retirer `is-hidden` et remplir).

## 4. Vérifications diverses

- `images/og-cover.png` : présent (OK). Vérifier que le visuel est à jour.
