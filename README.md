# BearLab — Bear Hunt / Bear Trap

Application statique de décision pour Whiteout Survival. Elle a été conçue pour éviter de convertir des informations communautaires incertaines en un chiffre de dégâts qui semblerait exact.

## Lancer localement

Ouvrez `dist/index.html`, ou lancez un petit serveur statique depuis le dossier du projet :

```powershell
py -m http.server 8080 --directory dist
```

Puis visitez `http://localhost:8080`.

## Ce que l’application fait

- filtre le roster par génération de serveur ;
- mémorise le profil et les rapports sur l’appareil avec `localStorage` ;
- propose des leaders et joiners à partir des effets permanents et documentés ;
- alloue un plan de marches sur le ratio communautaire 10 / 10 / 80, sans le présenter comme une formule de combat ;
- isole les configurations comparables, non comparables et les valeurs à calibrer.

Les références, les limites des calculateurs existants et les hypothèses sont dans [RESEARCH.md](RESEARCH.md) et [FORMULAS.md](FORMULAS.md).
