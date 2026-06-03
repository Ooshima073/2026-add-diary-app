# Diary App ハンズオン 生徒向け手順書

この手順書は、授業初日の **「自分の PC でアプリが動くまで」** を 1 本にまとめたものです。
上から順番にやっていけば、全員同じ環境にたどり着けます。

> 困ったら、ページ最後の「トラブルシューティング」と教員に相談。

---

## 0. 用意するもの

- Windows PC (WSL2 Ubuntu インストール済み)
- GitHub アカウント
- Anthropic API Key (授業中に配布、または各自取得)
- iPhone または Android スマートフォン
- 安定したネット接続 (テザリングだと tunnel モード必須)

> Mac の人は教員側ノートを参照。WSL は不要。

---

## 1. Cursor を入れる (まだ無い人)

[https://cursor.com/](https://cursor.com/) からダウンロードしてインストール。

> セットアップスクリプトが自動でインストールも試みるので、
> 必須ではないが、先に入れておくと確実。

---

## 2. WSL Ubuntu を開く

スタートメニューから **Ubuntu** を起動。
ターミナル (黒い画面) が開く。

> Windows Terminal を使っている人は「Ubuntu」プロファイルを選択。

---

## 3. セットアップスクリプトを実行 (1 行)

Ubuntu のターミナルに、以下を **コピペして Enter**。

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/ncc-toda/2026-add-diary-app/main/scripts/setup.sh)
```

スクリプトが順番にやってくれること:

1. 必要な Linux パッケージ (git, curl, direnv など) のインストール
2. GitHub CLI (`gh`) のインストール
3. **GitHub ログイン** ← ブラウザが立ち上がる。手順に従って認証する
4. このリポジトリを自分のアカウントに fork して `~/projects/2026-add-diary-app` に clone
5. Nix (パッケージマネージャ) のインストール
6. direnv フックの設定 (`cd` で自動的に環境が切り替わる)
7. **Cursor のインストール** (winget 経由) と検出
8. Cursor 拡張のインストール
9. `pnpm install` で JS パッケージを取得
10. Cursor を WSL リモートとして自動オープン

**所要時間**: 通信状況にもよるが、おおむね 10〜20 分。
途中で `sudo` のパスワードを聞かれることがあるので、Ubuntu のパスワードを入力。

---

## 4. Cursor が開いたか確認

スクリプトが終わるか、終了間際に Cursor のウィンドウが立ち上がる。
**左下に `WSL: Ubuntu` と緑色で表示されている**ことを必ず確認。

| 表示 | 状態 |
| --- | --- |
| `WSL: Ubuntu` | OK ✅ |
| 何も表示されない / `Connect to WSL` のまま | NG ❌ → 一度閉じて WSL のターミナルから `cursor .` で開き直す |

> Windows 側 (`/mnt/c/...`) で開くと、Node や Expo の動作が極端に遅くなり、
> 授業中に動かなくなる原因になる。必ず WSL モード。

---

## 5. Anthropic API Key を OpenCode に登録

Cursor の中で **ターミナル** を開く ( `Ctrl + ` 〜 (バッククォート) )。
プロジェクトディレクトリにいることを確認 (`pwd` で `~/projects/2026-add-diary-app`)。

そこで以下を実行:

```bash
opencode
```

OpenCode の TUI (対話型画面) が起動する。

初回起動時に、**API プロバイダーの選択 → API Key の入力**を求められる。

1. 矢印キーで `Anthropic` を選んで Enter
2. プロンプトに **配布された API Key** (`sk-ant-...`) を貼り付けて Enter
3. 「ログインしました」のメッセージが出たら成功

> Key は OpenCode の設定ファイル (`~/.config/opencode/...`) に保存される。
> リポジトリには一切混入しないので、**git に push する心配はゼロ**。
>
> もし TUI を閉じてしまっても、もう一度 `opencode` を起動すれば前回の Key が使われる。

確認できたら、TUI 内で `/exit` または `Ctrl+C` で抜けて OK。

---

## 6. スマホに Expo Go をインストール

ハンズオンで使うアプリ実行環境。

- iPhone: **App Store** → "Expo Go"
- Android: **Google Play** → "Expo Go"

PC とスマホは **どちらのネットワークでも OK** (tunnel モードを使うため)。

---

## 7. アプリを起動

Cursor のターミナルで:

```bash
just start
```

しばらくすると QR コードが表示される。

- iPhone: **カメラアプリで QR を読む** → Expo Go が開く
- Android: **Expo Go アプリ内の "Scan QR Code"** → QR を読む

数十秒〜1 分でアプリが起動する。これでハンズオンの準備完了 🎉

---

## 日々の作業フロー (2 日目以降)

### アプリを動かしたいとき

1. WSL Ubuntu を開く
2. `cd ~/projects/2026-add-diary-app`
3. `cursor .` (Cursor を WSL モードで開く)
4. Cursor のターミナルで `just start`
5. スマホで QR を読む

### AI と一緒に開発したいとき

Cursor のターミナルで:

```bash
opencode
```

TUI が開いたら、自然言語で指示を出す。例:

```
今日の日記を入力するフォームを app/index.tsx に追加して
```

OpenCode がコードを書いて、Cursor 内で差分を見せてくれる。

### 教員のリポジトリに更新が入ったとき

```bash
just sync-upstream
```

---

## よく使うコマンド一覧

| コマンド | 説明 |
| --- | --- |
| `just start` | Expo を tunnel モードで起動 (どこからでも繋がる) |
| `just start-lan` | Expo を LAN モードで起動 (同一 Wi-Fi 時は速い) |
| `just check` | TypeScript 型チェック + ESLint |
| `just test` | テスト実行 |
| `just doctor` | 環境診断 (なんか動かない時はまずこれ) |
| `just sync-upstream` | 教員リポジトリの更新を取り込む |
| `opencode` | OpenCode TUI を起動 |

---

## トラブルシューティング

### `nix: command not found`

→ Nix インストール後にシェルを開き直していない。WSL のウィンドウを一度閉じて開き直す。

### `direnv: error` / `pnpm: command not found`

→ `direnv allow` が必要。プロジェクトディレクトリで:

```bash
direnv allow
```

### `just start` 実行後、Expo Go で繋がらない

→ ほぼ 100% Wi-Fi 起因。`just start` (tunnel モード) なら学校 Wi-Fi でも繋がるはず。
それでもダメなら、スマホをモバイルデータ通信に切り替える。

### Cursor が Windows モードで開いた (左下が WSL: Ubuntu じゃない)

→ Cursor を一度全部閉じて、WSL Ubuntu のターミナルから:

```bash
cd ~/projects/2026-add-diary-app
cursor .
```

### `opencode` で API Key を毎回聞かれる

→ TUI 内で `/auth login` を実行して登録し直す。

### `pnpm install` が異常に遅い

→ プロジェクトを `/mnt/c/...` (Windows ファイルシステム) に置いている可能性。
`pwd` で確認し、`~/projects/2026-add-diary-app` (= `/home/<user>/projects/...`) になっていない場合は教員に相談。

### 全部やり直したい

セットアップ前の状態に戻すスクリプトを用意してある:

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/ncc-toda/2026-add-diary-app/main/scripts/cleanup.sh)
```

プロジェクトディレクトリと GitHub fork を削除する。
Nix / direnv / gh / Cursor 本体は残るので、もう一度 `setup.sh` を流せば早い。

---

### それでも解決しないとき

教員に以下の出力をまるごと共有してください:

```bash
pwd
which node && node -v
which pnpm && pnpm -v
which nix && nix --version
direnv status
git remote -v
```
