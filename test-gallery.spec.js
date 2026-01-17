const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://127.0.0.1:9998/index.html';

test.describe('갤러리 이미지 검증', () => {
  test('PC - 갤러리 이미지 개수 및 레이아웃', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);
    
    const images = await page.locator('.slider-for2 .photo-item:not(.slick-cloned) img').all();
    expect(images.length).toBe(18);
    
    const thumbs = await page.locator('.slider-nav2 .photo-item:not(.slick-cloned)').all();
    expect(thumbs.length).toBe(18);
    
    await expect(page.locator('.slider-for2 .photo-item img').first()).toBeVisible();
  });

  test('모바일 - 갤러리 이미지 개수 및 레이아웃', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE_URL);
    
    const images = await page.locator('.slider-for2 .photo-item:not(.slick-cloned) img').all();
    expect(images.length).toBe(18);
    
    const thumbs = await page.locator('.slider-nav2 .photo-item:not(.slick-cloned)').all();
    expect(thumbs.length).toBe(18);
    
    await expect(page.locator('.slider-for2 .photo-item img').first()).toBeVisible();
  });
});

test.describe('신랑/신부 영역 검증', () => {
  test('PC - 신랑/신부 이미지 위치 동일', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);
    
    const groomImg = page.locator('img[src*="신랑사진"]');
    const brideImg = page.locator('img[src*="신부사진"]');
    
    const groomBox = await groomImg.boundingBox();
    const brideBox = await brideImg.boundingBox();
    
    expect(Math.abs(groomBox.y - brideBox.y)).toBeLessThan(5);
  });

  test('모바일 - 신랑/신부 이미지 위치 동일', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE_URL);
    
    const groomImg = page.locator('img[src*="신랑사진"]');
    const brideImg = page.locator('img[src*="신부사진"]');
    
    const groomBox = await groomImg.boundingBox();
    const brideBox = await brideImg.boundingBox();
    
    expect(Math.abs(groomBox.y - brideBox.y)).toBeLessThan(5);
  });
});
