json.(@message, :content, :image)
json.content @message.content
json.user_id  @message.user.id
json.user_name  @message.user.name
json.date @message.created_at.strftime("%Y/%m/%d(%a) %H:%M:%S")
json.img @message.image
json.id @message.id