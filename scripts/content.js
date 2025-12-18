let apiKey = "Wait! We're trying to obtain the API Key for you..."

function initialize() {
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
  addBannerTemplateHint();
}

async function addSpicetownSettings() {
  const settingsForm = await document.querySelector(".settings-form");
  const modalActions = await settingsForm.querySelector(".modal__actions");
  const saveBtn = modalActions.querySelector(".modal__actions-close");

  if (!settingsForm || !modalActions || !saveBtn) return;

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
    themesNavIcon.setAttribute("stroke", "currentColor");
    themesNavIcon.setAttribute("stroke-width", "2");
    themesNavIcon.setAttribute("stroke-linecap", "round");
    themesNavIcon.setAttribute("stroke-linejoin", "round")
    themesNavIcon.classList.add("sidebar__nav-icon");
    themesNavIconSpan.appendChild(themesNavIcon);

    const themesNavIconG = document.createElementNS("http://www.w3.org/2000/svg", "g");
    themesNavIconG.setAttribute("fill", "currentColor");
    themesNavIcon.appendChild(themesNavIconG);

    const themesNavIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    themesNavIconPath.setAttribute("d", "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z");
    themesNavIconG.appendChild(themesNavIconPath);

    const themesNavIconCircle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    themesNavIconCircle1.setAttribute("cx", "13.5");
    themesNavIconCircle1.setAttribute("cy", "6.5");
    themesNavIconCircle1.setAttribute("r", ".5");
    themesNavIconCircle1.setAttribute("fill", "none");
    themesNavIconG.appendChild(themesNavIconCircle1);

    const themesNavIconCircle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    themesNavIconCircle2.setAttribute("cx", "17.5");
    themesNavIconCircle2.setAttribute("cy", "10.5");
    themesNavIconCircle2.setAttribute("r", ".5");
    themesNavIconCircle2.setAttribute("fill", "none");
    themesNavIconG.appendChild(themesNavIconCircle2);

    const themesNavIconCircle3 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    themesNavIconCircle3.setAttribute("cx", "6.5");
    themesNavIconCircle3.setAttribute("cy", "12.5");
    themesNavIconCircle3.setAttribute("r", ".5");
    themesNavIconCircle3.setAttribute("fill", "none");
    themesNavIconG.appendChild(themesNavIconCircle3);

    const themesNavIconCircle4 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    themesNavIconCircle4.setAttribute("cx", "8.5");
    themesNavIconCircle4.setAttribute("cy", "7.5");
    themesNavIconCircle4.setAttribute("r", ".5");
    themesNavIconCircle4.setAttribute("fill", "none");
    themesNavIconG.appendChild(themesNavIconCircle4);

    const themesNavLabel = document.createElement("span");
    themesNavLabel.classList.add("sidebar__nav-label");
    themesNavLabel.textContent = "Themes";
    themesNavLink.appendChild(themesNavLabel);
  }
}

function addBannerTemplateHint() {
  const bannerInputDiv = document.querySelector(".input.file-upload.input--green");
  const bannerInputSubtitle = bannerInputDiv.querySelector(".input__subtitle");

  if (!bannerInputDiv || !bannerInputSubtitle) return;

  bannerInputSubtitle.textContent += " ";

  const bannerTemplateFileUrl = chrome.runtime.getURL("/download/banner-template.png")

  const bannerTemplateDownloadHint = document.createElement("a");
  bannerTemplateDownloadHint.textContent = "View the banner template.";
  bannerTemplateDownloadHint.href = bannerTemplateFileUrl;
  bannerTemplateDownloadHint.target = "_blank";

  bannerInputSubtitle.appendChild(bannerTemplateDownloadHint);
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
        apiKey = apiKeyDisplay.textContent;

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
        let censoredS = true;
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

initialize();