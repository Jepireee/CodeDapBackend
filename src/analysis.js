const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { code } = req.body;

  if (!code || code.trim().length === 0) {
    return res.status(400).json({ error: 'Code is required' });
  }

  const analysisResult = analyzeCode(code);
  res.json(analysisResult);
});

module.exports = router;

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

    let explanations = [];

    // Check for various Java concepts and accumulate explanations
    const importExplanation = checkForImport(line);
    if (importExplanation) explanations.push(importExplanation);

    const commentsExplanation = checkForComments(line);
    if (commentsExplanation) explanations.push(commentsExplanation);

    const IOExplanation = checkForJavaIO(line);
    if (IOExplanation) explanations.push(IOExplanation);

    const mainMethodExplanation = explainJavaMainMethod(line);
    if (mainMethodExplanation) explanations.push(mainMethodExplanation);

    const variableDeclarationExplanation = checkForVariableDeclaration(line);
    if (variableDeclarationExplanation) explanations.push(variableDeclarationExplanation);

    const arithmeticExplanation = explainJavaArithmeticOperators(line);
    if (arithmeticExplanation) explanations.push(arithmeticExplanation);

    const assignmentExplanation = explainJavaAssignmentOperators(line);
    if (assignmentExplanation) explanations.push(assignmentExplanation);

    const relationalExplanation = explainJavaRelationalOperators(line);
    if (relationalExplanation) explanations.push(relationalExplanation);

    const logicalExplanation = explainJavaLogicalOperators(line);
    if (logicalExplanation) explanations.push(logicalExplanation);

    const unaryExplanation = explainJavaUnaryOperators(line);
    if (unaryExplanation) explanations.push(unaryExplanation);

    const bitwiseExplanation = explainJavaBitwiseOperators(line);
    if (bitwiseExplanation) explanations.push(bitwiseExplanation);

    const instanceofExplanation = explainJavaInstanceofOperator(line);
    if (instanceofExplanation) explanations.push(instanceofExplanation);

    const ternaryExplanation = explainJavaTernaryOperator(line);
    if (ternaryExplanation) explanations.push(ternaryExplanation);

    const ifElseExplanation = explainJavaIfElseStatement(line);
    if (ifElseExplanation) explanations.push(ifElseExplanation);

    const forLoopExplanation = explainJavaForLoop(line);
    if (forLoopExplanation) explanations.push(forLoopExplanation);

    const forEachLoopExplanation = explainJavaForEachLoop(line);
    if (forEachLoopExplanation) explanations.push(forEachLoopExplanation);

    const whileLoopExplanation = explainJavaWhileLoop(line);
    if (whileLoopExplanation) explanations.push(whileLoopExplanation);

    const doStatementExplanation = explainJavaDoStatement(line);
    if (doStatementExplanation) explanations.push(doStatementExplanation);

    const breakStatementExplanation = explainJavaBreakStatement(line);
    if (breakStatementExplanation) explanations.push(breakStatementExplanation);

    const continueStatementExplanation = explainJavaContinueStatement(line);
    if (continueStatementExplanation) explanations.push(continueStatementExplanation);

    const switchCaseExplanation = explainJavaSwitchCaseStatement(line);
    if (switchCaseExplanation) explanations.push(switchCaseExplanation);

    const classExplanation = explainJavaClass(line);
    if (classExplanation) explanations.push(classExplanation);

    const extendsExplanation = explainJavaExtends(line);
    if (extendsExplanation) explanations.push(extendsExplanation);

    const implementsExplanation = explainJavaImplements(line);
    if (implementsExplanation) explanations.push(implementsExplanation);

    const classExtendsImplementsExplanation = explainJavaClassExtendsImplements(line);
    if (classExtendsImplementsExplanation) explanations.push(classExtendsImplementsExplanation);

    const interfaceExplanation = explainJavaInterface(line);
    if (interfaceExplanation) explanations.push(interfaceExplanation);

    const constructorExplanation = explainJavaConstructors(line);
    if (constructorExplanation) {
      explanations.push(constructorExplanation);
    } else {
      const methodExplanation = explainJavaMethods(line);
      if (methodExplanation) {
        explanations.push(methodExplanation);
      }
    }

    const methodCallExplanation = explainJavaMethodCalls(line);
    if (methodCallExplanation) explanations.push(methodCallExplanation);

    const stringMethodExplanation = explainJavaStringMethods(line);
    if (stringMethodExplanation) explanations.push(stringMethodExplanation);

    const objectCreationExplanation = explainJavaObjectCreation(line);
    if (objectCreationExplanation) explanations.push(objectCreationExplanation);

    const thisKeywordExplanation = explainJavaThisKeyword(line);
    if (thisKeywordExplanation) explanations.push(thisKeywordExplanation);

    const finalKeywordExplanation = explainJavaFinalKeyword(line);
    if (finalKeywordExplanation) explanations.push(finalKeywordExplanation);

    const overrideAnnotationExplanation = explainJavaOverrideAnnotation(line);
    if (overrideAnnotationExplanation) explanations.push(overrideAnnotationExplanation);

    const superKeywordExplanation = explainJavaSuperKeyword(line);
    if (superKeywordExplanation) explanations.push(superKeywordExplanation);

    const abstractClassExplanation = explainJavaAbstractClass(line);
    if (abstractClassExplanation) explanations.push(abstractClassExplanation);

    const abstractMethodExplanation = explainJavaAbstractMethod(line);
    if (abstractMethodExplanation) explanations.push(abstractMethodExplanation);

    

    // Combine all explanations for the line
    const combinedExplanation = explanations.join('\n');

    // Log the explanation to debug if no explanation was found
    if (combinedExplanation) {
      console.log(`Line ${index + 1}:`, combinedExplanation);
    }

    analysisResults.push({
      lineNumber: index + 1,
      line: line.trim(),
      explanation: combinedExplanation || 'No relevant concept found on this line.'
    });
  });

  return { analysisResults };
}


// Function to identify import statements
function checkForImport(line) {
  if (line.trim().startsWith('import')) {
    return 'This is an import statement. It is used to include external classes or packages into the current file.';
  }
  return '';  // Return empty string if not an import statement
}

// Function to identify comments
function checkForComments(line) {
  const trimmedLine = line.trim();
  if (trimmedLine.startsWith('//')) {
    return 'This is a single-line comment. It is used to add brief explanations or notes in the code.';
  } else if (trimmedLine.startsWith('/*')) {
    return 'This is the start of a multi-line comment. It is used to add detailed explanations or notes that span multiple lines.';
  } else if (trimmedLine.startsWith('*')) {
    return 'This is a continuation of a multi-line comment.';
  } else if (trimmedLine.endsWith('*/')) {
    return 'This is the end of a multi-line comment.';
  }
  return '';  // Return empty string if not a comment
}

function checkForJavaIO(line) {
  const trimmedLine = line.trim();
  if (trimmedLine.startsWith('System.out.println')) {
    return 'This is a Java output statement using System.out.println. It prints the given message to the console followed by a new line.';
  } else if (trimmedLine.startsWith('System.out.print')) {
    return 'This is a Java output statement using System.out.print. It prints the given message to the console without a new line.';
  } else if (trimmedLine.includes('new Scanner')) {
    return 'This is a Java input statement using Scanner. It reads input from various sources like keyboard input.';
  }
  return '';  // Return empty string if not a Java I/O statement
}

function explainJavaMainMethod(line) {
  let explanation = '';
  // Fixed the regex pattern to escape the square brackets for String[].
  const mainMethodMatch = line.match(/\bpublic\s+static\s+void\s+main\(\s*String\[\]\s+[a-zA-Z0-9_]+\)\s*\{/);
  if (mainMethodMatch) {
    explanation = `This is the main method declaration. It is the entry point of a Java application, and it is where the program starts execution.`;
  }
  return explanation;
}


// Function to identify variable declarations and assignments
function checkForVariableDeclaration(line) {
  let explanations = [];

  // Trim whitespace for consistent parsing
  line = line.trim();

  // Handle variable declarations and assignments
  if (line.match(/(byte|short|int|long|float|double|char|boolean|String)\s+\w+\s*=\s*.*;/) && line.includes("[")) {
    // Split the line into left and right parts
    const parts = line.split("=");
    const leftPart = parts[0].trim();
    const rightPart = parts[1]?.trim() || "";

    // Parse the left part for data type, variable name, and array dimensions
    const leftParts = leftPart.split(" ");
    const dataType = leftParts[0];
    const varName = leftParts[1]?.split("[")[0].trim();
    
    // Check if array is initialized and count dimensions
    const dimensions = (leftPart.match(/\[\s*\]/g) || []).length;

    if (rightPart.startsWith("new")) {
      explanations.push(
        `Array '${varName}' of type '${dataType}' with ${dimensions} dimension(s) is initialized using 'new'.`
      );
    } else {
      explanations.push(
        `Array '${varName}' of type '${dataType}' with ${dimensions} dimension(s) is assigned the value '${rightPart}'.`
      );
    }
  }

  // Handle variable declarations without assignments
  if (line.includes("[") && line.includes(";") && !line.includes("=")) {
    // Parse the left part for data type, variable name, and array dimensions
    const leftPart = line.trim();

    const leftParts = leftPart.split(" ");
    const dataType = leftParts[0];
    const varName = leftParts[1]?.split("[")[0].trim();

    // Check for array dimensions
    const dimensions = (leftPart.match(/\[\s*\]/g) || []).length;

    explanations.push(
      `Array '${varName}' of type '${dataType}' with ${dimensions} dimension(s) is declared.`
    );
  }

  // Match variable declarations and assignments
  const varAssignment = line.match(/(byte|short|int|long|float|double|char|boolean|String)\s+(\w+)(\s*(\[\s*\])+)?\s*=\s*(.*);/);
  if (varAssignment && !line.includes("[")) { // Ensure it's not an array declaration or assignment
    const dataType = varAssignment[1];
    const varName = varAssignment[2];
    const varValue = varAssignment[5].trim();
    explanations.push(`Variable '${varName}' of type '${dataType}' is assigned the value '${varValue}'.`);
  }

  // Match variable declarations without assignments
  const varDeclaration = line.match(/(byte|short|int|long|float|double|char|boolean|String)\s+(\w+)(\s*(\[\s*\])+)?;/);
  if (varDeclaration && !line.includes("[")) { // Ensure it's not an array declaration
    const dataType = varDeclaration[1];
    const varName = varDeclaration[2];
    explanations.push(`Variable '${varName}' of type '${dataType}' is declared.`);
  }

  // Match array element assignments
  const arrayElementAssignment = line.match(/(\w+)\[(\d+)\]\s*=\s*([^;]+);/);
  if (arrayElementAssignment) {
    const arrayName = arrayElementAssignment[1].trim();
    const index = arrayElementAssignment[2].trim();
    const value = arrayElementAssignment[3].trim();
    explanations.push(`Element at index ${index} of array '${arrayName}' is assigned the value '${value}'.`);
  }

  // Match array assignments like data = new double[10];
  const arrayAssignment = line.match(/(\w+)\s*=\s*new\s+([a-zA-Z0-9_]+)\s*\[([^\]]+)\];/);
  if (arrayAssignment) {
    const varName = arrayAssignment[1].trim();
    const dataType = arrayAssignment[2].trim();
    const size = arrayAssignment[3].trim();
    explanations.push(`Array '${varName}' of type '${dataType}' is initialized with size ${size}.`);
  }

  // Match array copying
  const arrayCopy = line.match(/System\.arraycopy\((\w+),\s*(\d+),\s*(\w+),\s*(\d+),\s*(\d+)\);/);
  if (arrayCopy) {
    const srcArray = arrayCopy[1];
    const srcPos = arrayCopy[2];
    const destArray = arrayCopy[3];
    const destPos = arrayCopy[4];
    const length = arrayCopy[5];
    explanations.push(`Array copy from '${srcArray}' starting at index ${srcPos} to '${destArray}' starting at index ${destPos} for ${length} elements.`);
  }

  return explanations;
}

function explainJavaArithmeticOperators(line) {
  let explanation = '';
  const arithmeticMatch = line.match(/([a-zA-Z0-9_]+)\s*=\s*([a-zA-Z0-9_+\-*/%()\s]*[+\-*/%][a-zA-Z0-9_+\-*/%()\s]*[+\-*/%][a-zA-Z0-9_+\-*/%()\s]*)/);
  if (arithmeticMatch) {
    const variable = arithmeticMatch[1].trim();
    const expression = arithmeticMatch[2].trim();
    const textExpression = expression
      .replace(/\+/g, ' plus ')
      .replace(/-/g, ' minus ')
      .replace(/\*/g, ' multiplied by ')
      .replace(/\//g, ' divided by ')
      .replace(/%/g, ' modulus of ');
    explanation = `${variable} is equal to ${textExpression}`;
  }
  return explanation;
}

function explainJavaAssignmentOperators(line) {
  let explanation = '';
  const assignmentMatch = line.match(/([a-zA-Z0-9_]+)\s*=\s*(?!new\s+[a-zA-Z0-9_]+\s*\[)([^=+\-*/%&|^!~<>;]+);/);
  if (assignmentMatch && !line.includes('new')) {
    const variable = assignmentMatch[1].trim();
    const value = assignmentMatch[2].trim();
    explanation = `${variable} is assigned the value of ${value}`;
  }
  return explanation;
}

function explainJavaRelationalOperators(line) {
  let explanation = '';
  const relationalMatch = line.match(/([a-zA-Z0-9_]+)\s*(==|!=|>|<|>=|<=)\s*([a-zA-Z0-9_]+)/);
  if (relationalMatch) {
    const leftOperand = relationalMatch[1].trim();
    const operator = relationalMatch[2].trim();
    const rightOperand = relationalMatch[3].trim();
    const operatorText = {
      '==': 'is equal to',
      '!=': 'is not equal to',
      '>': 'is greater than',
      '<': 'is less than',
      '>=': 'is greater than or equal to',
      '<=': 'is less than or equal to'
    };
    explanation = `${leftOperand} ${operatorText[operator]} ${rightOperand}`;
  }
  return explanation;
}

function explainJavaLogicalOperators(line) {
  let explanation = '';
  const logicalMatch = line.match(/([a-zA-Z0-9_]+)\s*(\|\||&&)\s*([a-zA-Z0-9_]+)/);
  if (logicalMatch) {
    const leftOperand = logicalMatch[1].trim();
    const operator = logicalMatch[2].trim();
    const rightOperand = logicalMatch[3].trim();
    const operatorText = {
      '||': 'or',
      '&&': 'and'
    };
    explanation = `${leftOperand} ${operatorText[operator]} ${rightOperand}`;
  }
  return explanation;
}

function explainJavaUnaryOperators(line) {
  let explanation = '';
  const unaryMatch = line.match(/([+\-!~]{1,2})([a-zA-Z0-9_]+)|([a-zA-Z0-9_]+)([+\-!~]{1,2})/);
  if (unaryMatch) {
    let operator, operand;
    if (unaryMatch[1]) {
      operator = unaryMatch[1].trim();
      operand = unaryMatch[2].trim();
    } else {
      operand = unaryMatch[3].trim();
      operator = unaryMatch[4].trim();
    }
    const operatorText = {
      '+': 'positive',
      '-': 'negative',
      '!': 'not',
      '~': 'bitwise complement of',
      '++': 'increment',
      '--': 'decrement'
    };
    explanation = `${operatorText[operator]} ${operand}`;
  }
  return explanation;
}

function explainJavaBitwiseOperators(line) {
  let explanation = '';
  const bitwiseMatch = line.match(/([a-zA-Z0-9_]+)\s*(&|\||\^|<<|>>|>>>|&=|\|=|\^=|<<=|>>=|>>>=)\s*([a-zA-Z0-9_]+)/);
  if (bitwiseMatch) {
    const leftOperand = bitwiseMatch[1].trim();
    const operator = bitwiseMatch[2].trim();
    const rightOperand = bitwiseMatch[3].trim();
    const operatorText = {
      '&': 'bitwise AND',
      '|': 'bitwise OR',
      '^': 'bitwise XOR',
      '<<': 'left shift',
      '>>': 'right shift',
      '>>>': 'unsigned right shift',
      '&=': 'bitwise AND assignment',
      '|=': 'bitwise OR assignment',
      '^=': 'bitwise XOR assignment',
      '<<=': 'left shift assignment',
      '>>=': 'right shift assignment',
      '>>>=': 'unsigned right shift assignment'
    };
    explanation = `${leftOperand} ${operatorText[operator]} ${rightOperand}`;
  }
  return explanation;
}

function explainJavaInstanceofOperator(line) {
  let explanation = '';
  const instanceofMatch = line.match(/([a-zA-Z0-9_]+)\s+instanceof\s+([a-zA-Z0-9_]+)/);
  if (instanceofMatch) {
    const variable = instanceofMatch[1].trim();
    const type = instanceofMatch[2].trim();
    explanation = `${variable} is an instance of ${type}`;
  }
  return explanation;
}

function explainJavaTernaryOperator(line) {
  let explanation = '';
  const ternaryMatch = line.match(/([a-zA-Z0-9_]+)\s*=\s*([a-zA-Z0-9_]+)\s*\?\s*([a-zA-Z0-9_]+)\s*:\s*([a-zA-Z0-9_]+)/);
  if (ternaryMatch) {
    const variable = ternaryMatch[1].trim();
    const condition = ternaryMatch[2].trim();
    const trueExpression = ternaryMatch[3].trim();
    const falseExpression = ternaryMatch[4].trim();
    explanation = `${variable} is assigned ${trueExpression} if ${condition} is true, otherwise ${falseExpression}`;
  }
  return explanation;
}

function explainJavaIfElseStatement(line) {
  let explanation = '';
  const elseIfMatch = line.match(/else\s+if\s*\(([^)]+)\)\s*{/);
  const ifMatch = line.match(/if\s*\(([^)]+)\)\s*{/);
  const elseMatch = line.match(/else\s*{/);

  if (elseIfMatch) {
    const condition = elseIfMatch[1].trim();
    explanation = `This is an else if statement. If (${condition}) is true, the code inside the else if block is executed.`;
  } else if (ifMatch) {
    const condition = ifMatch[1].trim();
    explanation = `This is an if statement. If (${condition}) is true, the code inside the if block is executed.`;
  } else if (elseMatch) {
    explanation = `This is an else statement. If none of the previous conditions are true, the code inside the else block is executed.`;
  }

  return explanation;
}

function explainJavaForLoop(line) {
  let explanation = '';
  const forLoopMatch = line.match(/for\s*\(([^;]+);([^;]+);([^)]+)\)\s*/);
  if (forLoopMatch) {
    const initialization = forLoopMatch[1].trim();
    const condition = forLoopMatch[2].trim();
    const increment = forLoopMatch[3].trim();
    explanation = `This is a for loop. It starts with the initialization: ${initialization}, continues as long as the condition (${condition}) is true, and increments with: ${increment}.`;
  }
  return explanation;
}

function explainJavaForEachLoop(line) {
  let explanation = '';
  const forEachLoopMatch = line.match(/for\s*\(([^:]+):([^)]+)\)\s*/);
  if (forEachLoopMatch) {
    const variable = forEachLoopMatch[1].trim();
    const collection = forEachLoopMatch[2].trim();
    explanation = `This is a for-each loop. It iterates over each element in the collection: ${collection}, with the current element being: ${variable}.`;
  }
  return explanation;
}

function explainJavaWhileLoop(line) {
  let explanation = '';
  const whileLoopMatch = line.match(/while\s*\(([^)]+)\)\s*/);
  if (whileLoopMatch) {
    const condition = whileLoopMatch[1].trim();
    explanation = `This is a while loop. It continues to execute as long as the condition (${condition}) is true.`;
  }
  return explanation;
}

function explainJavaDoStatement(line) {
  let explanation = '';
  const doMatch = line.match(/do\s*{/);
  if (doMatch) {
    explanation = `This is a do statement. It executes the code block once before checking the condition in the following while statement.`;
  }
  return explanation;
}

function explainJavaBreakStatement(line) {
  let explanation = '';
  const breakMatch = line.match(/\bbreak\b\s*;/);
  if (breakMatch) {
    explanation = `This is a break statement. It terminates the nearest enclosing loop or switch statement.`;
  }
  return explanation;
}

function explainJavaContinueStatement(line) {
  let explanation = '';
  const continueMatch = line.match(/\bcontinue\b\s*;/);
  if (continueMatch) {
    explanation = `This is a continue statement. It skips the current iteration of the nearest enclosing loop and proceeds with the next iteration.`;
  }
  return explanation;
}

function explainJavaSwitchCaseStatement(line) {
  let explanation = '';
  const switchMatch = line.match(/switch\s*\(([^)]+)\)\s*{/);
  const caseMatch = line.match(/\bcase\b\s+([^:]+)\s*:/);
  const defaultMatch = line.match(/\bdefault\b\s*:/);

  if (switchMatch) {
    const expression = switchMatch[1].trim();
    explanation = `This is a switch statement. It evaluates the expression (${expression}) and executes the corresponding case block based on the value of the expression.`;
  } else if (caseMatch) {
    const caseValue = caseMatch[1].trim();
    explanation = `This is a case block in a switch statement. If the switch expression matches the value (${caseValue}), the code inside this case block is executed.`;
  } else if (defaultMatch) {
    explanation = `This is a default block in a switch statement. If none of the case values match the switch expression, the code inside this default block is executed.`;
  }

  return explanation;
}

function explainJavaClass(line) {
  let explanation = '';
  const classMatch = line.match(/\bclass\b\s+([a-zA-Z0-9_]+)\s*{/);
  if (classMatch) {
    const className = classMatch[1].trim();
    explanation = `This is a class declaration. The class '${className}' defines a blueprint for objects.`;
  }
  return explanation;
}

function explainJavaExtends(line) {
  let explanation = '';
  const extendsMatch = line.match(/\bclass\b\s+([a-zA-Z0-9_]+)\s+extends\s+([a-zA-Z0-9_]+)\s*{/);
  if (extendsMatch) {
    const className = extendsMatch[1].trim();
    const parentClassName = extendsMatch[2].trim();
    explanation = `This is an inheritance declaration. The class '${className}' inherits from the class '${parentClassName}'.`;
  }
  return explanation;
}

function explainJavaImplements(line) {
  let explanation = '';
  const implementsMatch = line.match(/\bclass\b\s+([a-zA-Z0-9_]+)\s+implements\s+([a-zA-Z0-9_,\s]+)\s*{/);
  if (implementsMatch) {
    const className = implementsMatch[1].trim();
    const interfaces = implementsMatch[2].trim().split(/\s*,\s*/).join(', ');
    explanation = `This is an implementation declaration. The class '${className}' implements the interfaces: ${interfaces}.`;
  }
  return explanation;
}

function explainJavaClassExtendsImplements(line) {
  let explanation = '';
  const extendsImplementsMatch = line.match(/\bclass\b\s+([a-zA-Z0-9_]+)\s+extends\s+([a-zA-Z0-9_]+)\s+implements\s+([a-zA-Z0-9_,\s]+)\s*{/);
  if (extendsImplementsMatch) {
    const className = extendsImplementsMatch[1].trim();
    const parentClassName = extendsImplementsMatch[2].trim();
    const interfaces = extendsImplementsMatch[3].trim().split(/\s*,\s*/).join(', ');
    explanation = `This is a class declaration. The class '${className}' inherits from the class '${parentClassName}' and implements the interfaces: ${interfaces}.`;
  }
  return explanation;
}

function explainJavaObjectCreation(line) {
  let explanation = '';
  const objectCreationMatch = line.match(/\bnew\b\s+([a-zA-Z0-9_]+)\s*\(/);
  if (objectCreationMatch) {
    const className = objectCreationMatch[1].trim();
    explanation = `This is an object creation. The 'new' keyword creates an instance of the '${className}' class.`;
  }
  return explanation;
}

function explainJavaInterface(line) {
  let explanation = '';
  const interfaceMatch = line.match(/\binterface\b\s+([a-zA-Z0-9_]+)\s*{/);
  if (interfaceMatch) {
    const interfaceName = interfaceMatch[1].trim();
    explanation = `This is an interface named '${interfaceName}'. It defines methods that classes must implement.`;
  }
  return explanation;
}

function explainJavaMethods(line) {
  let explanation = '';
  const methodMatch = line.match(/(public|protected|private)\s+(static\s+)?([a-zA-Z0-9_<>]+)\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*{/);
  if (methodMatch && !line.includes('class') && !line.includes('interface')) {
    const accessModifier = methodMatch[1].trim();
    const returnType = methodMatch[3].trim();
    const methodName = methodMatch[4].trim();
    explanation = `This is a method declaration. The method '${methodName}' with return type '${returnType}' is declared with '${accessModifier}' access modifier.`;
  }
  return explanation;
}

function explainJavaConstructors(line) {
  let explanation = '';
  const constructorMatch = line.match(/(public|protected|private)\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*{/);
  if (constructorMatch && !line.includes('class') && !line.includes('interface') && !line.includes('void')) {
    const accessModifier = constructorMatch[1].trim();
    const constructorName = constructorMatch[2].trim();
    explanation = `This is a ${accessModifier} constructor. The constructor '${constructorName}' initializes new objects of the class.`;
  }
  return explanation;
}

function explainJavaMethodCalls(line) {
  let explanation = '';
  const methodCallMatch = line.match(/([a-zA-Z0-9_]+)\.([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*;/);
  if (methodCallMatch) {
    const objectName = methodCallMatch[1].trim();
    const methodName = methodCallMatch[2].trim();
    explanation = `This is a method call. The method '${methodName}' is called on the object '${objectName}'.`;
  }
  return explanation;
}

function explainJavaStringMethods(line) {
  let explanation = '';
  const stringMethodMatch = line.match(/\.([a-zA-Z0-9_]+)\s*\(/);
  if (stringMethodMatch) {
    const methodName = stringMethodMatch[1].trim();
    switch (methodName) {
      case 'contains':
        explanation = `The 'contains()' method checks whether the string contains a substring.`;
        break;
      case 'substring':
        explanation = `The 'substring()' method returns the substring of the string.`;
        break;
      case 'join':
        explanation = `The 'join()' method joins the given strings using the delimiter.`;
        break;
      case 'replace':
        explanation = `The 'replace()' method replaces the specified old character with the specified new character.`;
        break;
      case 'replaceAll':
        explanation = `The 'replaceAll()' method replaces all substrings matching the regex pattern.`;
        break;
      case 'replaceFirst':
        explanation = `The 'replaceFirst()' method replaces the first matching substring.`;
        break;
      case 'charAt':
        explanation = `The 'charAt()' method returns the character present in the specified location.`;
        break;
      case 'getBytes':
        explanation = `The 'getBytes()' method converts the string to an array of bytes.`;
        break;
      case 'indexOf':
        explanation = `The 'indexOf()' method returns the position of the specified character in the string.`;
        break;
      case 'compareTo':
        explanation = `The 'compareTo()' method compares two strings in the dictionary order.`;
        break;
      case 'compareToIgnoreCase':
        explanation = `The 'compareToIgnoreCase()' method compares two strings, ignoring case differences.`;
        break;
      case 'trim':
        explanation = `The 'trim()' method removes any leading and trailing whitespaces.`;
        break;
      case 'format':
        explanation = `The 'format()' method returns a formatted string.`;
        break;
      case 'split':
        explanation = `The 'split()' method breaks the string into an array of strings.`;
        break;
      case 'toLowerCase':
        explanation = `The 'toLowerCase()' method converts the string to lowercase.`;
        break;
      case 'toUpperCase':
        explanation = `The 'toUpperCase()' method converts the string to uppercase.`;
        break;
      case 'valueOf':
        explanation = `The 'valueOf()' method returns the string representation of the specified argument.`;
        break;
      case 'toCharArray':
        explanation = `The 'toCharArray()' method converts the string to a char array.`;
        break;
      case 'matches':
        explanation = `The 'matches()' method checks whether the string matches the given regex.`;
        break;
      case 'startsWith':
        explanation = `The 'startsWith()' method checks if the string begins with the given string.`;
        break;
      case 'endsWith':
        explanation = `The 'endsWith()' method checks if the string ends with the given string.`;
        break;
      case 'isEmpty':
        explanation = `The 'isEmpty()' method checks whether a string is empty or not.`;
        break;
      case 'intern':
        explanation = `The 'intern()' method returns the canonical representation of the string.`;
        break;
      case 'contentEquals':
        explanation = `The 'contentEquals()' method checks whether the string is equal to charSequence.`;
        break;
      case 'hashCode':
        explanation = `The 'hashCode()' method returns a hash code for the string.`;
        break;
      case 'subSequence':
        explanation = `The 'subSequence()' method returns a subsequence from the string.`;
        break;
      case 'length':
        explanation = `The 'length()' method finds the total number of characters in a string.`;
        break;
      case 'concat':
        explanation = `The 'concat()' method joins two strings. It adds one string to another, creating a new string.`;
        break;
      case 'equals':
        explanation = `The 'equals()' method compares the content of two strings.`;
        break;
      default:
        explanation = `This is a string method call.`;
    }
  } else if (line.includes('\\"')) {
    explanation = `This line handles special characters within strings (e.g., \\" for double quotes).`;
  }
  return explanation;
}

function explainJavaThisKeyword(line) {
  let explanation = '';
  const thisMatch = line.match(/\bthis\b/);
  if (thisMatch) {
    explanation = `This line contains the 'this' keyword. It refers to the current instance of the class, used to access instance variables or methods.`;
  }
  return explanation;
}

function explainJavaFinalKeyword(line) {
  let explanation = '';
  const finalMatch = line.match(/\bfinal\b/);
  if (finalMatch) {
    if (line.includes("class")) {
      explanation = `This is the 'final' keyword applied to a class. A 'final' class cannot be subclassed or inherited.`;
    } else if (line.includes("method")) {
      explanation = `This is the 'final' keyword applied to a method. A 'final' method cannot be overridden by subclasses.`;
    } else if (line.includes("int") || line.includes("String") || line.includes("char") || line.includes("boolean") || line.includes("double")) {
      explanation = `This is the 'final' keyword applied to a variable. The 'final' variable 'AGE' is assigned a value and cannot be reassigned. In this case, 'AGE' is assigned the value '32', and once assigned, it cannot be changed.`;
    }
  }
  return explanation;
}

function explainJavaOverrideAnnotation(line) {
  let explanation = '';
  if (line.includes('@Override')) {
    explanation = `This is the '@Override' annotation. It indicates that the method is intended to override a method from its superclass.`;
  }
  return explanation;
}

function explainJavaSuperKeyword(line) {
  let explanation = '';
  if (line.includes('super')) {
    explanation = `This is the 'super' keyword. It is used to refer to the superclass or parent class. It can be used to call the parent class constructor or methods.`;
  }
  return explanation;
}

function explainJavaAbstractClass(line) {
  let explanation = '';
  if (line.includes('abstract class')) {
    const classMatch = line.match(/\babstract class\b\s+([a-zA-Z0-9_]+)\s*{/);
    if (classMatch) {
      const className = classMatch[1].trim();
      explanation = `This is an abstract class declaration. The class '${className}' cannot be instantiated directly and must be inherited by other classes.`;
    }
  }
  return explanation;
}

function explainJavaAbstractMethod(line) {
  let explanation = '';
  if (line.includes('abstract')) {
    const methodMatch = line.match(/\babstract\s+([a-zA-Z0-9_<>]+)\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*;/);
    if (methodMatch) {
      const returnType = methodMatch[1].trim();
      const methodName = methodMatch[2].trim();
      explanation = `This is an abstract method declaration. The method '${methodName}' of return type '${returnType}' has no implementation and must be implemented by a subclass.`;
    }
  }
  return explanation;
}



module.exports = router;