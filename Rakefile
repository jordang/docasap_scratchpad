require 'haml'

desc "update assets"
task :update do
  Update.sass
  Update.haml
end



class Update

  def self.haml
    Haml::Options.defaults[:format] = :html5

    files = Dir.glob("**/*.haml")

    files.each do |file|
      haml = Haml::Engine.new(File.open(file).read).render

      new_filename = file.split("/").last.split('.haml').first
      File.open(new_filename, "w+").write haml
    end
  end


  def self.sass
    system("sass --watch scss:css")
  end
end