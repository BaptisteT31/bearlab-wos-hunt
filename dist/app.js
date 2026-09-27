/* BearLab is deliberately a relative decision tool. See FORMULAS.md before
 * treating any vector below as a combat formula. */
const STORAGE_KEY = "bearlab-profile-v1";
const OBSERVATIONS_KEY = "bearlab-observations-v1";

const CORE_HEROES = [
  { id:"jessie", name:"Jessie", generation:1, troop:"lancer", rarity:"Épique", owned:true, verified:true, source:"Fitz registry + 3 guides", primary:{ name:"Stand of Arms", values:[5,10,15,20,25], category:"damage", text:"Dégâts infligés par toutes les troupes" }, leader:{damage:25}, note:"Joiner stable : bonus permanent toutes troupes." },
  { id:"jasser", name:"Jasser", generation:1, troop:"marksman", rarity:"Épique", owned:true, verified:true, source:"Fitz registry + Pillar", primary:{ name:"Tactical Genius", values:[5,10,15,20,25], category:"damage", text:"Dégâts infligés par toutes les troupes" }, leader:{damage:25}, note:"Même famille d’effet que Jessie." },
  { id:"seoyoon", name:"Seo-yoon", generation:1, troop:"marksman", rarity:"Épique", owned:true, verified:true, source:"Fitz registry + WoS Guru", primary:{ name:"Rallying Beat", values:[5,10,15,20,25], category:"attack", text:"Attaque de toutes les troupes" }, leader:{attack:25}, note:"Bon joiner, mais catégorie différente des dégâts." },
  { id:"jeronimo", name:"Jeronimo", generation:1, troop:"infantry", rarity:"Mythique", owned:true, verified:true, source:"Fitz registry + WoS Guru", primary:{ name:"Battle Manifesto", values:[5,10,15,20,25], category:"damage", text:"Dégâts infligés par toutes les troupes" }, leader:{damage:25,attack:25}, note:"Swordmentor apporte aussi de l’attaque au leader; passif de létalité hors marche à vérifier dans l’aperçu du compte." },
  { id:"natalia", name:"Natalia", generation:1, troop:"infantry", rarity:"Mythique", verified:true, source:"Fitz registry", primary:{ name:"Wildling Roar", values:[4,8,12,16,20], category:"conditional", text:"Chance d’étourdir — ne produit pas un bonus Bear calculable isolément" }, leader:{damage:25,attack:25}, note:"Les skills 2–3 peuvent aider au leadership; le premier skill joiner n’est pas un bonus de dégâts permanent." },
  { id:"molly", name:"Molly", generation:1, troop:"lancer", rarity:"Mythique", verified:true, source:"Fitz registry", primary:{ name:"Calling of the Storm", values:[4,8,12,16,20], category:"conditional", text:"Chance d’étourdir — procs non calibrés" }, leader:{damage:25}, note:"Son skill 3 est un bonus dégâts permanent dans le registre consulté." },
  { id:"bahiti", name:"Bahiti", generation:1, troop:"marksman", rarity:"Épique", verified:true, source:"Fitz registry", primary:{ name:"Sixth Sense", values:[4,8,12,16,20], category:"defense", text:"Réduction de dégâts subis" }, leader:{conditional:"Proc de dégâts, 50% selon le registre"}, note:"Défensif en premier slot; ne le choisir comme joiner Bear que si le rally manque de meilleurs bonus." },
  { id:"sergey", name:"Sergey", generation:1, troop:"infantry", rarity:"Épique", verified:true, source:"Fitz registry + WoS Guru", primary:{ name:"Defender’s Edge", values:[4,8,12,16,20], category:"defense", text:"Réduction de dégâts subis par toutes les troupes" }, leader:{}, note:"Le Bear ne contre-attaque pas selon les guides; valeur offensive non établie." },
  { id:"patrick", name:"Patrick", generation:1, troop:"lancer", rarity:"Épique", verified:true, source:"Fitz registry", primary:{ name:"Super Nutrients", values:[5,10,15,20,25], category:"health", text:"Santé de toutes les troupes" }, leader:{attack:25}, note:"Son second skill attaque est retenu pour le leader; premier slot joiner défensif." },
  { id:"zinman", name:"Zinman", generation:1, troop:"marksman", rarity:"Mythique", verified:true, source:"Fitz registry", primary:{ name:"Implacable", values:[2,4,6,8,10], category:"defense", text:"Défense et santé de toutes les troupes" }, leader:{damage:25}, note:"Positional Battler est un bonus leader, pas le premier bonus joiner." },
  { id:"flint", name:"Flint", generation:2, troop:"infantry", rarity:"Mythique", verified:true, source:"Fitz registry", primary:{ name:"Pyromaniac", values:[8,16,24,32,40], category:"conditional", text:"Proc de feu — nombre de tours nécessaire" }, leader:{attack:25,conditional:"Brûlure / dégâts subis conditionnels"}, note:"Les procs ne sont pas transformés en dégâts moyens sans durée vérifiée." },
  { id:"alonso", name:"Alonso", generation:2, troop:"marksman", rarity:"Mythique", verified:true, source:"Fitz registry", primary:{ name:"Onslaught", values:[4,8,12,16,20], category:"conditional", text:"Chance d’étourdir — non classé comme bonus Bear stable" }, leader:{conditional:"Poison Harpoon, 50% de proc enregistré"}, note:"Souvent recommandé comme leader; l’avantage exact dépend du combat." },
  { id:"philly", name:"Philly", generation:2, troop:"lancer", rarity:"Mythique", verified:true, source:"Fitz registry", primary:{ name:"Vigor Tactics", values:[3,6,9,12,15], category:"attack", text:"Attaque (et défense) de toutes les troupes" }, leader:{attack:15,conditional:"Dosage Boost, 25% de proc"}, note:"Attaque permanente, mais inférieur aux +25% de la famille Jessie sur la seule dimension dégâts." },
  { id:"mia", name:"Mia", generation:3, troop:"lancer", rarity:"Mythique", owned:true, verified:true, source:"Fitz registry + guides", primary:{ name:"Bad Luck Streak", values:[10,20,30,40,50], category:"conditional", text:"50% de chance d’augmenter les dégâts subis par la cible" }, leader:{conditional:"Deux procs / buffs de combat; nécessite une durée/trace"}, note:"Souvent proposée comme leader; BearLab ne chiffre pas son avantage sans tours observés." },
  { id:"greg", name:"Greg", generation:3, troop:"marksman", rarity:"Mythique", owned:true, verified:true, source:"Fitz registry", primary:{ name:"Sword of Justice", values:[8,16,24,32,80], category:"conditional", text:"20% de chance de bonus dégâts pendant 3 tours" }, leader:{conditional:"Proc temporaire, peut se répéter"}, note:"Ne pas remplacer par une moyenne unique sans nombre de tours." },
  { id:"logan", name:"Logan", generation:3, troop:"infantry", rarity:"Mythique", verified:true, source:"Fitz registry", primary:{ name:"Lion Strike", values:[8,16,24,32,40], category:"conditional", text:"Proc dégâts d’infanterie, durée 3 tours" }, leader:{}, note:"Dépendant de l’infanterie; l’impact en ratio tireurs est non résolu." },
  { id:"reina", name:"Reina", generation:4, troop:"lancer", rarity:"Mythique", verified:true, source:"Fitz registry + WoS Guru", primary:{ name:"Assassin’s Instinct", values:[10,15,20,25,30], category:"normalDamage", text:"Dégâts des attaques normales de toutes les troupes" }, leader:{normalDamage:30,conditional:"Extra attaque de lanciers, 25% de proc"}, note:"Ne concerne explicitement que les attaques normales; ne pas additionner avec dégâts totaux." },
  { id:"lynn", name:"Lynn", generation:4, troop:"marksman", rarity:"Mythique", verified:true, source:"Fitz registry", primary:{ name:"Song of Lion", values:[10,20,30,40,50], category:"conditional", text:"40% de chance de bonus dégâts toutes troupes" }, leader:{conditional:"Stack marksmen toutes les 3 attaques"}, note:"Joiner aléatoire; le nombre de tours change l’espérance." },
  { id:"hector", name:"Hector", generation:4, troop:"infantry", rarity:"Mythique", verified:true, source:"Fitz registry", primary:{ name:"Survival Instincts", values:[10,20,30,40,50], category:"defense", text:"40% de chance de réduire les dégâts subis" }, leader:{conditional:"Rampant / Blitz; partiellement type-spécifique"}, note:"Leader possible dans les guides; profil à simuler sur rapports réels." },
  { id:"ahmose", name:"Ahmose", generation:4, troop:"infantry", rarity:"Mythique", verified:true, source:"Fitz registry", primary:{ name:"Viper Formation", values:[10,15,20,25,30], category:"defense", text:"Défensif, déclenché par les attaques d’infanterie" }, leader:{conditional:"Dégâts infanterie / vulnérabilité cible"}, note:"Les guides l’écartent souvent du Bear offensif; aucune pondération codée." },
  { id:"gwen", name:"Gwen", generation:5, troop:"marksman", rarity:"Mythique", verified:true, source:"Fitz registry", primary:{ name:"Eagle Vision", values:[5,10,15,20,25], category:"enemyDefense", text:"Augmente les dégâts subis par la cible" }, leader:{enemyDefense:25,conditional:"Dégâts à cadence 4/5 attaques"}, note:"Effet cible permanent listé; ordre avec les autres debuffs non vérifié." },
  { id:"norah", name:"Norah", generation:5, troop:"lancer", rarity:"Mythique", verified:true, source:"Fitz registry", primary:{ name:"Combined Arms", values:[3,6,9,12,15], category:"typeDamage", text:"Dégâts infanterie et tireurs; effet défensif associé" }, leader:{typeDamage:15,conditional:"Buff toutes troupes après attaques de lanciers"}, note:"Effet de type : résultat conditionnel au ratio." }
];

const PENDING_HEROES = [
  [6,"Renee","infantry"],[6,"Wayne","lancer"],[6,"Wu Ming","marksman"],
  [7,"Bradley","marksman"],[7,"Edith","infantry"],[7,"Gordon","lancer"],
  [8,"Sonya","lancer"],[8,"Hendrik","infantry"],[8,"Gordon","marksman"],
  [9,"Magnus","marksman"],[9,"Fred","lancer"],[9,"Xura","infantry"],
  [10,"Blanchette","marksman"],[10,"Rufus","lancer"],[10,"Xylona","infantry"],
  [11,"Eleonora","infantry"],[11,"Lloyd","lancer"],[11,"Ligeia","marksman"],
  [12,"Hervor","infantry"],[12,"Karol","lancer"],[12,"Ligeia","marksman"],
  [13,"Gisela","infantry"],[13,"Flora","lancer"],[13,"Vulcanus","marksman"],
  [14,"Elif","infantry"],[14,"Dominic","lancer"],[14,"Cara","marksman"],
  [15,"Hank","infantry"],[15,"Estrella","lancer"],[15,"Viveca","marksman"],
  [16,"Seigel","infantry"],[16,"Ursar","lancer"],[16,"Aisling","marksman"],
  [17,"Aiden","infantry"],[17,"Bertha","lancer"],[17,"Eleanor","marksman"]
].map(([generation,name,troop],index) => ({ id:`pending-${generation}-${index}`, name, generation, troop, rarity:"Mythique", verified:false, source:"WoS Guru roster — skill à confirmer", primary:{name:"À sourcer",values:[0,0,0,0,0],category:"unknown",text:"Description et valeur à importer depuis une source traçable"},leader:{},note:"Visible pour le roster; exclu des calculs jusqu’à validation." }));

const PETS = [
  [1,"Cave Hyena","Croissance / construction",false],[1,"Arctic Wolf","Endurance — non offensif",false],[1,"Musk Ox","Ressources — non offensif",false],
  [2,"Giant Tapir","Ressources — non offensif",false],[2,"Titan Roc","Réduction HP ennemie; applicabilité Bear à valider",true],
  [3,"Giant Elk","Effet à vérifier",false],[3,"Snow Leopard","Marche / létalité; durée à vérifier",true],
  [4,"Cave Lion","Attaque de troupes; effet permanent à vérifier",true],[4,"Snow Ape","Effet combat à vérifier",true],
  [5,"Iron Rhino","Effet combat à vérifier",true],[5,"Saber-tooth Tiger","Effet combat à vérifier",true],
  [6,"Mammoth","Effet combat à vérifier",true],[6,"Frost Gorilla","Effet combat à vérifier",true],[7,"Frostscale Chameleon","Effet combat à vérifier",true]
].map(([generation,name,skill,combat])=>({generation,name,skill,combat}));

let heroes = [...CORE_HEROES, ...PENDING_HEROES];
let heroFilter = "all";
let observations = JSON.parse(localStorage.getItem(OBSERVATIONS_KEY) || "[]");
let heroState = {};
let petState = {};

const $ = (id) => document.getElementById(id);
const money = new Intl.NumberFormat("fr-FR");
const allFields = ["profileName","generation","trapLevel","marchCapacity","rallyCapacity","marches","standardJoiners","infTier","infFc","infQty","lancerTier","lancerFc","lancerQty","markTier","markFc","markQty","globalAttack","marksAttack","globalLethality","marksLethality","globalDamage","enemyDefenseDown","buffCity","buffMinister","buffChief","buffResearch","buffHeroGear","buffPets"];

function populateSelects() {
  $("generation").innerHTML = Array.from({length:17},(_,i)=>`<option value="${i+1}">Génération ${i+1}</option>`).join("");
  $("generation").value = "4";
  for (const id of ["infTier","lancerTier","markTier"]) {
    $(id).innerHTML = Array.from({length:11},(_,i)=>`<option value="${i+1}" ${i===9?"selected":""}>T${i+1}</option>`).join("");
  }
  for (const id of ["infFc","lancerFc","markFc"]) {
    $(id).innerHTML = Array.from({length:6},(_,i)=>`<option value="${i}">${i===0?"Standard":`FC ${i}`}</option>`).join("");
  }
  $("customHeroGeneration").innerHTML = Array.from({length:17},(_,i)=>`<option value="${i+1}">Génération ${i+1}</option>`).join("");
}

function safe(value) { return Math.max(0, Number(value) || 0); }
function selectedGeneration() { return safe($("generation").value) || 1; }
function troopLabel(troop) { return ({infantry:"Infanterie",lancer:"Lancier",marksman:"Tireur"})[troop] || troop; }
function categoryLabel(category) { return ({damage:"Dégâts toutes troupes",attack:"Attaque toutes troupes",lethality:"Létalité",enemyDefense:"Défense ennemie",normalDamage:"Attaques normales",typeDamage:"Dégâts par type",conditional:"Proc / cadence",defense:"Défensif",health:"Santé",unknown:"À vérifier"})[category] || "À vérifier"; }
function initialHeroState(hero) { return { owned:!!hero.owned, skill:5, stars:4, widget:0 }; }
function getHeroState(id) { return heroState[id] || initialHeroState(heroes.find(h=>h.id===id) || {}); }
function setHeroState(id, next) { heroState[id] = {...getHeroState(id),...next}; }

function renderHeroes() {
  const gen = selectedGeneration();
  const list = heroes.filter(hero => hero.generation <= gen).filter(hero => {
    const state = getHeroState(hero.id);
    return heroFilter === "all" || (heroFilter === "owned" && state.owned) || (heroFilter === "verified" && hero.verified);
  });
  $("heroGrid").innerHTML = list.map(hero => {
    const state = getHeroState(hero.id);
    const value = hero.primary.values[(state.skill || 1) - 1] || 0;
    const status = hero.verified ? "<span class=\"status-chip verified\">sourcé</span>" : "<span class=\"status-chip pending\">à vérifier</span>";
    return `<article class="hero-card ${state.owned?"owned":""} ${hero.verified?"":"pending"}" data-hero="${hero.id}">
      <div class="hero-head"><div><h3 class="hero-name">${hero.name}</h3><div class="hero-meta">G${hero.generation} · ${hero.rarity} · ${troopLabel(hero.troop)}</div></div>${status}</div>
      <p class="hero-skill"><b>${hero.primary.name} · ${categoryLabel(hero.primary.category)}</b>${hero.primary.text}${value ? ` <strong>+${value}%</strong>` : ""}</p>
      <div class="hero-controls"><label>Skill 1<select class="hero-skill-select" data-id="${hero.id}" ${hero.verified?"":"disabled"}>${[1,2,3,4,5].map(n=>`<option value="${n}" ${state.skill===n?"selected":""}>Niv. ${n}</option>`).join("")}</select></label><label class="own-check"><input class="hero-owned" data-id="${hero.id}" type="checkbox" ${state.owned?"checked":""} /> Possédé</label></div>
      <p class="hero-source">${hero.note}<br>Source : ${hero.source}</p>
    </article>`;
  }).join("") || `<p class="muted">Aucun héros ne correspond à ce filtre. Changez la génération ou ajoutez une fiche locale.</p>`;
  document.querySelectorAll(".hero-owned").forEach(el => el.addEventListener("change", e => { setHeroState(e.target.dataset.id,{owned:e.target.checked}); renderHeroes(); }));
  document.querySelectorAll(".hero-skill-select").forEach(el => el.addEventListener("change", e => setHeroState(e.target.dataset.id,{skill:safe(e.target.value)})));
}

function renderPets() {
  const gen = selectedGeneration();
  $("petGrid").innerHTML = PETS.filter(p=>p.generation<=gen).map((pet,index)=>{
    const key = `${pet.generation}-${pet.name}`; const checked = !!petState[key];
    return `<article class="pet-card ${checked?"active":""}"><label><input type="checkbox" data-pet="${key}" ${checked?"checked":""} /><span><strong>${pet.name}</strong><small>G${pet.generation} · ${pet.skill}</small></span></label></article>`;
  }).join("");
  document.querySelectorAll("[data-pet]").forEach(el=>el.addEventListener("change",e=>{ petState[e.target.dataset.pet]=e.target.checked; renderPets(); }));
}

function getOwnedVerifiedHeroes() { return heroes.filter(hero=>hero.verified && hero.generation<=selectedGeneration() && getHeroState(hero.id).owned); }
function heroVector(hero, includeLeader = true) {
  const level = getHeroState(hero.id).skill || 1;
  const value = hero.primary.values[level-1] || 0;
  const vector = {damage:0,attack:0,lethality:0,enemyDefense:0,normalDamage:0,typeDamage:0,conditional:[]};
  if (hero.primary.category === "damage") vector.damage += value;
  if (hero.primary.category === "attack") vector.attack += value;
  if (hero.primary.category === "lethality") vector.lethality += value;
  if (hero.primary.category === "enemyDefense") vector.enemyDefense += value;
  if (hero.primary.category === "normalDamage") vector.normalDamage += value;
  if (hero.primary.category === "typeDamage") vector.typeDamage += value;
  if (hero.primary.category === "conditional") vector.conditional.push(`${hero.name}: ${hero.primary.name}`);
  if (includeLeader) {
    for (const [key,valueFromLeader] of Object.entries(hero.leader || {})) {
      if (typeof valueFromLeader === "number" && key in vector && key !== hero.primary.category) vector[key] += valueFromLeader;
      if (typeof valueFromLeader === "string") vector.conditional.push(`${hero.name}: ${valueFromLeader}`);
    }
  }
  return vector;
}
function addVector(one,two) { const result={...one,conditional:[...(one.conditional||[]),...(two.conditional||[])]}; ["damage","attack","lethality","enemyDefense","normalDamage","typeDamage"].forEach(k=>result[k]=(one[k]||0)+(two[k]||0)); return result; }
function sumVector(list) { return list.reduce((acc,hero)=>addVector(acc,heroVector(hero,true)),{damage:0,attack:0,lethality:0,enemyDefense:0,normalDamage:0,typeDamage:0,conditional:[]}); }
function compareVector(a,b) { const keys=["damage","attack","lethality","enemyDefense","normalDamage","typeDamage"]; const atLeast=keys.every(k=>a[k]>=b[k]); const greater=keys.some(k=>a[k]>b[k]); return atLeast&&greater; }
function combinations(items,size) { const out=[]; const walk=(start,current)=>{ if(current.length===size){out.push(current);return;} for(let i=start;i<items.length;i++)walk(i+1,[...current,items[i]]);}; walk(0,[]); return out; }

function getTroopStocks() {
  return [
    {key:"infantry",label:"Infanterie",qty:safe($("infQty").value),tier:$("infTier").value,fc:$("infFc").value},
    {key:"lancer",label:"Lanciers",qty:safe($("lancerQty").value),tier:$("lancerTier").value,fc:$("lancerFc").value},
    {key:"marksman",label:"Tireurs",qty:safe($("markQty").value),tier:$("markTier").value,fc:$("markFc").value}
  ];
}
function allocateMarches(count, capacity) {
  const stocks=Object.fromEntries(getTroopStocks().map(s=>[s.key,s.qty])); const plans=[];
  for(let i=0;i<count;i++){
    const remaining=Object.values(stocks).reduce((a,b)=>a+b,0); const cap=Math.min(capacity,remaining); if(!cap)break;
    const plan={infantry:0,lancer:0,marksman:0,total:0};
    for(const [key,ratio] of [["infantry",.1],["lancer",.1],["marksman",.8]]){const requested=Math.floor(cap*ratio);const pulled=Math.min(requested,stocks[key]);plan[key]+=pulled;stocks[key]-=pulled;plan.total+=pulled;}
    let gap=cap-plan.total; for(const key of ["marksman","lancer","infantry"]){if(!gap)break;const pulled=Math.min(gap,stocks[key]);plan[key]+=pulled;stocks[key]-=pulled;plan.total+=pulled;gap-=pulled;}
    plans.push(plan);
  }
  return plans;
}
function formatTroops(plan) { return `I ${money.format(plan.infantry)} · L ${money.format(plan.lancer)} · T ${money.format(plan.marksman)}`; }
function globalVector() { return {attack:safe($("globalAttack").value)+safe($("marksAttack").value)+safe($("trapLevel").value)*5,lethality:safe($("globalLethality").value)+safe($("marksLethality").value),damage:safe($("globalDamage").value),enemyDefense:safe($("enemyDefenseDown").value)}; }

function optimize() {
  const owned=getOwnedVerifiedHeroes();
  if(owned.length<3){ $("results").className="results"; $("results").innerHTML=`<div class="empty-warning">Ajoutez au moins trois héros <strong>sourcés et possédés</strong>. Les fiches « à vérifier » restent intentionnellement exclues de la recommandation.</div>`; return; }
  const candidates=combinations(owned,3).map(team=>({team,vector:sumVector(team)}));
  // We only call a candidate "unambiguous" if it Pareto-dominates every other candidate.
  const frontier=candidates.filter(candidate=>!candidates.some(other=>compareVector(other.vector,candidate.vector)));
  const maxDirect=Math.max(...candidates.map(c=>c.vector.damage));
  const directBest=candidates.filter(c=>c.vector.damage===maxDirect);
  const chosen=directBest.sort((a,b)=>(b.vector.attack+b.vector.lethality)-(a.vector.attack+a.vector.lethality))[0];
  const used=new Set(chosen.team.map(h=>h.id));
  const joinerCandidates=owned.filter(h=>!used.has(h.id)).sort((a,b)=>{
    const av=heroVector(a,false),bv=heroVector(b,false); return (bv.damage+bv.attack+bv.lethality)-(av.damage+av.attack+av.lethality);
  });
  const marches=Math.max(1,Math.min(8,safe($("marches").value)||1)); const capacity=Math.max(1,safe($("marchCapacity").value)); const allocations=allocateMarches(marches,capacity);
  const roles=allocations.map((allocation,index)=>{
    if(index===0)return {role:"MON RALLY · leader",heroes:chosen.team.map(h=>h.name).join(" · "),allocation};
    const hero=joinerCandidates[index-1]; return {role:"RALLY REJOINT",heroes:hero?`${hero.name} en slot 1 · Jasser · Seo-yoon` : "Sans héros admissible restant",allocation};
  });
  const vector=addVector(chosen.vector,{...globalVector(),normalDamage:0,typeDamage:0,conditional:[]});
  const unresolved=[];
  if(frontier.length>1) unresolved.push(`${frontier.length} équipes sont sur la frontière de Pareto : aucun ordre d’application public ne permet de les départager entièrement.`);
  if(vector.attack || vector.lethality || vector.enemyDefense || vector.normalDamage || vector.typeDamage) unresolved.push("Attaque, létalité, dégâts normaux, dégâts par type et défense ennemie restent séparés : aucun multiplicateur commun n’est appliqué.");
  if(chosen.vector.conditional.length) unresolved.push(`${chosen.vector.conditional.length} skill(s) à proc / cadence ne sont pas convertis en espérance sans durée et nombre de tours observés.`);
  if(safe($("standardJoiners").value)>=4) unresolved.push("Le profil standard contient de nombreux Jessie : l’ordre d’arrivée et la règle exacte de doublons peuvent empêcher votre skill joiner d’entrer dans les 4 actifs.");
  const availablePets=PETS.filter(p=>petState[`${p.generation}-${p.name}`]&&p.combat).map(p=>p.name);
  if(availablePets.length) unresolved.push(`Pets activés (${availablePets.join(", ")}) : fenêtre de durée / applicabilité Bear à vérifier avant de les utiliser dans une comparaison.`);
  const directNames=chosen.team.filter(h=>heroVector(h,true).damage>0).map(h=>h.name).join(", ") || "aucun";
  $("results").className="results";
  $("results").innerHTML=`<div class="result-grid">
    <article class="result-card"><p class="result-kicker">LEADER CONSEILLÉ · BORNE BASSE</p><h3>${chosen.team.map(h=>h.name).join(" · ")}</h3><p class="recommendation">Cette équipe maximise la somme des <strong>bonus permanents de dégâts toutes troupes documentés</strong> (${directNames}). Ce n’est pas un total de dégâts ingame.</p><div class="vector"><span>Dégâts listés<b>+${vector.damage} pts</b></span><span>Attaque listée<b>+${vector.attack}%</b></span><span>Létalité<b>+${vector.lethality}%</b></span><span>Déf. cible<b>−${vector.enemyDefense}%</b></span></div></article>
    <article class="result-card"><p class="result-kicker">RÉPARTITION SIMULTANÉE · SCÉNARIO STANDARD</p><h3>${roles.length} marche(s) planifiée(s)</h3><div class="rally-plan">${roles.map((r,i)=>`<div class="rally-line"><span class="rally-number">${i+1}</span><div><div class="role">${r.role}</div><div class="heroes">${r.heroes}</div></div><div class="troops">${formatTroops(r.allocation)}<br><span>${money.format(r.allocation.total)} unités</span></div></div>`).join("")}</div><p class="microcopy">Allocation communautaire 10 / 10 / 80, limitée par les stocks et la capacité. Elle est proposée comme doctrine, jamais comme coefficient caché.</p></article>
    <article class="result-card"><p class="result-kicker">AUDIT DE CONFIANCE</p><h3>Ce que le moteur refuse de deviner</h3><div class="audit-list"><div class="audit-item good"><i></i><span>Slots 1 des joiners et limite de quatre pris en compte comme règle très probable.</span></div>${unresolved.map(item=>`<div class="audit-item"><i></i><span>${item}</span></div>`).join("") || `<div class="audit-item"><i></i><span>Ajoutez des rapports réels pour comparer les types de bonus.</span></div>`}</div></article>
  </div><div class="result-footer">Décision robuste : utilisez ce leader pour les bonus permanents établis et ${joinerCandidates[0]?`préparez <strong>${joinerCandidates[0].name}</strong> en slot 1 pour rejoindre.`:"n’avez pas de héros joiner sourcé disponible après avoir formé le leader."} Décision encore conditionnelle : nombre de rallies à lancer, procs, pets et pondération entre attaque/létalité/dégâts.</div>`;
  $("results").scrollIntoView({behavior:"smooth",block:"nearest"});
}

function renderObservations() {
  $("observationList").innerHTML=observations.length ? observations.slice().reverse().map(o=>`<div class="observation"><div><b>${money.format(o.damage)} dégâts</b> · ${o.type==="leader"?"mon rally":"rally rejoint"}<small>${o.note || "Sans note"}</small></div><div>${o.runs} essai${o.runs>1?"s":""}</div></div>`).join("") : `<p class="muted">Aucun rapport sauvegardé sur cet appareil.</p>`;
}
function addObservation() { const damage=safe($("observedDamage").value); if(!damage)return; observations.push({damage,type:$("observationType").value,runs:Math.max(1,safe($("observationRuns").value)),note:$("observationNote").value.trim(),createdAt:new Date().toISOString()}); localStorage.setItem(OBSERVATIONS_KEY,JSON.stringify(observations)); $("observedDamage").value=""; $("observationNote").value=""; renderObservations(); }

function profilePayload() { const fields={}; allFields.forEach(id=>{ const el=$(id); fields[id]=el.type==="checkbox"?el.checked:el.value; }); return {version:1,createdAt:new Date().toISOString(),fields,heroState,petState,customHeroes:heroes.filter(h=>h.id.startsWith("custom-")),observations}; }
function saveProfile(showMessage=true) { localStorage.setItem(STORAGE_KEY,JSON.stringify(profilePayload())); if(showMessage){ const button=$("saveProfile");const old=button.textContent;button.textContent="Enregistré";setTimeout(()=>button.textContent=old,1300); } }
function loadProfile() { const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||"null"); if(!saved)return; applyProfile(saved); }
function applyProfile(payload) { if(!payload)return; (payload.customHeroes||[]).forEach(hero=>{if(!heroes.some(h=>h.id===hero.id))heroes.push(hero);}); Object.entries(payload.fields||{}).forEach(([id,value])=>{const el=$(id);if(el)el.type==="checkbox"?el.checked=!!value:el.value=value;}); heroState=payload.heroState||{};petState=payload.petState||{};observations=payload.observations||observations; renderHeroes();renderPets();renderObservations(); }
function downloadProfile() { const blob=new Blob([JSON.stringify(profilePayload(),null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`bearlab-${($("profileName").value||"profil").replace(/[^\w-]+/g,"-")}.json`;a.click();URL.revokeObjectURL(url); }
function importProfile(file) { const reader=new FileReader(); reader.onload=()=>{try{applyProfile(JSON.parse(reader.result));saveProfile(false);}catch{alert("Le fichier n’est pas un profil BearLab valide.");}};reader.readAsText(file); }

function addCustomHero(event) { event.preventDefault(); const name=$("customHeroName").value.trim(); if(!name)return; const category=$("customHeroCategory").value; const val=safe($("customHeroValue").value); const hero={id:`custom-${Date.now()}`,name,generation:safe($("customHeroGeneration").value)||1,troop:$("customHeroClass").value,rarity:"Local",verified:false,source:$("customHeroSource").value.trim()||"Note locale — à sourcer",primary:{name:$("customHeroSkill").value.trim(),values:[val,val,val,val,val],category,text:"Valeur saisie localement; vérification nécessaire"},leader:{},note:"Fiche locale exclue du calcul tant qu’elle n’est pas corroborée."}; heroes.push(hero); setHeroState(hero.id,{owned:true,skill:5}); $("heroDialog").close(); event.target.reset(); $("customHeroGeneration").value=selectedGeneration(); renderHeroes(); saveProfile(false); }

function initEvents() {
  $("generation").addEventListener("change",()=>{renderHeroes();renderPets();});
  document.querySelectorAll(".nav-pill").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".nav-pill").forEach(b=>b.classList.remove("active"));btn.classList.add("active");$(btn.dataset.target).scrollIntoView({behavior:"smooth",block:"start"});}));
  document.querySelectorAll(".filter-button").forEach(btn=>btn.addEventListener("click",()=>{heroFilter=btn.dataset.filter;document.querySelectorAll(".filter-button").forEach(b=>b.classList.toggle("active",b===btn));renderHeroes();}));
  $("optimize").addEventListener("click",optimize); $("saveProfile").addEventListener("click",()=>saveProfile()); $("exportProfile").addEventListener("click",downloadProfile); $("importProfile").addEventListener("change",e=>e.target.files[0]&&importProfile(e.target.files[0]));
  $("addHero").addEventListener("click",()=>{$("customHeroGeneration").value=selectedGeneration();$("heroDialog").showModal();}); $("customHeroForm").addEventListener("submit",addCustomHero);
  $("addObservation").addEventListener("click",addObservation); $("clearObservations").addEventListener("click",()=>{observations=[];localStorage.removeItem(OBSERVATIONS_KEY);renderObservations();});
  allFields.forEach(id=>$(id)?.addEventListener("change",()=>saveProfile(false)));
}

populateSelects(); loadProfile(); renderHeroes(); renderPets(); renderObservations(); initEvents();
