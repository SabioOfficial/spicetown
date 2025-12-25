let apiKey = "";
const savedBgColor = localStorage.getItem("bg-color-theme");

function refreshApiKey() {
  const apiKeyDisplay = document.querySelector(".api-key-display");
  if (apiKeyDisplay) {
    apiKey = apiKeyDisplay.textContent.trim();
  }
}

async function initialize() {
  const topCollabDiv = document.querySelector(".top-collab img");
  if (topCollabDiv) {
    const spicetownIcon = document.createElement("img");
    spicetownIcon.src = chrome.runtime.getURL("/images/hc-gh&st-collab.png");
    spicetownIcon.style.height = "45px";
    spicetownIcon.style.width = "auto";

    topCollabDiv.insertAdjacentElement("afterend", spicetownIcon);
  }

  // settings related
  addSpicetownSettings(); // must go BEFORE applySettingsSync()
  applySettingsSync();
  applyUISync();

  // non settings related
  addImprovedUI();
  addExtraProjectInfo();
  addImprovedShop();
  addProjectSearcher();
  addAchievementInfo();
  addThemesPage();
  addBannerTemplateHint();

  incompatiability();

  if (savedBgColor) {
    applyTheme(savedBgColor);
  }

  refreshApiKey();
}

function addImprovedUI() {
  const previousVotesBtn = document.querySelector(".btn.btn--brown.btn--borderless.votes-new__prev-btn");
  if (previousVotesBtn) {
    previousVotesBtn.textContent = "Previous votes";
    const refreshVotesBtn = previousVotesBtn.cloneNode();
    refreshVotesBtn.textContent = "Skip";
    refreshVotesBtn.href = "javascript:window.location.href=window.location.href";
    const voteActionsDiv = document.createElement("div");
    voteActionsDiv.classList.add("vote-action__div");
    previousVotesBtn.parentElement.insertBefore(voteActionsDiv, previousVotesBtn.parentElement.querySelector(".votes-new__main"));
    voteActionsDiv.appendChild(previousVotesBtn);
    voteActionsDiv.appendChild(refreshVotesBtn);
  }

  const sidebarAside = document.querySelector("aside.sidebar")
  if (sidebarAside) {
    chrome.storage.local.get(["sidebarPinned"], (result) => {
      const pinSidebarBtn = document.createElement("button");
      pinSidebarBtn.classList.add("pin-sidebar__btn");
      pinSidebarBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pin-icon lucide-pin">
          <path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/>
        </svg>
      `;

      let pinned = result.sidebarPinned || false;
      if (pinned) {
        sidebarAside.classList.add("pinned");
        sidebarAside.style.width = "var(--sidebar-expanded-width)";
        pinSidebarBtn.querySelector("svg").style.opacity = 1;
      } else pinSidebarBtn.querySelector("svg").style.opacity = 0.4;

      pinSidebarBtn.addEventListener("click", () => {
        pinned = !pinned;
        if (pinned) {
          sidebarAside.classList.add("pinned");
          sidebarAside.style.width = "var(--sidebar-expanded-width)";
          pinSidebarBtn.querySelector("svg").style.opacity = 1;
        } else {
          sidebarAside.classList.remove("pinned");
          sidebarAside.style.width = "";
          pinSidebarBtn.querySelector("svg").style.opacity = 0.4;
        }

        chrome.storage.local.set({sidebarPinned: pinned});
      });

      sidebarAside.appendChild(pinSidebarBtn);
    })
  }
}

function addExtraProjectInfo() {
  const projectFullPageCard = document.querySelector(".project-show-card");
  if (!projectFullPageCard) return;
  const projectFullPageInfoCard = projectFullPageCard.querySelector(".project-show-card__content.project-card__content");
  const devlogs = projectFullPageInfoCard.querySelector(".project-show-card__stats").firstElementChild.querySelector("span").textContent.match(/\d+/g).join('');
  const timeRaw = projectFullPageInfoCard.querySelector(".project-show-card__stats .project-show-card__stat:nth-child(2)").querySelector("span").textContent.match(/\d+/g).join(' ');
  const timeParts = timeRaw.split(" ");
  const timeMins = Number(timeParts[0]) * 60 + Number(timeParts[1]);
  const hoursPerDevlog = timeMins / devlogs;
  // const devlogsPerHr = 
  const projectExtraInfoDiv = document.createElement("div");
  projectExtraInfoDiv.classList.add("project-extra-info__div");
  projectFullPageInfoCard.insertBefore(projectExtraInfoDiv, projectFullPageCard.querySelector(".project-show-card__description"));
  if (devlogs == "0") {
    const projectExtraInfoInfoDiv = document.createElement("p");
    projectExtraInfoInfoDiv.textContent = "Create a devlog to view more stats.";
    projectExtraInfoDiv.appendChild(projectExtraInfoInfoDiv);
    return;
  }
  const projectDevlogsPerHrDiv = document.createElement("div");
  projectDevlogsPerHrDiv.classList.add("project-extra-info__container");
  projectDevlogsPerHrDiv.innerHTML = `
    <svg width="32" height="32" viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="color: var(--color-tan-400)">
      <g clip-path="url(#clip0_21_12)">
        <path d="M190.5 381C295.683 381 381 295.683 381 190.5C381 85.3166 295.683 0 190.5 0C85.3166 0 0 85.3166 0 190.5C0 295.683 85.3166 381 190.5 381ZM176.892 81.643C176.892 74.1588 183.016 68.0355 190.5 68.0355C197.984 68.0355 204.108 74.1588 204.108 81.643V183.969L267.041 234.315C272.892 239.01 273.844 247.582 269.149 253.433C267.879 255.028 266.265 256.316 264.427 257.199C262.589 258.083 260.575 258.54 258.536 258.536C255.542 258.536 252.548 257.583 250.031 255.542L181.996 201.114C178.798 198.528 176.894 194.651 176.894 190.5L176.892 81.643Z" fill="currentColor"/>
        <path d="M504.005 368.521L462.996 326.967C458.004 322.017 451.004 319.054 443.009 319.054H383.992C368.997 318.06 356 330.924 356 345.766V484.294C355.994 487.935 356.714 491.542 358.119 494.907C359.524 498.271 361.586 501.329 364.188 503.903C366.79 506.477 369.879 508.517 373.279 509.907C376.679 511.296 380.323 512.008 384.002 512H483.998C487.677 512.008 491.321 511.296 494.721 509.907C498.121 508.517 501.21 506.477 503.812 503.903C506.414 501.329 508.476 498.271 509.881 494.907C511.286 491.542 512.006 487.935 512 484.294V387.329C512 380.4 508.997 373.471 504.005 368.521ZM403.999 397.221H434C437.997 397.221 441.995 400.193 441.995 405.134C441.995 410.084 439.002 413.047 434 413.047H403.999C402.946 413.06 401.9 412.864 400.924 412.471C399.948 412.078 399.062 411.495 398.317 410.758C397.572 410.021 396.983 409.143 396.586 408.177C396.189 407.211 395.991 406.176 396.004 405.134C396.004 400.183 400.002 397.221 403.999 397.221ZM464.001 452.632H403.999C400.002 452.632 396.004 449.66 396.004 444.719C396.004 439.778 398.998 436.806 403.999 436.806H464.001C467.998 436.806 471.996 439.768 471.996 444.719C471.996 449.669 467.998 452.632 464.001 452.632Z" fill="currentColor"/>
      </g>
      <defs>
        <clipPath id="clip0_21_12">
          <rect width="512" height="512" fill="white"/>
        </clipPath>
      </defs>
    </svg>
    <p>A devlog for every ${Math.round(hoursPerDevlog)} minutes <span class="project-extra-info__rating" id="devlogs-per-hr-span">(?)</span></p>
  `
  projectExtraInfoDiv.appendChild(projectDevlogsPerHrDiv);
  const devlogsPerHrSpan = document.getElementById("devlogs-per-hr-span");
  if (!devlogsPerHrSpan) return;
  if (hoursPerDevlog >= 150) {
    devlogsPerHrSpan.textContent = "(Awful)";
    devlogsPerHrSpan.classList.add("project-extra-info__rating--awful");
  } else if (hoursPerDevlog >= 120) {
    devlogsPerHrSpan.textContent = "(Bad)";
    devlogsPerHrSpan.classList.add("project-extra-info__rating--bad");
  } else if (hoursPerDevlog >= 101) {
    devlogsPerHrSpan.textContent = "(Okay)";
    devlogsPerHrSpan.classList.add("project-extra-info__rating--okay");
  } else if (hoursPerDevlog >= 81) {
    devlogsPerHrSpan.textContent = "(Good)";
    devlogsPerHrSpan.classList.add("project-extra-info__rating--good");
  } else if (hoursPerDevlog >= 40) {
    devlogsPerHrSpan.textContent = "(Great)";
    devlogsPerHrSpan.classList.add("project-extra-info__rating--great");
  } else if (hoursPerDevlog >= 20) {
    devlogsPerHrSpan.textContent = "(Good)";
    devlogsPerHrSpan.classList.add("project-extra-info__rating--good");
  } else if (hoursPerDevlog >= 15) {
    devlogsPerHrSpan.textContent = "(Okay)";
    devlogsPerHrSpan.classList.add("project-extra-info__rating--okay");
  } else if (hoursPerDevlog >= 10) {
    devlogsPerHrSpan.textContent = "(Bad)"
    devlogsPerHrSpan.classList.add("project-extra-info__rating--bad");
  } else {
    devlogsPerHrSpan.textContent = "(Awful)";
    devlogsPerHrSpan.classList.add("project-extra-info__rating--awful");
  }

  const projectTimeline = document.querySelector(".projects-show__timeline");
  if (projectTimeline) {
    const innerProjectTimeline = projectTimeline.querySelector(".mt-4");
    const earliestDevlogEl = innerProjectTimeline.lastElementChild;
    const earliestDevlogTimeEl = earliestDevlogEl.querySelector(".post__time");
    const earliestDevlogTime = (earliestDevlogTimeEl.textContent.includes("day")) ? earliestDevlogTimeEl.textContent.match(/\d+/g).join('') : "1";
    const projectTimePerDay = timeMins / earliestDevlogTime
    const projectTimePerDayFormatted = convertMToFormat(projectTimePerDay);
    const projectTimePerDayDiv = document.createElement("div");
    projectTimePerDayDiv.classList.add("project-extra-info__container");
    projectTimePerDayDiv.innerHTML = `
      <svg width="32" height="32" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" style="color: var(--color-tan-400)">
        <path d="M190.5 381C295.683 381 381 295.683 381 190.5C381 85.3166 295.683 0 190.5 0C85.3166 0 0 85.3166 0 190.5C0 295.683 85.3166 381 190.5 381ZM176.892 81.643C176.892 74.1588 183.016 68.0355 190.5 68.0355C197.984 68.0355 204.108 74.1588 204.108 81.643V183.969L267.041 234.315C272.892 239.01 273.844 247.582 269.149 253.433C267.879 255.028 266.265 256.316 264.427 257.199C262.589 258.083 260.575 258.54 258.536 258.536C255.542 258.536 252.548 257.583 250.031 255.542L181.996 201.114C178.798 198.528 176.894 194.651 176.894 190.5L176.892 81.643Z" fill="currentColor"/>
        <path d="M336.014 402.2C336.004 403.063 336 403.936 336 404.821V449.979C336 459.357 336.492 467.466 338.005 474.275C339.539 481.18 342.234 487.251 346.991 492.009C351.749 496.766 357.82 499.461 364.725 500.995C371.534 502.509 379.643 503 389.021 503H450.979C460.357 503 468.466 502.509 475.275 500.995C482.18 499.461 488.251 496.766 493.009 492.009C497.766 487.251 500.461 481.18 501.995 474.275C503.509 467.466 504 459.357 504 449.979V404.821C504 403.936 503.996 403.063 503.987 402.2H336.014Z" fill="currentColor"/>
        <path d="M361.199 354.715V343.4C361.199 338.761 364.96 335 369.599 335C374.238 335 377.999 338.761 377.999 343.4V352.092C381.453 351.885 385.127 351.8 389.02 351.8H450.978C454.872 351.8 458.546 351.885 461.999 352.092V343.4C461.999 338.761 465.76 335 470.399 335C475.038 335 478.799 338.761 478.799 343.4V354.715C484.252 356.339 489.077 358.861 493.008 362.791C497.766 367.549 500.46 373.62 501.994 380.525C502.34 382.082 502.633 383.707 502.879 385.4H337.12C337.365 383.707 337.658 382.082 338.004 380.525C339.538 373.62 342.233 367.549 346.99 362.791C350.921 358.861 355.747 356.339 361.199 354.715Z" fill="currentColor"/>
      </svg>
      <p>${projectTimePerDayFormatted} a day <span class="project-extra-info__rating" id="project-time-per-day-span">(?)</span></p>
    `
    projectExtraInfoDiv.appendChild(projectTimePerDayDiv);
    const timePerDaySpan = document.getElementById("project-time-per-day-span");
    if (!timePerDaySpan) return;
    if (projectTimePerDay < 30) {
      timePerDaySpan.textContent = "(Awful)";
      timePerDaySpan.classList.add("project-extra-info__rating--awful");
    } else if (projectTimePerDay < 60) {
      timePerDaySpan.textContent = "(Bad)";
      timePerDaySpan.classList.add("project-extra-info__rating--bad");
    } else if (projectTimePerDay < 120) {
      timePerDaySpan.textContent = "(Okay)";
      timePerDaySpan.classList.add("project-extra-info__rating--okay");
    } else if (projectTimePerDay < 180) {
      timePerDaySpan.textContent = "(Good)";
      timePerDaySpan.classList.add("project-extra-info__rating--good");
    } else if (projectTimePerDay >= 180) {
      timePerDaySpan.textContent = "(Great)";
      timePerDaySpan.classList.add("project-extra-info__rating--great");
    } else {
      timePerDaySpan.textContent = "(?)"
    }

    const followers = projectFullPageInfoCard.querySelector(".project-show-card__stat.project-show-card__stat--clickable > span").textContent.match(/\d+/g).join('');
    const followersPerDay = followers / earliestDevlogTime;
    const followersPerDayDiv = document.createElement("div");
    followersPerDayDiv.classList.add("project-extra-info__container");
    followersPerDayDiv.innerHTML = `
      <svg width="32" height="32" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" style="color: var(--color-tan-400)">
        <path d="M155.5 0C104.054 0 62.2 41.8723 62.2 93.3398C62.2 144.807 104.054 186.68 155.5 186.68C206.946 186.68 248.8 144.807 248.8 93.3398C248.8 41.8723 206.946 0 155.5 0ZM271.583 247.658C246.04 221.711 212.177 207.422 176.233 207.422H134.767C98.8234 207.422 64.9603 221.711 39.4168 247.658C13.9985 273.478 0 307.56 0 343.629C0 349.357 4.6415 354 10.3667 354H300.633C306.358 354 311 349.357 311 343.629C311 307.56 297.002 273.478 271.583 247.658Z" fill="currentColor"/>
        <path d="M336.014 402.2C336.004 403.063 336 403.936 336 404.821V449.979C336 459.357 336.492 467.466 338.005 474.275C339.539 481.18 342.234 487.251 346.991 492.009C351.749 496.766 357.82 499.461 364.725 500.995C371.534 502.509 379.643 503 389.021 503H450.979C460.357 503 468.466 502.509 475.275 500.995C482.18 499.461 488.251 496.766 493.009 492.009C497.766 487.251 500.461 481.18 501.995 474.275C503.509 467.466 504 459.357 504 449.979V404.821C504 403.936 503.996 403.063 503.987 402.2H336.014Z" fill="currentColor"/>
        <path d="M361.199 354.715V343.4C361.199 338.761 364.96 335 369.599 335C374.238 335 377.999 338.761 377.999 343.4V352.092C381.453 351.885 385.127 351.8 389.02 351.8H450.978C454.872 351.8 458.546 351.885 461.999 352.092V343.4C461.999 338.761 465.76 335 470.399 335C475.038 335 478.799 338.761 478.799 343.4V354.715C484.252 356.339 489.077 358.861 493.008 362.791C497.766 367.549 500.46 373.62 501.994 380.525C502.34 382.082 502.633 383.707 502.879 385.4H337.12C337.365 383.707 337.658 382.082 338.004 380.525C339.538 373.62 342.233 367.549 346.99 362.791C350.921 358.861 355.747 356.339 361.199 354.715Z" fill="currentColor"/>
      </svg>
      <p>${Math.round((followersPerDay + Number.EPSILON) * 100) / 100} follower(s) a day <span class="project-extra-info__rating" id="followers-per-day-span">(?)</span></p>
    `
    projectExtraInfoDiv.appendChild(followersPerDayDiv);
    const followersPerDaySpan = document.getElementById("followers-per-day-span");
    if (!followersPerDaySpan) return;
    if (followersPerDay < .1) {
      followersPerDaySpan.textContent = "(Awful)";
      followersPerDaySpan.classList.add("project-extra-info__rating--awful");
    } else if (followersPerDay < .2) {
      followersPerDaySpan.textContent = "(Bad)";
      followersPerDaySpan.classList.add("project-extra-info__rating--bad");
    } else if (followersPerDay < .3) {
      followersPerDaySpan.textContent = "(Okay)";
      followersPerDaySpan.classList.add("project-extra-info__rating--okay");
    } else if (followersPerDay < .5) {
      followersPerDaySpan.textContent = "(Good)";
      followersPerDaySpan.classList.add("project-extra-info__rating--good");
    } else if (followersPerDay >= .5) {
      followersPerDaySpan.textContent = "(Great)";
      followersPerDaySpan.classList.add("project-extra-info__rating--great");
    }
  }
}

function addImprovedShop() {
  const shopGoalsItemsNodeList = document.querySelectorAll(".shop-goals__item");
  let shopGoalsItems = Array.from(shopGoalsItemsNodeList);
  if (!shopGoalsItems || shopGoalsItems.length === 0) return;

  document // thanks gizzy for this amazing code (now it's mine :3)
    .querySelectorAll('a.shop-item-card__link[data-turbo-frame="_top"]')
    .forEach((a) => {
      a.removeAttribute("data-turbo-frame")
      a.addEventListener(
        "click",
        (e) => {
          e.preventDefault();
          window.location.href = a.href;
        },
        { once: true },
      );
  });

  const sidebarBalance = document.querySelector(".sidebar__user-balance");
  const userBalance = sidebarBalance ? parseFloat(sidebarBalance.textContent.replace(/[^\d.]/g, '')) : 0;

  const shopGoalsContainer = document.querySelector(".shop-goals__container");
  const shopGoalsTitle = document.querySelector(".shop-goals__title");
  const itemsContainer = document.querySelector(".shop-goals__items");

  if (!shopGoalsContainer || !shopGoalsTitle || !itemsContainer) return;

  const allProgressWrapper = document.createElement("div");
  allProgressWrapper.classList.add("shop-goals__all-progress-wrapper");

  allProgressWrapper.innerHTML = `
    <span id="all-percent">0.00%</span>
    <div class="shop-goals__heading-progress-bar">
      <div class="shop-goals__heading-progress-bar-fill"></div>
    </div>
    <div class="all-current__container">
      <span id="all-current">0</span> / <span id="all-total">0</span> 
    </div>
  `;

  const shopGoalEditorDiv = document.createElement("div");
  shopGoalEditorDiv.classList.add("shop-goals-editor__div");
  shopGoalEditorDiv.style.display = "none";

  shopGoalEditorDiv.innerHTML = `
    <p class="shop-goal-editor__editor-name">Spicetown Shop Goal Editor</p>
    <div class="shop-goal-editor__heading">
      <h2 class="shop-goal-editor__name">Select an item</h2>
      <button class="shop-goal-editor__save-btn">Save</button>
      <button class="shop-goal-editor__remove-btn">Remove</button>
    </div>
    <div class="shop-goal-editor__input">
      <label class="shop-goal-editor__quantity-label">Quantity</label>
      <div class="shop-goal-editor__quantity-container">
        <button id="decrease-quantity__btn">-</button>
        <input type="number" class="shop-goal-editor__quantity-input" value="1" min="1" max="99">
        <button id="increase-quantity__btn">+</button>
      </div>
    </div>
  `;

  const editorInput = shopGoalEditorDiv.querySelector(".shop-goal-editor__quantity-input");
  const editorInputPlus = shopGoalEditorDiv.querySelector("#increase-quantity__btn");
  const editorInputMinus = shopGoalEditorDiv.querySelector("#decrease-quantity__btn");

  const updateQuantity = (newValue) => {
    let value = parseInt(newValue);
    if (isNaN(value) || value < 1) value = 1;
    if (value > 99) value = 99;

    editorInput.value = value;
  };

  editorInputPlus.addEventListener("click", () => {
    updateQuantity(parseInt(editorInput.value) + 1);
  });

  editorInputMinus.addEventListener("click", () => {
    updateQuantity(parseInt(editorInput.value) - 1);
  });

  editorInput.addEventListener("input", (event) => {
    if (event.target.value > 99) {
      event.target.value = 99;
    }
  });

  editorInput.addEventListener("blur", (event) => {
    updateQuantity(event.target.value);
  });

  const editorName = shopGoalEditorDiv.querySelector(".shop-goal-editor__name");
  const editorSaveBtn = shopGoalEditorDiv.querySelector(".shop-goal-editor__save-btn");
  const editorRemoveBtn = shopGoalEditorDiv.querySelector(".shop-goal-editor__remove-btn");

  let activeEditingItem = null; // track which item is being edited and then sell your user data (joke)

  const calculateAllProgress = async () => {
    let totalRequiredCost = 0;
    const allFill = document.querySelector(".shop-goals__heading-progress-bar-fill");
    const allCurrentText = document.querySelector("#all-current");
    const allTotalText = document.querySelector("#all-total");
    const allPercentText = document.querySelector("#all-percent");

    const currentItems = document.querySelectorAll(".shop-goals__item");

    for (const item of currentItems) {
      const id = item.getAttribute("data-item-id");
      const progressTxt = item.querySelector(".shop-goals__progress-text");
      const fill = item.querySelector(".shop-goals__progress-fill");

      // better safe than sorry
      if (!progressTxt || !fill) continue;

      // wow better formatting :shocked: cleaner codebase??!?!??!?!?!? :shocked: :shocked:
      const remaining = parseFloat(progressTxt.textContent.replace(/[^\d.]/g, '')) || 0;
      const isComplete = fill.style.width === "100%";
      let derivedPrice = 0;

      const matchingShopItemCard = document.querySelector(`div.shop-item-card[data-shop-id="${id}"]`);
      if (matchingShopItemCard) {
        const priceTextRaw = matchingShopItemCard.querySelector(".shop-item-card__price").textContent || "🍪 0";
        derivedPrice = parseFloat(priceTextRaw.replace(/[^\d.]/g, ''));
      }

      if (!derivedPrice) {
        if (isComplete) derivedPrice = 0;
        else derivedPrice = remaining + userBalance;
      }

      const storage = await chrome.storage.local.get([`shop_goal_qty_${id}`]);
      const qty = storage[`shop_goal_qty_${id}`] || 1;
      totalRequiredCost += (derivedPrice * qty);
    }
    
    const percent = totalRequiredCost === 0 ? 100 : Math.min(100, (userBalance / totalRequiredCost) * 100);
    if (allFill) allFill.style.width = `${percent}%`;
    if (allCurrentText) allCurrentText.textContent = Math.floor(userBalance).toLocaleString();
    if (allTotalText) allTotalText.textContent = Math.floor(totalRequiredCost).toLocaleString();
    if (allPercentText) allPercentText.textContent = (Math.round((percent + Number.EPSILON) * 100) / 100).toLocaleString() + "%";
  }

  shopGoalsItems.forEach(shopGoalItemDiv => {
    const shopGoalItemID = shopGoalItemDiv.getAttribute("data-item-id");
    const shopGoalsLink = shopGoalItemDiv.querySelector(".shop-goals__link");
    const shopGoalsProgressTxt = shopGoalItemDiv.querySelector(".shop-goals__progress-text");
    const shopGoalsProgressBarFill = shopGoalItemDiv.querySelector(".shop-goals__progress-fill");
    const itemName = shopGoalItemDiv.querySelector(".shop-goals__name").textContent;

    shopGoalItemDiv.setAttribute("draggable", "true");

    const currentRemaining = parseFloat(shopGoalsProgressTxt.textContent.replace(/[^\d.]/g, '')) || 0;
    const isComplete = shopGoalsProgressBarFill.style.width === "100%";
    
    let derivedPrice = 0;
    const matchingShopItemCard = document.querySelector(`div.shop-item-card[data-shop-id="${shopGoalItemID}"]`);

    if (matchingShopItemCard) {
      const priceTextRaw = matchingShopItemCard.querySelector(".shop-item-card__price").textContent || "🍪 0";
      derivedPrice = parseFloat(priceTextRaw.replace(/[^\d.]/g, ''));
    }

    if (!derivedPrice) {
      if (isComplete) derivedPrice = 0;
      else derivedPrice = currentRemaining + userBalance;
    }

    const pricePerUnit = derivedPrice;

    const updateShopItemPrice = (quantity) => {
      const newTotalRequired = pricePerUnit * quantity;
      const newRemaining = Math.max(0, newTotalRequired - userBalance);
      const newPercent = Math.min(100, (userBalance / newTotalRequired) * 100);

      const progressBarContainer = shopGoalItemDiv.querySelector(".shop-goals__progress-bar");
      if (progressBarContainer) progressBarContainer.style.display = "none";

      const fillColor = newPercent >= 100 ? "var(--completed-color)" : "var(--progress-color)";
      const emptyColor = "rgba(255, 255, 255, 0.5)";

      shopGoalItemDiv.style.background = `linear-gradient(to right, ${fillColor} ${newPercent}%, ${emptyColor} ${newPercent}%)`;

      // i love formatting code properly
      // its so fun (not sarcastic btw)
      const shopGoalImg = shopGoalItemDiv.querySelector(".shop-goals__image");
      if (shopGoalImg) {
        if (newPercent >= 100) shopGoalImg.classList.add("completed");
        else shopGoalImg.classList.remove("completed");
      }

      if (newRemaining <= 0) {
        shopGoalsProgressTxt.textContent = `✅ Ready to buy!`;
        shopGoalItemDiv.classList.add("shop-goals__progress-fill--complete");
      } else {
        shopGoalsProgressTxt.textContent = `🍪${newRemaining.toLocaleString()} more needed`;
        shopGoalItemDiv.classList.remove("shop-goals__progress-fill--complete");
      }
    }

    // idk if i need this but oh well i aint gonna risk it
    shopGoalItemDiv.updateShopItemPrice = updateShopItemPrice;

    chrome.storage.local.get([`shop_goal_qty_${shopGoalItemID}`], result => {
      const quantity = result[`shop_goal_qty_${shopGoalItemID}`] || 1;
      updateShopItemPrice(quantity);
    });

    shopGoalsLink.href = "";
    shopGoalsLink.addEventListener("click", (e) => {
      e.preventDefault();
      activeEditingItem = {
        id: shopGoalItemID,
        div: shopGoalItemDiv,
        updateShopItemPrice
      };
      editorName.textContent = itemName;
      chrome.storage.local.get([`shop_goal_qty_${shopGoalItemID}`], result => {
        editorInput.value = result[`shop_goal_qty_${shopGoalItemID}`] || 1;
      });
      shopGoalEditorDiv.style.display = "block";
      document.querySelectorAll(".shop-goals__item").forEach(item => item.classList.remove("selected"));
      shopGoalItemDiv.classList.add("selected");
    });
  });

  editorSaveBtn.addEventListener("click", () => {
    if (!activeEditingItem) return;
    const newQuantity = parseInt(editorInput.value) || 1;
    chrome.storage.local.set({[`shop_goal_qty_${activeEditingItem.id}`]: newQuantity}, () => {
      activeEditingItem.updateShopItemPrice(newQuantity);
      calculateAllProgress();
      shopGoalEditorDiv.style.display = "none";
    });
  });

  editorRemoveBtn.addEventListener("click", () => {
    if (!activeEditingItem) return;
    const originalRemoveBtn = activeEditingItem.div.querySelector(".shop-goals__remove");
    if (originalRemoveBtn) {
      originalRemoveBtn.click();
      shopGoalEditorDiv.style.display = "none";
      activeEditingItem = null;
      window.location.reload(); // reload needed or else the inject DOM gets overwriten!!!!!!!!!!!!!!!!!!!!!!!!!
    }
  });

  const shopGoalsDiv = document.createElement("div");
  shopGoalsDiv.classList.add("shop-goals__div");

  shopGoalsTitle.after(allProgressWrapper); // i love this function!!!!!!! this makes life way easier then
  allProgressWrapper.after(shopGoalsDiv);
  shopGoalsDiv.appendChild(itemsContainer);
  shopGoalsDiv.appendChild(shopGoalEditorDiv);

  document.querySelectorAll(".shop-item-card__star").forEach(btn => {
    btn.addEventListener("click", () => window.location.reload());
  });

  // my mommy said my variables names shouldnt be super long
  // so from now on variables will be cool and short (like me)
  // NOOOO I CANT HAVE MY PROJECT EXTRA INFORMATION INFORMATION ELEMENT VARIABLE

  let draggedItem = null;

  shopGoalsItems.forEach(item => {
    item.setAttribute("draggable", "true");

    item.addEventListener("dragstart", (e) => { // mommy said e is for event
      draggedItem = item;
      item.classList.add("dragging");
      e.dataTransfer.effectAllowed = 'move';
    });

    item.addEventListener("dragend", () => {
      item.classList.remove("dragging");
      draggedItem = null;
      shopGoalsItems.forEach(i => i.style.transform = "");
      saveOrder();
    });

    item.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    });

    item.addEventListener("dragenter", () => {
      if (item === draggedItem) return;

      const allItems = [...itemsContainer.querySelectorAll(".shop-goals__item")];
      const draggedIndex = allItems.indexOf(draggedItem);
      const targetIndex = allItems.indexOf(item);

      if (draggedIndex < targetIndex) item.after(draggedItem);
      else item.before(draggedItem);
    });
  });

  function saveOrder() {
    const currentOrder = Array.from(itemsContainer.querySelectorAll(".shop-goals__item")) // should be array? idk
      .map(item => item.getAttribute("data-item-id"));
    chrome.storage.local.set({'shop_goal_priority_order': currentOrder});
  }

  // loading the saved order
  chrome.storage.local.get(['shop_goal_priority_order'], (result) => {
    const savedOrder = result.shop_goal_priority_order;
    if (savedOrder) {
      savedOrder.forEach(id => {
        const item = itemsContainer.querySelector(`.shop-goals__item[data-item-id="${id}"]`);
        if (item) itemsContainer.appendChild(item);
      });
    }
    calculateAllProgress();
  });
}

async function addProjectSearcher() {
  const explorePageContainer = document.querySelector(".explore");
  const projectList = document.querySelector("#project-list");

  if (!explorePageContainer || !projectList || document.querySelector(".project-list__searcher")) return;

  const searchContainer = document.createElement("div");
  searchContainer.classList.add("project-list__search-container");

  const searchInput = document.createElement("input");
  searchInput.placeholder = "Search project";
  searchInput.classList.add("project-list__searcher", "input__field");

  const searchBtn = document.createElement("button");
  searchBtn.classList.add("project-list__search-btn");
  searchBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 40 40" fill="none"><path d="M39.0527 34.2126L29.8565 25.0156C31.419 22.5281 32.3258 19.5879 32.3258 16.4326C32.3258 7.50574 25.0891 0.27002 16.1626 0.27002C7.23605 0.27002 0 7.50574 0 16.4326C0 25.3598 7.23571 32.5948 16.1626 32.5948C19.5964 32.5948 22.777 31.5213 25.3942 29.6971L34.481 38.7846C35.1124 39.4154 35.9402 39.7295 36.7669 39.7295C37.5946 39.7295 38.4213 39.4154 39.0537 38.7846C40.3155 37.5215 40.3155 35.4754 39.0527 34.2126ZM16.1626 27.3584C10.1291 27.3584 5.23745 22.4671 5.23745 16.4333C5.23745 10.3994 10.1291 5.50781 16.1626 5.50781C22.1964 5.50781 27.0877 10.3994 27.0877 16.4333C27.0877 22.4671 22.1964 27.3584 16.1626 27.3584Z" fill="currentColor"></path></svg>`;

  searchContainer.appendChild(searchInput);
  searchContainer.appendChild(searchBtn);

  const insertionPoint = explorePageContainer.querySelector(".explore__projects-list") || projectList;
  explorePageContainer.insertBefore(searchContainer, insertionPoint);

  let currentPage = 1;

  const handleSearch = async (append = false) => {
    if (!append) {
      currentPage = 1;
      projectList.innerHTML = '<p class="explore__end">Searching Flavortown...</p>';
    }

    try {
      refreshApiKey();
      const API_KEY = apiKey;

      const query = encodeURIComponent(searchInput.value);
      const response = await fetch(`https://flavortown.hackclub.com/api/v1/projects?query=${query}&page=${currentPage}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Accept': 'application/json'
        }
      });
      
      const data = await response.json();

      if (data.error === "rate_limited" || data.error === "unauthorized") {
        const endMsg = document.querySelector(".explore__end");
        if (!endMsg) return;
        if (data.error === "rate_limited") endMsg.textContent = "Rate limited. Wait 1 min."; else if (data.error === "unauthorized") endMsg.textContent = "Generate an API key from Settings.";
        return;
      }

      renderProjects(data.projects, append);
      updatePaginationUI(data.pagination);
    } catch (err) {
      console.error("i failed to fetch shit FAAHHHHH: ", err);
    }
  };

  function updatePaginationUI(paginationData) {
    let paginationContainer = document.querySelector(".explore__pagination");

    if (!paginationContainer) {
      paginationContainer = document.createElement('div');
      paginationContainer.className = 'explore__pagination';
      projectList.after(paginationContainer);
    }

    if (paginationData.next_page) {
      paginationContainer.innerHTML = `
        <button type="button" class="btn btn--brown" id="ext-load-more">
          Load More Projects
        </button>
      `;
      
      document.getElementById("ext-load-more").addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation(); 
        
        currentPage = paginationData.next_page;
        handleSearch(true); 
      });
    } else {
      paginationContainer.innerHTML = `<p class="explore__end">You've reached the end.</p>`;
    }
  }

  function renderProjects(projects, append) {
    if (!projects || projects.length === 0) {
      if (!append) projectList.innerHTML = `<p class="explore__end">No projects found.</p>`;
      return;
    }

    const html = projects.map(project => `
      <div id="project_${project.id}" class="project-card">
        <div class="project-card__banner ${!project.banner_url ? 'project-card__banner--placeholder' : ''}">
          <a class="project-card__banner-frame" href="/projects/${project.id}">
            ${project.banner_url
              ? `<img src="${project.banner_url}" class="project-card__banner-image" alt="${project.title}">`
              : `<div class="project-card__banner-placeholder"><p>Banners are not supported in the API yet</p></div>`
            }
          </a>
        </div>
        <div class="project-card__content">
          <h3 class="project-card__title">
            <a class="project-card__title-link" href="/projects/${project.id}">${project.title}</a>
          </h3>
          <p class="project-card__description">${project.description || ''}</p>
        </div>
      </div>
    `).join('');

    if (append) {
      const statusMsg = projectList.querySelector(".explore__end");
      if (statusMsg) statusMsg.remove();
      projectList.insertAdjacentHTML('beforeend', html);
    } else {
      projectList.innerHTML = html;
    }
  }

  searchBtn.addEventListener("click", () => handleSearch(false));
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSearch(false);
  });
}

addProjectSearcher();

function addAchievementInfo() {
  const achievementGridDiv = document.querySelector(".achievements__grid");
  if (!achievementGridDiv) return;
  const achievementMap = {
    "Anyone Can Cook!": "Sign up to Flavortown",
    "Very Fried": "Verify your identity",
    "Home Cookin'": "Make your first project",
    "Recipe Notes": "Post a devlog",
    "Yapper": "Comment on a devlog",
    "Off the Menu": "Buy something from the shop (NOT free stickers)",
    "Regular Customer": "Buy 5 items from the shop",
    "VIP Diner": "Buy 10 items from the shop",
    "Line Cook": "Have 5 or more projects",
    "Order Up!": "Ship your first project",
    "Michelin Star": "Have your project approved for shipping",
    "Cookbook Author": "Post 10 devlogs",
    "Scrapbook usage?!": "Use scrapbook in a devlog",
    "Cooking": "Get 'fire' project status, given out by Flavortown devs",
    "Accept cookies": "Spam the cookie ? amount of times."
  };
  const secretMap = {
    "15": {name: "Cookbook Author", desc: "Post 10 devlogs", reward: "15"},
    "16": {name: "Scrapbook usage?!", desc: "Use scrapbook in a devlog"},
    "17": {name: "Cooking", desc: "Get 'fire' project status, given out by Flavortown devs", reward: "5"},
    "18": {name: "Accept cookies", desc: "Spam the cookie for a certain amount."} // isnt in fucking source code :(
  };
  const achievementCards = achievementGridDiv.querySelectorAll(".achievements__card");
  achievementCards.forEach((achievementCard, index) => {
    const achievementCardNameEl = achievementCard.querySelector(".achievements__name");
    const achievementCardDescriptionEl = achievementCard.querySelector(".achievements__description");
    const achievementCardRewardEl = achievementCard.querySelector(".achievements__reward.achievements__reward--secret");

    if (!achievementCardNameEl || !achievementCardDescriptionEl) return;

    const achievementCardName = achievementCardNameEl.textContent.trim();
    const position = (index + 1).toString(); // fuck 0-index

    if (achievementCardName === "???" && secretMap[position]) {
      achievementCardNameEl.textContent = secretMap[position].name;
      achievementCardDescriptionEl.textContent = secretMap[position].desc;
      if (achievementCardRewardEl && secretMap[position].reward) {
        achievementCardRewardEl.textContent = `+${secretMap[position].reward} 🍪`;
      }
    } else if (achievementMap[achievementCardName]) {
      achievementCardDescriptionEl.textContent = achievementMap[achievementCardName];
    }
  })
}

async function addSpicetownSettings() {
  const settingsForm = await document.querySelector(".settings-form");
  if (!settingsForm) return;
  const modalActions = await settingsForm.querySelector(".modal__actions");
  const saveBtn = await modalActions.querySelector(".modal__actions-close");

  // screenshare mode
  const screenshareModeDiv = document.createElement("div");
  screenshareModeDiv.classList.add("settings-form__field");

  const screenshareModeCheckbox = document.createElement("label");
  screenshareModeCheckbox.classList.add("settings-form__checkbox");
  screenshareModeDiv.appendChild(screenshareModeCheckbox);

  const screenshareModeBoxInput = document.createElement("input");
  screenshareModeBoxInput.type = "checkbox";
  screenshareModeBoxInput.name = "screenshare_mode";
  screenshareModeBoxInput.id = "screenshare_mode";
  screenshareModeBoxInput.value = 1;
  screenshareModeCheckbox.appendChild(screenshareModeBoxInput);

  const screenshareModeTitle = document.createElement("span");
  screenshareModeTitle.textContent = "Screenshare Mode"
  screenshareModeCheckbox.appendChild(screenshareModeTitle);

  const screenshareModeHint = document.createElement("small");
  screenshareModeHint.classList.add("settings-form__hint");
  screenshareModeHint.textContent = "Replace sensitive information blurring with secure, black boxes"
  screenshareModeDiv.appendChild(screenshareModeHint);

  settingsForm.insertBefore(screenshareModeDiv, modalActions);

  saveBtn.addEventListener("click", function() {
    saveSetting(screenshareModeBoxInput.checked);
  });

  // settings v2
  const apiKeyDisplay = document.querySelector(".api-key-display");
  if (apiKeyDisplay) {
    const apiKeyContainer = apiKeyDisplay.parentElement
    const apiKeyDiv = apiKeyContainer.parentElement;
    apiKeyDiv.classList.add("api-key__div");

    const rerollApiForm = apiKeyContainer.querySelector("form.button_to");

    const rerollApiHeading = document.createElement("div");
    rerollApiHeading.classList.add("api-key-info__div")
    apiKeyDiv.insertBefore(rerollApiHeading, apiKeyContainer);

    const rerollApiLabel = apiKeyDiv.querySelector("label.settings-form__label");

    rerollApiHeading.appendChild(rerollApiLabel);
    rerollApiHeading.appendChild(rerollApiForm);

    const rerollApiBtn = rerollApiForm.querySelector("button");
    rerollApiBtn.style.background = "none";
    rerollApiBtn.style.border = "none";
    rerollApiBtn.style.cursor = "pointer";

    const rerollApiSvg = rerollApiForm.querySelector("svg");
    rerollApiSvg.style.color = "var(--color-text-body)";

    const copyApiBtn = document.createElement("button");
    copyApiBtn.style.height = "24px";
    copyApiBtn.style.background = "none";
    copyApiBtn.style.border = "none";
    copyApiBtn.style.cursor = "pointer";
    copyApiBtn.addEventListener("click", function() {
      navigator.clipboard.writeText(apiKey);
      document.getElementById('settings-modal').close();
    });

    apiKeyContainer.appendChild(copyApiBtn);

    const copyApiSvg = rerollApiSvg.cloneNode(false);
    rerollApiSvg.style.width = "16";
    rerollApiSvg.style.height = "16";
    copyApiBtn.appendChild(copyApiSvg);

    const copyApiSvgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    copyApiSvgRect.setAttribute("width", "14");
    copyApiSvgRect.setAttribute("height", "14");
    copyApiSvgRect.setAttribute("x", "8");
    copyApiSvgRect.setAttribute("y", "8");
    copyApiSvgRect.setAttribute("rx", "2");
    copyApiSvgRect.setAttribute("ry", "2");
    copyApiSvg.appendChild(copyApiSvgRect);

    const copyApiSvgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    copyApiSvgPath.setAttribute("d", "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2");
    copyApiSvg.appendChild(copyApiSvgPath);
  }
  
  // theming menu
  const sidebarNavList = document.querySelector(".sidebar__nav-list");
  if (sidebarNavList) {
    const themesNavItem = document.createElement("ul");
    themesNavItem.classList.add("sidebar__nav-list");
    sidebarNavList.appendChild(themesNavItem);

    const themesNavLink = document.createElement("a");
    themesNavLink.classList.add("sidebar__nav-link");
    themesNavLink.href = "/themes";
    themesNavItem.appendChild(themesNavLink);

    const themesNavIconSpan = document.createElement("span");
    themesNavIconSpan.classList.add("sidebar__nav-icon-wrapper");
    themesNavIconSpan.ariaHidden = true;
    themesNavLink.appendChild(themesNavIconSpan);

    const themesNavIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    themesNavIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    themesNavIcon.setAttribute("width", "24");
    themesNavIcon.setAttribute("height", "24");
    themesNavIcon.setAttribute("viewBox", "0 0 24 24");
    themesNavIcon.classList.add("sidebar__nav-icon");
    themesNavIconSpan.appendChild(themesNavIcon);

    const themesNavIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    themesNavIconPath.setAttribute("d", "M10.8468 21.9342C5.86713 21.3624 2 17.1328 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.1565 18.7173 16.7325 15.9135 16.3703C14.2964 16.1614 12.8386 15.9731 12.2619 16.888C11.8674 17.5136 12.2938 18.2938 12.8168 18.8168C13.4703 19.4703 13.4703 20.5297 12.8168 21.1832C12.2938 21.7062 11.5816 22.0186 10.8468 21.9342ZM11.085 6.99976C11.085 7.82818 10.4134 8.49976 9.585 8.49976C8.75658 8.49976 8.085 7.82818 8.085 6.99976C8.085 6.17133 8.75658 5.49976 9.585 5.49976C10.4134 5.49976 11.085 6.17133 11.085 6.99976ZM6.5 13C7.32843 13 8 12.3284 8 11.5C8 10.6716 7.32843 9.99998 6.5 9.99998C5.67157 9.99998 5 10.6716 5 11.5C5 12.3284 5.67157 13 6.5 13ZM17.5 13C18.3284 13 19 12.3284 19 11.5C19 10.6716 18.3284 9.99998 17.5 9.99998C16.6716 9.99998 16 10.6716 16 11.5C16 12.3284 16.6716 13 17.5 13ZM14.5 8.49998C15.3284 8.49998 16 7.82841 16 6.99998C16 6.17156 15.3284 5.49998 14.5 5.49998C13.6716 5.49998 13 6.17156 13 6.99998C13 7.82841 13.6716 8.49998 14.5 8.49998Z");
    themesNavIconPath.setAttribute("fill", "currentColor");
    themesNavIconPath.setAttribute("fill-rule", "evenodd");
    themesNavIconPath.setAttribute("clip-rule", "evenodd");
    themesNavIcon.appendChild(themesNavIconPath);

    const themesNavLabel = document.createElement("span");
    themesNavLabel.classList.add("sidebar__nav-label");
    themesNavLabel.textContent = "Themes";
    themesNavLink.appendChild(themesNavLabel);
  }
}

async function addThemesPage() {
  if (window.location.pathname === "/themes") {
    document.head.querySelector("style").remove();
    document.title = "Flavortown";

    const faviconLinkEl = document.createElement("link");
    faviconLinkEl.setAttribute("rel", "icon");
    faviconLinkEl.setAttribute("type", "image/x-icon");
    faviconLinkEl.href = "https://flavortown.hackclub.com/assets/favicon-5ea28202.ico";
    document.head.appendChild(faviconLinkEl);
 
    document.head.innerHTML += `<link rel="stylesheet" href="${await getFlavortownCSS()}" data-turbo-track="reload">`;

    document.body.classList.add("signed-in");

    // copy and pasted from shop sidebar
    document.body.innerHTML = `
      <aside class="sidebar" aria-label="Main">
          <div class="sidebar__blob">
            <nav class="sidebar__nav" aria-label="Primary navigation">
              <ul class="sidebar__nav-list">
                  <li class="sidebar__nav-item">
                      <a class="sidebar__nav-link" href="/kitchen">
                        <span class="sidebar__nav-icon-wrapper" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="sidebar__nav-icon"><g fill="none"><path d="M24 0v24H0V0zM12.594 23.258l-.012.002-.071.035-.02.004-.014-.004-.071-.036q-.016-.004-.024.006l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427q-.004-.016-.016-.018m.264-.113-.014.002-.184.093-.01.01-.003.011.018.43.005.012.008.008.201.092q.019.005.029-.008l.004-.014-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014-.034.614q.001.018.017.024l.015-.002.201-.093.01-.008.003-.011.018-.43-.003-.012-.01-.01z"></path><path fill="currentColor" d="M17.015 3.055a1 1 0 0 1 1.26 1.548l-.098.079-2.101 1.501a1.96 1.96 0 0 0-.794 1.937l.032.152 3.343-3.343a1 1 0 0 1 1.497 1.32l-.083.094-3.343 3.343c.705.18 1.485-.04 1.986-.63l.103-.132 1.501-2.101a1 1 0 0 1 1.694 1.055l-.067.107-1.5 2.102a3.97 3.97 0 0 1-5.054 1.216l-.18-.1-2.297 2.296 4.157 4.158a1 1 0 0 1 .083 1.32l-.083.094a1 1 0 0 1-1.32.083l-.094-.083-4.157-4.158-4.157 4.158a1 1 0 0 1-1.32.083l-.094-.083a1 1 0 0 1-.083-1.32l.083-.094 4.157-4.158-1.61-1.61a4.5 4.5 0 0 1-1.355.473l-.25.037a3.89 3.89 0 0 1-3.279-1.15C2.663 10.319 2.132 9.15 2 8.027c-.13-1.105.12-2.289.93-3.098.809-.81 1.992-1.06 3.097-.93 1.123.133 2.293.664 3.222 1.593a3.89 3.89 0 0 1 1.15 3.278c-.06.505-.207.984-.406 1.401l-.104.204 1.61 1.61 2.298-2.296a3.97 3.97 0 0 1 .944-5.103l.172-.13z"></path></g></svg>
                        </span>
                        <span class="sidebar__nav-label">Kitchen</span>
                      </a>
                  </li>
                  <li class="sidebar__nav-item">
                      <a class="sidebar__nav-link" href="/explore">
                        <span class="sidebar__nav-icon-wrapper" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="sidebar__nav-icon"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035q-.016-.005-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427q-.004-.016-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093q.019.005.029-.008l.004-.014-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014-.034.614q.001.018.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z"></path><path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m4.243 5.757c-.354-.353-4.95.707-6.364 2.122-1.414 1.414-2.475 6.01-2.122 6.364.354.353 4.95-.707 6.364-2.122 1.415-1.414 2.475-6.01 2.122-6.364M12 11a1 1 0 1 1 0 2 1 1 0 0 1 0-2"></path></g></svg>
                        </span>
                        <span class="sidebar__nav-label">Explore</span>
                      </a>
                  </li>
                  <li class="sidebar__nav-item">
                      <a class="sidebar__nav-link" href="/projects">
                        <span class="sidebar__nav-icon-wrapper" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40" height="40" viewBox="0 0 40 40" fill="none" class="sidebar__nav-icon">
        <mask id="mask0_2926_391" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40">
        <rect width="40" height="40" fill="url(#pattern0_2926_391)"></rect>
        </mask>
        <g mask="url(#mask0_2926_391)">
        <rect x="-10.2324" y="-11.1621" width="58.6047" height="59.5349" fill="currentColor"></rect>
        </g>
        <defs>
        <pattern id="pattern0_2926_391" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlink:href="#image0_2926_391" transform="scale(0.00195312)"></use>
        </pattern>
        <image id="image0_2926_391" width="512" height="512" preserveAspectRatio="none" xlink:href="data:image/png;base64,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"></image>
        </defs>
        </svg>
                        </span>
                        <span class="sidebar__nav-label">Projects</span>
        </a>          </li>

                  <li class="sidebar__nav-item">
                      <a class="sidebar__nav-link" href="/votes/new">
                        <span class="sidebar__nav-icon-wrapper" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="sidebar__nav-icon"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035q-.016-.005-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427q-.004-.016-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093q.019.005.029-.008l.004-.014-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014-.034.614q.001.018.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z"></path><path fill="currentColor" d="M10.92 2.868a1.25 1.25 0 0 1 2.16 0l2.795 4.798 5.428 1.176a1.25 1.25 0 0 1 .667 2.054l-3.7 4.141.56 5.525a1.25 1.25 0 0 1-1.748 1.27L12 19.592l-5.082 2.24a1.25 1.25 0 0 1-1.748-1.27l.56-5.525-3.7-4.14a1.25 1.25 0 0 1 .667-2.055l5.428-1.176z"></path></g></svg>
                        </span>
                        <span class="sidebar__nav-label">Vote</span>
        </a>          </li>

                  <li class="sidebar__nav-item">
                      <a class="sidebar__nav-link" aria-current="page" href="/shop">
                        <span class="sidebar__nav-icon-wrapper" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="sidebar__nav-icon"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035q-.016-.005-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427q-.004-.016-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093q.019.005.029-.008l.004-.014-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014-.034.614q.001.018.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z"></path><path fill="currentColor" d="M7.5 19a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3m10 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3M3 2c1.726 0 3.023 1.283 3.145 3h13.657a2 2 0 0 1 1.968 2.358l-1.637 9A2 2 0 0 1 18.165 18H6.931a2 2 0 0 1-1.995-1.858l-.8-11.213C4.09 4.31 3.564 4 3 4a1 1 0 0 1 0-2"></path></g></svg>
                        </span>
                        <span class="sidebar__nav-label">Shop</span>
        </a>          </li>
              <ul class="sidebar__nav-list"><a class="sidebar__nav-link sidebar__nav-link--active" href="/themes"><span class="sidebar__nav-icon-wrapper" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="sidebar__nav-icon"><path d="M10.8468 21.9342C5.86713 21.3624 2 17.1328 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.1565 18.7173 16.7325 15.9135 16.3703C14.2964 16.1614 12.8386 15.9731 12.2619 16.888C11.8674 17.5136 12.2938 18.2938 12.8168 18.8168C13.4703 19.4703 13.4703 20.5297 12.8168 21.1832C12.2938 21.7062 11.5816 22.0186 10.8468 21.9342ZM11.085 6.99976C11.085 7.82818 10.4134 8.49976 9.585 8.49976C8.75658 8.49976 8.085 7.82818 8.085 6.99976C8.085 6.17133 8.75658 5.49976 9.585 5.49976C10.4134 5.49976 11.085 6.17133 11.085 6.99976ZM6.5 13C7.32843 13 8 12.3284 8 11.5C8 10.6716 7.32843 9.99998 6.5 9.99998C5.67157 9.99998 5 10.6716 5 11.5C5 12.3284 5.67157 13 6.5 13ZM17.5 13C18.3284 13 19 12.3284 19 11.5C19 10.6716 18.3284 9.99998 17.5 9.99998C16.6716 9.99998 16 10.6716 16 11.5C16 12.3284 16.6716 13 17.5 13ZM14.5 8.49998C15.3284 8.49998 16 7.82841 16 6.99998C16 6.17156 15.3284 5.49998 14.5 5.49998C13.6716 5.49998 13 6.17156 13 6.99998C13 7.82841 13.6716 8.49998 14.5 8.49998Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></span><span class="sidebar__nav-label">Themes</span></a></ul></ul>
            </nav>
          </div>
      </aside>
      <div class="themes">
        <div class="ui-heading ui-heading--orange">
          <div class="ui-heading__stack">
            <span class="ui-heading__backdrop" aria-hidden="true"></span>
            <div class="ui-heading__surface">
              <h1 class="ui-heading__title">Themes</h1>
            </div>
          </div>
        </div>
        <div class="themes__div-container">
          <div class="themes__div-label-container">
            <h2>Themes</h2>
            <p>Choose your flavouring!</p>
          </div>
          <div class="themes__div-options-container" id="bg-color-container">
            <div class="themes__div-option themes__div-option--bg-color" name="bg-color-option" id="bg-color-vanilla">
              <p class="themes__div-option-name">Vanilla</p>
            </div>
            <div class="themes__div-option themes__div-option--bg-color" name="bg-color-option" id="bg-color-ruby">
              <p class="themes__div-option-name">Ruby</p>
            </div>
            <div class="themes__div-option themes__div-option--bg-color" name="bg-color-option" id="bg-color-catppuccin-mocha">
              <p class="themes__div-option-name">Catppuccin Mocha</p>
            </div>
            <div class="themes__div-option themes__div-option--bg-color" name="bg-color-option" id="bg-color-catppuccin-macchiato">
              <p class="themes__div-option-name">Catppuccin Macchiato [⚠️ WIP]</p>
            </div>
            <div class="themes__div-option themes__div-option--bg-color" name="bg-color-option" id="bg-color-charcoal">
              <p class="themes__div-option-name">Charcoal <small>(by Aperaine)</small></p>
            </div>
            <div class="themes__div-option themes__div-option--bg-color" name="bg-color-option" id="bg-color-leafy">
              <p class="themes__div-option-name">Leafy</p>
            </div>
          <div>
        </div>
      </div>
    `;

    const el = {
      bgColorContainer: document.getElementById("bg-color-container"),
      bgColorOptions: document.querySelectorAll(".themes__div-option--bg-color"),
      bgColorVanilla: document.getElementById("bg-color-vanilla")
    }

    if (savedBgColor) {
      const activeOpt = document.getElementById(savedBgColor);
      if (activeOpt) activeOpt.setAttribute("selected", true);
    }

    for (i = 0; i < el.bgColorOptions.length; i++) {
      el.bgColorOptions[i].addEventListener('click', selectBgColorOption);
    }

    function selectBgColorOption(event) {
      const selectedId = event.currentTarget.id;
      const options = document.querySelectorAll('.themes__div-option--bg-color');
      Array.prototype.forEach.call(options, function (el) {
        el.setAttribute("selected", false);
      });
      localStorage.setItem("bg-color-theme", selectedId);
      event.currentTarget.setAttribute("selected", true);
      applyTheme(selectedId);
    }
  }
}

function applyTheme(themeId) {
  const body = document.body;

  body.removeAttribute("data-theme");
  body.style.removeProperty("--theme-bg-image");

  if (themeId && themeId != "bg-color-vanilla") {
    body.setAttribute("data-theme", themeId);

    if (themeId === "bg-color-ruby") {
      var bgUrl = chrome.runtime.getURL("/themes/bg-color/ruby/bg.png");
      body.style.setProperty("--theme-bg-image", `url('${bgUrl}')`);
      if (document.querySelector(".sidebar__user-avatar-hat-bg")) {
        document.querySelector(".sidebar__user-avatar-hat-bg").src = "https://i.ibb.co/YBF6TqZ0/Mask-group-19.png";
      }
    } else if (themeId === "bg-color-catppuccin-mocha") {
      body.style.setProperty("--theme-bg-image", `url('https://i.ibb.co/fYQVfZbb/Mask-group-12.png')`);
      if (document.querySelector(".sidebar__user-avatar-hat-bg")) {
        document.querySelector(".sidebar__user-avatar-hat-bg").src = "https://i.ibb.co/cSZ853Kk/Mask-group-17.png";
      }
    } else if (themeId === "bg-color-catppuccin-macchiato") {
      body.style.setProperty("--theme-bg-image", `url('https://i.ibb.co/C5mZtM9R/Mask-group-13.png')`);
      if (document.querySelector(".sidebar__user-avatar-hat-bg")) {
        document.querySelector(".sidebar__user-avatar-hat-bg").src = "https://i.ibb.co/zhK0H9KW/Mask-group-16.png";
      }
    } else if (themeId === "bg-color-charcoal") {
      var bgUrl = chrome.runtime.getURL("/themes/bg-color/charcoal/bg.png");
      body.style.setProperty("--theme-bg-image", `url('${bgUrl}')`);
      if (document.querySelector(".sidebar__user-avatar-hat-bg")) {
        document.querySelector(".sidebar__user-avatar-hat-bg").src = "https://hc-cdn.hel1.your-objectstorage.com/s/v3/d6258e630f490ea0_mask.png";
      }
    } else if (themeId === "bg-color-leafy") {
      body.style.setProperty("--theme-bg-image", `url('https://i.ibb.co/qFNQLtjq/Mask-group-21.png')`);
      if (document.querySelector(".sidebar__user-avatar-hat-bg")) {
        document.querySelector(".sidebar__user-avatar-hat-bg").src = "https://i.ibb.co/S7wr4DvT/Mask-group-20.png";
      }
    }
  }
}

function addBannerTemplateHint() {
  const bannerInputDiv = document.querySelector(".input.file-upload.input--green");
  if (!bannerInputDiv) return;

  const bannerInputSubtitle = bannerInputDiv.querySelector(".input__subtitle");

  bannerInputSubtitle.textContent += " ";

  const bannerTemplateFileUrl = chrome.runtime.getURL("/download/banner-template.png")

  const bannerTemplateDownloadHint = document.createElement("a");
  bannerTemplateDownloadHint.textContent = "View the deprecated banner template.";
  bannerTemplateDownloadHint.href = bannerTemplateFileUrl;
  bannerTemplateDownloadHint.target = "_blank";

  bannerInputSubtitle.appendChild(bannerTemplateDownloadHint);
}

function incompatiability() {
  if (location.pathname != "/projects/135" || !document.querySelector(".projects-show")) return;
  const warningDiv = document.createElement("div");
  warningDiv.classList.add("warning__div");
  document.querySelector(".projects-show").insertBefore(warningDiv, document.querySelector(".projects-show__container"));
  const warningHeading = document.createElement("h3");
  warningHeading.textContent = "Warning!";
  warningDiv.appendChild(warningHeading);
  const warningDescription = document.createElement("p");
  warningDescription.textContent = "This extension may be incompatiable with Spicetown. If there is a feature from this extension specifically that you would love Spicetown to have, feel free to let us know at #spicetown on Slack! Happy Flavortowning!";
  warningDiv.appendChild(warningDescription);
}

function saveSetting(value) {
  chrome.storage.local.set({'screenshareMode': value});
}

function applySettingsSync() {
  function initializeCensor(el) {el.classList.add("api-key-display-secure"); el.classList.add("api-key-display-censored"); el.textContent = "";}
  function applyCensor(el) {el.classList.add("api-key-display-censored"); el.classList.remove("api-key-display-visible"); el.textContent = "";}
  function removeCensor(el, text) {el.classList.remove("api-key-display-censored"); el.classList.add("api-key-display-visible"); el.textContent = text;}

  chrome.storage.local.get(['screenshareMode'], function(result) {
    let value = result.screenshareMode;
    if (value !== undefined && value) {
      // apiKeyDisplay blurring change
      const apiKeyDisplay = document.querySelector(".api-key-display");

      if (apiKeyDisplay) {
        let censoredA = true;

        initializeCensor(apiKeyDisplay);
        apiKeyDisplay.textContent = str_rand(6); // haha funny number

        apiKeyDisplay.addEventListener('mouseleave', (e) => {
          e.stopImmediatePropagation();
        }, true);

        apiKeyDisplay.addEventListener('mouseup', () => {
          if (censoredA) {
            censoredA = false;
            removeCensor(apiKeyDisplay, apiKey);
          } else {
            censoredA = true;
            applyCensor(apiKeyDisplay);
            apiKeyDisplay.textContent = str_rand(7); // HAHAHAHA FUNNI NUMBERRRRR (kys if you laughed /j)
          }
        }, true);
      }

      // homeAddress blurring change
      const homeAddressDisplay = document.querySelector(".my-orders__header-value.my-orders__blurred-when-inactive");

      if (homeAddressDisplay) {
        let censoredH = true;
        const homeAddress = homeAddressDisplay.textContent;

        initializeCensor(homeAddressDisplay);
        homeAddressDisplay.textContent = str_rand(homeAddress.length);
        
        homeAddressDisplay.addEventListener('mouseleave', (e) => {
          e.stopImmediatePropagation();
        }, true);

        homeAddressDisplay.addEventListener('mouseup', () => {
          if (censoredH) {
            censoredH = false;
            removeCensor(homeAddressDisplay, homeAddress);
          } else {
            censoredH = true;
            applyCensor(homeAddressDisplay);
            homeAddressDisplay.textContent = str_rand(homeAddress.length);
          }
        }, true);
      }

      // shipping address black out
      const shippingAddressText = document.querySelector(".dropdown__char-span");

      if (shippingAddressText) {
        const shippingAddress = shippingAddressText.textContent;

        document.querySelector(".dropdown__menu").classList.add("dropdown__menu-secure")

        initializeCensor(shippingAddressText);
        shippingAddressText.textContent = str_rand(shippingAddress.length);
      }
    }
  })
}

function applyUISync() {
  chrome.storage.local.get(['screenshareMode'], function(result) {
    let value = result.screenshareMode;
    if (value !== undefined) {
      const screenshareModeCheckbox = document.getElementById('screenshare_mode');
      if (!screenshareModeCheckbox) return;

      screenshareModeCheckbox.checked = value;
    }
  })
}

function str_rand(length) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        const randomInd = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomInd);
    }
    return result;
}

function convertMToFormat(mins) {
  let h = Math.floor(mins / 60);
  let m = Math.floor(mins % 60);
  return `${String(h)} hours and ${String(m)} minutes`;
}

async function getFlavortownCSS() { // partially stolen from CoM, my other project :3
  try {
    const response = await fetch('https://flavortown.hackclub.com/');
    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const cssLink = Array.from(doc.querySelectorAll('link[rel="stylesheet"]'))
      .find(link => link.href.includes('application-') && link.href.endsWith('.css'));

    if (cssLink) {
      console.log(cssLink.href);
      return cssLink.href;
    }
  } catch (err) {
    console.error("wtf i couldnt get flavortown css THIS FUCKING WEBSITE GRRRRRRR; error: " + err);
  }
}

initialize();