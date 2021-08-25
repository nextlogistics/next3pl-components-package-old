export function errorLogForDevelopment(prop: string, methodName?: string): void {
  let message = 'Development error: ' + prop;
  if (methodName) {
    message += ' is undefined at ' + methodName;
  }
  console.error(message);
}
