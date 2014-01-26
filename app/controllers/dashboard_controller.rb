require 'base64'

class DashboardController < ApplicationController
  skip_before_filter :verify_authenticity_token
  before_filter :require_user
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
    data_url = params[:data]
    data_u = Base64.decode64(data_url)
    Image.create!(:data=>data_u)
  end

  def set_avatar_from_base64(base64_data)
    file_name = "avatar#{DateTime.now.strftime("%Y%m%d%H%M%S")}.png"
    image_path = Rails.root.join('public', file_name)
    File.open(image_path,"wb") do |file|
      file.write(Base64.decode64(base64_data))
    end
  end

  def view_images
    @images = Image.all
  end

end
