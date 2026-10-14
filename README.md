# Call Center CRM (local, single operator)

A personal call-center CRM that runs entirely on your Windows PC. Data is stored in one SQLite file. No cloud account, subscription or Docker is needed.

**Current version: Phase 1 (local MVP).** Calling works in **Demo Mode — No Real Calls**. Real browser telephony is Phase 2 and is not installed in this build.

## What is implemented, what needs configuration, what is not built

| Area | Status |
|---|---|
| Contacts: create/edit/delete, search, filter, sort, pagination, duplicates, bulk actions, export, per-person data export | **Implemented** |
| CSV import (UTF-8 and Windows-1251, `,` `;` tab delimiters) and Excel `.xlsx/.xls` import with column mapping, preview and row-level errors | **Implemented** (Excel parsing runs in the browser via SheetJS) |
| Pipeline: 12 default stages, Kanban + table, reasons for important moves, full history, custom stages | **Implemented** |
| Call queue: filter → review → explicit start → pause/resume/skip/stop → outcome → follow-up → next | **Implemented, in demo mode** |
| Eligibility checks (do-not-call, global do-not-contact list, invalid number, consent, stage, attempt limits) on preview, start, and every call | **Implemented** |
| Tasks, call scripts (with 2 labelled samples), call history, analytics with date filters, dashboard | **Implemented** |
| Backup / restore, retention settings, sample-data load/remove | **Implemented** |
| Local rule-based objection tips (English + Russian keywords) | **Implemented** (keyword rules, not an AI model) |
| AI assistant (any OpenAI-compatible endpoint) | **Needs configuration** in `.env`; shows "AI Not Configured" otherwise. Not tested against a live provider |
| Real calls from the browser (SIP over WebSocket / WebRTC), inbound calls, audio device selection | **Not built (Phase 2).** Adapter interface and demo adapter exist |
| Call recording | **Not built (Phase 3).** The UI states "unavailable"; no audio is captured |

Details on costs: [docs/PAID_SERVICES.md](docs/PAID_SERVICES.md). Legal notes: [docs/COMPLIANCE.md](docs/COMPLIANCE.md).

## Requirements (Windows)

* Windows 10/11
* **Node.js 22.18 or newer** (Node 24 LTS recommended) from https://nodejs.org. The backend uses Node's built-in SQLite, so there is nothing native to compile.
* Internet access only for the one-time `npm install`.

Check: open PowerShell and run `node -v` (must print v22.18.0 or higher).

## Install and run

```powershell
cd path\to\call-center-crm
copy .env.example .env
npm run install:all
npm run build
npm start
```

Open **http://localhost:4000**. Your data is saved in `data\crm.sqlite`.

You will see `ExperimentalWarning: SQLite is an experimental feature`. This is expected and harmless.

If PowerShell says "running scripts is disabled", run once: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`, or use Command Prompt (`cmd`) instead.

### Try it with sample data
Open the Dashboard and click **load clearly-marked sample data** (or `npm run seed`). Everything fictional is badged **Sample** and can be deleted under Settings → Sample data.

### Development mode (hot reload)
Two terminals:
```powershell
npm run dev        # backend on http://localhost:4000
npm run dev:ui     # UI on http://localhost:5173
```

### Tests
```powershell
npm test
```
51 automated tests cover phone normalisation, CSV parsing, eligibility rules, import validation, queue flow, outcome idempotency, do-not-contact enforcement, analytics maths, backup/restore, and HTTP security checks. Frontend tests (Vitest/Playwright) are **not** included yet.

## Daily workflow
1. **Contacts** → add or import people. Imported contacts start as *New Lead* with consent *Unknown* and are never queued automatically.
2. Record the lawful basis (select contacts → *Set consent*). With the default setting, only contacts with documented consent/lawful basis can be queued.
3. **Call Queue** → filter, review, tick the authorisation box, **Start calling session**.
4. **Active Call** → *Call (demo)*, use the demo controls, read your script, record the outcome. A follow-up task is created per your Settings, and the next contact appears.
5. **Analytics** → numbers are computed from stored calls. Untick "Include demo calls" to see real calls only.

## Configuration
All optional, in `.env` (see `.env.example`): `PORT`, `HOST` (must stay `127.0.0.1`), `DATA_DIR`, AI settings, and Phase 2 SIP placeholders. Secrets stay in `.env` and are never sent to the browser. `.env` and `data/` are git-ignored.

## Real telephony and AI
* Real calls: [docs/TELEPHONY.md](docs/TELEPHONY.md)
* AI: set `AI_BASE_URL` (e.g. `https://…/v1`), `AI_MODEL`, `AI_API_KEY` in `.env`, restart. A local server such as Ollama or LM Studio exposing an OpenAI-compatible API on `http://localhost:…` works without a key. Only text you type is sent, with phone numbers and e-mail addresses stripped.

## Project layout
See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md). Troubleshooting: [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md).

## Backup
Settings → *Download backup* gives a single `.sqlite` file. *Restore* replaces all data (a safety copy goes to `data\backups`). Recordings do not exist yet. Deleting a contact removes their calls and tasks; their phone number stays on the do-not-contact list only if they had opted out.
