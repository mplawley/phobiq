from splinter import Browser
from loginTestSuite import *
from blurTestSuite import *
import colorama
from colorama import Fore, Style

##########################################
############## SETUP #####################
##########################################

urlToVisit = "localhost:8888"
testDictionary = {"login with valid credentials" : "", 
				  "login with invalid password" : "",
				  "login with invalid username" : "",
				  "go to registration page": "",
				  "test multiple blur clicks" : "",
				  "test more than maximum number of clicks" : ""}

##########################################
############## TESTS #####################
##########################################
with Browser('chrome') as browser:
    testDictionary["login with valid credentials"] = logInWithValidCredentialsTest(browser, urlToVisit)
    testDictionary["login with invalid password"] = logInWithValidPasswordTest(browser, urlToVisit)
    testDictionary["login with invalid username"] = logInWithValidUserNameTest(browser, urlToVisit)
    testDictionary["go to registration page"] = goToRegistrationPage(browser, urlToVisit)
    testDictionary["test multiple blur clicks"] = testMultipleBlurClicks(browser, urlToVisit)
    testDictionary["test more than maximum number of clicks"] = testMoreThanMaximumNumberOfClicks(browser, urlToVisit)

##########################################
############## FINISH ####################
##########################################
for key, value in testDictionary.items():
    if value == "success":
        print(Fore.BLACK + key, Fore.GREEN + value)
    else:
        print (Fore.BLACK + key, Fore.RED + value)

    print(Style.RESET_ALL)