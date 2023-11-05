import pandas as pd
import requests
import json


def fetch_excel_data():
    df_tent = pd.read_excel('Företagsplacering 2023.xlsx', sheet_name='Tält')
    df_sc = pd.read_excel('Företagsplacering 2023.xlsx', sheet_name='Studie-c')
    df_kh = pd.read_excel('Företagsplacering 2023.xlsx', sheet_name='Kårhuset')
    df_eh = pd.read_excel('Företagsplacering 2023.xlsx', sheet_name='E-huset')

    c_tent = df_tent["name"].tolist()
    c_sc = df_sc["name"].tolist()
    c_kh = df_kh["name"].tolist()
    c_eh = df_eh["name"].tolist()
    loc = {
        "Tält": c_tent,
        "Studie-c": c_sc,
        "Kårhuset": c_kh,
        "E-huset": c_eh
    }
    return loc


def fetch_companies():
    r = requests.get("https://www.nexpo.arkadtlth.se/api/companies").json()
    c = [[c["id"], c["name"]] for c in r]
    return c


def get_company_locations(c, loc):
    c_loc = {}
    for x in c:
        id, name = x[0], x[1]
        for k in loc:
            if name in loc[k]:
                c_loc[id] = k
        if id not in c_loc:
            c_loc[id] = name
    return c_loc


def write_data_to_json(c_loc):
    json_object = json.dumps(c_loc, indent=4)

    with open("companyLocations.json", "w") as outfile:
        outfile.write(json_object)


def convert_to_numbers(c_loc):
    for k in c_loc:
        if c_loc[k] == "Tält":
            c_loc[k] = 3
        elif c_loc[k] == "Studie-c":
            c_loc[k] = 0
        elif c_loc[k] == "Kårhuset":
            c_loc[k] = 2
        elif c_loc[k] == "E-huset":
            c_loc[k] = 1
        else:
            c_loc[k] = 200000000000000
    return c_loc


def write_numbers_to_file(c_loc):
    with open('companyLocationsNumbers.txt', "w") as file:
        for key, value in c_loc.items():
            file.write(f"{key}: {value}\n")


def main():
    c = fetch_companies()
    loc = fetch_excel_data()
    c_loc = get_company_locations(c, loc)
    write_data_to_json(c_loc)
    convert_to_numbers(c_loc)
    write_numbers_to_file(c_loc)


if __name__ == "__main__":
    main()
