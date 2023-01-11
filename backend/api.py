from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import re
import inflect
from FilterRequest import FilterRequest

# APIs I might need:
# 1. search/filter API
# 2. get instruments API
# 3. get classical style API
app = Flask(__name__)
CORS(app)
engine = inflect.engine()

with open('data/unique_instruments.json', 'r') as infile:
    instruments = json.load(infile)

with open('data/unique_styles.json', 'r') as infile:
    periods = json.load(infile)

with open('data/aggregated_and_cleaned.json', 'r') as infile:
    pieces = json.load(infile)

@app.get('/instruments')
def get_instrument_options():
    return jsonify(data=instruments, message="Successfully retrieved instrument names.", success=True, )
    
@app.get('/periods')
def get_classical_period_options():
    return jsonify(success=True, message="Successfully retrieved classical periods.", data=periods)

@app.post('/pieces/filter')
def get_filtered_pieces():
    data = request.get_json()
    filter_request = FilterRequest(data["filters"])

    # sample_data = {"12 Cantatas, D-Dl Mus.1-I-7 (Various)": {"title": "12 Cantatas, D-Dl Mus.1-I-7", "composer": "Various", "imslp_link": "https://imslp.org/wiki/12_Cantatas,_D-Dl_Mus.1-I-7_(Various)", "style": "Baroque", "instrumentation": ["voice, continuo", "No.1: soprano, 2 violins, viola, viola da gamba, continuo", "No.9: voice, flute, continuo"]},
    # "12 Capriccios and Exercises, Op.15 (Lindley, Robert)": {"title": "12 Capriccios and Exercises, Op.15", "composer": "Lindley, Robert", "imslp_link": "https://imslp.org/wiki/12_Capriccios_and_Exercises,_Op.15_(Lindley,_Robert)", "style": "Classical", "instrumentation": ["cello", "violin"]}}
    # filtered = filter(lambda entry: filter_pieces(entry, filter_request), sample_data.values())

    filtered = filter(lambda entry: filter_pieces(entry, filter_request), pieces.values())

    result = []
    for f in filtered:
        result.append(f)
    return jsonify(data=result, success=True, message="Successfully retrieved filtered pieces")

def matches_instruments(requested, instrumentation):
    for r in requested:
        if not re.search(r'\b' + r + r'\b', instrumentation, re.IGNORECASE)\
            and not re.search(r'\b' + engine.plural(r) + r'\b', instrumentation, re.IGNORECASE):
            return False
    return True

def filter_pieces(entry, filter_request):
    belongs_to_period, contains_instruments = False, False
    period_filters, instr_filters = filter_request.periods, filter_request.instruments

    if "style" in entry:
        belongs_to_period = any(period in entry["style"].lower() for period in period_filters) if period_filters else True

    if not belongs_to_period:
        return False

    if "instrumentation" in entry and any((matches_instruments(instr_filters, instrumentation) for instrumentation in entry["instrumentation"])):
        contains_instruments = True
    
    return contains_instruments
            
if __name__ == "__main__":
    app.run(debug=True)