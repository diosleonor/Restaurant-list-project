<h1>我的餐廳清單</h1>

這是一個運用Node.js搭配Express框架及express-handlebars搭建的簡易式「我的餐廳清單」。

<h3>功能描述 (features)：</h3>
    <h4>使用者需登入才能查看自己收藏的餐廳清單</h4>
    <p><img src="https://github.com/diosleonor/Restaurant-list-project/blob/main/pics/A5-我的餐廳清單-首頁.png" alt="Index"/></p>
    <h4>使用者可以透過 Facebook Login 直接登入</h4>
    <h4>使用者可以註冊帳號，註冊的資料包括：名字、email、密碼、確認密碼。
    <p><img src="https://github.com/diosleonor/Restaurant-list-project/blob/main/pics/A5-我的餐廳清單-註冊.png" alt="Register"/></p>
    <h4>使用者也可以透過 Facebook Login 直接登入</h4>
    <h4>使用者登入後可以看到所有餐廳並可以對指定餐廳進行簡單的操作：</h4>
       <ul> 
        <li>餐廳照片</li>
        <li>餐廳名稱</li>
        <li>餐廳分類</li>
        <li>餐廳評分</li>
        <li>詳細內容</li>
        <li>編輯內容</li>
        <li>刪除餐廳</li>
       </ul>
       <p><img src="https://github.com/diosleonor/Restaurant-list-project/blob/main/pics/A5-我的餐廳清單-登入後頁面.png" alt="Login"/></p>
    <h4>使用者可以再點進去看餐廳的詳細資訊並修改：</h4>
       <ul> 
        <li>名稱</li>
        <li>英文名稱</li>
        <li>類別</li>
        <li>地址</li>
        <li>Google Map</li>
        <li>電話</li>
        <li>評分</li>
        <li>內容</li>
        <li>圖片</li>
       </ul>
       <p><img src="https://github.com/diosleonor/Restaurant-list-project/blob/main/pics/A5-我的餐廳清單-詳細.png" alt="Show"/></p>
    <h4>使用者可以新增一家餐廳：</h4>
       <p><img src="https://github.com/diosleonor/Restaurant-list-project/blob/main/pics/A5-我的餐廳清單-新增.png" alt="Show"/></p>
    <h4>使用者可以透過搜尋餐廳名稱來找到特定的餐廳</h4>
    <h4>使用者可以透過搜尋餐廳類別來找到特定的餐廳</h4>
    <p><img src="https://github.com/diosleonor/Restaurant-list-project/blob/main/pics/search.png" alt="A5-我的餐廳清單-搜尋"/></p>
    <h4>使用者可以登出保護隱私</h4>
    <p><img src="https://github.com/diosleonor/Restaurant-list-project/blob/main/pics/A5-我的餐廳清單-登出.png" alt="Logout"/></p>

<h3>環境建置與需求 (prerequisites)：</h3>
  Node.js<br> 
  Terminal
  
<h3>安裝與執行步驟 (installation and execution)：</h3>
  1. 打開終端機並複製此專案至本機
  <pre><code>git clone https://github.com/diosleonor/Restaurant-list-project.git</code></pre>
  
  2. 複製完成後進入專案資料夾
  <pre><code>cd Restaurant-list-project</code></pre>
  
  3. 安裝Node套件管理器(npm)
  <pre><code>npm install</code></pre>
  
  4. 用npm安裝種子資料
  <pre><code>npm run seed</code></pre>

  5. 用npm啟動伺服器
  <pre><code>npm run dev</code></pre>
  或是
  <pre><code>npm run start</code></pre>
  
  6. 開啟網頁瀏覽器並連結到此網址即可瀏覽本專案
   <pre><code>http://localhost:3000</code></pre>
<h3>開發工具及版本 (dev tools information)：</h3>
  Node.js v14.18.1<br> 
  Node Project Manager 8.1.0<br> 
  Express v4.17.1<br>
  express-handlebars v5.3.4<br> 
  body-parser v1.19.0<br>
  Bootstrap v4.3.1<br> 
  jquery v3.3.1<br> 
  popper v2.9.1<br> 
  font-awesome v5.8.1<br> 
  mongoose v6.0.12<br>


