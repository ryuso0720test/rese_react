# 上級案件(飲食店予約サービス)

## 機能一覧

- 会員登録
- ログイン
- ログアウト
- ユーザー情報取得
- ユーザー飲食店お気に入り一覧取得
- ユーザー飲食店予約情報取得
- 飲食店一覧取得
- 飲食店詳細取得
- 飲食店お気に入り追加
- 飲食店お気に入り削除
- 飲食店お気に入り追加
- 飲食店お気に入り削除
- 飲食店予約情報追加
- 飲食店予約情報削除
- エリアで検索する
- ジャンルで検索する
- 店名で検索する

## Docker ビルド

1. git clone git@github.com:ryuso0720test/rese_react.git
2. cd rese_react ※docker-compose.yml のでディレクトリに移動
3. docker-compose up -d --build
   \*MySQL は、OS によって起動しない場合があるのでそれぞれの PC にあわせて docker-compose.yml ファイルを編集してください。

## Laravel 環境構築

1. docker-compose exec php bash
2. composer install
3. .env ファイルの編集 「.env.example」ファイルを 「.env」ファイルに命名を変更。または、新しく.env ファイルを作成 .env に以下の環境変数を追加

```
   DB_CONNECTION=mysql
   DB_HOST=mysql
   DB_PORT=3306
   DB_DATABASE=laravel_db
   DB_USERNAME=laravel_user
   DB_PASSWORD=laravel_pass

```

4. php artisan key:generate
5. php artisan migrate
6. php artisan db:seed
7. exit ※php コンテナから抜ける

## React 環境構築

1. cd src ※vite.config.ts のディレクトまで移動
2. npm install
3. chmod -R 777 storage bootstrap/cache   ←環境よっては必要
3. npm run dev

## 使用技術

- PHP 8.2.21
- Laravel 10.48.12
- mysql:8.0.26
- nginx:1.21.1

## URL

- 開発環境： http://localhost/
- phpMyAdmin：http://localhost:8080/

## ER 図
![新規 テキスト ドキュメント](https://github.com/user-attachments/assets/797606ef-21e4-4693-af24-3d22867b5a59)
