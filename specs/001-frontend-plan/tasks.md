# Tasks: カンバン Todo UI フロントエンド

**Input**: Design documents from `/specs/001-frontend-plan/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: フロントエンドプロジェクトの初期化と開発環境整備

- [ ] T001 `frontend/` 配下にReactアプリ用ディレクトリ構造を作成し、`src/`, `public/`, `tests/` サブディレクトリを配置
- [ ] T002 Vite + React + TypeScriptテンプレートを`frontend/package.json`と`frontend/vite.config.ts`に生成
- [ ] T003 TypeScript設定を`frontend/tsconfig.json`で更新し、`paths`エイリアスを`@/`プレフィックスで定義
- [ ] T004 Lint/Format/Commitフックを`frontend/.eslintrc.cjs`, `frontend/.prettierrc`, `frontend/package.json`に設定
- [ ] T005 環境変数テンプレートを`frontend/.env.example`に追加し、APIベースURLとトークンを記載

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 全ユーザーストーリーが依存するUI基盤とAPI連携の整備

- [ ] T006 Tailwind + DaisyUI + shadcn/uiテーマ統合を`frontend/tailwind.config.ts`に構成
- [ ] T007 共通スタイルエントリを`frontend/src/styles/global.css`に作成し、テーマトークンとレスポンシブ設定を適用
- [ ] T008 shadcn/uiエントリポイントを`frontend/src/components/ui/index.ts`に生成し、再利用コンポーネント登録を行う
- [ ] T009 OpenAPI型生成スクリプトを`frontend/package.json`に追加し、出力先`frontend/src/generated/todo.ts`の雛形を配置
- [ ] T010 kyベースAPIクライアントとTanStack Query Providerを`frontend/src/lib/api/client.ts`と`frontend/src/lib/query/QueryProvider.tsx`に実装
- [ ] T011 ルーターとグローバルレイアウトを`frontend/src/main.tsx`および`frontend/src/routes/root.tsx`に構築し、QueryProviderを組み込む

---

## Phase 3: User Story 1 - ボード閲覧と初期読み込み (Priority: P1) 🎯 MVP

**Goal**: ユーザーがボードを開くとTodoがステータス列に整理され、読み込み/エラー状態が適切に表示される

**Independent Test**: APIモックで初期Todo配列を返し、`/kanban`表示で列ごとに正確なカード数・メタデータ・ローディング/エラーUIが確認できる

### Implementation

- [ ] T012 [US1] Kanbanルートとルーティング登録を`frontend/src/routes/kanban.tsx`に追加し、`/kanban`へ遷移可能にする
- [ ] T013 [P] [US1] Todo一覧取得用クエリフックを`frontend/src/features/kanban/hooks/useTodosQuery.ts`に実装
- [ ] T014 [P] [US1] ステータスメタデータ定義を`frontend/src/features/kanban/constants/status.ts`に追加
- [ ] T015 [P] [US1] ボードレイアウトコンポーネントを`frontend/src/features/kanban/components/KanbanBoard.tsx`に作成
- [ ] T016 [P] [US1] 列コンポーネントを`frontend/src/features/kanban/columns/KanbanColumn.tsx`に作成
- [ ] T017 [P] [US1] カード表示コンポーネントを`frontend/src/features/kanban/cards/TodoCard.tsx`に作成
- [ ] T018 [P] [US1] ローディング/エラー/空状態UIを`frontend/src/features/kanban/components/BoardStateIndicators.tsx`に追加
- [ ] T019 [P] [US1] 初期読み込み統合テストを`frontend/tests/integration/kanban-board.load.spec.tsx`に作成

**Checkpoint**: `/kanban`でTodoボードが閲覧可能になり、US1のテストがグリーン

---

## Phase 4: User Story 2 - Todoの作成/編集/削除 (Priority: P2)

**Goal**: ユーザーがボードからTodoを作成・編集・削除/復元でき、アクション結果が即座にUIへ反映される

**Independent Test**: 新規Todo作成→Backlog列表示、既存Todoの編集→値更新、削除→列から除去・復元→再表示が一連のテストで確認できる

### Implementation

- [ ] T020 [P] [US2] Todo作成/更新/削除ミューテーションを`frontend/src/features/kanban/services/todoMutations.ts`に実装
- [ ] T021 [P] [US2] 入力検証スキーマを`frontend/src/features/kanban/lib/todoSchema.ts`に定義
- [ ] T022 [P] [US2] Todoフォームダイアログを`frontend/src/features/kanban/components/TodoFormDialog.tsx`に構築
- [ ] T023 [US2] ボードに作成ボタンとモーダルトリガーを`frontend/src/features/kanban/components/KanbanBoard.tsx`へ追加
- [ ] T024 [US2] カード編集UIと状態同期を`frontend/src/features/kanban/cards/TodoCard.tsx`に追加
- [ ] T025 [US2] 削除/復元アクションメニューを`frontend/src/features/kanban/cards/TodoCardMenu.tsx`に実装
- [ ] T026 [P] [US2] TanStack Query無効化と楽観的更新ロジックを`frontend/src/features/kanban/hooks/useTodoMutations.ts`に追加
- [ ] T027 [P] [US2] 作成/編集/削除統合テストを`frontend/tests/integration/kanban-board.mutate.spec.tsx`に作成

**Checkpoint**: Todo CRUD が完結し、US2の統合テストがグリーン

---

## Phase 5: User Story 3 - ステータス変更とアクセシビリティ操作 (Priority: P3)

**Goal**: ユーザーがドラッグ&ドロップまたはキーボード操作でTodoのステータスを変更でき、結果がAPIとUIに反映される

**Independent Test**: DnDによりBacklog→In Progress→Doneの更新、キーボード操作（メニュー）による同様の更新がテストで確認できる

### Implementation

- [ ] T028 [P] [US3] DnDコンテキストラッパーを`frontend/src/features/kanban/components/KanbanDragContext.tsx`に実装
- [ ] T029 [P] [US3] ドラッガブルカードを`frontend/src/features/kanban/cards/DraggableTodoCard.tsx`に作成
- [ ] T030 [US3] ドロップハンドラとAPI更新を`frontend/src/features/kanban/components/KanbanBoard.tsx`に統合
- [ ] T031 [P] [US3] アクセシブルなステータスメニューを`frontend/src/features/kanban/components/TodoStatusMenu.tsx`に実装
- [ ] T032 [P] [US3] ステータス変更統合テストを`frontend/tests/integration/kanban-board.status.spec.tsx`に作成

**Checkpoint**: ドラッグ&キーボードの両操作が成功し、US3のテストがグリーン

---

## Phase 6: User Story 4 - フィルタリングとソート (Priority: P4)

**Goal**: ユーザーがステータス/キーワード/担当者でフィルタリングし、優先度または期限でソートできる

**Independent Test**: フィルター入力に応じて表示カードが変化し、ソート切替で順序が更新される確認テストが実行可能

### Implementation

- [ ] T033 [P] [US4] フィルター状態管理を`frontend/src/features/kanban/store/filterStore.ts`に実装
- [ ] T034 [P] [US4] フィルターバーUIを`frontend/src/features/kanban/components/FilterBar.tsx`に作成
- [ ] T035 [US4] クエリパラメータ連携を`frontend/src/features/kanban/hooks/useTodosQuery.ts`に拡張し、フィルター/ソートを適用
- [ ] T036 [US4] ボードへのフィルター連動と空状態表示を`frontend/src/features/kanban/components/KanbanBoard.tsx`に追加
- [ ] T037 [P] [US4] フィルター/ソート統合テストを`frontend/tests/integration/kanban-board.filter.spec.tsx`に作成

**Checkpoint**: フィルターとソートが動作し、US4のテストがグリーン

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: 全ストーリーを横断する仕上げと品質向上

- [ ] T038 [P] quickstart更新としてDaisyUI/shadcn手順とテストコマンドを`specs/001-frontend-plan/quickstart.md`に追記
- [ ] T039 アクセシビリティ監査スクリプトを`frontend/package.json`と`frontend/tests/e2e/axe.config.ts`に追加
- [ ] T040 パフォーマンス最適化とリスト仮想化検証を`frontend/src/features/kanban/components/KanbanBoard.tsx`に実装
- [ ] T041 READMEにUI起動手順を`README.md`へ追加
- [ ] T042 E2Eスモークテストを`frontend/tests/e2e/kanban-smoke.spec.ts`に整備

---

## Dependencies & Execution Order

- Phase 1 → Phase 2 → 各ユーザーストーリー → Phase 7 の順に依存。Phase 3〜6はPhase 2完了後に優先度順（P1→P2→P3→P4）で着手。
- ユーザーストーリーレベルの依存:
  - **US1**: Phase 2完了後に開始。後続ストーリーの前提。
  - **US2**: US1のコンポーネント（ボード/カード）が完成していることが前提。
  - **US3**: US1のボードレイアウト + US2のミューテーションを利用。
  - **US4**: US1のクエリ/ボードが必須。並行で進める場合はクエリ拡張部分の競合に注意。
- テストタスクは各ストーリー内で並列可だが、対象実装完了後に最終調整を行う。

## Parallel Execution Examples

- **US1**: T013, T014, T015, T016, T017, T018, T019は異なるファイルで並行実装可能。T012がルートを用意してから着手。
- **US2**: T020, T021, T022, T026, T027は互いに独立しており、T023〜T025のUI統合と並列化できる。
- **US3**: T028, T029, T031は同時進行可。T030はボード統合後、T032で検証。
- **US4**: T033, T034, T037を並列進行し、T035とT036でボード/クエリ統合を行う。

## Implementation Strategy

### MVP
1. Phase 1とPhase 2を完了して基盤を整える
2. Phase 3 (US1) を実装し、ボード閲覧を可能にする → これがMVP
3. US1の統合テストを通し、モックAPIでデモ

### Incremental Delivery
1. MVP達成後、Phase 4 (US2) でCRUDを追加
2. Phase 5 (US3) でドラッグ&キーボード操作を導入
3. Phase 6 (US4) でフィルタリング/ソートを拡張
4. 最後にPhase 7で仕上げを実施

### Team Parallelization
- 基盤構築後、複数開発者でUS2〜US4を並列に担当可能。
- 並行開発時は`useTodosQuery.ts`と`KanbanBoard.tsx`の変更を調整し、CIで統合テストを随時実行。
