from app.utils.auth_utils import hash_password


DEMO_USERS = [
    {"id": "admin-demo", "name": "Admin User", "email": "admin@example.com", "password": hash_password("password123"), "role": "admin"},
    {"id": "user-demo", "name": "Demo User", "email": "user@example.com", "password": hash_password("password123"), "role": "user"},
]


def price(cmin, cmax, ward, room, icu, mri, ct, blood):
    return {
        "consultation_min": cmin, "consultation_max": cmax,
        "general_ward_min": ward[0], "general_ward_max": ward[1],
        "private_room_min": room[0], "private_room_max": room[1],
        "icu_min": icu[0], "icu_max": icu[1],
        "mri_min": mri[0], "mri_max": mri[1],
        "ct_scan_min": ct[0], "ct_scan_max": ct[1],
        "blood_test_min": blood[0], "blood_test_max": blood[1],
    }


HOSPITALS = [
    ("MetroCare Super Speciality Hospital", "Saket", 28.5276, 77.2190, "Multi-specialty hospital with emergency, ICU and diagnostics coverage.", ["Cardiology","Neurology","Orthopedics","General Medicine"], ["ICU","Emergency","Ambulance","Pharmacy","Blood Bank","Parking"], ["MRI","CT Scan","Lab Tests"], True, True, price(700,1300,(2400,4200),(5200,9800),(9000,19000),(5200,9200),(2800,6500),(350,1800))),
    ("Janak Community Hospital", "Janakpuri", 28.6219, 77.0878, "Budget-focused neighbourhood hospital for common procedures and family care.", ["General Medicine","Pediatrics","Gynecology"], ["Emergency","Pharmacy","Parking","General Ward"], ["Lab Tests","Ultrasound"], True, True, price(350,800,(1200,2600),(3200,5800),(6500,12000),(0,0),(2200,5000),(250,1200))),
    ("Artemis Demo Health Centre", "Gurugram", 28.4595, 77.0266, "Large private hospital profile used with estimated demo data for comparison.", ["Oncology","Cardiology","Neurology","Orthopedics"], ["ICU","Emergency","Ambulance","Pharmacy","Blood Bank","Parking"], ["MRI","CT Scan","PET CT","Lab Tests"], True, True, price(900,1600,(2800,5200),(6500,12000),(11000,22000),(6500,11000),(3500,8000),(500,2200))),
    ("Noida Prime Hospital", "Noida", 28.5355, 77.3910, "Practical multi-specialty option for Noida residents with common diagnostics.", ["General Medicine","Orthopedics","Dermatology","Pediatrics"], ["ICU","Emergency","Pharmacy","Parking"], ["MRI","CT Scan","Lab Tests"], True, True, price(550,1000,(1800,3600),(4200,7800),(8200,16000),(4700,8500),(2600,6200),(300,1600))),
    ("Dwarka Women & Child Care", "Dwarka", 28.5921, 77.0460, "Focused maternity, gynecology and pediatric hospital with neonatal support.", ["Gynecology","Pediatrics","General Medicine"], ["Emergency","Ambulance","NICU","Pharmacy","Parking"], ["Ultrasound","Lab Tests"], True, True, price(500,950,(1700,3300),(4500,8200),(7000,14000),(0,0),(2300,5200),(280,1400))),
    ("Rohini Ortho & Trauma Centre", "Rohini", 28.7383, 77.0822, "Orthopedic and trauma-oriented hospital with emergency and imaging support.", ["Orthopedics","General Medicine"], ["Emergency","Ambulance","ICU","Pharmacy"], ["MRI","CT Scan","X-Ray","Lab Tests"], True, False, price(600,1100,(1900,3500),(4200,8000),(8500,17000),(5000,8800),(2700,6200),(300,1500))),
    ("South Delhi Heart Institute", "Okhla", 28.5483, 77.2513, "Cardiac-focused hospital with cath lab-style service coverage in demo data.", ["Cardiology","General Medicine"], ["ICU","Emergency","Ambulance","Pharmacy","Blood Bank"], ["CT Scan","Echo","Lab Tests"], True, True, price(800,1500,(2600,4800),(6000,10500),(10000,21000),(0,0),(3000,7200),(450,2000))),
    ("Eastside Diagnostic Hospital", "Preet Vihar", 28.6415, 77.2953, "Diagnostics-heavy hospital for consultations, imaging and planned care.", ["General Medicine","Dermatology","Neurology"], ["Pharmacy","Parking","Day Care"], ["MRI","CT Scan","Lab Tests","Ultrasound"], False, True, price(450,900,(1500,3200),(3800,7000),(0,0),(4300,7800),(2400,5600),(220,1300))),
    ("Ghaziabad City Hospital", "Ghaziabad", 28.6692, 77.4538, "General hospital with emergency access and lower estimated room prices.", ["General Medicine","Pediatrics","Orthopedics"], ["Emergency","Ambulance","Pharmacy","General Ward"], ["CT Scan","Lab Tests"], True, False, price(300,750,(1000,2300),(2800,5200),(6200,11500),(0,0),(2200,5200),(200,1100))),
    ("Faridabad Family Hospital", "Faridabad", 28.4089, 77.3178, "Family-care hospital covering medicine, pediatrics and gynecology.", ["General Medicine","Pediatrics","Gynecology"], ["Emergency","Pharmacy","Parking"], ["Lab Tests","Ultrasound"], True, True, price(350,850,(1300,2800),(3300,6200),(6500,13000),(0,0),(2100,5000),(250,1200))),
    ("Green Park Eye & Day Surgery", "Green Park", 28.5582, 77.2069, "Specialty eye and day-surgery centre with limited inpatient coverage.", ["Ophthalmology","Dermatology"], ["Pharmacy","Day Care","Parking"], ["Lab Tests"], False, False, price(500,900,(0,0),(0,0),(0,0),(0,0),(0,0),(250,1000))),
    ("Lajpat Nagar Multi Care", "Lajpat Nagar", 28.5677, 77.2433, "Compact multi-care hospital for planned consultations and short admissions.", ["General Medicine","Gynecology","Dermatology"], ["Emergency","Pharmacy","Parking"], ["Lab Tests","Ultrasound"], True, True, price(450,950,(1600,3200),(3800,7200),(7000,14500),(0,0),(2400,5600),(250,1300))),
    ("Vasant Kunj Neuro Care", "Vasant Kunj", 28.5200, 77.1587, "Neurology-oriented care centre with advanced imaging availability.", ["Neurology","General Medicine"], ["ICU","Emergency","Ambulance","Pharmacy"], ["MRI","CT Scan","Lab Tests"], True, True, price(850,1500,(2500,4600),(5800,10500),(9500,20000),(5600,9800),(3000,7200),(450,2000))),
    ("Pitampura Care Hospital", "Pitampura", 28.6990, 77.1384, "General care hospital with moderate prices and insurance support.", ["General Medicine","Orthopedics","Pediatrics"], ["Emergency","Pharmacy","Blood Bank","Parking"], ["CT Scan","Lab Tests"], True, True, price(500,950,(1600,3100),(3900,7200),(7800,15000),(0,0),(2500,5900),(300,1400))),
    ("Cyber City Medical Centre", "Gurugram", 28.4949, 77.0895, "Urban private hospital near office districts with strong diagnostics access.", ["General Medicine","Cardiology","Dermatology"], ["Emergency","ICU","Pharmacy","Parking"], ["MRI","CT Scan","Lab Tests"], True, True, price(750,1400,(2400,4500),(5600,10400),(9200,19000),(5200,9400),(2900,6900),(400,1900))),
    ("Greater Noida Lifeline", "Greater Noida", 28.4744, 77.5040, "Regional hospital with emergency, ambulance and affordable ward options.", ["General Medicine","Orthopedics","Pediatrics"], ["Emergency","Ambulance","ICU","Pharmacy"], ["CT Scan","Lab Tests"], True, False, price(350,800,(1200,2600),(3000,5600),(6800,13500),(0,0),(2300,5400),(250,1200))),
    ("Karol Bagh Medical House", "Karol Bagh", 28.6517, 77.1907, "Central Delhi hospital profile for common specialties and planned care.", ["General Medicine","Gynecology","Dermatology"], ["Emergency","Pharmacy","Parking"], ["Lab Tests","Ultrasound"], True, False, price(400,900,(1400,3000),(3400,6400),(6800,13000),(0,0),(2300,5200),(250,1200))),
    ("Indirapuram Specialty Clinic Hospital", "Indirapuram", 28.6366, 77.3693, "Specialty clinic-hospital hybrid with diagnostics and day-care support.", ["Dermatology","General Medicine","Pediatrics"], ["Pharmacy","Day Care","Parking"], ["Lab Tests","Ultrasound"], False, True, price(450,850,(0,0),(0,0),(0,0),(0,0),(0,0),(250,1300))),
    ("Mayur Vihar Emergency Hospital", "Mayur Vihar", 28.6084, 77.2936, "Emergency-focused hospital with ambulance and essential diagnostics.", ["General Medicine","Orthopedics"], ["Emergency","Ambulance","ICU","Pharmacy","Blood Bank"], ["CT Scan","Lab Tests","X-Ray"], True, True, price(550,1050,(1700,3400),(4100,7800),(8500,16500),(0,0),(2600,6200),(300,1600))),
    ("Model Town Family & Diagnostics", "Model Town", 28.7041, 77.1930, "Family medicine and diagnostics centre with transparent demo estimates.", ["General Medicine","Pediatrics","Gynecology"], ["Pharmacy","Parking","Day Care"], ["MRI","Lab Tests","Ultrasound"], False, True, price(400,850,(1200,2600),(3200,6000),(0,0),(4400,7600),(0,0),(230,1200))),
]

GLOBAL_HOSPITALS = [
    ("Harborview City Medical Center", "Seattle", "Washington", "United States", 47.6038, -122.3301, "Demo global hospital profile with emergency and trauma-style service coverage.", ["Emergency Medicine","Neurology","Orthopedics"], ["ICU","Emergency","Ambulance","Pharmacy","Blood Bank","Parking"], ["MRI","CT Scan","Lab Tests"], True, True, price(12000,28000,(38000,70000),(90000,160000),(180000,320000),(60000,110000),(35000,85000),(4000,18000))),
    ("ThamesCare University Hospital", "London", "England", "United Kingdom", 51.5072, -0.1276, "Urban multi-specialty teaching-hospital style demo profile.", ["Cardiology","Oncology","General Medicine"], ["ICU","Emergency","Ambulance","Pharmacy","Blood Bank"], ["MRI","CT Scan","Lab Tests"], True, True, price(9000,22000,(30000,65000),(80000,145000),(160000,300000),(52000,95000),(30000,76000),(3500,16000))),
    ("Maple North Health Centre", "Toronto", "Ontario", "Canada", 43.6532, -79.3832, "General hospital demo profile for planned and emergency care comparison.", ["Pediatrics","General Medicine","Gynecology"], ["Emergency","Ambulance","ICU","Pharmacy","Parking"], ["MRI","CT Scan","Lab Tests"], True, True, price(10000,24000,(34000,68000),(85000,150000),(170000,310000),(56000,100000),(32000,78000),(3800,17000))),
    ("Marina Bay Specialist Hospital", "Singapore", "Central Region", "Singapore", 1.3521, 103.8198, "Private multi-specialty demo profile with strong diagnostics and cashless-style support.", ["Cardiology","Neurology","Dermatology","General Medicine"], ["ICU","Emergency","Ambulance","Pharmacy","Parking"], ["MRI","CT Scan","Lab Tests","Ultrasound"], True, True, price(7000,18000,(28000,58000),(70000,130000),(140000,260000),(45000,85000),(26000,65000),(3000,14000))),
    ("Dubai Creek Specialty Hospital", "Dubai", "Dubai", "United Arab Emirates", 25.2048, 55.2708, "Specialty-focused demo hospital with emergency and imaging coverage.", ["Orthopedics","Cardiology","General Medicine"], ["Emergency","Ambulance","ICU","Pharmacy","Blood Bank","Parking"], ["MRI","CT Scan","Lab Tests"], True, True, price(8000,20000,(30000,62000),(76000,140000),(150000,280000),(50000,92000),(28000,70000),(3200,15000))),
    ("Berlin Mitte Care Hospital", "Berlin", "Berlin", "Germany", 52.5200, 13.4050, "European city hospital demo profile for facilities and estimated cost comparison.", ["Neurology","General Medicine","Orthopedics"], ["Emergency","ICU","Pharmacy","Parking"], ["MRI","CT Scan","Lab Tests"], True, True, price(8500,21000,(31000,62000),(78000,142000),(155000,285000),(51000,94000),(29000,72000),(3300,15000))),
    ("Sydney Harbour Medical", "Sydney", "New South Wales", "Australia", -33.8688, 151.2093, "General and family-care demo hospital with diagnostics and planned-care support.", ["General Medicine","Pediatrics","Gynecology"], ["Emergency","Ambulance","Pharmacy","Parking"], ["CT Scan","Lab Tests","Ultrasound"], True, True, price(9000,23000,(32000,66000),(82000,150000),(160000,295000),(0,0),(31000,76000),(3500,16000))),
    ("Tokyo Central Diagnostics Hospital", "Tokyo", "Tokyo", "Japan", 35.6762, 139.6503, "Diagnostics-heavy global demo profile with MRI, CT and lab facilities.", ["General Medicine","Dermatology","Neurology"], ["Pharmacy","Day Care","Parking"], ["MRI","CT Scan","Lab Tests","Ultrasound"], False, True, price(7000,17000,(25000,52000),(65000,120000),(0,0),(43000,82000),(25000,62000),(2800,13000))),
]


def build_hospitals():
    data = []
    for i, h in enumerate(HOSPITALS, start=1):
        name, city, lat, lng, desc, specs, facilities, diagnostics, emergency, cashless, prices = h
        data.append({
            "id": f"hospital-{i}", "name": name,
            "slug": name.lower().replace("&", "and").replace(" ", "-"),
            "description": desc, "address": f"{city}, Delhi NCR, India", "city": city, "state": "Delhi NCR", "country": "India",
            "pincode": str(110000 + i), "latitude": lat, "longitude": lng,
            "phone": f"+91-11-40{i:03d}-{7000+i}", "website": f"https://example.com/{i}-{name.lower().split()[0]}",
            "emergency_available": emergency, "ambulance_available": emergency,
            "cashless_insurance": cashless, "specialties": specs, "facilities": facilities,
            "diagnostics": diagnostics, "services": ["OPD Consultation", "Inpatient Care", "Diagnostics", "Day Care"],
            "estimated_prices": prices, "rating": round(3.8 + (i % 8) * 0.13, 1), "review_count": 80 + i * 31,
            "data_confidence_score": 88 if i % 4 else 76,
            "data_source_note": "Demo data for portfolio project. Verify details directly with hospital.",
            "last_updated": "2026-05-01",
        })
    start = len(data) + 1
    for offset, h in enumerate(GLOBAL_HOSPITALS, start=0):
        i = start + offset
        name, city, state, country, lat, lng, desc, specs, facilities, diagnostics, emergency, cashless, prices = h
        data.append({
            "id": f"hospital-{i}", "name": name,
            "slug": name.lower().replace("&", "and").replace(" ", "-"),
            "description": desc, "address": f"{city}, {state}, {country}", "city": city, "state": state, "country": country,
            "pincode": "", "latitude": lat, "longitude": lng,
            "phone": f"+00-555-{8000+i}", "website": f"https://example.com/global-{i}-{name.lower().split()[0]}",
            "emergency_available": emergency, "ambulance_available": emergency,
            "cashless_insurance": cashless, "specialties": specs, "facilities": facilities,
            "diagnostics": diagnostics, "services": ["OPD Consultation", "Inpatient Care", "Diagnostics", "International Desk"],
            "estimated_prices": prices, "rating": round(4.0 + (i % 6) * 0.11, 1), "review_count": 130 + i * 27,
            "data_confidence_score": 72 if i % 3 else 84,
            "data_source_note": "Global demo data for portfolio project. Prices are rough converted estimates and must be verified directly with the hospital.",
            "last_updated": "2026-05-01",
        })
    return data
