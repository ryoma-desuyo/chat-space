$(function(){


  function buildHTML(message){
    var img = message.img.url == null ? " " :` <img class='lower-message__image' src=${message.img.url}></img>`
    var html = `<div>
                        <div class="message">
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
                        ${img}
                        </div>
                        </div>
                </div>`
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
      console.log(message);
      var html = buildHTML(message);
      $('.messages').append(html)
      $('form')[0].reset();
      $('div.messages').animate({scrollTop: 300000});
    })
    .fail(function(){
      alert('メッセージを入力してください');
    })
  })
});