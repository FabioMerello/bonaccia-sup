# Bonaccia SUP

Sito vetrina per **Bonaccia SUP**, scuola di Stand Up Paddle tra Albisola, Bergeggi e Spotorno (Liguria).

Stile "Coastal Modern Luxury": HTML5 + CSS3 + JavaScript vanilla, nessuna dipendenza da framework, nessuna immagine esterna (solo SVG originali in `/assets/svg`).

## Struttura del progetto

```
bonaccia-sup/
├── index.html          # Homepage
├── privacy.html         # Privacy & Cookie Policy
├── css/
│   └── style.css        # Design system, layout, animazioni
├── js/
│   └── main.js           # Reveal on scroll, parallax, menu mobile
├── assets/
│   └── svg/               # Logo, favicon, icone (vettoriali originali)
└── README.md
```

## Pubblicare su GitHub Pages

1. Crea un nuovo repository su GitHub (es. `bonaccia-sup`).
2. Carica tutto il contenuto di questa cartella nella **root** del repository (mantenendo `index.html` in root e le cartelle `css/`, `js/`, `assets/` così come sono).
3. Vai su **Settings → Pages**.
4. In **Source**, seleziona il branch `main` e la cartella `/ (root)`.
5. Salva: dopo qualche minuto il sito sarà online all'indirizzo `https://<tuo-utente>.github.io/bonaccia-sup/`.

Non è richiesta alcuna build: il sito è statico e pronto all'uso così com'è.

## Personalizzazione rapida

- **Colori**: variabili CSS in cima a `css/style.css` (sezione `:root`).
- **Testi**: modificabili direttamente in `index.html`.
- **Contatti**: numero di telefono ed email sono presenti come link diretti (`tel:` e `mailto:`) in header, sezione contatti, pulsante WhatsApp flottante e footer — aggiornali cercando `347 824 8018` e `bonacciasup@gmail.com`.
- **Nuove zone/servizi**: duplica i blocchi `.zone-card` o `.service-card` esistenti.

## Note tecniche

- Font caricati da Google Fonts (Fraunces, Work Sans, IBM Plex Mono) via CDN.
- Animazioni "reveal" tramite `IntersectionObserver`, con rispetto automatico di `prefers-reduced-motion`.
- Parallax leggero sugli strati dell'hero tramite `requestAnimationFrame`.
- Design mobile-first, testato su breakpoint 360px–1440px+.
