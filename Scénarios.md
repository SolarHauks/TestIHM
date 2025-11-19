# Scénarios de test fonctionnels

### 1. Ajout de tâche (barre principale)

1. **Ajout basique**
	- Étapes :
		1. Saisir `Acheter du pain` dans le champ “Que faire ?”.
		2. Valider (touche Entrée ou bouton si présent).
	- Résultats attendus :
		- La tâche apparaît dans la liste avec :
			- un texte correct,
			- une case à cocher non cochée.
		- Le compteur “X restantes” = 1.
		- Le filtre `Tous` affiche la tâche.

2. **Ajout de plusieurs tâches**
	- Saisir 3 tâches différentes.
	- Résultats attendus :
		- présence des 3 tâches dans `Tous`,
		- compteur “X restantes” = 3.

3. **Entrée vide ou espaces**
	- Saisir une chaîne vide ou uniquement des espaces.
	- Résultat attendu :
		- Aucune tâche n’est ajoutée.
		- Pas d’erreur JavaScript dans la console.

4. **Texte long**
	- Saisir une tâche avec un texte très long (plusieurs mots, >100 caractères).
	- Résultats attendus :
		- pas de dépassement visuel cassé,
		- la tâche reste lisible.

---

### 2. Gestion de l’état (Actif / Complété)

1. **Compléter une tâche**
    - Cocher la case d’une tâche active.
    - Résultats attendus :
        - Style visuel modifié (Texte barré, couleur atténuée).
        - Le compteur “restantes” diminue de 1.
        - Le filtre `Complétés` affiche la tâche.
        - Le filtre `Actifs` ne l’affiche plus.

2. **Repasser en actif**
    - Décoche la même tâche.
    - Résultats attendus :
        - Style redevient normal.
        - Compteur “restantes” augmente de 1.
        - La tâche réapparaît en `Actifs`, disparaît de `Complétés`.

3. **Compléter toutes les tâches**
    - Cocher toutes les cases.
    - Résultats attendus :
        - Compteur “restantes” = 0.
        - `Actifs` est vide.
        - `Complétés` contient toutes les tâches.

---

### 3. Filtres de liste

1. **Filtre Tous**
    - Avec un mélange de tâches actives et complétées.
    - Résultat : toutes les tâches sont visibles.

2. **Filtre Actifs**
    - Résultat : uniquement les tâches non cochées.

3. **Filtre Complétés**
   - Résultat : uniquement les tâches cochées.

4. **Changement de filtre**
   - Passer successivement de `Tous` → `Actifs` → `Complétés` plusieurs fois.
   - Résultats : aucune perte de données, affichage cohérent à chaque changement.

---

### 4. Suppression de tâches

1. **Suppression d’une tâche spécifique**
   - Cliquer sur le bouton de suppression (icône X ou poubelle) d’une tâche.
   - Résultats attendus :
       - La tâche disparaît de la liste.
       - Le compteur “restantes” est mis à jour correctement.
       - Elle n’apparaît plus dans aucun filtre.

2. **Suppression de toutes les tâches**
   - Supprimer les tâches une par une.
   - Résultats :
       - La liste devient vide.
       - Compteur à 0.
       - Les filtres n’affichent plus rien.

---

## 5. Scénarios de test – Étape Annuler / Refaire

### 5.1 Boutons Annuler / Refaire

1. **Annuler un ajout**
   - Ajouter une tâche.
   - Cliquer sur `Annuler`.
   - Résultats attendus :
       - La tâche ajoutée disparaît.
       - Compteur revient à la valeur précédente.

2. **Refaire un ajout annulé**
   - Après l’annulation ci‑dessus, cliquer sur `Refaire`.
   - Résultat :
       - La tâche réapparaît.
       - Compteur mis à jour.

3. **Annuler une suppression**
   - Supprimer une tâche existante.
   - Cliquer sur `Annuler`.
   - Résultat :
       - La tâche réapparaît à la même position (si défini).
       - Compteur restauré.

4. **Annuler un changement d’état**
   - Cocher une tâche active.
   - Cliquer sur `Annuler`.
   - Résultat :
       - La tâche redevient non cochée.
       - Compteur revient à la valeur précédente.

5. **Pile d’actions**
   - Enchaîner plusieurs actions (ajout, completion, suppression).
   - Cliquer plusieurs fois sur `Annuler` puis sur `Refaire`.
   - Résultats :
       - Chaque clic `Annuler` annule l’action la plus récente.
       - Chaque clic `Refaire` réapplique l’action précédente dans le bon ordre.

6. **Limite de pile**
   - Cliquer sur `Annuler` plus de fois qu’il n’y a d’actions.
   - Résultat :
       - À partir d’un certain point, plus aucun effet, pas de plantage ni d’erreur console.

### 5.2 Raccourcis clavier CTRL+Z / CTRL+Y

1. **CTRL+Z équivalent à Annuler**
   - Effectuer une action (ex : ajout).
   - Appuyer sur `CTRL+Z`.
   - Résultat :
       - Même comportement que bouton `Annuler`.

2. **CTRL+Y équivalent à Refaire**
   - Suite au test précédent, appuyer sur `CTRL+Y`.
   - Résultat :
       - Même comportement que bouton `Refaire`.

3. **Raccourcis sans focus spécial**
   - Cliquer en dehors des champs de texte, puis tester `CTRL+Z` / `CTRL+Y`.
   - Vérifier :
       - Les raccourcis fonctionnent toujours / ou comportement conforme aux spécifications du prof.
       - Pas d’interférence avec comportement par défaut du navigateur (si bloqué, c’est géré proprement).

---

## 6. Cohérence entre la liste graphique et la JSON

1. **Ajout dans “Liste Miage” (Étape 2)**
   - Saisir un item dans le champ “Ajouter”.
   - Valider.
   - Résultats :
       - L’item apparaît dans la liste sous “Liste Miage”.
       - La représentation JSON (Étape 1) contient l’item dans le tableau `items`.

2. **Mise à jour de l’état**
   - Cocher / décocher l’item dans la section Étape 2.
   - Résultat :
       - Le champ correspondant dans le JSON (`done`, `completed` ou équivalent) est mis à jour.

3. **Suppression via Étape 2**
   - Supprimer un item.
   - Résultat :
       - L’item disparaît de la liste visuelle.
       - L’item disparaît aussi du JSON affiché.

---

## 7. Tests techniques / non fonctionnels

1. **Réactualisation de la page**
   - Créer quelques tâches.
   - Recharger la page.
   - Résultat :
     - Les données sont restaurées (localStorage).