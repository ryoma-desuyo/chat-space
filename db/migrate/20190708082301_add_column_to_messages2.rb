class AddColumnToMessages2 < ActiveRecord::Migration[5.0]
  def change
    add_column :messages, :group_id, :string
  end
end
