class Feature < ApplicationRecord
        has_many :comments, dependent: :destroy

        
      # values of `title`, `url`, `place`, `magType` and coordinates dont be able to be null, in other case not persist. 
        validates :title, :place, :mag_type, :longitude, :latitude, presence: true

        # Validate ranges for magnitude [-1.0, 10.0], latitude [-90.0, 90.0] and longitude: [-180.0, 180.0]
        validates :magnitude, numericality: { greater_than_or_equal_to: -1.0, less_than_or_equal_to: 10.0 }
        validates :latitude, numericality: { greater_than_or_equal_to: -90.0, less_than_or_equal_to: 90.0 }
        validates :longitude, numericality: { greater_than_or_equal_to: -180.0, less_than_or_equal_to: 180.0 }

         # exteranl id value must be unique
        validates :external_id, uniqueness: true

end
