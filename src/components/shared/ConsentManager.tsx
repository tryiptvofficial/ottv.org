"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { legalLinks } from "@/lib/site-data/legal-details";

// Loaded only after a visitor accepts, so no analytics code or request exists before that.
const Analytics = dynamic(() => import("@/components/shared/Analytics").then((mod) => mod.Analytics), { ssr: false });

const storageKey = "ottv-analytics-consent";
const maxAgeMs = 180 * 24 * 60 * 60 * 1000;

type Choice = "accepted" | "rejected";
type ChoiceState = Choice | "unset";

const listeners = new Set<() => void>();
let settingsOpen = false;
let returnFocus: HTMLElement | null = null;
// Used only when the browser refuses storage, so the banner still closes for this visit.
let memoryChoice: Choice | null = null;

function notify() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function readChoice(): ChoiceState {
  if (memoryChoice) return memoryChoice;
  try {
    const saved = JSON.parse(window.localStorage.getItem(storageKey) ?? "null") as { choice?: string; at?: number } | null;
    if (!saved || typeof saved.at !== "number" || Date.now() - saved.at > maxAgeMs) return "unset";
    return saved.choice === "accepted" || saved.choice === "rejected" ? saved.choice : "unset";
  } catch {
    return "unset";
  }
}

/** Expires Google Analytics cookies on this host and each parent domain they may have been set on. */
function clearAnalyticsCookies() {
  const names = document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0].trim())
    .filter((name) => /^_(ga|gid|gat)/.test(name));
  const parts = window.location.hostname.split(".");
  const domains = [""];
  for (let i = 0; i < parts.length - 1; i++) domains.push(`; domain=.${parts.slice(i).join(".")}`);
  for (const name of names) {
    for (const domain of domains) document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
  }
}

function saveChoice(choice: Choice) {
  const previous = readChoice();
  try {
    window.localStorage.setItem(storageKey, JSON.stringify({ choice, at: Date.now() }));
  } catch {
    memoryChoice = choice;
  }
  settingsOpen = false;
  notify();
  if (previous === "accepted" && choice === "rejected") {
    clearAnalyticsCookies();
    // Scripts already running cannot be unloaded, so withdrawing consent needs a fresh page.
    window.location.reload();
    return;
  }
  returnFocus?.focus();
  returnFocus = null;
}

function openSettings() {
  returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  settingsOpen = true;
  notify();
}

/** Reopens the choice from the footer, because withdrawing must be as easy as accepting. */
export function ConsentSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={openSettings}>
      Cookie settings
    </button>
  );
}

/** True while the analytics choice is on screen (first visit, or reopened from the footer). */
export function useConsentPanelOpen() {
  const choice = useSyncExternalStore<ChoiceState | "server">(subscribe, readChoice, () => "server");
  const reopened = useSyncExternalStore(subscribe, () => settingsOpen, () => false);
  return choice === "unset" || reopened;
}

export function ConsentManager() {
  const choice = useSyncExternalStore<ChoiceState | "server">(subscribe, readChoice, () => "server");
  const reopened = useSyncExternalStore(subscribe, () => settingsOpen, () => false);
  const privacyLink = legalLinks.find((link) => link.href === "/privacy");

  return (
    <>
      {choice === "accepted" && <Analytics />}
      {(choice === "unset" || reopened) && (
        // Phones: a compact bar on the bottom edge, short enough to leave the hero's buttons in view on a 375x812
        // screen. From 640px: a card in the bottom-right corner, away from the hero's buttons on the left. It sits
        // above the floating contact button, which steps aside while the choice is open.
        <section
          aria-label="Analytics choice"
          className="fixed inset-x-0 bottom-0 z-[60] border-t bg-card px-4 pb-[max(0.625rem,env(safe-area-inset-bottom))] pt-2.5 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:max-w-md sm:rounded-card sm:border-t-0 sm:p-5 sm:shadow-overlay"
        >
          <p className="text-caption text-muted-foreground">
            <span className="font-medium text-foreground sm:mb-1 sm:block sm:text-label">Allow analytics?</span>{" "}
            Google Analytics, Visitors and Ahrefs see how the site is used. They run only if you accept.
            {reopened && choice !== "unset" && ` Your current choice: ${choice}.`}
            {privacyLink && (
              <>
                {" "}
                <Link href={privacyLink.href} className="text-link">Privacy Policy</Link>
              </>
            )}
          </p>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:mt-4">
            <Button size="sm" variant="secondary" autoFocus={reopened} onClick={() => saveChoice("rejected")}>Reject</Button>
            <Button size="sm" variant="secondary" onClick={() => saveChoice("accepted")}>Accept</Button>
          </div>
        </section>
      )}
    </>
  );
}
