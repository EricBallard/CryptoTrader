from selenium.webdriver.chrome.options import Options
from selenium import webdriver
import time

runBrowser = False
dogeToUSD = -1

def getDogePrice():
    return dogeToUSD

def runBrowser(run):
    runBrowser = run

def stopScraping():
    runBrowser = False

def startScraping():
    runBrowser = True
    print('Browser | Starting...')

    try:
        options = Options()
        options.add_argument('--headless')
        driver = webdriver.Chrome(options=options)

        driver.get('http://robinhood.com/crypto/DOGE')

        # Throws AssertionError
        assert 'DOGE' in driver.title

        while runBrowser:
            # Parse and final validation
            usdValue = None

            try:
                usdValue = float(getPriceString(driver))
            except ValueError as error:
                print(
                    f'FAILED to get price - Failed to parse as int [{str(error).upper()}]')
                fails += 1
                continue

            dogeToUSD = usdValue
            print('Price: ' + str(dogeToUSD))

            fails = 0
            time.sleep(1)
    except Exception as error:
        print(
            f'FAILED to init selenium [{str(error).upper()}]')
        fails += 1
    finally:
        print('Browser | Stopping...')
        driver.close()

def getPriceString(driver):
    # Find main container
    query = driver.find_elements_by_class_name('QzVHcLdwl2CEuEMpTUFaj')

    # Validate query
    try:
        container = query[0]
    except Exception as error:
        print(
            f'FAILED to get price - Class Name Changed? [{str(error).upper()}]')
        return None

    # Retrieve container children (price text)
    children = container.find_elements_by_tag_name('span')

    # Re-validate
    size = len(children)
    if children == None or size != 9:
        print(
            f'FAILED to get price - Chilren length == {size} [{str(error).upper()}]')
        return None

    # Build
    price = ''
    for c in children:
        text = str(c.get_attribute('innerText'))

        if text == '$':
            continue
        price = price + text

    return price
