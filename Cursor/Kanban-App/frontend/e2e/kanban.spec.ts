import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "serial" });

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 900 });
  await page.goto("/");
  await expect(page.getByTestId("kanban-board")).toBeVisible();
});

test("loads dummy cards", async ({ page }) => {
  await expect(page.getByTestId("card-card-1")).toContainText("Design system");
});

test("adds a card to a column", async ({ page }) => {
  const ready = page.getByTestId("column-col-ready");
  await ready.scrollIntoViewIfNeeded();
  await ready.getByRole("button", { name: "Add card" }).click();
  const titleInput = ready.getByTestId("new-card-title-col-ready");
  await expect(titleInput).toBeVisible();
  await titleInput.fill("E2E task");
  await ready.getByTestId("new-card-details-col-ready").fill("Created by Playwright");
  await ready.getByTestId("submit-card-col-ready").click();
  await expect(ready).toContainText("E2E task");
});

test("deletes a card", async ({ page }) => {
  const card = page.getByTestId("card-card-6");
  await card.scrollIntoViewIfNeeded();
  await expect(card).toBeVisible();
  await card.getByRole("button", { name: "Delete" }).click();
  await expect(page.getByTestId("card-card-6")).toHaveCount(0);
});

test("renames a column", async ({ page }) => {
  const backlog = page.getByTestId("column-col-backlog");
  await backlog.scrollIntoViewIfNeeded();
  await backlog.getByTestId("column-title-col-backlog").click();
  const input = backlog.getByTestId("column-title-input-col-backlog");
  await expect(input).toBeVisible();
  await input.fill("Ideas");
  await input.blur();
  await expect(backlog).toContainText("Ideas");
});

test("drags a card into another column", async ({ page }) => {
  const sourceCard = page.getByTestId("card-card-1");
  const handle = sourceCard.getByRole("button", { name: "Drag card" });
  const target = page.getByTestId("column-col-done");

  await sourceCard.scrollIntoViewIfNeeded();
  await target.scrollIntoViewIfNeeded();

  const hb = await handle.boundingBox();
  const tb = await target.boundingBox();
  expect(hb).toBeTruthy();
  expect(tb).toBeTruthy();

  await page.mouse.move(hb!.x + hb!.width / 2, hb!.y + hb!.height / 2);
  await page.mouse.down();
  await page.mouse.move(tb!.x + tb!.width / 2, tb!.y + Math.min(120, tb!.height / 2), {
    steps: 20,
  });
  await page.mouse.up();

  await expect(target.getByTestId("card-card-1")).toBeVisible();
});
