# Documentación proyecto DGSIN1920-01

------------------------------
Crear una nueva universidad:
Petición:
POST .../collection
{
"name": "University of Granada",
"country": "Spain",
"teaching_rating": 24.3,
"industry_income_rating": 29.4,
"total_score": 72.3,
"year": 2016
}

Respuesta:
201 CREATED
Acceder a todas las universidades:
Petición:
GET .../ collection
Respuesta:
[
{
"name": "University of North Carolina at Chapel Hill",
"country": "United States of America",
"teaching_rating": 67.6,
"industry_income_rating": 35.5,
"total_score": 69.3,
"year": "2012"
},
{
"name": "New York University",
"country": "United States of America",
"teaching_rating": 60.2,
"industry_income_rating": 30.9,
"total_score": 69 ,
"year": "2012"
},

... ]
Petición:
DELETE .../ collection
Respuesta:
204 DELETED
Acceder a todas las estadísticas de Harvard University:
Petición:
GET .../ collection / Harvard University
Respuesta:
{
"name": "Harvard University",
"country": "United States of America",
"teaching_rating": 99.7,
"industry_income_rating": 34.5,
"total_score": 96.1,
"year": "2012"
}

Actualizar una estadística:
Petición:
PUT .../collection/Harvard University
{
"name": "Harvard University",
"country": "United States of America",
"teaching_rating": 50 ,
"industry_income_rating": 50 ,
"total_score": 50 ,
"year": 2020
}

Respuesta:
{
"name": "Harvard University",
"country": "United States of America",
"teaching_rating": 50 ,
"industry_income_rating": 50 ,
"total_score": 50 ,
"year": 2020
}

Petición:
DELETE .../collection /Harvard University
Respuesta:
204 DELETED
PUT .../collection
Respuesta:
405 METHOD NOT ALLOWED