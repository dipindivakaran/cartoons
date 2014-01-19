class Movie < ActiveRecord::Base

  attr_accessible :name,:description, :rating,:director,:release_date,:image,:test_image
  has_attached_file :image, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
end
