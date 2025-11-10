(function () {
  "use strict";

  // --- Config ---
  const TEXT_TARGET = "Visa® Card by Citi";
  const TEXT_REPLACEMENT = "AMEX® Card by Datastealth";

  // Original image URL to detect
  const IMAGE_URL = "https://mobilecontent.costco.com/live/resource/img/static-us-landing-pages/Costco_Consumer_Visa_k90_1536x969.png";
  // Replacement image URL (AMEX logo)
  const IMAGE_REPLACEMENT_URL = "https://icm.aexp-static.com/Internet/internationalcardshop/en_ca/images/cards/Gold_Rewards_Card.png";

  // --- Core replace function ---
  function replaceContent(node) {
    if (!node) return;

    // Replace text nodes
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.nodeValue.includes(TEXT_TARGET)) {
        node.nodeValue = node.nodeValue.replaceAll(TEXT_TARGET, TEXT_REPLACEMENT);
      }
      return;
    }

    // Replace image src for existing <img> elements
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName === "IMG" && node.src === IMAGE_URL) {
        node.src = IMAGE_REPLACEMENT_URL;
        node.alt = "AMEX Logo"; // optional
        return;
      }

      // Skip script/style/textarea/noscript to avoid breaking page
      if (/^(SCRIPT|STYLE|TEXTAREA|NOSCRIPT)$/i.test(node.tagName)) return;

      // Recurse through children
      for (const child of node.childNodes) replaceContent(child);
    }
  }

  // --- Initialization function ---
  function init() {
    // Initial pass on the existing DOM
    replaceContent(document.body);

    // Watch for new dynamic content
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData") {
          replaceContent(mutation.target);
        } else {
          for (const added of mutation.addedNodes) {
            replaceContent(added);
          }
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    console.log("✅ Costco text + image replacement active across the whole page");
  }

  // --- Run immediately if ready, or wait for DOM load ---
  if (document.readyState === "complete" || document.readyState === "interactive") {
    init();
  } else {
    document.addEventListener("DOMContentLoaded", init);
  }

})();
