from splinter import Browser
from loginTestSuite import *
from blurTestSuite import *

##########################################
############## SETUP #####################
##########################################

urlToVisit = "localhost:8888"
testDictionary = {"login with valid credentials" : "", 
				  "login with invalid password" : "",
				  "login with invalid username" : "",
				  "go to registration page": ""}

##########################################
############## TESTS #####################
##########################################
with Browser('chrome') as browser:
    # testDictionary["login with valid credentials"] = logInWithValidCredentialsTest(browser, urlToVisit)
    # testDictionary["login with invalid password"] = logInWithValidPasswordTest(browser, urlToVisit)
    # testDictionary["login with invalid username"] = logInWithValidUserNameTest(browser, urlToVisit)
    # testDictionary["go to registration page"] = goToRegistrationPage(browser, urlToVisit)
    testDictionary["test blur clicks"] = testBlurClicks(browser, urlToVisit)

##########################################
############## FINISH ####################
##########################################
for key, value in testDictionary.items():
    print (key, value)

