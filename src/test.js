// // src/analysis.js
// const express = require('express');
// const router = express.Router();

// // Function to perform basic code analysis
// function analyzeCode(code) {
//   if (!code) return { error: 'No code provided' };

//   const codeLines = code.split('\n');  // Split the code into lines
//   const analysisResults = [];

//   // Analyze each line
//   codeLines.forEach((line, index) => {
//     let explanation = '';

//     explanation = explainClassDeclaration(line) ||
//                   explainVariableDeclaration(line) ||
//                   explainMethodDeclaration(line, 'MyClass') ||
//                   explainAccessModifiers(line) ||
//                   explainInheritance(line) ||
//                   explainInterface(line) ||
//                   explainPolymorphism(line) ||
//                   explainEncapsulation(line) ||
//                   explainAbstraction(line) ||
//                   explainExceptions(line) ||
//                   explainCollections(line) ||
//                   explainGenerics(line) ||
//                   explainLambdaExpressions(line) ||
//                   explainStreams(line) ||
//                   explainSystemOut(line) ||
//                   explainScanner(line); 

//     analysisResults.push({
//       lineNumber: index + 1,
//       line: line.trim(),
//       explanation: explanation || 'No relevant concept found.'
//     });
//   });

//   return { analysisResults };
// }

// // POST endpoint for code analysis
// router.post('/', (req, res) => {
//   const { code } = req.body;

//   if (!code) {
//     return res.status(400).json({ error: 'Code is required' });
//   }

//   const analysisResult = analyzeCode(code);
//   res.json(analysisResult);
// });

// module.exports = router;

// // Function definitions for explanations (same as in the provided code)
// function explainClassDeclaration(line) {
//   let explanation = '';
  
//   const classMatch = line.match(/class\s+(\w+)\s*(extends\s+\w+)?\s*(implements\s+.+)?/);
//   if (classMatch) {
//     const className = classMatch[1];
//     const inheritance = classMatch[2] ? `, which extends '${classMatch[2].replace("extends ", "")}'` : "";
//     const interfaces = classMatch[3] ? ` and implements '${classMatch[3].replace("implements ", "")}'` : "";
//     explanation = `This is a class declaration for a class named '${className}'${inheritance}${interfaces}. Classes are templates for creating objects and can inherit properties and behaviors from other classes (via 'extends') or be obligated to implement methods from an interface (via 'implements').`;
//   }

//   return explanation || "No class declaration found.";
// }

// function explainVariableDeclaration(line) {
//   let explanation = '';
  
//   const varAssignment = line.match(/(byte|short|int|long|float|double|char|boolean|String)\s+(\w+)(\s*\[\])?\s*=\s*(.*);/);
//   if (varAssignment) {
//     const dataType = varAssignment[1];
//     const varName = varAssignment[2];
//     const isArray = varAssignment[3] ? " (array)" : "";
//     const varValue = varAssignment[4];
//     explanation = `Variable '${varName}' of type '${dataType}'${isArray} is assigned the value '${varValue}'. Basic data types like '${dataType}' define the kind of data this variable can hold, and arrays allow storing multiple values of that type.`;
//   }

//   return explanation || "No variable declaration found.";
// }

// function explainMethodDeclaration(line, className) {
//   let explanation = '';
  
//   const methodMatch = line.match(/(public|private|protected|static|void|int|boolean|String)\s+(\w+)\s*\(.*\)\s*\{/);
//   if (methodMatch) {
//     const returnType = methodMatch[1];
//     const methodName = methodMatch[2];
    
//     if (methodName === className) {
//       explanation = `This is a constructor for the class '${methodName}', used to initialize new instances of this class. Constructors have no return type and are named after the class.`;
//     } else {
//       explanation = `Method '${methodName}' is declared with return type '${returnType}'. Methods perform operations and can return a result based on the return type.`;
//     }

//     if (line.includes("...")) {
//       explanation += " This method uses varargs, allowing it to accept a variable number of arguments.";
//     }
//   }

//   return explanation || "No method declaration found.";
// }

// function explainAccessModifiers(line) {
//   let explanation = '';
  
//   const accessModifierMatch = line.match(/(public|private|protected)\s+/);
//   if (accessModifierMatch) {
//     const accessModifier = accessModifierMatch[1];
//     explanation = `'${accessModifier}' is an access modifier that controls the visibility of this method or variable. Public elements are accessible everywhere, private elements are accessible only within the class, and protected elements are accessible in the same package and subclasses.`;
//   }

//   return explanation || "No access modifier found.";
// }

// function explainInheritance(line) {
//   let explanation = '';
  
//   const inheritanceMatch = line.match(/class\s+(\w+)\s+extends\s+(\w+)/);
//   if (inheritanceMatch) {
//     const subclass = inheritanceMatch[1];
//     const superclass = inheritanceMatch[2];
//     explanation = `The class '${subclass}' extends '${superclass}', inheriting properties and methods. Inheritance allows '${subclass}' to reuse and build upon '${superclass}' while also being able to override its methods.`;
//   }

//   const overrideMatch = line.match(/@Override\s+public\s+(\w+)\s+(\w+)\s*\(.*\)/);
//   if (overrideMatch) {
//     const methodName = overrideMatch[2];
//     explanation = `The '@Override' annotation here indicates that the method '${methodName}' redefines a superclass method, allowing '${methodName}' to provide specific behavior in the subclass.`;
//   }

//   if (line.includes("super(")) {
//     explanation = `The 'super' keyword here calls the superclass constructor, helping initialize inherited properties.`;
//   } else if (line.includes("super.")) {
//     explanation = `The 'super' keyword here accesses a method or field from the superclass, useful for modifying inherited behavior.`;
//   }

//   return explanation || "No inheritance-related concept found.";
// }

// function explainInterface(line) {
//   let explanation = '';
  
//   const interfaceMatch = line.match(/interface\s+(\w+)\s*(extends\s+\w+)?/);
//   if (interfaceMatch) {
//     const interfaceName = interfaceMatch[1];
//     explanation = `This is an interface declaration for an interface named '${interfaceName}'. Interfaces define a contract that classes must adhere to. If the interface extends another interface, the implementing class must provide implementations for all methods of both interfaces.`;
//   }

//   return explanation || "No interface declaration found.";
// }

// function explainPolymorphism(line) {
//   let explanation = '';
  
//   const polymorphismMatch = line.match(/(\w+)\s*=\s*(\w+)\s*\(\w+\)/);
//   if (polymorphismMatch) {
//     const referenceType = polymorphismMatch[1];
//     const objectType = polymorphismMatch[2];
//     explanation = `This demonstrates polymorphism. The variable '${referenceType}' holds an object of type '${objectType}', allowing methods specific to '${objectType}' to be invoked, even though the reference type is '${referenceType}'.`;
//   }

//   return explanation || "No polymorphism-related concept found.";
// }

// function explainEncapsulation(line) {
//   let explanation = '';
  
//   const encapsulationMatch = line.match(/private\s+(\w+)\s+(\w+);/);
//   if (encapsulationMatch) {
//     const dataType = encapsulationMatch[1];
//     const varName = encapsulationMatch[2];
//     explanation = `The variable '${varName}' of type '${dataType}' is encapsulated by making it private. This ensures that the variable can only be accessed and modified through public getter and setter methods, providing control over how the variable is used.`;
//   }

//   return explanation || "No encapsulation-related concept found.";
// }

// function explainAbstraction(line) {
//   let explanation = '';
  
//   const abstractMethodMatch = line.match(/abstract\s+\w+\s+(\w+)\s*\(.*\)\s*;/);
//   if (abstractMethodMatch) {
//     const methodName = abstractMethodMatch[1];
//     explanation = `This is an abstract method named '${methodName}' declared in an abstract class. Abstract methods do not have a body and must be implemented by concrete subclasses.`;
//   }

//   return explanation || "No abstraction-related concept found.";
// }

// function explainExceptions(line) {
//   let explanation = '';
  
//   const throwMatch = line.match(/throw\s+new\s+(\w+)\s*\(.*\)/);
//   if (throwMatch) {
//     const exceptionType = throwMatch[1];
//     explanation = `This line throws an exception of type '${exceptionType}'. Throwing an exception allows the program to signal that an error has occurred, and the exception can be caught and handled in a try-catch block.`;
//   }

//   return explanation || "No exception-related concept found.";
// }

// function explainCollections(line) {
//   let explanation = '';
  
//   const collectionMatch = line.match(/List<\w+>\s+\w+\s*=\s*new\s+ArrayList<>();/);
//   if (collectionMatch) {
//     explanation = `This line declares and initializes a list using the ArrayList class. Collections like lists are used to store groups of objects. An ArrayList can dynamically resize as elements are added or removed.`;
//   }

//   return explanation || "No collection-related concept found.";
// }

// function explainGenerics(line) {
//   let explanation = '';
  
//   const genericMatch = line.match(/List<(\w+)>/);
//   if (genericMatch) {
//     const genericType = genericMatch[1];
//     explanation = `This line uses generics to create a List of type '${genericType}'. Generics allow the definition of classes, interfaces, and methods with type parameters, ensuring type safety and flexibility.`;
//   }

//   return explanation || "No generics-related concept found.";
// }

// function explainLambdaExpressions(line) {
//   let explanation = '';
  
//   const lambdaMatch = line.match(/\(\w+\)\s*->\s*\w+/);
//   if (lambdaMatch) {
//     explanation = `This line uses a lambda expression to define a concise way to write anonymous methods. The left part of '->' defines the parameters, and the right part defines the method body.`;
//   }

//   return explanation || "No lambda expression found.";
// }

// function explainStreams(line) {
//   let explanation = '';
  
//   const streamMatch = line.match(/\w+\.\w+\(\w+\)/);
//   if (streamMatch) {
//     explanation = `This line uses streams to perform operations like filtering or mapping on a collection. Streams allow declarative processing of collections and can be chained together for more complex operations.`;
//   }

//   return explanation || "No stream operation found.";
// }

// function explainSystemOut(line) {
//   let explanation = '';
  
//   const systemOutMatch = line.match(/System\.out\.println\((.*)\);/);
//   if (systemOutMatch) {
//     explanation = `This line prints the message '${systemOutMatch[1]}' to the console. 'System.out' is the standard output stream, and 'println' prints the message followed by a newline.`;
//   }

//   return explanation || "No System.out.println found.";
// }

// function explainScanner(line) {
//   let explanation = '';
  
//   const scannerMatch = line.match(/Scanner\s+(\w+)\s*=\s*new\s+Scanner\(System\.in\);/);
//   if (scannerMatch) {
//     const scannerName = scannerMatch[1];
//     explanation = `This line creates a new 'Scanner' object named '${scannerName}' that reads input from the user through the console. The 'System.in' parameter specifies that input is taken from the standard input stream.`;
//   }

//   return explanation || "No Scanner object found.";
// }

// src/analysis.js
const express = require('express');
const router = express.Router();

function analyzeCode(code) {
  if (!code || code.trim().length === 0) {
    return { error: 'Code cannot be empty' };
  }

  console.log('Received code:', code); // Log the received code

  const codeLines = code.split('\n');  // Split the code into lines
  const analysisResults = [];

  // Analyze each line
  codeLines.forEach((line, index) => {
    // Skip blank lines
    if (line.trim().length === 0) {
      return;
    }

    let explanation = '';

    // Check for various Java concepts
    explanation = checkForImport(line) || 
                  checkForMainMethod(line) || 
                  checkForMainClass(line) || 
                  checkForVariableDeclaration(line) || 
                  checkForArrayDeclaration(line);  // Properly chain the array check here

    // Log the explanation to debug if no explanation was found
    if (explanation) {
      console.log(`Line ${index + 1}:`, explanation);
    }

    analysisResults.push({
      lineNumber: index + 1,
      line: line.trim(),
      explanation: explanation || 'No relevant concept found on this line.'
    });
  });

  return { analysisResults };
}

router.post('/', (req, res) => {
  const { code } = req.body;

  if (!code || code.trim().length === 0) {
    return res.status(400).json({ error: 'Code is required' });
  }

  const analysisResult = analyzeCode(code);
  res.json(analysisResult);
});

module.exports = router;

// Function to identify import statements
function checkForImport(line) {
  if (line.trim().startsWith('import')) {
    return 'This is an import statement. It is used to include external classes or packages into the current file.';
  }
  return '';  // Return empty string if not an import statement
}

// Function to identify the main class
function checkForMainClass(line) {
  const mainClassPattern = /\bpublic\s+class\s+Main\s*\{/;
  if (mainClassPattern.test(line.trim())) {
    return 'This is the main class. It typically contains the main method and serves as the entry point of the Java program.';
  }
  return '';  // Return empty string if not the main class
}

// Function to identify the main method
function checkForMainMethod(line) {
  const mainMethodPattern = /\bpublic\s+static\s+void\s+main\s*\(\s*String\[\]\s*args\s*\)/;
  if (mainMethodPattern.test(line.trim())) {
    return 'This is the main method. It serves as the entry point for Java applications.';
  }
  return '';  // Return empty string if not the main method
}

// Function to identify variable declarations and assignments
function checkForVariableDeclaration(line) {
  const varAssignment = line.match(/(byte|short|int|long|float|double|char|boolean|String)\s+(\w+)(\s*\[\])?\s*=\s*(.*);/);
  if (varAssignment) {
    const dataType = varAssignment[1];
    const varName = varAssignment[2];
    const isArray = varAssignment[3] ? " (array)" : "";
    const varValue = varAssignment[4];
    return `Variable '${varName}' of type '${dataType}'${isArray} is assigned the value '${varValue}'. Basic data types like '${dataType}' define the kind of data this variable can hold, and arrays allow storing multiple values of that type.`;
  }
  return '';  // Return empty string if not a variable declaration
}

// Function to identify array declarations (single and multidimensional)
function checkForArrayDeclaration(line) {
  const trimmedLine = line.trim();  // Remove extra spaces

  // Check if the line contains array declaration by looking for square brackets
  if (trimmedLine.includes('[') && trimmedLine.includes(']')) {
    // Detect the type of array
    const arrayDeclaration = trimmedLine.match(/(byte|short|int|long|float|double|char|boolean|String)\s+\w+/);

    if (arrayDeclaration) {
      const dataType = arrayDeclaration[1];  // The type of the array (e.g., int, String)

      // Count how many sets of square brackets [] are present to determine dimensions
      const dimensionCount = (trimmedLine.match(/\[\]/g) || []).length;

      // Single-dimensional array
      if (dimensionCount === 1) {
        return `Single-dimensional array of type '${dataType}' is defined. Arrays store multiple values of the same type in a sequential manner.`;
      }

      // Multi-dimensional array
      if (dimensionCount > 1) {
        return `Multidimensional array of type '${dataType}' is defined. Multidimensional arrays allow storing values in multiple dimensions.`;
      }
    }
  }

  return '';  // Return empty if no array declaration is found
}
