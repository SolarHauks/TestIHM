# Plan de test

## 1. Vérifier que le site donné fonctionne correctement :
- ajout / modification / suppression de tâches
- changement d’état (actif / terminé)
- filtres
- persistance des données
- fonctionnalités Annuler / Refaire, ainsi que les raccourcis clavier associés

on choisit ici de ne pas tester le comportement visuel du site lors du redimensionnement de l'écran, 
  ainsi que sur différents navigateurs.

---

## 2. Fonctionnalités visibles sur la capture et le site:

- Barre d’ajout de tâche principale (en haut).
- Compteur de tâches restantes.
- Filtres de vue : `Tous`, `Actifs`, `Complétés`.
- Case à cocher sur chaque tâche (compléter / décompléter).
- Suppression d’une tâche.
- Section “Étape bonus : Annuler / refaire”
  - Boutons `Annuler` / `Refaire`.
  - Raccourcis clavier `CTRL+Z` / `CTRL+Y`.
- Section “Étape 2 – Liste Miage”
  - Ajout d’items dans la liste.
  - Case à cocher, suppression.
- Section “Étape 1”
  - Affichage JSON de la liste (cohérence des données affichées).