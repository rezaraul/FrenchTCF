# TCF B2 — Entraînement

A mobile-first, installable web app for practicing the **TCF** (Test de Connaissance du Français) toward the **B2** level. Runs entirely in the browser — no backend, no build step, works offline once loaded (PWA).

## Modules

- **Flashcards** — ~90 vocabulary words graded A1→B2, spaced repetition (Leitner system), with example sentences and pronunciation (browser text-to-speech).
- **Grammar** — key B2 grammar points (subjunctive, conditional/hypotheticals, relative pronouns, passive voice, gérondif, past-participle agreement, connectors, reported speech, negation, comparison, futur antérieur) with explanations and self-scoring quizzes.
- **Reading** (*compréhension écrite*) — graded passages with multiple-choice comprehension questions, TCF-style.
- **Listening** (*compréhension orale*) — dialogues and announcements read aloud with the browser's French voice, followed by comprehension questions and an optional transcript.
- **Writing** (*expression écrite*) — the 3 real TCF writing task types (short message, narrative + opinion, comparing viewpoints), with word-count targets, timers, a self-evaluation checklist, and model answers.
- **Speaking** (*expression orale*) — the 3 real TCF speaking task types, with prep/speaking timers, microphone recording + playback, an experimental live transcript (where the browser supports it), and a self-evaluation checklist.
- **Progress** — streaks and per-module completion, stored locally on your device (`localStorage`) — nothing is sent to a server.

## Running it

It's a fully static site — just open `index.html`, or serve the folder with any static file server:

```bash
python3 -m http.server 8080
```

## Hosting on GitHub Pages

1. Push this repository to GitHub.
2. In the repo settings, enable **Pages** → deploy from the `main` branch, root folder.
3. Open the generated `https://<username>.github.io/<repo>/` URL on your phone and use "Add to Home Screen" for an app-like experience.

## Notes & limitations

- Speaking and writing are **self-assessment only** — there's no server-side AI grading. Use the model answers and checklists to evaluate your own work.
- The experimental speech-to-text transcript during speaking practice depends on your browser's built-in speech recognition (works on Chrome/Android; often unavailable on iOS Safari) — recording and playback always work regardless.
- All progress is stored only in your browser's local storage; it is per-device and per-browser, and clearing site data will reset it.
