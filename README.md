# AI Call Center — Kazakhtelecom MVP

Система анализа качества звонков для Казахтелеком (Kcell, Activ) с AI-транскрибацией и аудитом.

## 🚀 Milestone 1 (Frontend-First) — COMPLETED

### ✅ Реализовано

#### Страницы
- **Dashboard** (`/dashboard`) — KPI, графики, последние звонки
- **Upload** (`/upload`) — загрузка аудио с drag-n-drop, очередь обработки
- **Calls** (`/calls`) — список всех звонков с фильтрацией
- **Call Details** (`/calls/:id`) — плеер, транскрипт, аудит, метаданные
- **Clients** (`/clients`) — профиль клиента с историей звонков
- **Groups** (`/groups`) — динамические группы звонков
- **Tickets** (`/tickets`) — управление проблемами и нарушениями
- **Users** (`/users`) — управление пользователями и ролями
- **Audits** (`/audits`) — аналитика аудита и compliance
- **Settings** (`/settings`) — настройки правил, интеграций

#### Компоненты
- `AudioPlayer` — симуляция плеера с seek slider
- `TranscriptViewer` — кликабельные utterances с таймкодами
- `AuditCard` — отображение score breakdown
- `CallsTable` — таблица звонков с сортировкой
- `KPICard`, `CallsChart`, `ScoreChart` — дашборд виджеты
- Полный UI kit на базе **shadcn/ui**

#### Инфраструктура
- **WebSocket hook** (`useWebSocket.ts`) — для real-time обновлений
- **Mock data** (`mockData.ts`) — реалистичные фикстуры
- **Design system** — Kazakhtelecom branding, semantic tokens
- **TypeScript** — строгая типизация (types/index.ts)
- **Routing** — React Router с layout wrapper

### 📋 TODO: M2-M5 (Backend Integration)

#### M2: Backend Minimal (Est. 2-3 weeks, ~80 hours)

**Lovable Cloud Setup:**
- [ ] Enable Lovable Cloud (Supabase backend) — **1h**
- [ ] Create database schema (calls, transcripts, audits, clients, tickets, users, kpi_rules) — **4h**
- [ ] Setup Row Level Security policies — **2h**
- [ ] Configure Storage buckets for audio files — **1h**

**Edge Functions (Backend API):**
- [ ] `/api/calls/upload` — multipart upload to Storage — **3h**
- [ ] `/api/calls/webhook` — receive provider callbacks — **2h**
- [ ] `/api/calls` (list with filters) — **2h**
- [ ] `/api/calls/:id` (details with transcript + audit) — **2h**
- [ ] `/api/transcripts/:id` (PATCH for inline editing) — **2h**
- [ ] `/api/audits/:id/rerun` — trigger re-audit — **2h**
- [ ] `/api/clients/:phone` — client profile aggregation — **3h**
- [ ] `/api/tickets` (CRUD) — **4h**
- [ ] `/api/users` (CRUD + role management) — **4h**
- [ ] `/api/settings/kpi-rules` (CRUD) — **3h**

**Worker Simulation (Background Jobs):**
- [ ] Create `process_call` edge function triggered by upload — **4h**
- [ ] Mock STT adapter (returns dummy transcript) — **2h**
- [ ] Mock audit engine (calculates score from rules) — **4h**
- [ ] Emit Realtime events on status change — **2h**

**Frontend Integration:**
- [ ] Connect Upload page to real API — **3h**
- [ ] Connect Dashboard to real data (React Query) — **3h**
- [ ] Connect Calls list + filters — **3h**
- [ ] Connect Call Details with audio streaming — **4h**
- [ ] Integrate WebSocket for real-time updates — **3h**
- [ ] Connect Client profile to backend — **2h**
- [ ] Connect all other pages to backend — **6h**

**Testing & Documentation:**
- [ ] Write API integration tests — **6h**
- [ ] Write component tests for critical paths — **6h**
- [ ] Update README with backend setup — **2h**

---

#### M3: Audit & Rules Engine (Est. 2 weeks, ~60 hours)

**Audit Engine:**
- [ ] Implement rule-based scoring system — **8h**
- [ ] Script compliance checker (required phrases detection) — **6h**
- [ ] Topic classifier (keyword matching + simple NLP) — **6h**
- [ ] Forbidden words detector with severity levels — **4h**
- [ ] Resolution bonus calculator — **3h**

**KPI Rules Admin UI:**
- [ ] Visual rule builder in Settings page — **8h**
- [ ] Add/Edit/Delete rules with JSON preview — **4h**
- [ ] Multi-tenant rule sets (Kazakhtelecom/Kcell/Activ) — **4h**
- [ ] Apply rules on audit re-run — **3h**

**Advanced Features:**
- [ ] Manual review workflow (supervisor override) — **6h**
- [ ] Audit history and version tracking — **4h**
- [ ] Export audit reports (PDF/CSV) — **4h**

---

#### M4: Stability & Infrastructure (Est. 1-2 weeks, ~40 hours)

**Performance:**
- [ ] Optimize database queries (indexes, views) — **4h**
- [ ] Implement pagination for large lists — **3h**
- [ ] Audio file compression pipeline — **4h**
- [ ] CDN setup for audio streaming — **2h**

**Security:**
- [ ] Implement user roles table (avoid RLS recursion) — **4h**
- [ ] Add authentication middleware — **3h**
- [ ] Secure file upload validation — **2h**
- [ ] Rate limiting on API endpoints — **2h**

**Monitoring & Logging:**
- [ ] Setup error tracking (Sentry) — **2h**
- [ ] Add structured logging — **3h**
- [ ] Create admin analytics dashboard — **4h**

**CI/CD:**
- [ ] GitHub Actions for tests — **3h**
- [ ] Automated deployment pipeline — **2h**
- [ ] Environment management (staging/prod) — **2h**

**Documentation:**
- [ ] OpenAPI spec generation — **4h**
- [ ] Developer onboarding guide — **2h**
- [ ] Architecture diagrams — **2h**

---

#### M5: AI Integration (Optional, Est. 2 weeks, ~50 hours)

**STT Integration:**
- [ ] Replace mock with real STT provider (Whisper/AssemblyAI) — **8h**
- [ ] Add diarization support (speaker separation) — **6h**
- [ ] Confidence thresholding and highlights — **3h**

**NLP Enhancements:**
- [ ] Integrate OpenAI/Gemini for semantic analysis via Lovable AI — **6h**
- [ ] Sentiment detection per utterance — **4h**
- [ ] Topic classification with ML model — **6h**
- [ ] Intent recognition — **4h**

**Advanced Audit:**
- [ ] Tone analysis (friendly/neutral/hostile) — **4h**
- [ ] Escalation prediction — **4h**
- [ ] Personalized coaching recommendations — **5h**

---

## 🛠 Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite
- TailwindCSS (Kazakhtelecom design system)
- shadcn/ui components
- React Router
- React Query (TanStack Query)
- Recharts (visualizations)
- Lucide icons

**Backend (via Lovable Cloud):**
- Supabase (PostgreSQL)
- Supabase Storage (audio files)
- Supabase Realtime (WebSocket)
- Edge Functions (Deno)

**Future AI Integration:**
- Lovable AI Gateway (Gemini/GPT)
- Whisper API or AssemblyAI (STT)

---

## 🚦 Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint
npm run lint
```

---

## 📝 Environment Variables

For M2+, create `.env.local`:

```bash
# Lovable Cloud / Supabase
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key

# AI Integration (M5)
OPENAI_API_KEY=your_openai_key  # Server-side only
ASSEMBLYAI_API_KEY=your_key     # Server-side only
```

---

## 🎯 Acceptance Criteria (M1 ✅)

- [x] Multi-page SPA with routing (Dashboard, Upload, Calls, etc.)
- [x] Upload UI with drag-n-drop and queue simulation
- [x] Calls list + Details page (audio player + transcript viewer)
- [x] Client profile page with call history
- [x] All pages responsive and accessible
- [x] Mock data for development
- [x] WebSocket hook for future real-time integration
- [x] Design system with Kazakhtelecom branding
- [x] TypeScript strict mode

---

## 📞 Support

For backend setup (M2), enable **Lovable Cloud** in project settings to get:
- PostgreSQL database
- File storage
- Real-time subscriptions
- Edge Functions API

**Lovable Cloud failed to enable?** Try again or contact support.

---

## 🏢 Multi-Tenant Support

System supports three organizations:
- **Kazakhtelecom** (parent company)
- **Kcell** (subsidiary)
- **Activ** (subsidiary)

Role-based access control:
- **Admin** — full access, manage KPI rules
- **Supervisor** — view all calls, manual review
- **Operator** — view own calls only

---

## 📚 Architecture Notes

### Current (M1 — Frontend Only)
```
src/
  pages/          — Route components
  components/     — Reusable UI (AudioPlayer, TranscriptViewer, etc.)
  hooks/          — useWebSocket, future custom hooks
  lib/            — mockData.ts, utils
  types/          — TypeScript interfaces
```

### Future (M2+ — Fullstack)
```
Lovable Cloud (Supabase):
  Database (PostgreSQL)
    ├─ calls
    ├─ transcripts
    ├─ audits
    ├─ clients
    ├─ tickets
    ├─ users
    └─ kpi_rules
  
  Storage
    └─ audio-files/
  
  Edge Functions
    ├─ upload
    ├─ webhook
    ├─ process_call (worker)
    └─ audit_engine
  
  Realtime
    └─ call.updated events
```

---

## 🎨 Design System

Colors (HSL):
- **Primary (brand-blue):** `hsl(215, 100%, 34%)` (#0047AB)
- **Success:** `hsl(134, 57%, 43%)` (#28A745)
- **Danger:** `hsl(354, 70%, 54%)` (#DC3545)

Typography:
- **Headings:** Inter Semi-Bold / Bold
- **Body:** Inter Regular

Animations:
- fade-in, slide-up, scale-in (see tailwind.config.ts)

---

## 🔒 Security TODO (M2-M4)

- [ ] User roles table (avoid RLS recursion)
- [ ] JWT authentication
- [ ] File upload validation (MIME type, size)
- [ ] Rate limiting on API
- [ ] Secrets management for API keys
- [ ] Input sanitization

---

## 📊 Performance Targets (M4)

- Dashboard load: < 2s
- Audio playback latency: < 500ms
- Transcript search: < 100ms
- Upload → processing notification: < 5s (real-time)

---

## 🧪 Testing Strategy

**M1 (Current):**
- Manual testing via Storybook (future)
- Visual testing in browser

**M2-M4:**
- Unit tests: Jest + React Testing Library
- Integration tests: Supabase Edge Functions
- E2E tests: Playwright (critical user flows)
- Load testing: k6 (audio upload stress test)

---

## 📈 Monitoring (M4)

- Error tracking: Sentry
- Performance: Supabase logs + custom analytics
- User behavior: Mixpanel or PostHog
- Uptime: Supabase built-in monitoring

---

## 🌐 Deployment

**Current (M1):**
- Frontend: Lovable hosting (automatic)

**Future (M2+):**
- Backend: Lovable Cloud (Supabase) — automatic
- CDN: Cloudflare (audio files)
- CI/CD: GitHub Actions

---

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test locally
4. Submit PR with description
5. Wait for review

---

## 📄 License

Proprietary — Kazakhtelecom internal use only.

---

**Status:** M1 Complete ✅ | M2-M5 Pending Backend Setup
