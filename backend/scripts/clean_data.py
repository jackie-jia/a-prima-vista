import json
import nltk
from nltk.corpus import stopwords
import re
import inflect

offset = 0
limit = 1000

engine = inflect.engine()
unique_instruments = set()
unique_styles = set()
stopword = stopwords.words('english')

with open("../data/instruments.json", "r") as read_content:
    ref_instruments = json.load(read_content)['instruments']

def strip_punctuation_and_numbers(s):
    # excluded = r"""!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~0123456789"""
    excluded = r"""!"#$%&'()*+-.:;<=>?@[\]^_`{|}~0123456789"""
    return ''.join(c for c in s if c not in excluded)

def clean_piece_data(entry):
    if "instrumentation" in entry:
        # reformat instrumentation info into list of strings (each element is a single instrumentation for the piece)
        entry["instrumentation"] = entry["instrumentation"].replace("\n", ", ")\
                                                        .replace("\u00a0", "")\
                                                        .replace("; ", ";")\
                                                        .strip()\
                                                        .split(";")  # make lowercase?
    if "style" in entry:
        entry["style"] = entry["style"].replace("classica", "classical")\
                                                .replace("neobarock", "neo-baroque")\
                                                .replace("early_20th_century", "early 20th century")
        
def reformat_piece_data(entry):
    if "instrumentation" in entry:
        # clean instrumentation string for display
        entry["instrumentation"] = entry["instrumentation"].replace("\n", ", ")\
                                                        .replace("\u00a0", "")\
                                                        .strip()
    if "style" in entry:
        entry["style"] = entry["style"].replace("classica", "classical")\
                                                .replace("neobarock", "neo-baroque")\
                                                .replace("early_20th_century", "early 20th century")

def get_instrument_and_era_data(entry):
    if "instrumentation" in entry:
        for i in ref_instruments:
            if re.search(r'\b' + i + r'\b', entry["instrumentation"], re.IGNORECASE):
                # convert to singular; if already singular, returns False
                singular_form = engine.singular_noun(i)
                if not singular_form:
                    unique_instruments.add(i)
                else:
                    unique_instruments.add(singular_form)

    if "style" in entry:
        unique_styles.add(entry["style"].lower())

def extract_data():
    offset = 0
    limit = 1000

    while offset <= 215000:
        print("offset", offset)
        filename = "../data/data_" + str(offset) + ".json"
        with open(filename, "r") as read_content:
            data = json.load(read_content)

        for title in data:
            get_instrument_and_era_data(data[title])

        offset += limit
    
    with open('../data/unique_instruments.json', 'w') as outfile:
        outfile.write(json.dumps(list(unique_instruments)))

    with open('../data/unique_styles.json', 'w') as outfile:
        outfile.write(json.dumps(list(unique_styles)))

def clean_aggregated_piece_data():
    with open("../data/aggregated.json", "r") as infile:
        data = json.load(infile)

    count = 0
    for title in data:
        count += 1
        print("piece no", count)
        clean_piece_data(data[title])

    with open("../data/aggregated_and_cleaned.json", "w") as outfile:
        outfile.write(json.dumps(data))

def alphabetize():
    with open("../data/unique_instruments.json", "r") as infile:
        instr = json.load(infile)
        with open("../data/alpha_unique_instruments.json", "w") as outfile:
            outfile.write(json.dumps(sorted(instr)))
    
    with open("../data/unique_styles.json", "r") as infile:
        periods = json.load(infile)
        with open("../data/alpha_unique_styles.json", "w") as outfile:
            outfile.write(json.dumps(sorted(periods)))
    
extract_data()
clean_aggregated_piece_data()
alphabetize()