/**
 * Business and legal facts behind /terms, /privacy and /refund-policy. Only the owner can supply these.
 * While anything here is missing, those pages show marked blanks on the dev server and return 404 in
 * production, and they stay out of the footer and sitemap.
 */
export const legalDetails = {
  /** Registered name of the business that sells OTTV. */
  legalName: "",
  /** Registered business address. */
  registeredAddress: "",
  /** Email address for legal and privacy requests. */
  contactEmail: "",
  /** Date these policies take effect, YYYY-MM-DD. */
  effectiveDate: "",
  /** Law and courts that govern the terms. */
  governingLaw: "",
  /** Accepted payment methods and who processes them. */
  paymentMethods: "",
  /** Who holds the rights to the content OTTV distributes, as approved by a lawyer. */
  contentRights: "",
  /** Who may use the service and what is not allowed, including sharing logins and minimum age. */
  acceptableUse: "",
  /** Limits on OTTV's liability, as approved by a lawyer. */
  liability: "",
  /** Any conditions on the 7-day money-back guarantee, or a statement that there are none. */
  refundConditions: "",
  /** How a refund is paid back and how long it takes. */
  refundProcess: "",
  /** How long customer details and chats are kept. */
  dataRetention: "",
  /** Legal basis for handling data, and the rights customers have in the countries served. */
  privacyRights: "",
  /** How analytics consent is handled, for example a cookie banner for EU and UK visitors. */
  analyticsConsent:
    "These tools run only after you choose Accept in the analytics banner. If you choose Reject, they do not load. You can change your choice at any time with Cookie settings in the footer, and we ask again after 180 days.",
};

export type LegalField = keyof typeof legalDetails;

/** Set to true only after a lawyer has reviewed the completed pages. */
export const legalReviewComplete = false;

export const legalPagesReady =
  legalReviewComplete &&
  /^\d{4}-\d{2}-\d{2}$/.test(legalDetails.effectiveDate) &&
  Object.values(legalDetails).every((value) => value.trim().length > 0);

/** Footer and sitemap entries, empty until the pages are ready to publish. */
export const legalLinks = legalPagesReady
  ? [
      { name: "Terms", href: "/terms" },
      { name: "Privacy", href: "/privacy" },
      { name: "Refund Policy", href: "/refund-policy" },
    ]
  : [];
