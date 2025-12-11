# www.genostar.jp ドメイン設定ガイド

このドキュメントでは、GitHub Pages サイトを `www.genostar.jp` で解決するために必要な設定変更について説明します。

## 実施した変更

### 1. VitePress 設定の更新 (`.vitepress/config.mts`)

**変更内容:**
```typescript
export default defineConfig({
  base: '/',  // カスタムドメイン用にルートパスに設定
  // ...
});
```

**理由:**
- デフォルトでは GitHub Pages は `username.github.io/repository-name/` のようなサブパスで配信されます
- カスタムドメイン（`www.genostar.jp`）を使用する場合、サイトはルートパス `/` で提供されるため、`base: '/'` を明示的に設定する必要があります
- これにより、すべてのリンク、アセット、ルーティングが正しく動作します

### 2. CNAME ファイルの作成 (`public/CNAME`)

**変更内容:**
```
www.genostar.jp
```

**理由:**
- GitHub Pages でカスタムドメインを使用するには、リポジトリのルートまたは `public` ディレクトリに CNAME ファイルが必要です
- VitePress は `public` ディレクトリの内容を自動的にビルド出力（`.vitepress/dist`）にコピーします
- このファイルにより、GitHub Pages がカスタムドメイン `www.genostar.jp` を認識し、適切にルーティングします

### 3. GitHub Actions ワークフローの更新 (`.github/workflows/deploy-pages.yml`)

**変更内容:**
```yaml
- name: Deploy to GitHub Pages (gh-pages branch)
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: .vitepress/dist
    publish_branch: gh-pages
    cname: www.genostar.jp  # この行を追加
```

**理由:**
- `peaceiris/actions-gh-pages` アクションに `cname` パラメータを指定することで、デプロイ時に CNAME ファイルが確実に保持されます
- 二重の保証として機能し、ビルドプロセス中に CNAME ファイルが失われた場合でも、デプロイ時に再作成されます

## 次のステップ：GitHub と DNS の設定

コードの変更は完了しましたが、実際にドメインを機能させるには、以下の追加設定が必要です：

### 4. GitHub リポジトリ設定

1. GitHub リポジトリの **Settings** → **Pages** に移動
2. **Custom domain** フィールドに `www.genostar.jp` を入力
3. **Enforce HTTPS** を有効化（推奨）

### 5. DNS 設定（ドメインレジストラまたは DNS プロバイダー）

`genostar.jp` ドメインの DNS 設定で以下のレコードを追加する必要があります：

#### オプション A: CNAME レコード（推奨）
```
www.genostar.jp  CNAME  yellowrush.github.io.
```

#### オプション B: A レコード（www なしでも機能させたい場合）
ルートドメイン（`genostar.jp`）の場合：
```
genostar.jp  A  185.199.108.153
genostar.jp  A  185.199.109.153
genostar.jp  A  185.199.110.153
genostar.jp  A  185.199.111.153
```

そして `www` サブドメインの CNAME：
```
www.genostar.jp  CNAME  yellowrush.github.io.
```

**注意:** DNS の変更が反映されるまで、最大 24-48 時間かかる場合があります。

## 検証方法

すべての設定が完了したら、以下の方法で確認できます：

1. **DNS 伝播の確認:**
   ```bash
   nslookup www.genostar.jp
   # または
   dig www.genostar.jp
   ```

2. **サイトアクセスの確認:**
   - ブラウザで `https://www.genostar.jp` にアクセス
   - すべてのページとアセットが正しく読み込まれることを確認

3. **HTTPS の確認:**
   - GitHub Pages は自動的に Let's Encrypt 証明書を発行します
   - 証明書の発行には数分かかる場合があります

## トラブルシューティング

### 404 エラーが表示される
- GitHub Pages 設定で正しいブランチ（`gh-pages`）が選択されているか確認
- CNAME ファイルが正しくデプロイされているか確認（`https://github.com/yellowrush/genostar-lp/blob/gh-pages/CNAME`）

### DNS が解決しない
- DNS レコードが正しく設定されているか確認
- DNS 伝播を待つ（最大 48 時間）
- `nslookup` または `dig` コマンドで DNS 設定を確認

### HTTPS 証明書エラー
- GitHub Pages 設定で「Enforce HTTPS」を有効化
- DNS が正しく設定されていることを確認
- 証明書の発行を待つ（通常 5-10 分）

## まとめ

この設定により、サイトは以下のように動作します：

1. ✅ コードの変更（VitePress 設定、CNAME ファイル、ワークフロー）は完了
2. ⏳ GitHub Pages の設定が必要
3. ⏳ DNS の設定が必要
4. ✅ 設定完了後、`https://www.genostar.jp` でサイトにアクセス可能

DNS 設定は、ドメインプロバイダー（お名前.com、ムームードメイン、Route 53 など）の管理画面で行う必要があります。
