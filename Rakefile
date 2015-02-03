require 'haml'

desc "update assets"
task update: ["update:haml", "update:sass"]


namespace :update do

  task :haml do
    Haml::Options.defaults[:format] = :html5

    files = Dir.glob("**/*.haml")

    files.each do |file|
      haml = Haml::Engine.new(File.open(file).read).render

      new_filename = file.split("/").last.split('.haml').first
      File.open(new_filename, "w+").write haml
    end
  end


  task :sass do
    puts "'sass --watch scss:css' will watch and change files automatically"
  end
end