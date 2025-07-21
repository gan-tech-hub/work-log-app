# Work Log App

![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)
![Next.js](https://img.shields.io/badge/Framework-Next.js-blue)
![Supabase](https://img.shields.io/badge/Backend-Supabase-green)

作業時間と作業内容を記録・可視化できる**シンプルな作業報告管理アプリ**です。

---

## 🚀 デプロイURL

[https://work-log-app-nine.vercel.app/](https://work-log-app-nine.vercel.app/)

---

## 🛠️ 機能概要

✅ 作業日・作業時間・作業内容の記録  
✅ 記録一覧表示・編集・削除  
✅ 作業時間のグラフ化（Recharts使用）  
✅ CSV/PDFでのデータエクスポート  
✅ Supabase認証によるログイン機能  
✅ スマホ対応（レスポンシブ対応）

---

## 🖥️ 技術スタック

### フロントエンド
- **Next.js 15 (App Router)**
- **React**
- **Tailwind CSS**

### バックエンド / 認証
- **Supabase**（認証・DB）

### データベース
- Supabase PostgreSQL

### デプロイ先
- **Vercel**

### コード管理
- **Git / GitHub**

### その他ツール・技術
- **Recharts**（グラフ描画）
- **jsPDF + autoTable**（PDF出力）
- **PapaParse**（CSV出力）
- **環境変数管理（Vercel）**

---

## 🛠️ セットアップ方法（ローカル）

1️⃣ **リポジトリをクローン**
```bash
git clone https://github.com/gan-tech-hub/work-log-app.git
cd work-log-app
```

2️⃣ 依存関係をインストール
```bash
npm install
```

3️⃣ 環境変数を設定
ルートに .env.local を作成し、以下を記載：
```
NEXT_PUBLIC_SUPABASE_URL=あなたのSupabaseURL
NEXT_PUBLIC_SUPABASE_ANON_KEY=あなたのSupabaseAnonKey
```

4️⃣ ローカル起動
```bash
npm run dev
```

ブラウザで http://localhost:3000 にアクセス。

---

📝 ライセンス
MIT

---

👤 作成者
桜庭祐斗
[GitHub](https://github.com/gan-tech-hub)

---

📷 スクリーンショット例
以下は画面のイメージ例です：

・**TOPページ画面**
<img width="494" height="209" alt="image" src="https://github.com/user-attachments/assets/8fe61b81-45a6-47db-832d-a1cf72f3336f" />

・**ログイン画面**
<img width="436" height="347" alt="image" src="https://github.com/user-attachments/assets/9117b622-3fe9-4ba5-ae0e-97e93b9954cb" />

・**ダッシュボード画面**
<img width="505" height="384" alt="image" src="https://github.com/user-attachments/assets/88723c7d-387e-4b04-b0d6-d7661de493b3" />

・**入力フォーム画面**
<img width="630" height="584" alt="image" src="https://github.com/user-attachments/assets/823234a7-a173-4b93-a6f7-1f5fff12c800" />

・**入力一覧画面**
<img width="715" height="789" alt="image" src="https://github.com/user-attachments/assets/6baa0cba-c47e-49b7-8dfd-0ed508fa05fb" />

・**グラフ画面**
<img width="719" height="642" alt="image" src="https://github.com/user-attachments/assets/00234b98-7910-49db-8bc4-6dc63c63bdb4" />
