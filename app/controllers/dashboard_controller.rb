class DashboardController < ApplicationController
  skip_before_filter :verify_authenticity_token  
  def index
   
  end
  
  
  def cartoons
    files = []
    Dir.entries("#{Rails.root}/app/assets/images/cartoons").each do |file|
      files << "assets/cartoons/#{file}"
    end
   render json: files
  end
  
   def upload
    data_url = params[:image]
    png      = Base64.decode64(params[:image])
File.open(File.join("public", 'file.png'), 'w') { |f| f.write(png) }
    
    
  end
  
  
end
