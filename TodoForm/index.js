//コメントはスラッシュを二つ書く

const form = document.getElementById('form');
//フォームの値を取得する（ここでidタグが役にたつ）

const input = document.getElementById('input');
//インプットの値を取得する

const ul = document.getElementById('ul');
//ulのタグの値を取得する

const todos = JSON.parse(localStorage.getItem('todos'));



//以下の関数（add）の繰り返し
if(todos){
    todos.forEach(todo =>{
        add(todo);
    })
}

//エンターキーを押す（submitする）時に行う内容
form.addEventListener('submit', function (event){
    event.preventDefault();  
    //デフォルトのイベント（今回は画面のリロード）を行わないようにする
   add();
   //addの関数は以下の通り
});

function add(todo){
    //inputタグ内でユーザーが書いた内容（value）を変数で定義する。
    let todoText = input.value; 

    if(todo){
       todoText = todo.text;
    }
    //条件分岐　書かれた内容が0文字以上なら実行される（暗黙の型変換）
    if(todoText){
     //定数li にDOM（ドキュメントのこと）で要素を作り出す。
    const li = document.createElement('li');
    //上記のcreatElementで定義されたliタグに含まれるテキスト範囲（innerText）を指定している。
    li.innerText = todoText
    //クラスリストの追加
    li.classList.add('list-group-item');
    //条件分岐　できたTODOリストを線で消す。
    if(todo && todo.completed){
        li.classList.add('text-decoration-line-through');
    }
    //contextmenu時に機能する内容
    li.addEventListener('contextmenu', function(event){
        event.preventDefault();
        li.remove();
        saveData();
    });
    //クリック時に機能する内容
    li.addEventListener('click', function(){
        li.classList.toggle('text-decoration-line-through');
        saveData();
    })
    ul.appendChild(li);
    //liタグを追加
    input.value = "";
    //中身を空にする
    saveData();
    //データを保存
    }
};

function saveData(){
    //liタグの全てのを選択する
    const lists = document.querySelectorAll('li');
    let todos = [];

    lists.forEach(list => {
        let todo = {
            text: list.innerText,
            completed: list.classList.contains('text-decoration-line-through')
        };
       todos.push(todo);
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}