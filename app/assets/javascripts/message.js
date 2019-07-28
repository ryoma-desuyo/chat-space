$(document).on('turbolinks:load', function() {


  function buildHTML(message){
    var image = (message.image.url) ? `<img class= "lower-message__image" src=${message.image.url} >` : "";
    var html = `
                        <div class="message" data-message-id=${message.id}>
                        <div class="upper-message">
                        <div class="upper-message__user-name">
                        ${message.user_name}
                        </div>
                        <div class="upper-message__date">
                        ${message.date}
                        </div>
                        </div>
                        <div class="lower-message">
                        <p class="lower-message__content">
                        ${message.content}
                        </p>
                        ${image}
                        </div>
                        </div>
                `
    return html;
  }

  

  $('#new_message').on('submit', function(e){
    e.preventDefault(e);
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
  
      var html = buildHTML(message);
      $('.messages').append(html)
      $('form')[0].reset();
      $('div.messages').animate({scrollTop: 300000});
    })
    .fail(function(){
      alert('メッセージを入力してください');
    })
  });


  var reloadMessages = function() {;
    console.log(window.location.pathname.match(/\/groups\/\d+\/messages/));
    if (window.location.pathname.match(/\/groups\/\d+\/messages/)){
    last_message_id = $('.message:last').data('message-id');
    var currentGroupId = $('#currentGroupID').data('group-id')
    $.ajax({
      url: `/groups/${currentGroupId}/api/messages`,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })

    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function (message) {
        insertHTML = buildHTML(message); 
      $('.messages').append(insertHTML);
      })
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })

    .fail(function() {
      alert('自動更新に失敗しました');
    })
    };
  };
  setInterval(reloadMessages, 5000);
});