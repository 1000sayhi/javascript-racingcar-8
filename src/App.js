import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    const namesInput = await Console.readLineAsync(
      "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n"
    );
    const names = parseNames(namesInput);
    validateNames(names);

    const tryCountInput = await Console.readLineAsync("시도할 횟수는 몇 회인가요?\n");
    const tryCount = parseTryCount(tryCountInput);

    Console.print("\n실행 결과");
    const cars = createCars(names);

  }
}

function parseNames(input) {
  if (!input) throw new Error("[ERROR] 자동차 이름 입력이 비어 있습니다.");
  return input.split(",").map((name) => name.trim());
}

function validateNames(names) {
  if (!Array.isArray(names) || names.length === 0)
    throw new Error("[ERROR] 자동차 이름은 1개 이상이어야 합니다.");

  names.forEach((name) => {
    if (name.length === 0) throw new Error("[ERROR] 빈 이름은 허용되지 않습니다.");
    if (name.length > 5) throw new Error("[ERROR] 자동차 이름은 5자 이하여야 합니다.");
  });
}

function parseTryCount(input) {
  if (!input) throw new Error("[ERROR] 시도 횟수 입력이 비어 있습니다.");
  const n = Number(input);
  if (!Number.isInteger(n) || n <= 0)
    throw new Error("[ERROR] 시도 횟수는 양의 정수여야 합니다.");
  return n;
}

function createCars(names) {
  return names.map((name) => ({ name, position: 0 }));
}

export default App;