$(document).on('turbolinks:load', function() {

  function appendUser(users){
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${users.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${users.id} data-user-name=${users.name}>追加</div>
                </div>`
    return html;
    }

    
  function appendMember(name, id){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value=${id}>
                <p class='chat-group-user__name'>${name}</p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    return html;
    }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    
    $.ajax({
      type: 'GET',
      url: "/users",
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(users){
          var html = appendUser(users);
          $('#user-search-result').append(html)
        });
      }
      else {
        ("メンバーを入力してください");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });

  $("#user-search-result").on('click', '.user-search-add', function(){
    var user_name = $(this).data('user-name')
    var user_id = $(this).data('user-id')
    var html = appendMember(user_name, user_id);
    $("#chat-group-users").append(html)
      $(this).attr('user_id, user_name');
      $(this).parent().remove();
  })
  $("#chat-group-users").on('click', '.user-search-remove', function(){
    $(this).parent().remove();
  });
});