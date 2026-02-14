export class Compare {
  static CheckBreadcrumbs(expected: string[], actual: string[]): boolean {
    if (expected.length !== actual.length) {
      console.log(
        `Error Comparing Breadcumbs. Mis-match length. expected array length${expected.length}, actual array length ${actual.length}`,
      );
      return false;
    }
    for (let i = 0; i < expected.length; i++) {
      if (expected[i] !== actual[i]) {
        console.log(
          `Mis-Match Breadcumbs. ${i} Node. expected value${expected[i]}, actual value ${actual[i]}`,
        );
        return false;
      }
    }
    return true;
  }
}
