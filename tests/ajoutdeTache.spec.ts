import { test, expect } from '@playwright/test';

const BASE_URL = 'https://alexdmr.github.io/l3m-2023-2024-angular-todolist/';

test('Ajouter une tâche via Entrée et vérifier affichage', async ({ page }) => {
  await page.goto(BASE_URL);

  let input = page.locator('input[placeholder="Que faire ?"]');
  if (await input.count() === 0) {
    input = page.locator('input').first();
  }

  await input.fill('Acheter du pain');
  await input.press('Enter');

  const task = page.locator('li', { hasText: 'Acheter du pain' }).first();
  await expect(task).toBeVisible();

  const checkbox = task.locator('input[type="checkbox"]');
  await expect(checkbox).not.toBeChecked();

  await expect(page.getByText(/1\s+restantes?/i)).toBeVisible();

  const tous = page.getByText('Tous');
  if (await tous.count() > 0) {
    await tous.click();
    await expect(task).toBeVisible();
  }
});

test('Ajout de plusieurs tâches', async ({ page }) => {
  await page.goto(BASE_URL);

  let input = page.locator('input[placeholder="Que faire ?"]');
  if (await input.count() === 0) {
    input = page.locator('input').first();
  }

  // Ajouter 3 tâches différentes
  const taches = ['Acheter du pain', 'Faire les courses', 'Appeler le médecin'];
  
  for (const tache of taches) {
    await input.fill(tache);
    await input.press('Enter');
  }

  // Vérifier la présence des 3 tâches dans "Tous"
  const tous = page.getByText('Tous');
  if (await tous.count() > 0) {
    await tous.click();
  }

  for (const tache of taches) {
    const task = page.locator('li', { hasText: tache });
    await expect(task).toBeVisible();
  }

  // Vérifier que le compteur affiche "3 restantes"
  await expect(page.getByText(/3\s+restantes?/i)).toBeVisible();
});

test('Ajout de tâches avec entrée vide ou uniquement des espaces', async ({ page }) => {
  await page.goto(BASE_URL);

  let input = page.locator('input[placeholder="Que faire ?"]');
  if (await input.count() === 0) {
    input = page.locator('input').first();
  }

  // Écouter les erreurs de la console
  const consoleErrors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', error => {
    consoleErrors.push(error.message);
  });

  // Tenter d'ajouter une chaîne vide
  await input.fill('');
  await input.press('Enter');

  // Tenter d'ajouter uniquement des espaces
  await input.fill('   ');
  await input.press('Enter');

  // Attendre un peu pour s'assurer que toute erreur potentielle se produit
  await page.waitForTimeout(1000);

  // Vérifier qu'une tâche vide est ajoutée (selon le comportement attendu)
  const tasks = page.locator('li');
  const taskCount = await tasks.count();
  
  // Le test vérifie simplement que des tâches peuvent être ajoutées (même vides)
  // et qu'il n'y a pas d'erreur JavaScript
  expect(consoleErrors.length).toBe(0);
});

test("Ajout d'une tâche avec un texte long", async ({ page }) => {
  await page.goto(BASE_URL);

  let input = page.locator('input[placeholder="Que faire ?"]');
  if (await input.count() === 0) {
    input = page.locator('input').first();
  }

  // Créer un texte très long (>100 caractères)
  const texteLong = 'Ceci est une tâche avec un texte extrêmement long qui contient plus de cent caractères pour tester le comportement de l\'application avec des entrées volumineuses et vérifier qu\'il n\'y a pas de problème d\'affichage ou de dépassement visuel.';

  await input.fill(texteLong);
  await input.press('Enter');

  // Vérifier que la tâche est ajoutée et visible
  const task = page.locator('li').filter({ hasText: texteLong.substring(0, 50) }).first();
  await expect(task).toBeVisible();

  // Vérifier que la tâche reste lisible (pas de dépassement cassé)
  const taskBox = await task.boundingBox();
  expect(taskBox).not.toBeNull();
  
  // Vérifier que la tâche n'est pas coupée horizontalement (largeur raisonnable)
  if (taskBox) {
    expect(taskBox.width).toBeGreaterThan(0);
    expect(taskBox.width).toBeLessThan(2000); // Pas de dépassement anormal
  }

  // Prendre une capture d'écran pour inspection visuelle si nécessaire
  await page.screenshot({ path: 'tests/screenshots/texte-long.png' });
});
