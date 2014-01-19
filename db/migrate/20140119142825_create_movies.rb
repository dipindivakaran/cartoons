class CreateMovies < ActiveRecord::Migration
  def change
    create_table :movies do |t|
      t.string :name
      t.string :description
      t.integer :rating
      t.string :director
      t.date :release_date

      t.timestamps
    end
  end
end
