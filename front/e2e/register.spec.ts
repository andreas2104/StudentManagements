import { test, expect } from '@playwright/test';

test.describe('Register Page', () => {
  test('should display register form', async ({ page }) => {
    await page.goto('/register');
    
    await expect(page.locator('h2')).toHaveText('Créer un compte');
    await expect(page.locator('input#name')).toBeVisible();
    await expect(page.locator('input#email')).toBeVisible();
    await expect(page.locator('input#password')).toBeVisible();
    await expect(page.locator('input#passwordConfirm')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toHaveText('S\'inscrire');
  });

  test('should show error when passwords do not match', async ({ page }) => {
    await page.goto('/register');
    
    await page.fill('input#name', 'Test User');
    await page.fill('input#email', 'test@example.com');
    await page.fill('input#password', 'password123');
    await page.fill('input#passwordConfirm', 'differentpassword');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('.bg-red-50')).toHaveText(/Les mots de passe ne correspondent pas/);
  });

  test('should show error on duplicate email', async ({ page }) => {
    await page.goto('/register');
    
    await page.fill('input#name', 'Test User');
    await page.fill('input#email', 'existing@example.com');
    await page.fill('input#password', 'password123');
    await page.fill('input#passwordConfirm', 'password123');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('.bg-red-50')).toBeVisible();
  });

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/register');
    
    await page.click('text=Se connecter');
    await expect(page).toHaveURL('/login');
  });

  test('should register with valid data', async ({ page }) => {
    const timestamp = Date.now();
    await page.goto('/register');
    
    await page.fill('input#name', 'New User');
    await page.fill('input#email', `newuser${timestamp}@example.com`);
    await page.fill('input#password', 'password123');
    await page.fill('input#passwordConfirm', 'password123');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('/login?registered=true');
  });
});
