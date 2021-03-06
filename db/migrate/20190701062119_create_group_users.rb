class CreateGroupUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :group_users do |t|
      t.references :group, foreign_key: true
      t.references :user, foreign_key: true
      t.timestamps
    end

    add_reference :messages,:group,foreign_key: true
    add_reference :messages,:user,foreign_key: true
  end
end