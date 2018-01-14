![alt tag](https://github.com/mplawley/phobiq/blob/master/images/Login.jpg)


# phobiq
Is intended to help people with their phobias. The web app allows the user to progressively unapply a Gaussian blur from an image by clicking on it or moving a slider. The app also displays the user's progress towards looking at a frightening image fully unblurred. 

The code base also demonstrates unit-testable JavaScript using the Jasmine framework.

# Purpose
The client wanted to help patients with exposures to frightening images through a progressive unblurring of those images. The client also wanted to learn more about test-driven-development, relational databases (e.g. MySQL), and unit testing with JavaScript/Jasmine/Jquery-Jasmine, so part of the code base was used for that purpose (e.g. red-light, green-light development). Some of the pedagogical aspects of this was done in tandem with a private repo, phobiq2.

![alt tag](https://github.com/mplawley/phobiq/blob/master/images/welcome.jpg)

# Testing - WARNING: UNIT TESTS WILL FAIL IN CHROME UNLESS...
Because Chrome does not allow file access to other local files, either run the SpecRunner.html tests in another browser (e.g. FireFox) or with a command-line switch to allow Chrome such access. Otherwise, HTML fixtures will not load in Chrome.

# Future
* Allow the user to drag and drop their own images onto the page
* Allow the user to select URLs to images to embed onto the page
* Use the database to store filepaths to images stored in a file system on the server.
