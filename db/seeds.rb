# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


Movie.create(:name=>"Kalimannu",:description=>"Malayalam Movie", :rating=>5,:director=>"Blessi",:release_date=>"12-12-2013",:test_image=>"http://www.metromatinee.com/movies/images/m3837/thumb/Kalimannu51448.jpg")
Movie.create(:name=>"Drusyam",:description=>"Malayam Movie", :rating=>3,:director=>"Jeethu Joseph",:release_date=>"12-02-2014",:test_image=>"http://4.bp.blogspot.com/-Da7xVF0bKUg/UrHbVduVqGI/AAAAAAAANBk/MGcqq95pv4Q/s163/Drishyam%2Bto%2Brelease%2Bon%2Btomorrow.jpg")
Movie.create(:name=>"Memories",:description=>"Malayalam Movie", :rating=>4,:director=>"Jeethu Joseph",:release_date=>"12-11-2013",:test_image=>"http://1.bp.blogspot.com/-9CKA75FjrLk/UgIkrV4FzDI/AAAAAAAACJQ/jisgzs80g5U/s163/Photo%2Bof%2BMia%2BGeorge%2Bhot%2Bin%2BMemories%2Bmalayalam%2Bmovie.jpg")
