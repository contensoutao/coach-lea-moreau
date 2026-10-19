"use client";

import { useState } from "react";
import { OBJECTIFS } from "./data";

type Champs = { prenom: string; contact: string; objectif: string; message: string };
const VIDE: Champs = { prenom: "", contact: "", objectif: OBJECTIFS[0], message: "" };

function verifie(c: Champs) {
  const e: Partial<Record<keyof Champs, string>> = {};
  if (!c.prenom.trim()) e.prenom = "Dis-moi ton prénom.";
  if (!c.contact.trim()) e.contact = "Un e-mail ou un numéro, comme tu préfères.";
  else {
    const mail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c.contact.trim());
    const tel = /^[+\d][\d\s().-]{7,}$/.test(c.contact.trim());
    if (!mail && !tel) e.contact = "Ça ne ressemble ni à un e-mail ni à un numéro.";
  }
  return e;
}

export default function ContactForm() {
  const [champs, setChamps] = useState<Champs>(VIDE);
  const [erreurs, setErreurs] = useState<Partial<Record<keyof Champs, string>>>({});
  const [envoye, setEnvoye] = useState(false);

  const change = (k: keyof Champs) => (v: string) => {
    setChamps((p) => ({ ...p, [k]: v }));
    setErreurs((p) => ({ ...p, [k]: undefined }));
  };

  function envoie(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trouvees = verifie(champs);
    setErreurs(trouvees);
    if (Object.keys(trouvees).length) {
      document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }
    // DÉMO — rien n'est envoyé. Sur un vrai site, la demande partirait ici vers la boîte mail du coach.
    setEnvoye(true);
  }

  if (envoye) {
    return (
      <div role="status" className="rounded-2xl border border-lime/40 bg-ink-2 p-10 text-center">
        <p className="font-display text-4xl font-black uppercase text-lime">Merci, {champs.prenom} !</p>
        <p className="mx-auto mt-4 max-w-md text-soft">
          Ta demande de séance découverte est bien partie. Je te réponds sur <strong className="text-chalk">{champs.contact}</strong> sous 24 h.
        </p>
        <p className="mt-6 text-sm text-mute">(Site de démonstration : aucun message n&rsquo;a réellement été envoyé.)</p>
        <button type="button" onClick={() => { setChamps(VIDE); setEnvoye(false); }} className="mt-6 text-sm font-semibold uppercase tracking-widest text-lime underline underline-offset-4">
          Nouvelle demande
        </button>
      </div>
    );
  }

  const nb = Object.values(erreurs).filter(Boolean).length;
  return (
    <form onSubmit={envoie} noValidate className="rounded-2xl bg-ink-2 p-7 ring-1 ring-line sm:p-10">
      {nb > 0 && (
        <p role="alert" className="mb-7 rounded-xl border border-danger/40 bg-danger/10 px-5 py-3 text-sm font-medium text-danger">
          {nb} champ{nb > 1 ? "s" : ""} à vérifier ci-dessous.
        </p>
      )}
      <div className="grid gap-6 sm:grid-cols-2">
        <Champ id="prenom" label="Prénom" valeur={champs.prenom} onChange={change("prenom")} erreur={erreurs.prenom} autoComplete="given-name" />
        <Champ id="contact" label="E-mail ou téléphone" valeur={champs.contact} onChange={change("contact")} erreur={erreurs.contact} placeholder="toi@exemple.fr" />
        <div className="sm:col-span-2">
          <label htmlFor="objectif" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-mute">Ton objectif</label>
          <select id="objectif" value={champs.objectif} onChange={(e) => change("objectif")(e.target.value)}
            className="w-full rounded-xl border border-line bg-ink px-4 py-3.5 text-chalk outline-none focus:border-lime focus:ring-2 focus:ring-lime/30">
            {OBJECTIFS.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-mute">
            Un mot sur toi <span className="font-normal normal-case tracking-normal">(facultatif)</span>
          </label>
          <textarea id="message" rows={4} value={champs.message} onChange={(e) => change("message")(e.target.value)}
            placeholder="Je reprends après 5 ans sans sport, je travaille en horaires décalés…"
            className="w-full resize-y rounded-xl border border-line bg-ink px-4 py-3.5 text-chalk outline-none placeholder:text-mute/60 focus:border-lime focus:ring-2 focus:ring-lime/30" />
        </div>
      </div>
      <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-mute">Gratuit et sans engagement.</p>
        <button type="submit" className="w-full rounded-lg bg-lime px-9 py-4 font-display text-lg font-black uppercase tracking-wide text-ink hover:bg-lime-deep focus:outline-none focus:ring-2 focus:ring-lime focus:ring-offset-2 focus:ring-offset-ink sm:w-auto">
          Réserver ma séance
        </button>
      </div>
    </form>
  );
}

function Champ({ id, label, valeur, onChange, erreur, ...reste }: {
  id: string; label: string; valeur: string; onChange: (v: string) => void; erreur?: string; placeholder?: string; autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-semibold uppercase tracking-widest text-mute">{label}</label>
      <input id={id} value={valeur} onChange={(e) => onChange(e.target.value)} aria-invalid={erreur ? "true" : "false"} aria-describedby={erreur ? `${id}-erreur` : undefined} {...reste}
        className={`w-full rounded-xl border bg-ink px-4 py-3.5 text-chalk outline-none placeholder:text-mute/60 focus:ring-2 ${erreur ? "border-danger focus:ring-danger/30" : "border-line focus:border-lime focus:ring-lime/30"}`} />
      {erreur && <p id={`${id}-erreur`} className="mt-2 text-sm text-danger">{erreur}</p>}
    </div>
  );
}
