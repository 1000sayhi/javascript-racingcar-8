import { Console, Random } from "@woowacourse/mission-utils";

class App {
  async run() {
    try {
      const namesInput = await Console.readLineAsync(
        "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n"
      );
      const names = parseNames(namesInput);
      validateNames(names);

      const tryCountInput = await Console.readLineAsync(
        "시도할 횟수는 몇 회인가요?\n"
      );
      const tryCount = parseTryCount(tryCountInput);

      Console.print("\n실행 결과");
      const cars = createCars(names);

      for (let i = 0; i < tryCount; i += 1) {
        advanceOnce(cars);
        printHyphen(cars);
        Console.print("");
      }

      const winners = pickWinners(cars);
      Console.print(`최종 우승자 : ${winners.join(", ")}`);
    } catch (err) {
      if (err instanceof Error && err.message.startsWith("[ERROR]")) {
        throw err;
      }
      throw new Error(`[ERROR] ${String(err.message || err)}`);
    }
  }
}

function parseNames(input) {
  if (!input) throwError("자동차 이름 입력이 비어 있습니다.");
  return input.split(",").map((name) => name.trim());
}

function validateNames(names) {
  if (!Array.isArray(names) || names.length === 0)
    throwError("자동차 이름은 1개 이상이어야 합니다.");

  names.forEach((name) => {
    if (name.length === 0) throwError("빈 이름은 허용되지 않습니다.");
    if (name.length > 5) throwError("자동차 이름은 5자 이하여야 합니다.");
  });
}

function parseTryCount(input) {
  if (!input) throwError("시도 횟수 입력이 비어 있습니다.");
  const n = Number(input);
  if (!Number.isInteger(n) || n <= 0)
    throwError("시도 횟수는 양의 정수여야 합니다.");
  return n;
}

function createCars(names) {
  return names.map((name) => ({ name, position: 0 }));
}

function advanceOrNot() {
  return Random.pickNumberInRange(0, 9) >= 4;
}

function advanceOnce(cars) {
  cars.forEach((car) => {
    if (advanceOrNot()) car.position += 1;
  });
}

function printHyphen(cars) {
  cars.forEach((car) => {
    Console.print(`${car.name} : ${"-".repeat(car.position)}`);
  });
}

function pickWinners(cars) {
  const max = Math.max(...cars.map((car) => car.position));
  return cars.filter((car) => car.position === max).map((car) => car.name);
}

function throwError(msg) {
  throw new Error(`[ERROR] ${msg}`);
}

export default App;