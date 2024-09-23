module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest", // Transforma arquivos .ts
  },
  moduleFileExtensions: ["ts", "js"], // Permite .ts e .js
  testPathIgnorePatterns: ["/node_modules/", "/dist/"], // Ignora essas pastas
};
