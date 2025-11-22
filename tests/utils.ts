// Fonctions utilitaires pour les tests

import {expect, Page} from "@playwright/test";

export async function init(page: Page): Promise<void> {
    await page.goto('');
}

export async function creerTache(page: Page, nom: string): Promise<void> {
    const todoInput = page.getByRole('textbox', { name: 'Que faire?' });
    await todoInput.fill(nom);
    await todoInput.press('Enter');
}

export async function checkNombreTache(page: Page, nombre: number): Promise<void> {
    await expect(page.getByText(new RegExp(`${nombre}\\s+restantes?`, 'i'))).toBeVisible();
}