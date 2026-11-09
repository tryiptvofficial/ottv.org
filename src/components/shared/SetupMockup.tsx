/**
 * Illustration of the real flow: the WhatsApp order message and the player app login a customer
 * fills in afterwards. Decorative, so hidden from assistive tech. Two tilted white cards.
 */
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-meta text-subtle">{label}</p>
      <p className="mt-1 rounded-control border border-input px-3 py-2 text-caption text-foreground">{value}</p>
    </div>
  );
}

export function SetupMockup() {
  return (
    <div aria-hidden className="relative mx-auto h-[34rem] w-full max-w-xl select-none">
      <div className="tone-light absolute right-2 top-4 w-[78%] rotate-6 rounded-card p-6 pb-20 shadow-mockup">
        <div className="flex items-center justify-between">
          <p className="text-caption">Your order</p>
          <span className="inline-flex h-6 items-center rounded-badge bg-secondary px-3 text-meta font-medium text-secondary-foreground">WhatsApp</span>
        </div>
        <p className="mt-4 ml-auto w-fit max-w-[85%] rounded-card bg-secondary px-4 py-2 text-caption text-secondary-foreground">
          I would like to order the 12 Months IPTV plan.
        </p>
        <p className="mt-2 w-fit max-w-[85%] rounded-card border border-input px-4 py-2 text-caption">
          Your login details will arrive in this chat.
        </p>
      </div>
      <div className="tone-light absolute bottom-0 left-0 w-[78%] -rotate-3 rounded-card p-6 shadow-mockup">
        <p className="text-subheading">Enter your subscription details</p>
        <div className="mt-4 space-y-3">
          <Field label="Playlist name" value="OTTV" />
          <Field label="Username" value="••••••••" />
        </div>
        <p className="mt-4 flex h-10 items-center justify-center rounded-pill bg-primary text-label text-primary-foreground">Sign in</p>
      </div>
    </div>
  );
}
