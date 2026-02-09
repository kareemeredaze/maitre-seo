const logos = [
  "Entrepreneur",
  "Business Insider",
  "Search Engine Watch",
  "SEO Camp",
  "Journal du Net",
  "Abondance",
];

export default function TrustBanner() {
  return (
    <section className="py-12 border-y border-border-subtle">
      <p className="text-center text-sm text-text-tertiary mb-8">
        Ils nous font confiance pour leurs clients
      </p>
      <div className="overflow-hidden">
        <div className="animate-scroll-x flex gap-16 w-max">
          {[...logos, ...logos].map((logo, i) => (
            <span
              key={i}
              className="text-xl font-semibold text-text-tertiary opacity-50 hover:opacity-100 transition-opacity whitespace-nowrap"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
