# Wave Collapse Algorithm in React TypeScript

This project is the implementation of the Wave Collapse algorithm in React framework, using TypeScript. The application aims to provide practice in both reactivity and algorithm implementation.

 
<div style="display: flex; flex-direction: row;">
    <img src="https://github.com/abuska/WaveCollapsePractice/assets/22191436/3f8b2ab5-6717-44fb-b7e8-b8722edae863" alt="Image 1" style="width: 200px;">
    <img src="https://github.com/abuska/WaveCollapsePractice/assets/22191436/781fc7db-7703-4c54-b669-b1690ea67c38" alt="Image 2" style="width: 200px;">
</div>

## Installation and Usage

1. **Installation**:

```bash
npm install
```

2. **Installation**:
```bash
npm start
```
## Key Features
The project provides the implementation of the Wave Collapse algorithm.
The code is divided into multiple components, facilitating separation of concerns, which contributes to easier maintenance and scalability of the project.
The application is built in React framework and utilizes TypeScript, enhancing code safety and readability.

## Application Architecture
The application consists of the following main parts:

hooks directory: Contains various custom React Hooks necessary for the application, such as useMainComponent, which manages the functionality of the main component.
models directory: Contains type definitions necessary for modeling the application, such as TileType and CellType.
utils directory: Contains constants and utility methods required for the application's operation.

## Future improvements (todo)

1. Backtracking System: To ensure a successful execution, implementing a backtracking system could be beneficial. This would allow the algorithm to backtrack one or more steps when it reaches a dead end and explore alternative paths until it finds a solution.
2. Pre-Selection of Tiles: Providing the option for pre-selection of tiles can greatly enhance user freedom and creativity. Users can select and pre-place tiles they want to use during the generation process.
3. Weighting of Tiles: Allowing the weighting of tiles enables users to determine the probability of certain tiles during generation. This empowers users to influence the outcome and customize the application according to their unique preferences.
4. User Interface Enhancement: Further development of the user interface, including improving interactions, adding user-friendly features, and enhancing overall user experience.
5. Extended Functionality: Adding new features such as different generation modes or introducing custom configuration options that allow users to customize the application and broaden its usage.

