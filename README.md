# Animal Facts

Una enciclopedia navegable por especie animal que documenta, con datos factuales y
fuentes citadas, los distintos ámbitos en los que los animales son explotados por
la industria humana: alimentaria, vestimenta, experimentación y entretenimiento.

## Objetivo del proyecto

- Servir como fuente de datos verificables para personas en transición hacia el
  veganismo y para quienes necesitan datos citables en debates sobre bienestar animal.
- Todo el contenido es **curado y revisado manualmente** antes de publicarse. No se
  genera contenido en tiempo real para el usuario final.
- El registro editorial es **factual y documental**, evitando lenguaje gráfico o
  sensacionalista — los datos por sí mismos son la base del argumento.

## Estructura del proyecto

```
animal-facts/
├── backend/          API/BFF que sirve los datos del catálogo
├── frontend/          Aplicación web (React)
└── data/
    └── animals/        Ficheros de datos por especie (JSON), curados manualmente
```

## Modelo de datos

Cada animal se modela como:

```
Animal
  └── Ámbito de explotación (alimentaria | vestimenta | experimentación | entretenimiento)
        └── Industria/uso concreto
              ├── Datos factuales
              ├── Fuente(s) citada(s)
              └── Alcance geográfico (opcional)
```

Ver `data/animals/_schema.json` para el esquema completo.

## Estado

Proyecto en construcción activa. Ver Issues para el roadmap actual.
