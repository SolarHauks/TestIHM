import {test, expect, Page} from '@playwright/test';
import {checkNombreTache, creerTache, init} from "./utils";

export async function setup(page: Page): Promise<void> {
    await init(page)

    // Ajouter une tache coché
    await creerTache(page, "Test");

    // Compléter la tache
    await page.locator('input[name="done"]').check()

    // Ajouter une autre tache
    await creerTache(page, "Test2");
}

export async function changerOnglet(page: Page, titre: string): Promise<void> {
    await page.getByText(titre).click();
}

test('filtre Tous', async ({page}) => {
    await setup(page);

    // Passer sur l'onglet Tous
    await changerOnglet(page, "Tous")

    await expect(page.getByText('Test', { exact: true })).toBeVisible();
    await expect(page.getByText('Test2', { exact: true })).toBeVisible();
});

test('filtre Actifs', async ({page}) => {
    await setup(page);

    // Passer sur l'onglet Actif
    await changerOnglet(page, "Actifs")

    await expect(page.getByText('Test', { exact: true })).toBeHidden();
    await expect(page.getByText('Test2', { exact: true })).toBeVisible();
});

test('filtre Complétés', async ({page}) => {
    await setup(page);

    // Passer sur l'onglet Complétés
    await changerOnglet(page, "Complétés")

    await expect(page.getByText('Test', { exact: true })).toBeVisible();
    await expect(page.getByText('Test2', { exact: true })).toBeHidden();
});

test('changement de filtre', async ({page}) => {
    await setup(page);

    await changerOnglet(page, "Tous")
    await changerOnglet(page, "Actifs")
    await changerOnglet(page, "Complétés")
    await changerOnglet(page, "Tous")

    await expect(page.getByText('Test', { exact: true })).toBeVisible();
    await expect(page.getByText('Test2', { exact: true })).toBeVisible();
});