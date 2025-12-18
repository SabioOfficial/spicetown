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

function addSpicetownSettings() {
  const settingsForm = document.querySelector(".settings-form");
  const modalActions = settingsForm.querySelector(".modal__actions");
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
      const apiKeyDisplay = document.querySelector(".api-key-display");
      if (!apiKeyDisplay) return;

      let censored = true;
      let apiKey = apiKeyDisplay.textContent;

      initializeCensor(apiKeyDisplay);
      apiKeyDisplay.textContent = "";

      apiKeyDisplay.addEventListener('mouseleave', (e) => {
        e.stopImmediatePropagation();
      }, true);

      apiKeyDisplay.addEventListener('mouseup', () => {
        if (censored) {
          censored = false;
          removeCensor(apiKeyDisplay, apiKey)
        } else {
          censored = true;
          applyCensor(apiKeyDisplay)
        }
      }, true);
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

initialize();