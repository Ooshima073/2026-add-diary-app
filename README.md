# Diary App Hands-on

React Native + Expo + Firebase を題材にした、AI 駆動開発ハンズオン用テンプレートです。

## 使用技術

- React Native / Expo / Firebase
- TypeScript
- Nix flakes (環境固定)
- direnv (cd で自動有効化)
- pnpm (パッケージマネージャ)
- just (生徒向けコマンドの入口)
- Cursor + opencode (AI 駆動開発)

---

## 必要なもの

- Windows PC
- WSL2 Ubuntu (インストール済み前提)
- Cursor (Windows 側にインストール — `scripts/setup.sh` でも自動インストールを試みる)
- GitHub アカウント
- Anthropic API Key (Cursor 上の opencode TUI で入力)
- iPhone または Android スマートフォン

> 教員 (Mac) は WSL 不要。`flake.nix` が `aarch64-darwin` にも対応しているので、`nix develop` だけで同じ環境に入れます。

---

## 初回セットアップ (生徒向け)

WSL の Ubuntu を開いて、以下を 1 行だけ実行します。

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/ncc-toda/2026-add-diary-app/main/scripts/setup.sh)
```

詳細な手順とトラブルシューティングは [`guides/student-guide.md`](guides/student-guide.md) を参照してください。

`scripts/setup.sh` がやること:

1. apt パッケージ (git / curl / direnv 等) のインストール
2. GitHub CLI (`gh`) のインストール
3. GitHub ログイン (初回のみブラウザ認証)
4. リポジトリの fork + clone (`~/projects/2026-add-diary-app` に配置)
5. Nix のインストール
6. direnv フックの設定
7. Cursor のインストール (winget) と検出
8. Cursor 拡張のインストール
9. `pnpm install`
10. Cursor 起動

---

## Anthropic API Key の設定

セットアップ後、Cursor のターミナルで以下を実行します。

```bash
opencode
```

OpenCode の TUI が起動するので、プロンプトに従って **プロバイダー = Anthropic** を選び、
API Key (`sk-ant-...`) を貼り付けてください。

Key は OpenCode の設定ファイルに保存され、リポジトリには一切混入しません。
2 回目以降は登録済みの Key が自動で使われます。

---

## Expo Go のインストール

スマホに Expo Go をインストールしてください。

- iPhone: App Store → "Expo Go"
- Android: Google Play → "Expo Go"

---

## 開発開始

Cursor 左下に `WSL: Ubuntu` と表示されていることを確認したら、ターミナルで:

```bash
just start
```

QR コードが表示されたら、Expo Go で読み取ります。

> デフォルトは tunnel モードです (学校 Wi-Fi でも繋がりやすいため)。
> 同一 Wi-Fi で速度を出したい場合は `just start-lan` を使ってください。

---

## 2 回目以降

WSL の Ubuntu を開いて:

```bash
cd ~/projects/2026-add-diary-app
cursor .
```

Cursor のターミナルで:

```bash
just start
```

---

## 最初からやり直したいとき

setup.sh で作ったプロジェクトディレクトリと GitHub fork を消して、
セットアップ前の状態に戻すには:

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/ncc-toda/2026-add-diary-app/main/scripts/cleanup.sh)
```

`apt` パッケージ・`gh`・Nix・direnv フック・Cursor 拡張は残ります。
fork を残してローカルだけ消したい場合は `KEEP_FORK=1` を付けてください。

---

## よく使うコマンド

| コマンド | 説明 |
| --- | --- |
| `just start` | Expo を tunnel モードで起動 |
| `just start-lan` | Expo を LAN モードで起動 |
| `just check` | TypeScript 型チェック + ESLint |
| `just test` | Jest でテスト実行 |
| `just doctor` | `expo-doctor` で環境診断 |
| `just build-ios` | EAS で iOS 実機向けビルド |
| `just build-android` | EAS で Android 実機向けビルド |
| `just sync-upstream` | 教員リポジトリの更新を取得 |

---

## Cursor の使い方

- 必ず WSL 側のプロジェクトを開いてください (`cursor .` を WSL から実行)
- 左下に `WSL: Ubuntu` と表示されていれば OK
- Windows 側 (`/mnt/c/...`) から開くと Node / Expo の挙動が不安定になります

---

## プロジェクトの配置場所

### 標準: `~/projects/2026-add-diary-app`

`scripts/setup.sh` は自動的に `~/projects/2026-add-diary-app` に配置します。
特にこだわりがなければ、この場所をそのまま使ってください。

### 任意のディレクトリに置きたい場合

`PROJECT_DIR` 環境変数で上書きできます。

```bash
PROJECT_DIR=~/work/my-diary bash <(curl -fsSL https://raw.githubusercontent.com/ncc-toda/2026-add-diary-app/main/scripts/setup.sh)
```

または親ディレクトリだけ変えるなら:

```bash
PROJECT_PARENT_DIR=~/work bash <(curl -fsSL https://raw.githubusercontent.com/ncc-toda/2026-add-diary-app/main/scripts/setup.sh)
# -> ~/work/2026-add-diary-app に配置される
```

**注意点 (任意ディレクトリにする人向け)**

- **Windows 側 (`/mnt/c/...`) には絶対に置かないでください。**
  Node の `node_modules` やファイル監視 (Metro / watchman) が極端に遅くなり、
  授業中に動作不能になることがあります。
  必ず WSL の Linux ファイルシステム (`/home/<user>/...`) 配下に置いてください。
- パスにスペースや日本語を含めない方が安全です。
- 教員が共有する手順書 (講師がトラブルシュート時に確認するコマンド例) は
  `~/projects/2026-add-diary-app` を前提に書かれていることがあります。
  違うパスにした場合は、その都度読み替えてください。

---

## Git

- `origin` ... 自分の fork リポジトリ (push してよい)
- `upstream` ... 教員リポジトリ (push 不可、pull のみ)

授業中に教員が修正を入れた場合は:

```bash
just sync-upstream
```

`commit` は自由に行って構いません。`push` も自分の fork に対してだけなら自由です。

---

## トラブルシューティング

まずはこれを実行してください。

```bash
just doctor
```

そのうえで、以下の出力を教員に共有してください。

```bash
pwd
which node && node -v
which pnpm && pnpm -v
which nix && nix --version
direnv status
git remote -v
```

詳細は [`guides/student-guide.md`](guides/student-guide.md) (生徒向け) と
[`guides/teacher-setup-notes.md`](guides/teacher-setup-notes.md) (教員向け) を参照。

## License

This project is licensed under MIT-0. See [`LICENSE`](LICENSE).

Third-party notices are documented in [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md).
