require 'fileutils'  
  
  
# from http://iainjmitchell.com/blog/?p=1014

@source = "./app"  
@target = "./../Hard_Drives_TMC_App_API/public/app"  
@includePattern = "/**/*"  
  
task :default => [:copy_directory]  

desc "Will copy this app to the API public folder, ready for serving with Sinatra"
task :copy_directory do        
    FileUtils.rm_rf(@target)  #remove target directory (if exists)  
    FileUtils.mkdir_p(@target) #create the target directory  
    files = FileList.new().include("#{@source}#{@includePattern}");   
    files.each do |file|          
        #create target location file string (replace source with target in path)  
        targetLocation = file.sub(@source, @target)       
        #ensure directory exists  
        FileUtils.mkdir_p(File.dirname(targetLocation));  
        #copy the file  
        FileUtils.cp_r(file, targetLocation) 
    end   
    puts "Successfully copied to #{@target}"
end