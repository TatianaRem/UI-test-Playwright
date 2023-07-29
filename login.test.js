const { test, expect } = require("@playwright/test");
const registrationData = require("./user.js");

test("Успешная авторизация", async ({ page }) => {
  const { email, password } = registrationData;

  await page.goto("https://netology.ru/?modal=sign_in");
  await page.waitForLoadState("networkidle");
  const emailInput = page.locator('[name="email"]');
  await emailInput.fill(email);
  const passwordInput = page.locator('[name="password"]');
  await passwordInput.fill(password);
  const submitInput = page.locator('[data-testid="login-submit-btn"]');
  await submitInput.click();

  await expect(page.locator("text=Мои курсы и профессии")).toBeVisible({
    timeout: 30000,
  });
});

test("Неуспешная авторизация", async ({ page }) => {
  const invalidEmail = "invalidemail@mail.com";
  const invalidPassword = "invalidpassword";

  await page.goto("https://netology.ru/?modal=sign_in");
  const emailInput = page.locator('[name="email"]');
  await emailInput.fill(invalidEmail);
  const passwordInput = page.locator('[name="password"]');
  await passwordInput.fill(invalidPassword);
  const submitInput = page.locator('[data-testid="login-submit-btn"]');
  await submitInput.click();

  await page.locator('[data-testid="login-error-hint"]');
});
