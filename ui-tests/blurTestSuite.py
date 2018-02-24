##########################################
########### TEST UTILS ###################
##########################################

def loginToTestBlur(browser, urlToVisit):
	browser.visit(urlToVisit)

    # Find and click the 'search' button
	browser.find_by_id('username').fill("testUser@fake.com")
	browser.find_by_id('password').fill("welcome1")
	loginButton = browser.find_by_id('login-button')

    # Interact with elements
	loginButton.click()

##########################################
############### TESTS ####################
##########################################

def testBlurClicks(browser, urlToVisit):
	loginToTestBlur(browser, urlToVisit)
	imageContainer = browser.find_by_id('imageContainerLimit')

	for i in range(0,49):
		imageContainer.click()

	if browser.is_text_present('49%'):
		return "success"
	else:
		return "FAILED"