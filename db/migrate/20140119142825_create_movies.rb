class CreateMovies < ActiveRecord::Migration
  def change
    create_table :movies do |t|
      t.string :name
      t.string :description
      t.integer :rating
      t.string :director
      t.date :release_date
      t.string :test_image
      t.timestamps
    end
  end
end
