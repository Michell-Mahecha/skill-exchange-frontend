const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CAPTURE_DIR = path.join(__dirname, '../capturas/app');
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:3000';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log('Iniciando script de captura con Puppeteer...');
  
  if (!fs.existsSync(CAPTURE_DIR)) {
    fs.mkdirSync(CAPTURE_DIR, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    defaultViewport: { width: 1280, height: 800 }
  });

  const page = await browser.newPage();

  try {
    // 1. Landing Page
    console.log('Capturando Landing Page...');
    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
    await page.screenshot({ path: path.join(CAPTURE_DIR, 'landing.png') });

    // 2. Login Page
    console.log('Capturando Página de Login...');
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle2' });
    await page.screenshot({ path: path.join(CAPTURE_DIR, 'login.png') });

    // Rellenar formulario y hacer login
    console.log('Iniciando sesión...');
    await page.type('#email', 'danielesteban@ufps.edu.co');
    await page.type('#password', '07711');
    await page.click('button[type="submit"]');

    // Esperar a la redirección al dashboard
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    console.log('Login exitoso. Capturando Dashboard...');
    await sleep(1000);
    await page.screenshot({ path: path.join(CAPTURE_DIR, 'dashboard.png') });

    // 3. Catálogo de Skills
    console.log('Capturando Catálogo de Skills...');
    await page.goto(`${BASE_URL}/dashboard/skills`, { waitUntil: 'networkidle2' });
    await sleep(1500);
    await page.screenshot({ path: path.join(CAPTURE_DIR, 'skills_list.png') });

    // 4. Detalle de una Skill
    console.log('Capturando Detalle de Skill...');
    const skillCards = await page.$$('[role="button"]');
    if (skillCards.length > 0) {
      await skillCards[0].click();
      await page.waitForNavigation({ waitUntil: 'networkidle2' });
      await sleep(1500);
      await page.screenshot({ path: path.join(CAPTURE_DIR, 'skill_detail.png') });
    } else {
      console.log('No se encontraron tarjetas de skill, yendo por URL directa...');
      await page.goto(`${BASE_URL}/dashboard/skills/1`, { waitUntil: 'networkidle2' });
      await sleep(1500);
      await page.screenshot({ path: path.join(CAPTURE_DIR, 'skill_detail.png') });
    }

    // 5. Listado de Usuarios
    console.log('Capturando Listado de Usuarios...');
    await page.goto(`${BASE_URL}/dashboard/users`, { waitUntil: 'networkidle2' });
    await sleep(1500);
    await page.screenshot({ path: path.join(CAPTURE_DIR, 'users_list.png') });

    // NUEVA PÁGINA: Metas (Goals)
    console.log('Capturando Listado de Metas de Estudio...');
    await page.goto(`${BASE_URL}/dashboard/goals`, { waitUntil: 'networkidle2' });
    await sleep(1500);
    await page.screenshot({ path: path.join(CAPTURE_DIR, 'goals_list.png') });

    // 6. Vista Mobile con menú hamburguesa
    console.log('Capturando Vista Mobile con menú hamburguesa...');
    await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
    await page.goto(`${BASE_URL}/dashboard/skills`, { waitUntil: 'networkidle2' });
    await sleep(1500);
    
    const menuBtn = await page.$('button[aria-label="Abrir menú"]');
    if (menuBtn) {
      await menuBtn.click();
      await sleep(500);
      await page.screenshot({ path: path.join(CAPTURE_DIR, 'mobile_menu.png') });
    } else {
      console.log('No se encontró el botón del menú hamburguesa.');
      await page.screenshot({ path: path.join(CAPTURE_DIR, 'mobile_view_no_menu.png') });
    }

    console.log('¡Todas las capturas se generaron correctamente en la carpeta capturas/app/!');
  } catch (err) {
    console.error('Error durante la ejecución del script:', err);
  } finally {
    await browser.close();
  }
}

run();
