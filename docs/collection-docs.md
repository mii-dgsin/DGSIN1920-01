# Documentación proyecto DGSIN1920-01

-----------
Fuente de los datos: <https://data.world/hhaveliw/world-university-ranking-2016>

## Acceder a todas las universidades

* Petición
  * GET  <https://dgsin1920-01.herokuapp.com/api/v1/colletion>
* Respuesta:
  
  ```json
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
	},...
   ]
  ...

## Acceder a todas las estadísticas de una universidad en concreto:

* Petición
  * GET <https://dgsin1920-01.herokuapp.com/api/v1/collection/:name>
  * Por ejemplo: GET <https://dgsin1920-01.herokuapp.com/api/v1/collection/Harvard_University>
* Respuesta:

  ```json
   [
	{
		"name": "Harvard University",
		"country": "United States of America",
		"teaching_rating": 99.7,
		"industry_income_rating": 34.5,
		"total_score": 96.1,
		"year": "2012"
	}
   ]
   ...

## Cargar la BD si está vacía

* Petición
  * GET <https://dgsin1920-01.herokuapp.com/api/v1/collection/loadInitialData>
* Respuesta
  * BD vacía:

  ```html
  201 Created
  ```

  * BD no vacía:
  
  ```html
  409 Conflict
  ```

## Incluir un dato nuevo

* Petición
  * POST <https://dgsin1920-13.herokuapp.com/api/v1/collection/>
  * Cuerpo:
  
  ```json
  {
    "name": "Harvard University",
		"country": "United States of America",
		"teaching_rating": 99.7,
		"industry_income_rating": 34.5,
		"total_score": 96.1,
		"year": "2012"
  ```

* Respuesta

  ```html
  201 Created
  ```

## Eliminar una colección completa

* Petición
  * DELETE <https://dgsin1920-13.herokuapp.com/api/v1/collection/>
* Respuesta:
  * La colección existe:
  
  ```html
  204 No Content
  ```

  * La colección no existe:
  
  ```html
  404 Not Found
  ```

## Eliminar una universidad en concreto

* Petición
  * DELETE <https://dgsin1920-13.herokuapp.com/api/v1/sensores/:name>
  * Por ejemplo: DELETE <https://dgsin1920-13.herokuapp.com/api/v1/collection/Harvard_University>
* Respuesta:

  ```html
  204 No Content
  ```
  
 ## Actualizar un dato en concreto

* Petición
  * PUT <https://dgsin1920-13.herokuapp.com/api/v1/collection/Harvard_University>
  * Cuerpo:
  
   ```json
   
	{
		"name": "Harvard University",
		"country": "United States of America",
		"teaching_rating": 99.7,
		"industry_income_rating": 34.5,
		"total_score": 96.1,
		"year": "2012"
	}
   ...

* Respuesta
  
  ```json
  
	{
		"name": "Harvard University",
		"country": "United States of America",
		"teaching_rating": 99.7,
		"industry_income_rating": 34.5,
		"total_score": 96.1,
		"year": "2012"
	}
   ...
 