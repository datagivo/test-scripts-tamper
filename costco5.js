(function () {
  "use strict";

  // --- Config ---
  const TEXT_TARGET = "Visa® Card by Citi";
  const TEXT_REPLACEMENT = "AMEX® Card by Datastealth";

  const ORIGINAL_IMAGE_FILENAME = "Costco_Consumer_Visa_k90_1536x969.png";
  const IMAGE_REPLACEMENT_URL = "https://icm.aexp-static.com/Internet/internationalcardshop/en_ca/images/cards/Gold_Rewards_Card.png";

  // --- Replace text in nodes ---
  function replaceText(node) {
    if (node.nodeType === Node.TEXT_NODE && node.nodeValue.includes(TEXT_TARGET)) {
      node.nodeValue = node.nodeValue.replaceAll(TEXT_TARGET, TEXT_REPLACEMENT);
    }
  }

  // --- Replace image src and enforce it ---
  function enforceImage(img) {
    if (!img) return;

    // Set the replacement initially
    img.src = IMAGE_REPLACEMENT_URL;
    img.alt = "AMEX Logo";

    // Observe changes to the src attribute
    const imgObserver = new MutationObserver(() => {
      if (!img.src.includes(IMAGE_REPLACEMENT_URL)) {
        img.src = IMAGE_REPLACEMENT_URL;
      }
    });

    imgObserver.observe(img, {
      attributes: true,
      attributeFilter: ["src"],
    });
  }

  // --- Core replace function ---
  function replaceContent(node) {
    if (!node) return;

    if (node.nodeType === Node.TEXT_NODE) {
      replaceText(node);
      return;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      // Text nodes inside element
      node.childNodes.forEach(replaceText);

      // Target images
      if (node.tagName === "IMG" && node.src.includes(ORIGINAL_IMAGE_FILENAME)) {
        enforceImage(node);
      }

      // Skip script/style/textarea/noscript
      if (/^(SCRIPT|STYLE|TEXTAREA|NOSCRIPT)$/i.test(node.tagName)) return;

      node.childNodes.forEach(replaceContent);
    }
  }

  // --- Initialization ---
  function init() {
    // Initial pass
    replaceContent(document.body);

    // Observe dynamic DOM changes
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData") {
          replaceText(mutation.target);
        } else {
          mutation.addedNodes.forEach(replaceContent);
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    console.log("✅ Text + image replacement active (enforced against page scripts)");
  }

  // --- Run after DOM is ready ---
  if (document.readyState === "complete" || document.readyState === "interactive") {
    init();
  } else {
    document.addEventListener("DOMContentLoaded", init);
  }
})();
