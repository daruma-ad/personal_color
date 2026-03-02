# 【脱バックエンド】静的サイトにFormspreeで問い合わせ・予約フォームを実装する方法

GitHub Pagesなどの静的ホスティングでWebサイトを公開する際、ネックになるのが「お問い合わせフォーム」や「予約フォーム」の実装です。PHPなどのサーバーサイド言語が動かないため、自前でメール送信処理を用意するのは手間がかかります。

そんな時におすすめなのが、バックエンド不要でフォーム機能を追加できるサービス **[Formspree](https://formspree.io/)** です。

今回は、JavaScript (Fetch API) と組み合わせて、画面遷移なし（非同期）でスマートにフォームを送信する手順を解説します。実際の予約フォームを想定し、隠しデータ（診断結果やクーポン情報など）を一緒に送る実践的なテクニックも紹介します。

---

## Formspreeとは？

Formspreeは、HTMLのフォームから直接データを受け取り、指定したメールアドレスに転送してくれるサービスです。
- **特徴**: サーバーサイドのコード（PHP, Node.jsなど）が一切不要
- **料金**: 無料プランでも月間50件まで送信可能
- **実装**: HTMLの `<form>` タグに少し追記するだけ

---

## 実装手順

### ステップ1：Formspreeのアカウント作成とエンドポイント取得

1. [Formspree公式サイト](https://formspree.io/) にアクセスし、アカウントを作成します。
2. ダッシュボードから「+ New Form」をクリックして新しいフォームを作成します（例：`Reservation Form`）。
3. 送信先のメールアドレス（通知を受け取りたいアドレス）を指定します。
4. フォームが作成されると、**Endpoint URL** が発行されます。
   *例：`https://formspree.io/f/xxxxxxxx`* （このURLを後で使います）

### ステップ2：HTMLフォームの準備

まずは基本的なHTMLフォームを作成します。ポイントは以下の3点です。

1. `<form>`タグに `action`（取得したURL）と `method="POST"` を設定する
2. サーバーに送りたい入力項目すべてに `name` 属性を忘れずに付ける
3. プログラム側で送信データを扱いたい「診断結果」などの隠しデータは `<input type="hidden">` で用意する

```html
<!-- HTML -->
<form id="reservation-form" action="https://formspree.io/f/xxxxxxxx" method="POST">
  <!-- ユーザー入力項目 -->
  <div class="form-group">
    <label>お名前</label>
    <input type="text" id="res-name" name="お名前" required>
  </div>
  <div class="form-group">
    <label>電話番号</label>
    <input type="tel" id="res-phone" name="電話番号" required>
  </div>
  <div class="form-group">
    <label>来店希望日</label>
    <input type="date" id="res-date" name="来店希望日" required>
  </div>

  <!-- 裏側で送付する隠しデータ（アプリの診断結果など） -->
  <input type="hidden" id="hidden-diagnosis" name="診断結果" value="桜タイプ">
  <input type="hidden" id="hidden-coupon" name="クーポン適用" value="1万円OFF適用済み">

  <button type="submit" class="btn-submit">予約を確定する</button>
</form>

<!-- 送信完了メッセージ（初期は非表示） -->
<div id="reservation-complete" style="display:none;">
  <h3>ご予約ありがとうございます！</h3>
  <p>内容を確認の上、ご連絡いたします。</p>
</div>
```

> **💡 Tips: `name`属性**
> Formspreeから届くメールの項目名には、ここで設定した `name` 属性の値（「お名前」「診断結果」など）がそのまま使われます。日本語で設定しておくとメールが読みやすくなります。

### ステップ3：JavaScriptで非同期送信（Ajax）を実装

通常、HTMLフォームをそのまま送信すると、Formspreeの完了画面（ありがとうページ）に遷移してしまいます。ユーザー体験（UX）を良くするため、`Fetch API` を使って**画面遷移せずにバックグラウンドで送信し、自サイトの完了メッセージを表示**させるようにします。

```javascript
// JavaScript
const reservationForm = document.getElementById('reservation-form');
const reservationComplete = document.getElementById('reservation-complete');

reservationForm.addEventListener('submit', async function(e) {
  // 1. デフォルトの画面遷移をキャンセル
  e.preventDefault();

  const form = e.target;
  const button = form.querySelector('.btn-submit');
  const originalBtnText = button.innerHTML;

  // 2. 送信ボタンを無効化し、ローディング表示に変更（二重送信防止）
  button.disabled = true;
  button.innerHTML = '送信中...';

  try {
    // 3. フォームのデータを取得
    const formData = new FormData(form);

    // 4. Formspreeへ非同期送信 (Fetch API)
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json' // JSON形式でレスポンスを受け取る指定
      }
    });

    if (response.ok) {
      // 5. 送信成功時：フォームを非表示にし、完了メッセージを表示
      form.style.display = 'none';
      reservationComplete.style.display = 'block';
    } else {
      // 送信サーバーエラー時の処理
      const data = await response.json();
      if (data.errors) {
        alert(data.errors.map(error => error.message).join(', '));
      } else {
        alert('送信に失敗しました。');
      }
    }
  } catch (error) {
    // ネットワークエラー等の処理
    alert('通信エラーが発生しました。インターネット接続をご確認ください。');
  } finally {
    // 6. ボタンの状態を元に戻す
    button.disabled = false;
    button.innerHTML = originalBtnText;
  }
});
```

### 【応用】 JavaScriptから隠しデータを動的にセットする

診断アプリなどの場合、ユーザーの操作に応じて「診断結果」が変わることがあります。フォーム送信前に、JavaScriptから `hidden` フィールドの値を書き換えることで、動的なデータをFormspreeに送ることができます。

```javascript
// 診断結果が出たタイミングで実行
function updateHiddenData(diagnosisResultName) {
  // 隠しフィールドに値をセット
  document.getElementById('hidden-diagnosis').value = diagnosisResultName;
}

// 例：結果が「紫陽花タイプ」になったらセット
updateHiddenData('紫陽花タイプ');
```

### ステップ4：Formspree側での必須操作（初回のみ）

コードを実装した後、**1回目だけは必ずFormspree側での有効化（アクティベーション）が必要**です。これを忘れるとメールは届きません。

1. **初回送信テストを行う**
   ブラウザでサイトを開き、実装したフォームからテストで1回データを送信します。
   （Ajax実装をしている場合でも、初回はFormspree側にデータが送られます）
2. **受信メールを確認して有効化する**
   Formspreeのダッシュボードで設定した「転送先メールアドレス」宛に、「**Action Required: Activate form...**」という件名のメールが届きます。
3. **Activate（有効化）ボタンをクリック**
   メール本文の有効化ボタンをクリックします。これでフォームの紐付けが完了し、2回目以降の送信が正常にメールで届くようになります。

> **💡 スパム対策（reCAPTCHA）について**
> Formspreeは標準でボット対策（reCAPTCHA）がかかっています。JavaScript(Fetch)で送信する際にうまくいかない場合は、Formspreeのダッシュボード「Settings」の「Spam prevention」設定を確認してみてください。

---

## まとめ

FormspreeとFetch APIを組み合わせることで、静的サイト（フロントエンドのみの構成）でも、ユーザー体験を損なわない本格的な問い合わせ・予約フォームを簡単に実装できます。

- バックエンドのサーバー構築不要
- HTMLの `name` 属性で項目名を自由に設定可能
- JavaScript（Ajax）を使えば画面遷移なしで完了画面を表示可能
- `<input type="hidden">` を活用すればアプリの内部データも一緒に送信可能

GitHub Pagesなどのホスティング環境でフォーム実装に悩んでいる方は、ぜひ試してみてください！
