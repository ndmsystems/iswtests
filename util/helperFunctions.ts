export const run = (cmd: string): string => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      return require('child_process').execSync(cmd).toString('utf8')
    } catch (e: any) {
      // e.status;  // Might be 127 in your example.
      // e.message; // Holds the message you typically want.
      // e.stderr;  // Holds the stderr output. Use `.toString()`.
      // e.stdout;  // Holds the stdout output. Use `.toString()`.
  
      return e.message
    }
  }