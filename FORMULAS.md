# Modèle mathématique et limites

## Principe

La formule de dégâts complète de Whiteout Survival contre le Bear n’est pas publiée ni suffisamment rétro-ingéniérée dans les sources examinées. BearLab ne code donc pas la formule suivante — souvent proposée sans preuve :

```text
Damage = troops × base attack × attack modifiers × lethality modifiers × ...
```

En particulier, l’application ne présume ni que les bonus sont tous multiplicatifs, ni que la létalité se compose après l’attaque, ni qu’un proc a droit à son maximum.

## Le vecteur de décision

Chaque configuration `C` est représentée par un vecteur de dimensions indépendantes :

```text
V(C) = (
  D : bonus permanents « dégâts de toutes troupes » listés,
  A : bonus d’attaque listés,
  L : bonus de létalité listés,
  E : réduction / vulnérabilité de défense ennemie listée,
  N : bonus qui ciblent explicitement les attaques normales,
  T : bonus dépendants d’un type de troupe,
  P : effets probabilistes ou cadencés non résolus
)
```

Les valeurs du vecteur ne sont pas additionnées pour produire un dommage. Une valeur `D = 50` veut dire « deux effets textuels permanents de +25 % ont été identifiés », pas « +50 % de dégâts finaux ».

### Dominance de Pareto

Une configuration A domine B seulement si chaque composante déterministe connue de A est supérieure ou égale à B et qu’au moins une est strictement supérieure :

```text
A ≻ B  iff  ∀k ∈ {D,A,L,E,N,T}, V_k(A) ≥ V_k(B)
             et ∃k : V_k(A) > V_k(B)
```

Dans le cas contraire, BearLab indique une **frontière de Pareto** plutôt qu’un gagnant imaginaire. L’utilisateur peut alors effectuer un test contrôlé utile : les deux configurations ne diffèrent que sur les dimensions non comparables.

## Choix actuellement automatisés

### Leader

Pour les héros sourcés et possédés, le moteur énumère toutes les combinaisons de trois héros. Contrairement à un joiner, le leader apporte toutes les compétences d’expédition de ses trois héros : BearLab ajoute donc les **effets offensifs documentés** au vecteur, pas seulement le premier skill. Les effets défensifs sont exclus du score Bear et les procs sont tracés séparément.

Le tri de lecture est explicite : dégâts permanents toutes troupes, puis attaque toutes troupes, létalité, vulnérabilité cible, dégâts normaux et dégâts par type. C’est une priorité de décision, pas une formule de dégâts ni une preuve qu’un point d’une catégorie vaut un point d’une autre. Les autres équipes non dominées restent affichées comme alternatives.

Les skills temporaires ou probabilistes sont tracés dans `P`. Le moteur ne les divise pas par une constante arbitraire.

### Joiner

La recommandation de joiner ne regarde que le premier skill d’expédition du héros en premier slot. Les héros 2 et 3 ne modifient pas le Bear : ils sont utiles à la capacité de déploiement, pas au buff. Le résultat avertit toujours que le skill ne compte que s’il est sélectionné parmi les quatre joiners actifs, visibles par le drapeau jaune dans le jeu.

### Troupes et marches

La répartition de départ est :

```text
10 % infanterie / 10 % lanciers / 80 % tireurs
```

Elle est appliquée par marche en respectant la capacité et les stocks; quand un stock est insuffisant, la marche est remplie par les autres types disponibles. Elle est étiquetée comme doctrine communautaire. Aucune valeur de tier, Fire Crystal, santé, défense ou puissance n’est utilisée comme équivalent secret de dégâts. Les bonus propres aux tireurs restent distincts, puisque la marche n’est pas 100 % tireurs.

## Espérance des skills à proc

Un proc unique de probabilité `p` et d’effet `x` ne peut être réduit à un bonus constant que si l’on connaît :

- le nombre d’occasions de déclenchement `n` ;
- l’indépendance des essais ;
- la durée de l’effet ;
- les règles de refresh, stacking, cooldown et ordre dans le tour.

Dans le cas très simplifié de `n` essais indépendants sans durée ni interaction, la probabilité d’au moins un déclenchement est :

```text
P(au moins un proc) = 1 − (1 − p)^n
```

Ce n’est **pas** l’expected damage d’un skill Bear. Pour un buff de durée ou un effet toutes les `k` attaques, il faut une simulation tour par tour validée par rapports. BearLab conserve donc ces skills en `P` jusqu’à ce que le protocole de `RESEARCH.md` fournisse les données nécessaires.

## Calibration future à partir des rapports

Lorsqu’un nombre suffisant de tests contrôlés existe, une version ultérieure peut ajuster un modèle log-linéaire descriptif :

```text
log(observed_damage) = β0 + βD·D + βA·A + βL·L + βE·E + ... + ε
```

Ce modèle exige des variations isolées, des répétitions et des variables contrôlées. Les coefficients ne doivent être activés qu’avec :

1. une taille d’échantillon suffisante ;
2. des intervalles de confiance affichés ;
3. une validation sur des rapports non utilisés pour l’ajustement ;
4. une version de jeu et un état de buffs identifiés.

Sans cela, présenter une prédiction en millions serait moins utile qu’une frontière de Pareto honnête.

## Comparaison avec les travaux existants

Le simulateur public de [ryo-HIT-1589](https://github.com/ryo-HIT-1589/wos-simulator) est une source de travail précieuse : il possède un registre de skills et recommande de conserver des cas tests de rapports. Son README précise cependant que le projet est en cours, que les troupes FC ne sont pas encore supportées et que seules certaines données ont été testées. BearLab réutilise cette idée de traçabilité, pas une équation présentée comme validée.
