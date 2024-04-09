class Comment < ApplicationRecord
  belongs_to :feature
  validates :body, presence: true

  validates :body, length: { maximum: 255 }

  validates :body, length: { minimum: 5 }
end
