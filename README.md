# TCF B2 — Entraînement

A mobile-first, installable web app for practicing the **TCF** (Test de Connaissance du Français) toward the **B2** level. Runs entirely in the browser — no backend, no build step, works offline once loaded (PWA).

## Modules

- **Lessons** — a guided 166-lesson curriculum (A1→B2) with the full lesson text (French↔Persian), vocabulary, example sentences, and common learner errors with corrections, each with a short auto-generated quiz. 157 of the 166 lessons (marked ▶️ in the list) link directly to their real YouTube video, matched from the course's playlist; the remaining 9 (lessons the playlist has no video for, or duplicate/compilation videos we couldn't confidently attribute) fall back to a YouTube search link for the lesson's Persian title. A "🔊 Écouter en lisant" button drops in the actual YouTube player (sticky, so it keeps playing while you scroll and read the lesson text below) — this uses YouTube's own embedded player, not a downloaded/ripped copy of the audio. Adapted from a personal course document.
- **Flashcards** — two decks: a 1479-word TCF-focused deck (A1→B2, merged from a hand-picked core list plus every unique word across all 166 lessons, so it's properly leveled A1 through B2) and the curriculum's lesson-by-lesson deck (Persian + English), both with spaced repetition (Leitner system), example sentences, and pronunciation (browser text-to-speech).
- **Grammar** — key B2 grammar points (subjunctive, conditional/hypotheticals, relative pronouns, passive voice, gérondif, past-participle agreement, connectors, reported speech, negation, comparison, futur antérieur) with explanations and self-scoring quizzes.
- **Reading** (*compréhension écrite*) — graded passages with multiple-choice comprehension questions, TCF-style.
- **Listening** (*compréhension orale*) — dialogues and announcements read aloud with the browser's French voice, followed by comprehension questions and an optional transcript.
- **Writing** (*expression écrite*) — the 3 real TCF writing task types (short message, narrative + opinion, comparing viewpoints), with word-count targets, timers, a self-evaluation checklist, and model answers.
- **Speaking** (*expression orale*) — the 3 real TCF speaking task types, with prep/speaking timers, microphone recording + playback, an experimental live transcript (where the browser supports it), and a self-evaluation checklist.
- **Progress** — streaks and per-module completion, stored locally on your device (`localStorage`) — nothing is sent to a server. A "💾 Télécharger ma sauvegarde" / "📥 Restaurer une sauvegarde" pair lets you export your progress to a JSON file and reload it later (new device, cleared site data, etc.).

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
