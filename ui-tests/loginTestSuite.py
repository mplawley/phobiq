def logInWithValidCredentialsTest(browser, urlToVisit):
	browser.visit(urlToVisit)

    # Find and click the 'search' button
	browser.find_by_id('username').fill("testUser@fake.com")
	browser.find_by_id('password').fill("welcome1")
	loginButton = browser.find_by_id('login-button')

    # Interact with elements
	loginButton.click()

	if browser.is_text_present('Welcome'):
		return "success"
	else:
		return "FAILED"

def logInWithValidPasswordTest(browser, urlToVisit):
	browser.visit(urlToVisit)

    # Find and click the 'search' button
	browser.find_by_id('username').fill("testUser@fake.com")
	browser.find_by_id('password').fill("incorrectPassword")
	loginButton = browser.find_by_id('login-button')

    # Interact with elements
	loginButton.click()

	if browser.is_text_present('The password you entered was not valid'):
		return "success"
	else:
		return "FAILED"

def logInWithValidUserNameTest(browser, urlToVisit):
	browser.visit(urlToVisit)

    # Find and click the 'search' button
	browser.find_by_id('username').fill("incorrectUserName@fake.com")
	browser.find_by_id('password').fill("welcome1")
	loginButton = browser.find_by_id('login-button')

    # Interact with elements
	loginButton.click()

	if browser.is_text_present('No account found with that username'):
		return "success"
	else:
		return "FAILED"

def goToRegistrationPage(browser, urlToVisit):
	browser.visit(urlToVisit)

    # Find and click the 'search' button
	browser.find_by_id('registerLink').click()

	if browser.is_text_present('Sign Up to use Phobiq'):
		return "success"
	else:
		return "FAILED"