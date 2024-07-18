# Reto # 1 Genesis - Encontremos a Mateo 🕵️‍♂️

## Requisitos 🚀

Antes de comenzar, necesitas instalar las siguientes herramientas:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart ⚡

Para comenzar con el reto, sigue los pasos a continuación:

1. Instala las dependencias:

```
git clone https://github.com/Estrategia-e-innovacion-de-TI/Reto-Genesis-Encontrar-a-Mateo.git
cd RetoGenesis
yarn install
```

2. Ejecuta una red local en el primer terminal:

```
yarn chain
```

Este comando inicia una red de Ethereum local usando Hardhat. La red se ejecuta en tu máquina local y se puede usar para pruebas y desarrollo. Puedes personalizar la configuración de la red en `packages/hardhat/hardhat.config.ts`.

3. En un segundo terminal, puedes desplegar los contratos en la red Blockchain:

```
yarn deploy
```

4. En un tercer terminal, inicia tu aplicación NextJS:

```
yarn start
```

Visita tu aplicación en: http://localhost:3000. 

5.  Ejecuta pruebas de contratos inteligentes con:

```
yarn test
```

6. Para desplegar tu dApp en un servidor web puedes ejecutar:
```
yarn vercel
```


## Descripción del Reto - Encuentra a Mateo 🔍 

### Objetivo 🎯

El objetivo del reto es completar las funciones más importantes del contrato GenesisToken.sol para crear tokens que representen avatares con diferentes atributos. A través de este reto, aprenderás a trabajar con contratos inteligentes en Solidity.

### Instrucciones  📝

1. Completar las Funciones: En el contrato GenesisToken.sol, encontrarás varias funciones con comentarios detallados que explican cada paso necesario para completar la implementación. Tu tarea es completar estas funciones siguiendo los pasos indicados.
2. Probar el Contrato: Una vez que hayas completado las funciones, despliega el contrato en la red local y pruébalo utilizando la aplicación frontend proporcionada.
3. Encontrar a Mateo: Como parte del reto, deberás acuñar un token que represente a "Mateo" con atributos específicos. Una vez que hayas acuñado el token, verifica su correcta creación y visualización a través de la aplicación.
4. Terminar la historia de Mateo respondiendo las siguientes preguntas: ¿Dónde estaba Mateo?, ¿Dónde lo encontraron?, ¿Por qué se fue?, ¿Qué estaba haciendo mientras estaba desaparecido?, ¿Quién lo ayudó durante su ausencia?, ¿Cómo se siente ahora que ha sido encontrado?, ¿Qué lecciones hemos aprendido de su desaparición?

### ¡Buena suerte! 🍀
Diviértete mientras aprendes y ayudas a encontrar a Mateo. ¡Buena suerte, equipo! 🚀
