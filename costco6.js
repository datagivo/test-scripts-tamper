(function () {
  "use strict";

  // --- Config: change these to whatever joke values you like ---
  const NEW_NAME = "GREGORY BARRY IVO";
  const NEW_LAST4 = "2045";
  const NEW_EXPIRY = "04/27";
  const NEW_CARD_BRAND = "Visa"; // optional, can replace visa/mastercard

  // --- Function to update card info ---
  function modifyCardInfo(cardContainer) {
    if (!cardContainer) return;

    // Name
    const nameEl = cardContainer.querySelector('[automation-id="nameOnCardLabel"]');
    if (nameEl) nameEl.textContent = NEW_NAME;

    // Last 4 digits
    const last4El = cardContainer.querySelector('[automation-id="cardInformationOutput"]');
    if (last4El) last4El.textContent = NEW_LAST4;

    // Expiration date
    const expEl = cardContainer.querySelector('[automation-id="expirationDate"]');
    if (expEl) expEl.textContent = NEW_EXPIRY;

    // Card brand text
    const brandEl = cardContainer.querySelector('[automation-id="billingAddressCardType"]');
    if (brandEl) brandEl.textContent = NEW_CARD_BRAND.toLowerCase();

    // Card image (optional: change to AMEX logo)
    const imgEl = cardContainer.querySelector('img[automation-id="cardTypeImage"]');
    if (imgEl) {
      imgEl.src = "https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo_%282018%29.svg";
      imgEl.alt = NEW_CARD_BRAND + " Logo";
    }

    console.log("✅ Card info replaced with joke values!");
  }

  // --- Observer to monitor DOM changes ---
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const cardContainer = node.closest("#payment-method-display") || node.querySelector("#payment-method-display");
          if (cardContainer) modifyCardInfo(cardContainer);
        }
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // --- Initial check in case it's already rendered ---
  const existingCard = document.querySelector("#payment-method-display");
  if (existingCard) modifyCardInfo(existingCard);

})();
