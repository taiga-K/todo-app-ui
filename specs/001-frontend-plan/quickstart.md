# Quickstart

## 前提条件
- Node.js 20.x (npm 10 以上)
- pnpm 9.x
- Todo API のベースURLとAPIキー（環境変数 `VITE_TODO_API_BASE_URL`, `VITE_TODO_API_TOKEN`）

## セットアップ
1. 依存関係をインストール
   ```bash
   cd frontend
   pnpm install
   ```
2. OpenAPIスキーマから型を生成
   ```bash
   pnpm run api:generate
   # openapi-typescript → src/generated/todo.ts
   ```
3. 環境変数を設定（オプション - モックモードではスキップ可）
   ```bash
   cp .env.example .env.local
   # VITE_TODO_API_BASE_URL と VITE_TODO_API_TOKEN を設定
   ```

### DaisyUI + shadcn/ui テーマ設定

プロジェクトはDaisyUIとshadcn/uiを組み合わせて使用しています：

- **DaisyUI**: `tailwind.config.js`で設定され、コンポーネントクラス（btn, card, input等）を提供
- **shadcn/ui**: カスタムReactコンポーネント（`src/components/ui/`）でDaisyUIクラスをラップ
- **テーマトークン**: `src/styles/global.css`でCSS変数として定義

テーマのカスタマイズ:
```javascript
// tailwind.config.js
export default {
  // ...
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light", "dark"], // 使用するテーマ
    base: true,
    styled: true,
    utils: true,
  },
}
```

## 開発サーバー
```bash
pnpm run dev
```
- Vite 開発サーバーが `http://localhost:5173` で起動
- **モックモード**: APIキーが未設定の場合、自動的にモックデータを使用
- モックデータは `src/lib/api/mockData.ts` で定義

ブラウザで [http://localhost:5173/kanban](http://localhost:5173/kanban) にアクセスしてKanbanボードを表示

## 利用可能なコマンド

### 開発
```bash
pnpm run dev          # 開発サーバー起動（モック自動有効）
pnpm run dev:mock     # 明示的にモックモードで起動
```

### コード品質
```bash
pnpm run lint         # ESLintでコードチェック
pnpm run format       # Prettierでコード整形
pnpm run format:check # フォーマット確認のみ
```

### テスト
```bash
pnpm run test         # lint + unit test
pnpm run test:unit    # Vitestユニットテスト
pnpm run test:int     # 統合テスト（実装予定）
pnpm run test:e2e     # Playwright E2Eテスト（実装予定）
pnpm run test:a11y    # アクセシビリティテスト（実装予定）
```

### ビルド
```bash
pnpm run build        # 本番ビルド
pnpm run preview      # ビルド結果をプレビュー
```

### API型生成
```bash
pnpm run api:generate # OpenAPI仕様から型を再生成
```

## 機能

### 実装済み
- ✅ カンバンボード表示（3列: Backlog / In Progress / Done）
- ✅ Todo CRUD操作（作成・編集・削除・復元）
- ✅ ドラッグ&ドロップでステータス変更
- ✅ キーボードアクセシブルなステータス変更メニュー
- ✅ フィルタリング（検索・優先度）
- ✅ ソート（優先度・期限）
- ✅ レスポンシブデザイン
- ✅ ローディング・エラー・空状態

### CIゲート
```bash
pnpm run lint && pnpm run test:unit && pnpm run build
```
