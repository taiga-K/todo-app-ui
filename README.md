# Todo App UI

日々のタスクを気軽に整理・確認できるシンプルなアプリです。  
思いついた予定を書き留めたり、進捗を管理したりする場として活用できます。  
忙しい日常でも迷わず使える、直感的で軽快な操作感を目指しています。

## 🚀 クイックスタート

### 前提条件
- Node.js 20.x 以上
- pnpm 9.x

### インストールと起動

```bash
# リポジトリをクローン
git clone https://github.com/taiga-K/todo-app-ui.git
cd todo-app-ui/frontend

# 依存関係をインストール
pnpm install

# API型を生成
pnpm run api:generate

# 開発サーバーを起動
pnpm run dev
```

ブラウザで [http://localhost:5173/kanban](http://localhost:5173/kanban) にアクセス

> **Note**: APIキーが未設定の場合、自動的にモックデータを使用します

## ✨ 機能

### カンバンボード
- **3列レイアウト**: Backlog → In Progress → Done
- **ドラッグ&ドロップ**: 直感的なカード移動
- **キーボード操作**: アクセシブルなステータス変更メニュー

### Todo管理
- **作成・編集・削除**: 完全なCRUD操作
- **優先度設定**: Low / Medium / High / Urgent
- **期限管理**: 期限日の設定と視覚的な警告
- **担当者**: アバター表示

### フィルタリング & ソート
- **検索**: タイトル・説明の全文検索
- **優先度フィルター**: 優先度別表示
- **ソート**: 優先度または期限でソート

## 🛠️ 技術スタック

- **Framework**: React 18 + TypeScript 5
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS + DaisyUI + shadcn/ui
- **State Management**: TanStack Query v5 + Zustand v5
- **Routing**: React Router v6.28
- **Drag & Drop**: @dnd-kit/core v6
- **HTTP Client**: ky v1
- **Type Generation**: openapi-typescript v7

## 📚 ドキュメント

- [仕様書](./specs/001-frontend-plan/spec.md) - 機能要件と設計
- [実装計画](./specs/001-frontend-plan/plan.md) - 技術選定とアーキテクチャ
- [タスク一覧](./specs/001-frontend-plan/tasks.md) - 実装タスクの詳細
- [クイックスタート](./specs/001-frontend-plan/quickstart.md) - セットアップ手順

## 🧪 テスト & ビルド

```bash
# コード品質チェック
pnpm run lint
pnpm run format

# テスト実行
pnpm run test

# 本番ビルド
pnpm run build
pnpm run preview
```

## 📝 開発ガイド

### ディレクトリ構造

```
frontend/
├── src/
│   ├── components/ui/      # 再利用可能なUIコンポーネント
│   ├── features/kanban/    # カンバン機能
│   │   ├── cards/          # Todoカードコンポーネント
│   │   ├── columns/        # カラムコンポーネント
│   │   ├── components/     # ボード・ダイアログ等
│   │   ├── hooks/          # クエリ・ミューテーション
│   │   ├── services/       # API呼び出し
│   │   └── store/          # Zustand状態管理
│   ├── lib/                # ユーティリティ
│   ├── routes/             # ページコンポーネント
│   └── styles/             # グローバルスタイル
└── tests/                  # テストファイル
```

### コーディング規約

- TypeScript strict mode有効
- ESLint + Prettier設定済み
- 関数型コンポーネント優先
- カスタムフックで状態ロジックを分離

## 🤝 コントリビューション

プルリクエストを歓迎します！以下を確認してください：

1. `pnpm run lint` でエラーがないこと
2. `pnpm run build` が成功すること
3. 機能追加の場合は仕様書を更新

## 📄 ライセンス

MIT
