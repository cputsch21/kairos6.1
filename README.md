# kairos6
# **Kairos v6 – Product Requirements Document**

---

## **Product Vision**

Kairos is a daily thought and work assistant for high-performing, Type A users who want to be more present, reflective, and intentional — *not just productive*. The tagline is “Kairos helps Type A people stress less, get more done, and feel more alive.”

It blends journaling, note taking, task capture, principles, and AI-powered reflection into a fast, distraction-free, keyboard-driven app that feels like a calm, trusted partner.

---

## **Target User**

- Individuals who value clarity, order, and deep work
- Often overwhelmed by “productivity porn” but want true presence and insight
- Type A professionals, founders, operators, knowledge workers
- People who feel that life is passing them by, and that they need helping slowing down and enjoying the moment

---

## **Core Use Cases / Jobs to be Done**

- Capture today’s notes, ideas, tasks, and reflections as a *daily chapter*.
- Surface and manage tasks without leaving flow (“task panel” and inline).
- Record and revisit core principles and long-term goals (“Ethos panel”).
- Let AI (Kai) provide inline insights, encouragement, and summary, and occasionally proactively nudge the user when they are really off track.
- See all of today’s context at a glance — always start each day from a clean page.
- Move through the app and manage data via keyboard shortcuts.
- Switch between days, create new notes instantly, never lose data.

---

## **Product Principles**

- **Apple-level polish:** Fast, tactile, smooth, and beautiful.
- **Zero loss:** No data is ever lost, overwritten, or left unsaved.
- **Super smooth AI:** AI/Kai blends seamlessly into the app.
- **Keyboard-first:** All actions, from new page to task complete, work via keyboard.
- **Nuke-proof:** Every feature, data flow, and integration is stress-tested and monitored.

---

## **Feature Set**

### **Daily Chapters**

- Each day = one or more notes, each with its own unique ID.
- Rich text with Markdown/WYSIWYG blend.
- Support for bulleted lists, checkboxes, and inline tags.
- Pages auto-save locally and sync to backend (Supabase).
- Users can create multiple notes per day by using the CMD+right arrow shortcut.
- If there are multiple notes, users can navigate through them using CMD+right or left arrow
- When navigating through multiple notes on the same day, a carousel dot signifier briefly appears to show the user which note they are currently on
- So switch Days, the user clicks on the Date which is always visible in the top right of the page as if its out in the margin on a note pad. CLicking on the date opens a Date Picker where the user can jump to a new date.
- When a user jumps to a new date and therefore is not on Today’s Date, a back arrow appears for quick jumping back to Today.

### **Task Panel**

- Inline task capture via:
    1. AI note parsing
    2. Checkbox bullet points (markdown option)
    3. Direct entry in the panel
- Each task has content, completion status, optional due date, and links to its parent page.
- Tasks can be completed, edited, or cleared.
- Tasks are sorted by due date and can be filtered by day/status.
- Cleared tasks mostly are tasks that were AI detected but the user did not want to be tasks. The AI should be set up to learn from these tasks so that it becomes better at parsing tasks from the user’s notes.

### **Ethos Panel**

- Separate panel for core principles, goals, or “ethos” statements.
- Kai is trained on the Ethos Panel so that they can get a good sense of the user’s values, etc.
- This is a single textbox that remains persistent all the time. It autosaves and never refreshes to a blank page.
- Ethos can be edited, versioned, and referenced by Kai.

### **Kai (AI Assistant)**

- Invoked inline via @kai your question...
- Responds by inserting a styled “kai-response” block directly below the invocation.
- Can summarize, provide insights, and extract tasks (when asked).
- Never triggers on its own; must be user-prompted.

### Notes History

- The primary part of the main menu, this is a list of all the user’s notes.
- The Notes History is a Panel just like the Ethos and Task Panel.
- Can be searched
- Can be filtered by tag
- AI/Kai auto-generates tags for each note live and then stores them on that note. Those tags can be selected in the tag filter that lives on the Notes History list
- Each note item in the Notes History list has the ‘title’ of the note, the Created Date, the Saved Time/Date (for last updated time), and a Delete icon.
- The list defaults to last updated

### Tag Bar

- AI/Kai auto-generates tags for each note as the user adds content.
- At the top of each note lives the Tag bar, which is a horizontal scrollable list of the tags generated FOR THAT NOTE.
- The Tag Bar is hidden by default, and the user can open the Tag Bar by clicking on the Tag Icon which lives at the beginning of the Tag Bar on the left.
- The Tag Icon is also hidden by default but appears on hover.
- The Tag Bar scrolls with text
- The Tag Icon is fixed within the Tag bar but also scrolls with text because it is within the Tag Bar.
- Tags can be deleted by the user with a simple X. That simply removes them from that Note.
- If a tag is not linked to any note, it is removed from the system.
- Tags must be saved to the system and re-usable: the system should not generated multiple different tags for the same word (ie #work)
- The user can also create tags manually by simply typing #tag

### Calendar Integration

- The user can sync their google calendar with the app which gives Kai access to their events.
- Users can ask Kai what is on their agenda that day
- Users can ask Kai to help them plan their day
- This lives in Settings

### Sunrise and Sunset Times

- Right underneath the Date in the top right, the user can see the time when the sun will rise and set in their local time.
- These two lines will be hidden by default and then will show on hover.
- They will also show when within 30 minutes before or after the time.

### Color Modes

- There will be three color mode options the user can select: Light, Dark, Arc
- There will be on universal design for all color modes: a subtle 90 degree background gradient
- The Light mode gradient will go from #FFFFFF to a super light grey. The Dark mode will be the same exact opposite.
- Arc mode is a bit different:

### Settings

- Settings will live in a Gear icon that is on the Top Bar of the Notes History Panel
- 

### **Navigation & Shortcuts**

- CMD/CTRL + K: Notes History / Main Menu
- CMD/CTRL + E: Open Ethos Panel
- CMD/CTRL + /: Focus Task Panel
- All keyboard mappings must be reconfigurable (TBD).

### **Persistence & Sync**

- True offline-first (IndexedDB + Supabase sync, pending change queues)
- No data loss if offline or on refresh
- Real-time sync for all entities (pages, tasks, ethos)
- Visual sync/status indicator in UI

### **5.7**

### **Telemetry & Watchdog**

- Logs for persistence, sync, and AI failures
- In-app dashboard for system health (dev-only)

---

## **6.**

## **Architecture / Stack**

**Frontend:**

- Next.js (React 18), Vite, TypeScript, Tailwind, Framer Motion
- TipTap (WYSIWYG editor)

**State:**

- Zustand, modular stores per domain (notes, tasks, ethos, UI, kai)

**Backend:**

- Supabase (Postgres, Auth, Storage, Realtime)
- Edge Functions for AI proxy (no keys in browser)
- IndexedDB for offline/local-first support

**AI:**

- OpenAI via Edge Function proxy
- Rate-limited and throttled; context window management

**Testing:**

- Automated smoke/regression tests for all core flows
- Telemetry hooks from day one

---

## **Out of Scope for v2**

## **(Needs Decision)**

- Mobile app (PWA only)
- Calendar integration (Google Calendar sync)
- Collaborative features (multi-user sharing)
- Notification system

---

## **“Done” Criteria**

- Every feature and flow has automated and manual tests.
- All core user actions work offline and sync when online.
- Data loss is impossible in normal use or stress conditions.
- AI never responds unless invoked with @kai.
- UI never janks, loses state, or blocks user input.

---

# **Data Model, Schema, and Structure Plan**

---

## **A. Core Data Model**

### **1. Notes**

- id (UUID, PK)
- user_id (FK)
- content (rich text / markdown string)
- date (ISO, date-only)
- tags (array of tag IDs, denormalized for performance)
- tasks (array of task IDs for fast look-up, but also relational)
- title (first line or first 20 chars of content, computed & indexed)
- created_at, updated_at (timestamps)
- **Relations:**
    - Many tags (many-to-many)
    - Many tasks (one-to-many, but tasks can also be stand-alone)
    - Belongs to user

**Notes:**

- No attachments for now (add nullable attachments field for future)
- Archived via archived_at timestamp (soft delete; hard delete after 30 days)
- Only one active “Ethos” per user (separate table)

---

### **2. Tasks**

- id (UUID, PK)
- user_id (FK)
- note_id (FK, nullable) — null if created directly in panel or orphaned
- content (string)
- completed (bool)
- due_date (nullable, ISO)
- recurrence_rule (nullable, for future support)
- created_at, updated_at (timestamps)
- archived_at (nullable, for soft delete)
- **Relations:**
    - Optionally belongs to a note
    - Belongs to user

---

### **3. Tags**

- id (UUID, PK)
- name (string, unique, lowercased)
- usage_count (int, for analytics)
- created_at, updated_at (timestamps)
- **Relations:**
    - Many-to-many with notes (join table: note_tags)

---

### **4. Ethos**

- user_id (PK, FK)
- content (markdown string, freeform)
- updated_at (timestamp)

---

### **5. Kai Personalization Context**

- Store on the user profile (users table or a related user_profile table)
- Fields: goals, beliefs, family situation, custom context fields (JSONB for future extensibility)
- **Stored securely and only exposed to Kai runtime as needed**

---

### **6. Archived Data**

- All deletions are archived (soft delete) by default (archived_at timestamp)
- A nightly cron job purges data >30 days archived
- All archived data can be restored by user within 30 days (trash bin pattern)

---

## **B. Relationships**

- **Notes <-> Tasks:**
    - Tasks reference note_id if created from a note; else null
    - Notes maintain list of associated task IDs for quick access
- **Notes <-> Tags:**
    - Many-to-many via note_tags table
- **Tasks:**
    - Can be orphaned (live without a note), always belong to user
- **Tags:**
    - Global, always unique by name (case-insensitive)

---

## **C. File & Folder Structure (Apple-Level Best Practice)**

### **Frontend (React + Next.js)**

- /features/ — Feature-first. Each feature (notes, tasks, ethos, kai, settings) is a self-contained folder with its own components, hooks, types, and tests.
    - /features/notes/NoteEditor.tsx
    - /features/tasks/TaskPanel.tsx
    - /features/ethos/EthosPanel.tsx
    - /features/kai/KaiInline.tsx
    - /features/settings/SettingsPanel.tsx
- /shared/ — Shared types, utils, and common hooks.
    - /shared/types.ts
    - /shared/utils/
- /extensions/ — All TipTap custom extensions as separate modules, one file per extension.
- /stores/ — Zustand domain stores by feature, not monolithic.
- /api/ — Custom API routes (Next.js API routes or Edge Functions).
- /hooks/ — General, non-feature-specific React hooks.
- /styles/ — Global styles and Tailwind config.

**Naming:**

- Folders: kebab-case
- Components, Types: PascalCase
- Variables/Methods: camelCase

---

### **Backend / Infra**

- /supabase/ — All migrations, SQL, and RLS policies.
- /api/ or /edge/ — Custom logic, serverless functions, AI proxy, etc.
- **Environment configs and secrets:**
    - .env (for local), .env.production (for prod), never checked into version control
    - Use Vercel/Netlify secrets for deployment

---

### **Testing**

- /tests/ — Integration and e2e test suites, colocated with features when possible.

---

### **Naming Conventions**

- **DB:** snake_case
- **TS types/interfaces:** PascalCase
- **Variables/methods:** camelCase
- **Folders:** kebab-case
- **React Components:** PascalCase

---

### **Pending vs Synced State**

- **Local-first model:**
    - Every object (note, task, tag) has a syncStatus (pending, synced, error) in the store.
    - Use UUID v4 temp IDs for offline creation; reconcile to real ID on first successful sync.
    - IndexedDB is single source of truth while offline.
- **Conflict handling:**
    - Timestamp-based merge (like Notion):
        - If a local object is newer than server, push up
        - If server is newer, pull down (unless local edits exist—warn user)
    - All merges are idempotent and safe for eventual consistency

---

### **Versioning & Migration**

- Supabase migrations for all schema changes
- IndexedDB versioning bump on schema update; use migration scripts for local data

---

### **Other Apple-Level Standards**

- All user-facing data is recoverable and never lost in normal flow
- All automated sync/merge logic has comprehensive tests
- Any data corruption triggers a visual error + log to telemetry/watchdog

---

## **Summary Table**

| **Domain** | **Table/Type** | **Key Fields** | **Notes** |
| --- | --- | --- | --- |
| Notes | notes | id, user_id, content, date, tags, tasks, title, created/updated_at | title = first line; archived |
| Tasks | tasks | id, user_id, note_id, content, completed, due_date, recurrence_rule | note_id nullable |
| Tags | tags + note_tags | id, name, usage_count | global; many-to-many |
| Ethos | ethos | user_id, content, updated_at | one per user |
| Kai Ctx | users/user_profile | goals, beliefs, family, context (JSONB) | stored securely |

---

# **Kairos v6 – Product Requirements Document (PRD)**

---

## **1. Product Vision**

Kairos is a daily thought and work assistant for high-performing, Type A users who want to be more present, reflective, and intentional—not just productive.

*Tagline: “Kairos helps Type A people stress less, get more done, and feel more alive.”*

Kairos blends journaling, note taking, task capture, personal principles, and AI-powered reflection into a fast, distraction-free, keyboard-driven app that feels like a calm, trusted partner.

---

## **2. Target User**

- Individuals who value clarity, order, and deep work
- Professionals overwhelmed by “productivity porn” who crave true presence and insight
- Founders, operators, knowledge workers
- Anyone feeling life is passing them by and needs help slowing down and enjoying the moment

---

## **3. Core Use Cases / Jobs to be Done**

- Capture today’s notes, ideas, tasks, and reflections as a daily chapter
- Surface and manage tasks without leaving writing flow (task panel, inline, checkboxes, AI)
- Record and revisit core principles and long-term goals (Ethos panel)
- Let AI (Kai) provide inline insights, encouragement, summary, and nudges when really off track
- Instantly see all of today’s context at a glance; start each day from a clean page
- Navigate via keyboard shortcuts; never lose data, even offline

---

## **4. Product Principles**

- **Apple-level polish:** Fast, tactile, smooth, beautiful
- **Zero loss:** No data is ever lost, overwritten, or left unsaved
- **Super smooth AI:** Kai blends seamlessly into the app, only when invited
- **Keyboard-first:** All actions accessible via keyboard (mouse optional, never required)
- **Nuke-proof:** Every feature, data flow, and integration is stress-tested and monitored

---

## **5. Feature Set**

### **5.1 Daily Chapters (Notes)**

- Each day = one or more notes, each with its own unique UUID
- Unlimited notes per day (no hard limit)
- Rich text with Markdown/WYSIWYG blend (TipTap)
- Supports bulleted lists, checkboxes, inline tags
- Notes auto-save locally (IndexedDB) and sync to backend (Supabase)
- CMD+Right Arrow: New note for current day; CMD+Left/Right Arrow: Navigate notes
- Carousel dot briefly indicates position when navigating multiple notes on the same day
- Date always visible (top right, margin-style); clicking opens date picker
- When not on Today, a back arrow appears for quick jump back
- Notes are fully searchable and filterable via Notes History panel

---

### **5.2 Task Panel**

- Tasks can be created three ways:
    1. AI note parsing
    2. Checkbox bullet points (Markdown)
    3. Direct entry at top of Task Panel (“New Task”)
- Each task:
    - content, completed, optional due_date, links to parent note (if created from note)
- Tasks can be completed, edited, or cleared (especially false positives from AI)
- Cleared tasks are used to teach the AI to improve future detection
- Tasks sorted by due date, filterable by day/status
- No sub-tasks for v2; recurring tasks are supported in schema, not yet surfaced in UI

---

### **5.3 Ethos Panel**

- Single, persistent Markdown text area for user’s core principles/goals/ethos (autosaves, never blank)
- Only one ethos record per user (editable anytime)
- Version history available (simple, for safety)
- Referenced by Kai for tailored reflection and coaching

---

### **5.4 Kai (AI Assistant)**

- Invoked inline via @kai your question... anywhere in a note
- Responds with a styled kai-response block directly beneath the invocation (never in a floating bubble)
- Can summarize, provide insights, actionable suggestions, extract or clarify tasks if asked
- Personalizes based on:
    - Ethos Panel content
    - User’s personal context (goals, beliefs, family situation, provided in Settings)
    - Recent notes, tasks, and context docs
- Only responds when user-prompted, except rare nudge when user is seriously off track (future/opt-in)
- User personal context securely stored on user profile

---

### **5.5 Notes History Panel**

- Main menu = searchable, filterable list of all notes
- Panel structure (same as Task/Ethos panels)
- Each item: auto-generated title (first line), created date, last updated, delete icon
- Filterable by tag (generated by AI or manual)
- Clicking note item jumps to that note/date

---

### **5.6 Tag Bar**

- AI auto-generates tags for each note (live, as user writes)
- Tag bar sits at top of note (hidden by default, opens on clicking tag icon)
- Tag bar is horizontally scrollable; tag icon appears on hover, scrolls with text
- Tags deletable per note; deleting removes only from that note
- Tags are global: if not linked to any note, removed from system (no orphan tags)
- Tags are re-usable; system prevents duplicate tags for same word (e.g., no multiple #work)
- Users can manually create tags by typing #tag in notes

---

### **5.7 Calendar Integration**

- User can sync Google Calendar (in Settings)
- Kai can access user’s events and answer questions about their agenda, or help plan the day
- Calendar data lives only in Settings panel, not main writing flow

---

### **5.8 Sunrise & Sunset Times**

- Displayed under date in top right (hidden by default; shows on hover or within 30min of event)
- Uses local timezone

---

### **5.9 Color Modes**

- Three modes: Light, Dark, Arc
- Universal design with subtle 90° gradient (white-to-light-grey, dark reverse, Arc: custom)
- Arc mode is at end of MVP cycle (may be deferred from initial beta)

---

### **5.10 Settings Panel**

- Gear icon in Notes History top bar opens Settings
- User can set personal context for Kai, connect calendar, and adjust other app preferences

---

### **5.11 Navigation & Shortcuts**

- CMD/CTRL + K: Notes History / Main Menu
- CMD/CTRL + E: Open Ethos Panel
- CMD/CTRL + /: Focus Task Panel
- CMD/CTRL + Right Arrow: New note for current day
- CMD/CTRL + Left/Right Arrow: Navigate between notes on same day
- All keyboard mappings fixed for v2; will be configurable in v3+

---

### **5.12 Persistence & Sync**

- True offline-first (IndexedDB + Supabase, with pending change queues)
- No data loss if offline or on refresh
- Real-time sync for all entities (notes, tasks, ethos)
- Visual sync/status indicator in UI

---

### **5.13 Telemetry & Watchdog**

- Logs for persistence, sync, and AI failures
- In-app dashboard for system health (dev-only, not visible to end users)

---

### **5.14 Onboarding Tutorial**

- Simple, at end of v2:
    - User prompted to ask Kai pre-written questions
    - Kai guides them through core features via responses

---

## **6. Data Model & Schema**

### **Notes**

| **Field** | **Type** | **Description** |
| --- | --- | --- |
| id | UUID (PK) | Unique note ID |
| user_id | UUID (FK) | Owner |
| content | Text | Markdown string (TipTap format) |
| date | Date | Calendar day |
| tags | [UUID] | Array of tag IDs (denormalized) |
| tasks | [UUID] | Array of task IDs (denormalized) |
| title | Text | First line or first 20 chars of content |
| created_at | Timestamp |  |
| updated_at | Timestamp |  |
| archived_at | Timestamp | For soft delete |

### **Tasks**

| **Field** | **Type** | **Description** |
| --- | --- | --- |
| id | UUID (PK) | Unique task ID |
| user_id | UUID (FK) | Owner |
| note_id | UUID (FK) | Parent note (nullable if panel/orphan) |
| content | Text | Task content |
| completed | Bool |  |
| due_date | Date | Optional |
| recurrence_rule | Text | For future recurring support |
| created_at | Timestamp |  |
| updated_at | Timestamp |  |
| archived_at | Timestamp | For soft delete |

### **Tags**

| **Field** | **Type** | **Description** |
| --- | --- | --- |
| id | UUID (PK) | Unique tag ID |
| name | Text | Lowercased, unique, global |
| usage_count | Int | Analytics |
| created_at | Timestamp |  |
| updated_at | Timestamp |  |

### **Note_Tags (Join Table)**

| note_id | UUID (FK) |

| tag_id  | UUID (FK) |

### **Ethos**

| **Field** | **Type** | **Description** |
| --- | --- | --- |
| user_id | UUID (PK) | Owner |
| content | Text | Markdown string |
| updated_at | Timestamp |  |

### **User (Profile/Kai Context)**

| **Field** | **Type** | **Description** |
| --- | --- | --- |
| id | UUID | User ID |
| goals | JSONB | User goals |
| beliefs | JSONB | Religious/spiritual preferences (optional) |
| family | JSONB | Family info (optional) |
| kai_context | JSONB | Custom context for Kai, extensible for future needs |

### **Deleted Data**

- All deletions are “archived” (soft delete) for 30 days, then hard deleted by cron
- User can restore any archived note/task/tag within 30 days

---

## **7. File & Folder Structure (Apple-Grade, Feature-First)**

**Frontend:**

- /features/notes/
- /features/tasks/
- /features/ethos/
- /features/kai/
- /features/settings/
- /shared/ (types, utils, global hooks)
- /extensions/ (TipTap extensions)
- /stores/ (Zustand domain stores)
- /api/ (Next.js API routes / Edge Functions)
- /hooks/, /styles/

**Naming:**

- Folders: kebab-case
- React components/types: PascalCase
- Variables/methods: camelCase
- DB: snake_case

**Backend:**

- /supabase/ (migrations, SQL, RLS)
- /api/ or /edge/ (serverless logic, AI proxy)
- Secrets in .env, managed outside VCS

---

## **8. Architecture / Stack**

- **Frontend:** Next.js (React 18), Vite, TypeScript, Tailwind, Framer Motion, TipTap
- **State:** Zustand, modular stores per domain
- **Backend:** Supabase (Postgres, Auth, Storage, Realtime), Edge Functions for AI proxy, IndexedDB for offline/local-first
- **AI:** OpenAI via Edge Function proxy, with context window management, rate limiting, secure keys
- **Testing:** Vitest + Playwright/Cypress, with smoke/regression tests on all core flows, telemetry hooks from day one

---

## **9. Out of Scope for v2**

- Mobile app (web/PWA only)
- Collaborative (multi-user) features
- Notification system
- Arc mode may be deferred from initial beta

---

## **10. “Done” Criteria**

- Every feature/flow has automated + manual tests
- All core user actions work offline, sync when online
- Data loss impossible in normal or stress conditions
- AI never responds unless invoked with @kai
- UI never lags, loses state, or blocks input
- Regressions caught by tests before release

---

## **11. Release Plan**

- Build order:
    1. Note Editor
    2. Tasks
    3. Notes History
    4. Ethos
    5. Tag Bar
    6. Kai
    7. Calendar
    8. Onboarding
    9. Color Modes / Settings
    10. Telemetry
- Beta release when Note Editor, Tasks, and Kai are functional and stable

---

**This PRD is locked for ticketing, architecture, and build.**

**Any change requires explicit update here before engineering begins.**

**Ready to break down into Features → Epics → Tickets on your call.**
