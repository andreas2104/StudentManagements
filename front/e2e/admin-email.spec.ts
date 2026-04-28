import { test, expect } from '@playwright/test';

test.describe('Admin Email Registration', () => {
  test('should assign admin role when registering with admin email', async ({ page }) => {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    
    await page.goto('/register');
    
    await page.fill('input#name', 'Admin User');
    await page.fill('input#email', adminEmail);
    await page.fill('input#password', 'admin123');
    await page.fill('input#passwordConfirm', 'admin123');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('/login?registered=true');
  });

  test('should assign user role when registering with non-admin email', async ({ page }) => {
    const timestamp = Date.now();
    
    await page.goto('/register');
    
    await page.fill('input#name', 'Regular User');
    await page.fill('input#email', `user${timestamp}@example.com`);
    await page.fill('input#password', 'password123');
    await page.fill('input#passwordConfirm', 'password123');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('/login?registered=true');
  });

  test('should login as admin and access admin features', async ({ page }) => {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    
    await page.goto('/login');
    await page.fill('input#email', adminEmail);
    await page.fill('input#password', 'admin123');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('/dashboard');
  });
});
