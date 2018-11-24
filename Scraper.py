import urllib.request
from bs4 import BeautifulSoup
import re
from string import ascii_uppercase
from mysql.connector import Error, errorcode
import mysql


def scrape(url, frontTrim, backTrim, splitMethod, seperator):

    request = urllib.request.Request(url)
    html = urllib.request.urlopen(request).read()
    soup = BeautifulSoup(html, 'html.parser')

    main_table = soup.find('div',attrs={'class': 'mw-parser-output'})

    items = main_table.find_all(seperator)

    items = str(items)
    items = BeautifulSoup(items, 'lxml').text
    items = items.split(',')

    del items[:frontTrim]
    del items[-backTrim:]

    for pair in items:
        items[items.index(pair)] = pair.strip()

    for pair in items:
        items[items.index(pair)] = pair.split(splitMethod)

    return(items)



def scrapeMedical(url, frontTrim, backTrim):
    '''Function specific to scraping the 24 pages medical terminology pages on wikipedia'''

    request = urllib.request.Request(url)
    html = urllib.request.urlopen(request).read()
    soup = BeautifulSoup(html, 'html.parser')

    'Scrapes webpage within a specific class'
    main_table = soup.find('div',attrs={'class': 'mw-parser-output'})
    items = main_table.find_all('tr')


    items = str(items)
    items = items.replace('\n',' ')
    items = BeautifulSoup(items, 'lxml').text
    items = items.split(' ,  ')

    #get rid of useless html at beginning and end of page
    del items[:frontTrim]
    del items[-backTrim:]

    #breaks string into list, so that the first item (the acromyn) can be seperated
    for definition in items:
        items[items.index(definition)] = definition.split(' ')

    #combines everything but the acromyn into a string
    for definition in items:
        items[items.index(definition)][1:len(definition)] = [' '.join(items[items.index(definition)][1:len(definition)])]

    return items

def sql(database):

    cnx = mysql.connector.connect(host='35.192.48.135',
                                database='test',
                                user='root',
                                password='YfYjx7SKMdXVHtdd'
                                    )

    sql = "SELECT * FROM Acr"

    cursor = cnx.cursor(buffered=True)

    cursor.execute(sql)
    results = cursor.fetchall()

    add_definitions = ("INSERT INTO Acr "
                "VALUES (%s, %s);")

    for x in database:
        try:
            if database[database.index(x)] not in results:
                data = [database[database.index(x)][0], database[database.index(x)][1]]
                cursor.execute(add_definitions, data)
                print(database[database.index(x)])
        except:
            pass

    print(results)
    cnx.commit()
    cursor.close()
    cnx.close()

def main():
    techData = scrape('https://en.wikipedia.org/wiki/List_of_computing_and_IT_abbreviations', 5, 14, '—', 'li') #tech
    armyData = scrape('https://en.wikipedia.org/wiki/Glossary_of_military_abbreviations', 26, 43, ' – ', 'li') #army
    slangData = scrape('https://en.wiktionary.org/wiki/Appendix:English_internet_slang',3, 4, ':', 'li') #slang
    businessData = scrape('https://en.wikipedia.org/wiki/List_of_business_and_finance_abbreviations', 10, 10, ' – ', 'li') #business

    #need to seperate multiple matches
    medicalData = []
    for x in ascii_uppercase:
        medicalData += scrapeMedical(f'https://en.wikipedia.org/wiki/List_of_medical_abbreviations:_{x}', 3, 3)

    database = medicalData + armyData + businessData + slangData + techData

    print(database)

    #sql(database)

main()