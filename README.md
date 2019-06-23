# README

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|name|varchar|null: false|

### Association
- has_many :members
- has_many :user

## membersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## userテーブル
|Column|Type|Options|
|------|----|-------|
|name|varchar|null: false|
|email|staring|null: false|
|password|string|null :false|
|group_id|integer|null: false|

### Association
- has_many :members
- has_many :group
- has_many :text


## textテーブル
|Column|Type|Options|
|------|----|-------|
|text|text| |
|image|image| |
|created_at|datetime|null: false|
|group_id|integer|null: false|
|user_id|integer|null: false|

### Association
- belongs_to :user