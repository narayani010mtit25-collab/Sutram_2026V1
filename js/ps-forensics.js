// ══════════════════════════════════════════════════════════════════
// SUTRAM 2026 — Problem Statements System
// Clean interactive card details & modal management for PS01 - PS05
// ══════════════════════════════════════════════════════════════════

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".problem-card[data-ps]");

  // ══════════════════════════════════════════════════════════════════
  // Problem Statements Detail Modal System
  // Populates full descriptions, challenges, and deliverables from official document
  // ══════════════════════════════════════════════════════════════════
  const PROBLEM_STATEMENTS = {
    ps01: {
      id: "SutramPS01",
      track: "Problem Statement 1",
      title: "AI-Assisted Mobile Evidence Intelligence Platform",
      desc: "Mobile phones constitute the primary source of evidence in cybercrime investigations. Investigators are often required to examine thousands of artefacts originating from call logs, messages, application databases, browser histories, media files, geolocation records, and cloud-synchronized content. Existing forensic solutions primarily focus on extraction, while investigators spend significant effort manually identifying relevant evidence.",
      challenge: [
        "Automated parsing of mobile artefacts.",
        "Recovery and reconstruction of deleted activities.",
        "Behavioural profiling of device users.",
        "Automated generation of investigative leads.",
        "Timeline reconstruction of user activities.",
        "Multilingual evidence analysis."
      ],
      deliverables: [
        "Mobile artefact analysis engine.",
        "AI-based evidence prioritization module.",
        "Automated timeline reconstruction.",
        "Investigation summary generator.",
        "Forensic reporting dashboard."
      ],
      tags: ["#MobileForensics", "#Timeline", "#ArtefactParser", "#BehaviouralProfiling"]
    },
    ps02: {
      id: "SutramPS02",
      track: "Problem Statement 2",
      title: "Multimedia Evidence Authentication, Deepfake Detection and Provenance Analysis Framework",
      desc: "The increasing use of Artificial Intelligence and Generative AI technologies has led to a rise in manipulated images, videos, and audio recordings being used for cyber fraud, digital impersonation, misinformation campaigns, online harassment, extortion, and other cyber-enabled crimes. Investigating agencies and forensic laboratories require reliable tools to authenticate multimedia evidence, detect AI-generated content, identify tampering, and establish the origin and evidentiary value of digital media.",
      challenge: [
        "Detecting deepfakes, synthetic media, and AI-generated images, videos, or audio recordings.",
        "Identifying manipulation and tampering in multimedia content.",
        "Verifying the authenticity and integrity of multimedia evidence.",
        "Performing source attribution and provenance analysis of digital media.",
        "Generating explainable forensic findings and investigation reports."
      ],
      deliverables: [
        "Deepfake and Synthetic Media Detection Engine.",
        "Multimedia Authentication and Tampering Detection Framework.",
        "Multimedia Provenance and Source Attribution Tool.",
        "Explainable AI-based Multimedia Forensic Analysis Dashboard.",
        "Automated Multimedia Forensic Reporting System (PoC/MVP/Prototype)."
      ],
      tags: ["#Deepfake", "#Provenance", "#MediaTampering", "#ExplainableAI"]
    },
    ps03: {
      id: "SutramPS03",
      track: "Problem Statement 3",
      title: "Digital Evidence Correlation and Crime Reconstruction Engine",
      desc: "Investigations frequently involve heterogeneous evidence originating from mobile devices, social media, CCTV footage, cloud services, financial records, emails, and network logs. Manual correlation of evidence remains labour-intensive and error-prone.",
      challenge: [
        "Correlating evidence from multiple sources.",
        "Constructing temporal and spatial relationships.",
        "Identifying associations among suspects, devices, locations, and events.",
        "Reconstructing digital crime scenes."
      ],
      deliverables: [
        "Evidence correlation engine.",
        "Knowledge graph generation framework.",
        "Crime reconstruction dashboard.",
        "Automated event-sequence generator.",
        "Interactive visual investigation platform."
      ],
      tags: ["#KnowledgeGraph", "#Timeline", "#CrimeReconstruction", "#SpatialCorrelation"]
    },
    ps04: {
      id: "SutramPS04",
      track: "Problem Statement 4",
      title: "AI-Powered Cyber Fraud Investigation and Attribution System",
      desc: "Financial cyber frauds involving UPI, mule accounts, SIM swapping, phishing, investment scams, and social engineering constitute the largest category of cybercrime complaints reported through NCRP and the 1930 helpline. Investigators must rapidly identify relationships among victims, bank accounts, devices, communication channels, and suspect entities.",
      challenge: [
        "Entity extraction and resolution.",
        "Relationship discovery among fraud actors.",
        "Transaction flow analysis.",
        "Identification of mule accounts and fraud networks.",
        "Generation of actionable intelligence."
      ],
      deliverables: [
        "Fraud attribution engine.",
        "Entity-resolution framework.",
        "Financial evidence correlation dashboard.",
        "Fraud-network visualization platform.",
        "Investigative intelligence reports."
      ],
      tags: ["#FraudAttribution", "#EntityResolution", "#UPITransactions", "#MuleAccounts"]
    },
    ps05: {
      id: "SutramPS05",
      track: "Problem Statement 5",
      title: "AI-Powered Digital Investigation Assistant",
      desc: "The volume of digital evidence available in modern investigations frequently exceeds the capacity of investigators to examine and interpret information manually. Artificial Intelligence offers the potential to transform digital investigations through intelligent evidence exploration and automated reasoning.",
      challenge: [
        "Natural language querying of forensic evidence.",
        "Context-aware evidence search.",
        "Automated case summarization.",
        "Identification of suspicious patterns and anomalies.",
        "Recommendation of investigative leads.",
        "Generation of draft case reports."
      ],
      deliverables: [
        "Conversational forensic assistant.",
        "Evidence retrieval engine.",
        "Automated case diary generator.",
        "Investigative recommendation module.",
        "Multilingual interface."
      ],
      tags: ["#ForensicAI", "#CaseSummarizer", "#AnomalyDetection", "#NaturalLanguage"]
    }
  };

  const modal = document.getElementById("psModal");
  const modalOverlay = document.getElementById("psModalOverlay");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalFooterCloseBtn = document.getElementById("modalFooterCloseBtn");
  const modalPsId = document.getElementById("modalPsId");
  const modalPsTrack = document.getElementById("modalPsTrack");
  const modalPsTitle = document.getElementById("modalPsTitle");
  const modalPsDesc = document.getElementById("modalPsDesc");
  const modalPsChallenge = document.getElementById("modalPsChallenge");
  const modalPsDeliverables = document.getElementById("modalPsDeliverables");
  const modalPsTags = document.getElementById("modalPsTags");

  function openModal(psKey) {
    const data = PROBLEM_STATEMENTS[psKey];
    if (!data || !modal) return;

    if (modalPsId) modalPsId.textContent = data.id;
    if (modalPsTrack) modalPsTrack.textContent = data.track;
    if (modalPsTitle) modalPsTitle.textContent = data.title;
    if (modalPsDesc) modalPsDesc.textContent = data.desc;

    if (modalPsChallenge) {
      modalPsChallenge.innerHTML = data.challenge.map(item => `<li>${item}</li>`).join("");
    }

    if (modalPsDeliverables) {
      modalPsDeliverables.innerHTML = data.deliverables.map(item => `<li>${item}</li>`).join("");
    }

    if (modalPsTags) {
      modalPsTags.innerHTML = data.tags.map(t => `<span class="ps-modal-tag">${t}</span>`).join("");
    }

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Bind trigger buttons with [data-open-ps]
  document.querySelectorAll("[data-open-ps]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const psKey = btn.getAttribute("data-open-ps");
      openModal(psKey);
    });
  });

  // Clicking anywhere on card (except if clicking another link/button) opens modal
  cards.forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("button") || e.target.closest("a")) return;
      const psKey = card.getAttribute("data-ps");
      if (psKey) openModal(psKey);
    });

    // Keyboard accessibility for card
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        if (e.target.closest("button") || e.target.closest("a")) return;
        e.preventDefault();
        const psKey = card.getAttribute("data-ps");
        if (psKey) openModal(psKey);
      }
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modalFooterCloseBtn) modalFooterCloseBtn.addEventListener("click", closeModal);
  if (modalOverlay) modalOverlay.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  // Automatically open modal if URL contains hash anchor (e.g. #ps01)
  if (window.location.hash) {
    const hashKey = window.location.hash.replace("#", "").toLowerCase();
    if (PROBLEM_STATEMENTS[hashKey]) {
      setTimeout(() => openModal(hashKey), 250);
    }
  }
});
