# Recherche — Bear Hunt / Bear Trap (Whiteout Survival)

Date de collecte : 27 septembre 2026. Ce document ne fait pas passer un guide communautaire pour une spécification officielle. Les liens sont conservés pour pouvoir réévaluer chaque information après une mise à jour du jeu.

## Résumé exécutable

L’état des sources publiques permet de construire un **optimiseur relatif et auditable**, pas un calculateur de dégâts absolus fiable. La structure des rallies est bien recoupée; l’équation de combat complète, les coefficients du Bear et l’ordre réel de composition des modificateurs ne le sont pas.

L’application utilise donc les règles de sélection de héros et les effets textuels traçables. Elle ne multiplie pas arbitrairement Attaque × Létalité × dégâts ni ne transforme une chance de proc en dégâts moyens sans le nombre réel de tours/attaques.

## Travaux existants examinés

| Travail | Ce qui est exploitable | Limite retenue |
| --- | --- | --- |
| [Ryo’s WOS battle simulator](https://github.com/ryo-HIT-1589/wos-simulator) | Code public, registre Fitz des skills, base de tiers, procédure de comparaison avec rapports réels. | Le README indique explicitement un travail en cours, support FC incomplet et seulement une partie des attributs testés. Il est une excellente piste de validation, pas une oracle Bear Trap. |
| [Frost Survival Coach](https://www.frostsurvivalcoach.com/tools) | Confirme l’existence d’un planificateur de squads et d’un optimiseurs compte-aware. | L’optimiseur de dégâts est derrière une authentification : ni formule ni données de validation ne sont inspectables publiquement. Rien n’a été copié. |
| [WSCO Bear Trap guide](https://www.whiteoutsurvival-community.com/tools/wiki/events/bear-trap-wsco.html) | Règles leader/joiner, fenêtre de quatre skills, recommandations de ratios et roster récent. | Guide communautaire, pas une formule de combat ni un protocole expérimental publié. |
| [WoS Logs Bear Trap guide](https://woslogs.com/guides/bear-trap-gen4) | Distinction explicite leader/joiner, slots actifs, rôle du gear du leader et ratio 10/10/80. | Couvre Gen 4 et formule des conclusions sans jeux de données bruts. |
| [WoS Guru heroes](https://wosguru.com/heroes) | Roster par génération et descriptions de rôles; utile pour le filtre de génération. | Certaines recommandations divergent d’autres guides; jamais utilisé seul pour fixer une formule. |
| [Fitz Hero Skill Registry](https://github.com/ryo-HIT-1589/wos-simulator/blob/main/skills/Fitz_hero_skills.csv) | Valeurs et descriptions de skills Gen 1–5 visibles dans un registre public. | Registre communautaire, inclus par un simulateur qui se déclare incomplet; les champs qui ne sont pas recoupés restent conditionnels. |
| [WSCO pet database](https://www.whiteoutsurvival-community.com/en/pet-database.html) | Noms, progression et fenêtres des pets; Cave Lion et Titan Roc ont des descriptions détaillées. | L’applicabilité précise au Bear, la durée et le stacking de chaque effet ne sont pas établis par une source primaire. |

## Recherche de la mécanique de rally

### CONFIRMÉE dans l’interface / multi-source, à contrôler à chaque patch

Ces faits sont observés de manière cohérente dans des guides indépendants; « confirmé » signifie ici que la règle est stable et visible en jeu, pas que nous disposons du code serveur.

1. Bear Hunt / Bear Trap est un événement d’alliance fondé sur des rallies et une fenêtre d’environ 30 minutes. [WSCO](https://www.whiteoutsurvival-community.com/tools/wiki/events/bear-trap-wsco.html)
2. Un leader choisit trois héros; les skills d’expédition sont le bon domaine à examiner, contrairement aux skills d’exploration. [WOS Forge — Hero Skills](https://wiki.wosforge.org/wiki/Hero_Skills)
3. Une génération / un âge de serveur conditionne le roster disponible. Le filtre par génération est donc le premier champ de BearLab. [WoS Guru roster](https://wosguru.com/hero-database)
4. Les pets sont déverrouillés progressivement selon l’âge du serveur et leur actif a une durée/cooldown : un effet temporaire ne peut pas être supposé actif pendant toute la session. [WSCO pets](https://www.whiteoutsurvival-community.com/tools/wiki/events/pet-wsco.html)
5. La hiérarchie des tiers, les capacités de marche et les stocks limitent matériellement un plan, indépendamment de toute formule de dégâts.

### TRÈS PROBABLE — recoupé par plusieurs sources communautaires

1. Pour un joiner, **seul le premier skill d’expédition du héros en slot gauche** est candidat au rally. Le gear et les deux autres héros du joiner n’apporteraient pas de bonus direct au Bear. [WSCO](https://www.whiteoutsurvival-community.com/tools/wiki/events/bear-trap-wsco.html), [WoS Logs](https://woslogs.com/guides/bear-trap-gen4), [A Jack Of](https://www.ajackof.com/games/whiteout-survival-wos/whiteout-survival-bear-trap-guide/)
2. Quatre skills de joiners au plus sont actifs. Les sources décrivent un remplacement des skills faibles par un niveau supérieur et le maintien de l’ordre d’arrivée à niveau égal. [WSCO](https://www.whiteoutsurvival-community.com/tools/wiki/events/bear-trap-wsco.html), [discussion Reddit avec exemples](https://www.reddit.com/r/whiteoutsurvival/comments/1sysyp4/bear_trap_joiners/)
3. Jessie et Jasser ont un premier skill permanent à +5 / +10 / +15 / +20 / +25 % de dégâts de toutes les troupes. Le registre Fitz et une page indépendante de Jasser donnent ces mêmes niveaux. [registre public](https://github.com/ryo-HIT-1589/wos-simulator/blob/main/skills/Fitz_hero_skills.csv), [Pillar of Gaming](https://pillarofgaming.com/whiteout-survival-jasser-guide/)
4. Seo-yoon est une alternative dont le premier skill est une augmentation d’attaque de toutes les troupes, pas le même libellé « damage dealt » que Jessie/Jasser. [WoS Guru](https://wosguru.com/heroes)
5. Les guides convergent vers une composition lourde en tireurs, souvent 10 / 10 / 80 ou proche, car le Bear ne contre-attaque pas. Cette recommandation est intégrée comme **doctrine modifiable**, jamais comme coefficient de dégâts. [WoS Logs](https://woslogs.com/guides/bear-trap-gen4), [WSCO](https://www.whiteoutsurvival-community.com/tools/wiki/events/bear-trap-wsco.html)
6. Les bonus de compte du leader (recherche, gear, charms, pets, buffs de ville) sont généralement présentés comme pertinents pour son rally; la portée exacte de chaque bonus doit rester contrôlée dans l’aperçu ingame. [WoS Logs](https://woslogs.com/guides/bear-trap-gen4)

### HYPOTHÈSES implémentées uniquement comme scénarios affichés

1. La règle exacte de sélection des quatre skills (priorité niveau, remplacement, égalités, arrivée, doublons) est représentée dans `standard_joiner_profile.json`, mais n’est pas considérée comme une spécification serveur prouvée.
2. Les autres participants du scénario standard utilisent `Jessie → Jasser → Seo-yoon`. Les slots 2 et 3 sont une **constante reproductible** et non une prétention qu’ils modifient le Bear en joiner.
3. Le leader d’un rally rejoint est cloné sur le profil de l’utilisateur. C’est l’hypothèse demandée, pas une observation du jeu.
4. La préférence 10/10/80 est une stratégie de départ. Elle ne prouve pas que ce ratio domine chaque roster, tier ou durée de combat.
5. Les descriptifs de proc des héros Gen 1–5 du registre Fitz sont utilisés pour les étiquettes de l’interface; ils ne sont pas convertis en expected damage avant mesure de la cadence du combat.

### INCONNU — explicitement non inventé

1. La formule absolue des dégâts contre le Bear, son attaque/défense interne, ses arrondis et ses éventuels coefficients propres à l’événement.
2. L’ordre de composition d’Attaque, Létalité, Dégâts infligés, dégâts normaux, dégâts par type, dégâts subis par la cible et réduction de défense.
3. Les caps, les multiplicateurs partagés, la manière dont des doublons de skills sont agrégés et la résolution des égalités au-delà des témoignages communautaires.
4. Le nombre de tours/attaques d’un combat Bear, donc l’espérance exacte de skills à probabilités, cadence ou durée.
5. La contribution exacte des widgets, Hero Gear, Chief Gear, charms, pets, recherche, alliance tech, island, skins, VIP et buffs temporaires selon le rôle leader/joiner.
6. Le compromis global entre lancer un rally et rejoindre un rally, car il dépend des timings, remplissages, profils alliés et multipliers inconnus.

## Données embarquées et couverture

BearLab contient des fiches réellement exploitables pour les héros explorés Gen 1–5 (Jessie à Norah). Les héros modernes Gen 6–17 sont visibles pour conserver le filtre de génération, mais marqués **à vérifier** et exclus du moteur jusqu’à ce qu’une fiche locale sourcée soit ajoutée. C’est une limitation assumée : compléter une base de données avec des valeurs non recoupées serait exactement le comportement à éviter.

Les pets sont affichés par fenêtre de génération. Leur sélection sert de checklist de durée/applicabilité; aucun bonus de pet n’est secrètement ajouté au score.

## Protocole de validation recommandé

1. Fixer leader, participants, taille de rally, tiers, ratio, buffs et niveau de piège.
2. Lancer au moins cinq essais d’un même scénario; sauvegarder les dégâts et les conditions dans le journal de BearLab.
3. Ne modifier qu’une variable à la fois (un skill, un buff, un pet ou un ratio).
4. Répéter le contrôle si la composition des quatre joiner skills visibles change.
5. Comparer médiane et dispersion, pas seulement le meilleur résultat.
6. Exporter le profil et conserver captures des aperçus de bonus et rapports ingame.

Ce protocole permet d’ajouter une régression future sans transformer un résultat chanceux en vérité universelle.
