class Api::MessagesController < ApplicationController
  def index
    @group = Group.find(params[:group_id])
    respond_to do |format|
      format.html
      format.json { @messages = Message.where("(group_id = ?) AND (id > ?)", params[:group_id], params[:id]) }
    end

  end
end