import { initRouter } from "./core/router.js";
import { renderApp } from "./core/renderer.js";

import { initFarmSystem } from "./systems/farm/farmSystem.js";
import { renderPlots } from "./systems/farm/plotRenderer.js";

import { renderInventory } from "./ui/inventoryRenderer.js";
import { renderShop } from "./ui/shopRenderer.js";
import { renderChat } from "./ui/chatRenderer.js";
import { renderClans } from "./ui/clansRenderer.js";
import { renderProfile } from "./ui/profileRenderer.js";

import { devLogin } from "./core/devAuth.js";

async function bootGame() {

  const profile = await devLogin();

  console.log("PLAYER:", profile);

  initRouter();

  initFarmSystem();

  renderPlots();

  renderInventory();

  renderShop();

  renderChat();

  renderClans();

  renderProfile();

  renderApp();

  console.log("HUTOROK v7 STARTED");
}

bootGame();
