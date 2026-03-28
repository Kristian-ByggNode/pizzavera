import requests
from bs4 import BeautifulSoup
import json
import re

def scrape_pizzavera():
    url = "https://pizzavera.no/meny-vaare-avdelinger/sandefjord/"
    
    print(f"Henter data fra {url}...")
    response = requests.get(url)
    response.encoding = 'utf-8'
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Initialiserer data-struktur
    data = {
        "restaurant": {
            "name": "Pizzavera Sandefjord",
            "phone": "",
            "address": "",
            "opening_hours": {},
            "delivery_info": "",
            "last_order": ""
        },
        "menu": {
            "categories": []
        },
        "allergens": []
    }
    
    # Finn kontaktinformasjon
    phone_elem = soup.find(string=re.compile(r'33\s*45\s*22\s*25'))
    if phone_elem:
        data["restaurant"]["phone"] = "33 45 22 25"
    
    # Finn adresse
    address_link = soup.find('a', href=re.compile(r'google.*maps'))
    if address_link:
        address_text = address_link.get_text(strip=True)
        if address_text:
            data["restaurant"]["address"] = address_text
        else:
            data["restaurant"]["address"] = "Vesterøyveien 25, 3222 Sandefjord"
    
    # Finn åpningstider
    hours_section = soup.find(string=re.compile(r'ÅPNINGSTIDER'))
    if hours_section:
        parent = hours_section.find_parent()
        if parent:
            hours_text = parent.get_text(strip=False)
            # Parse åpningstider
            if 'Mandag' in hours_text:
                weekday_match = re.search(r'Mandag\s*[–-]\s*lørdag:\s*([\d:.]+)\s*[–-]\s*([\d:.]+)', hours_text)
                sunday_match = re.search(r'Søndag.*?:\s*([\d:.]+)\s*[–-]\s*([\d:.]+)', hours_text)
                
                if weekday_match:
                    data["restaurant"]["opening_hours"]["weekdays"] = f"{weekday_match.group(1)} - {weekday_match.group(2)}"
                if sunday_match:
                    data["restaurant"]["opening_hours"]["sunday"] = f"{sunday_match.group(1)} - {sunday_match.group(2)}"
    
    # Finn utkjøringsinformasjon
    delivery_section = soup.find(string=re.compile(r'UTKJØRING'))
    if delivery_section:
        parent = delivery_section.find_parent()
        next_p = parent.find_next('p') if parent else None
        if next_p:
            data["restaurant"]["delivery_info"] = next_p.get_text(strip=True)
    
    # Finn siste frist info
    deadline_section = soup.find(string=re.compile(r'SISTE FRIST'))
    if deadline_section:
        parent = deadline_section.find_parent()
        next_p = parent.find_next('p') if parent else None
        if next_p:
            data["restaurant"]["last_order"] = next_p.get_text(strip=True)
    
    # Hent allergener-tabellen
    allergen_table = soup.find('table')
    if allergen_table:
        headers = []
        header_row = allergen_table.find('tr')
        if header_row:
            headers = [th.get_text(strip=True) for th in header_row.find_all(['th', 'td'])]
        
        rows = allergen_table.find_all('tr')[1:]  # Skip header row
        for row in rows:
            cells = row.find_all(['td', 'th'])
            if cells:
                allergen_row = {
                    "dish": cells[0].get_text(strip=True),
                    "allergens": {}
                }
                for i, cell in enumerate(cells[1:], 1):
                    if i < len(headers):
                        allergen_row["allergens"][headers[i]] = cell.get_text(strip=True)
                
                data["allergens"].append(allergen_row)
    
    # Finn meny-seksjoner (dette vil kreve mer spesifikk parsing basert på nøyaktig HTML-struktur)
    # Vi får de generelle seksjonene
    menu_sections = soup.find_all(['h2', 'h3', 'h4'])
    current_category = None
    
    for section in menu_sections:
        section_text = section.get_text(strip=True)
        
        # Ignorer ikke-meny seksjoner
        if any(skip in section_text for skip in ['SANDEFJORD', 'ÅPNINGSTIDER', 'TELEFON', 'ALLERGENER', 'UTKJØRING', 'SISTE FRIST']):
            continue
        
        # Dette er potensielt en meny-kategori
        if section_text and len(section_text) > 0:
            # Finn neste siblings for å få meny-items
            next_elem = section.find_next_sibling()
            items = []
            
            while next_elem and next_elem.name not in ['h2', 'h3', 'h4']:
                if next_elem.name == 'p' or next_elem.name == 'div':
                    item_text = next_elem.get_text(strip=True)
                    if item_text:
                        items.append(item_text)
                next_elem = next_elem.find_next_sibling()
            
            if items:
                data["menu"]["categories"].append({
                    "name": section_text,
                    "items": items
                })
    
    print(f"\nFunnet informasjon:")
    print(f"- Telefon: {data['restaurant']['phone']}")
    print(f"- Adresse: {data['restaurant']['address']}")
    print(f"- Åpningstider: {data['restaurant']['opening_hours']}")
    print(f"- Antall allergener-rader: {len(data['allergens'])}")
    print(f"- Antall meny-kategorier: {len(data['menu']['categories'])}")
    
    return data

if __name__ == "__main__":
    data = scrape_pizzavera()
    
    # Lagre til JSON fil
    with open('pizzavera_data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"\nData lagret til pizzavera_data.json")
