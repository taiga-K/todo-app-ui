# Phase 0 リサーチ

## ルーティング戦略
- Decision: React Router v6.28系を採用し、`createBrowserRouter`を用いたデータフェッチとエラーハンドリングの集中化を行う。
- Rationale: SPA志向の要件に合致し、コード分割・遅延読み込み・エラー境界が標準対応。shadcn/uiコンポーネントとの相性が良く、既存のReact知識を活用できる。
- Alternatives considered: Next.js App Router（SSR要件がないため過剰）、TanStack Router（型安全だがチーム実績がなく学習コストが高い）。

## 状態管理
- Decision: TanStack Query v5でサーバ状態を管理し、UIローカル状態はZustandで軽量管理する。
- Rationale: TodoはAPI主体のためキャッシング・再検証機能が重要。Zustandはドラッグ&ドロップやフィルター等の一時状態をシンプルに構築できる。
- Alternatives considered: Redux Toolkit（設定が重く、用途に対して冗長）、Recoil（チーム標準でない）。

## テスティング
- Decision: 単体・結合テストにVitest + React Testing Library、E2EにPlaywrightを採用する。
- Rationale: Vite系ツールチェーンとの親和性が高く、型サポートが良好。Playwrightはマルチブラウザ・アクセシビリティ検証を自動化しやすい。
- Alternatives considered: Jest（設定が冗長）、Cypress（モバイルビュー検証とキーボード操作自動化の柔軟性でPlaywrightに劣る）。

## パフォーマンス指標
- Decision: 初回描画 (LCP) 1.5秒以内、インタラクション応答 50ms以内、バンドルサイズ 200KB(gz) 以下を目標とする。
- Rationale: タスク管理ツールとしてレスポンス重視。API待ち時間があるためUI側は軽量化に注力すべき。
- Alternatives considered: 緩やかな指標（2.5秒 / 100ms）ではUX低下が懸念。

## UI コンポーネント戦略
- Decision: DaisyUIで共通テーマ/ユーティリティを提供し、パネル・フォーム等の複合コンポーネントはshadcn/uiベースで実装する。Tailwind Configで両者のトークン統合ルールを作成。
- Rationale: DaisyUIはテーマ生成が容易、shadcn/uiはAccessibleな複合要素が充実。役割を明確に分けることで競合を避ける。
- Alternatives considered: DaisyUI単独（複合UIのアクセシビリティが弱い）、shadcn/ui単独（テーマ切替機構の実装コストが高い）。

## ドラッグ&ドロップとアクセシビリティ
- Decision: `@dnd-kit/core`でドラッグ&ドロップを実装し、キーボード操作用にshadcn/uiのCommand/Menuパターンを組み合わせる。
- Rationale: DnD Kitはアクセシブルなドラッグ操作をサポートし、仮想化やセンサー制御が柔軟。ARIA属性を簡潔に付与できる。
- Alternatives considered: react-beautiful-dnd（メンテ停止）、HTML5 DnD API（アクセシビリティ制御が困難）。

## API 連携
- Decision: OpenAPI仕様から`openapi-typescript`で型生成し、`ky`ベースの軽量APIクライアントで呼び出す。
- Rationale: 型安全なAPI呼び出しとエラーハンドリングを統一し、TanStack Queryと容易に統合できる。
- Alternatives considered: 手書きfetchラッパー（型とリトライポリシー管理が負担）、Axios（重量級依存とESM対応の注意点）。
