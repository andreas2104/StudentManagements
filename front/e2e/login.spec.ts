import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test('should display login form', async ({ page }) => {
    await page.goto('/login');
    
    await expect(page.locator('h2')).toHaveText('Se connecter');
    await expect(page.locator('input#email')).toBeVisible();
    await expect(page.locator('input#password')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toHaveText('Se connecter');
  });

  test('should show error on invalid credentials', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('input#email', 'invalid@test.com');
    await page.fill('input#password', 'wrongpassword');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('.bg-red-500\\/10')).toBeVisible();
  });

  test('should navigate to register page', async ({ page }) => {
    await page.goto('/login');
    
    await page.click('text=S\'inscrire');
    await expect(page).toHaveURL('/register');
  });

  test('should login with valid credentials', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('input#email', 'test@example.com');
    await page.fill('input#password', 'password123');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('/dashboard');
  });
});
