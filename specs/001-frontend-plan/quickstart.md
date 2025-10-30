# Quickstart

## 前提条件
- Node.js 20.x (npm 10 以上)
- pnpm 9.x
- Todo API のベースURLとAPIキー（環境変数 `VITE_TODO_API_BASE_URL`, `VITE_TODO_API_TOKEN`）

## セットアップ
1. 依存関係をインストール
   ```bash
   pnpm install
   ```
2. DaisyUI と shadcn/ui のテーマ設定を同期
   ```bash
   pnpm run design:sync
   # Tailwind config・theme tokens・shadcnプリセットを整合
   ```
3. OpenAPIスキーマから型を生成
   ```bash
   pnpm run api:generate
   # openapi-typescript → src/generated/todo.ts
   ```
4. 環境変数を設定
   ```bash
   cp .env.example .env.local
   # BASE_URL と TOKEN を設定
   ```

## 開発サーバー
```bash
pnpm run dev
```
- Vite 開発サーバーが `http://localhost:5173` で起動。
- APIモックが必要な場合は `pnpm run dev:mock` を使用（MSW起動）。

## テスト
```bash
pnpm run test:unit   # Vitest
pnpm run test:int    # コンポーネント/結合テスト
pnpm run test:e2e    # Playwright（CI向け）
```
- キーボード操作とスクリーンリーダー検証用に `pnpm run test:a11y` を追加予定。

## ビルド
```bash
pnpm run build
pnpm run preview
```
- CIでは `pnpm run lint && pnpm run test:unit && pnpm run build` を最低限のゲートとする。
