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

});
