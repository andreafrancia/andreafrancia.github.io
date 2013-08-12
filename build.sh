( 
cd _site
git init
git remote add origin git@github.com:andreafrancia/andreafrancia.github.io.git
git pull --set-upstream origin master
)

bundle exec jekyll build --safe

( 
cd _site
git add --all 
git commit -m "Imported generated _site"
git push --set-upstream origin master
)

