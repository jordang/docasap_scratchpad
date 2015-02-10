require 'haml'

desc "update assets"
task update: ["update:haml", "update:sass"]


namespace :update do

  task :haml do
    
    Haml::Options.defaults[:format] = :html5

    files = Dir.glob("**/*.haml")


    files.each do |filename|

      haml = File.open(filename){|file| Haml::Engine.new(file.read).render }

      new_filename = filename.split("/").last.split('.haml').first

      File.open(new_filename, "w+"){|filename| filename.write haml }

    end
  end


  task :sass do
    system("compass watch") # This will keep running until killed with ctrl-c
  end
end