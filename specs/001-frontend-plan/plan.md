# Implementation Plan: カンバン Todo UI フロントエンド

**Branch**: `001-frontend-plan` | **Date**: 2025-10-31 | **Spec**: `specs/001-frontend-plan/spec.md`
**Input**: Feature specification from `/specs/001-frontend-plan/spec.md`

**Note**: This templateは`/speckit.plan`ワークフローで利用される。

## Summary

Todo APIと連携するカンバン形式のTodo UIをReact + TypeScriptで構築し、DaisyUIとshadcn/uiのハイブリッドデザインシステムを採用する。ユーザーがタスクの作成・更新・ステータス変更・フィルタリングを直感的かつアクセシブルに実行できる体験を提供する。

## Technical Context

**Language/Version**: TypeScript 5系 / React 18  
**Primary Dependencies**: DaisyUI, shadcn/ui, TanStack Query v5, Zustand, React Router v6.28, `@dnd-kit/core`, ky, openapi-typescript  
**Storage**: フロント単体のためN/A（データは外部Todo API経由）  
**Testing**: Vitest + React Testing Library, Playwright  
**Target Platform**: Web（モバイル・タブレット・デスクトップ対応ブラウザ）  
**Project Type**: Webフロントエンド単体  
**Performance Goals**: 初回描画(LCP)1.5秒以内、インタラクション応答50ms以内、バンドルサイズ200KB(gz)以下  
**Constraints**: WCAG 2.1 AA準拠、ドラッグ&ドロップとキーボード操作の両立、API呼び出しは型生成済みクライアントで統一  
**Scale/Scope**: 中規模UI（3列カンバン + フィルタリング + モーダル編集）

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

`.specify/memory/constitution.md`は雛形状態で有効な原則が未定義のため、現時点で遵守すべき追加ガードは検出されない。正式な憲章策定が完了していない点はリスクとして認識し、Phase 0で確認する。

*Phase 1再確認*: 新規設計成果物（research/data-model/contracts/quickstart）を踏まえても憲章由来の追加要求は発生せず、リスクは「憲章未定義」のみで継続。

## Project Structure

### Documentation (this feature)

```text
specs/001-frontend-plan/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md (Phase 2で作成)
```

```
frontend/
├── src/
│   ├── components/
│   ├── features/kanban/
│   │   ├── columns/
│   │   ├── cards/
│   │   ├── hooks/
│   │   └── services/
│   ├── lib/
│   └── routes/
├── public/
└── tests/
    ├── unit/
    ├── integration/
    └── e2e/
```

**Structure Decision**: 単一のフロントエンドアプリ（React）を`frontend/`配下に配置し、機能別ディレクトリでカンバン機能をモジュール化する。テストはレイヤ別に`tests/`で管理する。

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |
