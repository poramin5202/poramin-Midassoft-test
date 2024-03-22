function getQuestionPart(phrases: string[]): string[] {
  const questionPart: string[] = [];

  const phraseUpperCase = phrases.map((phrase) => phrase.toUpperCase());

  const minLength = Math.min(...phrases.map((phrase) => phrase.length));

  let word = "";
  let k = 0;
  for (let i = 0; i < minLength; i++) {
    let check = 0;
    const char = word + phraseUpperCase[0].substring(word.length + k, i + 2);

    for (let j = 1; j < 3; j++) {
      if (phraseUpperCase[j].includes(char)) {
        word = char;
        check++;
        break;
      }
    }

    if (check === 0) {
      if (word.length > 0 && word.length < 3) {
        word = word.substring(0, word.length - 1);
      }
      k += 1;
    }
  }

  for (let i = 0; i < phraseUpperCase.length; i++) {
    questionPart.push(phraseUpperCase[i].replace(word, "").trim());
  }

  return questionPart;
}


