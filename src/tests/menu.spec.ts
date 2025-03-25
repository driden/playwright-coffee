import { test, expect } from '@playwright/test';
import { MenuPage } from '../pages/menu.page';

test.describe('Menu page', () => {
    test('should list all coffee types', async ({ page }) => {
        const menuPage = new MenuPage(page);
        await menuPage.visit();
        const coffees = await menuPage.getCoffeeCups();

        const names = await Promise.all(coffees.map(cup => cup.getName()));
        expect(names).toEqual(["Espresso", "Espresso Macchiato", "Cappuccino", "Mocha", "Flat White", "Americano", "Cafe Latte", "Espresso Con Panna", "Cafe Breve"]);
    });

    test('should list the ingredients of `Mocha`', async ({ page }) => {
        const menuPage = new MenuPage(page);
        await menuPage.visit();

        const mocha = await menuPage.getCoffee("Mocha");

        const ingredients: string[] = await mocha.getIngredients();
        expect(ingredients).toEqual(['espresso', 'chocolate syrup', 'steamed milk', 'whipped cream']);
    });

    test('should list the price of `Cappuccino`', async ({ page }) => {
        const menuPage = new MenuPage(page);
        await menuPage.visit();

        const capuccino = await menuPage.getCoffee("Cappuccino");

        const price: number = await capuccino.getPrice();
        expect(price).toBe(19.00);
    });
});
