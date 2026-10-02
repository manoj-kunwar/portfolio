import { test, expect } from '@playwright/test';

test('End-to-End User Flow: Home -> Projects -> Youth Club -> Open Case Study -> Architecture -> Close -> Contact', async ({ page }) => {
  // 1. Visit Home
  await page.goto('/');
  await expect(page.locator('text=MANOJ KUNWAR')).toBeVisible();
  await expect(page.locator('text=I BUILD')).toBeVisible();

  // 2. Navigate to Projects
  const exploreProjectsBtn = page.locator('text=Explore Engineered Projects');
  await expect(exploreProjectsBtn).toBeVisible();
  await exploreProjectsBtn.click();

  // 3. Verify High School Youth Club is visible
  const youthClubCard = page.locator('text=High School Youth Club').first();
  await expect(youthClubCard).toBeVisible();

  // 4. Open Youth Club Case Study
  // Click on the Youth Club title or Case Study button
  await youthClubCard.click();

  // Verify Case Study dialog opened
  const dialog = page.locator('[role="dialog"]');
  await expect(dialog).toBeVisible();
  await expect(page.locator('text=Information Architecture').or(page.locator('text=System Architecture'))).toBeVisible();

  // 5. Click Architecture tab
  const archTab = page.locator('button[role="tab"]:has-text("Architecture")').first();
  await archTab.click();
  await expect(dialog).toBeVisible();

  // 6. Close Case Study
  const closeBtn = page.locator('button[aria-label="Close case study"]');
  await closeBtn.click();
  await expect(dialog).not.toBeVisible();

  // 7. Navigate to Contact Section
  const contactLink = page.locator('header nav button:has-text("Contact")');
  await contactLink.click();

  // 8. Verify Contact form
  const sendBtn = page.locator('button:has-text("Send Direct Inquiry")');
  await expect(sendBtn).toBeVisible();

  // 9. Test Invalid Form submission (empty fields)
  await sendBtn.click();
  await expect(page.locator('text=Please enter a valid name')).toBeVisible();

  // 10. Test Valid Form submission
  await page.fill('#contact-name', 'E2E Test Reviewer');
  await page.fill('#contact-email', 'reviewer@company.com');
  await page.fill('#contact-subject', 'Full-Stack Engineering Opportunity');
  await page.fill('#contact-message', 'Hello Manoj, we reviewed your portfolio and production MERN systems and would like to arrange an interview.');

  await sendBtn.click();
  await expect(page.locator('text=Inquiry Prepared Successfully!')).toBeVisible();
});
