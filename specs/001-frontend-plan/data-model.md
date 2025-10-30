# Data Model

## Todo
| フィールド | 型 | 必須 | 説明 | バリデーション |
|-----------|----|------|------|----------------|
| id | string | ○ | Todo一意識別子 | UUID形式 |
| title | string | ○ | Todoタイトル | 1〜120文字 |
| description | string | × | 詳細説明 | 最大2000文字 |
| status | string (enum: backlog/in_progress/done/other) | ○ | カンバン列に対応するステータス | API定義の列キーと一致 |
| priority | `"low" | "medium" | "high" | string` | × | 優先度 | APIの列挙値と同期 |
| dueDate | string (ISO 8601) | × | 期限 | 過去日付可、タイムゾーンはUTC表記 |
| assignee | Assignee | × | 担当者情報 | APIが提供する場合のみ表示 |
| createdAt | string (ISO 8601) | ○ | 作成日時 | 読み取り専用 |
| updatedAt | string (ISO 8601) | ○ | 更新日時 | 読み取り専用 |
| archivedAt | string (ISO 8601) | × | アーカイブ日時 | 復元時にnull |

## Assignee
| フィールド | 型 | 必須 | 説明 |
|-----------|----|------|------|
| id | string | ○ | 担当者ID |
| name | string | ○ | 表示名 |
| avatarUrl | string | × | アバター画像URL |

## ColumnMeta
| フィールド | 型 | 必須 | 説明 |
|-----------|----|------|------|
| key | string | ○ | ステータスキー |
| displayName | string | ○ | UI表示名 |
| order | number | ○ | 並び順 |
| description | string | × | 補足説明 |
| isDefault | boolean | × | 追加列の判定 |

## BoardState
| フィールド | 型 | 必須 | 説明 |
|-----------|----|------|------|
| columns | ColumnMeta[] | ○ | 表示列のメタデータ |
| todosByColumn | Record<string, Todo[]> | ○ | 列ごとのTodo配列 |
| filters | Filters | ○ | 現在のフィルター状態 |
| sort | string (enum: priority/dueDate) \/ null | × | 現在のソートキー |
| isLoading | boolean | ○ | ボード全体のローディング状態 |
| errors | UIError[] | × | エラー通知のキュー |

## Filters
| フィールド | 型 | 必須 | 説明 |
|-----------|----|------|------|
| status | string[] | × | 表示対象のステータスキー |
| search | string | × | タイトル/説明の検索文字列 |
| assignee | string | × | 担当者ID |

## UIError
| フィールド | 型 | 必須 | 説明 |
|-----------|----|------|------|
| id | string | ○ | メッセージ識別子 |
| type | string (enum: api/validation/network) | ○ | エラー種別 |
| message | string | ○ | 表示メッセージ |
| retryAction | string | × | 再試行用アクションキー |

## State Transitions
- Todo.status: `backlog → in_progress → done` を主経路とし、APIが追加ステータスを返した場合は`ColumnMeta`に従う。
- 削除/アーカイブ時: Todoは`archivedAt`に値を持ち、ボードから除外。復元すると`archivedAt=null`で元の列へ戻る。
- フィルタリング: `Filters`が更新されると`todosByColumn`が再計算され、TanStack Queryのキャッシュ更新をトリガーする。
