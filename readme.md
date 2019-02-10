Navigate to the root of your project and run npm init -y — this will initialize a package.json file for your project. The package.json file is required for installing third party npm packages and saving their version numbers. If you fail to initialize a package.json file, it will be troublesome, and at times almost impossible for anyone else to run your code after cloning your project.

Make a .gitignore file and add the following lines to it. This will tell git not to track these files, and thus they won't be committed to Github.

node_modules
.DS_Store
.env

Output of concert-this, movie-this, spofiy-this, and do-what-it-says
![results](https://user-images.githubusercontent.com/44451738/52539974-5057a480-2d52-11e9-936f-9da3cb3014b2.JPG)