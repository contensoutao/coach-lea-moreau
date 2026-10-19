import Image from "next/image";
import ContactForm from "./ContactForm";
import credits from "./credits.json";
import { APROPOS, COACH, ETAPES, FAQ, HERO, NUTRITION, OFFRES, PILIERS } from "./data";

const CTA = "inline-block rounded-lg bg-lime px-7 py-4 font-display font-black uppercase tracking-wide text-ink hover:bg-lime-deep";

export default function Page() {
  return (
    <main className="flex-1">
      {/* EN-TÊTE */}
      <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-10">
        <a href="#" className="font-display text-sm font-black uppercase tracking-wider">{COACH.nom} — Coach</a>
        <nav className="hidden gap-8 text-sm text-soft md:flex">
          <a href="#methode" className="hover:text-lime">Méthode</a>
          <a href="#offres" className="hover:text-lime">Offres</a>
          <a href="#apropos" className="hover:text-lime">À propos</a>
          <a href="#faq" className="hover:text-lime">Questions</a>
        </nav>
        <a href="#reserver" className="rounded-md bg-lime px-4 py-2.5 text-sm font-bold text-ink hover:bg-lime-deep">Séance offerte</a>
      </header>

      {/* ACCROCHE */}
      <section className="mx-auto max-w-7xl px-5 pt-10 pb-12 sm:px-10 sm:pt-16">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-lime">{COACH.metier} · {COACH.zone}</p>
        <h1 className="font-display text-[3.4rem] leading-[0.92] font-black uppercase tracking-tight sm:text-8xl lg:text-[8.5rem]">
          {HERO.lignes.map((l) => <span key={l} className="block">{l}</span>)}
          <span className="block text-lime">{HERO.accent}</span>
        </h1>
        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-xl text-lg text-soft">{HERO.texte}</p>
          <div className="flex flex-wrap gap-3">
            <a href="#reserver" className={CTA}>Réserver ma séance découverte</a>
            <a href="#offres" className="inline-block rounded-lg border border-line px-7 py-4 font-semibold text-chalk hover:border-lime">Voir les offres</a>
          </div>
        </div>
      </section>

      {/* BANDEAU PHOTO */}
      <div className="relative h-64 sm:h-[26rem]">
        <Image src="/photos/calme.jpg" alt="Étirements le matin, au calme" fill priority sizes="100vw" className="object-cover object-[center_60%]" />
      </div>

      {/* PILIERS */}
      <section className="grid gap-px bg-line md:grid-cols-3">
        {PILIERS.map((p, i) => (
          <div key={p.titre} className="bg-ink px-6 py-10 sm:px-10">
            <p className="font-display text-5xl font-black text-lime">0{i + 1}</p>
            <h2 className="mt-4 font-display text-xl font-black uppercase">{p.titre}</h2>
            <p className="mt-3 text-soft">{p.texte}</p>
          </div>
        ))}
      </section>

      {/* À PROPOS */}
      <section id="apropos" className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 sm:px-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
          <Image src="/photos/portrait.jpg" alt="Portrait de Léa" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover object-top grayscale-[35%]" />
        </div>
        <div>
          <h2 className="font-display text-5xl font-black uppercase sm:text-6xl">{APROPOS.titre}</h2>
          {APROPOS.texte.map((t) => <p key={t.slice(0, 20)} className="mt-6 text-lg text-soft">{t}</p>)}
          <p className="mt-8 inline-block border-l-4 border-lime pl-4 text-sm text-mute">{COACH.zone} · {COACH.reponse}</p>
        </div>
      </section>

      {/* MÉTHODE */}
      <section id="methode" className="border-y border-line bg-ink-2">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-10">
          <h2 className="font-display text-4xl font-black uppercase sm:text-5xl">Comment ça se passe</h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-4">
            {ETAPES.map((e, i) => (
              <li key={e.titre} className="border-t-2 border-lime pt-6">
                <p className="font-display text-sm font-black text-lime">ÉTAPE {i + 1}</p>
                <h3 className="mt-2 font-display text-xl font-black uppercase">{e.titre}</h3>
                <p className="mt-3 text-soft">{e.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* OFFRES */}
      <section id="offres" className="mx-auto max-w-7xl px-5 py-20 sm:px-10">
        <h2 className="font-display text-4xl font-black uppercase sm:text-5xl">Les offres</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {OFFRES.map((o) => (
            <div key={o.nom} className={o.phare ? "rounded-2xl bg-lime p-8 text-ink" : "rounded-2xl p-8 ring-1 ring-line"}>
              <p className={o.phare ? "text-xs font-bold uppercase tracking-widest" : "text-xs font-bold uppercase tracking-widest text-mute"}>{o.phare ? "Le plus choisi" : " "}</p>
              <h3 className="mt-3 font-display text-2xl font-black uppercase">{o.nom}</h3>
              <p className="mt-4 font-display text-5xl font-black">{o.prix}</p>
              <p className={o.phare ? "mt-1 text-sm" : "mt-1 text-sm text-mute"}>{o.detail}</p>
              <ul className="mt-6 space-y-2">
                {o.points.map((p) => <li key={p} className="flex gap-3"><span aria-hidden>→</span>{p}</li>)}
              </ul>
              <a href="#reserver" className={o.phare ? "mt-8 inline-block rounded-lg bg-ink px-6 py-3.5 font-bold text-lime" : "mt-8 inline-block rounded-lg border border-line px-6 py-3.5 font-semibold hover:border-lime"}>
                {o.prix === "Offerte" ? "Je réserve" : "Commencer par la séance offerte"}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* NUTRITION */}
      <section className="grid md:grid-cols-2">
        <div className="relative h-72 md:h-auto md:min-h-[28rem]">
          <Image src="/photos/nutrition.jpg" alt="Un repas équilibré sur une table en bois" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-col justify-center bg-ink-2 px-5 py-14 sm:px-14">
          <h2 className="font-display text-4xl font-black uppercase sm:text-5xl">{NUTRITION.titre}</h2>
          <p className="mt-6 max-w-lg text-lg text-soft">{NUTRITION.texte}</p>
        </div>
      </section>

      {/* QUESTIONS */}
      <section id="faq" className="mx-auto max-w-4xl px-5 py-20 sm:px-10">
        <h2 className="font-display text-4xl font-black uppercase sm:text-5xl">Questions fréquentes</h2>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {FAQ.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex items-center justify-between gap-6 font-display text-lg font-black uppercase">
                {f.q}<span className="plus text-2xl text-lime transition-transform">+</span>
              </summary>
              <p className="mt-3 text-soft">{f.r}</p>
            </details>
          ))}
        </div>
      </section>

      {/* RÉSERVER */}
      <section id="reserver" className="mx-auto max-w-4xl px-5 pb-24 sm:px-10">
        <h2 className="font-display text-4xl font-black uppercase sm:text-6xl">Ta séance <span className="text-lime">offerte</span></h2>
        <p className="mt-4 mb-10 text-lg text-soft">30 minutes pour faire le point, sans engagement. {COACH.reponse}.</p>
        <ContactForm />
      </section>

      {/* PIED DE PAGE */}
      <footer className="border-t border-line px-5 py-8 text-sm text-mute sm:px-10">
        <div className="mx-auto max-w-7xl space-y-2">
          <p><strong className="text-soft">Site de démonstration.</strong> {COACH.nom} est un personnage fictif : ce site montre ce qu&rsquo;un coach peut avoir en ligne en 48 h.</p>
          <p>Photos : {credits.map((c, i) => <span key={c.slug}>{i > 0 && ", "}<a href={c.source} className="underline hover:text-soft">{c.author}</a></span>)} (Unsplash).</p>
        </div>
      </footer>
    </main>
  );
}
