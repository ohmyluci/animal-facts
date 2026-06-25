# CLAUDE.md

Este fichero define las convenciones del proyecto Animal Facts. Léelo por completo
antes de implementar cualquier ticket.

## Qué es este proyecto

Una enciclopedia navegable por especie animal. Cada animal tiene una ficha con los
ámbitos en los que es explotado (alimentaria, vestimenta, experimentación,
entretenimiento), cada uno con datos factuales y fuentes citadas.

## Reglas editoriales (NO NEGOCIABLES)

Estas reglas aplican a cualquier contenido de `data/animals/`, sea generado por un
humano o propuesto por un agente:

1. **Todo dato debe llevar fuente.** Ningún hecho, cifra o afirmación se publica sin
   un campo `source` verificable (informe de ONG, legislación, estudio científico,
   organismo oficial). Si no hay fuente fiable disponible, el campo debe quedar
   marcado como `"verified": false` y no debe mergearse a `main` sin revisión humana.
2. **Tono factual y documental.** Describe
   condiciones, espacios, duraciones y métodos con precisión técnica. Puede describir
   sufrimiento físico con detalle narrativo o sensorial. El dato factual es contundente
   por sí mismo, pero narrar la realidad que viven los animales es necesario para 
   generar la empatia necesaria.
3. **Ningún contenido en `data/animals/` se considera publicable sin revisión humana
   explícita.** Un agente puede proponer contenido nuevo en una rama/PR, pero nunca
   debe mergear directamente a `main`.
4. **No generación en tiempo real.** El catálogo es contenido estático versionado en
   el repo. No se debe implementar generación de contenido vía LLM en el camino de
   petición del usuario final (esto incluye el backend/API en producción).

## Estructura del repo

```
animal-facts/
├── backend/      API/BFF en Node.js + TypeScript + Express
├── frontend/     React + TypeScript
└── data/
    └── animals/  Un fichero JSON por especie, ver _schema.json
```

## Convenciones técnicas

- **Lenguaje:** TypeScript en todo el proyecto (backend y frontend).
- **Backend:** Express, estructura por capas (routes / controllers / services).
  Lee los datos de `data/animals/*.json`, no necesita base de datos en esta fase.
- **Frontend:** React con componentes funcionales y hooks. Sin gestor de estado
  externo todavía (Context API es suficiente para el alcance actual).
- **Tests:** cualquier nueva función en backend debe incluir un test unitario
  (Jest). No se considera un ticket completo sin tests que pasen.
- **Commits:** mensajes en español, formato `tipo: descripción breve`
  (ej. `feat: añadir endpoint de listado de animales`).

## Flujo de trabajo esperado de un agente

1. Lee el ticket de Jira/issue asignado completo, incluyendo comentarios.
2. Si el ticket implica añadir contenido a `data/animals/`, sigue las reglas
   editoriales arriba — cita fuentes reales, no inventes datos.
3. Implementa en una rama nueva, nunca directamente en `main`.
4. Ejecuta los tests existentes antes de abrir el PR.
5. Abre un PR con un resumen claro de qué se hizo y por qué.
6. Nunca mergees el PR automáticamente. Un humano revisa y aprueba.

## Qué NO debe hacer un agente en este repo

- No modificar `_schema.json` sin que el ticket lo pida explícitamente.
- No añadir dependencias nuevas sin justificarlo en el PR.
- No publicar datos de bienestar animal sin fuente citada.
- No usar `rm -rf`, comandos de red no solicitados, ni tocar configuración de CI/CD
  salvo que el ticket sea específicamente sobre eso.
