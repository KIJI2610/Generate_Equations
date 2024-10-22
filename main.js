// Функция для генерации числовых выражений
function GenerateEquations(digitisation, count_operation, complexity){
    let equations = '' // Создаем строку в которую будет вносится выражение

    // Код для уравнения с низкой сложностью
    if(complexity === 'easy'){
      const Digitisation_Math = 10 ** digitisation // Максимальное число, которое можчет быть в выражении
      const array_digits = [] // Массив который хранит в себе все числа что есть в выражении

      // Цикл для заполнения array_digits случайными числами
      for(let i = 0; i <= count_operation; i++) {
        array_digits[i] = Math.floor(Math.random() * Digitisation_Math)
      }
      
      // Заполняем выражение числами и операциями до знака "="
      for(let i = 0; i < array_digits.length; i++){
        let current_num = array_digits[i] // текущее число

        // Делаем проверку (если последняя операция была "/", а такущее число "0", то к нему прибавить случайное число от 1 до 99)
        if (i > 0 && equations[equations.length - 2] === '/' && current_num === 0){
            current_num += Math.floor(Math.random() * (Digitisation_Math - 2 + 1)) + 2
        }
        
        // Если array_digits[i] не последний алмент в array_digits то добавляем знак операции после числа
        if(i + 1 !== array_digits.length){
            const type_operation = Math.floor(Math.random() * 4) // Переменная отвечающая за тип операции в итерации цикла\
            switch (type_operation){
                case 0:
                    equations += `${current_num} + `
                    break
                case 1:
                    equations += `${current_num} - `
                    break
                case 2:
                    equations += `${current_num} * `
                    break
                case 3:
                    equations += `${current_num} / `
                    break
            }
        }
        // если array_digits[i] это последний элемент array_digits, то в строку с выражением добавляется число без операции
        else{
            equations += `${current_num}`
        }
      }
      const result_example = eval(equations)
      
      if(result_example % 1 !== 0){
        const ordinary_fraction = calculationFraction(result_example)

        let ordinary_numerator_string = String(ordinary_fraction[1])
        let ordinary_denominator_string = String(ordinary_fraction[2]) 



        equations += ` = ${ordinary_fraction}` 
      }
      else{
        equations += ` = ${result_example}`
      }


      
      return equations
    }
}


// Функция для перевода дроби из десятичной в обыкновенную
function calculationFraction(num){
    const num_str = String(num) // Переводим число в строковый формат
    let point_found = false // Найдена ли точка
    let count_digits = 0 // Количество cимволов после запятой
    const in_fraction = [] // Массив для хранения дробной части числа
    const whole = [] // Массив для хранения целой части числа

    // Читаем число в строковом виде. Символы до точки записываем в целую часть числа, после точки в дробную 
    for(let i = 0; i < num_str.length; i++){
        if(point_found === false){
            if(num_str[i] === '.'){
                point_found = true
            }
            else{
                whole.push(num_str[i])
            }
        }
        else if (point_found === true){
            in_fraction.push(num_str[i])
            count_digits++
        }
    }

    const digit_number = 10 ** count_digits // Знаменатель дроби в десятичном виде

    // Если точка не найдена(то есть число целое) возвращаем число которое приняла функция
    if(point_found === false){
        return num
    }
    else{
        // Возвращаем массив в следующем виде: [целая часть, числитель, знаменатель]
        console.log('Несокращенная дробь: ',[Number(whole.join('')), Number(in_fraction.join('')), digit_number])
        const final_fraction = [Number(whole.join('')), Number(in_fraction.join('')), digit_number]
        const redaction_fraction = redactionFraction(final_fraction)
        console.log('Сокращенная дробь: ',redaction_fraction)

        return redaction_fraction
    }
}

// Функция для перевода десятичной дроби в натуральную, которая принимат в себя массив: [целая часть, числитель, знаменатель]
function redactionFraction(fraction) {
    let unreduced_numerator = fraction[1] // Числитель десятичной дроби
    let unreduced_denominator = fraction[2] // Знаменатель десятичной дроби

    // Цикл для поиска НОД
    while (unreduced_denominator !== 0) {
        let temp = unreduced_denominator
        unreduced_denominator = unreduced_numerator % unreduced_denominator
        unreduced_numerator = temp
    }

    const gcd = unreduced_numerator // Значение НОД
    console.log(gcd)

    // Делим числитель и знаменатель на НОД создаем массив: [целая часть, сокращенный числитель, сокращенный знаменатель]
    const reduced_numerator = fraction[1] / gcd
    const reduced_denominator = fraction[2] / gcd

    const reduced_fraction = [fraction[0], reduced_numerator, reduced_denominator]
    
    return reduced_fraction
}

// Проверяем функцию вызвав её 100 раз
for(let i = 0; i < 10; i++){
    console.log(GenerateEquations(1, 3, 'easy'))
}

// Функция для округления целого числа
function roundWholeNum(num) {
    return Math.round(num / 10) * 10;
}