\
# -*- coding: utf-8 -*-
"""
يولّد supabase/seed.sql كاملاً: الفئات + الشركة + 61 منتجًا حقيقيًا
(أسماؤها مستخرجة من lounisagriculture.com، ووصفها معاد صياغته بالكامل
بأسلوب FERTI SAFE بثلاث لغات، دون اختراع معلومات تقنية غير مؤكدة).
"""
import json

def esc(s: str) -> str:
    return s.replace("'", "''")

CATEGORIES = [
    ("fertilizers",   "🌿", 1,
     ("الأسمدة", "أسمدة حبيبية وسائلة وورقية عالية الجودة لتغذية شاملة للتربة والنبات."),
     ("Engrais", "Engrais granulés, liquides et foliaires de haute qualité pour une nutrition complète du sol et de la plante."),
     ("Fertilizers", "High-quality granular, liquid and foliar fertilizers for complete soil and plant nutrition.")),
    ("nutrients",     "🌱", 2,
     ("المغذيات النباتية", "عناصر صغرى وكبرى ضرورية لنمو قوي وثمار عالية الجودة."),
     ("Nutriments Végétaux", "Macro et micro-éléments essentiels pour une croissance vigoureuse et des fruits de qualité."),
     ("Plant Nutrients", "Essential macro and micro elements for vigorous growth and high-quality fruit.")),
    ("pesticides",    "🛡️", 3,
     ("المبيدات الزراعية", "مبيدات حشرية وفطرية وأعشاب ومنظمات نمو لحماية متكاملة للمحاصيل."),
     ("Pesticides Agricoles", "Insecticides, fongicides, herbicides et régulateurs de croissance pour une protection complète des cultures."),
     ("Agricultural Pesticides", "Insecticides, fungicides, herbicides and growth regulators for complete crop protection.")),
    ("seeds",         "🌾", 4,
     ("البذور", "بذور خضروات هجينة مختارة، عالية الإنبات وموثوقة الإنتاجية."),
     ("Semences", "Semences de légumes hybrides sélectionnées, à fort pouvoir germinatif et à rendement fiable."),
     ("Seeds", "Selected hybrid vegetable seeds with high germination and reliable yield.")),
    ("biostimulants", "💧", 5,
     ("المحسنات الحيوية", "محفزات نمو حيوية سائلة ومسحوقية تعزز مقاومة النبات وتحسّن أداء التربة."),
     ("Biostimulants", "Biostimulants liquides et en poudre qui renforcent la résistance de la plante et améliorent la performance du sol."),
     ("Biostimulants", "Liquid and powder biostimulants that strengthen plant resistance and improve soil performance.")),
    ("biocontrol",    "🐞", 6,
     ("المكافحة البيولوجية", "حلول بيولوجية صديقة للبيئة لمكافحة الآفات والأمراض — قريبًا ضمن كتالوج FERTI SAFE."),
     ("Lutte Biologique", "Solutions biologiques respectueuses de l'environnement contre les ravageurs et maladies — bientôt dans le catalogue FERTI SAFE."),
     ("Biological Control", "Eco-friendly biological solutions for pest and disease control — coming soon to the FERTI SAFE catalog.")),
]

# كل عنصر: slug, category_slug, order,
# ar=(name, desc, tech, usage, [features]), fr=(...), en=(...)
P = []

def add(slug, cat, order, ar, fr, en, crops=None):
    P.append(dict(slug=slug, cat=cat, order=order, ar=ar, fr=fr, en=en, crops=crops or []))

# ---------------- FERTILIZERS ----------------
add("agrisol-series", "fertilizers", 1,
    ("سلسلة أغريسول", "مجموعة أسمدة NPK حبيبية متكاملة التركيبة، صُممت لتغطية احتياجات التربة والنبات في مختلف مراحل النمو.", "أسمدة NPK حبيبية — عدة صيغ ضمن السلسلة", "تُستخدم كتسميد أساسي للتربة قبل الزراعة أو خلال الموسم حسب الصيغة المختارة.", ["تركيبة متوازنة من العناصر الكبرى", "عدة صيغ NPK لتلبية احتياجات مختلف المحاصيل"]),
    ("Gamme Agrisol", "Une gamme d'engrais NPK granulés à formulation complète, conçue pour couvrir les besoins du sol et de la plante à différents stades de croissance.", "Engrais NPK granulés — plusieurs formules dans la gamme", "Utilisés comme fumure de fond avant plantation ou en cours de saison selon la formule choisie.", ["Formulation équilibrée en éléments majeurs", "Plusieurs dosages NPK pour différentes cultures"]),
    ("Agrisol Series", "A range of complete NPK granular fertilizers designed to cover soil and plant needs across different growth stages.", "Granular NPK fertilizers — several formulas within the series", "Used as base fertilization before planting or during the season depending on the chosen formula.", ["Balanced blend of major nutrients", "Multiple NPK grades for different crops"]))

add("urea-sol", "fertilizers", 2,
    ("يوريا سول", "سماد يوريا حبيبي عالي الجودة بتركيز نيتروجين مرتفع، مصدر أساسي وسريع لتغذية النبات بالآزوت.", "يوريا حبيبية 46-0-0", "يُستخدم كتسميد أساسي أو تكميلي لتوفير الآزوت اللازم للنمو الخضري.", ["تركيز نيتروجين مرتفع 46%", "قابلية ذوبان جيدة في التربة"]),
    ("Urea Sol", "Engrais urée granulé de haute qualité à forte teneur en azote, source rapide et essentielle pour la nutrition azotée de la plante.", "Urée granulée 46-0-0", "Utilisé en fumure de fond ou complémentaire pour couvrir les besoins azotés de la croissance végétative.", ["Teneur élevée en azote (46%)", "Bonne solubilité dans le sol"]),
    ("Urea Sol", "A high-quality granular urea fertilizer with a high nitrogen content, a fast and essential source of nitrogen nutrition for the plant.", "Granular urea 46-0-0", "Used as base or supplementary fertilization to meet the nitrogen needs of vegetative growth.", ["High nitrogen content (46%)", "Good solubility in soil"]))

add("lounibest-series", "fertilizers", 3,
    ("سلسلة لونيبيست", "سلسلة أسمدة عجينية مركّزة، مصممة لتوفير تغذية مركزة وسهلة الاستعمال للنبات.", "أسمدة عجينية (Paste) — عدة صيغ ضمن السلسلة", "تُذاب في الماء وتُستخدم عبر الري أو الرش الورقي حسب الصيغة.", ["تركيبة مركزة سهلة الذوبان", "عدة صيغ ضمن نفس السلسلة"]),
    ("Gamme Lounibest", "Une gamme d'engrais en pâte concentrée, conçue pour offrir une nutrition concentrée et facile d'emploi à la plante.", "Engrais en pâte — plusieurs formules dans la gamme", "Se dissout dans l'eau et s'utilise par irrigation ou pulvérisation foliaire selon la formule.", ["Formule concentrée et facile à dissoudre", "Plusieurs variantes dans la même gamme"]),
    ("Lounibest Series", "A range of concentrated paste fertilizers designed to provide concentrated, easy-to-use nutrition for the plant.", "Paste fertilizers — several formulas within the series", "Dissolved in water and applied via irrigation or foliar spray depending on the formula.", ["Concentrated, easy-to-dissolve formula", "Several variants within the same series"]))

add("best-k-50", "fertilizers", 4,
    ("بست ك 50%", "سماد سائل عالي البوتاسيوم بتركيز 50%، يُعزز جودة الثمار ويحسّن مقاومة النبات في المراحل الحرجة.", "سماد سائل — بوتاسيوم 50%", "يُستخدم عبر الري بالتنقيط أو الرش الورقي لدعم مرحلة الإثمار.", ["تركيز بوتاسيوم مرتفع (50%)", "يحسّن حجم ولون وصلابة الثمار"]),
    ("Best K 50%", "Engrais liquide à forte teneur en potassium (50%), il améliore la qualité des fruits et renforce la résistance de la plante aux stades critiques.", "Engrais liquide — potassium 50%", "Utilisé par fertigation ou pulvérisation foliaire pour soutenir la phase de fructification.", ["Forte concentration en potassium (50%)", "Améliore taille, couleur et fermeté des fruits"]),
    ("Best K 50%", "A high-potassium liquid fertilizer (50%) that boosts fruit quality and strengthens plant resistance during critical growth stages.", "Liquid fertilizer — potassium 50%", "Applied via fertigation or foliar spray to support the fruiting stage.", ["High potassium concentration (50%)", "Improves fruit size, color and firmness"]))

add("fertikid-series", "fertilizers", 5,
    ("سلسلة فيرتيكيد", "سلسلة أسمدة سائلة متخصصة، تُلبي احتياجات غذائية دقيقة حسب مرحلة نمو النبات.", "أسمدة سائلة متخصصة — عدة صيغ", "تُستخدم عبر الري أو الرش حسب الصيغة والمرحلة الفينولوجية للنبات.", ["صيغ متعددة لمراحل نمو مختلفة", "سهلة الامتصاص والذوبان"]),
    ("Gamme Fertikid", "Une gamme d'engrais liquides spécialisés, répondant à des besoins nutritionnels précis selon le stade de croissance de la plante.", "Engrais liquides spécialisés — plusieurs formules", "Utilisés par irrigation ou pulvérisation selon la formule et le stade phénologique.", ["Formules multiples pour différents stades", "Absorption et solubilité optimales"]),
    ("Fertikid Series", "A series of specialized liquid fertilizers that meet precise nutritional needs according to the plant's growth stage.", "Specialized liquid fertilizers — several formulas", "Applied via irrigation or spraying depending on the formula and the plant's phenological stage.", ["Multiple formulas for different growth stages", "Easy absorption and solubility"]))

add("hortan-00-45-55", "fertilizers", 6,
    ("هورتان 00-45-55", "سماد سائل عالي الفعالية غني بالفوسفور والبوتاسيوم، يُحسّن جودة الثمار عند الإثمار.", "سماد سائل 00-45-55", "يُستخدم في مرحلة الإثمار عبر الري أو الرش الورقي لتحسين جودة الثمار.", ["نسبة عالية من الفوسفور والبوتاسيوم", "يحسّن جودة وصلابة الثمار"]),
    ("Hortan 00-45-55", "Engrais liquide à haute efficacité, riche en phosphore et potassium, il améliore la qualité des fruits durant la fructification.", "Engrais liquide 00-45-55", "Utilisé au stade de fructification par irrigation ou pulvérisation foliaire pour améliorer la qualité des fruits.", ["Forte teneur en phosphore et potassium", "Améliore la qualité et la fermeté des fruits"]),
    ("Hortan 00-45-55", "A high-efficiency liquid fertilizer rich in phosphorus and potassium that improves fruit quality during fruiting.", "Liquid fertilizer 00-45-55", "Applied during the fruiting stage via irrigation or foliar spray to improve fruit quality.", ["High phosphorus and potassium content", "Improves fruit quality and firmness"]))

add("phostal-18-27-0", "fertilizers", 7,
    ("فوستال 18-27-0", "سماد ورقي سائل غني بالفوسفور، يُستخدم للتغذية الورقية والوقاية من بعض الأمراض الفطرية.", "سماد ورقي سائل 18-27-0", "يُرش على الأوراق للوقاية من الأمراض الفطرية ودعم التغذية الفوسفورية.", ["تغذية ورقية فعالة بالفوسفور", "دور وقائي ضد بعض الأمراض الفطرية"]),
    ("Phostal 18-27-0", "Engrais liquide foliaire riche en phosphore, utilisé pour la nutrition foliaire et la prévention de certaines maladies fongiques.", "Engrais foliaire liquide 18-27-0", "Pulvérisé sur le feuillage pour la prévention fongique et l'apport en phosphore.", ["Nutrition foliaire riche en phosphore", "Effet préventif contre certaines maladies fongiques"]),
    ("Phostal 18-27-0", "A phosphorus-rich liquid foliar fertilizer used for foliar nutrition and prevention against certain fungal diseases.", "Liquid foliar fertilizer 18-27-0", "Sprayed on foliage for fungal disease prevention and phosphorus nutrition support.", ["Effective foliar phosphorus nutrition", "Preventive role against certain fungal diseases"]))

add("thiosulfate-ammonium", "fertilizers", 8,
    ("ثيوسلفات الأمونيوم", "سماد سائل يوفر دعمًا متوازنًا من الآزوت والكبريت، عنصرين أساسيين لبناء البروتين في النبات.", "سماد سائل — آزوت وكبريت", "يُستخدم عبر الري لتوفير الآزوت والكبريت بشكل متوازن.", ["مصدر مزدوج للآزوت والكبريت", "يدعم تكوين البروتين النباتي"]),
    ("Thiosulfate d'Ammonium", "Engrais liquide apportant un soutien équilibré en azote et en soufre, deux éléments essentiels à la synthèse des protéines de la plante.", "Engrais liquide — azote et soufre", "Utilisé par irrigation pour un apport équilibré en azote et en soufre.", ["Double apport en azote et soufre", "Soutient la synthèse protéique de la plante"]),
    ("Ammonium Thiosulfate", "A liquid fertilizer offering balanced support of nitrogen and sulfur, two elements essential for building plant protein.", "Liquid fertilizer — nitrogen and sulfur", "Applied via irrigation to provide balanced nitrogen and sulfur nutrition.", ["Dual nitrogen and sulfur source", "Supports plant protein synthesis"]))

add("thiosulfate-magnesium", "fertilizers", 9,
    ("ثيوسلفات المغنيزيوم", "سماد سائل يجمع بين المغنيزيوم والكبريت لدعم النمو العام للنبات وتحسين وظائفه الحيوية.", "سماد سائل — مغنيزيوم وكبريت", "يُستخدم عبر الري لتصحيح نقص المغنيزيوم ودعم النمو.", ["يدعم التمثيل الضوئي عبر المغنيزيوم", "يوفر الكبريت الضروري للنبات"]),
    ("Thiosulfate de Magnésium", "Engrais liquide associant magnésium et soufre pour soutenir la croissance générale de la plante et ses fonctions vitales.", "Engrais liquide — magnésium et soufre", "Utilisé par irrigation pour corriger les carences en magnésium et soutenir la croissance.", ["Soutient la photosynthèse via le magnésium", "Apporte le soufre nécessaire à la plante"]),
    ("Magnesium Thiosulfate", "A liquid fertilizer combining magnesium and sulfur to support the plant's overall growth and vital functions.", "Liquid fertilizer — magnesium and sulfur", "Applied via irrigation to correct magnesium deficiency and support growth.", ["Supports photosynthesis via magnesium", "Provides essential sulfur to the plant"]))

add("thiosulfate-potassium", "fertilizers", 10,
    ("ثيوسلفات البوتاسيوم", "محسّن قوي لمواصفات الثمرة: الحجم واللون والصلابة، بفضل تركيبته من البوتاسيوم والكبريت.", "سماد سائل — بوتاسيوم وكبريت", "يُستخدم في مرحلة نمو الثمار لتحسين جودتها التجارية.", ["يحسّن حجم ولون وصلابة الثمار", "مصدر مزدوج للبوتاسيوم والكبريت"]),
    ("Thiosulfate de Potassium", "Un puissant améliorateur des caractéristiques du fruit : taille, couleur et fermeté, grâce à sa formule à base de potassium et de soufre.", "Engrais liquide — potassium et soufre", "Utilisé pendant la phase de développement du fruit pour améliorer sa qualité commerciale.", ["Améliore taille, couleur et fermeté des fruits", "Double apport en potassium et soufre"]),
    ("Potassium Thiosulfate", "A powerful improver of fruit specifications — size, color and firmness — thanks to its potassium and sulfur formulation.", "Liquid fertilizer — potassium and sulfur", "Applied during fruit development to improve commercial fruit quality.", ["Improves fruit size, color and firmness", "Dual potassium and sulfur source"]))

add("lounisol-series", "fertilizers", 11,
    ("سلسلة لونيسول", "سلسلة أسمدة ورقية متعددة الصيغ، مصممة لتلبية الاحتياجات الغذائية الدقيقة للنبات.", "أسمدة ورقية — عدة صيغ ضمن السلسلة", "تُرش على الأوراق حسب الصيغة والاحتياج الغذائي للنبات.", ["امتصاص سريع عبر الأوراق", "عدة صيغ لتغطية احتياجات مختلفة"]),
    ("Gamme Lounisol", "Une gamme d'engrais foliaires à formules multiples, conçue pour répondre aux besoins nutritionnels précis de la plante.", "Engrais foliaires — plusieurs formules dans la gamme", "Pulvérisés sur le feuillage selon la formule et le besoin nutritionnel de la plante.", ["Absorption foliaire rapide", "Plusieurs formules pour différents besoins"]),
    ("Lounisol Series", "A multi-formula foliar fertilizer series designed to meet the plant's precise nutritional needs.", "Foliar fertilizers — several formulas within the series", "Sprayed on foliage according to the formula and the plant's nutritional need.", ["Fast foliar absorption", "Several formulas to cover different needs"]))

add("louniprime", "fertilizers", 12,
    ("لوني برايم 0-43-56", "سماد ورقي قابل للذوبان في الماء، غني بالفوسفور والبوتاسيوم، لدعم مراحل الإزهار والإثمار.", "سماد ورقي قابل للذوبان 0-43-56", "يُذاب في الماء ويُرش على الأوراق خلال مراحل الإزهار والإثمار.", ["غني بالفوسفور والبوتاسيوم", "سريع الذوبان والامتصاص"]),
    ("Louni-Prime 0-43-56", "Engrais foliaire hydrosoluble, riche en phosphore et potassium, pour soutenir les stades de floraison et de fructification.", "Engrais foliaire hydrosoluble 0-43-56", "Dissous dans l'eau et pulvérisé sur le feuillage durant la floraison et la fructification.", ["Riche en phosphore et potassium", "Solubilité et absorption rapides"]),
    ("Louni-Prime 0-43-56", "A water-soluble foliar fertilizer rich in phosphorus and potassium, supporting flowering and fruiting stages.", "Water-soluble foliar fertilizer 0-43-56", "Dissolved in water and sprayed on foliage during flowering and fruiting stages.", ["Rich in phosphorus and potassium", "Fast solubility and absorption"]))

add("lounifert-series", "fertilizers", 13,
    ("سلسلة لونيفرت", "سلسلة أسمدة مسحوقية قابلة للذوبان، توفر تغذية مركزة يسهل التحكم في جرعاتها.", "سماد مسحوق قابل للذوبان — عدة صيغ", "يُذاب في الماء ويُستخدم عبر الري أو الرش حسب الصيغة.", ["مسحوق سريع الذوبان", "سهولة التحكم في التركيز"]),
    ("Gamme Lounifert", "Une gamme d'engrais en poudre hydrosoluble, offrant une nutrition concentrée et un dosage facile à contrôler.", "Engrais en poudre hydrosoluble — plusieurs formules", "Dissous dans l'eau et utilisé par irrigation ou pulvérisation selon la formule.", ["Poudre à dissolution rapide", "Dosage facile à maîtriser"]),
    ("Lounifert Series", "A range of water-soluble powder fertilizers offering concentrated nutrition with easy-to-control dosing.", "Water-soluble powder fertilizer — several formulas", "Dissolved in water and applied via irrigation or spraying depending on the formula.", ["Fast-dissolving powder", "Easy dosage control"]))

add("loungreen-series", "fertilizers", 14,
    ("سلسلة لونيغرين", "سلسلة أسمدة على شكل جيل، توفر تغذية تدريجية ومستقرة للنبات.", "سماد بصيغة جيل — عدة صيغ ضمن السلسلة", "يُستخدم قرب الجذور أو حسب طريقة الاستعمال الموصى بها للصيغة.", ["تحرر تدريجي للعناصر الغذائية", "استقرار في التربة"]),
    ("Gamme Loungreen", "Une gamme d'engrais sous forme de gel, offrant une nutrition progressive et stable à la plante.", "Engrais en gel — plusieurs formules dans la gamme", "Appliqué près des racines ou selon le mode d'emploi recommandé pour la formule.", ["Libération progressive des éléments nutritifs", "Stabilité dans le sol"]),
    ("Loungreen Series", "A gel-form fertilizer range offering gradual, stable nutrition for the plant.", "Gel fertilizer — several formulas within the series", "Applied near the root zone or as recommended for the specific formula.", ["Gradual nutrient release", "Stability in soil"]))

# ---------------- PESTICIDES ----------------
add("acarina", "pesticides", 1,
    ("أكارينا", "مبيد حشري وعنكبوتي على شكل مركز قابل للاستحلاب، يحتوي على مادة أباميكتين بتركيز 1.8%.", "مركز قابل للاستحلاب (EC) — أباميكتين 1.8%", "يُستخدم لمكافحة العناكب والحشرات الضارة حسب توصيات الاستعمال على الملصق الرسمي.", ["فعالية ضد الأكاروسات والحشرات", "تركيبة EC سهلة التحضير"]),
    ("Acarina", "Insecticide acaricide sous forme de concentré émulsionnable, à base d'Abamectine 1,8%.", "Concentré émulsionnable (EC) — Abamectine 1,8%", "Utilisé contre les acariens et insectes nuisibles selon les recommandations de l'étiquette officielle.", ["Efficace contre acariens et insectes", "Formulation EC facile à préparer"]),
    ("Acarina", "An acaricide insecticide in emulsifiable concentrate form, containing Abamectin at 1.8%.", "Emulsifiable concentrate (EC) — Abamectin 1.8%", "Used against mites and harmful insects following the official label recommendations.", ["Effective against mites and insects", "Easy-to-prepare EC formulation"]))

add("cypercap", "pesticides", 2,
    ("سيبركاب", "مبيد حشري بصيغة مركز قابل للاستحلاب، يُستخدم في برامج مكافحة الحشرات الضارة بالمحاصيل.", "مركز قابل للاستحلاب (EC)", "يُستخدم ضمن برامج المكافحة الحشرية حسب توصيات الملصق الرسمي.", ["صيغة EC عملية الاستخدام", "يندرج ضمن مبيدات الحماية الحشرية"]),
    ("Cypercap", "Insecticide sous forme de concentré émulsionnable, utilisé dans les programmes de lutte contre les insectes nuisibles aux cultures.", "Concentré émulsionnable (EC)", "Utilisé dans les programmes de lutte insecticide selon les recommandations de l'étiquette officielle.", ["Formulation EC pratique", "S'intègre aux programmes de protection insecticide"]),
    ("Cypercap", "An insecticide in emulsifiable concentrate form, used in insect control programs to protect crops.", "Emulsifiable concentrate (EC)", "Used within insect control programs following the official label recommendations.", ["Practical EC formulation", "Fits within insecticide protection programs"]))

add("deltacide", "pesticides", 3,
    ("دلتاسيد 2.5% EC", "مبيد حشري بصيغة مركز قابل للاستحلاب، يوفر حماية فعالة ضمن برامج مكافحة الحشرات.", "مركز قابل للاستحلاب (EC) 2.5%", "يُستخدم لمكافحة الحشرات الضارة حسب توصيات الملصق الرسمي.", ["تركيز 2.5%", "صيغة EC سهلة الاستعمال"]),
    ("Deltacide 2.5% EC", "Insecticide sous forme de concentré émulsionnable, offrant une protection efficace dans les programmes de lutte contre les insectes.", "Concentré émulsionnable (EC) 2,5%", "Utilisé contre les insectes nuisibles selon les recommandations de l'étiquette officielle.", ["Concentration à 2,5%", "Formulation EC facile d'emploi"]),
    ("Deltacide 2.5% EC", "An insecticide in emulsifiable concentrate form, providing effective protection within insect control programs.", "Emulsifiable concentrate (EC) 2.5%", "Used against harmful insects following the official label recommendations.", ["2.5% concentration", "Easy-to-use EC formulation"]))

add("hp22", "pesticides", 4,
    ("HP 22", "مبيد حشري بصيغة مركز قابل للاستحلاب، مخصص لمكافحة العناكب والحشرات التي تقضي فترة السكون في أشجار الفاكهة.", "مركز قابل للاستحلاب (EC)", "يُستخدم في أشجار الفاكهة لمكافحة الحشرات والعناكب في فترة السكون.", ["فعال ضد الحشرات الشتوية في الأشجار المثمرة", "صيغة EC"]),
    ("HP 22", "Insecticide sous forme de concentré émulsionnable, destiné à la lutte contre les acariens et les insectes hivernants sur arbres fruitiers.", "Concentré émulsionnable (EC)", "Utilisé sur arbres fruitiers pour lutter contre les insectes et acariens en période de dormance.", ["Efficace contre les ravageurs hivernants des arbres fruitiers", "Formulation EC"]),
    ("HP 22", "An insecticide in emulsifiable concentrate form, targeting mites and overwintering insects in fruit trees.", "Emulsifiable concentrate (EC)", "Used on fruit trees to control insects and mites during the dormant period.", ["Effective against overwintering pests in fruit trees", "EC formulation"]))

add("daltaseed-005dp", "pesticides", 5,
    ("دلتاسيد 0.05% DP", "مبيد حشري معقّم بصيغة مسحوق للتعفير، مخصص لتعقيم البطاطا في مخازن التخزين.", "مسحوق للتعفير (DP) 0.05%", "يُستخدم في مخازن تخزين البطاطا لحمايتها من الحشرات.", ["مخصص لمخازن البطاطا", "صيغة مسحوق سهلة التطبيق"]),
    ("Deltaseed 0.05% DP", "Insecticide de désinfection sous forme de poudre pour poudrage, destiné à la désinfection des pommes de terre en chambres de stockage.", "Poudre pour poudrage (DP) 0,05%", "Utilisé dans les chambres de stockage de pommes de terre pour les protéger des insectes.", ["Destiné au stockage de la pomme de terre", "Formulation en poudre facile à appliquer"]),
    ("Deltaseed 0.05% DP", "A sterilizing insecticide in dust powder form, designed for sterilizing potatoes in storage rooms.", "Dust powder (DP) 0.05%", "Used in potato storage rooms to protect stored potatoes from insects.", ["Designed for potato storage", "Easy-to-apply powder formulation"]), crops=[("بطاطا","Pomme de terre","Potato")])

add("azomax", "pesticides", 6,
    ("أزوماكس 25% SC", "مبيد فطري جهازي بصيغة معلق مركز، يحتوي على مادة أزوكسيستروبين بتركيز 25%.", "معلق مركز (SC) — أزوكسيستروبين 25%", "يُستخدم للوقاية والعلاج من الأمراض الفطرية حسب توصيات الملصق الرسمي.", ["فعالية جهازية واسعة الطيف", "تركيز 25% من المادة الفعالة"]),
    ("Azomax 25% SC", "Fongicide systémique sous forme de suspension concentrée, à base d'Azoxystrobine à 25%.", "Suspension concentrée (SC) — Azoxystrobine 25%", "Utilisé en prévention et traitement des maladies fongiques selon les recommandations de l'étiquette.", ["Action systémique à large spectre", "25% de matière active"]),
    ("Azomax 25% SC", "A systemic fungicide in suspension concentrate form, containing Azoxystrobin at 25%.", "Suspension concentrate (SC) — Azoxystrobin 25%", "Used for prevention and treatment of fungal diseases following the official label recommendations.", ["Broad-spectrum systemic action", "25% active ingredient concentration"]))

add("radix", "pesticides", 7,
    ("راديكس", "مبيد فطري جهازي بصيغة معلق مركز، مخصص لمكافحة الأمراض الفطرية التي تصيب التربة والجذور.", "معلق مركز (SC)", "يُستخدم لحماية الجذور من الأمراض الفطرية المنقولة عبر التربة.", ["يستهدف أمراض التربة والجذور", "صيغة SC"]),
    ("Radix", "Fongicide systémique sous forme de suspension concentrée, destiné à la lutte contre les maladies fongiques telluriques.", "Suspension concentrée (SC)", "Utilisé pour protéger les racines contre les maladies fongiques d'origine tellurique.", ["Cible les maladies du sol et des racines", "Formulation SC"]),
    ("Radix", "A systemic fungicide in suspension concentrate form, targeting soil-borne fungal diseases.", "Suspension concentrate (SC)", "Used to protect roots against soil-borne fungal diseases.", ["Targets soil and root diseases", "SC formulation"]))

add("swift", "pesticides", 8,
    ("سويفت", "مبيد فطري وقائي وعلاجي بصيغة معلق مركز، يحتوي على هيدروكسيد النحاس.", "معلق مركز (SC) — هيدروكسيد النحاس", "يُستخدم للوقاية والعلاج من الأمراض الفطرية حسب توصيات الملصق الرسمي.", ["مفعول وقائي وعلاجي مزدوج", "أساسه النحاس"]),
    ("Swift", "Fongicide préventif et curatif sous forme de suspension concentrée, à base d'hydroxyde de cuivre.", "Suspension concentrée (SC) — hydroxyde de cuivre", "Utilisé en prévention et traitement des maladies fongiques selon les recommandations de l'étiquette.", ["Double action préventive et curative", "À base de cuivre"]),
    ("Swift", "A preventive and curative fungicide in suspension concentrate form, based on copper hydroxide.", "Suspension concentrate (SC) — copper hydroxide", "Used for prevention and treatment of fungal diseases following the official label recommendations.", ["Dual preventive and curative action", "Copper-based"]))

add("cymovit-wp", "pesticides", 9,
    ("سيموفيت", "مبيد فطري وقائي وعلاجي بصيغة مسحوق قابل للبلل، فعال ضد مرض البياض الزغبي.", "مسحوق قابل للبلل (WP)", "يُستخدم للوقاية والعلاج من البياض الزغبي حسب توصيات الملصق الرسمي.", ["فعال ضد البياض الزغبي", "صيغة WP"]),
    ("Cymovit", "Fongicide préventif et curatif sous forme de poudre mouillable, efficace contre le mildiou.", "Poudre mouillable (WP)", "Utilisé en prévention et traitement du mildiou selon les recommandations de l'étiquette.", ["Efficace contre le mildiou", "Formulation WP"]),
    ("Cymovit", "A preventive and curative fungicide in wettable powder form, effective against downy mildew.", "Wettable powder (WP)", "Used for prevention and treatment of downy mildew following the official label recommendations.", ["Effective against downy mildew", "WP formulation"]))

add("fongi-soufre-98", "pesticides", 10,
    ("فونجي صوفر 98% DP", "مبيد فطري أساسه الكبريت، وقائي وعلاجي ضد مرض البياض الدقيقي.", "مسحوق للتعفير (DP) — كبريت 98%", "يُستخدم للوقاية والعلاج من البياض الدقيقي عبر التعفير.", ["أساسه الكبريت الطبيعي", "فعال ضد البياض الدقيقي"]),
    ("Fongi-Soufre 98% DP", "Fongicide à base de soufre, préventif et curatif contre l'oïdium.", "Poudre pour poudrage (DP) — soufre 98%", "Utilisé en prévention et traitement de l'oïdium par poudrage.", ["À base de soufre naturel", "Efficace contre l'oïdium"]),
    ("Fongi-Soufre 98% DP", "A sulfur-based fungicide, preventive and curative against powdery mildew.", "Dust powder (DP) — sulfur 98%", "Used for prevention and treatment of powdery mildew via dusting.", ["Based on natural sulfur", "Effective against powdery mildew"]))

add("foshium-80wg", "pesticides", 11,
    ("فوسيليوم", "مبيد فطري جهازي بصيغة حبيبات قابلة للذوبان، يحفّز نظام الدفاع الطبيعي للنبات.", "حبيبات قابلة للذوبان في الماء (WG)", "يُستخدم للوقاية من الأمراض الفطرية وتعزيز مناعة النبات.", ["يحفّز مناعة النبات الطبيعية", "صيغة WG"]),
    ("Fosilium", "Fongicide systémique sous forme de granulés dispersibles dans l'eau, qui stimule le système de défense naturel de la plante.", "Granulés dispersibles dans l'eau (WG)", "Utilisé pour prévenir les maladies fongiques et renforcer l'immunité naturelle de la plante.", ["Stimule les défenses naturelles de la plante", "Formulation WG"]),
    ("Fosilium", "A systemic fungicide in water-dispersible granule form that stimulates the plant's natural defense system.", "Water-dispersible granules (WG)", "Used to prevent fungal diseases and strengthen the plant's natural immunity.", ["Stimulates the plant's natural defenses", "WG formulation"]))

add("source-s-80wg", "pesticides", 12,
    ("سورس S", "مبيد فطري ملامس بصيغة حبيبات قابلة للذوبان، يقي من تبقع الأوراق والبياض الدقيقي والأكاروسات.", "حبيبات قابلة للذوبان في الماء (WG)", "يُستخدم وقائيًا ضد تبقع الأوراق والبياض الدقيقي.", ["يقي من عدة أمراض وآفات", "صيغة WG"]),
    ("Source S", "Fongicide de contact sous forme de granulés dispersibles, prévenant les taches foliaires, l'oïdium et les acariens.", "Granulés dispersibles dans l'eau (WG)", "Utilisé en prévention contre les taches foliaires et l'oïdium.", ["Prévient plusieurs maladies et ravageurs", "Formulation WG"]),
    ("Source S", "A contact fungicide in water-dispersible granule form, preventing leaf spots, powdery mildew and mites.", "Water-dispersible granules (WG)", "Used preventively against leaf spots and powdery mildew.", ["Prevents several diseases and pests", "WG formulation"]))

add("cyproflux-wg", "pesticides", 13,
    ("سيبروفلوكس", "مبيد فطري جهازي وانتقائي بصيغة حبيبات قابلة للذوبان.", "حبيبات قابلة للذوبان في الماء (WG)", "يُستخدم للوقاية والعلاج من الأمراض الفطرية حسب توصيات الملصق الرسمي.", ["فعالية جهازية وانتقائية", "صيغة WG"]),
    ("Cyproflux", "Fongicide systémique et sélectif sous forme de granulés dispersibles.", "Granulés dispersibles dans l'eau (WG)", "Utilisé en prévention et traitement des maladies fongiques selon les recommandations de l'étiquette.", ["Action systémique et sélective", "Formulation WG"]),
    ("Cyproflux", "A systemic and selective fungicide in water-dispersible granule form.", "Water-dispersible granules (WG)", "Used for prevention and treatment of fungal diseases following the official label recommendations.", ["Systemic and selective action", "WG formulation"]))

add("cynil-50wg", "pesticides", 14,
    ("سينيل", "مبيد فطري جهازي وانتقائي بصيغة حبيبات قابلة للذوبان.", "حبيبات قابلة للذوبان في الماء (WG)", "يُستخدم للوقاية والعلاج من الأمراض الفطرية حسب توصيات الملصق الرسمي.", ["فعالية جهازية وانتقائية", "صيغة WG"]),
    ("Cynil", "Fongicide systémique et sélectif sous forme de granulés dispersibles.", "Granulés dispersibles dans l'eau (WG)", "Utilisé en prévention et traitement des maladies fongiques selon les recommandations de l'étiquette.", ["Action systémique et sélective", "Formulation WG"]),
    ("Cynil", "A systemic and selective fungicide in water-dispersible granule form.", "Water-dispersible granules (WG)", "Used for prevention and treatment of fungal diseases following the official label recommendations.", ["Systemic and selective action", "WG formulation"]))

add("desert-70wp", "pesticides", 15,
    ("ديزرت 70WP", "مبيد أعشاب بصيغة مسحوق قابل للبلل، ضمن برامج مكافحة الأعشاب الضارة بالمحاصيل.", "مسحوق قابل للبلل (WP)", "يُستخدم لمكافحة الأعشاب الضارة حسب توصيات الملصق الرسمي.", ["صيغة WP", "يندرج ضمن برامج مكافحة الأعشاب"]),
    ("Desert 70WP", "Herbicide sous forme de poudre mouillable, utilisé dans les programmes de lutte contre les mauvaises herbes.", "Poudre mouillable (WP)", "Utilisé pour lutter contre les mauvaises herbes selon les recommandations de l'étiquette officielle.", ["Formulation WP", "S'intègre aux programmes de désherbage"]),
    ("Desert 70WP", "A herbicide in wettable powder form, used within weed control programs for crops.", "Wettable powder (WP)", "Used for weed control following the official label recommendations.", ["WP formulation", "Fits within weed control programs"]))

add("gibrofert", "pesticides", 16,
    ("جيبروفرت", "منظم نمو نباتي يُستخدم ضمن برامج تحسين النمو والإنتاجية.", "منظم نمو نباتي", "يُستخدم حسب توصيات الملصق الرسمي لتحسين مراحل النمو المستهدفة.", ["يدعم تنظيم مراحل النمو", "يُستخدم ضمن برامج متخصصة"]),
    ("Gibrofert", "Régulateur de croissance végétale utilisé dans les programmes d'amélioration de la croissance et de la productivité.", "Régulateur de croissance végétale", "Utilisé selon les recommandations de l'étiquette officielle pour améliorer les stades de croissance ciblés.", ["Aide à réguler les stades de croissance", "Utilisé dans des programmes spécialisés"]),
    ("Gibrofert", "A plant growth regulator used within programs aimed at improving growth and productivity.", "Plant growth regulator", "Used following official label recommendations to improve targeted growth stages.", ["Helps regulate growth stages", "Used within specialized programs"]))

# ---------------- SEEDS ----------------
add("elmassa-f1-tomato", "seeds", 1,
    ("الماسة F1 - طماطم هجين", "بذور طماطم هجينة شبه محددة النمو، عالية الإنتاجية ومقاومة للفيروسات.", "هجين F1 — نمو شبه محدد", "تُزرع حسب الموسم الملائم لزراعة الطماطم في المنطقة.", ["مقاومة للفيروسات", "إنتاجية عالية"]),
    ("El Massa F1 - Tomate Hybride", "Semences de tomate hybride semi-déterminée, à haut rendement et résistante aux virus.", "Hybride F1 — croissance semi-déterminée", "À planter selon la saison adaptée à la culture de la tomate dans la région.", ["Résistante aux virus", "Haut rendement"]),
    ("El Massa F1 - Hybrid Tomato", "Semi-determinate hybrid tomato seeds, high-yielding and virus-resistant.", "F1 hybrid — semi-determinate growth", "Planted according to the appropriate tomato-growing season in the region.", ["Virus-resistant", "High yield"]), crops=[("طماطم","Tomate","Tomato")])

add("randa-f1-squash", "seeds", 2,
    ("راندا F1 - كوسة هجين", "بذور كوسة هجينة مبكرة جدًا من نوع كازيرتا.", "هجين F1 — نوع كازيرتا", "تُزرع حسب الموسم الملائم لزراعة الكوسة في المنطقة.", ["نضج مبكر جدًا", "نوع كازيرتا المعروف"]),
    ("Randa F1 - Courgette Hybride", "Semences de courgette hybride très précoce de type Caserta.", "Hybride F1 — type Caserta", "À planter selon la saison adaptée à la culture de la courgette dans la région.", ["Précocité très marquée", "Type Caserta reconnu"]),
    ("Randa F1 - Hybrid Squash", "Very early hybrid squash seeds of the Caserta type.", "F1 hybrid — Caserta type", "Planted according to the appropriate squash-growing season in the region.", ["Very early maturity", "Recognized Caserta type"]), crops=[("كوسة","Courgette","Squash")])

add("marwa-pepper", "seeds", 3,
    ("مروة - فلفل هجين", "بذور فلفل هجين طويل أخضر فاتح، عالي الإنتاجية.", "هجين — فلفل طويل أخضر فاتح", "تُزرع حسب الموسم الملائم لزراعة الفلفل في المنطقة.", ["إنتاجية عالية", "لون أخضر فاتح مميز"]),
    ("Marwa - Poivron Hybride", "Semences de poivron hybride long, vert clair, à haut rendement.", "Hybride — poivron long vert clair", "À planter selon la saison adaptée à la culture du poivron dans la région.", ["Haut rendement", "Couleur vert clair distinctive"]),
    ("Marwa - Hybrid Pepper", "Light green, long hybrid pepper seeds, high-yielding.", "Hybrid — light green long pepper", "Planted according to the appropriate pepper-growing season in the region.", ["High yield", "Distinctive light green color"]), crops=[("فلفل","Poivron","Pepper")])

add("najm-f1-melon", "seeds", 4,
    ("نجم F1 - شمام هجين", "بذور شمام هجين من نوع أناناس، بإنتاجية وفيرة وطعم حلو.", "هجين F1 — نوع أناناس", "تُزرع حسب الموسم الملائم لزراعة الشمام في المنطقة.", ["إنتاجية وفيرة", "طعم حلو مميز"]),
    ("Najm F1 - Melon Hybride", "Semences de melon hybride de type Ananas, à rendement abondant et à la saveur sucrée.", "Hybride F1 — type Ananas", "À planter selon la saison adaptée à la culture du melon dans la région.", ["Rendement abondant", "Saveur sucrée distinctive"]),
    ("Najm F1 - Hybrid Melon", "Ananas-type hybrid melon seeds with massive yield and sweet taste.", "F1 hybrid — Ananas type", "Planted according to the appropriate melon-growing season in the region.", ["Massive yield", "Distinctive sweet taste"]), crops=[("شمام","Melon","Melon")])

add("sidra-f1-tomato", "seeds", 5,
    ("سيدرا F1 - طماطم هجين", "بذور طماطم هجينة عالية الإنتاجية.", "هجين F1", "تُزرع حسب الموسم الملائم لزراعة الطماطم في المنطقة.", ["إنتاجية عالية", "بذور هجينة مختارة"]),
    ("Sidra F1 - Tomate Hybride", "Semences de tomate hybride à haut rendement.", "Hybride F1", "À planter selon la saison adaptée à la culture de la tomate dans la région.", ["Haut rendement", "Semences hybrides sélectionnées"]),
    ("Sidra F1 - Hybrid Tomato", "High-yielding hybrid tomato seeds.", "F1 hybrid", "Planted according to the appropriate tomato-growing season in the region.", ["High yield", "Selected hybrid seeds"]), crops=[("طماطم","Tomate","Tomato")])

# ---------------- BIOSTIMULANTS — LIQUID ----------------
add("louni-silica", "biostimulants", 1,
    ("لوني سيليكا", "مركّب غذائي ووقائي يحتوي على البوتاسيوم والسيليكون، يعزز صلابة أنسجة النبات.", "سائل — بوتاسيوم وسيليكون", "يُستخدم عبر الري أو الرش لتقوية أنسجة النبات.", ["يعزز صلابة الأنسجة", "يحتوي على السيليكون النادر"]),
    ("Louni Silica", "Composé nutritif et préventif à base de potassium et de silicium, il renforce la solidité des tissus de la plante.", "Liquide — potassium et silicium", "Utilisé par irrigation ou pulvérisation pour renforcer les tissus végétaux.", ["Renforce la solidité des tissus", "Apport rare en silicium"]),
    ("Louni Silica", "A nutritional and preventive compound containing potassium and silicon, strengthening plant tissue firmness.", "Liquid — potassium and silicon", "Applied via irrigation or spraying to strengthen plant tissue.", ["Strengthens tissue firmness", "Rare silicon supply"]))

add("lounical", "biostimulants", 2,
    ("لونيكال", "كالسيوم ورقي للوقاية من تعفن نهاية الثمرة وزيادة صلابتها.", "كالسيوم ورقي سائل", "يُرش على الأوراق لتفادي تعفن نهاية الثمرة وتحسين صلابة الثمار.", ["يقي من تعفن نهاية الثمرة", "يحسّن صلابة الثمار"]),
    ("Lounical", "Calcium foliaire prévenant la nécrose apicale et augmentant la fermeté des fruits.", "Calcium foliaire liquide", "Pulvérisé sur le feuillage pour prévenir la nécrose apicale et améliorer la fermeté des fruits.", ["Prévient la nécrose apicale", "Améliore la fermeté des fruits"]),
    ("Lounical", "Foliar calcium that prevents blossom-end rot and increases fruit firmness.", "Liquid foliar calcium", "Sprayed on foliage to prevent blossom-end rot and improve fruit firmness.", ["Prevents blossom-end rot", "Improves fruit firmness"]))

add("salforik", "biostimulants", 3,
    ("سالفوريك", "يصحح نقص الكبريت ويحمي النبات من البياض الزغبي والعناكب.", "سائل — كبريت", "يُستخدم عبر الرش لتصحيح نقص الكبريت وتعزيز الحماية.", ["يصحح نقص الكبريت", "حماية إضافية ضد البياض الزغبي والعناكب"]),
    ("Salforik", "Corrige la carence en soufre et protège la plante contre le mildiou et les acariens.", "Liquide — soufre", "Utilisé par pulvérisation pour corriger la carence en soufre et renforcer la protection.", ["Corrige la carence en soufre", "Protection supplémentaire contre mildiou et acariens"]),
    ("Salforik", "Prevents and corrects sulfur deficiency and protects against downy mildew and mites.", "Liquid — sulfur", "Applied via spraying to correct sulfur deficiency and reinforce plant protection.", ["Corrects sulfur deficiency", "Extra protection against downy mildew and mites"]))

add("ankosy-cu-te-6", "biostimulants", 4,
    ("أنكوزي 6%", "يصحح نقص النحاس ويحمي من البياض الزغبي واللفحات والأمراض البكتيرية.", "سائل — نحاس 6%", "يُستخدم عبر الرش الورقي لتصحيح النقص والوقاية من الأمراض.", ["يصحح نقص النحاس", "وقاية من أمراض بكتيرية وفطرية"]),
    ("Ankosy 6%", "Corrige la carence en cuivre et protège contre le mildiou, les brûlures et les maladies bactériennes.", "Liquide — cuivre 6%", "Utilisé par pulvérisation foliaire pour corriger la carence et prévenir les maladies.", ["Corrige la carence en cuivre", "Protection contre maladies bactériennes et fongiques"]),
    ("Ankosy 6%", "Corrects copper deficiency and protects against downy mildew, blights and bacterial diseases.", "Liquid — copper 6%", "Applied via foliar spray to correct deficiency and prevent disease.", ["Corrects copper deficiency", "Protection against bacterial and fungal diseases"]))

add("fertibor", "biostimulants", 5,
    ("فيرتيبور", "مصحح لنقص البورون، عنصر أساسي في الإزهار والإخصاب.", "سائل — بورون", "يُستخدم عبر الرش لتصحيح نقص البورون في مراحل الإزهار.", ["يصحح نقص البورون", "يدعم مرحلة الإزهار"]),
    ("Fertibor", "Correcteur de carence en bore, un élément essentiel à la floraison et à la fécondation.", "Liquide — bore", "Utilisé par pulvérisation pour corriger la carence en bore lors de la floraison.", ["Corrige la carence en bore", "Soutient la phase de floraison"]),
    ("Fertibor", "A boron deficiency corrector, an element essential for flowering and fertilization.", "Liquid — boron", "Applied via spraying to correct boron deficiency during flowering stages.", ["Corrects boron deficiency", "Supports the flowering stage"]))

add("b-zincal-6", "biostimulants", 6,
    ("بي-زينكال", "مصحح لنقص البورون والزنك، عنصران أساسيان لنمو متوازن.", "سائل — بورون وزنك", "يُستخدم عبر الرش لتصحيح نقص البورون والزنك.", ["يصحح نقص البورون والزنك معًا", "يدعم النمو المتوازن"]),
    ("B-Zincal", "Correcteur de carences en bore et en zinc, deux éléments essentiels à une croissance équilibrée.", "Liquide — bore et zinc", "Utilisé par pulvérisation pour corriger les carences en bore et en zinc.", ["Corrige à la fois bore et zinc", "Soutient une croissance équilibrée"]),
    ("B-Zincal", "A boron and zinc deficiency corrector, two elements essential for balanced growth.", "Liquid — boron and zinc", "Applied via spraying to correct boron and zinc deficiencies.", ["Corrects both boron and zinc", "Supports balanced growth"]))

add("ounofert", "biostimulants", 7,
    ("أونوفرت", "محفز حيوي شامل يساعد النبات على تجاوز مختلف أنواع الإجهاد.", "محفز حيوي سائل", "يُستخدم عند تعرض النبات لظروف إجهاد (حراري، مائي...) لدعم تعافيه.", ["يقاوم مختلف أنواع الإجهاد", "يدعم تعافي النبات بسرعة"]),
    ("Ounofert", "Biostimulant global qui aide la plante à surmonter différents types de stress.", "Biostimulant liquide", "Utilisé lorsque la plante est exposée à des conditions de stress (thermique, hydrique...) pour soutenir son rétablissement.", ["Résiste à différents types de stress", "Favorise un rétablissement rapide"]),
    ("Ounofert", "A comprehensive biostimulant that helps the plant overcome all types of stress.", "Liquid biostimulant", "Used when the plant is exposed to stress conditions (heat, water...) to support recovery.", ["Helps resist various stress types", "Supports fast plant recovery"]))

add("vitazime", "biostimulants", 8,
    ("فيتازايم", "يزيد ويُسرّع الإنتاج ويحسّن جودة الثمار.", "محفز حيوي سائل", "يُستخدم لتحسين الإنتاجية وجودة الثمار خلال الموسم.", ["يسرّع الإنتاج", "يحسّن جودة الثمار"]),
    ("Vitazime", "Augmente et accélère la production et améliore la qualité des fruits.", "Biostimulant liquide", "Utilisé pour améliorer la productivité et la qualité des fruits durant la saison.", ["Accélère la production", "Améliore la qualité des fruits"]),
    ("Vitazime", "Increases and advances production and improves fruit quality.", "Liquid biostimulant", "Used to improve productivity and fruit quality throughout the season.", ["Accelerates production", "Improves fruit quality"]))

add("lounacid", "biostimulants", 9,
    ("لوناسيد", "مغذٍّ ومصحح لحمضنة خلطات الرش الورقي ومياه الري، ومساعد في إزالة انسداد النقاطات.", "سائل حمضي", "يُضاف إلى خلطات الرش أو مياه الري لضبط الحموضة وتفادي انسداد شبكة التنقيط.", ["يضبط حموضة المحلول", "يساعد على إزالة انسداد النقاطات"]),
    ("Lounacid", "Nutriment et correcteur pour l'acidification des bouillies foliaires, de l'eau d'irrigation, et le débouchage des goutteurs.", "Liquide acidifiant", "Ajouté aux bouillies de pulvérisation ou à l'eau d'irrigation pour ajuster l'acidité et éviter le colmatage des goutteurs.", ["Ajuste l'acidité de la solution", "Aide à déboucher les goutteurs"]),
    ("Lounacid", "A nutrient and corrector for acidifying foliar treatment mixtures, irrigation water, and unclogging drippers.", "Acidifying liquid", "Added to spray mixtures or irrigation water to adjust acidity and prevent drip line clogging.", ["Adjusts solution acidity", "Helps unclog drippers"]))

add("fertibest", "biostimulants", 10,
    ("فيرتيبيست", "محسّن مثالي لخصائص التربة.", "سائل — محسّن تربة", "يُستخدم لتحسين البنية والخصائص الحيوية للتربة.", ["يحسّن بنية التربة", "يدعم النشاط الحيوي للتربة"]),
    ("Fertibest", "L'améliorateur optimal des propriétés du sol.", "Liquide — améliorateur de sol", "Utilisé pour améliorer la structure et les propriétés biologiques du sol.", ["Améliore la structure du sol", "Soutient l'activité biologique du sol"]),
    ("Fertibest", "The optimal improver for soil properties.", "Liquid — soil improver", "Used to improve soil structure and biological properties.", ["Improves soil structure", "Supports soil biological activity"]))

add("hyoumi", "biostimulants", 11,
    ("هيومي", "يُستخدم لتحسين خصوبة التربة وتحفيزها حيويًا.", "سائل — أحماض هيوميك", "يُستخدم عبر الري لتحسين خصوبة التربة ونشاطها الحيوي.", ["يحسّن خصوبة التربة", "تحفيز حيوي طبيعي"]),
    ("Hyoumi", "Utilisé pour améliorer la fertilité du sol et le biostimuler.", "Liquide — acides humiques", "Utilisé par irrigation pour améliorer la fertilité et l'activité biologique du sol.", ["Améliore la fertilité du sol", "Biostimulation naturelle"]),
    ("Hyoumi", "Used to improve soil fertility and provide biostimulation.", "Liquid — humic acids", "Applied via irrigation to improve soil fertility and biological activity.", ["Improves soil fertility", "Natural biostimulation"]))

# ---------------- BIOSTIMULANTS — POWDER ----------------
add("calcifor", "biostimulants", 12,
    ("كالسيفور", "محسّن لجودة الثمار.", "مسحوق — كالسيوم", "يُستخدم لتحسين جودة الثمار خلال مرحلة النمو.", ["يحسّن جودة الثمار", "سهل الذوبان"]),
    ("Calcifor", "Améliorateur de la qualité des fruits.", "Poudre — calcium", "Utilisé pour améliorer la qualité des fruits durant la croissance.", ["Améliore la qualité des fruits", "Facile à dissoudre"]),
    ("Calcifor", "A fruit quality improver.", "Powder — calcium", "Used to improve fruit quality during the growth stage.", ["Improves fruit quality", "Easy to dissolve"]))

add("mangazen-powder", "biostimulants", 13,
    ("مانجازين", "مصحح لنقص الزنك والمنغنيز، ومحفز للنمو والإنتاجية.", "مسحوق — زنك ومنغنيز", "يُستخدم لتصحيح نقص الزنك والمنغنيز ودعم النمو.", ["يصحح نقص الزنك والمنغنيز", "يحفّز النمو والإنتاجية"]),
    ("Mangazen", "Correcteur des carences en zinc et manganèse, stimulateur de croissance et de productivité.", "Poudre — zinc et manganèse", "Utilisé pour corriger les carences en zinc et manganèse et soutenir la croissance.", ["Corrige les carences en zinc et manganèse", "Stimule croissance et productivité"]),
    ("Mangazen", "A zinc and manganese deficiency corrector and growth/productivity stimulator.", "Powder — zinc and manganese", "Used to correct zinc and manganese deficiency and support growth.", ["Corrects zinc and manganese deficiency", "Stimulates growth and productivity"]))

add("floristar", "biostimulants", 14,
    ("فلوريستار", "منشّط ومنظّم لعقد الثمار، يزيد الإزهار ويحسّن نمو النبات.", "مسحوق — منشط إزهار", "يُستخدم في مرحلة الإزهار لدعم عقد الثمار.", ["يزيد نسبة الإزهار", "يحسّن عقد الثمار"]),
    ("Floristar", "Tonique et régulateur de la nouaison, augmentant la floraison et améliorant la croissance de la plante.", "Poudre — stimulant de floraison", "Utilisé au stade de floraison pour soutenir la nouaison.", ["Augmente le taux de floraison", "Améliore la nouaison"]),
    ("Floristar", "A fruit-set tonic and organizer, increasing flowering and improving plant growth.", "Powder — flowering stimulant", "Used during the flowering stage to support fruit set.", ["Increases flowering rate", "Improves fruit set"]))

add("lounifer", "biostimulants", 15,
    ("لونيفر", "تقنية جديدة لعلاج وتصحيح نقص الحديد بكفاءة عالية.", "مسحوق — حديد", "يُستخدم لتصحيح نقص الحديد وعلاج اصفرار الأوراق.", ["تقنية حديثة لتصحيح نقص الحديد", "فعالية عالية"]),
    ("Lounifer", "Nouvelle technologie pour traiter et corriger avec excellence la carence en fer.", "Poudre — fer", "Utilisé pour corriger la carence en fer et traiter la chlorose.", ["Technologie récente de correction du fer", "Haute efficacité"]),
    ("Lounifer", "New technology to treat and correct iron deficiency with excellence.", "Powder — iron", "Used to correct iron deficiency and treat leaf chlorosis.", ["Modern iron-correction technology", "High efficiency"]))

add("orthofer", "biostimulants", 16,
    ("أورثوفر 6%", "كيلات حديد من نوع EDDHA، فعالة لتصحيح النقص الحاد.", "مسحوق — كيلات حديد EDDHA 6%", "يُستخدم عبر التربة أو الري لتصحيح نقص الحديد.", ["كيلات EDDHA عالية الثبات", "فعال في مختلف أنواع التربة"]),
    ("Orthofer 6%", "Chélate de fer de type EDDHA, efficace pour corriger les carences sévères.", "Poudre — chélate de fer EDDHA 6%", "Utilisé au sol ou par irrigation pour corriger la carence en fer.", ["Chélate EDDHA très stable", "Efficace dans divers types de sols"]),
    ("Orthofer 6%", "An EDDHA-type iron chelate, effective for correcting severe deficiencies.", "Powder — EDDHA iron chelate 6%", "Applied to soil or via irrigation to correct iron deficiency.", ["Highly stable EDDHA chelate", "Effective across various soil types"]))

add("hyoumifer", "biostimulants", 17,
    ("هيوميفر", "يعزز نمو البذور والجذور.", "مسحوق — أحماض هيوميك", "يُستخدم لتحفيز الإنبات وتقوية المجموع الجذري.", ["يقوّي المجموع الجذري", "يحفّز الإنبات"]),
    ("Humifer", "Renforce la croissance des graines et des racines.", "Poudre — acides humiques", "Utilisé pour stimuler la germination et renforcer le système racinaire.", ["Renforce le système racinaire", "Stimule la germination"]),
    ("Humifer", "Enhances seed and root growth.", "Powder — humic acids", "Used to stimulate germination and strengthen the root system.", ["Strengthens the root system", "Stimulates germination"]))

add("potassiomate", "biostimulants", 18,
    ("بوتاسيومات", "المحسّن الأمثل لخصائص التربة.", "مسحوق — بوتاسيوم", "يُستخدم لتحسين خصائص التربة ودعم توفر البوتاسيوم.", ["يحسّن خصائص التربة", "يدعم توفر البوتاسيوم"]),
    ("Potassiomate", "L'améliorateur optimal des propriétés du sol.", "Poudre — potassium", "Utilisé pour améliorer les propriétés du sol et soutenir la disponibilité du potassium.", ["Améliore les propriétés du sol", "Soutient la disponibilité du potassium"]),
    ("Potassiomate", "The optimal improver for soil properties.", "Powder — potassium", "Used to improve soil properties and support potassium availability.", ["Improves soil properties", "Supports potassium availability"]))

add("urehumate", "biostimulants", 19,
    ("أوريهومات", "يساعد على امتصاص العناصر الغذائية وتحمّل الظروف المناخية.", "مسحوق — يوريا وأحماض هيوميك", "يُستخدم لتحسين امتصاص العناصر الغذائية ومقاومة الإجهاد المناخي.", ["يحسّن امتصاص العناصر الغذائية", "يعزز تحمّل الظروف المناخية"]),
    ("Urehumate", "Aide à l'absorption des nutriments et à la tolérance aux conditions climatiques.", "Poudre — urée et acides humiques", "Utilisé pour améliorer l'absorption des nutriments et la résistance au stress climatique.", ["Améliore l'absorption des nutriments", "Renforce la tolérance climatique"]),
    ("Urehumate", "Aids in nutrient absorption and tolerance to climatic conditions.", "Powder — urea and humic acids", "Used to improve nutrient absorption and resistance to climatic stress.", ["Improves nutrient absorption", "Strengthens climatic tolerance"]))

add("pormag-powder", "biostimulants", 20,
    ("بورماغ", "محفز للنمو.", "مسحوق — بورون ومغنيزيوم", "يُستخدم لدعم مراحل النمو المختلفة للنبات.", ["يحفّز النمو العام", "يجمع بين البورون والمغنيزيوم"]),
    ("Bormag", "Stimulateur de croissance.", "Poudre — bore et magnésium", "Utilisé pour soutenir les différents stades de croissance de la plante.", ["Stimule la croissance générale", "Combine bore et magnésium"]),
    ("Bormag", "A growth stimulator.", "Powder — boron and magnesium", "Used to support the plant's various growth stages.", ["Stimulates overall growth", "Combines boron and magnesium"]))

add("b-zincal-powder", "biostimulants", 21,
    ("بي-زينكال (مسحوق)", "مصحح لنقص البورون والزنك.", "مسحوق — بورون وزنك", "يُستخدم لتصحيح نقص البورون والزنك.", ["يصحح نقص البورون والزنك", "صيغة مسحوق سهلة التخزين"]),
    ("B-Zincal (Poudre)", "Correcteur des carences en bore et en zinc.", "Poudre — bore et zinc", "Utilisé pour corriger les carences en bore et en zinc.", ["Corrige les carences en bore et en zinc", "Formulation poudre facile à stocker"]),
    ("B-Zincal (Powder)", "A boron and zinc deficiency corrector.", "Powder — boron and zinc", "Used to correct boron and zinc deficiencies.", ["Corrects boron and zinc deficiency", "Easy-to-store powder formulation"]))

add("fernon", "biostimulants", 22,
    ("فيرنون", "لزيادة عقد الثمار والإزهار ونمو الثمار.", "مسحوق — محفز إزهار وعقد", "يُستخدم في مرحلة الإزهار والعقد لتحسين الإنتاجية.", ["يزيد عقد الثمار", "يحسّن الإزهار ونمو الثمار"]),
    ("Fernon", "Pour augmenter la nouaison, la floraison et la croissance des fruits.", "Poudre — stimulant de floraison et nouaison", "Utilisé au stade de floraison et de nouaison pour améliorer la productivité.", ["Augmente la nouaison", "Améliore la floraison et la croissance des fruits"]),
    ("Fernon", "To increase fruit set, flowering, and fruit growth.", "Powder — flowering and fruit-set stimulant", "Used during flowering and fruit-set stages to improve productivity.", ["Increases fruit set", "Improves flowering and fruit growth"]))

add("fernitral", "biostimulants", 23,
    ("فيرنيترال", "منظّم للآزوت ومصحح لنقص الحديد.", "مسحوق — آزوت وحديد", "يُستخدم لتنظيم التغذية الآزوتية وتصحيح نقص الحديد.", ["ينظّم التغذية الآزوتية", "يصحح نقص الحديد"]),
    ("Fernitral", "Régulateur d'azote et correcteur de carence en fer.", "Poudre — azote et fer", "Utilisé pour réguler la nutrition azotée et corriger la carence en fer.", ["Régule la nutrition azotée", "Corrige la carence en fer"]),
    ("Fernitral", "A nitrogen regulator and iron deficiency corrector.", "Powder — nitrogen and iron", "Used to regulate nitrogen nutrition and correct iron deficiency.", ["Regulates nitrogen nutrition", "Corrects iron deficiency"]))

add("microstar", "biostimulants", 24,
    ("ميكروستار", "محفز حيوي ومضاد للإجهاد.", "مسحوق — عناصر صغرى", "يُستخدم لمساعدة النبات على تجاوز فترات الإجهاد.", ["مضاد للإجهاد", "يحتوي على عناصر صغرى ضرورية"]),
    ("Microstar", "Biostimulant et anti-stress.", "Poudre — oligo-éléments", "Utilisé pour aider la plante à surmonter les périodes de stress.", ["Effet anti-stress", "Contient des oligo-éléments essentiels"]),
    ("Microstar", "A biostimulant and anti-stress product.", "Powder — trace elements", "Used to help the plant overcome periods of stress.", ["Anti-stress effect", "Contains essential trace elements"]))

add("super-alga", "biostimulants", 25,
    ("سوبر-ألجا", "طحالب بحرية لزيادة الإنتاج ومقاومة الإجهاد.", "مسحوق — مستخلص طحالب بحرية", "يُستخدم لتحفيز النمو ومقاومة ظروف الإجهاد.", ["مستخلص طحالب طبيعي", "يحسّن مقاومة الإجهاد"]),
    ("Super-Alga", "Algues marines pour augmenter la production et résister au stress.", "Poudre — extrait d'algues marines", "Utilisé pour stimuler la croissance et la résistance au stress.", ["Extrait d'algues naturel", "Améliore la résistance au stress"]),
    ("Super-Alga", "Seaweed extract to increase production and resist stress.", "Powder — seaweed extract", "Used to stimulate growth and resistance to stress conditions.", ["Natural seaweed extract", "Improves stress resistance"]))

add("microfast-powder", "biostimulants", 26,
    ("ميكروفاست", "للوقاية من نقص العناصر الصغرى وتصحيحها.", "مسحوق — عناصر صغرى متعددة", "يُستخدم وقائيًا أو علاجيًا لتغطية نقص العناصر الصغرى.", ["يغطي عدة عناصر صغرى دفعة واحدة", "وقائي وعلاجي"]),
    ("Microfast", "Pour la prévention et la correction des carences en oligo-éléments.", "Poudre — oligo-éléments multiples", "Utilisé en prévention ou en traitement pour couvrir les carences en oligo-éléments.", ["Couvre plusieurs oligo-éléments à la fois", "Effet préventif et curatif"]),
    ("Microfast", "For the prevention and correction of trace element deficiencies.", "Powder — multiple trace elements", "Used preventively or curatively to cover trace element deficiencies.", ["Covers several trace elements at once", "Preventive and curative effect"]))

# ================= توليد SQL =================

lines = []
lines.append("-- ============================================================")
lines.append("-- FERTI SAFE — Seed Data (مولّد تلقائيًا من scripts/gen_seed.py)")
lines.append("-- الفئات الست الفعلية + 61 منتجًا حقيقيًا (أسماء مستخرجة من")
lines.append("-- lounisagriculture.com، وصف معاد صياغته بالكامل بأسلوب FERTI SAFE،")
lines.append("-- دون اختراع أي نسبة أو معلومة تقنية غير مؤكدة).")
lines.append("-- شغّله في Supabase SQL Editor بعد schema.sql")
lines.append("-- ============================================================\n")

# categories
lines.append("insert into categories (slug, icon, sort_order) values")
cat_vals = ",\n".join(f"  ('{c[0]}', '{c[1]}', {c[2]})" for c in CATEGORIES)
lines.append(cat_vals + "\non conflict (slug) do nothing;\n")

for idx, loc in enumerate(["ar", "fr", "en"]):
    lines.append(f"insert into category_translations (category_id, locale, name, description) values")
    rows = []
    for c in CATEGORIES:
        name, desc = c[3 + idx]
        rows.append(f"  ((select id from categories where slug='{c[0]}'), '{loc}', '{esc(name)}', '{esc(desc)}')")
    lines.append(",\n".join(rows) + "\non conflict do nothing;\n")

# products
lines.append("insert into products (slug, category_id, sort_order) values")
prod_rows = []
for p in P:
    prod_rows.append(f"  ('{p['slug']}', (select id from categories where slug='{p['cat']}'), {p['order']})")
lines.append(",\n".join(prod_rows) + "\non conflict (slug) do nothing;\n")

for idx, loc in enumerate(["ar", "fr", "en"]):
    lines.append(f"insert into product_translations (product_id, locale, name, description, technical_info, usage_info, features, suitable_crops) values")
    rows = []
    for p in P:
        name, desc, tech, usage, feats = p[loc]
        feats_json = json.dumps(feats, ensure_ascii=False)
        crops_list = [c[idx] for c in p["crops"]] if p["crops"] else []
        crops_json = json.dumps(crops_list, ensure_ascii=False)
        rows.append(
            f"  ((select id from products where slug='{p['slug']}'), '{loc}', "
            f"'{esc(name)}', '{esc(desc)}', '{esc(tech)}', '{esc(usage)}', "
            f"'{esc(feats_json)}'::jsonb, '{esc(crops_json)}'::jsonb)"
        )
    lines.append(",\n".join(rows) + "\non conflict do nothing;\n")

# company settings translations (homepage hero)
lines.append("""insert into company_settings_translations (locale, hero_title, hero_subtitle, about_text) values
  ('ar', 'نزرع الثقة... ونحمي نموك', 'شريكك الموثوق في التسميد وحماية المحاصيل — منتجات مختارة بعناية لخدمة الفلاح الجزائري.', 'FERTI SAFE شركة جزائرية متخصصة في الأسمدة ومدخلات الإنتاج الزراعي، نرافق الفلاح بمنتجات موثوقة ودعم فني حقيقي.'),
  ('fr', 'Nous cultivons la confiance... et protégeons votre croissance', 'Votre partenaire de confiance pour la fertilisation et la protection des cultures — des produits sélectionnés au service de l''agriculteur algérien.', 'FERTI SAFE est une entreprise algérienne spécialisée dans les engrais et intrants agricoles, aux côtés de l''agriculteur avec des produits fiables et un accompagnement technique réel.'),
  ('en', 'We grow trust... and protect your growth', 'Your trusted partner in fertilization and crop protection — carefully selected products serving the Algerian farmer.', 'FERTI SAFE is an Algerian company specialized in fertilizers and agricultural inputs, standing by the farmer with reliable products and real technical support.')
on conflict (locale) do update set
  hero_title = excluded.hero_title, hero_subtitle = excluded.hero_subtitle, about_text = excluded.about_text;
""")

out = "\n".join(lines)
with open("supabase/seed.sql", "w", encoding="utf-8") as f:
    f.write(out)

print(f"OK — {len(P)} منتجًا، {len(CATEGORIES)} فئات. حجم الملف: {len(out)} حرف")
