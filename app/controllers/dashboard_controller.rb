class DashboardController < ApplicationController
  
  def index
   
  end
  
  
  def cartoons
    files = []
    Dir.entries("#{Rails.root}/app/assets/images/cartoons").each do |file|
      files << "assets/cartoons/#{file}"
    end
   render json: files
  end
  
  
end
