# 開発環境

1. `npm install`
2. `npm run dynamodb`
3. `db.createTable を実行し、テーブルを作成`
4. `npm run dev`

# デプロイ

- `aws-vault` を推奨します。`aws-vault` で実行した場合、`--no-session` パラメータが必要です。

1. `npm install --production`
2. `npm run bootstrap`
3. `npm run deploy`
