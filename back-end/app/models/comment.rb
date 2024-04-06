class Comment < ApplicationRecord
  belongs_to :feature
  validates :body, presence: true

  # Validate that the comment is not longer than 255 characters
  validates :body, length: { maximum: 255 }

  # Validate that the comment is not shorter than 5 characters
  validates :body, length: { minimum: 5 }
end
